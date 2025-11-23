-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on featured blogs for faster queries
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON public.blogs(featured, created_at DESC);

-- Create index on slug for lookups
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);

-- Create index on published status
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(published, created_at DESC);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published blogs
CREATE POLICY "Public blogs are viewable by everyone"
  ON public.blogs
  FOR SELECT
  USING (published = true);

-- Policy: Authenticated users can read all blogs (for admin)
CREATE POLICY "Authenticated users can view all blogs"
  ON public.blogs
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert blogs
CREATE POLICY "Authenticated users can create blogs"
  ON public.blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update blogs
CREATE POLICY "Authenticated users can update blogs"
  ON public.blogs
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy: Authenticated users can delete blogs
CREATE POLICY "Authenticated users can delete blogs"
  ON public.blogs
  FOR DELETE
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_blogs_updated_at();
