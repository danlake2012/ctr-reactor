'use client';

import { useState } from 'react';
import { Palette, ChevronDown } from 'lucide-react';
import { useThemeStore } from '../../lib/store';

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-blue-panel/80 hover:bg-blue-panel border border-blue-primary/40 text-blue-accent px-3 py-2 rounded-lg transition-all duration-200 hover:border-blue-accent"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        <Palette size={16} />
        <span className="text-sm tracking-widest uppercase">{theme.toUpperCase()}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Collapsible Theme Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-blue-panel border border-blue-primary/40 rounded-lg shadow-xl z-50 py-2">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTheme(t);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-blue-primary/20 ${
                  theme === t
                    ? 'text-blue-accent bg-blue-primary/10'
                    : 'text-slate-300 hover:text-blue-accent'
                }`}
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
