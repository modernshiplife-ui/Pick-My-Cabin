export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/reviews' && request.method === 'GET') {
      return handleGetReviews(url, env);
    }
    if (url.pathname === '/api/reviews' && request.method === 'POST') {
      return handlePostReview(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleGetReviews(url, env) {
  const shipId = url.searchParams.get('ship');

  // No ship filter — return the most recent reviews across every ship, for
  // the home page's "most recent reviews" feed.
  if (!shipId) {
    const { results } = await env.DB.prepare(
      'SELECT id, ship_id, cabin, rating, tags, comment, author, created_at FROM reviews ORDER BY created_at DESC LIMIT 6'
    ).all();
    return json(results.map((r) => rowToReview(r, r.ship_id)));
  }

  const { results } = await env.DB.prepare(
    'SELECT id, cabin, rating, tags, comment, author, created_at FROM reviews WHERE ship_id = ? ORDER BY created_at DESC'
  )
    .bind(shipId)
    .all();

  return json(results.map((r) => rowToReview(r, shipId)));
}

function rowToReview(r, shipId) {
  return {
    id: r.id,
    shipId,
    cabin: r.cabin,
    rating: r.rating,
    tags: JSON.parse(r.tags || '[]'),
    comment: r.comment,
    author: r.author,
    when: formatWhen(r.created_at),
  };
}

async function handlePostReview(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }

  const { shipId, cabin, rating, tags, comment, author } = body || {};
  if (!shipId || !cabin || (rating !== 'up' && rating !== 'down')) {
    return json({ error: 'shipId, cabin and rating (up|down) are required' }, 400);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await env.DB.prepare(
    'INSERT INTO reviews (id, ship_id, cabin, rating, tags, comment, author, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  )
    .bind(id, shipId, cabin, rating, JSON.stringify(Array.isArray(tags) ? tags : []), comment || '', author || 'Anonymous', createdAt)
    .run();

  return json({
    id,
    shipId,
    cabin,
    rating,
    tags: Array.isArray(tags) ? tags : [],
    comment: comment || '',
    author: author || 'Anonymous',
    when: 'Just now',
  });
}

function formatWhen(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
