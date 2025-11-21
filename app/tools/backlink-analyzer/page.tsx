'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BacklinkAnalysis {
  overallScore: number;
  grade: string;
  summary: {
    totalBacklinks: number;
    uniqueDomains: number;
    avgDomainAuthority: number;
    toxicLinks: number;
  };
  backlinkProfile: {
    score: number;
    distribution: {
      dofollow: number;
      nofollow: number;
      sponsored: number;
      ugc: number;
    };
    topDomains: Array<{
      domain: string;
      backlinks: number;
      domainAuthority: number;
      trustFlow: number;
    }>;
    anchorText: Array<{
      anchor: string;
      count: number;
      percentage: number;
    }>;
  };
  linkQuality: {
    score: number;
    highAuthority: number;
    mediumAuthority: number;
    lowAuthority: number;
    spamScore: number;
  };
  linkBuilding: {
    opportunities: Array<{
      type: string;
      potential: string;
      difficulty: string;
      estimatedValue: string;
    }>;
    recommendations: string[];
  };
  competitorAnalysis: {
    competitors: Array<{
      domain: string;
      backlinks: number;
      uniqueDomains: number;
      avgDA: number;
    }>;
    insights: string[];
  };
  risks: string[];
  recommendations: string[];
}

export default function BacklinkAnalyzer() {
  const [domain, setDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<BacklinkAnalysis | null>(null);

  const analyzeBacklinks = async () => {
    if (!domain.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Mock backlink analysis
    const mockResults: BacklinkAnalysis = {
      overallScore: 68,
      grade: 'C+',
      summary: {
        totalBacklinks: 2847,
        uniqueDomains: 423,
        avgDomainAuthority: 45,
        toxicLinks: 23
      },
      backlinkProfile: {
        score: 72,
        distribution: {
          dofollow: 2156,
          nofollow: 456,
          sponsored: 123,
          ugc: 112
        },
        topDomains: [
          { domain: 'example-blog.com', backlinks: 45, domainAuthority: 78, trustFlow: 65 },
          { domain: 'tech-news-site.net', backlinks: 32, domainAuthority: 82, trustFlow: 71 },
          { domain: 'industry-forum.org', backlinks: 28, domainAuthority: 65, trustFlow: 58 },
          { domain: 'marketing-hub.io', backlinks: 24, domainAuthority: 71, trustFlow: 63 },
          { domain: 'seo-directory.com', backlinks: 19, domainAuthority: 55, trustFlow: 45 }
        ],
        anchorText: [
          { anchor: 'brand name', count: 234, percentage: 8.2 },
          { anchor: 'primary keyword', count: 189, percentage: 6.6 },
          { anchor: 'click here', count: 156, percentage: 5.5 },
          { anchor: 'learn more', count: 134, percentage: 4.7 },
          { anchor: 'read more', count: 98, percentage: 3.4 }
        ]
      },
      linkQuality: {
        score: 65,
        highAuthority: 67,
        mediumAuthority: 198,
        lowAuthority: 158,
        spamScore: 12
      },
      linkBuilding: {
        opportunities: [
          { type: 'Guest Posting', potential: 'High', difficulty: 'Medium', estimatedValue: '45-67 DA increase' },
          { type: 'Resource Pages', potential: 'High', difficulty: 'Low', estimatedValue: '23-34 DA increase' },
          { type: 'Industry Partnerships', potential: 'Medium', difficulty: 'High', estimatedValue: '56-78 DA increase' },
          { type: 'Local Citations', potential: 'Medium', difficulty: 'Low', estimatedValue: '12-18 DA increase' },
          { type: 'Social Media Links', potential: 'Low', difficulty: 'Low', estimatedValue: '5-8 DA increase' }
        ],
        recommendations: [
          'Focus on acquiring backlinks from domains with DA 50+',
          'Diversify anchor text to avoid over-optimization penalties',
          'Build relationships with industry influencers for guest posting',
          'Create more link-worthy content (infographics, tools, research)',
          'Monitor competitor backlink strategies for opportunities'
        ]
      },
      competitorAnalysis: {
        competitors: [
          { domain: 'competitor1.com', backlinks: 4521, uniqueDomains: 678, avgDA: 52 },
          { domain: 'competitor2.com', backlinks: 3892, uniqueDomains: 543, avgDA: 48 },
          { domain: 'competitor3.com', backlinks: 3124, uniqueDomains: 445, avgDA: 46 }
        ],
        insights: [
          'Competitor 1 has 58% more backlinks from higher authority domains',
          'Focus on the link building strategies that competitors are using successfully',
          'Consider targeting the same high-authority domains your competitors are getting links from',
          'Analyze the content types that are earning your competitors the most backlinks'
        ]
      },
      risks: [
        '23 potentially toxic backlinks detected - disavow if necessary',
        'Over-optimization of anchor text may trigger penalties',
        'Low diversity in linking domains increases risk',
        'Some backlinks are from low-quality directories'
      ],
      recommendations: [
        'Disavow toxic backlinks to protect domain authority',
        'Diversify anchor text distribution for natural link profile',
        'Focus on quality over quantity - prioritize high-DA domains',
        'Create more comprehensive content to attract natural backlinks',
        'Monitor backlink profile regularly for new opportunities and risks',
        'Consider link reclamation for lost or broken backlinks',
        'Build internal linking structure to pass link equity effectively'
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

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Low') return 'text-green-400';
    if (difficulty === 'Medium') return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPotentialColor = (potential: string) => {
    if (potential === 'High') return 'text-green-400';
    if (potential === 'Medium') return 'text-yellow-400';
    return 'text-blue-400';
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
            <span className="text-6xl">🔗</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              BACKLINK ANALYZER
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            ANALYZE YOUR BACKLINK PROFILE & IDENTIFY LINK BUILDING OPPORTUNITIES
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Domain Input */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                DOMAIN ANALYSIS
              </h2>

              <div>
                <label className="block text-sm font-bold text-blue-accent mb-2">
                  ENTER DOMAIN *
                </label>
                <input
                  type="url"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                />
              </div>

              <button
                onClick={analyzeBacklinks}
                disabled={isAnalyzing || !domain.trim()}
                className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed mt-6"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isAnalyzing ? 'ANALYZING BACKLINKS...' : 'ANALYZE BACKLINKS'}
              </button>
            </div>

            {/* Backlink Metrics Guide */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                BACKLINK METRICS
              </h2>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="text-blue-accent mt-1">🏆</span>
                  <span><strong>Domain Authority (DA):</strong> Moz metric measuring domain strength (0-100)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-accent mt-1">🔗</span>
                  <span><strong>Trust Flow:</strong> Majestic metric indicating link trustworthiness</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-accent mt-1">⚡</span>
                  <span><strong>Dofollow/Nofollow:</strong> Whether links pass SEO value</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-accent mt-1">🎯</span>
                  <span><strong>Anchor Text:</strong> The clickable text of backlinks</span>
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
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      BACKLINK SCORE
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
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.totalBacklinks.toLocaleString()}</div>
                      <div className="text-xs text-slate-400">Total Backlinks</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.uniqueDomains}</div>
                      <div className="text-xs text-slate-400">Unique Domains</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.avgDomainAuthority}</div>
                      <div className="text-xs text-slate-400">Avg DA</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-red-400">{results.summary.toxicLinks}</div>
                      <div className="text-xs text-slate-400">Toxic Links</div>
                    </div>
                  </div>
                </div>

                {/* Risks */}
                {results.risks.length > 0 && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-red-400 mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      BACKLINK RISKS ⚠️
                    </h3>
                    <div className="space-y-2">
                      {results.risks.map((risk, i) => (
                        <div key={i} className="text-sm text-red-300 flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Backlink Profile */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    BACKLINK PROFILE
                  </h3>

                  {/* Distribution */}
                  <div className="mb-4">
                    <div className="text-sm font-bold text-blue-accent mb-2">LINK TYPE DISTRIBUTION</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Dofollow: <span className="text-green-400">{results.backlinkProfile.distribution.dofollow}</span></div>
                      <div>Nofollow: <span className="text-yellow-400">{results.backlinkProfile.distribution.nofollow}</span></div>
                      <div>Sponsored: <span className="text-blue-400">{results.backlinkProfile.distribution.sponsored}</span></div>
                      <div>UGC: <span className="text-purple-400">{results.backlinkProfile.distribution.ugc}</span></div>
                    </div>
                  </div>

                  {/* Top Domains */}
                  <div className="mb-4">
                    <div className="text-sm font-bold text-blue-accent mb-2">TOP LINKING DOMAINS</div>
                    <div className="space-y-1">
                      {results.backlinkProfile.topDomains.slice(0, 3).map((domain, i) => (
                        <div key={i} className="text-xs bg-slate-900/30 rounded p-2 flex justify-between">
                          <span className="truncate mr-2">{domain.domain}</span>
                          <span className="text-blue-accent">DA: {domain.domainAuthority}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Anchor Text */}
                  <div>
                    <div className="text-sm font-bold text-blue-accent mb-2">ANCHOR TEXT DISTRIBUTION</div>
                    <div className="space-y-1">
                      {results.backlinkProfile.anchorText.slice(0, 3).map((anchor, i) => (
                        <div key={i} className="text-xs bg-slate-900/30 rounded p-2 flex justify-between">
                          <span className="truncate mr-2">&quot;{anchor.anchor}&quot;</span>
                          <span className="text-blue-accent">{anchor.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Link Quality */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-blue-accent">LINK QUALITY ANALYSIS</h4>
                    <span className={`font-bold ${getScoreColor(results.linkQuality.score)}`}>
                      {results.linkQuality.score}/100
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>High Authority: <span className="text-green-400">{results.linkQuality.highAuthority}</span></div>
                    <div>Medium Authority: <span className="text-yellow-400">{results.linkQuality.mediumAuthority}</span></div>
                    <div>Low Authority: <span className="text-blue-400">{results.linkQuality.lowAuthority}</span></div>
                    <div>Spam Score: <span className={results.linkQuality.spamScore > 20 ? 'text-red-400' : 'text-green-400'}>{results.linkQuality.spamScore}%</span></div>
                  </div>
                </div>

                {/* Link Building Opportunities */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    LINK BUILDING OPPORTUNITIES
                  </h3>
                  <div className="space-y-2">
                    {results.linkBuilding.opportunities.map((opp, i) => (
                      <div key={i} className="text-sm bg-slate-900/30 rounded p-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold">{opp.type}</span>
                          <span className={`text-xs ${getPotentialColor(opp.potential)}`}>{opp.potential} Potential</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Difficulty: <span className={getDifficultyColor(opp.difficulty)}>{opp.difficulty}</span></span>
                          <span>Value: {opp.estimatedValue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Competitor Analysis */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    COMPETITOR ANALYSIS
                  </h3>
                  <div className="space-y-2">
                    {results.competitorAnalysis.competitors.map((comp, i) => (
                      <div key={i} className="text-sm bg-slate-900/30 rounded p-2 flex justify-between">
                        <span className="truncate mr-2">{comp.domain}</span>
                        <span className="text-blue-accent">{comp.backlinks.toLocaleString()} links</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 space-y-1">
                    {results.competitorAnalysis.insights.map((insight, i) => (
                      <div key={i} className="text-xs text-slate-400">• {insight}</div>
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
                    <div className="text-6xl mb-4">🔗</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      ANALYZING BACKLINKS...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is crawling backlink data, analyzing link quality, and identifying opportunities
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-slate-400">
                      Enter a domain to get comprehensive backlink analysis and link building strategies
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>BACKLINK ANALYZER | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}