// Cloudflare Worker OAuth proxy for Decap CMS's "github" backend.
// GitHub Pages can't hold a client secret, so this tiny worker completes the
// OAuth handshake on GitHub's behalf. Deploy with `wrangler deploy` after
// setting the GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET secrets (see README.md).

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

function randomState() {
  return crypto.randomUUID();
}

async function handleAuth(request, env) {
  const url = new URL(request.url);
  const state = randomState();
  const redirectUri = `${url.origin}/callback`;
  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", state);

  const headers = new Headers({ Location: authorizeUrl.toString() });
  headers.append(
    "Set-Cookie",
    `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
  );
  return new Response(null, { status: 302, headers });
}

function popupResponseHtml(status, payload) {
  // Matches the postMessage contract Decap CMS's github backend expects.
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  return `<!DOCTYPE html><html><body><script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(
          ${JSON.stringify(message)},
          e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script></body></html>`;
}

async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = request.headers.get("Cookie") || "";
  const expectedState = (cookie.match(/oauth_state=([^;]+)/) || [])[1];

  if (!code || !state || state !== expectedState) {
    return new Response(popupResponseHtml("error", { message: "Invalid OAuth state" }), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(popupResponseHtml("error", tokenData), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  return new Response(popupResponseHtml("success", { token: tokenData.access_token }), {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/auth") return handleAuth(request, env);
    if (url.pathname === "/callback") return handleCallback(request, env);
    return new Response("Decap CMS OAuth proxy", { status: 200 });
  },
};
