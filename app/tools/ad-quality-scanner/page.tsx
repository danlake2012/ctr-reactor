'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AdQualityAnalysis {
  overallScore: number;
  grade: string;
  summary: {
    totalIssues: number;
    criticalIssues: number;
    warnings: number;
    suggestions: number;
    adType: string;
    characterCount: number;
    wordCount: number;
  };
  contentQuality: {
    score: number;
    headline: { status: 'good' | 'warning' | 'error'; issues: string[]; suggestions: string[]; };
    description: { status: 'good' | 'warning' | 'error'; issues: string[]; suggestions: string[]; };
    callToAction: { status: 'good' | 'warning' | 'error'; issues: string[]; suggestions: string[]; };
    keywords: { status: 'good' | 'warning' | 'error'; issues: string[]; suggestions: string[]; };
    readability: { status: 'good' | 'warning' | 'error'; score: number; issues: string[]; };
  };
  technicalCompliance: {
    score: number;
    characterLimits: { status: 'good' | 'warning' | 'error'; issues: string[]; };
    punctuation: { status: 'good' | 'warning' | 'error'; issues: string[]; };
    capitalization: { status: 'good' | 'warning' | 'error'; issues: string[]; };
    symbols: { status: 'good' | 'warning' | 'error'; issues: string[]; };
    trademarks: { status: 'good' | 'warning' | 'error'; issues: string[]; };
  };
  performancePrediction: {
    ctrPrediction: number;
    qualityScore: number;
    conversionPotential: 'low' | 'medium' | 'high';
    competitiveEdge: 'weak' | 'moderate' | 'strong';
    targetAudienceMatch: number;
    recommendations: string[];
  };
  competitorComparison: {
    score: number;
    industryAverage: number;
    topPerformers: Array<{
      headline: string;
      ctr: number;
      strengths: string[];
    }>;
    opportunities: string[];
    recommendations: string[];
  };
  optimizationSuggestions: Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    issue: string;
    suggestion: string;
    expectedImpact: string;
    implementation: string;
  }>;
  adVariations: Array<{
    version: number;
    headline: string;
    description: string;
    predictedCTR: number;
    improvements: string[];
  }>;
  actionPlan: {
    immediate: string[];
    testing: string[];
    monitoring: string[];
    scaling: string[];
    estimatedImprovement: string;
  };
}

export default function AdQualityScanner() {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [adType, setAdType] = useState('search');
  const [targetAudience, setTargetAudience] = useState('');
  const [industry, setIndustry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AdQualityAnalysis | null>(null);

  const startAnalysis = async () => {
    if (!headline.trim() || !description.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI ad quality analysis delay
    await new Promise(resolve => setTimeout(resolve, 6000));

    // Mock comprehensive ad quality analysis
    const mockResults: AdQualityAnalysis = {
      overallScore: 72,
      grade: 'B-',
      summary: {
        totalIssues: 8,
        criticalIssues: 2,
        warnings: 4,
        suggestions: 12,
        adType: adType,
        characterCount: headline.length + description.length,
        wordCount: headline.split(' ').length + description.split(' ').length
      },
      contentQuality: {
        score: 68,
        headline: {
          status: 'warning',
          issues: ['Headline too generic', 'Missing power words'],
          suggestions: ['Add specific benefits', 'Include numbers or statistics', 'Use action-oriented language']
        },
        description: {
          status: 'warning',
          issues: ['Description too long', 'Missing clear value proposition'],
          suggestions: ['Shorten to focus on key benefits', 'Add social proof or urgency', 'Include specific call-to-action']
        },
        callToAction: {
          status: 'error',
          issues: ['No clear call-to-action'],
          suggestions: ['Add compelling CTA like "Get Started Today"', 'Use action verbs', 'Create urgency']
        },
        keywords: {
          status: 'good',
          issues: [],
          suggestions: ['Consider adding long-tail keywords', 'Test keyword variations']
        },
        readability: {
          status: 'good',
          score: 78,
          issues: [],
        }
      },
      technicalCompliance: {
        score: 85,
        characterLimits: {
          status: 'good',
          issues: []
        },
        punctuation: {
          status: 'warning',
          issues: ['Multiple exclamation points may seem spammy']
        },
        capitalization: {
          status: 'good',
          issues: []
        },
        symbols: {
          status: 'good',
          issues: []
        },
        trademarks: {
          status: 'good',
          issues: []
        }
      },
      performancePrediction: {
        ctrPrediction: 3.2,
        qualityScore: 7.8,
        conversionPotential: 'medium',
        competitiveEdge: 'moderate',
        targetAudienceMatch: 75,
        recommendations: [
          'Predicted CTR of 3.2% is above industry average',
          'Quality Score of 7.8 indicates good ad relevance',
          'Medium conversion potential with optimization',
          '75% target audience match is solid'
        ]
      },
      competitorComparison: {
        score: 71,
        industryAverage: 2.8,
        topPerformers: [
          {
            headline: 'Save 50% on Premium Services - Limited Time!',
            ctr: 4.2,
            strengths: ['Specific discount', 'Urgency', 'Clear value']
          },
          {
            headline: 'Expert Solutions for Your Business Needs',
            ctr: 3.8,
            strengths: ['Credibility', 'Problem-solution focus', 'Professional tone']
          },
          {
            headline: '#1 Rated Service - 1000+ Happy Customers',
            ctr: 3.9,
            strengths: ['Social proof', 'Specific numbers', 'Trust signals']
          }
        ],
        opportunities: [
          'Add specific discount or offer',
          'Include social proof elements',
          'Create more urgency',
          'Use numbers and statistics'
        ],
        recommendations: [
          'Study top performers and adapt their successful elements',
          'Test discount-based headlines',
          'Add customer count or rating to build trust',
          'Create urgency with time-limited offers'
        ]
      },
      optimizationSuggestions: [
        {
          priority: 'high',
          category: 'Headline',
          issue: 'Generic headline lacks specificity',
          suggestion: 'Add specific benefits, numbers, or unique selling points',
          expectedImpact: '+25-40% CTR improvement',
          implementation: 'Replace generic terms with specific value propositions'
        },
        {
          priority: 'high',
          category: 'Call-to-Action',
          issue: 'Missing clear call-to-action',
          suggestion: 'Add compelling CTA like "Start Free Trial" or "Get Quote Now"',
          expectedImpact: '+15-30% conversion improvement',
          implementation: 'Add CTA at end of description with action verb'
        },
        {
          priority: 'medium',
          category: 'Value Proposition',
          issue: 'Unclear unique value proposition',
          suggestion: 'Clearly state what makes your offer unique',
          expectedImpact: '+10-20% CTR improvement',
          implementation: 'Add differentiator like "Industry-Leading" or "Award-Winning"'
        },
        {
          priority: 'medium',
          category: 'Social Proof',
          issue: 'Missing credibility indicators',
          suggestion: 'Add customer count, ratings, or certifications',
          expectedImpact: '+10-25% trust improvement',
          implementation: 'Include "#1 Rated" or "1000+ Customers"'
        },
        {
          priority: 'low',
          category: 'Urgency',
          issue: 'No sense of urgency or scarcity',
          suggestion: 'Add time-limited offers or limited availability',
          expectedImpact: '+5-15% conversion improvement',
          implementation: 'Add "Limited Time" or "While Supplies Last"'
        }
      ],
      adVariations: [
        {
          version: 1,
          headline: 'Save 40% on Premium Services - Act Now!',
          description: 'Get expert solutions with our award-winning platform. Join 1000+ satisfied customers. Start your free trial today!',
          predictedCTR: 4.1,
          improvements: ['Added discount', 'Included social proof', 'Clear CTA']
        },
        {
          version: 2,
          headline: '#1 Rated Business Solutions - Try Free',
          description: 'Industry-leading platform trusted by professionals. 30-day free trial, no credit card required. Get started in minutes!',
          predictedCTR: 3.8,
          improvements: ['Added credibility', 'Emphasized free trial', 'Reduced friction']
        },
        {
          version: 3,
          headline: 'Transform Your Business in 30 Days',
          description: 'Proven results with our comprehensive solution. Expert support included. Limited spots available - reserve yours now!',
          predictedCTR: 3.9,
          improvements: ['Added transformation promise', 'Created urgency', 'Included support']
        }
      ],
      actionPlan: {
        immediate: [
          'Add clear call-to-action to description',
          'Include specific discount or offer in headline',
          'Add social proof elements',
          'Test character limits and formatting'
        ],
        testing: [
          'A/B test 3 ad variations for 2 weeks',
          'Test different discount percentages',
          'Try various CTA buttons',
          'Experiment with ad scheduling'
        ],
        monitoring: [
          'Track CTR, conversion rate, and CPA daily',
          'Monitor Quality Score changes',
          'Analyze audience response by demographics',
          'Review competitor ad performance weekly'
        ],
        scaling: [
          'Scale best-performing ad to full budget',
          'Create similar ads for related keywords',
          'Expand to additional ad platforms',
          'Develop retargeting campaigns'
        ],
        estimatedImprovement: 'Expected 40-60% CTR improvement and 25-35% conversion increase within 30 days'
      }
    };

    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const getStatusColor = (status: string) => {
    if (status === 'good') return 'text-green-400';
    if (status === 'warning') return 'text-yellow-400';
    return 'text-red-400';
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
            <span className="text-6xl">🔍</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              AD QUALITY SCANNER
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            SCAN ADS FOR QUALITY ISSUES & OPTIMIZATION OPPORTUNITIES
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Ad Content */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                AD CONTENT
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    HEADLINE *
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Your compelling ad headline..."
                    maxLength={30}
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  />
                  <div className="text-xs text-slate-400 mt-1">{headline.length}/30 characters</div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    DESCRIPTION *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Your detailed ad description with call-to-action..."
                    maxLength={90}
                    rows={3}
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  />
                  <div className="text-xs text-slate-400 mt-1">{description.length}/90 characters</div>
                </div>
              </div>
            </div>

            {/* Ad Settings */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                AD SETTINGS
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    AD TYPE
                  </label>
                  <select
                    value={adType}
                    onChange={(e) => setAdType(e.target.value)}
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    <option value="search">Search Ads (Google Ads)</option>
                    <option value="display">Display Ads</option>
                    <option value="social">Social Media Ads</option>
                    <option value="shopping">Shopping Ads</option>
                    <option value="video">Video Ads</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    TARGET AUDIENCE
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g., Small business owners, Tech professionals..."
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    INDUSTRY
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    <option value="">Select Industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="education">Education</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button
                  onClick={startAnalysis}
                  disabled={isAnalyzing || !headline.trim() || !description.trim()}
                  className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {isAnalyzing ? 'SCANNING AD QUALITY...' : 'SCAN AD QUALITY'}
                </button>
              </div>
            </div>

            {/* Quality Checklist */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h3 className="text-xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                QUALITY CHECKLIST
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">🎯</span>
                    <span>Clear value proposition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">📈</span>
                    <span>Compelling call-to-action</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">🏆</span>
                    <span>Unique selling points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">⚡</span>
                    <span>Urgency or scarcity</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">👥</span>
                    <span>Social proof elements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">🔍</span>
                    <span>Relevant keywords</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">📏</span>
                    <span>Proper character limits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">🎨</span>
                    <span>Professional formatting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              QUALITY ANALYSIS RESULTS
            </h2>

            {results ? (
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                {/* Overall Score */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      AD QUALITY SCORE
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
                      <div className="text-lg font-bold text-red-400">{results.summary.criticalIssues}</div>
                      <div className="text-xs text-slate-400">Critical</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-yellow-400">{results.summary.warnings}</div>
                      <div className="text-xs text-slate-400">Warnings</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.suggestions}</div>
                      <div className="text-xs text-slate-400">Suggestions</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-green-400">{results.performancePrediction.ctrPrediction}%</div>
                      <div className="text-xs text-slate-400">Predicted CTR</div>
                    </div>
                  </div>
                </div>

                {/* Content Quality */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    CONTENT QUALITY ANALYSIS
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-slate-900/30 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">Headline</span>
                        <span className={`text-sm ${getStatusColor(results.contentQuality.headline.status)}`}>
                          {results.contentQuality.headline.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-slate-300 mb-2">
                        Issues: {results.contentQuality.headline.issues.join(', ')}
                      </div>
                      <div className="text-sm text-blue-accent">
                        Suggestions: {results.contentQuality.headline.suggestions.join(', ')}
                      </div>
                    </div>

                    <div className="bg-slate-900/30 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">Description</span>
                        <span className={`text-sm ${getStatusColor(results.contentQuality.description.status)}`}>
                          {results.contentQuality.description.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-slate-300 mb-2">
                        Issues: {results.contentQuality.description.issues.join(', ')}
                      </div>
                      <div className="text-sm text-blue-accent">
                        Suggestions: {results.contentQuality.description.suggestions.join(', ')}
                      </div>
                    </div>

                    <div className="bg-slate-900/30 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">Call-to-Action</span>
                        <span className={`text-sm ${getStatusColor(results.contentQuality.callToAction.status)}`}>
                          {results.contentQuality.callToAction.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-slate-300 mb-2">
                        Issues: {results.contentQuality.callToAction.issues.join(', ')}
                      </div>
                      <div className="text-sm text-blue-accent">
                        Suggestions: {results.contentQuality.callToAction.suggestions.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Prediction */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    PERFORMANCE PREDICTION
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="bg-slate-900/30 rounded p-2 text-center">
                      <div className="text-lg font-bold text-blue-accent">{results.performancePrediction.ctrPrediction}%</div>
                      <div className="text-xs text-slate-400">Predicted CTR</div>
                    </div>
                    <div className="bg-slate-900/30 rounded p-2 text-center">
                      <div className="text-lg font-bold text-green-400">{results.performancePrediction.qualityScore}/10</div>
                      <div className="text-xs text-slate-400">Quality Score</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-300">
                    <strong>Conversion Potential:</strong> {results.performancePrediction.conversionPotential.toUpperCase()}<br />
                    <strong>Competitive Edge:</strong> {results.performancePrediction.competitiveEdge.toUpperCase()}<br />
                    <strong>Audience Match:</strong> {results.performancePrediction.targetAudienceMatch}%
                  </div>
                </div>

                {/* Top Optimization Suggestions */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    TOP OPTIMIZATION SUGGESTIONS
                  </h3>
                  <div className="space-y-2">
                    {results.optimizationSuggestions.slice(0, 3).map((suggestion, i) => (
                      <div key={i} className="bg-slate-900/30 rounded p-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm">{suggestion.category}: {suggestion.issue}</span>
                          <span className={`text-xs ${getPriorityColor(suggestion.priority)}`}>{suggestion.priority.toUpperCase()}</span>
                        </div>
                        <div className="text-sm text-blue-accent mb-1">{suggestion.suggestion}</div>
                        <div className="text-xs text-green-400">{suggestion.expectedImpact}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ad Variations */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    AI-GENERATED AD VARIATIONS
                  </h3>
                  <div className="space-y-3">
                    {results.adVariations.map((variation, i) => (
                      <div key={i} className="bg-slate-900/30 rounded p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-sm">Variation {variation.version}</span>
                          <span className="text-green-400 text-sm">{variation.predictedCTR}% CTR</span>
                        </div>
                        <div className="text-sm text-blue-accent font-bold mb-1">{variation.headline}</div>
                        <div className="text-sm text-slate-300 mb-2">{variation.description}</div>
                        <div className="text-xs text-slate-400">
                          <strong>Improvements:</strong> {variation.improvements.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Plan */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    IMPLEMENTATION ROADMAP
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-red-400 mb-2">IMMEDIATE ACTIONS</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        {results.actionPlan.immediate.map((action, i) => (
                          <li key={i}>• {action}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-400 mb-2">TESTING PHASE</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        {results.actionPlan.testing.map((action, i) => (
                          <li key={i}>• {action}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-sm text-slate-400 pt-2 border-t border-slate-700">
                      <strong>Expected Results:</strong> {results.actionPlan.estimatedImprovement}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                {isAnalyzing ? (
                  <div>
                    <div className="text-6xl mb-4">🔍</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      SCANNING AD QUALITY...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is analyzing content quality, technical compliance, performance prediction, and competitor comparison
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">📢</div>
                    <p className="text-slate-400">
                      Enter your ad headline and description to get comprehensive quality analysis and optimization suggestions
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>AD QUALITY SCANNER | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}