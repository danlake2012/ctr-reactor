# Production Auth Recommendation and Migration Plan

Decision summary
- Recommended production auth: Supabase (Postgres) for reliability, backups, and horizontal scaling.
- SQLite is acceptable for local development or tiny single-instance deployments, but not recommended for production with concurrent writes or multiple server instances (Vercel serverless environments especially).

If you prefer simplicity and control, you can keep SQLite behind a single-instance deployment (e.g. a dedicated VM or a container with mounted persistent storage) and ensure backups. However, for a Vercel deployment we recommend Supabase or Postgres on a managed provider.

Migration plan (SQLite -> Supabase/Postgres)
1. Add a Postgres-compatible schema for users and sessions. Keep columns similar: id (serial/uuid), email (unique), password_hash, name, reset_token, reset_expiry, sessions(token hash, user_id, expires_at).
2. Export current SQLite data (CSV) for users. Sanitize any sensitive data during transport.
3. Import users into Postgres. If you switch to hashed session tokens on Postgres, re-create sessions server-side and expire old ones.
4. Update server-side data access code to use a Postgres client (pg or Supabase client). We already have a `lib/supabaseClient.ts` wrapper — you can hook into that for hosted Supabase.
5. Update deployment environment variables and rotate any secrets.

Operational recommendations
- Backups: schedule regular DB backups and test restores.
- Migrations: use a migration tool (e.g., Prisma Migrate, Flyway, or sqitch) to manage schema changes.
- Secrets: keep DB credentials and session signing keys in Vercel environment variables.
- Session storage: prefer storing only a hash of session tokens server-side. If storing raw tokens, ensure DB access is tightly controlled.

Session token secret
- This project supports hashing session tokens server-side using an HMAC with the env var `SESSION_TOKEN_SECRET`.
- Set `SESSION_TOKEN_SECRET` in Vercel environment variables for production. If not set, the app will fall back to storing session tokens in plaintext (only recommended for local/dev use).

Switching the app to Supabase (quick path)
1. Sign up for Supabase and create a project.
2. Create a `users` table and configure authentication or use Supabase Auth.
3. Set the following environment variables in Vercel: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and remove `NEXT_PUBLIC_USE_SQLITE` or set it to `false`.
4. The app already contains a `lib/supabaseClient.ts` wrapper; set the env vars and the client will be used for auth flows automatically.

If you want, I can implement a small migration script to export SQLite users and produce a CSV ready for import into Postgres/Supabase.

Notes about Vercel
- Vercel serverless functions are stateless; using a file-based SQLite DB on Vercel is not recommended. If you insist on SQLite, deploy to a single persistent server (Docker on a VM, Render private service, or similar).

Next steps I can take for you
- Create a simple migration/export script for SQLite users.
- Implement hashed session tokens server-side and rotate existing sessions.
- Wire Supabase deploy instructions and required Vercel env vars in the repo README.

Deployment note
- This repository will not include programmatic deploy actions (for example, triggering Vercel via token in CI). Instead, deployments should be handled via your hosting provider's Git integration (for example the Vercel <-> GitHub/GitLab integration). That keeps secrets in the provider UI, simplifies rollbacks, and uses the provider's build cache and environment configuration.
- If you want later, we can add optional deploy actions (e.g., a manual workflow dispatch) but by default we'll leave deployments to the host's Git integration.
