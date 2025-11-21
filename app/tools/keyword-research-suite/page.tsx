'use client';

import { useState } from 'react';
import Link from 'next/link';

interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  opportunity: number;
  competition: string;
  cpc: number;
}

export default function KeywordResearchSuite() {
  const [keywords, setKeywords] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<KeywordData[]>([]);

  const handleAnalyze = async () => {
    if (!keywords.trim()) return;

    setIsAnalyzing(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock data for demonstration
    const mockResults: KeywordData[] = [
      {
        keyword: keywords.split(',')[0]?.trim() || 'example keyword',
        volume: Math.floor(Math.random() * 10000) + 1000,
        difficulty: Math.floor(Math.random() * 100),
        opportunity: Math.floor(Math.random() * 100),
        competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        cpc: Math.random() * 5 + 0.5,
      },
      // Add more mock results based on input keywords
      ...keywords.split(',').slice(1, 5).map((kw) => ({
        keyword: kw.trim(),
        volume: Math.floor(Math.random() * 10000) + 1000,
        difficulty: Math.floor(Math.random() * 100),
        opportunity: Math.floor(Math.random() * 100),
        competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        cpc: Math.random() * 5 + 0.5,
      }))
    ];

    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-green-400';
    if (difficulty < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getOpportunityColor = (opportunity: number) => {
    if (opportunity > 70) return 'text-green-400';
    if (opportunity > 40) return 'text-yellow-400';
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
            <span className="text-6xl">🔍</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              KEYWORD RESEARCH SUITE
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            COMPREHENSIVE KEYWORD ANALYSIS & OPPORTUNITY DISCOVERY
          </p>
        </header>

        {/* Input Section */}
        <div className="mb-8">
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              ENTER KEYWORDS TO ANALYZE
            </h2>
            <div className="space-y-4">
              <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter keywords separated by commas (e.g., digital marketing, SEO tools, content creation)"
                className="w-full h-32 bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !keywords.trim()}
                className="bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-3 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isAnalyzing ? 'ANALYZING...' : 'ANALYZE KEYWORDS'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              ANALYSIS RESULTS
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-primary/30">
                    <th className="text-left py-3 px-4 text-blue-accent font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>KEYWORD</th>
                    <th className="text-center py-3 px-4 text-blue-accent font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>VOLUME</th>
                    <th className="text-center py-3 px-4 text-blue-accent font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>DIFFICULTY</th>
                    <th className="text-center py-3 px-4 text-blue-accent font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>OPPORTUNITY</th>
                    <th className="text-center py-3 px-4 text-blue-accent font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>COMPETITION</th>
                    <th className="text-center py-3 px-4 text-blue-accent font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>CPC ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="border-b border-slate-700/50 hover:bg-blue-primary/10">
                      <td className="py-3 px-4 font-medium">{result.keyword}</td>
                      <td className="py-3 px-4 text-center">{result.volume.toLocaleString()}</td>
                      <td className={`py-3 px-4 text-center font-bold ${getDifficultyColor(result.difficulty)}`}>
                        {result.difficulty}%
                      </td>
                      <td className={`py-3 px-4 text-center font-bold ${getOpportunityColor(result.opportunity)}`}>
                        {result.opportunity}%
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          result.competition === 'Low' ? 'bg-green-500/20 text-green-400' :
                          result.competition === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {result.competition}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">${result.cpc.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>KEYWORD RESEARCH SUITE | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}