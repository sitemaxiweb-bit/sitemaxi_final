/*
  # Add Advanced Blog Fields

  1. Changes
    - Add `author_id` (uuid, foreign key to authors)
    - Add `status` (text: draft, published, scheduled)
    - Add `meta_title` (text, SEO)
    - Add `meta_description` (text, SEO)
    - Add `og_title` (text, Open Graph)
    - Add `og_description` (text, Open Graph)
    - Add `og_image` (text, Open Graph)
    - Add `schedule_for` (timestamptz, for scheduled posts)
    - Add `original_slug` (text, for tracking slug changes)
  
  2. Notes
    - Keep existing `author_name` and `author_avatar` for backward compatibility
    - `author_id` will be preferred when set
*/

-- Add new columns to blog_posts
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'author_id'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN author_id uuid REFERENCES authors(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'status'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN status text DEFAULT 'published' CHECK (status IN ('draft', 'published', 'scheduled'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'meta_title'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN meta_title text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'meta_description'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN meta_description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'og_title'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN og_title text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'og_description'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN og_description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'og_image'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN og_image text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'schedule_for'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN schedule_for timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'original_slug'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN original_slug text;
  END IF;
END $$;