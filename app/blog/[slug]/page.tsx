import { Metadata } from 'next';
import { supabase, hasSupabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  tags: string[];
  created_at: string;
  author_name: string;
}

async function getBlog(slug: string): Promise<Blog | null> {
  if (!hasSupabase || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching blog:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return {
      title: 'Blog Not Found - CTR-Reactor',
    };
  }

  return {
    title: `${blog.title} - CTR-Reactor Blog`,
    description: blog.content.substring(0, 160),
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      {blog.image_url && (
        <div className="relative h-96 w-full overflow-hidden">
          <Image
            src={blog.image_url}
            alt={blog.title}
            width={1792}
            height={1024}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-background"></div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-accent hover:text-blue-bright mb-8 transition-colors"
        >
          ← Back to Blog
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {blog.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-slate-400 mb-8 pb-8 border-b border-blue-primary/20">
          <span>{blog.author_name}</span>
          <span>•</span>
          <span>{new Date(blog.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className="text-sm bg-blue-accent/10 text-blue-accent px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none
          prose-headings:text-blue-accent 
          prose-headings:font-bold
          prose-h1:text-3xl
          prose-h2:text-2xl
          prose-h3:text-xl
          prose-p:text-slate-300
          prose-p:leading-relaxed
          prose-a:text-blue-accent
          prose-a:no-underline
          hover:prose-a:text-blue-bright
          prose-strong:text-white
          prose-code:text-blue-accent
          prose-code:bg-blue-panel/50
          prose-code:px-1
          prose-code:py-0.5
          prose-code:rounded
          prose-pre:bg-blue-panel-dark
          prose-pre:border
          prose-pre:border-blue-primary/20
          prose-ul:text-slate-300
          prose-ol:text-slate-300
          prose-li:marker:text-blue-accent
          prose-blockquote:border-l-blue-accent
          prose-blockquote:text-slate-400
        ">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </article>

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-blue-primary/20">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-accent hover:text-blue-bright transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
