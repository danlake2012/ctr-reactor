'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CoreWebVitalsResult {
  overallScore: number;
  grade: string;
  summary: {
    lcp: number;
    fid: number;
    cls: number;
    fcp: number;
    ttfb: number;
    totalBlockingTime: number;
  };
  metrics: {
    lcp: {
      value: number;
      status: 'good' | 'needs-improvement' | 'poor';
      target: string;
      impact: string;
      recommendations: string[];
    };
    fid: {
      value: number;
      status: 'good' | 'needs-improvement' | 'poor';
      target: string;
      impact: string;
      recommendations: string[];
    };
    cls: {
      value: number;
      status: 'good' | 'needs-improvement' | 'poor';
      target: string;
      impact: string;
      recommendations: string[];
    };
    fcp: {
      value: number;
      status: 'good' | 'needs-improvement' | 'poor';
      target: string;
      impact: string;
      recommendations: string[];
    };
    ttfb: {
      value: number;
      status: 'good' | 'needs-improvement' | 'poor';
      target: string;
      impact: string;
      recommendations: string[];
    };
    tbt: {
      value: number;
      status: 'good' | 'needs-improvement' | 'poor';
      target: string;
      impact: string;
      recommendations: string[];
    };
  };
  opportunities: Array<{
    title: string;
    impact: 'high' | 'medium' | 'low';
    savings: string;
    description: string;
    actions: string[];
  }>;
  diagnostics: Array<{
    category: string;
    issues: Array<{
      title: string;
      severity: 'high' | 'medium' | 'low';
      description: string;
      solution: string;
    }>;
  }>;
  resources: Array<{
    url: string;
    type: 'script' | 'stylesheet' | 'image' | 'font' | 'other';
    size: number;
    loadTime: number;
    isRenderBlocking: boolean;
    optimization: string[];
  }>;
  recommendations: string[];
}

export default function CoreWebVitalsMonitor() {
  const [url, setUrl] = useState('');
  const [device, setDevice] = useState('mobile');
  const [location, setLocation] = useState('United States');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [results, setResults] = useState<CoreWebVitalsResult | null>(null);

  const startMonitoring = async () => {
    if (!url.trim()) return;

    setIsMonitoring(true);

    // Simulate AI monitoring delay
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Mock comprehensive Core Web Vitals results
    const mockResults: CoreWebVitalsResult = {
      overallScore: 72,
      grade: 'C+',
      summary: {
        lcp: 3.2,
        fid: 85,
        cls: 0.08,
        fcp: 2.1,
        ttfb: 450,
        totalBlockingTime: 320
      },
      metrics: {
        lcp: {
          value: 3.2,
          status: 'needs-improvement',
          target: '< 2.5s',
          impact: 'Largest Contentful Paint measures loading performance',
          recommendations: [
            'Optimize server response times',
            'Remove render-blocking JavaScript and CSS',
            'Optimize images and web fonts',
            'Use preload for critical resources'
          ]
        },
        fid: {
          value: 85,
          status: 'needs-improvement',
          target: '< 100ms',
          impact: 'First Input Delay measures interactivity',
          recommendations: [
            'Minimize JavaScript execution time',
            'Reduce unused JavaScript',
            'Use web workers for heavy computations',
            'Optimize third-party scripts'
          ]
        },
        cls: {
          value: 0.08,
          status: 'good',
          target: '< 0.1',
          impact: 'Cumulative Layout Shift measures visual stability',
          recommendations: [
            'Include size attributes on images and video elements',
            'Reserve space for ad slots',
            'Avoid inserting content above existing content',
            'Use CSS aspect-ratio for dynamic content'
          ]
        },
        fcp: {
          value: 2.1,
          status: 'needs-improvement',
          target: '< 1.8s',
          impact: 'First Contentful Paint measures perceived load speed',
          recommendations: [
            'Eliminate render-blocking resources',
            'Minimize CSS delivery',
            'Optimize font loading',
            'Reduce server response times'
          ]
        },
        ttfb: {
          value: 450,
          status: 'needs-improvement',
          target: '< 800ms',
          impact: 'Time to First Byte measures server responsiveness',
          recommendations: [
            'Use a fast hosting provider',
            'Implement caching strategies',
            'Optimize database queries',
            'Use a CDN for static assets'
          ]
        },
        tbt: {
          value: 320,
          status: 'poor',
          target: '< 200ms',
          impact: 'Total Blocking Time measures main thread availability',
          recommendations: [
            'Reduce JavaScript execution time',
            'Minimize unused JavaScript',
            'Break up long tasks',
            'Optimize third-party scripts'
          ]
        }
      },
      opportunities: [
        {
          title: 'Enable text compression',
          impact: 'high',
          savings: '1.2s',
          description: 'Compressing resources with gzip or deflate can reduce the number of bytes sent over the network.',
          actions: ['Enable compression on your server', 'Use a CDN that supports compression']
        },
        {
          title: 'Defer offscreen images',
          impact: 'high',
          savings: '0.8s',
          description: 'Consider lazy-loading offscreen and hidden images after all critical resources have finished loading.',
          actions: ['Use loading="lazy" on img elements', 'Implement intersection observer for custom lazy loading']
        },
        {
          title: 'Minify JavaScript',
          impact: 'medium',
          savings: '0.3s',
          description: 'Minifying JavaScript files can reduce payload sizes and script parse time.',
          actions: ['Use a JavaScript minifier', 'Enable minification in your build process']
        },
        {
          title: 'Remove unused CSS',
          impact: 'medium',
          savings: '0.2s',
          description: 'Remove dead rules from stylesheets and defer the loading of CSS not used for above-the-fold content.',
          actions: ['Identify unused CSS rules', 'Use CSS-in-JS or component-based styling']
        }
      ],
      diagnostics: [
        {
          category: 'JavaScript',
          issues: [
            {
              title: 'Long main thread tasks',
              severity: 'high',
              description: 'Main thread tasks are taking longer than 50ms to execute',
              solution: 'Break up long tasks, optimize JavaScript execution'
            },
            {
              title: 'Unused JavaScript',
              severity: 'medium',
              description: 'Reduce unused JavaScript and defer loading scripts until they are required',
              solution: 'Code-split your JavaScript bundles, use dynamic imports'
            }
          ]
        },
        {
          category: 'Images',
          issues: [
            {
              title: 'Unoptimized images',
              severity: 'high',
              description: 'Images are not properly sized or compressed',
              solution: 'Use modern image formats (WebP, AVIF), implement responsive images'
            },
            {
              title: 'Missing size attributes',
              severity: 'medium',
              description: 'Image elements do not have explicit width and height',
              solution: 'Add width and height attributes to img elements'
            }
          ]
        },
        {
          category: 'Server',
          issues: [
            {
              title: 'Slow server response',
              severity: 'high',
              description: 'Server response time is above 600ms',
              solution: 'Optimize server configuration, implement caching, use faster hosting'
            }
          ]
        }
      ],
      resources: [
        {
          url: '/js/main.bundle.js',
          type: 'script',
          size: 245680,
          loadTime: 1200,
          isRenderBlocking: true,
          optimization: ['Minify', 'Compress', 'Defer loading']
        },
        {
          url: '/css/styles.css',
          type: 'stylesheet',
          size: 89450,
          loadTime: 300,
          isRenderBlocking: true,
          optimization: ['Minify', 'Compress', 'Inline critical CSS']
        },
        {
          url: '/images/hero-image.jpg',
          type: 'image',
          size: 456780,
          loadTime: 800,
          isRenderBlocking: false,
          optimization: ['Compress', 'Use WebP format', 'Lazy load']
        },
        {
          url: '/fonts/roboto.woff2',
          type: 'font',
          size: 23450,
          loadTime: 150,
          isRenderBlocking: true,
          optimization: ['Preload', 'Use font-display: swap']
        }
      ],
      recommendations: [
        'Prioritize fixing Largest Contentful Paint (LCP) - currently at 3.2s, target is < 2.5s',
        'Address Total Blocking Time (TBT) issues - 320ms is significantly above the 200ms target',
        'Implement lazy loading for images to improve initial page load',
        'Minify and compress JavaScript and CSS resources',
        'Optimize server response times and implement proper caching',
        'Use modern image formats (WebP/AVIF) and implement responsive images',
        'Defer non-critical JavaScript and CSS to improve loading performance',
        'Monitor Core Web Vitals regularly and set up performance budgets',
        'Consider using a Content Delivery Network (CDN) for global performance',
        'Implement critical CSS inlining and defer non-critical styles'
      ]
    };

    setResults(mockResults);
    setIsMonitoring(false);
  };

  const getStatusColor = (status: string) => {
    if (status === 'good') return 'text-green-400';
    if (status === 'needs-improvement') return 'text-yellow-400';
    return 'text-red-400';
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'high') return 'text-red-400';
    if (impact === 'medium') return 'text-yellow-400';
    return 'text-green-400';
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'high') return 'text-red-400';
    if (severity === 'medium') return 'text-yellow-400';
    return 'text-green-400';
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
              CORE WEB VITALS MONITOR
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            MONITOR GOOGLE&apos;S CORE WEB VITALS METRICS FOR OPTIMAL PERFORMANCE
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* URL & Settings */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                PERFORMANCE ANALYSIS CONFIGURATION
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    WEBSITE URL *
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-blue-accent mb-2">
                      DEVICE TYPE
                    </label>
                    <select
                      value={device}
                      onChange={(e) => setDevice(e.target.value)}
                      className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      <option value="mobile">Mobile</option>
                      <option value="desktop">Desktop</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-blue-accent mb-2">
                      TEST LOCATION
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      <option>United States</option>
                      <option>Europe</option>
                      <option>Asia</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={startMonitoring}
                  disabled={isMonitoring || !url.trim()}
                  className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {isMonitoring ? 'ANALYZING PERFORMANCE...' : 'START CORE WEB VITALS ANALYSIS'}
                </button>
              </div>
            </div>

            {/* Info Panel */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h3 className="text-xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                CORE WEB VITALS METRICS
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">LCP (Largest Contentful Paint)</span>
                  <span className="text-green-400">&lt; 2.5s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">FID (First Input Delay)</span>
                  <span className="text-green-400">&lt; 100ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">CLS (Cumulative Layout Shift)</span>
                  <span className="text-green-400">&lt; 0.1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">FCP (First Contentful Paint)</span>
                  <span className="text-green-400">&lt; 1.8s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">TTFB (Time to First Byte)</span>
                  <span className="text-green-400">&lt; 800ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">TBT (Total Blocking Time)</span>
                  <span className="text-green-400">&lt; 200ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              PERFORMANCE ANALYSIS
            </h2>

            {results ? (
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                {/* Overall Score */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      OVERALL PERFORMANCE SCORE
                    </h3>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${results.overallScore >= 90 ? 'text-green-400' : results.overallScore >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {results.grade}
                      </div>
                      <div className={`text-sm ${results.overallScore >= 90 ? 'text-green-400' : results.overallScore >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {results.overallScore}/100
                      </div>
                    </div>
                  </div>

                  {/* Core Web Vitals Summary */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.lcp}s</div>
                      <div className="text-xs text-slate-400">LCP</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.fid}ms</div>
                      <div className="text-xs text-slate-400">FID</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.cls}</div>
                      <div className="text-xs text-slate-400">CLS</div>
                    </div>
                  </div>
                </div>

                {/* Detailed Metrics */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    DETAILED METRICS
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(results.metrics).map(([key, metric]) => (
                      <div key={key} className="bg-slate-900/30 rounded p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-blue-accent uppercase">{key}</span>
                          <span className={`text-sm px-2 py-1 rounded ${getStatusColor(metric.status)} bg-slate-800/50`}>
                            {metric.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-slate-300 mb-1">
                          Value: <span className="text-blue-accent font-bold">
                            {key === 'cls' ? metric.value : key.includes('fid') || key.includes('ttfb') || key.includes('tbt') ? `${metric.value}ms` : `${metric.value}s`}
                          </span> | Target: <span className="text-green-400">{metric.target}</span>
                        </div>
                        <div className="text-xs text-slate-400 mb-2">{metric.impact}</div>
                        <div className="text-xs text-slate-300">
                          <strong>Recommendations:</strong> {metric.recommendations.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Opportunities */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    OPTIMIZATION OPPORTUNITIES
                  </h3>
                  <div className="space-y-2">
                    {results.opportunities.map((opp, i) => (
                      <div key={i} className="text-sm bg-slate-900/30 rounded p-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold">{opp.title}</span>
                          <span className={`text-xs ${getImpactColor(opp.impact)}`}>{opp.impact.toUpperCase()}</span>
                        </div>
                        <div className="text-xs text-slate-400 mb-1">
                          Potential Savings: <span className="text-green-400 font-bold">{opp.savings}</span>
                        </div>
                        <div className="text-xs text-slate-300">{opp.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diagnostics */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    DIAGNOSTICS & ISSUES
                  </h3>
                  <div className="space-y-3">
                    {results.diagnostics.map((diag, i) => (
                      <div key={i} className="bg-slate-900/30 rounded p-2">
                        <h4 className="font-bold text-blue-accent mb-2">{diag.category}</h4>
                        <div className="space-y-2">
                          {diag.issues.map((issue, j) => (
                            <div key={j} className="text-xs bg-slate-800/30 rounded p-2">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold">{issue.title}</span>
                                <span className={`text-xs ${getSeverityColor(issue.severity)}`}>{issue.severity.toUpperCase()}</span>
                              </div>
                              <div className="text-slate-400 mb-1">{issue.description}</div>
                              <div className="text-slate-300"><strong>Solution:</strong> {issue.solution}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resource Analysis */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    RESOURCE ANALYSIS
                  </h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {results.resources.map((resource, i) => (
                      <div key={i} className="text-xs bg-slate-900/30 rounded p-2 flex justify-between items-center">
                        <div className="truncate mr-2">
                          <span className="text-blue-accent">{resource.type.toUpperCase()}</span>: {resource.url}
                        </div>
                        <div className="text-right text-slate-400">
                          <div>{formatBytes(resource.size)} | {formatTime(resource.loadTime)}</div>
                          {resource.isRenderBlocking && <div className="text-red-400">Render Blocking</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    ACTIONABLE RECOMMENDATIONS
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
                {isMonitoring ? (
                  <div>
                    <div className="text-6xl mb-4">⚡</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      ANALYZING CORE WEB VITALS...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is measuring loading performance, interactivity, and visual stability metrics
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-slate-400">
                      Enter a website URL to analyze Core Web Vitals performance metrics
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>CORE WEB VITALS MONITOR | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}