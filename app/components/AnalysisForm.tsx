'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { AnalysisResults } from '../../types';

interface AnalysisFormProps {
  onAnalysisComplete: (results: AnalysisResults) => void;
}

export default function AnalysisForm({ onAnalysisComplete }: AnalysisFormProps) {
  // Initialize with stored image if available
  const getInitialImage = () => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('uploadedImage');
      if (stored) {
        sessionStorage.removeItem('uploadedImage');
        return stored;
      }
    }
    return null;
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(getInitialImage);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chargeLevel, setChargeLevel] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setChargeLevel(0);

    // Start playing charging sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }

    // Simulate charging animation (5 seconds total)
    const chargeInterval = setInterval(() => {
      setChargeLevel(prev => {
        const next = prev + Math.random() * 3 + 1; // Random increment between 1-4
        if (next >= 100) {
          clearInterval(chargeInterval);
          setTimeout(() => {
            setIsAnalyzing(false);
            // Mock analysis results
            onAnalysisComplete({
              grade: { score: 87, letter: 'B+' },
              metrics: {
                ctr: 3.2,
                cvr: 2.1,
                cpc: 0.85,
                cpa: 40.25
              },
              recommendations: [
                'Improve headline clarity',
                'Add stronger call-to-action',
                'Consider A/B testing images'
              ],
              adData: {
                headline: 'Sample Ad Headline',
                description: 'Sample ad description for analysis',
                impressions: 10000,
                clicks: 320,
                conversions: 67,
                cost: 272
              }
            });
          }, 500);
          return 100;
        }
        return next;
      });
    }, 100);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Upload Section */}
      <div className="bg-blue-primary/5 border-2 border-blue-primary rounded-xl p-8 mb-8 shadow-[0_0_30px_var(--blue-glow)]">
        <h2 className="text-2xl font-bold text-blue-primary text-center mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          UPLOAD AD CREATIVE
        </h2>

        <div className="flex flex-col items-center gap-6">
          {!selectedImage ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="analyzer-upload"
              />
              <label
                htmlFor="analyzer-upload"
                className="cursor-pointer flex flex-col items-center justify-center w-full max-w-md h-64 border-2 border-dashed border-blue-primary/50 rounded-lg hover:border-blue-accent transition-colors bg-blue-primary/5 hover:bg-blue-primary/10"
              >
                <div className="text-6xl mb-4">📸</div>
                <h3 className="text-xl font-bold text-blue-accent tracking-wider uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Select Image
                </h3>
                <p className="text-blue-accent/70 text-sm mt-2">PNG, JPG, or GIF files supported</p>
              </label>
            </>
          ) : (
            <div className="w-full max-w-md flex flex-col items-center">
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={selectedImage}
                  alt="Uploaded ad"
                  className="w-full h-full object-contain rounded-lg border border-blue-primary/30"
                  width={400}
                  height={256}
                  unoptimized={true}
                />
                <button
                  onClick={handleClearImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg"
                >
                  ✕
                </button>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-accent-color hover:bg-accent-color/80 text-black font-bold py-4 px-8 rounded-lg text-lg tracking-wider uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-accent-color shadow-[0_0_20px_var(--accent-glow)]"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isAnalyzing ? 'ANALYZING...' : 'START ANALYSIS'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reactor Charging Section */}
      {isAnalyzing && (
        <div className="bg-black/80 border-2 border-blue-primary rounded-xl p-8 shadow-[0_0_40px_var(--blue-glow)]">
          <h3 className="text-2xl font-bold text-blue-primary text-center mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            REACTOR CHARGING
          </h3>

          <div className="flex flex-col items-center gap-8">
            {/* Reactor Display */}
            <div className="relative">
              {/* Outer reactor body */}
              <div className="w-48 h-48 bg-linear-to-br from-blue-panel-dark to-blue-panel border-4 border-blue-primary rounded-full shadow-[0_0_60px_var(--blue-glow)] flex items-center justify-center">
                {/* Inner reactor core */}
                <div className="w-32 h-32 bg-linear-to-br from-blue-primary to-blue-accent border-2 border-blue-bright rounded-full flex items-center justify-center shadow-[0_0_40px_var(--blue-glow)]">
                  {/* Digital readout */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {chargeLevel.toFixed(0).padStart(2, '0')}
                    </div>
                    <div className="text-sm text-black/80 font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      POWER
                    </div>
                  </div>
                </div>
              </div>

              {/* Charging rings */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-accent animate-ping opacity-75"></div>
              <div className="absolute inset-2 rounded-full border border-blue-primary animate-pulse"></div>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-md">
              <div className="flex justify-between text-blue-accent text-sm mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <span>CHARGING</span>
                <span>{chargeLevel.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-blue-panel/50 rounded-full h-4 border border-blue-primary/50">
                <div
                  className="bg-linear-to-r from-blue-primary to-blue-accent h-full rounded-full transition-all duration-300 shadow-[0_0_20px_var(--blue-glow)]"
                  style={{ width: `${chargeLevel}%` }}
                ></div>
              </div>
            </div>

            {/* Status messages */}
            <div className="text-center">
              <p className="text-blue-accent text-lg font-bold animate-pulse" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {chargeLevel < 25 ? 'INITIALIZING SYSTEMS...' :
                 chargeLevel < 50 ? 'CALIBRATING SENSORS...' :
                 chargeLevel < 75 ? 'ANALYZING PATTERNS...' :
                 'FINALIZING RESULTS...'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef} src="/reactor-charging.mp3" preload="auto" />
    </div>
  );
}