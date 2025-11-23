"use client";

import { useState, useEffect } from 'react';
import { Trash2, Eye, Star } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  featured: boolean;
  tags: string[];
  created_at: string;
  author_name: string;
}

export default function BlogManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs?limit=50');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      
      const data = await response.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    const adminPassword = prompt('Enter admin password:');
    if (!adminPassword) return;

    try {
      const response = await fetch(`/api/admin/blogs?id=${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': adminPassword,
        },
      });

      if (!response.ok) throw new Error('Failed to delete blog');
      
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete blog');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-slate-400">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="bg-blue-panel border border-blue-primary/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-accent">📚 Blog Management</h2>
        <div className="text-sm text-slate-400">
          {blogs.length} total blog{blogs.length !== 1 ? 's' : ''}
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {blogs.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p>No blogs created yet. Use the generator above to create your first blog!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-blue-panel-dark border border-blue-primary/20 rounded-lg p-4 hover:border-blue-accent/30 transition-colors"
            >
              <div className="flex gap-4">
                {/* Thumbnail */}
                {blog.image_url && (
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-sm truncate">{blog.title}</h3>
                        {blog.featured && (
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{blog.excerpt}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-blue-accent/20 rounded-lg transition-colors"
                        title="View blog"
                      >
                        <Eye className="w-4 h-4 text-blue-accent" />
                      </a>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Delete blog"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span>{blog.author_name}</span>
                    <span>•</span>
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                    {blog.tags && blog.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex gap-1">
                          {blog.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="bg-blue-accent/10 text-blue-accent px-2 py-0.5 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
