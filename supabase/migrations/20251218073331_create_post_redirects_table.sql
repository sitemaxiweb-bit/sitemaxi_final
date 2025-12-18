/*
  # Create Post Redirects Table

  1. New Tables
    - `post_redirects`
      - `id` (uuid, primary key)
      - `old_slug` (text, required, unique)
      - `new_slug` (text, required)
      - `post_id` (uuid, foreign key to blog_posts)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `post_redirects` table
    - Add policy for anyone to read redirects
    - Add policy for authenticated users to manage redirects
*/

CREATE TABLE IF NOT EXISTS post_redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  old_slug text NOT NULL UNIQUE,
  new_slug text NOT NULL,
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE post_redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read redirects"
  ON post_redirects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert redirects"
  ON post_redirects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update redirects"
  ON post_redirects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete redirects"
  ON post_redirects FOR DELETE
  TO authenticated
  USING (true);