"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: (name: string, email: string, password: string) => void;
}

export default function SignUpModal({ isOpen, onClose, onSignup }: SignUpModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [portalEl, setPortalEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = document.createElement('div');
    el.setAttribute('id', 'signup-modal-root');
    document.body.appendChild(el);
    // Defer setState to avoid synchronous setState inside effect
    const t = setTimeout(() => setPortalEl(el), 0);
    return () => {
      clearTimeout(t);
      if (el.parentNode) el.parentNode.removeChild(el);
      // defer clearing as well
      setTimeout(() => setPortalEl(null), 0);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await onSignup(name, email, password);
    } catch (err) {
      console.error(err);
      setError('Signup failed');
    }
  };

  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6" style={{ zIndex: 2147483646 }} onClick={onClose}>
      <div className="w-full max-w-md rounded-xl p-6 relative shadow-2xl" style={{ background: 'linear-gradient(180deg, rgba(6,12,24,0.98), rgba(8,14,26,0.95))', border: '1px solid rgba(56,120,255,0.08)' }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={20} /></button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>Create Account</h3>
          <p className="text-slate-300 text-sm">Join CTR Reactor</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4"><p className="text-red-400 text-sm text-center">{error}</p></div>}

        <form id="signup-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 rounded bg-blue-panel-dark border border-blue-primary/20 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 rounded bg-blue-panel-dark border border-blue-primary/20 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 rounded bg-blue-panel-dark border border-blue-primary/20 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Confirm Password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="w-full px-3 py-2 rounded bg-blue-panel-dark border border-blue-primary/20 text-white" />
          </div>

          <button type="submit" className="w-full bg-white text-black font-bold py-3 px-4 rounded-lg">Create Account</button>
        </form>
      </div>
    </div>
  );

  // Render into portal container after mount; if portal isn't ready just return content.
  if (portalEl) return createPortal(content, portalEl);
  return content;
}
