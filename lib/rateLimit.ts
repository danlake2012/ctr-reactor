// Simple in-memory rate limiter intended for low-volume or single-instance deployments.
// For production (serverless or multi-instance) use a shared store (Redis) for accurate limits.

type Entry = { count: number; resetAt: number };

const WINDOW = 60 * 1000; // default 1 minute

declare global {
  // attach to globalThis so state survives module reloads in dev
  var __CTR_REACTOR_RATE_LIMIT_STORE__: Map<string, Entry> | undefined;
}

if (!global.__CTR_REACTOR_RATE_LIMIT_STORE__) {
  global.__CTR_REACTOR_RATE_LIMIT_STORE__ = new Map();
}

const store = global.__CTR_REACTOR_RATE_LIMIT_STORE__ as Map<string, Entry>;

export function isRateLimited(key: string, limit = 10, windowMs = WINDOW) {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, remaining: limit - 1, resetIn: windowMs };
  }

  if (entry.count >= limit) {
    return { limited: true, remaining: 0, resetIn: entry.resetAt - now };
  }

  entry.count += 1;
  store.set(key, entry);
  return { limited: false, remaining: limit - entry.count, resetIn: entry.resetAt - now };
}
