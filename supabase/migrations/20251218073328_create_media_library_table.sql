/*
  # Create Media Library Table

  1. New Tables
    - `media_library`
      - `id` (uuid, primary key)
      - `filename` (text, required)
      - `url` (text, required)
      - `thumbnail_url` (text)
      - `alt_text` (text)
      - `caption` (text)
      - `file_size` (integer, bytes)
      - `mime_type` (text)
      - `width` (integer)
      - `height` (integer)
      - `uploaded_by` (uuid, foreign key to auth.users)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `media_library` table
    - Add policy for anyone to read media
    - Add policy for authenticated users to upload media
*/

CREATE TABLE IF NOT EXISTS media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  url text NOT NULL,
  thumbnail_url text,
  alt_text text,
  caption text,
  file_size integer,
  mime_type text,
  width integer,
  height integer,
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read media"
  ON media_library FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert media"
  ON media_library FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update their media"
  ON media_library FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploaded_by)
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Authenticated users can delete their media"
  ON media_library FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);