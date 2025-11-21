'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SERPTracking {
  overallScore: number;
  grade: string;
  summary: {
    keywordsTracked: number;
    avgPosition: number;
    improved: number;
    declined: number;
    stable: number;
  };
  keywordRankings: Array<{
    keyword: string;
    currentPosition: number;
    previousPosition: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
    searchVolume: number;
    competition: string;
    history: Array<{ date: string; position: number }>;
  }>;
  performanceInsights: {
    bestPerforming: string[];
    worstPerforming: string[];
    seasonalTrends: string[];
    competitorMovements: string[];
  };
  recommendations: string[];
  alerts: Array<{
    type: 'improvement' | 'decline' | 'opportunity';
    keyword: string;
    message: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

export default function SERPTracker() {
  const [domain, setDomain] = useState('');
  const [keywords, setKeywords] = useState(['']);
  const [location, setLocation] = useState('United States');
  const [isTracking, setIsTracking] = useState(false);
  const [results, setResults] = useState<SERPTracking | null>(null);

  const addKeyword = () => {
    if (keywords.length < 10) {
      setKeywords([...keywords, '']);
    }
  };

  const updateKeyword = (index: number, value: string) => {
    const updated = [...keywords];
    updated[index] = value;
    setKeywords(updated);
  };

  const removeKeyword = (index: number) => {
    if (keywords.length > 1) {
      setKeywords(keywords.filter((_, i) => i !== index));
    }
  };

  const trackRankings = async () => {
    const validKeywords = keywords.filter(k => k.trim());
    if (!domain.trim() || validKeywords.length === 0) return;

    setIsTracking(true);

    // Simulate AI tracking delay
    await new Promise(resolve => setTimeout(resolve, 3500));

    // Mock SERP tracking results
    const mockResults: SERPTracking = {
      overallScore: 74,
      grade: 'B',
      summary: {
        keywordsTracked: validKeywords.length,
        avgPosition: 23.4,
        improved: 3,
        declined: 2,
        stable: 1
      },
      keywordRankings: [
        {
          keyword: 'digital marketing',
          currentPosition: 12,
          previousPosition: 15,
          change: 3,
          trend: 'up',
          searchVolume: 5400,
          competition: 'High',
          history: [
            { date: '2024-01-01', position: 18 },
            { date: '2024-01-15', position: 16 },
            { date: '2024-02-01', position: 15 },
            { date: '2024-02-15', position: 12 }
          ]
        },
        {
          keyword: 'SEO tools',
          currentPosition: 8,
          previousPosition: 6,
          change: -2,
          trend: 'down',
          searchVolume: 2900,
          competition: 'Medium',
          history: [
            { date: '2024-01-01', position: 10 },
            { date: '2024-01-15', position: 7 },
            { date: '2024-02-01', position: 6 },
            { date: '2024-02-15', position: 8 }
          ]
        },
        {
          keyword: 'content marketing',
          currentPosition: 25,
          previousPosition: 25,
          change: 0,
          trend: 'stable',
          searchVolume: 8100,
          competition: 'High',
          history: [
            { date: '2024-01-01', position: 28 },
            { date: '2024-01-15', position: 26 },
            { date: '2024-02-01', position: 25 },
            { date: '2024-02-15', position: 25 }
          ]
        },
        {
          keyword: 'marketing automation',
          currentPosition: 34,
          previousPosition: 42,
          change: 8,
          trend: 'up',
          searchVolume: 4200,
          competition: 'Medium',
          history: [
            { date: '2024-01-01', position: 45 },
            { date: '2024-01-15', position: 38 },
            { date: '2024-02-01', position: 42 },
            { date: '2024-02-15', position: 34 }
          ]
        }
      ],
      performanceInsights: {
        bestPerforming: [
          'marketing automation - improved 8 positions',
          'digital marketing - improved 3 positions'
        ],
        worstPerforming: [
          'SEO tools - declined 2 positions',
          'content marketing - stable but outside top 20'
        ],
        seasonalTrends: [
          'Q4 typically shows increased competition for marketing terms',
          'Consider timing content releases for seasonal peaks'
        ],
        competitorMovements: [
          'Competitor A gained ground on 3 tracked keywords',
          'New competitor emerged in top 10 for "SEO tools"'
        ]
      },
      recommendations: [
        'Focus optimization efforts on "content marketing" to break into top 20',
        'Monitor why "SEO tools" ranking declined - check for technical issues',
        'Continue momentum on "marketing automation" with more content',
        'Consider long-tail keyword variations for better ranking opportunities',
        'Track competitor strategies that are working well',
        'Implement regular content updates to maintain ranking stability'
      ],
      alerts: [
        {
          type: 'improvement',
          keyword: 'marketing automation',
          message: 'Significant ranking improvement detected',
          priority: 'high'
        },
        {
          type: 'decline',
          keyword: 'SEO tools',
          message: 'Ranking dropped 2 positions - investigate cause',
          priority: 'medium'
        },
        {
          type: 'opportunity',
          keyword: 'content marketing',
          message: 'Close to top 20 - small optimization could push it over',
          priority: 'medium'
        }
      ]
    };

    setResults(mockResults);
    setIsTracking(false);
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '➡️';
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-yellow-400';
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-yellow-400';
  };

  const getCompetitionColor = (competition: string) => {
    if (competition === 'Low') return 'text-green-400';
    if (competition === 'Medium') return 'text-yellow-400';
    return 'text-red-400';
  };

  const getAlertColor = (type: string) => {
    if (type === 'improvement') return 'text-green-400';
    if (type === 'decline') return 'text-red-400';
    return 'text-blue-400';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'text-red-400';
    if (priority === 'medium') return 'text-yellow-400';
    return 'text-green-400';
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
            <span className="text-6xl">📊</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              SERP TRACKER
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            TRACK SEARCH ENGINE RANKINGS & MONITOR KEYWORD PERFORMANCE
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Domain & Location */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                TRACKING SETUP
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    YOUR DOMAIN *
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

                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    TARGET LOCATION
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  KEYWORDS TO TRACK
                </h2>
                {keywords.length < 10 && (
                  <button
                    onClick={addKeyword}
                    className="bg-blue-accent hover:bg-blue-bright text-black font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    + ADD
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {keywords.map((keyword, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => updateKeyword(index, e.target.value)}
                      placeholder={`Keyword ${index + 1}`}
                      className="flex-1 bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    />
                    {keywords.length > 1 && (
                      <button
                        onClick={() => removeKeyword(index)}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={trackRankings}
                disabled={isTracking || !domain.trim() || !keywords.some(k => k.trim())}
                className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed mt-6"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isTracking ? 'TRACKING RANKINGS...' : 'START TRACKING'}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              TRACKING RESULTS
            </h2>

            {results ? (
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                {/* Overall Score */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      RANKING PERFORMANCE
                    </h3>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${results.overallScore >= 80 ? 'text-green-400' : results.overallScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {results.grade}
                      </div>
                      <div className={`text-sm ${results.overallScore >= 80 ? 'text-green-400' : results.overallScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {results.overallScore}/100
                      </div>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.keywordsTracked}</div>
                      <div className="text-xs text-slate-400">Keywords</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.avgPosition}</div>
                      <div className="text-xs text-slate-400">Avg Position</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-green-400">{results.summary.improved}</div>
                      <div className="text-xs text-slate-400">Improved</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-red-400">{results.summary.declined}</div>
                      <div className="text-xs text-slate-400">Declined</div>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {results.alerts.length > 0 && (
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-yellow-400 mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      RANKING ALERTS ⚠️
                    </h3>
                    <div className="space-y-2">
                      {results.alerts.map((alert, i) => (
                        <div key={i} className="text-sm bg-slate-900/30 rounded p-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className={`font-bold ${getAlertColor(alert.type)}`}>
                              {alert.type.toUpperCase()}: {alert.keyword}
                            </span>
                            <span className={`text-xs ${getPriorityColor(alert.priority)}`}>
                              {alert.priority.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-slate-300 text-xs">{alert.message}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Keyword Rankings */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    KEYWORD RANKINGS
                  </h3>
                  <div className="space-y-3">
                    {results.keywordRankings.map((kw, i) => (
                      <div key={i} className="bg-slate-900/30 rounded p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-blue-accent">&quot;{kw.keyword}&quot;</span>
                          <span className={`text-2xl ${getTrendColor(kw.trend)}`}>
                            {getTrendIcon(kw.trend)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-2">
                          <div>Current: <span className="text-blue-accent font-bold">#{kw.currentPosition}</span></div>
                          <div>Previous: <span className="text-slate-400">#{kw.previousPosition}</span></div>
                          <div>Change: <span className={`font-bold ${getChangeColor(kw.change)}`}>
                            {kw.change > 0 ? '+' : ''}{kw.change}
                          </span></div>
                          <div>Volume: <span className="text-green-400">{kw.searchVolume.toLocaleString()}</span></div>
                        </div>
                        <div className="text-xs text-slate-400">
                          Competition: <span className={getCompetitionColor(kw.competition)}>{kw.competition}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Insights */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    PERFORMANCE INSIGHTS
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-bold text-green-400 mb-2">🏆 BEST PERFORMING</div>
                      <div className="space-y-1">
                        {results.performanceInsights.bestPerforming.map((item, i) => (
                          <div key={i} className="text-xs text-slate-300">• {item}</div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-red-400 mb-2">⚠️ NEEDS ATTENTION</div>
                      <div className="space-y-1">
                        {results.performanceInsights.worstPerforming.map((item, i) => (
                          <div key={i} className="text-xs text-slate-300">• {item}</div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-blue-400 mb-2">📈 TRENDS & OPPORTUNITIES</div>
                      <div className="space-y-1">
                        {results.performanceInsights.seasonalTrends.map((trend, i) => (
                          <div key={i} className="text-xs text-slate-300">• {trend}</div>
                        ))}
                      </div>
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
                {isTracking ? (
                  <div>
                    <div className="text-6xl mb-4">📊</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      TRACKING RANKINGS...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is analyzing search engine results and tracking position changes
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-slate-400">
                      Enter your domain and keywords to start tracking search engine rankings
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>SERP TRACKER | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}