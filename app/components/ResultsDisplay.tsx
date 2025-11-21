'use client';

import { AnalysisResults } from '../../types';

interface ResultsDisplayProps {
  results: AnalysisResults;
  onReset: () => void;
}

export default function ResultsDisplay({ results, onReset }: ResultsDisplayProps) {
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Results Header */}
      <div className="bg-blue-primary/5 border-2 border-blue-primary rounded-xl p-8 mb-8 shadow-[0_0_30px_var(--blue-glow)]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-primary mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            ANALYSIS COMPLETE
          </h2>
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <div className={`text-6xl font-bold ${getGradeColor(results.grade.letter)} ${getGradeGlow(results.grade.letter)}`} style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {results.grade.letter}
              </div>
              <div className="text-blue-accent text-lg" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                GRADE
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {results.grade.score}
              </div>
              <div className="text-green-400/70 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                SCORE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-primary/5 border border-blue-primary/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-primary mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            PERFORMANCE METRICS
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-blue-accent">CTR:</span>
              <span className="text-white font-bold">{results.metrics.ctr}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-accent">CVR:</span>
              <span className="text-white font-bold">{results.metrics.cvr}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-accent">CPC:</span>
              <span className="text-white font-bold">${results.metrics.cpc}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-400">CPA:</span>
              <span className="text-white font-bold">${results.metrics.cpa}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-primary/5 border border-blue-primary/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-primary mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            CAMPAIGN DATA
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-blue-accent">Impressions:</span>
              <span className="text-white font-bold">{results.adData.impressions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-accent">Clicks:</span>
              <span className="text-white font-bold">{results.adData.clicks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-accent">Conversions:</span>
              <span className="text-white font-bold">{results.adData.conversions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-accent">Total Cost:</span>
              <span className="text-white font-bold">${results.adData.cost}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-primary/5 border border-blue-primary/50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-blue-primary mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          OPTIMIZATION RECOMMENDATIONS
        </h3>
        <ul className="space-y-2">
          {results.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-green-400 text-lg">⚡</span>
              <span className="text-white">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={onReset}
          className="bg-accent-color hover:bg-accent-color/80 text-black font-bold py-3 px-8 rounded-lg tracking-wider uppercase transition-all border-2 border-accent-color shadow-[0_0_20px_var(--accent-glow)]"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          ANALYZE ANOTHER
        </button>
        <button
          onClick={() => window.print()}
          className="bg-transparent hover:bg-accent-color/10 text-blue-accent hover:text-blue-primary font-bold py-3 px-8 rounded-lg tracking-wider uppercase transition-all border-2 border-blue-primary/50 hover:border-blue-accent"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          EXPORT REPORT
        </button>
      </div>
    </div>
  );
}