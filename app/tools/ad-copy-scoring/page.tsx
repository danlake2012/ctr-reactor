'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CopyAnalysis {
  overallScore: number;
  grade: string;
  metrics: {
    emotionalAppeal: { score: number; feedback: string };
    clarity: { score: number; feedback: string };
    callToAction: { score: number; feedback: string };
    uniqueness: { score: number; feedback: string };
    length: { score: number; feedback: string };
    keywords: { score: number; feedback: string };
  };
  suggestions: string[];
  wordCount: number;
  readingLevel: string;
}

export default function AdCopyScoring() {
  const [adCopy, setAdCopy] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CopyAnalysis | null>(null);

  const analyzeCopy = async () => {
    if (!adCopy.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock analysis results
    const wordCount = adCopy.trim().split(/\s+/).length;
    const mockAnalysis: CopyAnalysis = {
      overallScore: 82,
      grade: 'B+',
      metrics: {
        emotionalAppeal: {
          score: 85,
          feedback: 'Strong emotional connection with compelling language'
        },
        clarity: {
          score: 90,
          feedback: 'Clear and easy to understand messaging'
        },
        callToAction: {
          score: 75,
          feedback: 'Good CTA but could be more compelling'
        },
        uniqueness: {
          score: 80,
          feedback: 'Unique value proposition well communicated'
        },
        length: {
          score: wordCount > 20 && wordCount < 60 ? 90 : 70,
          feedback: wordCount > 20 && wordCount < 60 ? 'Optimal length for engagement' : 'Consider adjusting length for better performance'
        },
        keywords: {
          score: 85,
          feedback: 'Good keyword integration without keyword stuffing'
        }
      },
      suggestions: [
        'Add a stronger emotional hook in the first sentence',
        'Make the call-to-action more urgent and specific',
        'Include social proof or testimonials',
        'Test different headline variations',
        'Add power words like "instantly", "guaranteed", "exclusive"'
      ],
      wordCount,
      readingLevel: 'Easy to read (Grade 6-8 level)'
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGradeColor = (grade: string) => {
    const firstChar = grade.charAt(0);
    if (firstChar === 'A') return 'text-green-400';
    if (firstChar === 'B') return 'text-yellow-400';
    if (firstChar === 'C') return 'text-blue-400';
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
            <span className="text-6xl">📝</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              AD COPY SCORING
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            SCORE YOUR AD COPY FOR EFFECTIVENESS & ENGAGEMENT POTENTIAL
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                ENTER YOUR AD COPY
              </h2>

              <div className="space-y-4">
                <textarea
                  value={adCopy}
                  onChange={(e) => setAdCopy(e.target.value)}
                  placeholder="Paste your ad copy here to analyze its effectiveness..."
                  className="w-full h-48 bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)] resize-none"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                />

                <div className="flex justify-between text-sm text-slate-400">
                  <span>Words: {adCopy.trim() ? adCopy.trim().split(/\s+/).length : 0}</span>
                  <span>Characters: {adCopy.length}</span>
                </div>

                <button
                  onClick={analyzeCopy}
                  disabled={isAnalyzing || !adCopy.trim()}
                  className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {isAnalyzing ? 'ANALYZING...' : 'ANALYZE COPY'}
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
              <h3 className="text-lg font-bold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                WRITING TIPS
              </h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Start with a compelling hook</li>
                <li>• Include clear benefits, not just features</li>
                <li>• Use emotional language</li>
                <li>• End with a strong call-to-action</li>
                <li>• Keep it concise but impactful</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              ANALYSIS RESULTS
            </h2>

            {analysis ? (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center p-6 bg-slate-800/50 rounded-lg">
                  <div className={`text-6xl font-bold mb-2 ${getGradeColor(analysis.grade)}`}>
                    {analysis.grade}
                  </div>
                  <div className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                    {analysis.overallScore}/100
                  </div>
                  <p className="text-slate-300 mt-2">
                    {analysis.overallScore >= 80 ? 'Excellent copy!' :
                     analysis.overallScore >= 60 ? 'Good with room for improvement' :
                     'Needs significant improvements'}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-accent">{analysis.wordCount}</div>
                    <div className="text-sm text-slate-400">Word Count</div>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-blue-accent">{analysis.readingLevel}</div>
                    <div className="text-sm text-slate-400">Reading Level</div>
                  </div>
                </div>

                {/* Detailed Metrics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    PERFORMANCE METRICS
                  </h3>
                  {Object.entries(analysis.metrics).map(([key, metric]) => (
                    <div key={key} className="bg-slate-800/30 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-blue-accent capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className={`font-bold ${getScoreColor(metric.score)}`}>
                          {metric.score}/100
                        </span>
                      </div>
                      <p className="text-sm text-slate-300">{metric.feedback}</p>
                    </div>
                  ))}
                </div>

                {/* Suggestions */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    IMPROVEMENT SUGGESTIONS
                  </h3>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-accent mt-1">•</span>
                        <span className="text-sm text-slate-300">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                {isAnalyzing ? (
                  <div>
                    <div className="text-6xl mb-4">🔍</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      ANALYZING COPY...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is evaluating your ad copy effectiveness
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-slate-400">
                      Enter your ad copy above to get detailed analysis and scoring
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>AD COPY SCORING | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}