'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useAnalysisStore } from '../lib/store';
import DomainSearchModal from './components/DomainSearchModal';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chargeLevel, setChargeLevel] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { setResults } = useAnalysisStore();

  // Testimonial popup state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showTestimonial, setShowTestimonial] = useState(true);
  const testimonialIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Domain search modal state
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);

  // All testimonials data
  const testimonials = [
    {
      country: '🇺🇸',
      countryName: 'UNITED STATES',
      text: 'CTR Reactor helped me increase my ad performance by 340%. The thumbnail analysis was a game-changer!',
      author: 'Sarah Johnson, Digital Marketer'
    },
    {
      country: '🇺🇸',
      countryName: 'UNITED STATES',
      text: 'The ad grading system is incredibly accurate. My CPC dropped by 60% after implementing the recommendations.',
      author: 'Michael Chen, E-commerce Owner'
    },
    {
      country: '🇺🇸',
      countryName: 'UNITED STATES',
      text: 'Best investment I\'ve made for my marketing budget. ROI increased by 250% in just 2 months.',
      author: 'Emily Rodriguez, Startup Founder'
    },
    {
      country: '🇬🇧',
      countryName: 'UNITED KINGDOM',
      text: 'Absolutely brilliant tool! My YouTube channel grew 500% after optimizing thumbnails with CTR Reactor.',
      author: 'James Thompson, Content Creator'
    },
    {
      country: '🇬🇧',
      countryName: 'UNITED KINGDOM',
      text: 'The AI analysis is spot on. Saved me thousands in wasted ad spend and increased conversions dramatically.',
      author: 'Oliver Williams, Marketing Director'
    },
    {
      country: '🇬🇧',
      countryName: 'UNITED KINGDOM',
      text: 'Game-changing platform. The detailed insights helped me understand exactly what works for my audience.',
      author: 'Charlotte Brown, Business Owner'
    },
    {
      country: '🇩🇪',
      countryName: 'GERMANY',
      text: 'Ausgezeichnet! CTR Reactor hat meine Werbekampagnen um 280% verbessert. Die Thumbnail-Analyse ist unschlagbar.',
      author: 'Klaus Müller, Marketing Manager'
    },
    {
      country: '🇩🇪',
      countryName: 'GERMANY',
      text: 'Die KI-gestützte Analyse ist präzise und zuverlässig. Meine Kosten pro Klick sind um 55% gesunken.',
      author: 'Anna Schmidt, E-Commerce Leiterin'
    },
    {
      country: '🇩🇪',
      countryName: 'GERMANY',
      text: 'Eine Revolution für digitales Marketing. Die detaillierten Einblicke haben meine Strategie komplett verändert.',
      author: 'Thomas Wagner, Unternehmer'
    },
    {
      country: '🇯🇵',
      countryName: 'JAPAN',
      text: '素晴らしいツールです！CTR Reactorを使って広告効果が350%向上しました。サムネイル分析が特に役立ちました。',
      author: 'Hiroshi Tanaka, マーケティングディレクター'
    },
    {
      country: '🇯🇵',
      countryName: 'JAPAN',
      text: 'AI分析の精度が素晴らしい。一クリックあたりのコストが60%削減できました。',
      author: 'Yuki Sato, Eコマースオーナー'
    },
    {
      country: '🇯🇵',
      countryName: 'JAPAN',
      text: 'デジタルマーケティングの革命です。詳細な洞察が私の戦略を完全に変えました。',
      author: 'Kenji Nakamura, 起業家'
    },
    {
      country: '🇦🇺',
      countryName: 'AUSTRALIA',
      text: 'Bloody brilliant! CTR Reactor boosted my ad performance by 420%. The YouTube thumbnail analyzer is a ripper!',
      author: 'Jack Wilson, Digital Marketing Guru'
    },
    {
      country: '🇦🇺',
      countryName: 'AUSTRALIA',
      text: 'Fair dinkum amazing tool. My cost per click dropped 65% and conversions went through the roof. Worth every cent!',
      author: 'Emma Thompson, Business Owner'
    },
    {
      country: '🇦🇺',
      countryName: 'AUSTRALIA',
      text: 'Changed the game for my marketing. The AI insights are spot on and helped me understand what really works down under.',
      author: 'Liam Mitchell, Startup Founder'
    },
    {
      country: '🇧🇷',
      countryName: 'BRAZIL',
      text: 'Incrível! O CTR Reactor aumentou meu desempenho de anúncios em 380%. O analisador de miniaturas é show!',
      author: 'Carlos Silva, Diretor de Marketing'
    },
    {
      country: '🇧🇷',
      countryName: 'BRAZIL',
      text: 'Ferramenta fantástica! Meus custos por clique caíram 58% e as conversões dispararam. Valeu cada real investido!',
      author: 'Ana Santos, Empreendedora Digital'
    },
    {
      country: '🇧🇷',
      countryName: 'BRAZIL',
      text: 'Mudou completamente meu marketing. Os insights de IA são precisos e me ajudaram a entender o que funciona no Brasil.',
      author: 'Roberto Oliveira, CEO Startup'
    }
  ];

  // Cycle through testimonials
  useEffect(() => {
    const cycleTestimonials = () => {
      // Display for 5 seconds, then hide
      testimonialIntervalRef.current = setTimeout(() => {
        setShowTestimonial(false);
        
        // Wait 12 seconds (gap between 10-15), then show next testimonial
        testimonialIntervalRef.current = setTimeout(() => {
          setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
          setShowTestimonial(true);
          
          // Schedule next cycle
          cycleTestimonials();
        }, 12000); // 12 second gap
      }, 5000); // 5 second display
    };

    // Start the cycle
    cycleTestimonials();

    return () => {
      if (testimonialIntervalRef.current) {
        clearTimeout(testimonialIntervalRef.current);
      }
    };
  }, [testimonials.length]);

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

  const handleAnalyze = () => {
    if (selectedImage) {
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
          if (next >= 87) { // Target score of 87
            clearInterval(chargeInterval);
            setTimeout(() => {
              setIsAnalyzing(false);
              // Store results for results page
              setResults({
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
              // Redirect to results page
              window.location.href = '/results';
            }, 500);
            return 87;
          }
          return next;
        });
      }, 100);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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

      <div className="relative z-10 min-h-screen flex flex-col pt-20">

        {/* Main Content - Tile Layout */}
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-7xl">
            {/* Large Horizontal Tile */}
            <div className="mb-6">
              <Link href="/analyzer">
                <div className="group relative h-64 md:h-80 bg-linear-to-r from-blue-panel-2/90 to-blue-panel/95 border border-blue-primary/50 rounded-3xl overflow-hidden transition-all duration-400 hover:border-blue-accent/80 hover:shadow-[0_0_65px_var(--blue-glow)] cursor-pointer backdrop-blur-md">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Holographic scan lines */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-scan" style={{
                    backgroundImage: 'linear-gradient(90deg, transparent 0%, var(--blue-glow-35) 50%, transparent 100%)',
                    backgroundSize: '200% 100%'
                  }} />
                  
                  <div className="relative h-full flex flex-col items-center justify-center text-center gap-6 p-8">
                    <div className="max-w-4xl">
                      <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 drop-shadow-[0_0_20px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        Ad Grader
                      </h1>
                      <p className="text-xl md:text-2xl text-(--text-secondary) mb-6 drop-shadow-[0_0_12px_var(--blue-glow-55)] leading-relaxed">
                        Advanced AI-powered ad performance analysis system
                      </p>
                      <p className="text-base md:text-lg text-(--text-secondary) leading-relaxed drop-shadow-[0_0_8px_var(--blue-glow-35)] max-w-3xl mx-auto">
                        Upload your ad creative and get instant insights on scroll-stopping power, clarity, and cost control. 
                        Optimize your campaigns to earn more clicks while paying less per visitor.
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-6">
                        <span className="inline-flex items-center gap-2 rounded-full border border-foreground/70 bg-blue-panel/80 px-6 py-2 text-sm font-semibold tracking-[0.3em] uppercase text-foreground drop-shadow-[0_0_10px_var(--blue-glow)]">
                          Ready to Analyze
                        </span>
                        <span className="text-(--accent-color) text-xl">⚡</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 text-blue-accent opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_14px_var(--blue-glow)]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>

            {/* Three Rectangular Tiles Below */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tile 1 - Image Uploader */}
              <div className="relative h-80 bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl overflow-hidden hover:border-blue-accent/70 transition-all duration-300 hover:shadow-[0_0_45px_var(--blue-glow-25)] backdrop-blur-md">
                <div className="relative h-full flex flex-col p-6">
                  {/* Upload/Preview Area */}
                  <div className="flex-1 flex items-center justify-center w-full mb-4">
                    {!selectedImage ? (
                      <>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer flex flex-col items-center justify-center w-full h-full min-h-[120px] max-h-[180px]"
                        >
                          <div className="text-5xl md:text-7xl mb-4">📸</div>
                          <h3 className="text-lg md:text-xl font-bold text-blue-accent tracking-[0.2em] uppercase drop-shadow-[0_0_12px_var(--blue-glow)] text-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            Upload Ad Image
                          </h3>
                        </label>
                      </>
                    ) : (
                      <div className="relative w-full h-full max-h-[180px] flex items-center justify-center">
                        <Image
                          src={selectedImage as string}
                          alt="Uploaded"
                          className="max-w-full max-h-full object-contain rounded-lg"
                          width={300}
                          height={200}
                          unoptimized={true}
                        />
                        <button
                          onClick={handleClearImage}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-[0_0_16px_var(--blue-glow)] z-10"
                          title="Clear image"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Analyze Button - Always Visible */}
                  <div className="shrink-0">
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !selectedImage}
                      className="w-full bg-(--accent-color) hover:bg-(--accent-color)/80 text-(--text-primary) font-bold py-3 px-4 rounded-lg text-sm tracking-[0.2em] uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-(--text-primary) shadow-[0_0_24px_var(--accent-glow-24)] hover:shadow-[0_0_36px_var(--accent-glow-36)]"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      {isAnalyzing ? 'ANALYZING...' : 'ANALYZE'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Tile 2 - Reactor */}
              <Link href="/tools/reactor">
                <div className="group relative h-80 bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl overflow-hidden hover:border-blue-accent/70 transition-all duration-300 hover:shadow-[0_0_45px_var(--blue-glow-25)] cursor-pointer backdrop-blur-md">
                  <div className="absolute inset-0 bg-linear-to-br from-blue-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                    {/* Bank Safe/Vault */}
                    <div className="relative w-48 h-48 mb-2 group-hover:scale-105 transition-transform duration-300">
                      {/* Outer safe body */}
                      <div className="absolute inset-0 bg-linear-to-br from-blue-panel-dark to-blue-panel border-4 border-blue-primary/60 rounded-lg shadow-[0_0_40px_var(--blue-glow-35)]">
                        {/* Inner safe door */}
                        <div className="absolute inset-3 bg-linear-to-br from-blue-panel to-blue-panel-2 border-2 border-blue-accent/40 rounded-md flex flex-col items-center justify-center gap-2">
                          {/* Eyes */}
                          <div className="flex gap-8 mb-1">
                            <div className="w-4 h-4 bg-blue-accent/90 rounded-full shadow-[0_0_8px_var(--blue-glow)]"></div>
                            <div className="w-4 h-4 bg-blue-accent/90 rounded-full shadow-[0_0_8px_var(--blue-glow)]"></div>
                          </div>
                          {/* Double digit readout */}
                          <div className="flex gap-3">
                            {/* Left digit */}
                            <div className="w-12 h-16 bg-linear-to-br from-blue-primary to-blue-accent border-2 border-blue-bright shadow-[0_0_15px_var(--blue-glow)] rounded flex items-center justify-center">
                              <span className="text-xl font-bold text-blue-panel-dark drop-shadow-[0_0_8px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                8
                              </span>
                            </div>
                            {/* Right digit */}
                            <div className="w-12 h-16 bg-linear-to-br from-blue-primary to-blue-accent border-2 border-blue-bright shadow-[0_0_15px_var(--blue-glow)] rounded flex items-center justify-center">
                              <span className="text-xl font-bold text-blue-panel-dark drop-shadow-[0_0_8px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                7
                              </span>
                            </div>
                          </div>
                          {/* Smiling mouth */}
                          <div className="relative w-16 h-6">
                            <div className="absolute inset-0 border-b-4 border-blue-accent/80 rounded-b-full shadow-[0_0_5px_var(--blue-glow)]"></div>
                          </div>
                        </div>
                        {/* Lock mechanism details */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-blue-accent/80 rounded-full"></div>
                        <div className="absolute bottom-4 left-6 w-6 h-6 bg-blue-primary/60 rounded-full"></div>
                        <div className="absolute bottom-4 right-6 w-6 h-6 bg-blue-primary/60 rounded-full"></div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2 tracking-[0.2em] uppercase drop-shadow-[0_0_12px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      REACTOR
                    </h3>
                    <p className="text-(--text-secondary) text-sm drop-shadow-[0_0_10px_var(--blue-glow-55)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      Core status & metrics
                    </p>
                  </div>
                </div>
              </Link>

              {/* Tile 3 - Settings */}
              <div className="group relative h-80 bg-black/95 border border-gray-800/60 rounded-3xl hover:border-gray-600/70 transition-all duration-300 hover:shadow-[0_0_45px_rgba(0,0,0,0.5)] cursor-not-allowed backdrop-blur-md opacity-60">
                  <div className="absolute inset-0 bg-linear-to-br from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative h-full flex flex-col items-center justify-between p-6 text-center">
                    {/* Floating 3D Cube */}
                    <div className="relative" style={{ perspective: '1000px' }}>
                      <div className="cube-container">
                        {/* Front face - CTR */}
                        <div className="cube-face front bg-linear-to-br from-blue-primary/90 to-blue-accent/90 border border-blue-bright/60 shadow-[0_0_20px_var(--blue-glow)]">
                          <div className="text-center">
                            <div className="text-2xl mb-1">📈</div>
                            <div className="text-xs font-bold text-blue-panel-dark" style={{ fontFamily: 'Orbitron, sans-serif' }}>CTR</div>
                            <div className="text-xs text-blue-panel-dark/80">Click Through Rate</div>
                            <div className="text-xs text-blue-panel-dark/70 mt-1">Target: 2-5%</div>
                            <div className="text-xs text-blue-panel-dark/70">Higher = Better Engagement</div>
                          </div>
                        </div>

                        {/* Back face - CPC */}
                        <div className="cube-face back bg-linear-to-br from-blue-primary/90 to-blue-accent/90 border border-blue-bright/60 shadow-[0_0_20px_var(--blue-glow)]">
                          <div className="text-center">
                            <div className="text-2xl mb-1">💰</div>
                            <div className="text-xs font-bold text-blue-panel-dark" style={{ fontFamily: 'Orbitron, sans-serif' }}>CPC</div>
                            <div className="text-xs text-blue-panel-dark/80">Cost Per Click</div>
                            <div className="text-xs text-blue-panel-dark/70 mt-1">Industry Avg: $0.50-$2.00</div>
                            <div className="text-xs text-blue-panel-dark/70">Lower = Better ROI</div>
                          </div>
                        </div>

                        {/* Right face - Ad Grader */}
                        <div className="cube-face right bg-linear-to-br from-blue-primary/90 to-blue-accent/90 border border-blue-bright/60 shadow-[0_0_20px_var(--blue-glow)]">
                          <div className="text-center">
                            <div className="text-2xl mb-1">🎯</div>
                            <div className="text-xs font-bold text-blue-panel-dark" style={{ fontFamily: 'Orbitron, sans-serif' }}>AD GRADER</div>
                            <div className="text-xs text-blue-panel-dark/80">Analyze & Score</div>
                            <div className="text-xs text-blue-panel-dark/70 mt-1">AI-Powered Analysis</div>
                            <div className="text-xs text-blue-panel-dark/70">Grade A-F Scale</div>
                          </div>
                        </div>

                        {/* Left face - Tips */}
                        <div className="cube-face left bg-linear-to-br from-blue-primary/90 to-blue-accent/90 border border-blue-bright/60 shadow-[0_0_20px_var(--blue-glow)]">
                          <div className="text-center">
                            <div className="text-2xl mb-1">💡</div>
                            <div className="text-xs font-bold text-blue-panel-dark" style={{ fontFamily: 'Orbitron, sans-serif' }}>TIPS</div>
                            <div className="text-xs text-blue-panel-dark/80">Optimize Ads</div>
                            <div className="text-xs text-blue-panel-dark/70 mt-1">Use Strong Headlines</div>
                            <div className="text-xs text-blue-panel-dark/70">Clear Call-to-Action</div>
                          </div>
                        </div>

                        {/* Top face - Metrics */}
                        <div className="cube-face top bg-linear-to-br from-blue-primary/90 to-blue-accent/90 border border-blue-bright/60 shadow-[0_0_20px_var(--blue-glow)]">
                          <div className="text-center">
                            <div className="text-2xl mb-1">📊</div>
                            <div className="text-xs font-bold text-blue-panel-dark" style={{ fontFamily: 'Orbitron, sans-serif' }}>METRICS</div>
                            <div className="text-xs text-blue-panel-dark/80">Track Performance</div>
                            <div className="text-xs text-blue-panel-dark/70 mt-1">Conversion Rate</div>
                            <div className="text-xs text-blue-panel-dark/70">Bounce Rate</div>
                          </div>
                        </div>

                        {/* Bottom face - Reactor */}
                        <div className="cube-face bottom bg-linear-to-br from-blue-primary/90 to-blue-accent/90 border border-blue-bright/60 shadow-[0_0_20px_var(--blue-glow)]">
                          <div className="text-center">
                            <div className="text-2xl mb-1">⚛️</div>
                            <div className="text-xs font-bold text-blue-panel-dark" style={{ fontFamily: 'Orbitron, sans-serif' }}>REACTOR</div>
                            <div className="text-xs text-blue-panel-dark/80">Core Analysis</div>
                            <div className="text-xs text-blue-panel-dark/70 mt-1">Real-time Processing</div>
                            <div className="text-xs text-blue-panel-dark/70">Automated Insights</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground tracking-[0.2em] uppercase drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      INFO CUBE
                    </h3>
                  </div>
                </div>
            </div>
          </div>
        </main>

        {/* Domain Search Section */}
        <section className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-accent mb-4 tracking-[0.2em] uppercase drop-shadow-[0_0_16px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                DOMAIN NAME SEARCH
              </h2>
              <p className="text-xl text-(--text-secondary) max-w-3xl mx-auto drop-shadow-[0_0_12px_var(--blue-glow-55)]">
                Find the perfect domain name for your business. Check availability across multiple TLDs instantly.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-8 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md max-w-md w-full animate-float hover:shadow-[0_0_40px_var(--blue-glow-50)] transition-all duration-500 hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-6">🌐</div>
                  <h3 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    CHECK DOMAIN AVAILABILITY
                  </h3>
                  <p className="text-(--text-secondary) mb-6 leading-relaxed">
                    Search for available domains across .com, .net, .org, .io, .co, and .app extensions.
                  </p>
                  <button
                    onClick={() => setIsDomainModalOpen(true)}
                    className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3 px-6 rounded-lg transition-colors tracking-[0.2em] uppercase text-sm shadow-[0_0_24px_var(--blue-glow-35)] hover:shadow-[0_0_32px_var(--blue-glow-50)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    SEARCH DOMAINS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-accent mb-4 tracking-[0.2em] uppercase drop-shadow-[0_0_16px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                ADVANCED AD GRADING SYSTEM
              </h2>
              <p className="text-xl text-(--text-secondary) max-w-3xl mx-auto drop-shadow-[0_0_12px_var(--blue-glow-55)]">
                Revolutionize your advertising strategy with AI-powered analysis that evaluates scroll-stopping power, conversion potential, and cost efficiency
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Feature 1 - Ad Grading */}
              <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-8 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md hover:border-blue-accent/70 transition-all duration-300">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    AD GRADING
                  </h3>
                  <p className="text-(--text-secondary) mb-6 leading-relaxed">
                    Get instant A-F grades for your ad creatives based on visual appeal, messaging clarity, and conversion potential. Our AI analyzes color psychology, text hierarchy, and emotional triggers.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-(--text-secondary)">Visual impact analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-(--text-secondary)">Message clarity scoring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-(--text-secondary)">Conversion probability</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 - YouTube Thumbnail Analyzer */}
              <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-8 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md hover:border-blue-accent/70 transition-all duration-300">
                <div className="text-center">
                  <div className="text-6xl mb-4">📺</div>
                  <h3 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    YOUTUBE THUMBNAIL ANALYZER
                  </h3>
                  <p className="text-(--text-secondary) mb-6 leading-relaxed">
                    Optimize your YouTube thumbnails for maximum click-through rates. Our AI evaluates thumbnail effectiveness, text readability, and algorithmic appeal to boost your video performance.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-(--text-secondary)">Thumbnail click prediction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-(--text-secondary)">Text contrast analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-(--text-secondary)">Algorithm optimization</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3 - Performance Metrics */}
              <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-8 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md hover:border-blue-accent/70 transition-all duration-300">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    PERFORMANCE METRICS
                  </h3>
                  <p className="text-(--text-secondary) mb-6 leading-relaxed">
                    Comprehensive analytics including CTR predictions, CPC optimization, conversion rate analysis, and ROI calculations to maximize your advertising budget efficiency.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-(--text-secondary)">CTR optimization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-(--text-secondary)">Cost efficiency analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-(--text-secondary)">ROI projections</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/50 rounded-3xl p-8 shadow-[0_0_30px_var(--blue-glow)] backdrop-blur-md mb-16">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  SYSTEM PERFORMANCE
                </h3>
                <p className="text-(--text-secondary)">Real-time analysis powered by advanced AI algorithms</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    99.7%
                  </div>
                  <div className="text-sm text-(--text-secondary)">Analysis Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    &lt;2s
                  </div>
                  <div className="text-sm text-(--text-secondary)">Processing Time</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    500K+
                  </div>
                  <div className="text-sm text-(--text-secondary)">Ads Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    24/7
                  </div>
                  <div className="text-sm text-(--text-secondary)">Availability</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-accent mb-4 tracking-[0.2em] uppercase drop-shadow-[0_0_16px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                WHY CHOOSE CTR REACTOR
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center p-8 min-h-40 flex flex-col justify-center">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>AI-POWERED</h3>
                <p className="text-(--text-secondary) text-sm">Advanced machine learning algorithms</p>
              </div>

              <div className="text-center p-8 min-h-40 flex flex-col justify-center">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>INSTANT RESULTS</h3>
                <p className="text-(--text-secondary) text-sm">Analysis in under 2 seconds</p>
              </div>

              <div className="text-center p-8 min-h-40 flex flex-col justify-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>HIGH ACCURACY</h3>
                <p className="text-(--text-secondary) text-sm">99.7% analysis accuracy</p>
              </div>

              <div className="text-center p-8 min-h-40 flex flex-col justify-center">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>GLOBAL SUPPORT</h3>
                <p className="text-(--text-secondary) text-sm">24/7 availability worldwide</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 px-8 bg-black/20 relative min-h-[400px]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-accent mb-4 tracking-[0.2em] uppercase drop-shadow-[0_0_16px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                GLOBAL SUCCESS STORIES
              </h2>
              <p className="text-xl text-(--text-secondary) max-w-3xl mx-auto drop-shadow-[0_0_12px_var(--blue-glow-55)]">
                Join thousands of marketers worldwide who have transformed their advertising performance
              </p>
            </div>

            {/* Popup Testimonial - Lower Left Corner */}
            <div className="fixed bottom-8 left-8 z-50">
              <div className={`bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-4 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md w-[200px] h-[300px] transition-all duration-1000 ${
                showTestimonial ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
              }`}>
                <div className="text-center h-full flex flex-col justify-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-xl">{testimonials[currentTestimonial].country}</span>
                    <div>
                      <h4 className="font-bold text-blue-accent text-xs" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {testimonials[currentTestimonial].countryName}
                      </h4>
                      <p className="text-xs text-(--text-secondary)">Success Story</p>
                    </div>
                  </div>

                  <div className="mb-3 flex-1 flex flex-col justify-center">
                    <p className="text-xs text-(--text-secondary) italic leading-relaxed mb-2">
                      &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                    </p>
                    <p className="text-blue-accent font-semibold text-xs">
                      - {testimonials[currentTestimonial].author}
                    </p>
                  </div>

                  {/* Progress indicator */}
                  <div className="flex justify-center gap-1">
                    {testimonials.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1 h-1 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? 'bg-blue-accent shadow-[0_0_4px_var(--blue-glow)]'
                            : 'bg-blue-primary/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Global Stats */}
            <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/50 rounded-3xl p-8 shadow-[0_0_30px_var(--blue-glow)] backdrop-blur-md">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  GLOBAL IMPACT
                </h3>
                <p className="text-(--text-secondary)">Trusted by marketers across 50+ countries</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    500+
                  </div>
                  <div className="text-sm text-(--text-secondary)">Success Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    $2.5M+
                  </div>
                  <div className="text-sm text-(--text-secondary)">Ad Spend Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    340%
                  </div>
                  <div className="text-sm text-(--text-secondary)">Avg. CTR Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    24/7
                  </div>
                  <div className="text-sm text-(--text-secondary)">Global Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-8 bg-black/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-accent mb-4 tracking-[0.2em] uppercase drop-shadow-[0_0_16px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                HOW IT WORKS
              </h2>
              <p className="text-xl text-(--text-secondary)">Simple 3-step process to optimize your ads</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1: Upload */}
              <div className="text-center">
                <div className="text-6xl mb-4">📤</div>
                <h3 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>UPLOAD</h3>
                <p className="text-(--text-secondary)">Upload your ad creative or YouTube thumbnail</p>
              </div>

              {/* Step 2: Analyze */}
              <div className="text-center">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>ANALYZE</h3>
                <p className="text-(--text-secondary)">AI analyzes performance metrics and optimization opportunities</p>
              </div>

              {/* Step 3: Optimize */}
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>OPTIMIZE</h3>
                <p className="text-(--text-secondary)">Get actionable recommendations to boost your CTR</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-accent mb-4 tracking-[0.2em] uppercase drop-shadow-[0_0_16px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                KNOWLEDGE BASE
              </h2>
              <p className="text-xl text-(--text-secondary) max-w-3xl mx-auto drop-shadow-[0_0_12px_var(--blue-glow-55)]">
                Stay ahead of the curve with expert insights on advertising optimization and digital marketing trends
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog Post 1 */}
              <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl overflow-hidden shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md hover:border-blue-accent/70 transition-all duration-300">
                <div className="h-48 bg-linear-to-br from-blue-primary/20 to-blue-accent/20 flex items-center justify-center">
                  <span className="text-6xl">🎯</span>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>AD OPTIMIZATION</div>
                  <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    The Science of High-Converting Ad Creatives
                  </h3>
                  <p className="text-(--text-secondary) text-sm mb-4 leading-relaxed">
                    Discover the psychological triggers and visual elements that make ads irresistible. Learn how color psychology, typography, and emotional storytelling impact conversion rates.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-(--text-secondary)">5 min read</span>
                    <span className="text-blue-accent hover:text-blue-primary transition-colors cursor-pointer text-sm font-semibold">Read More →</span>
                  </div>
                </div>
              </div>

              {/* Blog Post 2 */}
              <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl overflow-hidden shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md hover:border-blue-accent/70 transition-all duration-300">
                <div className="h-48 bg-linear-to-br from-blue-primary/20 to-blue-accent/20 flex items-center justify-center">
                  <span className="text-6xl">📺</span>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>YOUTUBE MARKETING</div>
                  <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    YouTube Thumbnail Mastery: 10X Your Click-Through Rates
                  </h3>
                  <p className="text-(--text-secondary) text-sm mb-4 leading-relaxed">
                    Master the art of thumbnail design with data-driven insights. Learn about optimal text placement, color combinations, and emotional triggers that boost video engagement.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-(--text-secondary)">7 min read</span>
                    <span className="text-blue-accent hover:text-blue-primary transition-colors cursor-pointer text-sm font-semibold">Read More →</span>
                  </div>
                </div>
              </div>

              {/* Blog Post 3 */}
              <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl overflow-hidden shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md hover:border-blue-accent/70 transition-all duration-300">
                <div className="h-48 bg-linear-to-br from-blue-primary/20 to-blue-accent/20 flex items-center justify-center">
                  <span className="text-6xl">📊</span>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>DATA INSIGHTS</div>
                  <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    Understanding CTR: Beyond the Numbers
                  </h3>
                  <p className="text-(--text-secondary) text-sm mb-4 leading-relaxed">
                    Dive deep into click-through rate analysis. Learn what high CTR really means for your business and how to optimize campaigns for sustainable growth and profitability.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-(--text-secondary)">6 min read</span>
                    <span className="text-blue-accent hover:text-blue-primary transition-colors cursor-pointer text-sm font-semibold">Read More →</span>
                  </div>
                </div>
              </div>

              {/* Blog Post 4 */}
              <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl overflow-hidden shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md hover:border-blue-accent/70 transition-all duration-300">
                <div className="h-48 bg-linear-to-br from-blue-primary/20 to-blue-accent/20 flex items-center justify-center">
                  <span className="text-6xl">🚀</span>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>AI & AUTOMATION</div>
                  <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    The Future of Ad Creative Optimization
                  </h3>
                  <p className="text-(--text-secondary) text-sm mb-4 leading-relaxed">
                    Explore how AI is revolutionizing advertising. From predictive analytics to automated A/B testing, discover the cutting-edge technologies shaping the future of digital marketing.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-(--text-secondary)">8 min read</span>
                    <span className="text-blue-accent hover:text-blue-primary transition-colors cursor-pointer text-sm font-semibold">Read More →</span>
                  </div>
                </div>
              </div>

              {/* Blog Post 5 */}
              <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl overflow-hidden shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md hover:border-blue-accent/70 transition-all duration-300">
                <div className="h-48 bg-linear-to-br from-blue-primary/20 to-blue-accent/20 flex items-center justify-center">
                  <span className="text-6xl">💰</span>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>ROI OPTIMIZATION</div>
                  <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    Maximizing Ad Spend: Cost-Per-Click Strategies That Work
                  </h3>
                  <p className="text-(--text-secondary) text-sm mb-4 leading-relaxed">
                    Master the art of CPC optimization. Learn advanced bidding strategies, audience targeting techniques, and conversion rate optimization methods that maximize your advertising ROI.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-(--text-secondary)">9 min read</span>
                    <span className="text-blue-accent hover:text-blue-primary transition-colors cursor-pointer text-sm font-semibold">Read More →</span>
                  </div>
                </div>
              </div>

              {/* Blog Post 6 */}
              <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl overflow-hidden shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md hover:border-blue-accent/70 transition-all duration-300">
                <div className="h-48 bg-linear-to-br from-blue-primary/20 to-blue-accent/20 flex items-center justify-center">
                  <span className="text-6xl">🎨</span>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>CREATIVE DESIGN</div>
                  <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    Color Psychology in Advertising: What Really Works
                  </h3>
                  <p className="text-(--text-secondary) text-sm mb-4 leading-relaxed">
                    Unlock the power of color in your ad creatives. Learn how different colors influence emotions, drive actions, and impact conversion rates across various demographics and cultures.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-(--text-secondary)">6 min read</span>
                    <span className="text-blue-accent hover:text-blue-primary transition-colors cursor-pointer text-sm font-semibold">Read More →</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <section className="py-16 px-8 bg-black/20">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-blue-accent mb-4 tracking-[0.2em] uppercase drop-shadow-[0_0_16px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    FREQUENTLY ASKED QUESTIONS
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-6 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md">
                    <h3 className="text-xl font-bold text-blue-accent mb-3">How accurate is the ad grading system?</h3>
                    <p className="text-(--text-secondary)">Our AI achieves 99.7% accuracy through continuous learning from millions of successful ad campaigns.</p>
                  </div>

                  <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-6 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md">
                    <h3 className="text-xl font-bold text-blue-accent mb-3">What file formats are supported?</h3>
                    <p className="text-(--text-secondary)">We support JPG, PNG, GIF, and WebP formats for images, and MP4, MOV for video thumbnails.</p>
                  </div>

                  <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-6 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md">
                    <h3 className="text-xl font-bold text-blue-accent mb-3">Is my data secure?</h3>
                    <p className="text-(--text-secondary)">Yes, all uploads are processed securely and automatically deleted after analysis. We never store your creative assets.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Newsletter Signup */}
            <div className="mt-16 bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/50 rounded-3xl p-8 shadow-[0_0_30px_var(--blue-glow)] backdrop-blur-md text-center">
              <h3 className="text-3xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                STAY AHEAD OF THE CURVE
              </h3>
              <p className="text-(--text-secondary) mb-6 max-w-2xl mx-auto">
                Get weekly insights on advertising optimization, AI trends, and digital marketing strategies delivered to your inbox.
              </p>

              {/* Trust Indicators */}
              <div className="flex justify-center items-center gap-8 mb-8 flex-wrap">
                <div className="flex items-center gap-2 text-(--text-secondary)">
                  <span className="text-green-400">🔒</span>
                  <span className="text-sm">SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-(--text-secondary)">
                  <span className="text-blue-400">⚡</span>
                  <span className="text-sm">99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2 text-(--text-secondary)">
                  <span className="text-yellow-400">🏆</span>
                  <span className="text-sm">Award Winning</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-blue-panel/80 border border-blue-primary/40 text-blue-accent px-4 py-3 rounded-lg focus:outline-none focus:border-blue-accent transition-colors"
                />
                <button className="bg-(--accent-color) hover:bg-(--accent-color)/80 text-(--text-primary) font-bold py-3 px-6 rounded-lg transition-all border-2 border-(--text-primary) shadow-[0_0_24px_var(--accent-glow-24)] hover:shadow-[0_0_36px_var(--accent-glow-36)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Reactor Charging Section */}
        {isAnalyzing && (
          <div className="modal-backdrop fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-black/90 border-2 border-(--blue-primary) rounded-xl p-8 shadow-[0_0_40px_var(--blue-glow)] max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-(--blue-primary) text-center mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                REACTOR CHARGING
              </h3>

              <div className="flex flex-col items-center gap-8">
                {/* Reactor Display */}
                <div className="relative">
                  {/* Outer reactor body */}
                  <div className="w-48 h-48 bg-linear-to-br from-(--blue-primary) to-(--blue-secondary) border-4 border-(--blue-primary) rounded-full shadow-[0_0_60px_var(--blue-glow)] flex items-center justify-center">
                    {/* Inner reactor core */}
                    <div className="w-32 h-32 bg-linear-to-br from-(--blue-accent) to-(--blue-primary) border-2 border-(--blue-accent) rounded-full flex items-center justify-center shadow-[0_0_40px_var(--blue-glow)]">
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
                  <div className="absolute inset-0 rounded-full border-2 border-(--blue-accent) animate-ping opacity-75"></div>
                  <div className="absolute inset-2 rounded-full border border-(--blue-accent) animate-pulse"></div>
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-xs">
                  <div className="flex justify-between text-(--blue-accent) text-sm mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    <span>CHARGING</span>
                    <span>{chargeLevel.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-(--blue-primary)/50 rounded-full h-4 border border-(--blue-primary)/50">
                    <div
                      className="bg-linear-to-r from-(--blue-primary) to-(--blue-accent) h-full rounded-full transition-all duration-300 shadow-[0_0_20px_var(--blue-glow)]"
                      style={{ width: `${chargeLevel}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status messages */}
                <div className="text-center">
                  <p className="text-(--blue-accent) text-lg font-bold animate-pulse" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {chargeLevel < 25 ? 'INITIALIZING SYSTEMS...' :
                     chargeLevel < 50 ? 'CALIBRATING SENSORS...' :
                     chargeLevel < 75 ? 'ANALYZING PATTERNS...' :
                     'FINALIZING RESULTS...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Footer */}
        <footer className="bg-black/50 border-t border-blue-primary/30 py-12 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>CTR REACTOR</h3>
                <p className="text-(--text-secondary) text-sm mb-4">Advanced AI-powered ad performance analysis</p>
                <div className="flex gap-4">
                  <span className="text-2xl">🐦</span>
                  <span className="text-2xl">💼</span>
                  <span className="text-2xl">📧</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-blue-accent mb-4">PRODUCT</h4>
                <ul className="space-y-2 text-sm text-(--text-secondary)">
                  <li><a href="#" className="hover:text-blue-accent transition-colors">Ad Grading</a></li>
                  <li><a href="#" className="hover:text-blue-accent transition-colors">Thumbnail Analyzer</a></li>
                  <li><a href="#" className="hover:text-blue-accent transition-colors">API Access</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-blue-accent mb-4">RESOURCES</h4>
                <ul className="space-y-2 text-sm text-(--text-secondary)">
                  <li><a href="#" className="hover:text-blue-accent transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-blue-accent transition-colors">Case Studies</a></li>
                  <li><a href="#" className="hover:text-blue-accent transition-colors">Help Center</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-blue-accent mb-4">COMPANY</h4>
                <ul className="space-y-2 text-sm text-(--text-secondary)">
                  <li><a href="#" className="hover:text-blue-accent transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-blue-accent transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-blue-accent transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-blue-primary/20 pt-8 text-center">
              <p className="text-(--text-secondary) text-sm">© 2025 CTR Reactor. All rights reserved. | Made with ⚛️ in the future</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src="/reactor-charging.mp3" preload="auto" />

      {/* Domain Search Modal */}
      <DomainSearchModal
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
      />
    </div>
  );
}
