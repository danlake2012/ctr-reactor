'use client';

import Link from 'next/link';
import { useAnalysisStore } from '../../lib/store';

export default function ResultsPage() {
  const { results, getSampleData } = useAnalysisStore();

  // Use stored results if available, otherwise use sample data
  const analysisResults = results || getSampleData();

  const getGradeColor = (letter: string) => {
    switch (letter.charAt(0)) {
      case 'A': return 'text-green-400';
      case 'B': return 'text-yellow-400';
      case 'C': return 'text-blue-400';
      case 'D':
      case 'F': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getGradeGlow = (letter: string) => {
    switch (letter.charAt(0)) {
      case 'A': return 'shadow-[0_0_20px_var(--green-glow)]';
      case 'B': return 'shadow-[0_0_20px_var(--yellow-glow)]';
      case 'C': return 'shadow-[0_0_20px_var(--blue-glow)]';
      case 'D':
      case 'F': return 'shadow-[0_0_20px_var(--accent-glow)]';
      default: return 'shadow-[0_0_20px_var(--blue-glow)]';
    }
  };

  const getMetricStatus = (metric: string, value: number) => {
    switch (metric) {
      case 'ctr':
        if (value >= 2) return { status: 'excellent', color: 'text-green-400', icon: '🚀' };
        if (value >= 1) return { status: 'good', color: 'text-yellow-400', icon: '⚡' };
        return { status: 'poor', color: 'text-red-400', icon: '⚠️' };
      case 'cvr':
        if (value >= 3) return { status: 'excellent', color: 'text-green-400', icon: '🎯' };
        if (value >= 1.5) return { status: 'good', color: 'text-yellow-400', icon: '📈' };
        return { status: 'poor', color: 'text-red-400', icon: '📉' };
      case 'cpc':
        if (value <= 1) return { status: 'excellent', color: 'text-green-400', icon: '💰' };
        if (value <= 2) return { status: 'good', color: 'text-yellow-400', icon: '💵' };
        return { status: 'poor', color: 'text-red-400', icon: '💸' };
      case 'cpa':
        if (value <= 20) return { status: 'excellent', color: 'text-green-400', icon: '🏆' };
        if (value <= 50) return { status: 'good', color: 'text-yellow-400', icon: '⭐' };
        return { status: 'poor', color: 'text-red-400', icon: '⚠️' };
      default:
        return { status: 'neutral', color: 'text-blue-400', icon: '📊' };
    }
  };

  const getGradeDescription = (letter: string) => {
    switch (letter.charAt(0)) {
      case 'A': return 'Exceptional performance with optimal conversion rates and cost efficiency';
      case 'B': return 'Strong performance with room for targeted improvements';
      case 'C': return 'Average performance requiring strategic optimization';
      case 'D': return 'Below average performance needing immediate attention';
      case 'F': return 'Poor performance requiring complete campaign overhaul';
      default: return 'Performance analysis in progress';
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
          className="absolute bottom-[-40%] right-[-10%] h-[900px] w-[900px] opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--blue-glow-30) 0%, rgba(2, 6, 23, 0) 70%)'
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

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-8 pt-10 pb-6 flex items-center gap-4 justify-between">
          <div className="text-6xl drop-shadow-[0_0_18px_var(--blue-glow-55)]">⚡</div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-accent tracking-[0.2em] uppercase drop-shadow-[0_0_16px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            CTR Reactor
          </h1>
          <Link href="/" className="text-blue-accent hover:text-blue-400 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Executive Summary */}
            <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/50 rounded-3xl p-8 shadow-[0_0_30px_var(--blue-glow)] backdrop-blur-md">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  EXECUTIVE SUMMARY
                </h2>
                <div className="flex items-center justify-center gap-8 mb-6">
                  <div className="text-center">
                    <div className={`text-8xl font-bold ${getGradeColor(analysisResults.grade.letter)} ${getGradeGlow(analysisResults.grade.letter)}`} style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {analysisResults.grade.letter}
                    </div>
                    <div className="text-blue-accent text-xl mt-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      OVERALL GRADE
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {analysisResults.grade.score}
                    </div>
                    <div className="text-blue-accent/70 text-lg" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      PERFORMANCE SCORE
                    </div>
                  </div>
                </div>
                <p className="text-white text-lg max-w-2xl mx-auto leading-relaxed">
                  {getGradeDescription(analysisResults.grade.letter)}
                </p>
              </div>
            </div>

            {/* Performance Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Key Metrics Overview */}
              <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-6 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md">
                <h3 className="text-xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  KEY PERFORMANCE METRICS
                </h3>
                <div className="space-y-6">
                  {/* CTR */}
                  <div className="bg-black/30 rounded-xl p-4 border border-blue-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getMetricStatus('ctr', analysisResults.metrics.ctr).icon}</span>
                        <span className="text-blue-accent font-bold">CTR (Click-Through Rate)</span>
                      </div>
                      <span className={`text-2xl font-bold ${getMetricStatus('ctr', analysisResults.metrics.ctr).color}`}>
                        {analysisResults.metrics.ctr}%
                      </span>
                    </div>
                    <div className="w-full bg-blue-primary/20 rounded-full h-2 mb-2">
                      <div
                        className="bg-linear-to-r from-blue-accent to-blue-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(analysisResults.metrics.ctr * 10, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-blue-accent/70">
                      Percentage of people who click on your ad after seeing it. Industry average: 1-2%
                    </p>
                  </div>

                  {/* CVR */}
                  <div className="bg-black/30 rounded-xl p-4 border border-blue-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getMetricStatus('cvr', analysisResults.metrics.cvr).icon}</span>
                        <span className="text-blue-accent font-bold">CVR (Conversion Rate)</span>
                      </div>
                      <span className={`text-2xl font-bold ${getMetricStatus('cvr', analysisResults.metrics.cvr).color}`}>
                        {analysisResults.metrics.cvr}%
                      </span>
                    </div>
                    <div className="w-full bg-blue-primary/20 rounded-full h-2 mb-2">
                      <div
                        className="bg-linear-to-r from-blue-accent to-blue-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(analysisResults.metrics.cvr * 10, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-blue-accent/70">
                      Percentage of clicks that result in desired actions. Industry average: 2-5%
                    </p>
                  </div>

                  {/* CPC */}
                  <div className="bg-black/30 rounded-xl p-4 border border-blue-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getMetricStatus('cpc', analysisResults.metrics.cpc).icon}</span>
                        <span className="text-blue-accent font-bold">CPC (Cost Per Click)</span>
                      </div>
                      <span className={`text-2xl font-bold ${getMetricStatus('cpc', analysisResults.metrics.cpc).color}`}>
                        ${analysisResults.metrics.cpc}
                      </span>
                    </div>
                    <div className="w-full bg-blue-primary/20 rounded-full h-2 mb-2">
                      <div
                        className="bg-linear-to-r from-blue-accent to-blue-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.max(0, 100 - (analysisResults.metrics.cpc * 25))}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-blue-accent/70">
                      Average cost you pay for each click. Industry average: $1-3
                    </p>
                  </div>

                  {/* CPA */}
                  <div className="bg-black/30 rounded-xl p-4 border border-blue-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getMetricStatus('cpa', analysisResults.metrics.cpa).icon}</span>
                        <span className="text-blue-accent font-bold">CPA (Cost Per Acquisition)</span>
                      </div>
                      <span className={`text-2xl font-bold ${getMetricStatus('cpa', analysisResults.metrics.cpa).color}`}>
                        ${analysisResults.metrics.cpa}
                      </span>
                    </div>
                    <div className="w-full bg-blue-primary/20 rounded-full h-2 mb-2">
                      <div
                        className="bg-linear-to-r from-blue-accent to-blue-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.max(0, 100 - (analysisResults.metrics.cpa * 2))}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-blue-accent/70">
                      Average cost to acquire a customer. Industry average: $20-100
                    </p>
                  </div>
                </div>
              </div>

              {/* Campaign Data & Insights */}
              <div className="space-y-6">
                {/* Campaign Overview */}
                <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-6 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md">
                  <h3 className="text-xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    CAMPAIGN OVERVIEW
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/30 rounded-xl p-4 border border-blue-primary/20">
                      <div className="text-3xl font-bold text-blue-accent mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {analysisResults.adData.impressions.toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-accent/70">IMPRESSIONS</div>
                      <div className="text-xs text-white/60 mt-1">Ad views delivered</div>
                    </div>
                    <div className="bg-black/30 rounded-xl p-4 border border-blue-primary/20">
                      <div className="text-3xl font-bold text-blue-accent mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {analysisResults.adData.clicks.toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-accent/70">CLICKS</div>
                      <div className="text-xs text-white/60 mt-1">User interactions</div>
                    </div>
                    <div className="bg-black/30 rounded-xl p-4 border border-blue-primary/20">
                      <div className="text-3xl font-bold text-blue-accent mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {analysisResults.adData.conversions.toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-accent/70">CONVERSIONS</div>
                      <div className="text-xs text-white/60 mt-1">Desired actions</div>
                    </div>
                    <div className="bg-black/30 rounded-xl p-4 border border-blue-primary/20">
                      <div className="text-3xl font-bold text-blue-accent mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        ${analysisResults.adData.cost}
                      </div>
                      <div className="text-sm text-blue-accent/70">TOTAL COST</div>
                      <div className="text-xs text-white/60 mt-1">Campaign spend</div>
                    </div>
                  </div>
                </div>

                {/* Performance Insights */}
                <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-6 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md">
                  <h3 className="text-xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    PERFORMANCE INSIGHTS
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-accent text-xl mt-1">📊</span>
                      <div>
                        <div className="text-white font-semibold">Conversion Funnel</div>
                        <div className="text-sm text-blue-accent/70">
                          {((analysisResults.adData.conversions / analysisResults.adData.impressions) * 100).toFixed(2)}% of impressions converted to customers
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-accent text-xl mt-1">💡</span>
                      <div>
                        <div className="text-white font-semibold">Efficiency Ratio</div>
                        <div className="text-sm text-blue-accent/70">
                          ${(analysisResults.adData.cost / analysisResults.adData.conversions).toFixed(2)} spent per conversion
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-accent text-xl mt-1">🎯</span>
                      <div>
                        <div className="text-white font-semibold">Click Quality</div>
                        <div className="text-sm text-blue-accent/70">
                          {((analysisResults.adData.conversions / analysisResults.adData.clicks) * 100).toFixed(1)}% of clicks resulted in conversions
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimization Recommendations */}
            <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-6 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md">
              <h3 className="text-xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                OPTIMIZATION ROADMAP
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analysisResults.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="bg-black/30 rounded-xl p-4 border border-blue-primary/20">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-accent text-2xl">⚡</span>
                      <div>
                        <div className="text-white font-semibold mb-2">
                          Priority {index + 1}
                        </div>
                        <div className="text-sm text-blue-accent/80 leading-relaxed">
                          {rec}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Plan */}
            <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-6 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md">
              <h3 className="text-xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                NEXT STEPS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🔍</div>
                  <h4 className="text-lg font-bold text-blue-accent mb-2">IMMEDIATE ACTIONS</h4>
                  <p className="text-sm text-blue-accent/70">
                    Implement high-priority recommendations within the next 24-48 hours for quick wins
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">📈</div>
                  <h4 className="text-lg font-bold text-blue-accent mb-2">MONITOR & MEASURE</h4>
                  <p className="text-sm text-blue-accent/70">
                    Track performance changes and A/B test optimization strategies
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🚀</div>
                  <h4 className="text-lg font-bold text-blue-accent mb-2">SCALE SUCCESS</h4>
                  <p className="text-sm text-blue-accent/70">
                    Apply successful strategies to other campaigns and increase budget allocation
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-8">
              <Link href="/">
                <button className="bg-(--blue-primary) hover:bg-(--blue-accent) text-black font-bold py-4 px-10 rounded-xl tracking-wider uppercase transition-all border-2 border-(--blue-primary) shadow-[0_0_20px_var(--blue-glow)] hover:shadow-[0_0_30px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  ANALYZE ANOTHER
                </button>
              </Link>
              <button
                onClick={() => window.print()}
                className="bg-transparent hover:bg-(--blue-primary)/10 text-(--blue-primary) hover:text-(--blue-accent) font-bold py-4 px-10 rounded-xl tracking-wider uppercase transition-all border-2 border-(--blue-primary)/50 hover:border-(--blue-primary)"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                EXPORT REPORT
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-8 text-center text-footer-accent/80 text-sm drop-shadow-[0_0_12px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>CTR-REACTOR v2.0 | &copy; 2025 | OPTIMIZING DIGITAL ADVERTISING</p>
        </footer>
      </div>
    </div>
  );
}