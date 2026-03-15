/*
  # Create Keywords Management System

  ## Overview
  Creates the core keyword management tables for the SEO content growth system.

  ## New Tables

  ### keywords
  - Core keyword tracking with all SEO metadata
  - Supports manual entry and future API integration
  - Status workflow: new → queued → outline_ready → draft_ready → review_needed → approved → published
  - Fields: keyword, category, target_audience, search_intent, service_relevance, industry_relevance,
    location_relevance, priority_score, status, notes, assigned_article_title, cluster_id,
    business_type (local | ecommerce | both)

  ### keyword_clusters
  - Groups related keywords into topic clusters for pillar/supporting page strategy
  - Fields: name, main_keyword, supporting_keywords[], service_association, industry_association,
    location_association, cluster_type (pillar | supporting), title_ideas[], content_angle_ideas[],
    intent_type (informational | commercial | mixed), suggested_cta_type

  ## Security
  - RLS enabled on all tables
  - Authenticated users can fully manage keywords and clusters
  - Public has no access
*/

-- Keywords table
CREATE TABLE IF NOT EXISTS keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  target_audience text DEFAULT 'local_business',
  search_intent text DEFAULT 'informational',
  service_relevance text[],
  industry_relevance text[],
  location_relevance text[],
  priority_score integer DEFAULT 5 CHECK (priority_score >= 1 AND priority_score <= 10),
  status text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'queued', 'outline_ready', 'draft_ready', 'review_needed', 'approved', 'published')),
  notes text,
  assigned_article_title text,
  cluster_id uuid,
  business_type text DEFAULT 'both' CHECK (business_type IN ('local', 'ecommerce', 'both')),
  monthly_search_volume integer,
  keyword_difficulty integer,
  source text DEFAULT 'manual',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read keywords"
  ON keywords FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert keywords"
  ON keywords FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update keywords"
  ON keywords FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete keywords"
  ON keywords FOR DELETE
  TO authenticated
  USING (true);

-- Keyword clusters table
CREATE TABLE IF NOT EXISTS keyword_clusters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  main_keyword text NOT NULL,
  supporting_keywords text[],
  service_association text[],
  industry_association text[],
  location_association text[],
  cluster_type text DEFAULT 'supporting' CHECK (cluster_type IN ('pillar', 'supporting')),
  title_ideas text[],
  content_angle_ideas text[],
  intent_type text DEFAULT 'informational' CHECK (intent_type IN ('informational', 'commercial', 'mixed')),
  suggested_cta_type text DEFAULT 'audit',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE keyword_clusters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read clusters"
  ON keyword_clusters FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert clusters"
  ON keyword_clusters FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update clusters"
  ON keyword_clusters FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete clusters"
  ON keyword_clusters FOR DELETE
  TO authenticated
  USING (true);

-- Add FK from keywords to clusters
ALTER TABLE keywords
  ADD CONSTRAINT fk_keywords_cluster
  FOREIGN KEY (cluster_id) REFERENCES keyword_clusters(id) ON DELETE SET NULL;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_keywords_status ON keywords(status);
CREATE INDEX IF NOT EXISTS idx_keywords_category ON keywords(category);
CREATE INDEX IF NOT EXISTS idx_keywords_business_type ON keywords(business_type);
CREATE INDEX IF NOT EXISTS idx_keywords_cluster_id ON keywords(cluster_id);
CREATE INDEX IF NOT EXISTS idx_clusters_cluster_type ON keyword_clusters(cluster_type);

-- Updated_at triggers
CREATE OR REPLACE FUNCTION update_keywords_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_keywords_updated_at
  BEFORE UPDATE ON keywords
  FOR EACH ROW EXECUTE FUNCTION update_keywords_updated_at();

CREATE TRIGGER trigger_clusters_updated_at
  BEFORE UPDATE ON keyword_clusters
  FOR EACH ROW EXECUTE FUNCTION update_keywords_updated_at();
