export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/visits' && request.method === 'GET') {
      return handleGetVisits(env);
    }
    if (url.pathname === '/api/visits' && request.method === 'POST') {
      return handleIncrementVisits(env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleGetVisits(env) {
  const row = await env.DB.prepare('SELECT value FROM stats WHERE key = ?').bind('visits').first();
  return json({ count: row ? row.value : 0 });
}

async function handleIncrementVisits(env) {
  await env.DB.prepare(
    "INSERT INTO stats (key, value) VALUES ('visits', 1) ON CONFLICT(key) DO UPDATE SET value = value + 1"
  ).run();
  const row = await env.DB.prepare('SELECT value FROM stats WHERE key = ?').bind('visits').first();
  return json({ count: row ? row.value : 0 });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
