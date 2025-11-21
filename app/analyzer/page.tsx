'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnalysisForm from '@/components/AnalysisForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { AnalysisResults } from '@/types';

export default function AnalyzerPage() {
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const handleReset = () => {
    setResults(null);
  };

  return (
  <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Matrix background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(var(--blue-glow) 1px, transparent 1px), linear-gradient(90deg, var(--blue-glow) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-accent hover:text-blue-primary transition-colors mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span style={{ fontFamily: 'Orbitron, sans-serif' }}>Back to Home</span>
          </Link>
        </div>

  <header className="text-center py-12 mb-12 border-2 border-blue-primary rounded-xl bg-blue-primary/5 shadow-[0_0_30px_var(--blue-glow)]">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-6xl">⚡</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              CTR-REACTOR
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            ADVANCED AD PERFORMANCE ANALYSIS SYSTEM
          </p>
        </header>

        {/* Main Content */}
        <main>
          {!results ? (
            <AnalysisForm onAnalysisComplete={setResults} />
          ) : (
            <ResultsDisplay results={results} onReset={handleReset} />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>CTR-REACTOR v2.0 | &copy; 2025 | OPTIMIZING DIGITAL ADVERTISING</p>
        </footer>
      </div>
    </div>
  );
}
