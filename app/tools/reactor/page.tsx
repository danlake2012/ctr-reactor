'use client';

import Link from 'next/link';
import { Suspense, useEffect } from 'react';

function ReactorToolsContent() {
  // Redirect to mega tools page
  useEffect(() => {
    window.location.href = '/tools';
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">�</div>
        <h1 className="text-3xl font-bold text-purple-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Redirecting to Tools Hub...
        </h1>
        <p className="text-slate-300 mb-6">
          All your tools are now available in one place at <Link href="/tools" className="text-blue-accent hover:underline">/tools</Link>
        </p>
        <Link
          href="/tools"
          className="bg-purple-600 hover:bg-purple-500 text-black font-bold py-3 px-6 rounded-lg transition-colors tracking-widest uppercase"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          GO TO TOOLS HUB
        </Link>
      </div>
    </div>
  );
}

export default function ReactorTools() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReactorToolsContent />
    </Suspense>
  );
}