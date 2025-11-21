import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AnalysisResults } from '../types';

interface AnalysisStore {
  results: AnalysisResults | null;
  setResults: (results: AnalysisResults) => void;
  clearResults: () => void;
  // Sample data for development
  getSampleData: () => AnalysisResults;
}

interface ThemeStore {
  theme: string;
  setTheme: (theme: string) => void;
  themes: string[];
}

const sampleData: AnalysisResults = {
  grade: { score: 87, letter: 'B+' },
  metrics: {
    ctr: 3.2,
    cvr: 2.1,
    cpc: 0.85,
    cpa: 40.25
  },
  recommendations: [
    'Improve headline clarity with more compelling copy',
    'Add stronger call-to-action buttons',
    'Consider A/B testing different ad images',
    'Optimize targeting to reach higher-intent audiences',
    'Test different ad placements for better visibility'
  ],
  adData: {
    headline: 'Sample Ad Headline',
    description: 'Sample ad description for analysis',
    impressions: 10000,
    clicks: 320,
    conversions: 67,
    cost: 272
  }
};

export const useAnalysisStore = create<AnalysisStore>()(
  persist(
    (set) => ({
      results: null,
      setResults: (results: AnalysisResults) => set({ results }),
      clearResults: () => set({ results: null }),
      getSampleData: () => sampleData,
    }),
    {
      name: 'analysis-store',
    }
  )
);

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'blue',
      setTheme: (theme: string) => {
        set({ theme });
        // Apply theme to document body
        if (typeof window !== 'undefined') {
          document.body.setAttribute('data-theme', theme);
        }
      },
      themes: ['blue', 'green', 'orange', 'purple'],
    }),
    {
      name: 'theme-store',
    }
  )
);