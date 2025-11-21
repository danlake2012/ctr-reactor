'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [catalystType, setCatalystType] = useState<'adgrader' | 'thumbnail'>('adgrader');
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
                  PRICING PLANS
                </h1>
                <p className="text-xl text-(--text-secondary) drop-shadow-[0_0_12px_var(--blue-glow-55)]">
                  Choose the perfect plan to supercharge your ad performance
                </p>
              </div>
              <Link
                href="/"
                className="bg-transparent hover:bg-blue-primary/20 text-blue-accent font-bold py-3 px-6 rounded-lg text-sm tracking-[0.2em] uppercase transition-all border-2 border-blue-primary/40 hover:border-blue-accent"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                BACK TO HOME
              </Link>
            </div>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center">
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-1 flex items-center">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                    !isYearly
                      ? 'bg-blue-accent text-slate-900'
                      : 'text-slate-300 hover:text-blue-accent'
                  }`}
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  MONTHLY
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                    isYearly
                      ? 'bg-blue-accent text-slate-900'
                      : 'text-slate-300 hover:text-blue-accent'
                  }`}
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  YEARLY
                  <span className="ml-2 text-xs bg-green-500 text-green-900 px-2 py-1 rounded-full">
                    SAVE 17%
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* CTR Catalyst - Basic Plan */}
              <div className="bg-linear-to-br from-slate-900/90 to-slate-800/90 border border-cyan-500/30 rounded-xl p-6 shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] transition-all duration-300 group">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    CTR CATALYST
                  </h3>

                  {/* Tool Toggle */}
                  <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-1 mb-4 flex items-center">
                    <button
                      onClick={() => setCatalystType('adgrader')}
                      className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${
                        catalystType === 'adgrader'
                          ? 'bg-cyan-600 text-slate-900'
                          : 'text-slate-300 hover:text-cyan-400'
                      }`}
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      ADGRADER
                    </button>
                    <button
                      onClick={() => setCatalystType('thumbnail')}
                      className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${
                        catalystType === 'thumbnail'
                          ? 'bg-cyan-600 text-slate-900'
                          : 'text-slate-300 hover:text-cyan-400'
                      }`}
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      THUMBNAIL
                    </button>
                  </div>

                  <div className="text-3xl font-bold text-cyan-300 mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    ${isYearly ? '278' : '29'}<span className="text-lg text-cyan-400">/{isYearly ? 'yr' : 'mo'}</span>
                  </div>
                  {isYearly && <p className="text-xs text-cyan-400 mb-2">Save $70/year</p>}
                  <p className="text-slate-300 text-xs">
                    {catalystType === 'adgrader' ? 'Ad copy optimization' : 'Thumbnail optimization'}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {catalystType === 'adgrader' ? (
                    <>
                      <div className="flex items-center text-slate-200">
                        <span className="text-cyan-400 mr-2">✓</span>
                        <span className="text-xs">CTR Analysis</span>
                      </div>
                      <div className="flex items-center text-slate-200">
                        <span className="text-cyan-400 mr-2">✓</span>
                        <span className="text-xs">Ad Copy Scoring</span>
                      </div>
                      <div className="flex items-center text-slate-200">
                        <span className="text-cyan-400 mr-2">✓</span>
                        <span className="text-xs">Performance Reports</span>
                      </div>
                      <div className="flex items-center text-slate-200">
                        <span className="text-cyan-400 mr-2">✓</span>
                        <span className="text-xs">Email Support</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center text-slate-200">
                        <span className="text-cyan-400 mr-2">✓</span>
                        <span className="text-xs">Thumbnail Scoring</span>
                      </div>
                      <div className="flex items-center text-slate-200">
                        <span className="text-cyan-400 mr-2">✓</span>
                        <span className="text-xs">Visual Analysis</span>
                      </div>
                      <div className="flex items-center text-slate-200">
                        <span className="text-cyan-400 mr-2">✓</span>
                        <span className="text-xs">Performance Reports</span>
                      </div>
                      <div className="flex items-center text-slate-200">
                        <span className="text-cyan-400 mr-2">✓</span>
                        <span className="text-xs">Email Support</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="text-center mb-4">
                  <p className="text-xs text-slate-400 mb-1">SATISFACTION GUARANTEED</p>
                  <p className="text-xs text-slate-500">30-day guarantee</p>
                </div>

                <Link
                  href={`/tools/catalyst?type=${catalystType}`}
                  className="w-full bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 font-bold py-2 px-4 rounded-lg text-center transition-all border border-cyan-500/40 hover:border-cyan-400 block text-sm"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  GET STARTED
                </Link>
              </div>

              {/* Conversion Commander - Pro Plan */}
              <div className="bg-linear-to-br from-slate-900/90 to-slate-800/90 border-2 border-orange-500/50 rounded-xl p-8 shadow-[0_0_30px_rgba(249,115,22,0.2)] backdrop-blur-md hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all duration-300 group relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-slate-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    MOST POPULAR
                  </span>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-orange-400 mb-2 tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    CONVERSION COMMANDER
                  </h3>
                  <div className="text-4xl font-bold text-orange-300 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    ${isYearly ? '758' : '79'}<span className="text-xl text-orange-400">/{isYearly ? 'yr' : 'mo'}</span>
                  </div>
                  {isYearly && <p className="text-xs text-orange-400 mb-2">Save $190/year</p>}
                  <p className="text-slate-300 text-sm">For growing businesses ready to scale</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-slate-200">
                    <span className="text-orange-400 mr-3">✓</span>
                    <span>Advanced CTR Analysis</span>
                  </div>
                  <div className="flex items-center text-slate-200">
                    <span className="text-orange-400 mr-3">✓</span>
                    <span>Real-time Performance Dashboard</span>
                  </div>
                  <div className="flex items-center text-slate-200">
                    <span className="text-orange-400 mr-3">✓</span>
                    <span>25 Ad Campaigns</span>
                  </div>
                  <div className="flex items-center text-slate-200">
                    <span className="text-orange-400 mr-3">✓</span>
                    <span>Priority Support</span>
                  </div>
                  <div className="flex items-center text-slate-200">
                    <span className="text-orange-400 mr-3">✓</span>
                    <span>A/B Testing Tools</span>
                  </div>
                  <div className="flex items-center text-slate-200">
                    <span className="text-orange-400 mr-3">✓</span>
                    <span>Conversion Optimization</span>
                  </div>
                  <div className="flex items-center text-slate-200">
                    <span className="text-orange-400 mr-3">✓</span>
                    <span>Custom Reporting</span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-xs text-slate-400 mb-2">SATISFACTION GUARANTEED</p>
                  <p className="text-xs text-slate-500">30-day satisfaction guarantee</p>
                </div>

                <Link
                  href="/tools/commander"
                  className="w-full bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 font-bold py-3 px-6 rounded-lg text-center transition-all border border-orange-500/40 hover:border-orange-400 block"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  GET STARTED
                </Link>
              </div>

              {/* Revenue Reactor - Enterprise Plan */}
              <div className="bg-linear-to-br from-slate-900/90 to-slate-800/90 border border-purple-500/30 rounded-xl p-8 shadow-[0_0_30px_rgba(168,85,247,0.15)] backdrop-blur-md hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] transition-all duration-300 group">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-purple-400 mb-2 tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    REVENUE REACTOR
                  </h3>
                  <div className="text-4xl font-bold text-purple-300 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    ${isYearly ? '1918' : '199'}<span className="text-xl text-purple-400">/{isYearly ? 'yr' : 'mo'}</span>
                  </div>
                  {isYearly && <p className="text-xs text-purple-400 mb-2">Save $478/year</p>}
                  <p className="text-slate-300 text-sm">For enterprise teams maximizing ROI</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-slate-200">
                    <span className="text-purple-400 mr-3">✓</span>
                    <span>Everything in Commander</span>
                  </div>
                  <div className="flex items-center text-slate-200">
                    <span className="text-purple-400 mr-3">✓</span>
                    <span>Unlimited Ad Campaigns</span>
                  </div>
                  <div className="flex items-center text-slate-200">
                    <span className="text-purple-400 mr-3">✓</span>
                    <span>Advanced AI Optimization</span>
                  </div>
                  <div className="flex items-center text-slate-200">
                    <span className="text-purple-400 mr-3">✓</span>
                    <span>Dedicated Account Manager</span>
                  </div>
                  <div className="flex items-center text-slate-200">
                    <span className="text-purple-400 mr-3">✓</span>
                    <span>Custom Integrations</span>
                  </div>
                  <div className="flex items-center text-slate-200">
                    <span className="text-purple-400 mr-3">✓</span>
                    <span>White-label Reporting</span>
                  </div>
                  <div className="flex items-center text-slate-200">
                    <span className="text-purple-400 mr-3">✓</span>
                    <span>API Access</span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-xs text-slate-400 mb-2">SATISFACTION GUARANTEED</p>
                  <p className="text-xs text-slate-500">30-day satisfaction guarantee</p>
                </div>

                <Link
                  href="/tools/reactor"
                  className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-bold py-3 px-6 rounded-lg text-center transition-all border border-purple-500/40 hover:border-purple-400 block"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  GET STARTED
                </Link>
              </div>

            </div>

            {/* FAQ Section */}
            <div className="mt-16 text-center">
              <h4 className="text-2xl font-bold text-blue-accent mb-8 tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                FREQUENTLY ASKED QUESTIONS
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
                  <h5 className="text-lg font-bold text-blue-accent mb-3">What is the satisfaction guarantee?</h5>
                  <p className="text-slate-300 text-sm">If you&apos;re not completely satisfied with our service within 30 days, we&apos;ll work with you to make it right or provide a full refund.</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
                  <h5 className="text-lg font-bold text-blue-accent mb-3">Can I change plans anytime?</h5>
                  <p className="text-slate-300 text-sm">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
                  <h5 className="text-lg font-bold text-blue-accent mb-3">Do you offer enterprise discounts?</h5>
                  <p className="text-slate-300 text-sm">Contact our sales team for custom enterprise pricing and dedicated support options.</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
                  <h5 className="text-lg font-bold text-blue-accent mb-3">What payment methods do you accept?</h5>
                  <p className="text-slate-300 text-sm">We accept all major credit cards and PayPal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}