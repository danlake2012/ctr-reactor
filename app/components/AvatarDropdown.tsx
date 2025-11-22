'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { EMOJI_AVATARS, pickEmojiForKey } from '@/lib/emojiAvatars';

export default function AvatarDropdown({ modalOpen = false, seed }: { modalOpen?: boolean; seed?: string }) {
  const [selectedAvatar, setSelectedAvatar] = useState(() => pickEmojiForKey(seed || ''));
  const [isOpen, setIsOpen] = useState(false);

  // If a modal (like the login modal) opens elsewhere, ensure the avatar dropdown closes
  useEffect(() => {
    // If a modal opens, close the avatar dropdown. Use a short timeout to avoid
    // triggering a synchronous setState in the middle of rendering which some
    // linters warn about.
    if (!modalOpen) return;
    if (!isOpen) return;

    const t = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(t);
  }, [modalOpen, isOpen]);

  const portalRef = useRef<HTMLDivElement | null>(null);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    // Create or reuse a portal container for the dropdown to escape stacking contexts
    let el = document.getElementById('avatar-dropdown-portal') as HTMLDivElement | null;
    let created = false;
    if (!el) {
      el = document.createElement('div');
      el.setAttribute('id', 'avatar-dropdown-portal');
      document.body.appendChild(el);
      created = true;
    }
    portalRef.current = el;
    // Defer setState to avoid synchronous setState within effect.
    const t = setTimeout(() => setPortalEl(el), 0);
    return () => {
      clearTimeout(t);
      // Only remove the element if we created it
      if (created && portalRef.current && portalRef.current.parentElement) {
        portalRef.current.parentElement.removeChild(portalRef.current);
      }
      // Defer clearing the ref/state to avoid sync set state inside cleanup
      setTimeout(() => {
        portalRef.current = null;
        setPortalEl(null);
      }, 0);
    };
  }, []);

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-blue-panel/80 hover:bg-blue-panel border border-blue-primary/40 text-blue-accent px-3 py-2 rounded-lg transition-all duration-200 hover:border-blue-accent"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        <span className="text-xl">{selectedAvatar}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

  {/* Dropdown Menu */}
  {/* Do not render the dropdown if a higher-priority modal is open */}
  {isOpen && !modalOpen && portalEl && createPortal(
        <>
          {/* Backdrop */}
          <div
            className="modal-backdrop fixed inset-0"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="modal-menu fixed right-8 top-20 w-80 h-80 bg-blue-panel border-2 border-blue-primary/60 rounded-lg shadow-2xl overflow-hidden">
            {/* Header with User Dashboard Link */}
            <div className="px-4 py-3 border-b border-blue-primary/20">
              <Link
                href="/user"
                className="block text-sm font-medium text-blue-accent hover:text-blue-bright transition-colors uppercase tracking-widest"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
                onClick={() => setIsOpen(false)}
              >
                User Dashboard →
              </Link>
            </div>

            <div className="px-4 py-2 border-b border-blue-primary/20">
              <h3 className="text-sm font-medium text-blue-accent uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Choose Avatar
              </h3>
            </div>

            <div className="grid grid-cols-6 gap-1 p-3 h-48 overflow-y-auto">
              {EMOJI_AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => {
                    setSelectedAvatar(avatar);
                    setIsOpen(false);
                  }}
                  className={`text-xl p-2 rounded-lg transition-all hover:bg-blue-primary/30 hover:scale-110 ${
                    selectedAvatar === avatar
                      ? 'bg-blue-primary/20 ring-2 ring-blue-accent scale-110'
                      : 'hover:bg-blue-primary/20'
                  }`}
                  title={`Select ${avatar} avatar`}
                >
                  {avatar}
                </button>
              ))}
            </div>

            <div className="px-4 py-2 border-t border-blue-primary/20">
              <p className="text-xs text-slate-300 text-center">
                Click to change your avatar
              </p>
            </div>
          </div>
        </>, portalEl
      )}
    </div>
  );
}