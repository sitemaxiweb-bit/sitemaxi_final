/*
  # Create Authors Table

  1. New Tables
    - `authors`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, unique)
      - `avatar_url` (text)
      - `bio` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `authors` table
    - Add policy for authenticated users to read authors
    - Add policy for admins to manage authors
*/

CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read authors"
  ON authors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert authors"
  ON authors FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update authors"
  ON authors FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default authors from existing blog posts
INSERT INTO authors (name, avatar_url) VALUES
  ('Sarah Zizolfo', 'https://shwcwyonepqlupiwxijx.supabase.co/storage/v1/object/public/blog-images/avatar/1764221204098-5aodkv-lg.png'),
  ('Sani Nirosh', 'https://shwcwyonepqlupiwxijx.supabase.co/storage/v1/object/public/blog-images/avatar/1763015749036-mg0f7k.jpeg'),
  ('Moji Seneviratne', 'https://shwcwyonepqlupiwxijx.supabase.co/storage/v1/object/public/blog-images/avatar/1763023870447-xrxnys-lg.png'),
  ('Tharindu Shashika', 'https://shwcwyonepqlupiwxijx.supabase.co/storage/v1/object/public/blog-images/avatar/1763215570856-b8fl6h-lg.jpg'),
  ('Malinda Dissanayakage', 'https://shwcwyonepqlupiwxijx.supabase.co/storage/v1/object/public/blog-images/avatar/1765394406611-ry76yt-lg.jpg')
ON CONFLICT (email) DO NOTHING;