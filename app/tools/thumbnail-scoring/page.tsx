'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ScoreBreakdown {
  category: string;
  score: number;
  maxScore: number;
  feedback: string;
  suggestions: string[];
}

interface ThumbnailAnalysis {
  overallScore: number;
  grade: string;
  breakdown: ScoreBreakdown[];
  recommendations: string[];
}

export default function ThumbnailScoring() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ThumbnailAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysis(null); // Reset analysis when new image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeThumbnail = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock analysis results
    const mockAnalysis: ThumbnailAnalysis = {
      overallScore: 78,
      grade: 'B+',
      breakdown: [
        {
          category: 'Visual Appeal',
          score: 85,
          maxScore: 100,
          feedback: 'Strong visual elements that grab attention',
          suggestions: ['Consider adding more contrast', 'Try brighter colors']
        },
        {
          category: 'Text Readability',
          score: 90,
          maxScore: 100,
          feedback: 'Text is clear and easy to read',
          suggestions: ['Font size could be slightly larger']
        },
        {
          category: 'Composition',
          score: 75,
          maxScore: 100,
          feedback: 'Good use of space but could be improved',
          suggestions: ['Move text to follow the rule of thirds', 'Add more visual hierarchy']
        },
        {
          category: 'Color Psychology',
          score: 70,
          maxScore: 100,
          feedback: 'Colors are engaging but could be more optimized',
          suggestions: ['Use more red/orange for higher engagement', 'Ensure good contrast ratios']
        },
        {
          category: 'Click-Worthiness',
          score: 65,
          maxScore: 100,
          feedback: 'Has potential but lacks some click triggers',
          suggestions: ['Add curiosity elements', 'Include social proof indicators', 'Use action-oriented text']
        }
      ],
      recommendations: [
        'Increase text contrast for better readability',
        'Add a human face or emotional element',
        'Use brighter, more saturated colors',
        'Include numbers or statistics to boost curiosity',
        'Test this thumbnail against 2-3 variations'
      ]
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
            <span className="text-6xl">📊</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              THUMBNAIL SCORING
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            ANALYZE THUMBNAIL EFFECTIVENESS & CLICK PREDICTION
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                UPLOAD THUMBNAIL
              </h2>

              <div className="space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-blue-primary/50 rounded-lg p-8 text-center cursor-pointer hover:border-blue-accent transition-colors"
                >
                  {selectedImage ? (
                    <div className="space-y-4">
                      <Image
                        src={selectedImage}
                        alt="Uploaded thumbnail"
                        width={320}
                        height={180}
                        className="mx-auto rounded-lg shadow-lg"
                      />
                      <p className="text-slate-300">Click to upload a different image</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-6xl mb-4">📁</div>
                      <p className="text-slate-300 mb-2">Click to upload your thumbnail image</p>
                      <p className="text-sm text-slate-400">PNG, JPG, or WebP (max 5MB)</p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <button
                  onClick={analyzeThumbnail}
                  disabled={isAnalyzing || !selectedImage}
                  className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {isAnalyzing ? 'ANALYZING...' : 'ANALYZE THUMBNAIL'}
                </button>
              </div>
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
                    {analysis.overallScore >= 80 ? 'Excellent thumbnail!' :
                     analysis.overallScore >= 60 ? 'Good potential with improvements' :
                     'Needs significant improvements'}
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    SCORE BREAKDOWN
                  </h3>
                  {analysis.breakdown.map((item, index) => (
                    <div key={index} className="bg-slate-800/30 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-blue-accent">{item.category}</span>
                        <span className={`font-bold ${getScoreColor(item.score)}`}>
                          {item.score}/{item.maxScore}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">{item.feedback}</p>
                      <div className="space-y-1">
                        {item.suggestions.map((suggestion, i) => (
                          <p key={i} className="text-xs text-yellow-400">• {suggestion}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    IMPROVEMENT RECOMMENDATIONS
                  </h3>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-accent mt-1">•</span>
                        <span className="text-sm text-slate-300">{rec}</span>
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
                      ANALYZING THUMBNAIL...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is evaluating your thumbnail&apos;s effectiveness
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-slate-400">
                      Upload a thumbnail image to get detailed analysis and scoring
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>THUMBNAIL SCORING | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}