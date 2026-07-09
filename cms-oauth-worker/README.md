# Decap CMS OAuth proxy (Cloudflare Worker)

GitHub Pages only serves static files, but Decap CMS's `github` backend needs
a server to complete the OAuth handshake (GitHub won't let a pure client-side
app hold a client secret). This small Cloudflare Worker fills that gap.

## What's already done

`worker.js` implements the two endpoints Decap expects:
- `/auth` — redirects the user to GitHub's OAuth consent screen.
- `/callback` — exchanges the returned code for an access token and hands it
  back to the CMS tab via `postMessage`.

## Steps you need to do yourself (cannot be automated)

1. **Create a GitHub OAuth App**: go to
   [github.com/settings/developers](https://github.com/settings/developers) →
   "New OAuth App".
   - Homepage URL: `https://anderiri2.github.io`
   - Authorization callback URL: `https://<your-worker-subdomain>.workers.dev/callback`
   - Save the app, then copy the **Client ID** and generate/copy a **Client Secret**.

2. **Create/log into a Cloudflare account** and enable Workers (the free tier
   is enough for this).

3. **Install Wrangler and log in**:
   ```
   npm install -g wrangler
   wrangler login
   ```

4. **Deploy the worker** (from this directory):
   ```
   cd cms-oauth-worker
   wrangler deploy
   ```
   Note the deployed URL, e.g. `https://decap-cms-oauth.<you>.workers.dev`.

5. **Set the two secrets** (never commit them to the repo):
   ```
   wrangler secret put GITHUB_CLIENT_ID
   wrangler secret put GITHUB_CLIENT_SECRET
   ```

6. **Tell me the worker's URL** — I'll set `backend.base_url` in
   `admin/config.yml` to it and commit.

7. **Smoke test**: visit `https://anderiri2.github.io/admin/`, click
   "Login with GitHub," and authorize the OAuth App. A successful login
   confirms the whole chain works.
