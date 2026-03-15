/*
  # Create Location Pages System

  ## Summary
  This migration creates the full database schema for SiteMaxi's local SEO landing page system.
  It enables dynamic, SEO-optimized location pages for Canadian cities and service combinations.

  ## New Tables

  ### 1. `locations`
  Stores all city/province location records with metadata for internal linking and page generation.

  ### 2. `location_pages`
  Stores the SEO landing page content for each city+service combination.
  Supports custom hero copy, FAQs (JSONB), related content, and publish status.

  ## Security
  - RLS enabled on both tables
  - Public read access for published/active records
  - Admin-only write access via user_roles check
*/

CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL,
  province text NOT NULL,
  province_full text NOT NULL,
  slug text UNIQUE NOT NULL,
  region text,
  population_tier text DEFAULT 'mid' CHECK (population_tier IN ('major', 'mid', 'small')),
  nearby_cities text[] DEFAULT '{}',
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS location_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  service_type text NOT NULL,
  service_label text NOT NULL,
  slug text UNIQUE NOT NULL,
  page_title text NOT NULL,
  meta_title text NOT NULL,
  meta_description text NOT NULL,
  hero_headline text NOT NULL,
  hero_subheadline text NOT NULL,
  intro_copy text NOT NULL DEFAULT '',
  why_us_copy text NOT NULL DEFAULT '',
  service_copy text NOT NULL DEFAULT '',
  custom_cta_text text DEFAULT '',
  faqs jsonb DEFAULT '[]'::jsonb,
  related_industries text[] DEFAULT '{}',
  related_blog_posts text[] DEFAULT '{}',
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_location_pages_location_id ON location_pages(location_id);
CREATE INDEX IF NOT EXISTS idx_location_pages_slug ON location_pages(slug);
CREATE INDEX IF NOT EXISTS idx_location_pages_service_type ON location_pages(service_type);
CREATE INDEX IF NOT EXISTS idx_locations_slug ON locations(slug);
CREATE INDEX IF NOT EXISTS idx_locations_province ON locations(province);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active locations"
  ON locations FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Admins can insert locations"
  ON locations FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update locations"
  ON locations FOR UPDATE
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

CREATE POLICY "Admins can delete locations"
  ON locations FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Public can view published location pages"
  ON location_pages FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Admins can insert location pages"
  ON location_pages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update location pages"
  ON location_pages FOR UPDATE
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

CREATE POLICY "Admins can delete location pages"
  ON location_pages FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

INSERT INTO locations (city, province, province_full, slug, region, population_tier, nearby_cities) VALUES
  ('Vancouver', 'BC', 'British Columbia', 'vancouver', 'Lower Mainland', 'major', ARRAY['burnaby', 'surrey', 'richmond', 'north-vancouver', 'new-westminster']),
  ('Surrey', 'BC', 'British Columbia', 'surrey', 'Lower Mainland', 'major', ARRAY['vancouver', 'burnaby', 'langley', 'delta', 'white-rock']),
  ('Burnaby', 'BC', 'British Columbia', 'burnaby', 'Lower Mainland', 'mid', ARRAY['vancouver', 'surrey', 'new-westminster', 'coquitlam']),
  ('Richmond', 'BC', 'British Columbia', 'richmond', 'Lower Mainland', 'mid', ARRAY['vancouver', 'burnaby', 'delta', 'surrey']),
  ('Coquitlam', 'BC', 'British Columbia', 'coquitlam', 'Lower Mainland', 'mid', ARRAY['burnaby', 'port-moody', 'new-westminster', 'maple-ridge']),
  ('Langley', 'BC', 'British Columbia', 'langley', 'Lower Mainland', 'mid', ARRAY['surrey', 'abbotsford', 'maple-ridge', 'delta']),
  ('Abbotsford', 'BC', 'British Columbia', 'abbotsford', 'Fraser Valley', 'mid', ARRAY['langley', 'mission', 'chilliwack']),
  ('Kelowna', 'BC', 'British Columbia', 'kelowna', 'Okanagan', 'mid', ARRAY['west-kelowna', 'penticton', 'kamloops']),
  ('Victoria', 'BC', 'British Columbia', 'victoria', 'Vancouver Island', 'major', ARRAY['saanich', 'langford', 'nanaimo']),
  ('Toronto', 'ON', 'Ontario', 'toronto', 'GTA', 'major', ARRAY['mississauga', 'brampton', 'north-york', 'scarborough', 'etobicoke']),
  ('Mississauga', 'ON', 'Ontario', 'mississauga', 'GTA', 'major', ARRAY['toronto', 'brampton', 'oakville', 'burlington']),
  ('Brampton', 'ON', 'Ontario', 'brampton', 'GTA', 'major', ARRAY['mississauga', 'toronto', 'vaughan', 'caledon']),
  ('Vaughan', 'ON', 'Ontario', 'vaughan', 'GTA', 'mid', ARRAY['toronto', 'brampton', 'richmond-hill', 'woodbridge']),
  ('Markham', 'ON', 'Ontario', 'markham', 'GTA', 'mid', ARRAY['toronto', 'richmond-hill', 'scarborough', 'pickering']),
  ('Richmond Hill', 'ON', 'Ontario', 'richmond-hill', 'GTA', 'mid', ARRAY['vaughan', 'markham', 'newmarket', 'toronto']),
  ('Hamilton', 'ON', 'Ontario', 'hamilton', 'Hamilton', 'major', ARRAY['burlington', 'stoney-creek', 'brantford', 'grimsby']),
  ('Ottawa', 'ON', 'Ontario', 'ottawa', 'Ottawa', 'major', ARRAY['gatineau', 'kanata', 'gloucester', 'nepean']),
  ('London', 'ON', 'Ontario', 'london', 'Southwestern Ontario', 'major', ARRAY['woodstock', 'st-thomas', 'kitchener']),
  ('Kitchener', 'ON', 'Ontario', 'kitchener', 'Waterloo Region', 'major', ARRAY['waterloo', 'cambridge', 'guelph', 'london']),
  ('Calgary', 'AB', 'Alberta', 'calgary', 'Southern Alberta', 'major', ARRAY['airdrie', 'cochrane', 'chestermere', 'okotoks']),
  ('Edmonton', 'AB', 'Alberta', 'edmonton', 'Central Alberta', 'major', ARRAY['st-albert', 'sherwood-park', 'leduc', 'spruce-grove']),
  ('Red Deer', 'AB', 'Alberta', 'red-deer', 'Central Alberta', 'mid', ARRAY['calgary', 'edmonton', 'lacombe']),
  ('Lethbridge', 'AB', 'Alberta', 'lethbridge', 'Southern Alberta', 'mid', ARRAY['calgary', 'medicine-hat']),
  ('Winnipeg', 'MB', 'Manitoba', 'winnipeg', 'Manitoba', 'major', ARRAY['steinbach', 'portage-la-prairie', 'brandon']),
  ('Saskatoon', 'SK', 'Saskatchewan', 'saskatoon', 'Saskatchewan', 'major', ARRAY['prince-albert', 'regina', 'warman']),
  ('Regina', 'SK', 'Saskatchewan', 'regina', 'Saskatchewan', 'major', ARRAY['saskatoon', 'moose-jaw', 'white-city']),
  ('Halifax', 'NS', 'Nova Scotia', 'halifax', 'Nova Scotia', 'major', ARRAY['dartmouth', 'bedford', 'sackville']),
  ('Moncton', 'NB', 'New Brunswick', 'moncton', 'New Brunswick', 'mid', ARRAY['riverview', 'dieppe', 'fredericton'])
ON CONFLICT (slug) DO NOTHING;
