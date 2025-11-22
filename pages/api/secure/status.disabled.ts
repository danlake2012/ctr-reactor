// Intentionally disabled: duplicate with app router's /api/secure/status
// Deleted to avoid Next.js route duplicate error.
export default function handler(_req: any, _res: any) {
  return _res.status(404).json({ ok: false, error: 'Disabled' });
}
