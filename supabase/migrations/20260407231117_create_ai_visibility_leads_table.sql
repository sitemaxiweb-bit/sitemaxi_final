/*
  # Create AI Visibility Leads Table

  ## Purpose
  Stores lead captures from the AI Brand Visibility Checker tool, including submitted
  brand details, target keywords, generated visibility report data, and email status.

  ## New Tables
  - `ai_visibility_leads`
    - `id` (uuid, primary key) - unique identifier
    - `brand_name` (text) - business/brand name submitted
    - `website_url` (text) - brand website URL
    - `primary_service` (text) - main service offered
    - `city` (text) - city or location
    - `target_keywords` (text[]) - array of target keywords/phrases
    - `email` (text) - lead email address
    - `visibility_report` (jsonb) - full generated visibility report
    - `report_emailed` (boolean) - whether report was sent to user
    - `created_at` (timestamptz) - submission timestamp

  ## Security
  - RLS enabled
  - Authenticated admins can read all records
  - Service role can insert (via edge function)
  - Public inserts are blocked (edge function uses service role key)
*/

CREATE TABLE IF NOT EXISTS ai_visibility_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name text NOT NULL,
  website_url text NOT NULL,
  primary_service text NOT NULL,
  city text NOT NULL,
  target_keywords text[] DEFAULT '{}',
  email text NOT NULL,
  visibility_report jsonb,
  report_emailed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_visibility_leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_ai_visibility_leads_email ON ai_visibility_leads(email);
CREATE INDEX IF NOT EXISTS idx_ai_visibility_leads_created_at ON ai_visibility_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_visibility_leads_city ON ai_visibility_leads(city);
CREATE INDEX IF NOT EXISTS idx_ai_visibility_leads_primary_service ON ai_visibility_leads(primary_service);

CREATE POLICY "Admins can read all visibility leads"
  ON ai_visibility_leads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update visibility leads"
  ON ai_visibility_leads FOR UPDATE
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
