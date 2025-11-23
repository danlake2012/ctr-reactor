"use client";

import { useState } from 'react';

interface Blog {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  imageUrl?: string;
  featured?: boolean;
}

export default function BlogGenerator() {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(1);
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [generatedBlogs, setGeneratedBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setProgress('Generating blog content with AI...');
    setGeneratedBlogs([]);

    try {
      const adminPassword = prompt('Enter admin password:');
      if (!adminPassword) {
        setError('Admin password required');
        setLoading(false);
        return;
      }

      // Step 1: Generate blogs
      const generateResponse = await fetch('/api/admin/generate-blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify({ topic, count }),
      });

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json();
        throw new Error(errorData.error || 'Failed to generate blogs');
      }

      const generateData = await generateResponse.json();
      const blogs = generateData.blogs.map((blog: Blog) => ({
        ...blog,
        featured,
      }));

      setGeneratedBlogs(blogs);
      setProgress(`Generated ${blogs.length} blog(s). Saving to database...`);

      // Step 2: Save to database
      const saveResponse = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify({ blogs }),
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json();
        throw new Error(errorData.error || 'Failed to save blogs');
      }

      const saveData = await saveResponse.json();
      setProgress(`✅ Successfully created ${saveData.count} blog(s)!`);
      
      // Clear form
      setTimeout(() => {
        setTopic('');
        setCount(1);
        setFeatured(false);
        setGeneratedBlogs([]);
        setProgress('');
      }, 3000);
    } catch (err) {
      console.error('Blog generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate blogs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-panel border border-blue-primary/20 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-blue-accent mb-6">🤖 AI Blog Generator</h2>

      <div className="space-y-4">
        {/* Topic Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Blog Topic
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., CTR optimization strategies, Ad performance metrics"
            className="w-full px-4 py-3 bg-blue-panel-dark border border-blue-primary/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:ring-1 focus:ring-blue-accent"
            disabled={loading}
          />
        </div>

        {/* Count Slider */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Number of Blogs: {count}
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full h-2 bg-blue-panel-dark rounded-lg appearance-none cursor-pointer accent-blue-accent"
            disabled={loading}
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1 blog</span>
            <span>100 blogs</span>
          </div>
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-5 h-5 rounded border-blue-primary/30 bg-blue-panel-dark text-blue-accent focus:ring-blue-accent focus:ring-offset-0"
            disabled={loading}
          />
          <label htmlFor="featured" className="text-sm font-medium text-slate-300 cursor-pointer">
            ⭐ Mark as Featured (show on homepage)
          </label>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Progress Display */}
        {progress && (
          <div className="bg-blue-accent/10 border border-blue-accent/30 rounded-lg p-4">
            <p className="text-blue-accent text-sm">{progress}</p>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="w-full bg-blue-accent hover:bg-blue-bright disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating {count} Blog{count > 1 ? 's' : ''}...
            </span>
          ) : (
            `Generate ${count} Blog${count > 1 ? 's' : ''} with AI + DALL-E`
          )}
        </button>

        {/* Info */}
        <div className="bg-blue-panel-dark border border-blue-primary/20 rounded-lg p-4">
          <p className="text-xs text-slate-400">
            ℹ️ Each blog will be:
          </p>
          <ul className="text-xs text-slate-400 mt-2 space-y-1 ml-4">
            <li>• 800-1200 words with emojis</li>
            <li>• Generated with GPT-4 Turbo</li>
            <li>• Unique AI-generated image from DALL-E 3</li>
            <li>• SEO-optimized with relevant tags</li>
            <li>• Automatically published</li>
          </ul>
        </div>
      </div>

      {/* Preview Generated Blogs */}
      {generatedBlogs.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-bold text-blue-accent">Generated Blogs Preview</h3>
          <div className="max-h-96 overflow-y-auto space-y-3">
            {generatedBlogs.map((blog, index) => (
              <div key={index} className="bg-blue-panel-dark border border-blue-primary/20 rounded-lg p-4">
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <h4 className="font-bold text-white text-sm">{blog.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{blog.excerpt}</p>
                {blog.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {blog.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-blue-accent/20 text-blue-accent px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
