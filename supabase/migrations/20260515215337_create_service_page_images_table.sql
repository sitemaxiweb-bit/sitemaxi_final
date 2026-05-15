/*
  # Create Service Page Images Table

  ## Purpose
  Stores per-step methodology images for each service page (RankMaxi, SearchMaxi, etc.)
  so admins can swap images without touching code.

  ## New Tables
  - `service_page_images`
    - `id` (uuid, primary key)
    - `service_slug` (text) — identifies which service page, e.g. "rankmaxi", "searchmaxi"
    - `step_index` (integer) — 0-based index of the methodology step (0, 1, 2, 3 …)
    - `image_url` (text) — full public URL of the image
    - `label` (text) — human-readable alt/label for the step image
    - `updated_at` (timestamptz) — last updated timestamp

  ## Security
  - RLS enabled
  - Public (anonymous) can SELECT — needed so service pages render without auth
  - Authenticated admins can INSERT, UPDATE, DELETE

  ## Notes
  - Unique constraint on (service_slug, step_index) so each step has exactly one image record
  - Default Pexels seed rows for rankmaxi so the carousel works immediately
*/

CREATE TABLE IF NOT EXISTS service_page_images (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_slug text NOT NULL,
  step_index   integer NOT NULL DEFAULT 0,
  image_url    text NOT NULL DEFAULT '',
  label        text NOT NULL DEFAULT '',
  updated_at   timestamptz DEFAULT now(),
  CONSTRAINT service_page_images_slug_step_unique UNIQUE (service_slug, step_index)
);

CREATE INDEX IF NOT EXISTS idx_service_page_images_slug
  ON service_page_images (service_slug);

ALTER TABLE service_page_images ENABLE ROW LEVEL SECURITY;

-- Public read so service pages render for all visitors
CREATE POLICY "Public can read service page images"
  ON service_page_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated admins can write
CREATE POLICY "Admins can insert service page images"
  ON service_page_images
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update service page images"
  ON service_page_images
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete service page images"
  ON service_page_images
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

-- Seed default images for rankmaxi (Pexels fallbacks)
INSERT INTO service_page_images (service_slug, step_index, image_url, label) VALUES
  ('rankmaxi', 0, 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Diagnose — Local SEO audit'),
  ('rankmaxi', 1, 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Optimize — Google Business Profile'),
  ('rankmaxi', 2, 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Build Authority — Citations and reviews'),
  ('rankmaxi', 3, 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Track & Grow — Monthly analysis')
ON CONFLICT (service_slug, step_index) DO NOTHING;
