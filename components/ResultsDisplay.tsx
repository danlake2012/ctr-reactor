'use client';

import { AnalysisResults } from '@/types';
import { getGradeColor } from '@/lib/utils';

interface ResultsDisplayProps {
  results: AnalysisResults;
  onReset: () => void;
}

export default function ResultsDisplay({ results, onReset }: ResultsDisplayProps) {
  const gradeColor = getGradeColor(results.grade.score);

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-500 font-orbitron flex items-center justify-center gap-3">
          <span>⚡</span>
          ANALYSIS COMPLETE
        </h2>
      </div>

      {/* Grade Display */}
      <div className="bg-black/60 border-2 border-green-500 rounded-xl p-8 text-center shadow-[0_0_30px_rgba(0,255,65,0.3)]">
        <div className="text-green-400 font-orbitron text-sm tracking-widest mb-4">
          PERFORMANCE GRADE
        </div>
        <div 
          className="text-8xl font-bold mb-4 font-orbitron"
          style={{ 
            color: gradeColor,
            textShadow: `0 0 20px ${gradeColor}, 0 0 40px ${gradeColor}, 0 0 60px ${gradeColor}`
          }}
        >
          {results.grade.letter}
        </div>
        <div className="text-2xl text-green-300 font-orbitron">
          {results.grade.score}/100
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* CTR */}
        <div className="bg-black/40 border-2 border-green-500/50 rounded-xl p-6 text-center hover:border-green-500 transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]">
          <div className="text-4xl mb-3">📊</div>
          <div className="text-green-400 font-orbitron text-sm tracking-wider mb-2">CTR</div>
          <div className="text-3xl font-bold text-green-300 mb-1">
            {results.metrics.ctr.toFixed(2)}%
          </div>
          <div className="text-green-500/50 text-xs">Click-Through Rate</div>
        </div>

        {/* CVR */}
        <div className="bg-black/40 border-2 border-green-500/50 rounded-xl p-6 text-center hover:border-green-500 transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]">
          <div className="text-4xl mb-3">🎯</div>
          <div className="text-green-400 font-orbitron text-sm tracking-wider mb-2">CVR</div>
          <div className="text-3xl font-bold text-green-300 mb-1">
            {results.metrics.cvr.toFixed(2)}%
          </div>
          <div className="text-green-500/50 text-xs">Conversion Rate</div>
        </div>

        {/* CPC */}
        <div className="bg-black/40 border-2 border-green-500/50 rounded-xl p-6 text-center hover:border-green-500 transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]">
          <div className="text-4xl mb-3">💰</div>
          <div className="text-green-400 font-orbitron text-sm tracking-wider mb-2">CPC</div>
          <div className="text-3xl font-bold text-green-300 mb-1">
            ${results.metrics.cpc.toFixed(2)}
          </div>
          <div className="text-green-500/50 text-xs">Cost Per Click</div>
        </div>

        {/* CPA */}
        <div className="bg-black/40 border-2 border-green-500/50 rounded-xl p-6 text-center hover:border-green-500 transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]">
          <div className="text-4xl mb-3">💎</div>
          <div className="text-green-400 font-orbitron text-sm tracking-wider mb-2">CPA</div>
          <div className="text-3xl font-bold text-green-300 mb-1">
            {results.metrics.cpa > 0 ? `$${results.metrics.cpa.toFixed(2)}` : 'N/A'}
          </div>
          <div className="text-green-500/50 text-xs">Cost Per Acquisition</div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-black/40 border-2 border-green-500/50 rounded-xl p-8 shadow-[0_0_20px_rgba(0,255,65,0.2)]">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🔍</span>
          <h3 className="text-xl font-bold text-green-500 font-orbitron tracking-wider">
            OPTIMIZATION RECOMMENDATIONS
          </h3>
        </div>
        <div className="space-y-3">
          {results.recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="bg-green-500/5 border border-green-500/30 rounded-lg p-4 text-green-300 font-mono text-sm hover:bg-green-500/10 transition-all"
            >
              {recommendation}
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full bg-black border-2 border-green-500 hover:bg-green-500/10 text-green-500 font-bold py-4 px-8 rounded-lg font-orbitron text-lg tracking-wider transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.3)]"
      >
        NEW ANALYSIS
      </button>
    </section>
  );
}
