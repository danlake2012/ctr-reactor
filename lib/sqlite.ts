import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

declare global {
  // track whether we've warned about missing session secret
  var __CTR_SQLITE_SESSION_SECRET_WARNED__: boolean | undefined;
}

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

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

export function createUser(name: string | null, email: string, password: string) {
  const hash = bcrypt.hashSync(password, 10);
  const stmt = db.prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)');
  const info = stmt.run(email, hash, name);
  return { id: info.lastInsertRowid, email, name };
}

export function findUserByEmail(email: string) {
  const stmt = db.prepare('SELECT id, email, password_hash AS passwordHash, name, reset_token AS resetToken, reset_expiry AS resetExpiry FROM users WHERE email = ?');
  return stmt.get(email) as ({ id: number; email: string; passwordHash: string; name?: string; resetToken?: string; resetExpiry?: number } | undefined);
}

export function verifyPassword(email: string, password: string) {
  const user = findUserByEmail(email);
  if (!user) return false;
  return bcrypt.compareSync(password, user.passwordHash);
}

export function createSession(userId: number, token: string, maxAgeSeconds: number) {
  const expiresAt = Date.now() + maxAgeSeconds * 1000;
  // Hash the token server-side using HMAC-SHA256 with SESSION_TOKEN_SECRET if provided
  const secret = process.env.SESSION_TOKEN_SECRET || '';
  let stored = token;
  if (secret) {
    const h = crypto.createHmac('sha256', secret).update(token).digest('hex');
    stored = h;
  } else {
    // In dev, fallback to storing raw token but warn once
    if (!globalThis.__CTR_SQLITE_SESSION_SECRET_WARNED__) {
      console.warn('WARNING: SESSION_TOKEN_SECRET is not set — storing session tokens in plaintext. Set SESSION_TOKEN_SECRET for production.');
      globalThis.__CTR_SQLITE_SESSION_SECRET_WARNED__ = true;
    }
  }

  const stmt = db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)');
  stmt.run(stored, userId, expiresAt);
}

export function findSession(token: string) {
  const secret = process.env.SESSION_TOKEN_SECRET || '';
  const lookup = secret ? crypto.createHmac('sha256', secret).update(token).digest('hex') : token;
  const stmt = db.prepare('SELECT token, user_id, expires_at FROM sessions WHERE token = ?');
  const row = stmt.get(lookup) as { token: string; user_id: number; expires_at: number } | undefined;
  if (!row) return null;
  if (row.expires_at < Date.now()) {
    // expired
    const del = db.prepare('DELETE FROM sessions WHERE token = ?');
    del.run(row.token);
    return null;
  }
  return row;
}

export function deleteSession(token: string) {
  const secret = process.env.SESSION_TOKEN_SECRET || '';
  const lookup = secret ? crypto.createHmac('sha256', secret).update(token).digest('hex') : token;
  const stmt = db.prepare('DELETE FROM sessions WHERE token = ?');
  stmt.run(lookup);
}

export function getUserById(id: number) {
  const stmt = db.prepare('SELECT id, email, name FROM users WHERE id = ?');
  return stmt.get(id) as { id: number; email: string; name?: string } | undefined;
}

export function setResetToken(email: string, token: string, expiryMs: number) {
  const stmt = db.prepare('UPDATE users SET reset_token = ?, reset_expiry = ? WHERE email = ?');
  stmt.run(token, expiryMs, email);
}

export function consumeResetToken(token: string) {
  const now = Date.now();
  const stmt = db.prepare('SELECT email FROM users WHERE reset_token = ? AND reset_expiry > ?');
  const row = stmt.get(token, now) as ({ email: string } | undefined);
  if (!row) return null;
  const email = row.email;
  const clear = db.prepare('UPDATE users SET reset_token = NULL, reset_expiry = NULL WHERE email = ?');
  clear.run(email);
  return email;
}
