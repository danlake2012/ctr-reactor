'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SEOAnalysis {
  title: { present: boolean; content: string; length: number; score: number };
  metaDescription: { present: boolean; content: string; length: number; score: number };
  h1Tags: { count: number; content: string[]; score: number };
  h2Tags: { count: number; content: string[]; score: number };
  images: { total: number; withAlt: number; withoutAlt: number; score: number };
  internalLinks: { count: number; score: number };
  externalLinks: { count: number; score: number };
  wordCount: { count: number; score: number };
  keywordDensity: { primary: string; density: number; score: number };
  mobileFriendly: { score: number; issues: string[] };
  pageSpeed: { score: number; insights: string[] };
}

export default function OnPageSEOAnalyzer() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<SEOAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock SEO analysis results
    const mockResults: SEOAnalysis = {
      title: {
        present: true,
        content: 'Example Page Title - Best SEO Practices',
        length: 45,
        score: 85
      },
      metaDescription: {
        present: true,
        content: 'This is an example meta description that provides a compelling summary of the page content for search engines.',
        length: 120,
        score: 90
      },
      h1Tags: {
        count: 1,
        content: ['Example H1 Heading'],
        score: 100
      },
      h2Tags: {
        count: 3,
        content: ['Section 1', 'Section 2', 'Section 3'],
        score: 95
      },
      images: {
        total: 8,
        withAlt: 6,
        withoutAlt: 2,
        score: 75
      },
      internalLinks: {
        count: 12,
        score: 85
      },
      externalLinks: {
        count: 3,
        score: 90
      },
      wordCount: {
        count: 850,
        score: 80
      },
      keywordDensity: {
        primary: 'SEO optimization',
        density: 2.1,
        score: 85
      },
      mobileFriendly: {
        score: 88,
        issues: ['Minor viewport issues detected']
      },
      pageSpeed: {
        score: 72,
        insights: ['Optimize images', 'Minify CSS', 'Enable compression']
      }
    };

    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getOverallScore = () => {
    if (!results) return 0;
    const scores = [
      results.title.score,
      results.metaDescription.score,
      results.h1Tags.score,
      results.h2Tags.score,
      results.images.score,
      results.internalLinks.score,
      results.externalLinks.score,
      results.wordCount.score,
      results.keywordDensity.score,
      results.mobileFriendly.score,
      results.pageSpeed.score
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-slate-100">
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
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-accent hover:text-blue-primary transition-colors mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span style={{ fontFamily: 'Orbitron, sans-serif' }}>Back to Tools</span>
          </Link>
        </div>

        <header className="text-center py-12 mb-12 border-2 border-blue-primary rounded-xl bg-blue-primary/5 shadow-[0_0_30px_var(--blue-glow)]">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-6xl">🔧</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              ON-PAGE SEO ANALYZER
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            COMPREHENSIVE WEBSITE SEO OPTIMIZATION ANALYSIS
          </p>
        </header>

        {/* Input Section */}
        <div className="mb-8">
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              ENTER WEBSITE URL TO ANALYZE
            </h2>
            <div className="space-y-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/page"
                className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !url.trim()}
                className="bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-3 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isAnalyzing ? 'ANALYZING...' : 'ANALYZE PAGE'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  OVERALL SEO SCORE
                </h2>
                <div className={`text-6xl font-bold ${getScoreColor(getOverallScore())}`}>
                  {getOverallScore()}%
                </div>
                <p className="text-slate-300 mt-2">
                  {getOverallScore() >= 80 ? 'Excellent' : getOverallScore() >= 60 ? 'Good' : 'Needs Improvement'}
                </p>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title Analysis */}
              <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    TITLE TAG
                  </h3>
                  <span className={`text-lg font-bold ${getScoreColor(results.title.score)}`}>
                    {results.title.score}%
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">Length: {results.title.length} characters</p>
                <p className="text-sm text-slate-400 bg-slate-800/50 p-2 rounded">
                  {results.title.content}
                </p>
              </div>

              {/* Meta Description */}
              <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    META DESCRIPTION
                  </h3>
                  <span className={`text-lg font-bold ${getScoreColor(results.metaDescription.score)}`}>
                    {results.metaDescription.score}%
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">Length: {results.metaDescription.length} characters</p>
                <p className="text-sm text-slate-400 bg-slate-800/50 p-2 rounded">
                  {results.metaDescription.content}
                </p>
              </div>

              {/* Headings */}
              <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    HEADINGS
                  </h3>
                  <span className={`text-lg font-bold ${getScoreColor(results.h1Tags.score)}`}>
                    {results.h1Tags.score}%
                  </span>
                </div>
                <p className="text-sm text-slate-300">H1: {results.h1Tags.count} | H2: {results.h2Tags.count}</p>
                <div className="mt-2 space-y-1">
                  {results.h1Tags.content.slice(0, 2).map((h1, i) => (
                    <p key={i} className="text-sm text-slate-400 bg-slate-800/50 p-1 rounded">H1: {h1}</p>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    IMAGES
                  </h3>
                  <span className={`text-lg font-bold ${getScoreColor(results.images.score)}`}>
                    {results.images.score}%
                  </span>
                </div>
                <p className="text-sm text-slate-300">
                  Total: {results.images.total} | With Alt: {results.images.withAlt} | Missing Alt: {results.images.withoutAlt}
                </p>
              </div>

              {/* Links */}
              <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    LINKS
                  </h3>
                  <span className={`text-lg font-bold ${getScoreColor(results.internalLinks.score)}`}>
                    {results.internalLinks.score}%
                  </span>
                </div>
                <p className="text-sm text-slate-300">
                  Internal: {results.internalLinks.count} | External: {results.externalLinks.count}
                </p>
              </div>

              {/* Content */}
              <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    CONTENT
                  </h3>
                  <span className={`text-lg font-bold ${getScoreColor(results.wordCount.score)}`}>
                    {results.wordCount.score}%
                  </span>
                </div>
                <p className="text-sm text-slate-300">Word Count: {results.wordCount.count}</p>
                <p className="text-sm text-slate-300">Keyword Density: {results.keywordDensity.density}%</p>
              </div>

              {/* Mobile Friendly */}
              <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    MOBILE FRIENDLY
                  </h3>
                  <span className={`text-lg font-bold ${getScoreColor(results.mobileFriendly.score)}`}>
                    {results.mobileFriendly.score}%
                  </span>
                </div>
                <div className="space-y-1">
                  {results.mobileFriendly.issues.map((issue, i) => (
                    <p key={i} className="text-sm text-red-400">• {issue}</p>
                  ))}
                </div>
              </div>

              {/* Page Speed */}
              <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    PAGE SPEED
                  </h3>
                  <span className={`text-lg font-bold ${getScoreColor(results.pageSpeed.score)}`}>
                    {results.pageSpeed.score}%
                  </span>
                </div>
                <div className="space-y-1">
                  {results.pageSpeed.insights.map((insight, i) => (
                    <p key={i} className="text-sm text-yellow-400">• {insight}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>ON-PAGE SEO ANALYZER | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}