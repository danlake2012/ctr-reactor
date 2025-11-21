'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CTRPrediction {
  predictedCTR: number;
  confidence: number;
  grade: string;
  factors: {
    headline: { score: number; impact: string };
    description: { score: number; impact: string };
    visual: { score: number; impact: string };
    targeting: { score: number; impact: string };
    timing: { score: number; impact: string };
  };
  recommendations: string[];
  benchmarks: {
    industry: number;
    excellent: number;
    good: number;
    average: number;
  };
}

export default function ClickThroughPredictor() {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [targetAudience, setTargetAudience] = useState('general');
  const [platform, setPlatform] = useState('facebook');
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<CTRPrediction | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const predictCTR = async () => {
    if (!headline.trim() || !description.trim()) return;

    setIsPredicting(true);

    // Simulate AI prediction delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock prediction results
    const baseCTR = platform === 'facebook' ? 1.2 : platform === 'google' ? 2.1 : 0.8;
    const headlineBonus = headline.length > 10 && headline.length < 40 ? 0.3 : -0.2;
    const descriptionBonus = description.length > 20 && description.length < 90 ? 0.4 : -0.1;
    const imageBonus = selectedImage ? 0.5 : -0.3;
    const audienceBonus = targetAudience === 'niche' ? 0.2 : 0;

    const predictedCTR = Math.max(0.1, baseCTR + headlineBonus + descriptionBonus + imageBonus + audienceBonus);

    const mockPrediction: CTRPrediction = {
      predictedCTR: Math.round(predictedCTR * 100) / 100,
      confidence: 85,
      grade: predictedCTR > 2 ? 'A' : predictedCTR > 1.5 ? 'B' : predictedCTR > 1 ? 'C' : 'D',
      factors: {
        headline: {
          score: headline.length > 10 && headline.length < 40 ? 85 : 65,
          impact: headline.length > 10 && headline.length < 40 ? 'Strong headline length' : 'Headline length could be optimized'
        },
        description: {
          score: description.length > 20 && description.length < 90 ? 90 : 70,
          impact: description.length > 20 && description.length < 90 ? 'Good description length' : 'Description length needs adjustment'
        },
        visual: {
          score: selectedImage ? 88 : 45,
          impact: selectedImage ? 'Visual element present' : 'Missing visual element'
        },
        targeting: {
          score: targetAudience === 'niche' ? 92 : 75,
          impact: targetAudience === 'niche' ? 'Well-targeted audience' : 'Broad targeting may reduce effectiveness'
        },
        timing: {
          score: 78,
          impact: 'Good timing alignment with audience behavior'
        }
      },
      recommendations: [
        'Test 3-5 different headline variations',
        'Include a clear call-to-action in the description',
        'Use high-quality, relevant images',
        'Consider A/B testing different targeting options',
        'Monitor performance and optimize based on data'
      ],
      benchmarks: {
        industry: platform === 'facebook' ? 1.2 : platform === 'google' ? 2.1 : 0.8,
        excellent: platform === 'facebook' ? 2.5 : platform === 'google' ? 4.0 : 1.5,
        good: platform === 'facebook' ? 1.5 : platform === 'google' ? 2.5 : 1.0,
        average: platform === 'facebook' ? 1.0 : platform === 'google' ? 1.5 : 0.5
      }
    };

    setPrediction(mockPrediction);
    setIsPredicting(false);
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A') return 'text-green-400';
    if (grade === 'B') return 'text-yellow-400';
    if (grade === 'C') return 'text-blue-400';
    return 'text-red-400';
  };

  const getCTRColor = (ctr: number, benchmarks: CTRPrediction['benchmarks']) => {
    if (ctr >= benchmarks.excellent) return 'text-green-400';
    if (ctr >= benchmarks.good) return 'text-yellow-400';
    if (ctr >= benchmarks.average) return 'text-blue-400';
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
            <span className="text-6xl">🎯</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              CLICK-THROUGH PREDICTOR
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            PREDICT CTR FOR YOUR AD CREATIVES USING AI ALGORITHMS
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Ad Details */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                AD DETAILS
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    HEADLINE *
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Enter your ad headline"
                    maxLength={60}
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  />
                  <p className="text-xs text-slate-400 mt-1">{headline.length}/60 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    DESCRIPTION *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your ad description"
                    maxLength={150}
                    className="w-full h-24 bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)] resize-none"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  />
                  <p className="text-xs text-slate-400 mt-1">{description.length}/150 characters</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-blue-accent mb-2">
                      PLATFORM
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      <option value="facebook">Facebook</option>
                      <option value="google">Google Ads</option>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-blue-accent mb-2">
                      TARGET AUDIENCE
                    </label>
                    <select
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      <option value="general">General</option>
                      <option value="niche">Niche</option>
                      <option value="b2b">B2B</option>
                      <option value="b2c">B2C</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                AD VISUAL (OPTIONAL)
              </h2>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-blue-primary/50 rounded-lg p-8 text-center cursor-pointer hover:border-blue-accent transition-colors"
              >
                {selectedImage ? (
                  <div className="space-y-4">
                    <Image
                      src={selectedImage}
                      alt="Ad visual"
                      width={200}
                      height={150}
                      className="mx-auto rounded-lg shadow-lg object-cover"
                    />
                    <p className="text-slate-300">Click to change image</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-4">📷</div>
                    <p className="text-slate-300 mb-2">Upload ad image for better prediction</p>
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
            </div>

            {/* Predict Button */}
            <div className="text-center">
              <button
                onClick={predictCTR}
                disabled={isPredicting || !headline.trim() || !description.trim()}
                className="bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed text-lg"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isPredicting ? 'PREDICTING...' : 'PREDICT CTR'}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              PREDICTION RESULTS
            </h2>

            {prediction ? (
              <div className="space-y-6">
                {/* Main Prediction */}
                <div className="text-center p-6 bg-slate-800/50 rounded-lg">
                  <div className="text-sm text-slate-400 mb-2">PREDICTED CTR</div>
                  <div className={`text-5xl font-bold mb-2 ${getCTRColor(prediction.predictedCTR, prediction.benchmarks)}`}>
                    {prediction.predictedCTR}%
                  </div>
                  <div className={`text-2xl font-bold ${getGradeColor(prediction.grade)}`}>
                    Grade {prediction.grade}
                  </div>
                  <div className="text-sm text-slate-400 mt-2">
                    Confidence: {prediction.confidence}%
                  </div>
                </div>

                {/* Benchmarks */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    INDUSTRY BENCHMARKS
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Industry Average:</span>
                      <span className="text-slate-100">{prediction.benchmarks.industry}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Excellent:</span>
                      <span className="text-green-400">{prediction.benchmarks.excellent}%+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Good:</span>
                      <span className="text-yellow-400">{prediction.benchmarks.good}%+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Average:</span>
                      <span className="text-blue-400">{prediction.benchmarks.average}%+</span>
                    </div>
                  </div>
                </div>

                {/* Factors Analysis */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    FACTOR ANALYSIS
                  </h3>
                  {Object.entries(prediction.factors).map(([key, factor]) => (
                    <div key={key} className="bg-slate-800/30 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-blue-accent capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className={`font-bold ${factor.score >= 80 ? 'text-green-400' : factor.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {factor.score}/100
                        </span>
                      </div>
                      <p className="text-sm text-slate-300">{factor.impact}</p>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    OPTIMIZATION RECOMMENDATIONS
                  </h3>
                  <ul className="space-y-2">
                    {prediction.recommendations.map((rec, index) => (
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
                {isPredicting ? (
                  <div>
                    <div className="text-6xl mb-4">🔮</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      PREDICTING CTR...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is analyzing your ad creative for CTR prediction
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-slate-400">
                      Fill in your ad details above to get CTR predictions
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>CLICK-THROUGH PREDICTOR | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}