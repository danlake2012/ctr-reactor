'use client';

import { useState } from 'react';
import Link from 'next/link';

interface WebsiteAudit {
  overallScore: number;
  grade: string;
  summary: {
    totalIssues: number;
    criticalIssues: number;
    warnings: number;
    passedChecks: number;
  };
  seoAudit: {
    score: number;
    titleTags: { status: string; issues: string[] };
    metaDescriptions: { status: string; issues: string[] };
    headings: { status: string; issues: string[] };
    images: { status: string; issues: string[] };
    internalLinks: { status: string; issues: string[] };
    recommendations: string[];
  };
  technicalAudit: {
    score: number;
    pageSpeed: { status: string; loadTime: number; issues: string[] };
    mobileFriendly: { status: string; issues: string[] };
    sslCertificate: { status: string; valid: boolean; expiry: string };
    brokenLinks: { status: string; count: number; issues: string[] };
    recommendations: string[];
  };
  securityAudit: {
    score: number;
    httpsEnabled: boolean;
    securityHeaders: { status: string; issues: string[] };
    malwareCheck: { status: string; issues: string[] };
    recommendations: string[];
  };
  contentAudit: {
    score: number;
    readability: { status: string; score: number; issues: string[] };
    duplicateContent: { status: string; issues: string[] };
    keywordOptimization: { status: string; issues: string[] };
    recommendations: string[];
  };
  criticalIssues: string[];
  priorityFixes: string[];
  recommendations: string[];
}

export default function WebsiteAuditPro() {
  const [url, setUrl] = useState('');
  const [auditDepth, setAuditDepth] = useState<'basic' | 'comprehensive'>('comprehensive');
  const [isAuditing, setIsAuditing] = useState(false);
  const [results, setResults] = useState<WebsiteAudit | null>(null);

  const runWebsiteAudit = async () => {
    if (!url.trim()) return;

    setIsAuditing(true);

    // Simulate AI audit delay (longer for comprehensive)
    const delay = auditDepth === 'comprehensive' ? 6000 : 3000;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Mock comprehensive website audit
    const mockResults: WebsiteAudit = {
      overallScore: 67,
      grade: 'C+',
      summary: {
        totalIssues: 23,
        criticalIssues: 5,
        warnings: 12,
        passedChecks: 18
      },
      seoAudit: {
        score: 72,
        titleTags: {
          status: 'Good',
          issues: ['2 pages missing title tags', '1 title tag too long (>60 characters)']
        },
        metaDescriptions: {
          status: 'Needs Improvement',
          issues: ['8 pages missing meta descriptions', '3 descriptions too long (>160 characters)']
        },
        headings: {
          status: 'Good',
          issues: ['Missing H1 tag on 1 page', 'Inconsistent heading structure on 3 pages']
        },
        images: {
          status: 'Needs Improvement',
          issues: ['12 images missing alt tags', '5 images not optimized for web']
        },
        internalLinks: {
          status: 'Good',
          issues: ['Some pages have low internal link count']
        },
        recommendations: [
          'Add missing title tags and meta descriptions',
          'Optimize image alt tags for SEO',
          'Ensure proper heading hierarchy (H1-H6)',
          'Improve internal linking structure'
        ]
      },
      technicalAudit: {
        score: 58,
        pageSpeed: {
          status: 'Poor',
          loadTime: 4.2,
          issues: ['Large image files', 'Unminified JavaScript', 'Render-blocking resources']
        },
        mobileFriendly: {
          status: 'Good',
          issues: ['Some elements too close together on mobile']
        },
        sslCertificate: {
          status: 'Good',
          valid: true,
          expiry: '2025-12-15'
        },
        brokenLinks: {
          status: 'Needs Improvement',
          count: 7,
          issues: ['7 broken internal links found', '3 broken external links']
        },
        recommendations: [
          'Optimize images and enable compression',
          'Minify CSS and JavaScript files',
          'Fix all broken links',
          'Eliminate render-blocking resources',
          'Enable browser caching'
        ]
      },
      securityAudit: {
        score: 85,
        httpsEnabled: true,
        securityHeaders: {
          status: 'Good',
          issues: ['Missing some security headers (CSP, HSTS)']
        },
        malwareCheck: {
          status: 'Clean',
          issues: []
        },
        recommendations: [
          'Add Content Security Policy (CSP) header',
          'Implement HSTS header',
          'Regular security scans recommended'
        ]
      },
      contentAudit: {
        score: 63,
        readability: {
          status: 'Needs Improvement',
          score: 45,
          issues: ['Content readability score is low', 'Long sentences detected']
        },
        duplicateContent: {
          status: 'Good',
          issues: ['Minor duplicate content between pages']
        },
        keywordOptimization: {
          status: 'Needs Improvement',
          issues: ['Keyword density too low on some pages', 'Missing primary keywords in content']
        },
        recommendations: [
          'Improve content readability (aim for grade 7-8)',
          'Shorten long sentences and paragraphs',
          'Add primary keywords naturally to content',
          'Create more unique, valuable content'
        ]
      },
      criticalIssues: [
        'Page load speed is too slow (4.2s > 3s recommended)',
        '7 broken links need immediate fixing',
        '8 pages missing meta descriptions',
        '12 images missing alt tags',
        'SSL certificate expires soon'
      ],
      priorityFixes: [
        'Fix all broken links (high priority)',
        'Optimize page speed (compress images, minify code)',
        'Add missing meta descriptions',
        'Add alt tags to all images',
        'Improve content readability'
      ],
      recommendations: [
        'Implement a regular content maintenance schedule',
        'Set up automated monitoring for broken links',
        'Create an SEO checklist for content creation',
        'Consider implementing a CDN for faster loading',
        'Regular security audits and updates',
        'Monitor Core Web Vitals regularly',
        'Create XML sitemap and submit to search engines',
        'Implement structured data markup'
      ]
    };

    setResults(mockResults);
    setIsAuditing(false);
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

  const getStatusColor = (status: string) => {
    if (status === 'Good' || status === 'Clean') return 'text-green-400';
    if (status === 'Needs Improvement') return 'text-yellow-400';
    if (status === 'Poor') return 'text-red-400';
    return 'text-slate-400';
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
            <span className="text-6xl">🔍</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              WEBSITE AUDIT PRO
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            COMPREHENSIVE WEBSITE ANALYSIS & OPTIMIZATION
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Website URL */}
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
            </div>

            {/* Audit Options */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                AUDIT OPTIONS
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    AUDIT DEPTH
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="basic"
                        checked={auditDepth === 'basic'}
                        onChange={(e) => setAuditDepth(e.target.value as 'basic' | 'comprehensive')}
                        className="text-blue-accent"
                      />
                      <span className="text-sm">Basic Audit (3-5 min)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="comprehensive"
                        checked={auditDepth === 'comprehensive'}
                        onChange={(e) => setAuditDepth(e.target.value as 'basic' | 'comprehensive')}
                        className="text-blue-accent"
                      />
                      <span className="text-sm">Comprehensive (5-10 min)</span>
                    </label>
                  </div>
                </div>

                <div className="text-xs text-slate-400 bg-slate-800/30 rounded p-3">
                  <strong>Basic Audit</strong> includes: SEO elements, page speed, mobile-friendliness
                  <br />
                  <strong>Comprehensive Audit</strong> includes: All basic checks + security, content analysis, broken links, technical SEO
                </div>
              </div>

              <button
                onClick={runWebsiteAudit}
                disabled={isAuditing || !url.trim()}
                className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed mt-6"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isAuditing ? `RUNNING ${auditDepth.toUpperCase()} AUDIT...` : `RUN ${auditDepth.toUpperCase()} AUDIT`}
              </button>
            </div>

            {/* Audit Checklist */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                WHAT WE AUDIT
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">🔍</span>
                    <span>SEO Elements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">⚡</span>
                    <span>Page Speed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">📱</span>
                    <span>Mobile-Friendly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">🔒</span>
                    <span>Security</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">🔗</span>
                    <span>Broken Links</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">📝</span>
                    <span>Content Quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">🛠️</span>
                    <span>Technical SEO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">📊</span>
                    <span>Core Web Vitals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              AUDIT RESULTS
            </h2>

            {results ? (
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                {/* Overall Score */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      OVERALL WEBSITE SCORE
                    </h3>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${getGradeColor(results.grade)}`}>
                        {results.grade}
                      </div>
                      <div className={`text-sm ${getScoreColor(results.overallScore)}`}>
                        {results.overallScore}/100
                      </div>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-4 gap-3 text-center">
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-red-400">{results.summary.criticalIssues}</div>
                      <div className="text-xs text-slate-400">Critical</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-yellow-400">{results.summary.warnings}</div>
                      <div className="text-xs text-slate-400">Warnings</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-green-400">{results.summary.passedChecks}</div>
                      <div className="text-xs text-slate-400">Passed</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-400">{results.summary.totalIssues}</div>
                      <div className="text-xs text-slate-400">Total Issues</div>
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

                {/* Priority Fixes */}
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-yellow-400 mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    PRIORITY FIXES 🔧
                  </h3>
                  <div className="space-y-2">
                    {results.priorityFixes.map((fix, i) => (
                      <div key={i} className="text-sm text-yellow-300 flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">{i + 1}.</span>
                        <span>{fix}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Audit Results */}
                <div className="space-y-4">
                  {/* SEO Audit */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">SEO AUDIT</h4>
                      <span className={`font-bold ${getScoreColor(results.seoAudit.score)}`}>
                        {results.seoAudit.score}/100
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>Title Tags: <span className={getStatusColor(results.seoAudit.titleTags.status)}>{results.seoAudit.titleTags.status}</span></div>
                      <div>Meta Descriptions: <span className={getStatusColor(results.seoAudit.metaDescriptions.status)}>{results.seoAudit.metaDescriptions.status}</span></div>
                      <div>Headings: <span className={getStatusColor(results.seoAudit.headings.status)}>{results.seoAudit.headings.status}</span></div>
                      <div>Images: <span className={getStatusColor(results.seoAudit.images.status)}>{results.seoAudit.images.status}</span></div>
                    </div>
                  </div>

                  {/* Technical Audit */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">TECHNICAL AUDIT</h4>
                      <span className={`font-bold ${getScoreColor(results.technicalAudit.score)}`}>
                        {results.technicalAudit.score}/100
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>Page Speed: <span className={getStatusColor(results.technicalAudit.pageSpeed.status)}>{results.technicalAudit.pageSpeed.status} ({results.technicalAudit.pageSpeed.loadTime}s)</span></div>
                      <div>Mobile-Friendly: <span className={getStatusColor(results.technicalAudit.mobileFriendly.status)}>{results.technicalAudit.mobileFriendly.status}</span></div>
                      <div>SSL Certificate: <span className={getStatusColor(results.technicalAudit.sslCertificate.status)}>{results.technicalAudit.sslCertificate.status}</span></div>
                      <div>Broken Links: <span className={getStatusColor(results.technicalAudit.brokenLinks.status)}>{results.technicalAudit.brokenLinks.count} found</span></div>
                    </div>
                  </div>

                  {/* Security Audit */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">SECURITY AUDIT</h4>
                      <span className={`font-bold ${getScoreColor(results.securityAudit.score)}`}>
                        {results.securityAudit.score}/100
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>HTTPS: <span className={results.securityAudit.httpsEnabled ? 'text-green-400' : 'text-red-400'}>{results.securityAudit.httpsEnabled ? 'Enabled' : 'Disabled'}</span></div>
                      <div>Security Headers: <span className={getStatusColor(results.securityAudit.securityHeaders.status)}>{results.securityAudit.securityHeaders.status}</span></div>
                      <div>Malware: <span className={getStatusColor(results.securityAudit.malwareCheck.status)}>{results.securityAudit.malwareCheck.status}</span></div>
                    </div>
                  </div>

                  {/* Content Audit */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">CONTENT AUDIT</h4>
                      <span className={`font-bold ${getScoreColor(results.contentAudit.score)}`}>
                        {results.contentAudit.score}/100
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>Readability: <span className={getStatusColor(results.contentAudit.readability.status)}>{results.contentAudit.readability.status} (Score: {results.contentAudit.readability.score})</span></div>
                      <div>Duplicate Content: <span className={getStatusColor(results.contentAudit.duplicateContent.status)}>{results.contentAudit.duplicateContent.status}</span></div>
                      <div>Keyword Optimization: <span className={getStatusColor(results.contentAudit.keywordOptimization.status)}>{results.contentAudit.keywordOptimization.status}</span></div>
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
                {isAuditing ? (
                  <div>
                    <div className="text-6xl mb-4">🔍</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      AUDITING WEBSITE...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is performing {auditDepth} analysis of SEO, performance, security, and content quality
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-slate-400">
                      Enter a website URL to get comprehensive audit results and optimization recommendations
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>WEBSITE AUDIT PRO | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}