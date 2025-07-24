
export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const pathMatch = url.pathname.match(/^\/api\/stack\/(\w+)$/);
      if (pathMatch) {
        const stackId = pathMatch[1];
        const metaKey = `stack_meta_${stackId}`;

        const meta = await env.TGGS_KV.get(metaKey, { type: 'json' });
        if (!meta) return new Response('Stack not found', { status: 404 });

        if (meta.type === 'private') {
          const authHeader = request.headers.get('Authorization') || '';
          if (!authHeader.startsWith('Bearer ')) return new Response('Unauthorized', { status: 401 });

          const token = authHeader.slice(7);
          if (token !== meta.creator.token) return new Response('Forbidden', { status: 403 });
        }

        const stackKey = `stack_${stackId}`;
        const stackData = await env.TGGS_KV.get(stackKey, { type: 'json' });

        if (!stackData) {
          return new Response('Stack data not found', { status: 404 });
        }

        return new Response(JSON.stringify(stackData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (url.pathname === '/api/uploadstack' && request.method === 'POST') {
        const authHeader = request.headers.get('Authorization') || '';
        if (!authHeader.startsWith('Bearer ')) {
          console.log('Unauthorized');
          return new Response('Unauthorized', { status: 401 });
        }

        const username = request.headers.get('X-Username');
        const token = authHeader.slice(7);
        if (!username || !token) {
          return new Response('Unauthorized', { status: 401 });
        } 
        const userMetaKey = `user_meta_${username}`;
        console.log(userMetaKey);
        const userMeta = await env.TGGS_KV.get(userMetaKey, { type: 'json' });
        if (!userMeta) {
          return new Response('User not found', { status: 404 });
        }

        if (token !== userMeta.token) {
          return new Response('Forbidden', { status: 403 });
        }

        const body = await request.json();

        if (!body.files || !body.files['setup.sh'] || !body.files['package.json']) {
          return new Response('Missing setup.sh or package.json', { status: 400 });
        }

        const stackId = [...crypto.getRandomValues(new Uint8Array(6))]
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
        const metaKey = `stack_meta_${stackId}`;
        const stackKey = `stack_${stackId}`;

        console.log('username:', username);
        console.log('token:', token);
        const stackMeta = {
          type: url.searchParams.get('type') || 'private',
          creator: { username , token },
        };

        await env.TGGS_KV.put(metaKey, JSON.stringify(stackMeta));
        await env.TGGS_KV.put(stackKey, JSON.stringify({
          'setup.sh': body.files['setup.sh'],
          'package.json': body.files['package.json'],
        }));

        return new Response(JSON.stringify({
          message: 'Stack saved',
          url: `${url.origin}/api/stack/${stackId}`,
          stackId,
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
      }


      return new Response('Not found', { status: 404 });
    } catch (e) {
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  }
};
