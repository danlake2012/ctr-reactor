'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CompetitorAdAnalysis {
  overallScore: number;
  grade: string;
  summary: {
    competitorsAnalyzed: number;
    adsFound: number;
    topPerformingAds: number;
    uniqueStrategies: number;
    marketShare: number;
  };
  competitorOverview: Array<{
    name: string;
    domain: string;
    adSpend: number;
    adCount: number;
    avgCTR: number;
    topKeywords: string[];
    strengths: string[];
    weaknesses: string[];
  }>;
  adStrategyAnalysis: {
    headlinePatterns: Array<{
      pattern: string;
      frequency: number;
      effectiveness: number;
      examples: string[];
    }>;
    descriptionStrategies: Array<{
      strategy: string;
      frequency: number;
      effectiveness: number;
      examples: string[];
    }>;
    callToActionAnalysis: Array<{
      cta: string;
      frequency: number;
      conversionRate: number;
      examples: string[];
    }>;
    valuePropositionFocus: Array<{
      proposition: string;
      frequency: number;
      resonance: number;
      examples: string[];
    }>;
  };
  keywordIntelligence: {
    topKeywords: Array<{
      keyword: string;
      searchVolume: number;
      competition: number;
      avgCPC: number;
      competitorUsage: number;
      opportunity: 'high' | 'medium' | 'low';
    }>;
    keywordGaps: Array<{
      keyword: string;
      searchVolume: number;
      competition: number;
      yourPosition: number;
      competitorPosition: number;
    }>;
    longTailOpportunities: Array<{
      keyword: string;
      searchVolume: number;
      competition: number;
      difficulty: number;
    }>;
  };
  creativeAnalysis: {
    visualElements: Array<{
      element: string;
      frequency: number;
      effectiveness: number;
      examples: string[];
    }>;
    messagingThemes: Array<{
      theme: string;
      frequency: number;
      sentiment: 'positive' | 'neutral' | 'negative';
      examples: string[];
    }>;
    brandPositioning: Array<{
      position: string;
      frequency: number;
      strength: number;
      examples: string[];
    }>;
  };
  performanceBenchmarking: {
    ctrComparison: {
      industryAverage: number;
      competitorAverage: number;
      yourPredicted: number;
      percentile: number;
    };
    conversionAnalysis: {
      industryAverage: number;
      competitorAverage: number;
      yourPredicted: number;
      percentile: number;
    };
    costEfficiency: {
      industryAverage: number;
      competitorAverage: number;
      yourPredicted: number;
      percentile: number;
    };
  };
  strategicRecommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    recommendation: string;
    rationale: string;
    expectedImpact: string;
    implementation: string[];
  }>;
  adVariations: Array<{
    competitor: string;
    originalAd: {
      headline: string;
      description: string;
    };
    improvedVersion: {
      headline: string;
      description: string;
    };
    improvements: string[];
    predictedLift: number;
  }>;
  marketInsights: {
    trends: Array<{
      trend: string;
      impact: 'high' | 'medium' | 'low';
      timeframe: string;
      opportunity: 'high' | 'medium' | 'low';
    }>;
    seasonalPatterns: Array<{
      season: string;
      adVolume: number;
      topKeywords: string[];
      strategies: string[];
    }>;
    emergingOpportunities: Array<{
      opportunity: string;
      potential: number;
      competition: number;
      entryStrategy: string[];
    }>;
  };
  actionPlan: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
    budgetAllocation: {
      headlineTesting: number;
      keywordExpansion: number;
      creativeDevelopment: number;
      competitorMonitoring: number;
    };
    successMetrics: string[];
    timeline: string;
  };
}

export default function CompetitorAdAnalysis() {
  const [targetKeywords, setTargetKeywords] = useState('');
  const [competitorDomains, setCompetitorDomains] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<CompetitorAdAnalysis | null>(null);

  const startAnalysis = async () => {
    if (!targetKeywords.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI competitor analysis delay
    await new Promise(resolve => setTimeout(resolve, 9000));

    // Mock comprehensive competitor ad analysis
    const mockResults: CompetitorAdAnalysis = {
      overallScore: 74,
      grade: 'B',
      summary: {
        competitorsAnalyzed: 5,
        adsFound: 127,
        topPerformingAds: 23,
        uniqueStrategies: 18,
        marketShare: 12.5
      },
      competitorOverview: [
        {
          name: 'Competitor A',
          domain: 'competa.com',
          adSpend: 45000,
          adCount: 34,
          avgCTR: 3.8,
          topKeywords: ['enterprise software', 'business management', 'cloud platform'],
          strengths: ['Strong brand messaging', 'Clear value propositions', 'High-quality creatives'],
          weaknesses: ['Limited keyword targeting', 'Generic CTAs']
        },
        {
          name: 'Competitor B',
          domain: 'competech.com',
          adSpend: 32000,
          adCount: 28,
          avgCTR: 4.2,
          topKeywords: ['software solutions', 'digital transformation', 'workflow automation'],
          strengths: ['Excellent targeting', 'Personalized messaging', 'Strong social proof'],
          weaknesses: ['Higher cost per click', 'Limited geographic reach']
        },
        {
          name: 'Competitor C',
          domain: 'competepro.com',
          adSpend: 28000,
          adCount: 31,
          avgCTR: 3.5,
          topKeywords: ['business software', 'productivity tools', 'team collaboration'],
          strengths: ['Broad keyword coverage', 'Competitive pricing', 'Good conversion rates'],
          weaknesses: ['Generic ad copy', 'Poor landing page experience']
        }
      ],
      adStrategyAnalysis: {
        headlinePatterns: [
          {
            pattern: 'Benefit-focused headlines',
            frequency: 45,
            effectiveness: 4.2,
            examples: ['Save 50% on Premium Services', 'Boost Productivity by 300%', 'Transform Your Business Today']
          },
          {
            pattern: 'Question-based headlines',
            frequency: 28,
            effectiveness: 3.8,
            examples: ['Ready for Digital Transformation?', 'Need Better Team Collaboration?', 'Looking for Reliable Software?']
          },
          {
            pattern: 'Number-driven headlines',
            frequency: 35,
            effectiveness: 4.5,
            examples: ['#1 Rated Business Software', '5000+ Companies Trust Us', '30-Day Free Trial Available']
          }
        ],
        descriptionStrategies: [
          {
            strategy: 'Feature-benefit combinations',
            frequency: 52,
            effectiveness: 4.3,
            examples: ['Advanced analytics with real-time reporting. Make data-driven decisions instantly.']
          },
          {
            strategy: 'Social proof integration',
            frequency: 38,
            effectiveness: 4.1,
            examples: ['Trusted by 5000+ companies worldwide. Join industry leaders today.']
          },
          {
            strategy: 'Risk reversal',
            frequency: 22,
            effectiveness: 3.9,
            examples: ['30-day money-back guarantee. Try risk-free today.']
          }
        ],
        callToActionAnalysis: [
          {
            cta: 'Start Free Trial',
            frequency: 35,
            conversionRate: 4.2,
            examples: ['Start Your Free Trial Today', 'Begin Free Trial Now', 'Try Free for 30 Days']
          },
          {
            cta: 'Get Started',
            frequency: 28,
            conversionRate: 3.8,
            examples: ['Get Started Today', 'Start Now', 'Begin Your Journey']
          },
          {
            cta: 'Learn More',
            frequency: 18,
            conversionRate: 2.9,
            examples: ['Learn More', 'Discover Solutions', 'See How It Works']
          }
        ],
        valuePropositionFocus: [
          {
            proposition: 'Time savings',
            frequency: 42,
            resonance: 4.5,
            examples: ['Save 10 hours per week', 'Automate repetitive tasks', 'Streamline workflows']
          },
          {
            proposition: 'Cost reduction',
            frequency: 35,
            resonance: 4.2,
            examples: ['Reduce costs by 40%', 'Save thousands annually', 'Lower operational expenses']
          },
          {
            proposition: 'Scalability',
            frequency: 28,
            resonance: 4.1,
            examples: ['Scale from 1 to 1000 users', 'Grow without limits', 'Enterprise-ready solutions']
          }
        ]
      },
      keywordIntelligence: {
        topKeywords: [
          {
            keyword: 'enterprise software',
            searchVolume: 12100,
            competition: 78,
            avgCPC: 8.50,
            competitorUsage: 85,
            opportunity: 'medium'
          },
          {
            keyword: 'business management software',
            searchVolume: 8900,
            competition: 65,
            avgCPC: 6.20,
            competitorUsage: 72,
            opportunity: 'high'
          },
          {
            keyword: 'cloud business platform',
            searchVolume: 5400,
            competition: 45,
            avgCPC: 4.80,
            competitorUsage: 58,
            opportunity: 'high'
          }
        ],
        keywordGaps: [
          {
            keyword: 'industry specific software',
            searchVolume: 3200,
            competition: 25,
            yourPosition: 0,
            competitorPosition: 15
          },
          {
            keyword: 'small business automation',
            searchVolume: 4100,
            competition: 35,
            yourPosition: 0,
            competitorPosition: 8
          }
        ],
        longTailOpportunities: [
          {
            keyword: 'enterprise software for healthcare industry',
            searchVolume: 1200,
            competition: 15,
            difficulty: 25
          },
          {
            keyword: 'business management software with crm integration',
            searchVolume: 890,
            competition: 20,
            difficulty: 30
          }
        ]
      },
      creativeAnalysis: {
        visualElements: [
          {
            element: 'Product screenshots',
            frequency: 65,
            effectiveness: 4.3,
            examples: ['Dashboard previews', 'Feature demonstrations', 'User interface shots']
          },
          {
            element: 'Customer testimonials',
            frequency: 45,
            effectiveness: 4.5,
            examples: ['Quote graphics', 'Case study previews', 'Success metrics']
          },
          {
            element: 'Brand colors and logos',
            frequency: 78,
            effectiveness: 3.8,
            examples: ['Consistent branding', 'Logo placement', 'Color scheme usage']
          }
        ],
        messagingThemes: [
          {
            theme: 'Innovation and technology',
            frequency: 52,
            sentiment: 'positive',
            examples: ['Cutting-edge technology', 'Latest innovations', 'Advanced features']
          },
          {
            theme: 'Trust and reliability',
            frequency: 48,
            sentiment: 'positive',
            examples: ['Trusted solution', 'Reliable platform', 'Proven results']
          },
          {
            theme: 'Cost effectiveness',
            frequency: 35,
            sentiment: 'positive',
            examples: ['Cost savings', 'ROI focus', 'Value for money']
          }
        ],
        brandPositioning: [
          {
            position: 'Industry leader',
            frequency: 42,
            strength: 4.2,
            examples: ['#1 in the industry', 'Market leader', 'Industry standard']
          },
          {
            position: 'Trusted partner',
            frequency: 38,
            strength: 4.1,
            examples: ['Trusted by thousands', 'Partner with us', 'Your success partner']
          },
          {
            position: 'Innovative solution',
            frequency: 35,
            strength: 3.9,
            examples: ['Innovative approach', 'Next-generation', 'Future-ready']
          }
        ]
      },
      performanceBenchmarking: {
        ctrComparison: {
          industryAverage: 2.8,
          competitorAverage: 3.8,
          yourPredicted: 3.2,
          percentile: 65
        },
        conversionAnalysis: {
          industryAverage: 3.2,
          competitorAverage: 4.1,
          yourPredicted: 3.6,
          percentile: 58
        },
        costEfficiency: {
          industryAverage: 4.20,
          competitorAverage: 3.80,
          yourPredicted: 4.50,
          percentile: 45
        }
      },
      strategicRecommendations: [
        {
          priority: 'high',
          category: 'Headline Strategy',
          recommendation: 'Adopt number-driven headlines with specific benefits',
          rationale: 'Competitors using this pattern achieve 35% higher CTR',
          expectedImpact: '+25-40% CTR improvement',
          implementation: [
            'Create 10+ headline variations with numbers',
            'Test headlines with specific percentages or quantities',
            'Include timeframes and measurable results'
          ]
        },
        {
          priority: 'high',
          category: 'Value Proposition',
          recommendation: 'Focus on time savings and efficiency gains',
          rationale: 'This resonates strongly with B2B decision makers',
          expectedImpact: '+20-30% conversion improvement',
          implementation: [
            'Emphasize time savings in all ad copy',
            'Include specific efficiency metrics',
            'Show before/after productivity comparisons'
          ]
        },
        {
          priority: 'medium',
          category: 'Keyword Expansion',
          recommendation: 'Target identified keyword gaps in untapped segments',
          rationale: 'Low competition keywords with good search volume',
          expectedImpact: '+15-25% traffic increase',
          implementation: [
            'Create dedicated campaigns for gap keywords',
            'Develop landing pages for these terms',
            'Monitor performance and scale winners'
          ]
        },
        {
          priority: 'medium',
          category: 'Creative Development',
          recommendation: 'Incorporate more customer testimonials and social proof',
          rationale: 'Competitors using this see 28% higher engagement',
          expectedImpact: '+18-30% engagement improvement',
          implementation: [
            'Collect and feature customer testimonials',
            'Create case study highlight graphics',
            'Add trust badges and certifications'
          ]
        }
      ],
      adVariations: [
        {
          competitor: 'Competitor A',
          originalAd: {
            headline: 'Business Software Solutions',
            description: 'Comprehensive business management platform for growing companies.'
          },
          improvedVersion: {
            headline: 'Save 10 Hours/Week with Smart Automation',
            description: 'Reduce manual work by 70%. Join 5000+ companies saving time daily. Free 30-day trial!'
          },
          improvements: ['Added specific benefit', 'Included social proof', 'Clear CTA with urgency'],
          predictedLift: 45
        },
        {
          competitor: 'Competitor B',
          originalAd: {
            headline: 'Enterprise Software Platform',
            description: 'Advanced features for enterprise businesses.'
          },
          improvedVersion: {
            headline: '#1 Rated Software - 40% More Efficient',
            description: 'Boost team productivity by 300%. Trusted by Fortune 500 companies. Start free trial today!'
          },
          improvements: ['Added credibility indicator', 'Specific performance metric', 'Strong social proof'],
          predictedLift: 52
        }
      ],
      marketInsights: {
        trends: [
          {
            trend: 'AI-powered automation',
            impact: 'high',
            timeframe: '6-12 months',
            opportunity: 'high'
          },
          {
            trend: 'Remote work solutions',
            impact: 'high',
            timeframe: '3-6 months',
            opportunity: 'medium'
          },
          {
            trend: 'Industry-specific solutions',
            impact: 'medium',
            timeframe: '6-12 months',
            opportunity: 'high'
          }
        ],
        seasonalPatterns: [
          {
            season: 'Q1 (Jan-Mar)',
            adVolume: 85,
            topKeywords: ['tax season software', 'year-end planning', 'budget management'],
            strategies: ['Focus on planning and budgeting', 'Tax-related solutions', 'Year-end promotions']
          },
          {
            season: 'Q4 (Oct-Dec)',
            adVolume: 120,
            topKeywords: ['holiday promotions', 'year-end deals', 'budget planning'],
            strategies: ['Holiday-themed campaigns', 'Year-end discounts', 'Planning tools']
          }
        ],
        emergingOpportunities: [
          {
            opportunity: 'SaaS for specific industries',
            potential: 85,
            competition: 35,
            entryStrategy: [
              'Research industry pain points',
              'Develop specialized features',
              'Create industry-specific content',
              'Target niche keywords'
            ]
          },
          {
            opportunity: 'Integration-focused solutions',
            potential: 78,
            competition: 42,
            entryStrategy: [
              'Partner with popular business tools',
              'Develop API integrations',
              'Highlight compatibility features',
              'Create integration-focused campaigns'
            ]
          }
        ]
      },
      actionPlan: {
        immediate: [
          'Implement number-driven headlines across all campaigns',
          'Add specific time-saving benefits to ad copy',
          'Include social proof in descriptions',
          'Test competitor-derived ad variations'
        ],
        shortTerm: [
          'Launch campaigns targeting identified keyword gaps',
          'Create customer testimonial graphics for ads',
          'Develop industry-specific ad variations',
          'A/B test different value propositions'
        ],
        longTerm: [
          'Build comprehensive competitor monitoring system',
          'Develop proprietary ad creative assets',
          'Create seasonal campaign templates',
          'Establish market leadership in key segments'
        ],
        budgetAllocation: {
          headlineTesting: 25,
          keywordExpansion: 30,
          creativeDevelopment: 25,
          competitorMonitoring: 20
        },
        successMetrics: [
          'CTR improvement of 25%+ within 30 days',
          'Conversion rate increase of 20%+ within 60 days',
          'Cost per acquisition reduction of 15%+ within 90 days',
          'Market share growth of 5%+ within 6 months'
        ],
        timeline: '3-6 months for full competitive advantage implementation'
      }
    };

    setResults(mockResults);
    setIsAnalyzing(false);
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
            <span className="text-6xl">🏆</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              COMPETITOR AD ANALYSIS
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            ANALYZE COMPETITOR ADS & IDENTIFY WINNING STRATEGIES
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Target Information */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                TARGET ANALYSIS
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    TARGET KEYWORDS *
                  </label>
                  <textarea
                    value={targetKeywords}
                    onChange={(e) => setTargetKeywords(e.target.value)}
                    placeholder="enterprise software, business management, cloud platform..."
                    rows={2}
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    COMPETITOR DOMAINS
                  </label>
                  <textarea
                    value={competitorDomains}
                    onChange={(e) => setCompetitorDomains(e.target.value)}
                    placeholder="competitor1.com&#10;competitor2.com&#10;competitor3.com"
                    rows={3}
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-blue-accent mb-2">
                      LOCATION
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Country/City"
                      className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    MONTHLY AD BUDGET
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    <option value="">Select Budget</option>
                    <option value="0-1k">$0 - $1,000</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-15k">$5,000 - $15,000</option>
                    <option value="15k-50k">$15,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>

                <button
                  onClick={startAnalysis}
                  disabled={isAnalyzing || !targetKeywords.trim()}
                  className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {isAnalyzing ? 'ANALYZING COMPETITORS...' : 'START COMPETITOR ANALYSIS'}
                </button>
              </div>
            </div>

            {/* Analysis Scope */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h3 className="text-xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                ANALYSIS SCOPE
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">📊</span>
                    <span>Ad copy analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">🎯</span>
                    <span>Keyword strategies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">💰</span>
                    <span>Budget & bidding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">📈</span>
                    <span>Performance metrics</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">🎨</span>
                    <span>Creative strategies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">📍</span>
                    <span>Targeting insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">🔮</span>
                    <span>Market trends</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-accent">🚀</span>
                    <span>Opportunity identification</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              COMPETITOR ANALYSIS RESULTS
            </h2>

            {results ? (
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                {/* Overall Score */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      COMPETITIVE ANALYSIS SCORE
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
                      <div className="text-lg font-bold text-blue-accent">{results.summary.competitorsAnalyzed}</div>
                      <div className="text-xs text-slate-400">Competitors</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.adsFound}</div>
                      <div className="text-xs text-slate-400">Ads Found</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-green-400">{results.summary.topPerformingAds}</div>
                      <div className="text-xs text-slate-400">Top Performers</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.marketShare}%</div>
                      <div className="text-xs text-slate-400">Market Share</div>
                    </div>
                  </div>
                </div>

                {/* Competitor Overview */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    COMPETITOR OVERVIEW
                  </h3>
                  <div className="space-y-3">
                    {results.competitorOverview.map((competitor, i) => (
                      <div key={i} className="bg-slate-900/30 rounded p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-blue-accent">{competitor.name}</span>
                          <span className="text-green-400 text-sm">{competitor.avgCTR}% CTR</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-slate-300 mb-2">
                          <div>Ads: {competitor.adCount}</div>
                          <div>Budget: ${competitor.adSpend.toLocaleString()}</div>
                        </div>
                        <div className="text-xs text-slate-400">
                          <strong>Top Keywords:</strong> {competitor.topKeywords.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategy Analysis */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    WINNING STRATEGIES IDENTIFIED
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-slate-900/30 rounded p-3">
                      <div className="font-bold text-blue-accent mb-2">Top Headline Patterns</div>
                      <div className="space-y-1 text-sm">
                        {results.adStrategyAnalysis.headlinePatterns.slice(0, 2).map((pattern, i) => (
                          <div key={i} className="flex justify-between">
                            <span className="text-slate-300">{pattern.pattern}</span>
                            <span className="text-green-400">{pattern.effectiveness}/5.0</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900/30 rounded p-3">
                      <div className="font-bold text-blue-accent mb-2">Effective CTAs</div>
                      <div className="space-y-1 text-sm">
                        {results.adStrategyAnalysis.callToActionAnalysis.slice(0, 2).map((cta, i) => (
                          <div key={i} className="flex justify-between">
                            <span className="text-slate-300">{cta.cta}</span>
                            <span className="text-green-400">{cta.conversionRate}% CVR</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keyword Intelligence */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    KEYWORD OPPORTUNITIES
                  </h3>
                  <div className="space-y-2">
                    {results.keywordIntelligence.topKeywords.slice(0, 3).map((kw, i) => (
                      <div key={i} className="bg-slate-900/30 rounded p-2 text-sm">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold">{kw.keyword}</span>
                          <span className={`text-xs ${kw.opportunity === 'high' ? 'text-green-400' : kw.opportunity === 'medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                            {kw.opportunity.toUpperCase()} OPPORTUNITY
                          </span>
                        </div>
                        <div className="text-slate-400 text-xs">
                          Volume: {kw.searchVolume.toLocaleString()} | CPC: ${kw.avgCPC}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategic Recommendations */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    STRATEGIC RECOMMENDATIONS
                  </h3>
                  <div className="space-y-2">
                    {results.strategicRecommendations.slice(0, 3).map((rec, i) => (
                      <div key={i} className="bg-slate-900/30 rounded p-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm">{rec.category}</span>
                          <span className={`text-xs ${getPriorityColor(rec.priority)}`}>{rec.priority.toUpperCase()}</span>
                        </div>
                        <div className="text-sm text-blue-accent mb-1">{rec.recommendation}</div>
                        <div className="text-xs text-green-400">{rec.expectedImpact}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Benchmarking */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    PERFORMANCE BENCHMARKING
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-900/30 rounded p-2 text-center">
                      <div className="text-lg font-bold text-blue-accent">{results.performanceBenchmarking.ctrComparison.yourPredicted}%</div>
                      <div className="text-xs text-slate-400">Your CTR</div>
                      <div className="text-xs text-green-400">{results.performanceBenchmarking.ctrComparison.percentile}th percentile</div>
                    </div>
                    <div className="bg-slate-900/30 rounded p-2 text-center">
                      <div className="text-lg font-bold text-blue-accent">{results.performanceBenchmarking.conversionAnalysis.yourPredicted}%</div>
                      <div className="text-xs text-slate-400">Your CVR</div>
                      <div className="text-xs text-green-400">{results.performanceBenchmarking.conversionAnalysis.percentile}th percentile</div>
                    </div>
                    <div className="bg-slate-900/30 rounded p-2 text-center">
                      <div className="text-lg font-bold text-blue-accent">${results.performanceBenchmarking.costEfficiency.yourPredicted}</div>
                      <div className="text-xs text-slate-400">Your CPC</div>
                      <div className="text-xs text-green-400">{results.performanceBenchmarking.costEfficiency.percentile}th percentile</div>
                    </div>
                  </div>
                </div>

                {/* Action Plan */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    COMPETITIVE ACTION PLAN
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
                      <h4 className="font-bold text-yellow-400 mb-2">BUDGET ALLOCATION</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                        <div>Headline Testing: {results.actionPlan.budgetAllocation.headlineTesting}%</div>
                        <div>Keyword Expansion: {results.actionPlan.budgetAllocation.keywordExpansion}%</div>
                        <div>Creative Development: {results.actionPlan.budgetAllocation.creativeDevelopment}%</div>
                        <div>Competitor Monitoring: {results.actionPlan.budgetAllocation.competitorMonitoring}%</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-400 pt-2 border-t border-slate-700">
                      <strong>Timeline:</strong> {results.actionPlan.timeline}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                {isAnalyzing ? (
                  <div>
                    <div className="text-6xl mb-4">🏆</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      ANALYZING COMPETITORS...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is scanning competitor ads, analyzing strategies, and identifying winning patterns
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-slate-400">
                      Enter target keywords to analyze competitor ad strategies and identify opportunities
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>COMPETITOR AD ANALYSIS | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}