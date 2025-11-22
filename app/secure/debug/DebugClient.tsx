'use client';

import { useState } from 'react';

export default function DebugClient() {
  const [pingResult, setPingResult] = useState<Record<string, unknown> | null>(null);
  const [statusResult, setStatusResult] = useState<Record<string, unknown> | null>(null);
  const [diagResult, setDiagResult] = useState<Record<string, unknown> | null>(null);
  const [adminPass, setAdminPass] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function doFetch(url: string, opts: RequestInit = {}) {
    try {
      setError(null);
      const res = await fetch(url, opts);
      const body = await res.text();
      return { ok: res.ok, status: res.status, body: body ? JSON.parse(body) : null };
    } catch (err: unknown) {
  const message = (err && typeof err === 'object' && 'message' in err) ? (err as {message?: string}).message : String(err);
  setError(message ?? String(err));
      return { ok: false, status: 0, body: null };
    }
  }

  async function fetchPing() {
    const res = await doFetch('/api/secure/ping');
    setPingResult(res);
  }

  async function fetchStatus() {
    const res = await doFetch('/api/secure/status');
    setStatusResult(res);
  }

  async function fetchDiag() {
    const hdrs: Record<string, string> = { 'Content-Type': 'application/json' };
    if (adminPass) hdrs['x-admin-password'] = adminPass;
    const opts: RequestInit = {
      method: 'POST',
      headers: hdrs,
      body: JSON.stringify({ query: 'diagnostic' }),
    };
    const res = await doFetch('/api/secure/diagnostic?key=' + encodeURIComponent(adminPass ?? ''), opts);
    setDiagResult(res);
  }

  return (
    <div className="bg-slate-700 p-6 rounded-md text-slate-100">
      <div className="flex gap-2 items-center mb-3">
        <button className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded" onClick={fetchPing}>Fetch /api/secure/ping</button>
        <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded" onClick={fetchStatus}>Fetch /api/secure/status</button>
        <input className="ml-auto bg-slate-800 px-2 py-1 rounded" placeholder="Admin password (for diagnostics)" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} />
      </div>
      <div className="flex gap-2 items-center mb-3">
        <button className="bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded" onClick={fetchDiag}>Post /api/secure/diagnostic</button>
        <div className="text-slate-300 ml-2 text-sm">(Diagnostic will require admin password in production)</div>
      </div>

      {error && <div className="text-red-400">Error: {error}</div>}

      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-slate-800 p-3 rounded">
          <div className="font-bold mb-2">Ping</div>
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(pingResult, null, 2)}</pre>
        </div>
        <div className="bg-slate-800 p-3 rounded">
          <div className="font-bold mb-2">Status</div>
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(statusResult, null, 2)}</pre>
        </div>
        <div className="bg-slate-800 p-3 rounded">
          <div className="font-bold mb-2">Diagnostic</div>
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(diagResult, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
