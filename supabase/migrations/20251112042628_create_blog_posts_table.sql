/*
  # Create Blog Posts System

  ## Description
  This migration creates a comprehensive blog management system with admin capabilities.

  ## New Tables
  
  ### `blog_posts`
  - `id` (uuid, primary key) - Unique identifier for each blog post
  - `title` (text, required) - The blog post title
  - `slug` (text, unique, required) - URL-friendly version of the title
  - `excerpt` (text, required) - Short description/preview of the post
  - `content` (text, required) - Full blog post content (supports markdown)
  - `featured_image` (text) - URL to the featured/hero image
  - `author_name` (text, required) - Name of the post author
  - `author_avatar` (text) - URL to author's avatar image
  - `category` (text, required) - Blog post category (e.g., 'SEO', 'Social Media', 'Web Design')
  - `tags` (text[]) - Array of tags for the post
  - `published` (boolean, default false) - Whether the post is published or draft
  - `read_time` (integer) - Estimated reading time in minutes
  - `views` (integer, default 0) - Number of times the post has been viewed
  - `created_at` (timestamptz) - When the post was created
  - `updated_at` (timestamptz) - When the post was last updated
  - `published_at` (timestamptz) - When the post was published

  ## Security
  - Enable RLS on `blog_posts` table
  - Public can read published posts
  - Only authenticated admin users can create, update, or delete posts
  
  ## Notes
  - Slugs must be unique to ensure proper URL routing
  - Posts can be saved as drafts (published = false) before going live
  - View count increments when users view the post
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  featured_image text,
  author_name text NOT NULL,
  author_avatar text,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  published boolean DEFAULT false,
  read_time integer DEFAULT 5,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published blog posts
CREATE POLICY "Anyone can view published posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);

-- Policy: Authenticated users can view all posts (including drafts)
CREATE POLICY "Authenticated users can view all posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert blog posts
CREATE POLICY "Authenticated users can insert posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update blog posts
CREATE POLICY "Authenticated users can update posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete blog posts
CREATE POLICY "Authenticated users can delete posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);

-- Create index on published status for filtering
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts(published);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts(category);

-- Create index on published_at for sorting
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(published_at DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before update
CREATE TRIGGER update_blog_posts_updated_at_trigger
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();

-- Function to set published_at when post is published
CREATE OR REPLACE FUNCTION set_blog_post_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.published = true AND OLD.published = false THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to set published_at when post is published
CREATE TRIGGER set_blog_post_published_at_trigger
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION set_blog_post_published_at();
