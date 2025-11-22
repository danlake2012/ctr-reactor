"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export default function ForgotPasswordModal({ isOpen, onClose, onSubmit }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [portalEl, setPortalEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = document.createElement('div');
    el.setAttribute('id', 'forgot-modal-root');
    document.body.appendChild(el);
    const t = setTimeout(() => setPortalEl(el), 0);
    return () => {
      clearTimeout(t);
      if (el.parentNode) el.parentNode.removeChild(el);
      setTimeout(() => setPortalEl(null), 0);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      onSubmit(email);
      setMessage('If this email is registered, you will receive a reset link shortly.');
    } catch (err) {
      console.error(err);
      setMessage('Failed to send reset link');
    }
  };

  if (!isOpen) return null;

  const content = (
    <div className="modal-backdrop fixed inset-0 flex items-center justify-center p-6" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl p-6 relative shadow-2xl" style={{ background: 'linear-gradient(180deg, rgba(6,12,24,0.98), rgba(8,14,26,0.95))', border: '1px solid rgba(56,120,255,0.08)' }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={20} /></button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>Reset Password</h3>
          <p className="text-slate-300 text-sm">Enter your email to receive a reset link</p>
        </div>

        {message && <div className="bg-blue-primary/6 border border-blue-primary/10 rounded-lg p-3 mb-4"><p className="text-sm text-slate-200">{message}</p></div>}

        <form id="forgot-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 rounded bg-blue-panel-dark border border-blue-primary/20 text-white" />
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-white text-black font-bold py-2 px-4 rounded-lg">Send Reset Link</button>
            <button type="button" onClick={onClose} className="flex-1 border border-blue-primary/30 text-slate-200 rounded-lg py-2">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );

  if (portalEl) return createPortal(content, portalEl);
  return content;
}
