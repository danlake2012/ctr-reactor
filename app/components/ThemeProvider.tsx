'use client';

import { useEffect } from 'react';
import { useThemeStore } from '../../lib/store';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Apply theme to document body on mount and when theme changes
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
}