'use client';

import { useState } from 'react';
import Link from 'next/link';

interface InternationalAnalysis {
  overallScore: number;
  grade: string;
  hreflangImplementation: {
    score: number;
    hasHreflang: boolean;
    coverage: number;
    issues: string[];
  };
  localizedContent: {
    score: number;
    languages: string[];
    countries: string[];
    contentQuality: string;
    recommendations: string[];
  };
  internationalKeywords: {
    score: number;
    opportunities: Array<{
      keyword: string;
      country: string;
      volume: number;
      difficulty: number;
      opportunity: string;
    }>;
    recommendations: string[];
  };
  technicalSEO: {
    score: number;
    urlStructure: boolean;
    ccTLD: boolean;
    subdomains: boolean;
    issues: string[];
  };
  localSEO: {
    score: number;
    googleMyBusiness: boolean;
    localSchema: boolean;
    localKeywords: boolean;
    recommendations: string[];
  };
  criticalIssues: string[];
  recommendations: string[];
}

export default function InternationalSEO() {
  const [url, setUrl] = useState('');
  const [targetCountries, setTargetCountries] = useState(['']);
  const [targetLanguages, setTargetLanguages] = useState(['']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<InternationalAnalysis | null>(null);

  const addCountry = () => {
    if (targetCountries.length < 5) {
      setTargetCountries([...targetCountries, '']);
    }
  };

  const updateCountry = (index: number, value: string) => {
    const updated = [...targetCountries];
    updated[index] = value;
    setTargetCountries(updated);
  };

  const removeCountry = (index: number) => {
    if (targetCountries.length > 1) {
      setTargetCountries(targetCountries.filter((_, i) => i !== index));
    }
  };

  const addLanguage = () => {
    if (targetLanguages.length < 5) {
      setTargetLanguages([...targetLanguages, '']);
    }
  };

  const updateLanguage = (index: number, value: string) => {
    const updated = [...targetLanguages];
    updated[index] = value;
    setTargetLanguages(updated);
  };

  const removeLanguage = (index: number) => {
    if (targetLanguages.length > 1) {
      setTargetLanguages(targetLanguages.filter((_, i) => i !== index));
    }
  };

  const analyzeInternationalSEO = async () => {
    const validCountries = targetCountries.filter(country => country.trim());
    const validLanguages = targetLanguages.filter(lang => lang.trim());

    if (!url.trim() || validCountries.length === 0 || validLanguages.length === 0) return;

    setIsAnalyzing(true);

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Mock international SEO analysis
    const mockResults: InternationalAnalysis = {
      overallScore: 58,
      grade: 'C',
      hreflangImplementation: {
        score: 45,
        hasHreflang: false,
        coverage: 0,
        issues: [
          'Missing hreflang tags for international targeting',
          'No language annotations in HTML',
          'Missing XML sitemap with hreflang references'
        ]
      },
      localizedContent: {
        score: 65,
        languages: validLanguages,
        countries: validCountries,
        contentQuality: 'Partial localization detected',
        recommendations: [
          'Create dedicated content for each target market',
          'Adapt content for cultural differences and preferences',
          'Use local currency, measurements, and date formats',
          'Include local testimonials and case studies'
        ]
      },
      internationalKeywords: {
        score: 70,
        opportunities: [
          { keyword: 'marketing digital', country: 'Spain', volume: 2900, difficulty: 45, opportunity: 'High' },
          { keyword: 'SEO services', country: 'Germany', volume: 1800, difficulty: 55, opportunity: 'Medium' },
          { keyword: 'content marketing', country: 'France', volume: 2200, difficulty: 50, opportunity: 'High' },
          { keyword: 'social media marketing', country: 'Italy', volume: 1600, difficulty: 40, opportunity: 'Medium' }
        ],
        recommendations: [
          'Research local keyword variations and slang',
          'Consider search intent differences across cultures',
          'Monitor seasonal keyword trends in target markets',
          'Use local keyword research tools for each country'
        ]
      },
      technicalSEO: {
        score: 55,
        urlStructure: false,
        ccTLD: false,
        subdomains: false,
        issues: [
          'No country-specific domain structure (ccTLD)',
          'URL structure not optimized for international SEO',
          'Missing language-specific subdirectories or subdomains'
        ]
      },
      localSEO: {
        score: 60,
        googleMyBusiness: false,
        localSchema: true,
        localKeywords: false,
        recommendations: [
          'Claim and optimize Google My Business listings',
          'Add local schema markup for each location',
          'Include location-specific keywords in content',
          'Create location pages for each target area'
        ]
      },
      criticalIssues: [
        'Missing hreflang tags - essential for international SEO',
        'No country-specific domain strategy (ccTLD vs subdomains)',
        'Limited localized content for target markets',
        'Missing Google My Business optimization'
      ],
      recommendations: [
        'Implement hreflang tags for all language/country variations',
        'Choose appropriate international domain strategy (ccTLD, subdomains, or subdirectories)',
        'Create localized content for each target market',
        'Research and target local keywords in each country',
        'Set up Google My Business for local visibility',
        'Use local schema markup and structured data',
        'Monitor international search console data',
        'Consider hiring local SEO experts for each market'
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
            <span className="text-6xl">🌍</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              INTERNATIONAL SEO MANAGER
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            MANAGE SEO ACROSS MULTIPLE COUNTRIES AND LANGUAGES
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Website URL */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                WEBSITE DETAILS
              </h2>

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
            </div>

            {/* Target Countries */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  TARGET COUNTRIES
                </h2>
                {targetCountries.length < 5 && (
                  <button
                    onClick={addCountry}
                    className="bg-blue-accent hover:bg-blue-bright text-black font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    + ADD
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {targetCountries.map((country, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => updateCountry(index, e.target.value)}
                      placeholder={`Country ${index + 1} (e.g., Spain, Germany)`}
                      className="flex-1 bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    />
                    {targetCountries.length > 1 && (
                      <button
                        onClick={() => removeCountry(index)}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Target Languages */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  TARGET LANGUAGES
                </h2>
                {targetLanguages.length < 5 && (
                  <button
                    onClick={addLanguage}
                    className="bg-blue-accent hover:bg-blue-bright text-black font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    + ADD
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {targetLanguages.map((language, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={language}
                      onChange={(e) => updateLanguage(index, e.target.value)}
                      placeholder={`Language ${index + 1} (e.g., Spanish, German)`}
                      className="flex-1 bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    />
                    {targetLanguages.length > 1 && (
                      <button
                        onClick={() => removeLanguage(index)}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={analyzeInternationalSEO}
                disabled={isAnalyzing || !url.trim() || !targetCountries.some(c => c.trim()) || !targetLanguages.some(l => l.trim())}
                className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed mt-6"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isAnalyzing ? 'ANALYZING INTERNATIONAL SEO...' : 'ANALYZE INTERNATIONAL SEO'}
              </button>
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
                      INTERNATIONAL SEO SCORE
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
                  {/* Hreflang Implementation */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">HREFLANG IMPLEMENTATION</h4>
                      <span className={`font-bold ${getScoreColor(results.hreflangImplementation.score)}`}>
                        {results.hreflangImplementation.score}/100
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">
                      Hreflang Tags: {results.hreflangImplementation.hasHreflang ? '✓' : '✗'} |
                      Coverage: {results.hreflangImplementation.coverage}%
                    </div>
                    <div className="space-y-1">
                      {results.hreflangImplementation.issues.map((issue, i) => (
                        <div key={i} className="text-xs text-slate-400">• {issue}</div>
                      ))}
                    </div>
                  </div>

                  {/* Localized Content */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">LOCALIZED CONTENT</h4>
                      <span className={`font-bold ${getScoreColor(results.localizedContent.score)}`}>
                        {results.localizedContent.score}/100
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">
                      Languages: {results.localizedContent.languages.join(', ')} |
                      Countries: {results.localizedContent.countries.join(', ')}
                    </div>
                    <div className="space-y-1">
                      {results.localizedContent.recommendations.map((rec, i) => (
                        <div key={i} className="text-xs text-slate-400">• {rec}</div>
                      ))}
                    </div>
                  </div>

                  {/* International Keywords */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">INTERNATIONAL KEYWORDS</h4>
                      <span className={`font-bold ${getScoreColor(results.internationalKeywords.score)}`}>
                        {results.internationalKeywords.score}/100
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="text-sm font-bold text-blue-accent mb-2">TOP OPPORTUNITIES</div>
                      <div className="space-y-1 max-h-24 overflow-y-auto">
                        {results.internationalKeywords.opportunities.slice(0, 3).map((kw, i) => (
                          <div key={i} className="text-xs bg-slate-900/30 rounded p-2 flex justify-between">
                            <span className="truncate mr-2">&quot;{kw.keyword}&quot; in {kw.country}</span>
                            <span className="text-blue-accent">Vol: {kw.volume}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      {results.internationalKeywords.recommendations.map((rec, i) => (
                        <div key={i} className="text-xs text-slate-400">• {rec}</div>
                      ))}
                    </div>
                  </div>

                  {/* Technical SEO */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">TECHNICAL SEO</h4>
                      <span className={`font-bold ${getScoreColor(results.technicalSEO.score)}`}>
                        {results.technicalSEO.score}/100
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">
                      URL Structure: {results.technicalSEO.urlStructure ? '✓' : '✗'} |
                      ccTLD: {results.technicalSEO.ccTLD ? '✓' : '✗'} |
                      Subdomains: {results.technicalSEO.subdomains ? '✓' : '✗'}
                    </div>
                    <div className="space-y-1">
                      {results.technicalSEO.issues.map((issue, i) => (
                        <div key={i} className="text-xs text-slate-400">• {issue}</div>
                      ))}
                    </div>
                  </div>

                  {/* Local SEO */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">LOCAL SEO</h4>
                      <span className={`font-bold ${getScoreColor(results.localSEO.score)}`}>
                        {results.localSEO.score}/100
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">
                      GMB: {results.localSEO.googleMyBusiness ? '✓' : '✗'} |
                      Schema: {results.localSEO.localSchema ? '✓' : '✗'} |
                      Keywords: {results.localSEO.localKeywords ? '✓' : '✗'}
                    </div>
                    <div className="space-y-1">
                      {results.localSEO.recommendations.map((rec, i) => (
                        <div key={i} className="text-xs text-slate-400">• {rec}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    INTERNATIONAL SEO RECOMMENDATIONS
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
                    <div className="text-6xl mb-4">🌍</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      ANALYZING INTERNATIONAL SEO...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is evaluating hreflang implementation, localized content, and international targeting strategies
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">🌐</div>
                    <p className="text-slate-400">
                      Enter your website URL and target countries/languages to get comprehensive international SEO analysis
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>INTERNATIONAL SEO MANAGER | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}