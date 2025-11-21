'use client';

import Link from 'next/link';
import { useState } from 'react';

type UserPlan = 'catalyst' | 'commander' | 'reactor' | null;

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'seo-mega-pack' | 'website-command' | 'thumbnail-analytics-studio';
  href?: string;
  available: boolean;
  comingSoon?: boolean;
}

export default function ToolsPage() {
  const [userPlan, setUserPlan] = useState<UserPlan>(() => {
    if (typeof window !== 'undefined') {
      const savedPlan = localStorage.getItem('userPlan') as UserPlan;
      if (savedPlan && ['catalyst', 'commander', 'reactor'].includes(savedPlan)) {
        return savedPlan;
      }
    }
    return 'catalyst';
  });
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'seo-mega-pack' | 'website-command' | 'thumbnail-analytics-studio'>('all');

  const tools: Tool[] = [
    // SEO Mega Pack
    {
      id: 'keyword-research-suite',
      name: 'Keyword Research Suite',
      description: 'Comprehensive keyword research with volume, difficulty, and opportunity analysis',
      icon: '🔍',
      category: 'seo-mega-pack',
      href: '/tools/keyword-research-suite',
      available: true,
    },
    {
      id: 'on-page-seo-analyzer',
      name: 'On-Page SEO Analyzer',
      description: 'Analyze website pages for SEO optimization opportunities',
      icon: '🔧',
      category: 'seo-mega-pack',
      href: '/tools/on-page-seo-analyzer',
      available: true,
    },
    {
      id: 'competitor-seo-analysis',
      name: 'Competitor SEO Analysis',
      description: 'Analyze competitor SEO strategies and identify gaps',
      icon: '🏆',
      category: 'seo-mega-pack',
      href: '/tools/competitor-seo-analysis',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
    {
      id: 'content-seo-optimizer',
      name: 'Content SEO Optimizer',
      description: 'Optimize content for search engines with readability and keyword integration',
      icon: '✍️',
      category: 'seo-mega-pack',
      href: '/tools/content-seo-optimizer',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
    {
      id: 'schema-markup-generator',
      name: 'Schema Markup Generator',
      description: 'Generate and validate structured data markup for rich snippets',
      icon: '🏷️',
      category: 'seo-mega-pack',
      href: '/tools/schema-markup-generator',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
    {
      id: 'mobile-seo-checker',
      name: 'Mobile SEO Checker',
      description: 'Ensure your website is optimized for mobile search',
      icon: '📱',
      category: 'seo-mega-pack',
      href: '/tools/mobile-seo-checker',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
    {
      id: 'site-speed-optimizer',
      name: 'Site Speed Optimizer',
      description: 'Analyze and optimize website loading speed for better rankings',
      icon: '⚡',
      category: 'seo-mega-pack',
      href: '/tools/site-speed-optimizer',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
    {
      id: 'international-seo-manager',
      name: 'International SEO Manager',
      description: 'Manage SEO across multiple countries and languages',
      icon: '🌍',
      category: 'seo-mega-pack',
      href: '/tools/international-seo-manager',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
    {
      id: 'ecommerce-seo-optimizer',
      name: 'E-commerce SEO Optimizer',
      description: 'Specialized SEO tools for online stores and product pages',
      icon: '�',
      category: 'seo-mega-pack',
      available: userPlan === 'reactor',
      comingSoon: true,
    },

    // Website Command
    {
      id: 'ctr-analyzer',
      name: 'CTR Analyzer',
      description: 'Analyze your ad click-through rates and get optimization recommendations',
      icon: '📊',
      category: 'website-command',
      href: '/analyzer',
      available: true,
    },
    {
      id: 'technical-seo-audit',
      name: 'Technical SEO Audit',
      description: 'Comprehensive technical SEO audit with actionable recommendations',
      icon: '🔧',
      category: 'website-command',
      available: true,
      comingSoon: true,
    },
    {
      id: 'website-audit-pro',
      name: 'Website Audit Pro',
      description: 'Comprehensive website analysis covering SEO, performance, security, and content',
      icon: '🔍',
      category: 'website-command',
      href: '/tools/website-audit-pro',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
    {
      id: 'backlink-analyzer',
      name: 'Backlink Analyzer',
      description: 'Analyze backlink profile and identify link building opportunities',
      icon: '🔗',
      category: 'website-command',
      href: '/tools/backlink-analyzer',
      available: true,
    },
    {
      id: 'serp-tracker',
      name: 'SERP Tracker',
      description: 'Track search engine rankings for keywords over time',
      icon: '📊',
      category: 'website-command',
      href: '/tools/serp-tracker',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
    {
      id: 'rank-tracker',
      name: 'Rank Tracker',
      description: 'Advanced keyword ranking tracking with competitor analysis and predictions',
      icon: '🎯',
      category: 'website-command',
      href: '/tools/rank-tracker',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
    {
      id: 'core-web-vitals-monitor',
      name: 'Core Web Vitals Monitor',
      description: 'Monitor Core Web Vitals and page speed metrics for optimal performance',
      icon: '⚡',
      category: 'website-command',
      href: '/tools/core-web-vitals-monitor',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
    {
      id: 'schema-markup-validator',
      name: 'Schema Markup Validator',
      description: 'Validate structured data markup for rich results and SEO enhancement',
      icon: '🔍',
      category: 'website-command',
      href: '/tools/schema-markup-validator',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
    {
      id: 'local-seo-optimizer',
      name: 'Local SEO Optimizer',
      description: 'Optimize for local search with GMB and citation management',
      icon: '📍',
      category: 'website-command',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
    {
      id: 'enterprise-seo-suite',
      name: 'Enterprise SEO Suite',
      description: 'Advanced SEO tools for large websites with multiple domains',
      icon: '🏢',
      category: 'website-command',
      available: userPlan === 'reactor',
    },

    // Ads Grading Tools (Website Command)
    {
      id: 'ad-grader-basic',
      name: 'Ad Grader Basic',
      description: 'Grade your ads on a scale of 1-10 with detailed feedback',
      icon: '📊',
      category: 'website-command',
      href: '/analyzer',
      available: true,
    },
    {
      id: 'ad-quality-scanner',
      name: 'Ad Quality Scanner',
      description: 'Scan ads for quality issues and improvement suggestions',
      icon: '🔍',
      category: 'website-command',
      available: true,
    },
    {
      id: 'competitor-ad-analysis',
      name: 'Competitor Ad Analysis',
      description: 'Analyze competitor ads and identify winning strategies',
      icon: '🏆',
      category: 'website-command',
      available: true,
    },
    {
      id: 'ad-performance-predictor',
      name: 'Ad Performance Predictor',
      description: 'Predict ad performance before launch using AI algorithms',
      icon: '🔮',
      category: 'website-command',
      available: userPlan === 'commander' || userPlan === 'reactor',
      comingSoon: true,
    },
    {
      id: 'ad-grader-pro',
      name: 'Ad Grader Pro',
      description: 'Advanced grading with competitor benchmarking and optimization',
      icon: '⭐',
      category: 'website-command',
      available: userPlan === 'commander' || userPlan === 'reactor',
      comingSoon: true,
    },

    // Thumbnail Analytics Studio
    {
      id: 'thumbnail-generator',
      name: 'Thumbnail Generator',
      description: 'AI-powered thumbnail creation with click-optimized designs',
      icon: '🖼️',
      category: 'thumbnail-analytics-studio',
      href: '/tools/thumbnail-generator',
      available: true,
    },
    {
      id: 'thumbnail-ab-tester',
      name: 'Thumbnail A/B Tester',
      description: 'Test multiple thumbnail variations for optimal click rates',
      icon: '🧪',
      category: 'thumbnail-analytics-studio',
      available: true,
      comingSoon: true,
    },
    {
      id: 'thumbnail-heatmap',
      name: 'Thumbnail Heatmap',
      description: 'Visual analysis of thumbnail elements that attract clicks',
      icon: '🔥',
      category: 'thumbnail-analytics-studio',
      available: userPlan === 'commander' || userPlan === 'reactor',
      comingSoon: true,
    },
    {
      id: 'thumbnail-optimizer',
      name: 'Thumbnail Optimizer',
      description: 'Optimize existing thumbnails for maximum engagement',
      icon: '⚡',
      category: 'thumbnail-analytics-studio',
      available: userPlan === 'commander' || userPlan === 'reactor',
      comingSoon: true,
    },
    {
      id: 'thumbnail-scoring',
      name: 'Thumbnail Scoring',
      description: 'Analyze thumbnail effectiveness and click prediction',
      icon: '📊',
      category: 'thumbnail-analytics-studio',
      href: '/tools/thumbnail-scoring',
      available: true,
    },

    // Additional Website Command Tools
    {
      id: 'ad-copy-scoring',
      name: 'Ad Copy Scoring',
      description: 'Score your ad copy for effectiveness and engagement potential',
      icon: '📝',
      category: 'website-command',
      href: '/tools/ad-copy-scoring',
      available: true,
    },
    {
      id: 'visual-impact-scanner',
      name: 'Visual Impact Scanner',
      description: 'Scan ad visuals for maximum attention-grabbing potential',
      icon: '�️',
      category: 'website-command',
      available: true,
      comingSoon: true,
    },
    {
      id: 'click-through-predictor',
      name: 'Click-Through Predictor',
      description: 'Predict click-through rates for your ad creatives',
      icon: '🎯',
      category: 'website-command',
      href: '/tools/click-through-predictor',
      available: true,
    },
    {
      id: 'performance-reports',
      name: 'Performance Reports',
      description: 'Generate detailed reports on your ad campaign performance',
      icon: '📈',
      category: 'website-command',
      available: true,
      comingSoon: true,
    },
    {
      id: 'copy-optimization',
      name: 'Copy Optimization',
      description: 'AI-powered suggestions to improve your ad copy performance',
      icon: '✨',
      category: 'website-command',
      available: true,
      comingSoon: true,
    },

    // Commander Tier Tools (Website Command)
    {
      id: 'real-time-dashboard',
      name: 'Real-Time Dashboard',
      description: 'Live performance monitoring and instant alerts',
      icon: '📊',
      category: 'website-command',
      href: '/results',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
    {
      id: 'ab-testing-suite',
      name: 'A/B Testing Suite',
      description: 'Test ad variations and optimize for maximum conversions',
      icon: '🧪',
      category: 'website-command',
      available: userPlan === 'commander' || userPlan === 'reactor',
      comingSoon: true,
    },
    {
      id: 'campaign-manager-pro',
      name: 'Campaign Manager Pro',
      description: 'Manage up to 25 campaigns with advanced automation',
      icon: '🎯',
      category: 'website-command',
      available: userPlan === 'commander' || userPlan === 'reactor',
      comingSoon: true,
    },
    {
      id: 'conversion-optimization',
      name: 'Conversion Optimization',
      description: 'AI-powered tools to maximize your conversion rates',
      icon: '💰',
      category: 'website-command',
      available: userPlan === 'commander' || userPlan === 'reactor',
      comingSoon: true,
    },
    {
      id: 'custom-reporting',
      name: 'Custom Reporting',
      description: 'Create branded reports for stakeholders and clients',
      icon: '📋',
      category: 'website-command',
      available: userPlan === 'commander' || userPlan === 'reactor',
      comingSoon: true,
    },

    // Reactor Tier Tools (Website Command)
    {
      id: 'enterprise-dashboard',
      name: 'Enterprise Dashboard',
      description: 'Unlimited campaigns with real-time enterprise analytics',
      icon: '�',
      category: 'website-command',
      href: '/results',
      available: userPlan === 'reactor',
    },
    {
      id: 'advanced-ab-testing',
      name: 'Advanced A/B Testing',
      description: 'Multi-variant testing with statistical significance analysis',
      icon: '🧪',
      category: 'website-command',
      available: userPlan === 'reactor',
      comingSoon: true,
    },
    {
      id: 'unlimited-campaign-manager',
      name: 'Unlimited Campaign Manager',
      description: 'Manage unlimited campaigns with AI automation',
      icon: '🎯',
      category: 'website-command',
      available: userPlan === 'reactor',
      comingSoon: true,
    },
    {
      id: 'revenue-optimization-ai',
      name: 'Revenue Optimization AI',
      description: 'Machine learning algorithms to maximize revenue',
      icon: '💰',
      category: 'website-command',
      available: userPlan === 'reactor',
      comingSoon: true,
    },
    {
      id: 'white-label-reporting',
      name: 'White-Label Reporting',
      description: 'Fully branded reports for enterprise clients',
      icon: '🏢',
      category: 'website-command',
      available: userPlan === 'reactor',
      comingSoon: true,
    },
    {
      id: 'api-access',
      name: 'API Access',
      description: 'Full API access for custom integrations',
      icon: '🔗',
      category: 'website-command',
      available: userPlan === 'reactor',
      comingSoon: true,
    },
    {
      id: 'dedicated-account-manager',
      name: 'Dedicated Account Manager',
      description: 'Personal account manager for strategic guidance',
      icon: '👨‍�',
      category: 'website-command',
      available: userPlan === 'reactor',
      comingSoon: true,
    },
    {
      id: 'priority-support',
      name: 'Priority Support',
      description: '24/7 dedicated support with guaranteed response times',
      icon: '🎯',
      category: 'website-command',
      href: '/support',
      available: userPlan === 'commander' || userPlan === 'reactor',
    },
  ];


  const filteredTools = selectedCategory === 'all' ? tools : tools.filter(tool => tool.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'seo-mega-pack': return 'green';
      case 'website-command': return 'purple';
      case 'thumbnail-analytics-studio': return 'orange';
      default: return 'blue';
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'catalyst': return 'CATALYST';
      case 'commander': return 'COMMANDER';
      case 'reactor': return 'REACTOR';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-slate-100">
      {/* Layered gradient backdrop */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-blue-panel-dark via-blue-panel-2 to-blue-panel" />
        <div
          className="absolute -top-1/2 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 opacity-50 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--blue-glow-35) 0%, rgba(2, 6, 23, 0) 60%)'
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(0deg, var(--grid-line-15) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line-10) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col pt-20">
        {/* Header */}
        <div className="px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-blue-accent mb-4 tracking-[0.2em] uppercase drop-shadow-[0_0_16px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  CTR REACTOR TOOLS
                </h1>
                <p className="text-xl text-(--text-secondary) drop-shadow-[0_0_12px_var(--blue-glow-55)]">
                  Access all your tools in one place. Upgrade to unlock premium features.
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/pricing"
                  className="bg-transparent hover:bg-blue-primary/20 text-blue-accent font-bold py-3 px-6 rounded-lg text-sm tracking-[0.2em] uppercase transition-all border-2 border-blue-primary/40 hover:border-blue-accent"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  VIEW PLANS
                </Link>
                <Link
                  href="/"
                  className="bg-transparent hover:bg-blue-primary/20 text-blue-accent font-bold py-3 px-6 rounded-lg text-sm tracking-[0.2em] uppercase transition-all border-2 border-blue-primary/40 hover:border-blue-accent"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  HOME
                </Link>
              </div>
            </div>

            {/* Current Plan Display */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-4 bg-blue-panel/80 border border-blue-primary/40 rounded-lg px-6 py-3">
                <span className="text-slate-300">Current Plan:</span>
                <span className={`font-bold tracking-widest uppercase text-${getCategoryColor(userPlan || 'catalyst')}-400`} style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {getTierBadge(userPlan || 'catalyst')}
                </span>
                <button
                  onClick={() => {
                    const plans: UserPlan[] = ['catalyst', 'commander', 'reactor'];
                    const currentIndex = plans.indexOf(userPlan || 'catalyst');
                    const nextPlan = plans[(currentIndex + 1) % plans.length];
                    setUserPlan(nextPlan);
                    localStorage.setItem('userPlan', nextPlan || 'catalyst');
                  }}
                  className="text-xs text-slate-400 hover:text-blue-accent underline"
                >
                  [Demo: Click to switch plans]
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-4 mb-8">
              {[
                { key: 'all', label: 'ALL TOOLS', color: 'blue' },
                { key: 'seo-mega-pack', label: 'SEO MEGA PACK', color: 'green' },
                { key: 'website-command', label: 'WEBSITE COMMAND', color: 'purple' },
                { key: 'thumbnail-analytics-studio', label: 'THUMBNAIL ANALYTICS STUDIO', color: 'orange' },
              ].map(({ key, label, color }) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as 'all' | 'seo-mega-pack' | 'website-command' | 'thumbnail-analytics-studio')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold tracking-widest uppercase transition-all border-2 ${
                    selectedCategory === key
                      ? `bg-${color}-500/20 border-${color}-400 text-${color}-400`
                      : `bg-transparent border-${color}-500/30 text-${color}-300 hover:border-${color}-400`
                  }`}
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTools.map((tool) => {
                const categoryColor = getCategoryColor(tool.category);
                const isAvailable = tool.available;
                const isComingSoon = tool.comingSoon;

                return (
                  <div key={tool.id} className="relative">
                    {isAvailable ? (
                      tool.href ? (
                        <Link href={tool.href} className="group block">
                          <div className={`bg-linear-to-br from-slate-900/90 to-slate-800/90 border border-${categoryColor}-500/30 rounded-xl p-6 shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-md hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all duration-300 h-full`}>
                            <div className="text-center mb-4">
                              <div className="text-4xl mb-4">{tool.icon}</div>
                              <h3 className={`text-xl font-bold text-${categoryColor}-400 mb-2 tracking-widest uppercase`} style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                {tool.name}
                              </h3>
                              <p className="text-slate-300 text-sm">{tool.description}</p>
                            </div>
                            <div className="text-center">
                              <span className={`text-${categoryColor}-300 text-sm font-medium`}>
                                {isComingSoon ? 'Coming Soon' : 'Click to use →'}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className={`bg-linear-to-br from-slate-900/90 to-slate-800/90 border border-${categoryColor}-500/30 rounded-xl p-6 shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-md h-full`}>
                          <div className="text-center mb-4">
                            <div className="text-4xl mb-4">{tool.icon}</div>
                            <h3 className={`text-xl font-bold text-${categoryColor}-400 mb-2 tracking-widest uppercase`} style={{ fontFamily: 'Orbitron, sans-serif' }}>
                              {tool.name}
                            </h3>
                            <p className="text-slate-300 text-sm">{tool.description}</p>
                          </div>
                          <div className="text-center">
                            <span className={`text-${categoryColor}-300 text-sm font-medium`}>
                              {isComingSoon ? 'Coming Soon' : 'Available'}
                            </span>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="relative">
                        {/* Tool card (fully visible) */}
                        <div className={`bg-linear-to-br from-slate-900/70 to-slate-800/70 border border-gray-600/50 rounded-xl p-6 shadow-[0_0_20px_rgba(100,100,100,0.2)] backdrop-blur-md h-full`}>
                          <div className="text-center mb-4">
                            <div className="text-4xl mb-4">{tool.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-2 tracking-widest uppercase drop-shadow-lg" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                              {tool.name}
                            </h3>
                            <p className="text-slate-300 text-sm">{tool.description}</p>
                          </div>
                          <div className="text-center">
                            <span className="text-gray-400 text-sm font-medium">
                              {isComingSoon ? 'Coming Soon' : 'Premium Feature'}
                            </span>
                          </div>
                        </div>

                        {/* Minimal lock overlay */}
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                          <div className="text-center bg-black/60 rounded-lg px-4 py-3 backdrop-blur-md border border-white/20">
                            <div className="text-2xl mb-1">🔒</div>
                            <div className="text-white font-bold text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                              {tool.name}
                            </div>
                            <div className="text-white/80 text-xs mb-2">Premium Plan Required</div>
                            <Link
                              href="/pricing"
                              className="inline-block bg-blue-accent hover:bg-blue-bright text-black font-bold py-1 px-3 rounded text-xs tracking-widest uppercase transition-colors"
                              style={{ fontFamily: 'Orbitron, sans-serif' }}
                            >
                              UPGRADE
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Category badge */}
                    <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-bold tracking-widest uppercase bg-${categoryColor}-500/20 border border-${categoryColor}-500/40 text-${categoryColor}-300`}>
                      {tool.category.replace('-', ' ').toUpperCase()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}