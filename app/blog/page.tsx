import { Metadata } from 'next';
import { supabase, hasSupabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Blog - CTR-Reactor',
  description: 'Insights and tips on ad performance optimization',
};

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  featured: boolean;
  tags: string[];
  created_at: string;
  author_name: string;
}

async function getBlogs(): Promise<Blog[]> {
  if (!hasSupabase || !supabase) return [];

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error:', err);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-linear-to-br from-blue-panel-2/50 to-blue-panel/50 border-b border-blue-primary/20 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-accent mb-4 tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            📚 Blog
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Insights, tips, and strategies for optimizing your ad performance
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 py-12">
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-slate-400 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group bg-blue-panel border border-blue-primary/20 rounded-xl overflow-hidden hover:border-blue-accent/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,120,255,0.3)]"
              >
                {/* Image */}
                {blog.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.image_url}
                      alt={blog.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {blog.featured && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                        ⭐ Featured
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-accent transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {blog.content.substring(0, 200)}...
                  </p>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-blue-accent/10 text-blue-accent px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{blog.author_name}</span>
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
