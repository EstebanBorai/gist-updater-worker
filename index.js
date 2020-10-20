const {
  GITHUB_AUTHENTICATION,
  GIST_URL,
  FILENAME,
  USER_AGENT = 'Cloudflare Worker'
} = process.env;

async function getJSON() {
  const res = await fetch(GIST_URL, {
    headers: {
      'Authorization': GITHUB_AUTHENTICATION,
      'User-Agent': USER_AGENT
    }
  });

  const json = await res.json();
  const rawURL = json.files[FILENAME].raw_url;

  const rawFetch = await fetch(rawURL);

  return await rawFetch.json();
}

async function update(payload) {
  return await fetch(GIST_URL, {
    headers: {
      'Authorization': GITHUB_AUTHENTICATION,
      'User-Agent': USER_AGENT
    },
    method: 'PATCH',
    body: JSON.stringify({
    files: {
          [FILENAME]: {
            content: JSON.stringify(payload, undefined, 4),
            filename: FILENAME
          }
        }
      })
  });
}

async function appendToGist(req) {
  const payload = await getJSON();
  const reqBodyJson = await req.json();

  payload.unshift({ date: new Date().toJSON(), reqBodyJson });
  await update(payload);

  return new Response(JSON.stringify(payload));
}

async function cleanGist() {
  await update([]);

  return new Response({
      status: 204,
      statusText: 'No Content',
  });
}

async function handler(event) {
  const req = event.request;
  const reqMethod = req.method.toLowerCase();

  switch (reqMethod) {
    case 'get':
      return new Response(JSON.stringify(await getJSON()));
    case 'post':
      return await appendToGist(req);
    case 'delete':
      return await cleanGist();
    default:
      return new Response('Method Not Allowed', {
        status: 405,
        statusText: 'Method Not Allowed',
      });
  }
}

addEventListener('fetch', event => {  
  event.respondWith(handler(event))
});
