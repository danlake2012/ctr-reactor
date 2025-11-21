'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SpeedAnalysis {
  overallScore: number;
  grade: string;
  coreWebVitals: {
    lcp: { score: number; value: number; status: string };
    fid: { score: number; value: number; status: string };
    cls: { score: number; value: number; status: string };
  };
  performanceMetrics: {
    firstContentfulPaint: number;
    speedIndex: number;
    largestContentfulPaint: number;
    timeToInteractive: number;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
  };
  resourceOptimization: {
    images: { score: number; issues: string[]; savings: string };
    javascript: { score: number; issues: string[]; savings: string };
    css: { score: number; issues: string[]; savings: string };
    fonts: { score: number; issues: string[]; savings: string };
  };
  serverOptimization: {
    score: number;
    ttfb: number;
    compression: boolean;
    caching: boolean;
    cdn: boolean;
    recommendations: string[];
  };
  criticalIssues: string[];
  recommendations: string[];
}

export default function SiteSpeedOptimizer() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<SpeedAnalysis | null>(null);

  const analyzeSpeed = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 3500));

    // Mock speed analysis
    const mockResults: SpeedAnalysis = {
      overallScore: 62,
      grade: 'C-',
      coreWebVitals: {
        lcp: { score: 45, value: 3.2, status: 'Needs Improvement' },
        fid: { score: 85, value: 95, status: 'Good' },
        cls: { score: 70, value: 0.08, status: 'Good' }
      },
      performanceMetrics: {
        firstContentfulPaint: 2.1,
        speedIndex: 3.8,
        largestContentfulPaint: 3.2,
        timeToInteractive: 4.5,
        totalBlockingTime: 280,
        cumulativeLayoutShift: 0.08
      },
      resourceOptimization: {
        images: {
          score: 55,
          issues: ['Large image files detected', 'Missing modern image formats'],
          savings: '2.3 MB'
        },
        javascript: {
          score: 60,
          issues: ['Unused JavaScript code', 'Large bundle sizes'],
          savings: '1.1 MB'
        },
        css: {
          score: 75,
          issues: ['Some CSS files could be minified'],
          savings: '0.3 MB'
        },
        fonts: {
          score: 80,
          issues: ['Font loading could be optimized'],
          savings: '0.1 MB'
        }
      },
      serverOptimization: {
        score: 65,
        ttfb: 450,
        compression: true,
        caching: false,
        cdn: false,
        recommendations: [
          'Enable browser caching for static resources',
          'Consider using a CDN for faster content delivery',
          'Optimize server response time (TTFB)',
          'Implement proper cache headers'
        ]
      },
      criticalIssues: [
        'Largest Contentful Paint (LCP) is too slow (3.2s > 2.5s recommended)',
        'Images are not optimized - potential 2.3 MB savings',
        'JavaScript bundle size is too large - causing blocking time'
      ],
      recommendations: [
        'Optimize and compress images using modern formats (WebP, AVIF)',
        'Minify and compress JavaScript and CSS files',
        'Implement lazy loading for images and videos',
        'Use browser caching and a CDN for static assets',
        'Remove unused JavaScript and CSS code',
        'Optimize font loading with font-display: swap',
        'Enable text compression (GZIP) on server',
        'Reduce server response time (TTFB) below 600ms'
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

  const getVitalsColor = (status: string) => {
    if (status === 'Good') return 'text-green-400';
    if (status === 'Needs Improvement') return 'text-yellow-400';
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
            <span className="text-6xl">⚡</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              SITE SPEED OPTIMIZER
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            ANALYZE AND OPTIMIZE WEBSITE LOADING SPEED
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
                onClick={analyzeSpeed}
                disabled={isAnalyzing || !url.trim()}
                className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed mt-6"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isAnalyzing ? 'ANALYZING SPEED...' : 'ANALYZE SITE SPEED'}
              </button>
            </div>

            {/* Speed Metrics Guide */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                CORE WEB VITALS
              </h2>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="text-blue-accent mt-1">🏆</span>
                  <span><strong>LCP (Largest Contentful Paint):</strong> Measures loading performance (target: &lt;2.5s)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-accent mt-1">👆</span>
                  <span><strong>FID (First Input Delay):</strong> Measures interactivity (target: &lt;100ms)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-accent mt-1">📐</span>
                  <span><strong>CLS (Cumulative Layout Shift):</strong> Measures visual stability (target: &lt;0.1)</span>
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
                      SPEED SCORE
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

                {/* Core Web Vitals */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    CORE WEB VITALS
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-slate-900/50 rounded p-3 text-center">
                      <div className="text-xs text-slate-400 mb-1">LCP</div>
                      <div className={`font-bold ${getVitalsColor(results.coreWebVitals.lcp.status)}`}>
                        {results.coreWebVitals.lcp.value}s
                      </div>
                      <div className="text-xs text-slate-400">{results.coreWebVitals.lcp.status}</div>
                    </div>
                    <div className="bg-slate-900/50 rounded p-3 text-center">
                      <div className="text-xs text-slate-400 mb-1">FID</div>
                      <div className={`font-bold ${getVitalsColor(results.coreWebVitals.fid.status)}`}>
                        {results.coreWebVitals.fid.value}ms
                      </div>
                      <div className="text-xs text-slate-400">{results.coreWebVitals.fid.status}</div>
                    </div>
                    <div className="bg-slate-900/50 rounded p-3 text-center">
                      <div className="text-xs text-slate-400 mb-1">CLS</div>
                      <div className={`font-bold ${getVitalsColor(results.coreWebVitals.cls.status)}`}>
                        {results.coreWebVitals.cls.value}
                      </div>
                      <div className="text-xs text-slate-400">{results.coreWebVitals.cls.status}</div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    PERFORMANCE METRICS
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>FCP: <span className="text-blue-accent">{results.performanceMetrics.firstContentfulPaint}s</span></div>
                    <div>Speed Index: <span className="text-blue-accent">{results.performanceMetrics.speedIndex}s</span></div>
                    <div>LCP: <span className="text-blue-accent">{results.performanceMetrics.largestContentfulPaint}s</span></div>
                    <div>TTI: <span className="text-blue-accent">{results.performanceMetrics.timeToInteractive}s</span></div>
                    <div>TBT: <span className="text-blue-accent">{results.performanceMetrics.totalBlockingTime}ms</span></div>
                    <div>CLS: <span className="text-blue-accent">{results.performanceMetrics.cumulativeLayoutShift}</span></div>
                  </div>
                </div>

                {/* Resource Optimization */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    RESOURCE OPTIMIZATION
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Images</span>
                      <span className={`text-sm font-bold ${getScoreColor(results.resourceOptimization.images.score)}`}>
                        {results.resourceOptimization.images.score}/100 ({results.resourceOptimization.images.savings} savings)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">JavaScript</span>
                      <span className={`text-sm font-bold ${getScoreColor(results.resourceOptimization.javascript.score)}`}>
                        {results.resourceOptimization.javascript.score}/100 ({results.resourceOptimization.javascript.savings} savings)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CSS</span>
                      <span className={`text-sm font-bold ${getScoreColor(results.resourceOptimization.css.score)}`}>
                        {results.resourceOptimization.css.score}/100 ({results.resourceOptimization.css.savings} savings)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fonts</span>
                      <span className={`text-sm font-bold ${getScoreColor(results.resourceOptimization.fonts.score)}`}>
                        {results.resourceOptimization.fonts.score}/100 ({results.resourceOptimization.fonts.savings} savings)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Server Optimization */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-blue-accent">SERVER OPTIMIZATION</h4>
                    <span className={`font-bold ${getScoreColor(results.serverOptimization.score)}`}>
                      {results.serverOptimization.score}/100
                    </span>
                  </div>
                  <div className="text-sm text-slate-300 mb-2">
                    TTFB: {results.serverOptimization.ttfb}ms |
                    Compression: {results.serverOptimization.compression ? '✓' : '✗'} |
                    Caching: {results.serverOptimization.caching ? '✓' : '✗'} |
                    CDN: {results.serverOptimization.cdn ? '✓' : '✗'}
                  </div>
                  <div className="space-y-1">
                    {results.serverOptimization.recommendations.map((rec, i) => (
                      <div key={i} className="text-xs text-slate-400">• {rec}</div>
                    ))}
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
                    <div className="text-6xl mb-4">⚡</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      ANALYZING SITE SPEED...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is measuring Core Web Vitals, resource loading, and server performance
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">🏃</div>
                    <p className="text-slate-400">
                      Enter a website URL to get comprehensive speed analysis and optimization recommendations
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>SITE SPEED OPTIMIZER | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}