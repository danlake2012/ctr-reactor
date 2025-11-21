'use client';

import { useState } from 'react';
import { AdData, AnalysisResults } from '@/types';
import { analyzeAd } from '@/lib/analysis';

interface AnalysisFormProps {
  onAnalysisComplete: (results: AnalysisResults) => void;
}

export default function AnalysisForm({ onAnalysisComplete }: AnalysisFormProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState<AdData>({
    headline: '',
    description: '',
    impressions: 0,
    clicks: 0,
    conversions: 0,
    cost: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'headline' || name === 'description' ? value : parseFloat(value) || 0
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.headline.trim()) {
      newErrors.headline = 'Ad headline required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Ad description required';
    }

    if (formData.impressions <= 0) {
      newErrors.impressions = 'Impressions must be greater than 0';
    }

    if (formData.clicks <= 0) {
      newErrors.clicks = 'Clicks must be greater than 0';
    }

    if (formData.conversions < 0) {
      newErrors.conversions = 'Conversions cannot be negative';
    }

    if (formData.cost <= 0) {
      newErrors.cost = 'Cost must be greater than 0';
    }

    if (formData.clicks > formData.impressions) {
      newErrors.clicks = 'Clicks cannot exceed impressions';
    }

    if (formData.conversions > formData.clicks) {
      newErrors.conversions = 'Conversions cannot exceed clicks';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsAnalyzing(true);

    // Simulate processing time for effect
    setTimeout(() => {
      const results = analyzeAd(formData);
      onAnalysisComplete(results);
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <section className="bg-black/40 border-2 border-green-500/50 rounded-xl p-8 shadow-[0_0_20px_rgba(0,255,65,0.2)]">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-green-500 font-orbitron flex items-center gap-3">
          <span>⚡</span>
          INITIALIZE ANALYSIS
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Headline */}
          <div className="md:col-span-2">
            <label htmlFor="headline" className="block text-green-400 mb-2 font-orbitron text-sm tracking-wider">
              AD HEADLINE
            </label>
            <input
              type="text"
              id="headline"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              className="w-full bg-black border-2 border-green-500/30 rounded-lg px-4 py-3 text-green-300 focus:border-green-500 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all font-mono"
              placeholder="Enter your ad headline..."
            />
            {errors.headline && (
              <p className="text-red-400 text-sm mt-1">⚠️ {errors.headline}</p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-green-400 mb-2 font-orbitron text-sm tracking-wider">
              AD DESCRIPTION
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-black border-2 border-green-500/30 rounded-lg px-4 py-3 text-green-300 focus:border-green-500 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all font-mono resize-none"
              placeholder="Enter your ad description..."
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">⚠️ {errors.description}</p>
            )}
          </div>

          {/* Impressions */}
          <div>
            <label htmlFor="impressions" className="block text-green-400 mb-2 font-orbitron text-sm tracking-wider">
              IMPRESSIONS
            </label>
            <input
              type="number"
              id="impressions"
              name="impressions"
              value={formData.impressions || ''}
              onChange={handleChange}
              className="w-full bg-black border-2 border-green-500/30 rounded-lg px-4 py-3 text-green-300 focus:border-green-500 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all font-mono"
              placeholder="10000"
            />
            <p className="text-green-500/50 text-xs mt-1">Total views</p>
            {errors.impressions && (
              <p className="text-red-400 text-sm mt-1">⚠️ {errors.impressions}</p>
            )}
          </div>

          {/* Clicks */}
          <div>
            <label htmlFor="clicks" className="block text-green-400 mb-2 font-orbitron text-sm tracking-wider">
              CLICKS
            </label>
            <input
              type="number"
              id="clicks"
              name="clicks"
              value={formData.clicks || ''}
              onChange={handleChange}
              className="w-full bg-black border-2 border-green-500/30 rounded-lg px-4 py-3 text-green-300 focus:border-green-500 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all font-mono"
              placeholder="250"
            />
            <p className="text-green-500/50 text-xs mt-1">Total clicks</p>
            {errors.clicks && (
              <p className="text-red-400 text-sm mt-1">⚠️ {errors.clicks}</p>
            )}
          </div>

          {/* Conversions */}
          <div>
            <label htmlFor="conversions" className="block text-green-400 mb-2 font-orbitron text-sm tracking-wider">
              CONVERSIONS
            </label>
            <input
              type="number"
              id="conversions"
              name="conversions"
              value={formData.conversions || ''}
              onChange={handleChange}
              className="w-full bg-black border-2 border-green-500/30 rounded-lg px-4 py-3 text-green-300 focus:border-green-500 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all font-mono"
              placeholder="15"
            />
            <p className="text-green-500/50 text-xs mt-1">Total conversions</p>
            {errors.conversions && (
              <p className="text-red-400 text-sm mt-1">⚠️ {errors.conversions}</p>
            )}
          </div>

          {/* Cost */}
          <div>
            <label htmlFor="cost" className="block text-green-400 mb-2 font-orbitron text-sm tracking-wider">
              COST ($)
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              step="0.01"
              value={formData.cost || ''}
              onChange={handleChange}
              className="w-full bg-black border-2 border-green-500/30 rounded-lg px-4 py-3 text-green-300 focus:border-green-500 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all font-mono"
              placeholder="500.00"
            />
            <p className="text-green-500/50 text-xs mt-1">Total spend</p>
            {errors.cost && (
              <p className="text-red-400 text-sm mt-1">⚠️ {errors.cost}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isAnalyzing}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-lg font-orbitron text-lg tracking-wider transition-all shadow-[0_0_30px_rgba(0,255,65,0.5)] hover:shadow-[0_0_50px_rgba(0,255,65,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? 'ANALYZING...' : 'ACTIVATE REACTOR'}
        </button>
      </form>
    </section>
  );
}
