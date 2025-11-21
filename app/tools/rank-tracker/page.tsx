'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RankTracking {
  overallScore: number;
  grade: string;
  summary: {
    keywordsTracked: number;
    avgRanking: number;
    top10Keywords: number;
    improvedRankings: number;
    lostRankings: number;
    trackingPeriod: string;
  };
  keywordPerformance: Array<{
    keyword: string;
    currentRank: number;
    bestRank: number;
    averageRank: number;
    rankChange: number;
    trend: 'improving' | 'declining' | 'stable';
    searchVolume: number;
    competition: 'low' | 'medium' | 'high';
    cpc: number;
    rankingHistory: Array<{ date: string; rank: number; url: string }>;
    competitors: Array<{ domain: string; rank: number; change: number }>;
  }>;
  competitorAnalysis: {
    competitors: Array<{
      domain: string;
      avgRank: number;
      keywordsOutranking: number;
      threatLevel: 'low' | 'medium' | 'high';
      sharedKeywords: number;
    }>;
    insights: string[];
  };
  rankingPredictions: Array<{
    keyword: string;
    currentRank: number;
    predictedRank: number;
    confidence: number;
    timeframe: string;
    factors: string[];
  }>;
  opportunities: Array<{
    keyword: string;
    currentRank: number;
    potentialRank: number;
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedTraffic: number;
    recommendedActions: string[];
  }>;
  alerts: Array<{
    type: 'rank_gain' | 'rank_loss' | 'opportunity' | 'threat';
    severity: 'high' | 'medium' | 'low';
    keyword: string;
    message: string;
    actionRequired: boolean;
  }>;
  recommendations: string[];
}

export default function RankTracker() {
  const [domain, setDomain] = useState('');
  const [keywords, setKeywords] = useState(['']);
  const [competitors, setCompetitors] = useState(['']);
  const [location, setLocation] = useState('United States');
  const [device, setDevice] = useState('desktop');
  const [isTracking, setIsTracking] = useState(false);
  const [results, setResults] = useState<RankTracking | null>(null);

  const addKeyword = () => {
    if (keywords.length < 20) {
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

  const addCompetitor = () => {
    if (competitors.length < 5) {
      setCompetitors([...competitors, '']);
    }
  };

  const updateCompetitor = (index: number, value: string) => {
    const updated = [...competitors];
    updated[index] = value;
    setCompetitors(updated);
  };

  const removeCompetitor = (index: number) => {
    if (competitors.length > 1) {
      setCompetitors(competitors.filter((_, i) => i !== index));
    }
  };

  const startRankTracking = async () => {
    const validKeywords = keywords.filter(k => k.trim());

    if (!domain.trim() || validKeywords.length === 0) return;

    setIsTracking(true);

    // Simulate AI tracking delay
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Mock comprehensive rank tracking results
    const mockResults: RankTracking = {
      overallScore: 78,
      grade: 'B+',
      summary: {
        keywordsTracked: validKeywords.length,
        avgRanking: 18.5,
        top10Keywords: 3,
        improvedRankings: 5,
        lostRankings: 2,
        trackingPeriod: 'Last 30 days'
      },
      keywordPerformance: [
        {
          keyword: 'digital marketing agency',
          currentRank: 7,
          bestRank: 5,
          averageRank: 8.2,
          rankChange: 3,
          trend: 'improving',
          searchVolume: 3200,
          competition: 'high',
          cpc: 45.20,
          rankingHistory: [
            { date: '2024-01-01', rank: 12, url: 'https://example.com/digital-marketing' },
            { date: '2024-01-15', rank: 9, url: 'https://example.com/digital-marketing' },
            { date: '2024-02-01', rank: 8, url: 'https://example.com/digital-marketing' },
            { date: '2024-02-15', rank: 7, url: 'https://example.com/digital-marketing' }
          ],
          competitors: [
            { domain: 'competitor1.com', rank: 5, change: -1 },
            { domain: 'competitor2.com', rank: 9, change: 2 },
            { domain: 'competitor3.com', rank: 15, change: 0 }
          ]
        },
        {
          keyword: 'SEO services',
          currentRank: 12,
          bestRank: 8,
          averageRank: 11.5,
          rankChange: -2,
          trend: 'declining',
          searchVolume: 5800,
          competition: 'high',
          cpc: 67.80,
          rankingHistory: [
            { date: '2024-01-01', rank: 10, url: 'https://example.com/seo-services' },
            { date: '2024-01-15', rank: 11, url: 'https://example.com/seo-services' },
            { date: '2024-02-01', rank: 12, url: 'https://example.com/seo-services' },
            { date: '2024-02-15', rank: 12, url: 'https://example.com/seo-services' }
          ],
          competitors: [
            { domain: 'competitor1.com', rank: 8, change: 1 },
            { domain: 'competitor2.com', rank: 14, change: -2 },
            { domain: 'competitor3.com', rank: 18, change: 3 }
          ]
        },
        {
          keyword: 'content marketing strategy',
          currentRank: 23,
          bestRank: 18,
          averageRank: 22.8,
          rankChange: 1,
          trend: 'stable',
          searchVolume: 2100,
          competition: 'medium',
          cpc: 23.50,
          rankingHistory: [
            { date: '2024-01-01', rank: 25, url: 'https://example.com/content-marketing' },
            { date: '2024-01-15', rank: 24, url: 'https://example.com/content-marketing' },
            { date: '2024-02-01', rank: 23, url: 'https://example.com/content-marketing' },
            { date: '2024-02-15', rank: 23, url: 'https://example.com/content-marketing' }
          ],
          competitors: [
            { domain: 'competitor1.com', rank: 19, change: 0 },
            { domain: 'competitor2.com', rank: 27, change: 1 },
            { domain: 'competitor3.com', rank: 31, change: -1 }
          ]
        }
      ],
      competitorAnalysis: {
        competitors: [
          { domain: 'competitor1.com', avgRank: 10.7, keywordsOutranking: 4, threatLevel: 'high', sharedKeywords: 8 },
          { domain: 'competitor2.com', avgRank: 16.3, keywordsOutranking: 2, threatLevel: 'medium', sharedKeywords: 6 },
          { domain: 'competitor3.com', avgRank: 21.2, keywordsOutranking: 1, threatLevel: 'low', sharedKeywords: 4 }
        ],
        insights: [
          'Competitor1.com is your biggest threat with better rankings on 4/8 shared keywords',
          'Competitor2.com recently improved rankings on 2 keywords - monitor their strategy',
          'You have ranking advantage over Competitor3.com on most shared keywords',
          'Consider analyzing Competitor1.com content strategy for insights'
        ]
      },
      rankingPredictions: [
        {
          keyword: 'digital marketing agency',
          currentRank: 7,
          predictedRank: 5,
          confidence: 75,
          timeframe: 'Next 30 days',
          factors: ['Consistent content updates', 'Growing domain authority', 'Competitor ranking decline']
        },
        {
          keyword: 'SEO services',
          currentRank: 12,
          predictedRank: 15,
          confidence: 60,
          timeframe: 'Next 30 days',
          factors: ['Increased competition', 'Algorithm updates', 'Need content refresh']
        },
        {
          keyword: 'content marketing strategy',
          currentRank: 23,
          predictedRank: 18,
          confidence: 45,
          timeframe: 'Next 60 days',
          factors: ['Potential with optimization', 'Lower competition', 'Content improvement needed']
        }
      ],
      opportunities: [
        {
          keyword: 'marketing automation tools',
          currentRank: 35,
          potentialRank: 12,
          difficulty: 'medium',
          estimatedTraffic: 2800,
          recommendedActions: ['Create comprehensive guide', 'Build backlinks', 'Optimize for featured snippets']
        },
        {
          keyword: 'local SEO services',
          currentRank: 42,
          potentialRank: 8,
          difficulty: 'easy',
          estimatedTraffic: 1900,
          recommendedActions: ['Claim Google My Business', 'Build local citations', 'Create location pages']
        }
      ],
      alerts: [
        {
          type: 'rank_gain',
          severity: 'high',
          keyword: 'digital marketing agency',
          message: 'Significant ranking improvement to position 7',
          actionRequired: false
        },
        {
          type: 'rank_loss',
          severity: 'medium',
          keyword: 'SEO services',
          message: 'Ranking declined 2 positions - investigate cause',
          actionRequired: true
        },
        {
          type: 'threat',
          severity: 'high',
          keyword: 'SEO services',
          message: 'Competitor1.com gained position above you',
          actionRequired: true
        },
        {
          type: 'opportunity',
          severity: 'medium',
          keyword: 'marketing automation tools',
          message: 'High potential keyword with low competition',
          actionRequired: false
        }
      ],
      recommendations: [
        'Focus on maintaining position 7 for "digital marketing agency" with consistent content updates',
        'Investigate ranking decline for "SEO services" - check for technical issues or competitor actions',
        'Target "marketing automation tools" - high traffic potential with medium difficulty',
        'Monitor Competitor1.com strategy as they pose the biggest threat',
        'Consider local SEO improvements to capitalize on "local SEO services" opportunity',
        'Set up automated rank tracking alerts for position changes',
        'Create content calendar to maintain ranking momentum',
        'Build high-quality backlinks to support ranking improvements'
      ]
    };

    setResults(mockResults);
    setIsTracking(false);
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'improving') return 'text-green-400';
    if (trend === 'declining') return 'text-red-400';
    return 'text-yellow-400';
  };

  const getCompetitionColor = (competition: string) => {
    if (competition === 'low') return 'text-green-400';
    if (competition === 'medium') return 'text-yellow-400';
    return 'text-red-400';
  };

  const getThreatColor = (threat: string) => {
    if (threat === 'low') return 'text-green-400';
    if (threat === 'medium') return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'easy') return 'text-green-400';
    if (difficulty === 'medium') return 'text-yellow-400';
    return 'text-red-400';
  };

  const getAlertColor = (type: string) => {
    if (type === 'rank_gain') return 'text-green-400';
    if (type === 'rank_loss') return 'text-red-400';
    if (type === 'opportunity') return 'text-blue-400';
    return 'text-yellow-400';
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'high') return 'text-red-400';
    if (severity === 'medium') return 'text-yellow-400';
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
            <span className="text-6xl">🎯</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              RANK TRACKER
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            ADVANCED KEYWORD RANKING TRACKING WITH COMPETITOR ANALYSIS
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Domain & Settings */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                TRACKING CONFIGURATION
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-blue-accent mb-2">
                      LOCATION
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
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-blue-accent mb-2">
                      DEVICE
                    </label>
                    <select
                      value={device}
                      onChange={(e) => setDevice(e.target.value)}
                      className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      <option value="desktop">Desktop</option>
                      <option value="mobile">Mobile</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  KEYWORDS TO TRACK
                </h2>
                {keywords.length < 20 && (
                  <button
                    onClick={addKeyword}
                    className="bg-blue-accent hover:bg-blue-bright text-black font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    + ADD
                  </button>
                )}
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto">
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
            </div>

            {/* Competitors */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  COMPETITORS TO MONITOR
                </h2>
                {competitors.length < 5 && (
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
                {competitors.map((competitor, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={competitor}
                      onChange={(e) => updateCompetitor(index, e.target.value)}
                      placeholder={`Competitor ${index + 1} domain`}
                      className="flex-1 bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    />
                    {competitors.length > 1 && (
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
                onClick={startRankTracking}
                disabled={isTracking || !domain.trim() || !keywords.some(k => k.trim())}
                className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed mt-6"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isTracking ? 'TRACKING RANKINGS...' : 'START RANK TRACKING'}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              RANKING ANALYSIS
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center">
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.keywordsTracked}</div>
                      <div className="text-xs text-slate-400">Keywords Tracked</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.avgRanking}</div>
                      <div className="text-xs text-slate-400">Avg Ranking</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-green-400">{results.summary.top10Keywords}</div>
                      <div className="text-xs text-slate-400">Top 10</div>
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
                              {alert.keyword}
                            </span>
                            <span className={`text-xs ${getSeverityColor(alert.severity)}`}>
                              {alert.severity.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-slate-300 text-xs">{alert.message}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Keyword Performance */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    KEYWORD PERFORMANCE
                  </h3>
                  <div className="space-y-3">
                    {results.keywordPerformance.map((kw, i) => (
                      <div key={i} className="bg-slate-900/30 rounded p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-blue-accent">&quot;{kw.keyword}&quot;</span>
                          <span className={`text-sm px-2 py-1 rounded ${getTrendColor(kw.trend)} bg-slate-800/50`}>
                            {kw.trend.toUpperCase()}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-2">
                          <div>Current: <span className="text-blue-accent font-bold">#{kw.currentRank}</span></div>
                          <div>Best: <span className="text-green-400">#{kw.bestRank}</span></div>
                          <div>Avg: <span className="text-yellow-400">#{kw.averageRank}</span></div>
                          <div>Change: <span className={kw.rankChange > 0 ? 'text-green-400' : kw.rankChange < 0 ? 'text-red-400' : 'text-yellow-400'}>
                            {kw.rankChange > 0 ? '+' : ''}{kw.rankChange}
                          </span></div>
                        </div>
                        <div className="text-xs text-slate-400 mb-2">
                          Volume: {kw.searchVolume.toLocaleString()} | CPC: ${kw.cpc} | Competition: <span className={getCompetitionColor(kw.competition)}>{kw.competition}</span>
                        </div>
                        <div className="text-xs text-slate-400">
                          Top Competitors: {kw.competitors.slice(0, 2).map(c => `${c.domain}(#${c.rank})`).join(', ')}
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
                  <div className="space-y-2 mb-3">
                    {results.competitorAnalysis.competitors.map((comp, i) => (
                      <div key={i} className="text-sm bg-slate-900/30 rounded p-2 flex justify-between items-center">
                        <span className="truncate mr-2">{comp.domain}</span>
                        <div className="text-right text-xs">
                          <div>Avg Rank: <span className="text-blue-accent">#{comp.avgRank}</span></div>
                          <div>Outranking: <span className="text-red-400">{comp.keywordsOutranking}</span> | Threat: <span className={getThreatColor(comp.threatLevel)}>{comp.threatLevel}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {results.competitorAnalysis.insights.map((insight, i) => (
                      <div key={i} className="text-xs text-slate-400">• {insight}</div>
                    ))}
                  </div>
                </div>

                {/* Ranking Opportunities */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    RANKING OPPORTUNITIES
                  </h3>
                  <div className="space-y-2">
                    {results.opportunities.map((opp, i) => (
                      <div key={i} className="text-sm bg-slate-900/30 rounded p-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold">&quot;{opp.keyword}&quot;</span>
                          <span className={`text-xs ${getDifficultyColor(opp.difficulty)}`}>{opp.difficulty.toUpperCase()}</span>
                        </div>
                        <div className="text-xs text-slate-400 mb-1">
                          Current: #{opp.currentRank} → Potential: #{opp.potentialRank} | Est. Traffic: {opp.estimatedTraffic.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-300">
                          Actions: {opp.recommendedActions.slice(0, 2).join(', ')}
                        </div>
                      </div>
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
                {isTracking ? (
                  <div>
                    <div className="text-6xl mb-4">🎯</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      TRACKING RANKINGS...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is analyzing keyword rankings, competitor positions, and performance trends
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">📈</div>
                    <p className="text-slate-400">
                      Configure your domain, keywords, and competitors to start advanced rank tracking
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>RANK TRACKER | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}