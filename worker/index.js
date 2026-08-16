export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/ratings' && request.method === 'GET') {
      return handleRatings(url, env);
    }
    if (url.pathname === '/api/vote' && request.method === 'POST') {
      return handleVote(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleRatings(url, env) {
  const shipId = url.searchParams.get('ship');
  if (!shipId) return json({ error: 'ship is required' }, 400);

  const { results } = await env.DB.prepare('SELECT cabin_id, up, down FROM votes WHERE ship_id = ?')
    .bind(shipId)
    .all();

  const out = {};
  for (const row of results) {
    out[row.cabin_id] = { up: row.up, down: row.down };
  }
  return json(out);
}

async function handleVote(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }

  const { shipId, cabinId, vote } = body || {};
  if (!shipId || !cabinId || (vote !== 'up' && vote !== 'down')) {
    return json({ error: 'shipId, cabinId and vote (up|down) are required' }, 400);
  }

  const column = vote === 'up' ? 'up' : 'down';
  await env.DB.prepare(
    `INSERT INTO votes (ship_id, cabin_id, up, down) VALUES (?, ?, ?, ?)
     ON CONFLICT(ship_id, cabin_id) DO UPDATE SET ${column} = ${column} + 1`
  )
    .bind(shipId, cabinId, vote === 'up' ? 1 : 0, vote === 'down' ? 1 : 0)
    .run();

  const row = await env.DB.prepare('SELECT up, down FROM votes WHERE ship_id = ? AND cabin_id = ?')
    .bind(shipId, cabinId)
    .first();

  return json(row);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
