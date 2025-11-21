
/*
  Supabase / Postgres schema for users, sessions, and password_resets
  Paste this into the Supabase SQL editor or run with psql.
*/

/* Enable helpful extensions */
CREATE EXTENSION IF NOT EXISTS pgcrypto;  -- gen_random_uuid(), digest()
CREATE EXTENSION IF NOT EXISTS citext;    -- case-insensitive email type

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email citext NOT NULL UNIQUE,
  password_hash text NOT NULL, -- bcrypt/argon2 hash done in app
  name text,
  avatar_url text,
  is_verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Sessions table (store token hashes, not raw tokens)
-- Server should generate a secure random token (hex/base64), then compute digest(token,'sha256') and pass that to DB as token_hash.
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash bytea NOT NULL UNIQUE, -- digest(token, 'sha256')
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- Password resets (one-time tokens) — same pattern: store hash
CREATE TABLE IF NOT EXISTS password_resets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash bytea NOT NULL UNIQUE, -- digest(reset_token,'sha256')
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz,
  consumed boolean NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_password_resets_user_id ON password_resets(user_id);
CREATE INDEX IF NOT EXISTS idx_password_resets_expires_at ON password_resets(expires_at);

-- Optional meta table for migrations or metadata
CREATE TABLE IF NOT EXISTS meta (
  k text PRIMARY KEY,
  v text
);

-- Common SQL statements (use prepared statements / parameterized queries in your server code)

-- 1) Create user
-- Params: (email, password_hash, name, avatar_url)
-- RETURNING fields useful to the app.
-- INSERT INTO users (email, password_hash, name, avatar_url)
-- VALUES ($1, $2, $3, $4)
-- RETURNING id, email, name, avatar_url, is_verified, created_at;

-- 2) Find user by email
-- Params: (email)
-- SELECT id, email, password_hash, name, avatar_url, is_verified, created_at
-- FROM users
-- WHERE email = $1
-- LIMIT 1;

-- 3) Find user by id
-- Params: (id)
-- SELECT id, email, name, avatar_url, is_verified, created_at
-- FROM users
-- WHERE id = $1
-- LIMIT 1;

-- 4) Create a session
-- Params: (token_text, user_id, expires_at) 
-- NOTE: compute digest(token_text, 'sha256') on server and pass the digest as a bytea param, or pass the raw token and use digest() in SQL:
-- INSERT INTO sessions (token_hash, user_id, expires_at)
-- VALUES (digest($1, 'sha256'), $2, $3)
-- RETURNING id, created_at, expires_at;

-- 5) Lookup session (and associated user)
-- Params: (token_text)
-- SELECT s.id AS session_id, s.created_at AS session_created_at, s.expires_at,
--        u.id AS user_id, u.email, u.name, u.avatar_url
-- FROM sessions s
-- JOIN users u ON u.id = s.user_id
-- WHERE s.token_hash = digest($1, 'sha256')
-- LIMIT 1;

-- 6) Delete a session (logout)
-- Params: (token_text)
-- DELETE FROM sessions WHERE token_hash = digest($1, 'sha256');

-- 7) Delete all sessions for a user (logout everywhere)
-- Params: (user_id)
-- DELETE FROM sessions WHERE user_id = $1;

-- 8) Create password reset token (server should send raw token to user via email)
-- Params: (token_text, user_id, expires_at)
-- INSERT INTO password_resets (token_hash, user_id, expires_at)
-- VALUES (digest($1, 'sha256'), $2, $3)
-- RETURNING id, created_at, expires_at;

-- 9) Validate & consume a reset token (atomic)
-- Params: (token_text, now_timestamp)
-- Use a transaction: check token exists & not expired & not consumed, update consumed, then return user_id
-- BEGIN;
-- SELECT id, user_id FROM password_resets
-- WHERE token_hash = digest($1, 'sha256')
--   AND consumed = false
--   AND (expires_at IS NULL OR expires_at > $2)
-- LIMIT 1
-- FOR UPDATE;
--
-- -- On success, mark consumed:
-- UPDATE password_resets
-- SET consumed = true
-- WHERE token_hash = digest($1, 'sha256')
--   AND consumed = false;
-- COMMIT;

-- 10) Cleanup expired sessions and consumed/expired resets
-- Params: (now_timestamp)
-- DELETE FROM sessions WHERE expires_at IS NOT NULL AND expires_at <= $1;
-- DELETE FROM password_resets WHERE (expires_at IS NOT NULL AND expires_at <= $1) OR consumed = true;

-- End of file
