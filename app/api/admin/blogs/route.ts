import { NextRequest, NextResponse } from 'next/server';
import { supabase, hasSupabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    if (!hasSupabase || !supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    // Check for admin authentication
    const adminPassword = process.env.ADMIN_PASSWORD || '';
    const providedPassword = req.headers.get('x-admin-password');
    
    if (!providedPassword || providedPassword !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { blogs } = await req.json();

    if (!Array.isArray(blogs) || blogs.length === 0) {
      return NextResponse.json({ error: 'Invalid blogs array' }, { status: 400 });
    }

    const blogsToInsert = blogs.map((blog) => ({
      title: blog.title,
      slug: generateSlug(blog.title),
      content: blog.content,
      excerpt: blog.excerpt,
      image_url: blog.imageUrl,
      featured: blog.featured || false,
      author_name: 'CTR-Reactor Team',
      tags: blog.tags || [],
      published: true,
    }));

    const { data, error } = await supabase
      .from('blogs')
      .insert(blogsToInsert)
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      count: data.length,
      blogs: data,
    });
  } catch (error) {
    console.error('Save blogs error:', error);
    return NextResponse.json(
      {
        error: 'Failed to save blogs',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!hasSupabase || !supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');

    let query = supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      blogs: data,
    });
  } catch (error) {
    console.error('Fetch blogs error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch blogs',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!hasSupabase || !supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    // Check for admin authentication
    const adminPassword = process.env.ADMIN_PASSWORD || '';
    const providedPassword = req.headers.get('x-admin-password');
    
    if (!providedPassword || providedPassword !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Blog ID required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete blog',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    + '-' + Date.now().toString(36);
}
