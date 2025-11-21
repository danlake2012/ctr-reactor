import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Dynamically require better-sqlite3 at runtime. This avoids a hard build-time
// dependency so environments that don't support building native modules (for
// example Vercel's build image or CI) won't fail during the Next.js build.
// If the module isn't available, we export stub functions that throw helpful
// errors so callers can fall back to other providers (Supabase) in production.
let Database: any = null;
let bcrypt: any = null;
try {
  // Use runtime require so the bundler doesn't try to resolve the native module
  // at build/compile time.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const req: any = require;
  Database = req('better-sqlite3');
  bcrypt = req('bcryptjs');
} catch (_) {
  // Not fatal during build; warn so developers know SQLite features are disabled.
  console.warn('better-sqlite3 or bcryptjs not available — SQLite features disabled in this environment.');
}

declare global {
  // track whether we've warned about missing session secret
  var __CTR_SQLITE_SESSION_SECRET_WARNED__: boolean | undefined;
}

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Helper error for stubbed implementations
const SQLITE_UNAVAILABLE_ERROR = new Error('SQLite (better-sqlite3) is not available in this environment. Use Supabase/Postgres in production or install better-sqlite3 locally.');

// Implementation placeholders — we'll assign real implementations when Database is available
let createUserImpl: any = () => { throw SQLITE_UNAVAILABLE_ERROR; };
let findUserByEmailImpl: any = () => { throw SQLITE_UNAVAILABLE_ERROR; };
let verifyPasswordImpl: any = () => { throw SQLITE_UNAVAILABLE_ERROR; };
let createSessionImpl: any = () => { throw SQLITE_UNAVAILABLE_ERROR; };
let findSessionImpl: any = () => { throw SQLITE_UNAVAILABLE_ERROR; };
let deleteSessionImpl: any = () => { throw SQLITE_UNAVAILABLE_ERROR; };
let getUserByIdImpl: any = () => { throw SQLITE_UNAVAILABLE_ERROR; };
let setResetTokenImpl: any = () => { throw SQLITE_UNAVAILABLE_ERROR; };
let consumeResetTokenImpl: any = () => { throw SQLITE_UNAVAILABLE_ERROR; };

if (Database) {
  const dbPath = process.env.SQLITE_DB_PATH || path.join(dataDir, 'auth.db');
  const db = new Database(dbPath);

  // Initialize schema
  db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  reset_token TEXT,
  reset_expiry INTEGER
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
`);

  createUserImpl = function (name: string | null, email: string, password: string) {
    const hash = bcrypt.hashSync(password, 10);
    const stmt = db.prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)');
    const info = stmt.run(email, hash, name);
    return { id: info.lastInsertRowid, email, name };
  };

  findUserByEmailImpl = function (email: string) {
    const stmt = db.prepare('SELECT id, email, password_hash AS passwordHash, name, reset_token AS resetToken, reset_expiry AS resetExpiry FROM users WHERE email = ?');
    return stmt.get(email) as ({ id: number; email: string; passwordHash: string; name?: string; resetToken?: string; resetExpiry?: number } | undefined);
  };

  verifyPasswordImpl = function (email: string, password: string) {
    const user = findUserByEmailImpl(email);
    if (!user) return false;
    return bcrypt.compareSync(password, user.passwordHash);
  };

  createSessionImpl = function (userId: number, token: string, maxAgeSeconds: number) {
    const expiresAt = Date.now() + maxAgeSeconds * 1000;
    // Hash the token server-side using HMAC-SHA256 with SESSION_TOKEN_SECRET if provided
    const secret = process.env.SESSION_TOKEN_SECRET || '';
    let stored = token;
    if (secret) {
      const h = crypto.createHmac('sha256', secret).update(token).digest('hex');
      stored = h;
    } else {
      if (!globalThis.__CTR_SQLITE_SESSION_SECRET_WARNED__) {
        console.warn('WARNING: SESSION_TOKEN_SECRET is not set — storing session tokens in plaintext. Set SESSION_TOKEN_SECRET for production.');
        globalThis.__CTR_SQLITE_SESSION_SECRET_WARNED__ = true;
      }
    }

    const stmt = db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)');
    stmt.run(stored, userId, expiresAt);
  };

  findSessionImpl = function (token: string) {
    const secret = process.env.SESSION_TOKEN_SECRET || '';
    const lookup = secret ? crypto.createHmac('sha256', secret).update(token).digest('hex') : token;
    const stmt = db.prepare('SELECT token, user_id, expires_at FROM sessions WHERE token = ?');
    const row = stmt.get(lookup) as { token: string; user_id: number; expires_at: number } | undefined;
    if (!row) return null;
    if (row.expires_at < Date.now()) {
      const del = db.prepare('DELETE FROM sessions WHERE token = ?');
      del.run(row.token);
      return null;
    }
    return row;
  };

  deleteSessionImpl = function (token: string) {
    const secret = process.env.SESSION_TOKEN_SECRET || '';
    const lookup = secret ? crypto.createHmac('sha256', secret).update(token).digest('hex') : token;
    const stmt = db.prepare('DELETE FROM sessions WHERE token = ?');
    stmt.run(lookup);
  };

  getUserByIdImpl = function (id: number) {
    const stmt = db.prepare('SELECT id, email, name FROM users WHERE id = ?');
    return stmt.get(id) as { id: number; email: string; name?: string } | undefined;
  };

  setResetTokenImpl = function (email: string, token: string, expiryMs: number) {
    const stmt = db.prepare('UPDATE users SET reset_token = ?, reset_expiry = ? WHERE email = ?');
    stmt.run(token, expiryMs, email);
  };

  consumeResetTokenImpl = function (token: string) {
    const now = Date.now();
    const stmt = db.prepare('SELECT email FROM users WHERE reset_token = ? AND reset_expiry > ?');
    const row = stmt.get(token, now) as ({ email: string } | undefined);
    if (!row) return null;
    const email = row.email;
    const clear = db.prepare('UPDATE users SET reset_token = NULL, reset_expiry = NULL WHERE email = ?');
    clear.run(email);
    return email;
  };
}

// Exported functions that forward to implementations (either real or stub)
export const createUser = (...args: any[]) => createUserImpl(...args);
export const findUserByEmail = (...args: any[]) => findUserByEmailImpl(...args);
export const verifyPassword = (...args: any[]) => verifyPasswordImpl(...args);
export const createSession = (...args: any[]) => createSessionImpl(...args);
export const findSession = (...args: any[]) => findSessionImpl(...args);
export const deleteSession = (...args: any[]) => deleteSessionImpl(...args);
export const getUserById = (...args: any[]) => getUserByIdImpl(...args);
export const setResetToken = (...args: any[]) => setResetTokenImpl(...args);
export const consumeResetToken = (...args: any[]) => consumeResetTokenImpl(...args);
