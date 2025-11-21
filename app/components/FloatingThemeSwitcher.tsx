'use client';

import { useState, useEffect } from 'react';
import { Palette, ChevronRight } from 'lucide-react';
import { useThemeStore } from '../../lib/store';

export default function FloatingThemeSwitcher() {
  const { theme, setTheme, themes } = useThemeStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-collapse after 3 seconds of no interaction
  useEffect(() => {
    if (isExpanded && !isHovered) {
      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, isHovered]);

  return (
    <div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Collapsed State - Just the Palette Icon */}
      <div
        className={`flex items-center transition-all duration-300 ${
          isExpanded ? 'translate-x-0' : 'translate-x-2'
        }`}
      >
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="bg-blue-panel/90 hover:bg-blue-panel border border-blue-primary/40 text-blue-accent p-3 rounded-l-lg shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
            title="Theme Selector"
          >
            <Palette size={20} />
          </button>
        )}

        {/* Expanded State - Full Theme Menu */}
        {isExpanded && (
          <div className="flex items-center">
            {/* Close Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="bg-blue-panel/90 border border-blue-primary/40 text-blue-accent p-2 rounded-l-lg hover:bg-blue-primary/20 transition-colors"
              title="Close Theme Selector"
            >
              <ChevronRight size={16} />
            </button>

            {/* Theme Options */}
            <div className="bg-blue-panel/90 border border-blue-primary/40 rounded-l-lg shadow-xl backdrop-blur-sm">
              {themes.map((t, index) => (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    setIsExpanded(false);
                  }}
                  className={`block w-full px-4 py-3 text-sm transition-all duration-200 border-b border-blue-primary/20 last:border-b-0 hover:bg-blue-primary/20 ${
                    theme === t
                      ? 'text-blue-accent bg-blue-primary/10 border-l-4 border-blue-accent'
                      : 'text-slate-300 hover:text-blue-accent'
                  } ${index === 0 ? 'rounded-tl-lg' : ''} ${index === themes.length - 1 ? 'rounded-bl-lg' : ''}`}
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                  title={`Switch to ${t} theme`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}