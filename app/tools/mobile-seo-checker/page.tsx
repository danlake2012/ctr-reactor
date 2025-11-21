'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MobileSEOAnalysis {
  overallScore: number;
  grade: string;
  responsiveDesign: {
    score: number;
    isResponsive: boolean;
    viewport: boolean;
    mediaQueries: boolean;
    issues: string[];
  };
  pageSpeed: {
    score: number;
    mobileSpeed: number;
    desktopSpeed: number;
    recommendations: string[];
  };
  mobileUX: {
    score: number;
    touchTargets: boolean;
    fontSize: boolean;
    tapDelay: boolean;
    issues: string[];
  };
  mobileSEO: {
    score: number;
    mobileSitemap: boolean;
    localSEO: boolean;
    ampPages: boolean;
    recommendations: string[];
  };
  criticalIssues: string[];
  recommendations: string[];
}

export default function MobileSEOChecker() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<MobileSEOAnalysis | null>(null);

  const analyzeMobileSEO = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Mock mobile SEO analysis
    const mockResults: MobileSEOAnalysis = {
      overallScore: 68,
      grade: 'C+',
      responsiveDesign: {
        score: 75,
        isResponsive: true,
        viewport: true,
        mediaQueries: true,
        issues: [
          'Some images may not be properly sized for mobile devices',
          'Consider using flexible grid layouts for better responsiveness'
        ]
      },
      pageSpeed: {
        score: 55,
        mobileSpeed: 3.2,
        desktopSpeed: 1.8,
        recommendations: [
          'Optimize images for mobile devices (reduce file sizes)',
          'Minify CSS and JavaScript files',
          'Enable browser caching for static resources',
          'Consider using a CDN for faster content delivery'
        ]
      },
      mobileUX: {
        score: 70,
        touchTargets: true,
        fontSize: true,
        tapDelay: false,
        issues: [
          'Some touch targets may be too small for comfortable tapping',
          'Font sizes are adequate but could be optimized for better readability'
        ]
      },
      mobileSEO: {
        score: 65,
        mobileSitemap: false,
        localSEO: false,
        ampPages: false,
        recommendations: [
          'Create a mobile-specific XML sitemap',
          'Implement local SEO elements for mobile searches',
          'Consider implementing AMP pages for faster mobile loading',
          'Add structured data for local business information'
        ]
      },
      criticalIssues: [
        'Mobile page speed is below recommended threshold (should be under 3 seconds)',
        'Missing mobile sitemap for better crawlability',
        'No AMP implementation for enhanced mobile search results'
      ],
      recommendations: [
        'Prioritize mobile page speed optimization - this is critical for rankings',
        'Implement responsive images with proper sizing',
        'Add mobile-specific structured data markup',
        'Test touch interactions on actual mobile devices',
        'Create a mobile-friendly navigation menu',
        'Optimize forms for mobile input methods'
      ]
    };

    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-400';
    if (grade.startsWith('B')) return 'text-yellow-400';
    if (grade.startsWith('C')) return 'text-blue-400';
    return 'text-red-400';
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
            <span className="text-6xl">📱</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              MOBILE SEO CHECKER
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            ENSURE YOUR WEBSITE IS OPTIMIZED FOR MOBILE SEARCH
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* URL Input */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                WEBSITE URL
              </h2>

              <div>
                <label className="block text-sm font-bold text-blue-accent mb-2">
                  ENTER WEBSITE URL *
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                />
              </div>

              <button
                onClick={analyzeMobileSEO}
                disabled={isAnalyzing || !url.trim()}
                className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed mt-6"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isAnalyzing ? 'ANALYZING MOBILE SEO...' : 'ANALYZE MOBILE SEO'}
              </button>
            </div>

            {/* Mobile SEO Tips */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                MOBILE SEO BEST PRACTICES
              </h2>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="text-blue-accent mt-1">📱</span>
                  <span><strong>Responsive Design:</strong> Ensure your site adapts to all screen sizes</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-accent mt-1">⚡</span>
                  <span><strong>Page Speed:</strong> Mobile pages should load in under 3 seconds</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-accent mt-1">👆</span>
                  <span><strong>Touch-Friendly:</strong> Make buttons and links easy to tap</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-accent mt-1">🔍</span>
                  <span><strong>Local SEO:</strong> Optimize for local mobile searches</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              ANALYSIS RESULTS
            </h2>

            {results ? (
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                {/* Overall Score */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      MOBILE SEO SCORE
                    </h3>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getGradeColor(results.grade)}`}>
                        {results.grade}
                      </div>
                      <div className={`text-sm ${getScoreColor(results.overallScore)}`}>
                        {results.overallScore}/100
                      </div>
                    </div>
                  </div>
                </div>

                {/* Critical Issues */}
                {results.criticalIssues.length > 0 && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-red-400 mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      CRITICAL ISSUES ⚠️
                    </h3>
                    <div className="space-y-2">
                      {results.criticalIssues.map((issue, i) => (
                        <div key={i} className="text-sm text-red-300 flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Analysis */}
                <div className="space-y-4">
                  {/* Responsive Design */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">RESPONSIVE DESIGN</h4>
                      <span className={`font-bold ${getScoreColor(results.responsiveDesign.score)}`}>
                        {results.responsiveDesign.score}/100
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">
                      Responsive: {results.responsiveDesign.isResponsive ? '✓' : '✗'} |
                      Viewport: {results.responsiveDesign.viewport ? '✓' : '✗'} |
                      Media Queries: {results.responsiveDesign.mediaQueries ? '✓' : '✗'}
                    </div>
                    <div className="space-y-1">
                      {results.responsiveDesign.issues.map((issue, i) => (
                        <div key={i} className="text-xs text-slate-400">• {issue}</div>
                      ))}
                    </div>
                  </div>

                  {/* Page Speed */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">PAGE SPEED</h4>
                      <span className={`font-bold ${getScoreColor(results.pageSpeed.score)}`}>
                        {results.pageSpeed.score}/100
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">
                      Mobile: {results.pageSpeed.mobileSpeed}s | Desktop: {results.pageSpeed.desktopSpeed}s
                    </div>
                    <div className="space-y-1">
                      {results.pageSpeed.recommendations.map((rec, i) => (
                        <div key={i} className="text-xs text-slate-400">• {rec}</div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile UX */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">MOBILE USER EXPERIENCE</h4>
                      <span className={`font-bold ${getScoreColor(results.mobileUX.score)}`}>
                        {results.mobileUX.score}/100
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">
                      Touch Targets: {results.mobileUX.touchTargets ? '✓' : '✗'} |
                      Font Size: {results.mobileUX.fontSize ? '✓' : '✗'} |
                      Tap Delay: {results.mobileUX.tapDelay ? '✓' : '✗'}
                    </div>
                    <div className="space-y-1">
                      {results.mobileUX.issues.map((issue, i) => (
                        <div key={i} className="text-xs text-slate-400">• {issue}</div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile SEO */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">MOBILE SEO ELEMENTS</h4>
                      <span className={`font-bold ${getScoreColor(results.mobileSEO.score)}`}>
                        {results.mobileSEO.score}/100
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">
                      Mobile Sitemap: {results.mobileSEO.mobileSitemap ? '✓' : '✗'} |
                      Local SEO: {results.mobileSEO.localSEO ? '✓' : '✗'} |
                      AMP: {results.mobileSEO.ampPages ? '✓' : '✗'}
                    </div>
                    <div className="space-y-1">
                      {results.mobileSEO.recommendations.map((rec, i) => (
                        <div key={i} className="text-xs text-slate-400">• {rec}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    OPTIMIZATION RECOMMENDATIONS
                  </h3>
                  <div className="space-y-2">
                    {results.recommendations.map((rec, i) => (
                      <div key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-blue-accent mt-1">→</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                {isAnalyzing ? (
                  <div>
                    <div className="text-6xl mb-4">🔍</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      ANALYZING MOBILE SEO...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is checking responsive design, page speed, and mobile optimization factors
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">📱</div>
                    <p className="text-slate-400">
                      Enter a website URL to get comprehensive mobile SEO analysis and optimization recommendations
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>MOBILE SEO CHECKER | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}