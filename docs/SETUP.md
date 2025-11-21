# Setup & Dependency Notes (Linux)

This project uses a small set of native/binary npm packages (notably `better-sqlite3` and `bcryptjs`) which require system build tools on Linux. The instructions below show how to prepare a typical Ubuntu/Debian environment.

1) Install system build tools

On Debian/Ubuntu:

```bash
sudo apt update
sudo apt install -y build-essential python3 pkg-config libsqlite3-dev
```

On Fedora/CentOS-based systems, use `dnf` / `yum` equivalents.

2) Install project dependencies

```bash
npm ci
# or
npm install
```

If `better-sqlite3` fails to build, ensure `python3`, `make`, `g++`, and `libsqlite3-dev` are installed.

3) Check native deps quickly

We added a helper script you can run locally to verify required native modules are installed:

```bash
npm run check-deps
```

Exit code 0 = OK. Exit code 1 = missing native dependency.

4) Environment variables

Copy `.env.example` to `.env.local` for local development and set appropriate values. Important vars:

- `NEXT_PUBLIC_USE_SQLITE=true` — enable local SQLite auth flows.
- `SESSION_TOKEN_SECRET` — set a strong secret (e.g. `openssl rand -hex 32`). Required for secure session token hashing.
- `SESSION_COOKIE_NAME`, `SESSION_MAX_AGE` — cookie name and lifetime.
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — set these if you want to use Supabase instead of SQLite.

5) Run dev server

Stop any running Next dev instances and then start the dev server:

```bash
pkill -f "next dev" || true
npm run dev
```

6) Production notes (Vercel)

- Vercel's serverless environment is ephemeral; file-based SQLite is not suitable for multi-instance serverless deployments. Use Supabase/Postgres for production on Vercel.
- Set `SESSION_TOKEN_SECRET` in Vercel Environment Variables for production.
