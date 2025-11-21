'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ThumbnailStyle {
  name: string;
  description: string;
  preview: string;
}

export default function ThumbnailGenerator() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedThumbnail, setGeneratedThumbnail] = useState<string | null>(null);

  const thumbnailStyles: ThumbnailStyle[] = [
    {
      name: 'Modern',
      description: 'Clean, minimalist design with bold typography',
      preview: '🎨'
    },
    {
      name: 'Gaming',
      description: 'High-energy design with neon colors and effects',
      preview: '🎮'
    },
    {
      name: 'Tech',
      description: 'Professional tech-focused design with gradients',
      preview: '💻'
    },
    {
      name: 'Lifestyle',
      description: 'Warm, inviting design for lifestyle content',
      preview: '🏠'
    },
    {
      name: 'Educational',
      description: 'Clean, trustworthy design for learning content',
      preview: '📚'
    },
    {
      name: 'Entertainment',
      description: 'Fun, engaging design for entertainment content',
      preview: '🎬'
    }
  ];

  const generateThumbnail = async () => {
    if (!title.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate mock thumbnail URL (in a real app, this would be from an AI service)
    const mockThumbnailUrl = `https://via.placeholder.com/1280x720/${Math.random() > 0.5 ? 'ff6b6b' : '4ecdc4'}/ffffff?text=${encodeURIComponent(title.substring(0, 20))}`;
    setGeneratedThumbnail(mockThumbnailUrl);

    setIsGenerating(false);
  };

  const downloadThumbnail = () => {
    if (!generatedThumbnail) return;

    // In a real app, this would download the actual generated image
    const link = document.createElement('a');
    link.href = generatedThumbnail;
    link.download = `thumbnail-${title.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <span className="text-6xl">🖼️</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              THUMBNAIL GENERATOR
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            AI-POWERED THUMBNAIL CREATION FOR MAXIMUM CLICKS
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Text Input */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                THUMBNAIL CONTENT
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    MAIN TITLE *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your video/article title"
                    maxLength={60}
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  />
                  <p className="text-xs text-slate-400 mt-1">{title.length}/60 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    SUBTITLE (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Add a compelling subtitle"
                    maxLength={40}
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  />
                  <p className="text-xs text-slate-400 mt-1">{subtitle.length}/40 characters</p>
                </div>
              </div>
            </div>

            {/* Style Selection */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                DESIGN STYLE
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {thumbnailStyles.map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setSelectedStyle(style.name.toLowerCase())}
                    className={`p-4 border rounded-lg transition-all ${
                      selectedStyle === style.name.toLowerCase()
                        ? 'border-blue-accent bg-blue-accent/10 shadow-[0_0_10px_var(--blue-glow)]'
                        : 'border-blue-primary/30 hover:border-blue-primary/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{style.preview}</div>
                    <div className="text-sm font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {style.name}
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      {style.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <button
                onClick={generateThumbnail}
                disabled={isGenerating || !title.trim()}
                className="bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed text-lg"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isGenerating ? 'GENERATING...' : 'GENERATE THUMBNAIL'}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              THUMBNAIL PREVIEW
            </h2>

            {generatedThumbnail ? (
              <div className="space-y-4">
                <div className="relative aspect-video bg-slate-800 rounded-lg overflow-hidden shadow-[0_0_20px_var(--blue-glow)]">
                  <Image
                    src={generatedThumbnail}
                    alt="Generated thumbnail"
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {title}
                    </h3>
                    {subtitle && (
                      <p className="text-white/80 text-sm">
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={downloadThumbnail}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors tracking-widest uppercase"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    DOWNLOAD
                  </button>
                  <button
                    onClick={() => setGeneratedThumbnail(null)}
                    className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-colors tracking-widest uppercase"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    REGENERATE
                  </button>
                </div>

                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    OPTIMIZATION TIPS
                  </h3>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Use high-contrast colors for better visibility</li>
                    <li>• Include faces or human elements when possible</li>
                    <li>• Keep text concise and impactful</li>
                    <li>• Use bright, saturated colors to grab attention</li>
                    <li>• Test different versions to find what works best</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center shadow-[0_0_20px_var(--blue-glow)]">
                {isGenerating ? (
                  <div className="text-center">
                    <div className="text-6xl mb-4">⚡</div>
                    <div className="text-blue-accent font-bold text-xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      GENERATING THUMBNAIL...
                    </div>
                    <div className="text-slate-400 text-sm mt-2">
                      AI is creating your perfect thumbnail
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-400">
                    <div className="text-6xl mb-4">🖼️</div>
                    <p>Enter your content details and select a style to generate your thumbnail</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>THUMBNAIL GENERATOR | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}