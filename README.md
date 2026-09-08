# AgentSam Workmode

Calm vibecode bench: persistent trails, helper chats, in-app browser, Monaco, xterm CLI, projects/artifacts, model picker, and GitHub / Cloudflare ship.

**Repo:** [SamPrimeaux/AgentSam-Grok-Workmode](https://github.com/SamPrimeaux/AgentSam-Grok-Workmode)  
**Canonical D1:** `inneranimalmedia-business` (`cf87b717-d4e2-4cf8-bab0-a81268e32d49`)  
**Target runtime:** Cloudflare Worker (same account / control plane as Inner Animal Media)

---

## What works today

| Surface | Behavior |
| --- | --- |
| Trails | Left rail; persist in the browser |
| Helper chat | Ephemeral side stage until you Keep trail |
| Browser | Lookup without leaving the bench |
| Files / Monaco | Agent-written code, editable |
| CLI | `Ctrl+\`` — git, vibe, wrangler helpers |
| Ship | GitHub push + Cloudflare Pages via `/api/github` + `/api/cloudflare` |
| Tokens (interim) | Plaintext `localStorage` (`agentsam-ship-secrets`) — **replace with vault** |

Side chats stay ephemeral until kept. Shell fences in replies have a **Run** control that sends the command to the CLI.

---

## Quick start (local)

```bash
npm install
npm run dev          # preview on 0.0.0.0:8080
npm run typecheck
npm run build
```

---

## Scaffold a new AgentSam product

Use the published SDK for a clean local project (identity + SQLite + CLI). This Workmode repo is the **UI/template** lane; the SDK is the **portable scaffold** lane.

```bash
# one-shot
npx @inneranimalmedia/agentsam-sdk init --name my-agent --yes
cd my-agent
npm install
npm run smoke
npm run dev

# or global CLI
npm install -g @inneranimalmedia/agentsam-sdk
agentsam init --name my-agent --yes
agentsam status
```

Optional: index an existing tree before wiring cloud ops.

```bash
agentsam init . --yes --include src,docs
agentsam index plan
agentsam index run
agentsam search "oauth vault secrets"
```

Docs: [agentsam-sdk](https://github.com/SamPrimeaux/agentsam-sdk)

---

## Deploy / bind Cloudflare Worker + D1

### Account + database (SSOT)

| Binding | Value |
| --- | --- |
| Account | Inner Animal Media Cloudflare account |
| D1 name | `inneranimalmedia-business` |
| D1 UUID | `cf87b717-d4e2-4cf8-bab0-a81268e32d49` |
| Example Worker name | `agentsam-workmode` |

Copy the example Worker config:

```bash
cp wrangler.toml.example wrangler.toml
# edit name= if you need a different Worker script name
```

### Auth for Wrangler (never commit tokens)

```bash
# preferred: OAuth login (interactive)
npx wrangler login

# or export a scoped API token in your shell only
export CLOUDFLARE_ACCOUNT_ID="<your-account-id>"
export CLOUDFLARE_API_TOKEN="<token-with-workers+d1>"
```

On the IAM Mac desk, prefer the monorepo env wrappers instead of pasting tokens into chat:

```bash
# from SamPrimeaux/inneranimalmedia
./scripts/with-cloudflare-env.sh npx wrangler whoami
```

### D1 inspect / one-off SQL (production DB)

Do **not** blindly `migrations apply` against production. Use reviewed one-off files (same rule as the platform deploy guide).

```bash
# list remote DBs
npx wrangler d1 list

# informational migration ledger
npx wrangler d1 migrations list inneranimalmedia-business --remote

# execute a reviewed SQL file against the business DB
npx wrangler d1 execute inneranimalmedia-business --remote \
  --file=./migrations/workmode/<your-reviewed-migration>.sql

# ad-hoc read (example)
npx wrangler d1 execute inneranimalmedia-business --remote \
  --command="SELECT name FROM sqlite_master WHERE name IN ('user_secrets','user_oauth_tokens','agentsam_user_ui_preferences');"
```

### Worker secrets (vault + app)

```bash
# master key for AES-GCM vault (generate once; store only in CF Secrets)
openssl rand -base64 32 | npx wrangler secret put VAULT_MASTER_KEY

# optional aliases used by platform workers
npx wrangler secret put VAULT_KEY          # same value if you keep one master
npx wrangler secret put BETTER_AUTH_SECRET
npx wrangler secret put XAI_API_KEY        # server-only model calls
```

### Deploy this Worker

```bash
npm run build
npx wrangler deploy -c wrangler.toml
```

For the **full IAM platform** (dashboard + R2 + Worker), use the monorepo ship lane — not a bare `wrangler deploy` from that repo:

```bash
# Mac operator desk (inneranimalmedia)
npm run deploy
# or
bin/agentsam deploy fast

# phone / GCP iam-tunnel (push; Cloudflare Builds does the heavy lift)
bash scripts/ship-remote.sh
```

See `docs/DEPLOY_AND_AGENT_GUIDE.md` in `SamPrimeaux/inneranimalmedia`.

### GitHub Actions sketch (Worker)

```yaml
# .github/workflows/deploy-worker.yml
name: Deploy Workmode Worker
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
      - run: npm ci && npm run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: deploy -c wrangler.toml
```

Repo secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` only — never put user BYOK keys in Actions.

---

## Encrypted secrets plan (required for Connect)

**Status:** planned / schema already exists on `inneranimalmedia-business`.  
**Interim:** plaintext browser `localStorage` — not acceptable for multi-user or cross-device.

Full design: [`docs/SECRETS_VAULT_PLAN.md`](./docs/SECRETS_VAULT_PLAN.md)

### Non-negotiables

1. **Never** store GitHub / Cloudflare / model API keys in `localStorage`, client state, or chat logs.
2. **One vault lane:** ciphertext in D1 (`user_secrets`, `user_oauth_tokens`, `env_secrets`); plaintext only in Worker memory at use-time.
3. **OAuth preferred** for GitHub + Cloudflare; paste-token is fallback that still goes through the vault encrypt path.
4. **Decrypt only server-side** for the authenticated `user_id` / `tenant_id` / `workspace_id` that owns the row.
5. **Audit every read/write/rotate** via `secret_audit_log` (last4 only in logs).

### Existing tables (reuse — do not invent parallel vaults)

| Table | Role |
| --- | --- |
| `user_secrets` | BYOK API keys (`secret_value_encrypted`, `service_name`, `vault_secret_id`) |
| `user_oauth_tokens` | Provider tokens (`access_token_encrypted` / `refresh_token_encrypted` + vault ids) |
| `env_secrets` | Worker/env registry (`encrypted_d1` vs `workers_secret`) |
| `secret_audit_log` | Rotate / use / revoke events |
| `agentsam_user_ui_preferences` | Theme / accent / density JSON (non-secret) |
| `oauth_providers` | Platform OAuth client config (`client_secret_encrypted`) |

### Crypto contract (Worker)

- Algorithm: **AES-256-GCM**
- Key: `VAULT_MASTER_KEY` (Worker secret, 32 bytes raw or base64)
- Stored blob: `base64(iv || ciphertext || tag)` or separate `iv` column where the table already has one (`env_secrets.iv`)
- AAD (optional but recommended): `user_id:service_name:secret_name` to bind ciphertext to owner

### Connect UX (target)

1. Sign in → session carries verified `user_id`
2. **Connect Cloudflare** → OAuth (`docs/auth/CLOUDFLARE_OAUTH_CLIENT_SCOPES.md` in monorepo) → store tokens encrypted
3. **Connect GitHub** → GitHub App / OAuth → store tokens encrypted
4. **BYOK API key** → Settings form posts to `/api/vault/secrets` → encrypt → D1; UI shows masked last4 only
5. Ship / deploy / model routes resolve secrets by id, decrypt once, call provider, drop plaintext

Until Connect ships, Settings must keep warning that tokens are browser-local only.

---

## Theme / prefs (non-secret)

Persist UI customization in `agentsam_user_ui_preferences.ui_preferences_json` keyed by `(workspace_id, user_id)`:

```json
{
  "theme": "studio-dark",
  "accent": "#c4a574",
  "density": "comfortable",
  "defaultModel": "grok-4-6"
}
```

Cache a copy locally for snappy paint; server row wins after sign-in.

---

## Product direction (short)

1. Identity gate  
2. Vault-backed Connect (CF + GitHub + BYOK)  
3. Mobile single-pane shell  
4. Theme prefs on D1  
5. Agent run finalization / reliability  
6. Package as `agentsam-sdk` workmode lane  

---

## Related

- Platform deploy guide: `SamPrimeaux/inneranimalmedia` → `docs/DEPLOY_AND_AGENT_GUIDE.md`
- Cloudflare OAuth scopes: `docs/auth/CLOUDFLARE_OAUTH_CLIENT_SCOPES.md`
- SDK: `@inneranimalmedia/agentsam-sdk`
- Vault plan (this repo): [`docs/SECRETS_VAULT_PLAN.md`](./docs/SECRETS_VAULT_PLAN.md)
