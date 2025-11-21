'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CompetitorAnalysis {
  domain: string;
  overallScore: number;
  grade: string;
  metrics: {
    domainAuthority: { score: number; rank: string };
    backlinks: { count: number; score: number; quality: string };
    organicKeywords: { count: number; score: number; ranking: string };
    organicTraffic: { estimate: string; score: number; trend: string };
    topPages: { count: number; score: number; performance: string };
    socialSignals: { score: number; platforms: string[] };
  };
  keywords: Array<{
    keyword: string;
    position: number;
    volume: number;
    difficulty: number;
    opportunity: string;
  }>;
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
}

export default function CompetitorSEOAnalysis() {
  const [yourDomain, setYourDomain] = useState('');
  const [competitorDomains, setCompetitorDomains] = useState(['', '', '']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<CompetitorAnalysis[]>([]);

  const addCompetitor = () => {
    if (competitorDomains.length < 5) {
      setCompetitorDomains([...competitorDomains, '']);
    }
  };

  const updateCompetitor = (index: number, value: string) => {
    const updated = [...competitorDomains];
    updated[index] = value;
    setCompetitorDomains(updated);
  };

  const removeCompetitor = (index: number) => {
    if (competitorDomains.length > 1) {
      setCompetitorDomains(competitorDomains.filter((_, i) => i !== index));
    }
  };

  const analyzeCompetitors = async () => {
    const validCompetitors = competitorDomains.filter(domain => domain.trim());
    if (!yourDomain.trim() || validCompetitors.length === 0) return;

    setIsAnalyzing(true);

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Mock analysis results for competitors
    const mockResults: CompetitorAnalysis[] = [
      // Your domain analysis
      {
        domain: yourDomain,
        overallScore: 65,
        grade: 'C+',
        metrics: {
          domainAuthority: { score: 35, rank: 'Low' },
          backlinks: { count: 1250, score: 45, quality: 'Mixed' },
          organicKeywords: { count: 850, score: 55, ranking: 'Moderate' },
          organicTraffic: { estimate: '2.1K/month', score: 60, trend: 'Growing' },
          topPages: { count: 12, score: 70, performance: 'Good' },
          socialSignals: { score: 75, platforms: ['Facebook', 'Twitter', 'LinkedIn'] }
        },
        keywords: [
          { keyword: 'digital marketing', position: 12, volume: 5400, difficulty: 65, opportunity: 'High' },
          { keyword: 'SEO tools', position: 8, volume: 2900, difficulty: 55, opportunity: 'Medium' },
          { keyword: 'content marketing', position: 15, volume: 8100, difficulty: 70, opportunity: 'High' }
        ],
        recommendations: [
          'Focus on building high-quality backlinks',
          'Optimize for long-tail keywords',
          'Improve content depth and quality',
          'Increase social media engagement'
        ],
        strengths: [
          'Strong social media presence',
          'Good content quality',
          'Consistent publishing schedule'
        ],
        weaknesses: [
          'Low domain authority',
          'Limited backlink profile',
          'Missing schema markup'
        ]
      },
      // Competitor 1
      ...validCompetitors.slice(0, 3).map((domain) => ({
        domain,
        overallScore: 78 + Math.floor(Math.random() * 15),
        grade: ['B+', 'A-', 'B'][Math.floor(Math.random() * 3)],
        metrics: {
          domainAuthority: { score: 45 + Math.floor(Math.random() * 30), rank: 'Medium' },
          backlinks: { count: 2500 + Math.floor(Math.random() * 5000), score: 65 + Math.floor(Math.random() * 25), quality: 'Good' },
          organicKeywords: { count: 1200 + Math.floor(Math.random() * 800), score: 70 + Math.floor(Math.random() * 20), ranking: 'Strong' },
          organicTraffic: { estimate: `${(3 + Math.random() * 7).toFixed(1)}K/month`, score: 75 + Math.floor(Math.random() * 15), trend: 'Stable' },
          topPages: { count: 15 + Math.floor(Math.random() * 10), score: 80 + Math.floor(Math.random() * 15), performance: 'Excellent' },
          socialSignals: { score: 70 + Math.floor(Math.random() * 20), platforms: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'] }
        },
        keywords: [
          { keyword: 'SEO optimization', position: 3, volume: 8800, difficulty: 75, opportunity: 'High' },
          { keyword: 'marketing automation', position: 5, volume: 4200, difficulty: 60, opportunity: 'Medium' },
          { keyword: 'conversion rate optimization', position: 7, volume: 3600, difficulty: 65, opportunity: 'Medium' }
        ],
        recommendations: [
          'Continue content marketing strategy',
          'Expand social media presence',
          'Focus on technical SEO improvements'
        ],
        strengths: [
          'Strong backlink profile',
          'High domain authority',
          'Comprehensive keyword coverage'
        ],
        weaknesses: [
          'Limited video content',
          'Mobile optimization could improve',
          'Social media engagement varies'
        ]
      }))
    ];

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
            <span className="text-6xl">🏆</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              COMPETITOR SEO ANALYSIS
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            ANALYZE COMPETITOR SEO STRATEGIES & IDENTIFY GAPS
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Your Domain */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                YOUR WEBSITE
              </h2>
              <div>
                <label className="block text-sm font-bold text-blue-accent mb-2">
                  YOUR DOMAIN *
                </label>
                <input
                  type="url"
                  value={yourDomain}
                  onChange={(e) => setYourDomain(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                />
              </div>
            </div>

            {/* Competitor Domains */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  COMPETITOR DOMAINS
                </h2>
                {competitorDomains.length < 5 && (
                  <button
                    onClick={addCompetitor}
                    className="bg-blue-accent hover:bg-blue-bright text-black font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    + ADD
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {competitorDomains.map((domain, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={domain}
                      onChange={(e) => updateCompetitor(index, e.target.value)}
                      placeholder={`Competitor ${index + 1} domain`}
                      className="flex-1 bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    />
                    {competitorDomains.length > 1 && (
                      <button
                        onClick={() => removeCompetitor(index)}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={analyzeCompetitors}
                disabled={isAnalyzing || !yourDomain.trim() || !competitorDomains.some(d => d.trim())}
                className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed mt-6"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isAnalyzing ? 'ANALYZING COMPETITORS...' : 'ANALYZE COMPETITORS'}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              ANALYSIS RESULTS
            </h2>

            {results.length > 0 ? (
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                {results.map((result, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${index === 0 ? 'border-blue-accent bg-blue-primary/5' : 'border-slate-600/50'}`}>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {index === 0 ? 'YOUR SITE' : `COMPETITOR ${index}`}
                      </h3>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getGradeColor(result.grade)}`}>
                          {result.grade}
                        </div>
                        <div className={`text-sm ${getScoreColor(result.overallScore)}`}>
                          {result.overallScore}/100
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-slate-300 mb-3 font-mono">
                      {result.domain}
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-slate-800/30 rounded p-2">
                        <div className="text-xs text-slate-400">DOMAIN AUTHORITY</div>
                        <div className={`font-bold ${getScoreColor(result.metrics.domainAuthority.score)}`}>
                          {result.metrics.domainAuthority.score}
                        </div>
                      </div>
                      <div className="bg-slate-800/30 rounded p-2">
                        <div className="text-xs text-slate-400">BACKLINKS</div>
                        <div className={`font-bold ${getScoreColor(result.metrics.backlinks.score)}`}>
                          {result.metrics.backlinks.count.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-slate-800/30 rounded p-2">
                        <div className="text-xs text-slate-400">KEYWORDS</div>
                        <div className={`font-bold ${getScoreColor(result.metrics.organicKeywords.score)}`}>
                          {result.metrics.organicKeywords.count}
                        </div>
                      </div>
                      <div className="bg-slate-800/30 rounded p-2">
                        <div className="text-xs text-slate-400">TRAFFIC</div>
                        <div className={`font-bold ${getScoreColor(result.metrics.organicTraffic.score)}`}>
                          {result.metrics.organicTraffic.estimate}
                        </div>
                      </div>
                    </div>

                    {/* Top Keywords */}
                    {result.keywords.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-bold text-blue-accent mb-2">TOP KEYWORDS</div>
                        <div className="space-y-1">
                          {result.keywords.slice(0, 3).map((kw, i) => (
                            <div key={i} className="text-xs bg-slate-800/30 rounded p-2 flex justify-between">
                              <span className="truncate mr-2">{kw.keyword}</span>
                              <span className="text-blue-accent">#{kw.position}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Strengths & Weaknesses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-green-400 font-bold mb-1">✓ STRENGTHS</div>
                        {result.strengths.slice(0, 2).map((strength, i) => (
                          <div key={i} className="text-slate-300 mb-1">• {strength}</div>
                        ))}
                      </div>
                      <div>
                        <div className="text-red-400 font-bold mb-1">⚠ WEAKNESSES</div>
                        {result.weaknesses.slice(0, 2).map((weakness, i) => (
                          <div key={i} className="text-slate-300 mb-1">• {weakness}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Overall Insights */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    COMPETITIVE ANALYSIS INSIGHTS
                  </h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div>• <strong className="text-blue-accent">Gap Analysis:</strong> Focus on building domain authority and backlinks</div>
                    <div>• <strong className="text-blue-accent">Keyword Opportunities:</strong> Target long-tail keywords with less competition</div>
                    <div>• <strong className="text-blue-accent">Content Strategy:</strong> Create more comprehensive, authoritative content</div>
                    <div>• <strong className="text-blue-accent">Technical SEO:</strong> Implement schema markup and improve site speed</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                {isAnalyzing ? (
                  <div>
                    <div className="text-6xl mb-4">🔍</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      ANALYZING COMPETITORS...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is comparing SEO strategies and identifying opportunities
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">🏆</div>
                    <p className="text-slate-400">
                      Enter your domain and competitor URLs to get comprehensive SEO analysis
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>COMPETITOR SEO ANALYSIS | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}