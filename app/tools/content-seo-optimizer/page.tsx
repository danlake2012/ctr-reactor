'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ContentAnalysis {
  overallScore: number;
  grade: string;
  readability: {
    score: number;
    level: string;
    fleschScore: number;
    suggestions: string[];
  };
  keywordOptimization: {
    score: number;
    primaryKeyword: string;
    density: number;
    placement: string;
    suggestions: string[];
  };
  contentStructure: {
    score: number;
    wordCount: number;
    headingStructure: string;
    internalLinks: number;
    suggestions: string[];
  };
  seoElements: {
    score: number;
    titleTag: boolean;
    metaDescription: boolean;
    imageAltTags: boolean;
    suggestions: string[];
  };
  recommendations: string[];
}

export default function ContentSEOOptimizer() {
  const [content, setContent] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ContentAnalysis | null>(null);

  const analyzeContent = async () => {
    if (!content.trim() || !targetKeyword.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock content analysis
    const wordCount = content.split(/\s+/).length;
    const keywordCount = (content.toLowerCase().match(new RegExp(targetKeyword.toLowerCase(), 'g')) || []).length;
    const density = (keywordCount / wordCount) * 100;

    const mockResults: ContentAnalysis = {
      overallScore: 72,
      grade: 'B-',
      readability: {
        score: 68,
        level: 'Good',
        fleschScore: 65,
        suggestions: [
          'Consider shortening some sentences for better readability',
          'Use more transition words to improve flow',
          'Break up long paragraphs with subheadings'
        ]
      },
      keywordOptimization: {
        score: density > 2.5 ? 45 : density > 1.5 ? 75 : 60,
        primaryKeyword: targetKeyword,
        density: Math.round(density * 100) / 100,
        placement: keywordCount > 0 ? 'Present in content' : 'Missing from content',
        suggestions: [
          density > 2.5 ? 'Reduce keyword density to avoid over-optimization' : 'Increase keyword usage naturally',
          'Place primary keyword in the first paragraph',
          'Include keyword variations throughout the content',
          'Use keyword in H1 and H2 headings'
        ]
      },
      contentStructure: {
        score: wordCount > 1500 ? 85 : wordCount > 800 ? 70 : 45,
        wordCount,
        headingStructure: 'Good H1, needs more H2/H3 tags',
        internalLinks: 2,
        suggestions: [
          wordCount < 800 ? 'Expand content to reach minimum 800 words' : 'Content length is adequate',
          'Add more H2 and H3 headings for better structure',
          'Include more internal links to related content',
          'Add a table of contents for longer articles'
        ]
      },
      seoElements: {
        score: contentTitle ? 80 : 60,
        titleTag: !!contentTitle,
        metaDescription: false,
        imageAltTags: false,
        suggestions: [
          'Ensure title tag is under 60 characters',
          'Write compelling meta description with primary keyword',
          'Add alt tags to all images',
          'Include primary keyword in URL slug'
        ]
      },
      recommendations: [
        'Focus on natural keyword integration rather than forced placement',
        'Improve content structure with proper heading hierarchy',
        'Enhance readability by varying sentence length',
        'Add more comprehensive content to increase word count',
        'Include relevant internal and external links'
      ]
    };

    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-400';
    if (grade.startsWith('B')) return 'text-yellow-400';
    if (grade.startsWith('C')) return 'text-blue-400';
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
            <span className="text-6xl">✍️</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              CONTENT SEO OPTIMIZER
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            OPTIMIZE YOUR CONTENT FOR SEARCH ENGINES
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Content Details */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                CONTENT DETAILS
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    CONTENT TITLE *
                  </label>
                  <input
                    type="text"
                    value={contentTitle}
                    onChange={(e) => setContentTitle(e.target.value)}
                    placeholder="Enter your content title"
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    TARGET KEYWORD *
                  </label>
                  <input
                    type="text"
                    value={targetKeyword}
                    onChange={(e) => setTargetKeyword(e.target.value)}
                    placeholder="Enter primary target keyword"
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  />
                </div>
              </div>
            </div>

            {/* Content Input */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                CONTENT TEXT
              </h2>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your content here for SEO analysis..."
                rows={15}
                className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)] resize-vertical"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              />

              <div className="flex justify-between items-center mt-4 text-sm text-slate-400">
                <span>Word count: {content.split(/\s+/).filter(word => word.length > 0).length}</span>
                <span>Characters: {content.length}</span>
              </div>

              <button
                onClick={analyzeContent}
                disabled={isAnalyzing || !content.trim() || !targetKeyword.trim()}
                className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed mt-6"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isAnalyzing ? 'ANALYZING CONTENT...' : 'ANALYZE CONTENT'}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              ANALYSIS RESULTS
            </h2>

            {results ? (
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                {/* Overall Score */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      OVERALL SEO SCORE
                    </h3>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getGradeColor(results.grade)}`}>
                        {results.grade}
                      </div>
                      <div className={`text-sm ${getScoreColor(results.overallScore)}`}>
                        {results.overallScore}/100
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="space-y-4">
                  {/* Readability */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">READABILITY</h4>
                      <span className={`font-bold ${getScoreColor(results.readability.score)}`}>
                        {results.readability.score}/100
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">
                      Level: {results.readability.level} | Flesch Score: {results.readability.fleschScore}
                    </div>
                    <div className="space-y-1">
                      {results.readability.suggestions.map((suggestion, i) => (
                        <div key={i} className="text-xs text-slate-400">• {suggestion}</div>
                      ))}
                    </div>
                  </div>

                  {/* Keyword Optimization */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">KEYWORD OPTIMIZATION</h4>
                      <span className={`font-bold ${getScoreColor(results.keywordOptimization.score)}`}>
                        {results.keywordOptimization.score}/100
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">
                      Primary: &quot;{results.keywordOptimization.primaryKeyword}&quot; | Density: {results.keywordOptimization.density}%
                    </div>
                    <div className="space-y-1">
                      {results.keywordOptimization.suggestions.map((suggestion, i) => (
                        <div key={i} className="text-xs text-slate-400">• {suggestion}</div>
                      ))}
                    </div>
                  </div>

                  {/* Content Structure */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">CONTENT STRUCTURE</h4>
                      <span className={`font-bold ${getScoreColor(results.contentStructure.score)}`}>
                        {results.contentStructure.score}/100
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">
                      Words: {results.contentStructure.wordCount} | Internal Links: {results.contentStructure.internalLinks}
                    </div>
                    <div className="space-y-1">
                      {results.contentStructure.suggestions.map((suggestion, i) => (
                        <div key={i} className="text-xs text-slate-400">• {suggestion}</div>
                      ))}
                    </div>
                  </div>

                  {/* SEO Elements */}
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-accent">SEO ELEMENTS</h4>
                      <span className={`font-bold ${getScoreColor(results.seoElements.score)}`}>
                        {results.seoElements.score}/100
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">
                      Title: {results.seoElements.titleTag ? '✓' : '✗'} |
                      Meta: {results.seoElements.metaDescription ? '✓' : '✗'} |
                      Images: {results.seoElements.imageAltTags ? '✓' : '✗'}
                    </div>
                    <div className="space-y-1">
                      {results.seoElements.suggestions.map((suggestion, i) => (
                        <div key={i} className="text-xs text-slate-400">• {suggestion}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    OPTIMIZATION RECOMMENDATIONS
                  </h3>
                  <div className="space-y-2">
                    {results.recommendations.map((rec, i) => (
                      <div key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-blue-accent mt-1">→</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                {isAnalyzing ? (
                  <div>
                    <div className="text-6xl mb-4">📝</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      ANALYZING CONTENT...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is evaluating readability, keyword usage, and SEO optimization
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">✍️</div>
                    <p className="text-slate-400">
                      Enter your content and target keyword to get comprehensive SEO optimization analysis
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>CONTENT SEO OPTIMIZER | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}