/*
  # Create SEO Audit Leads Table

  ## Summary
  Creates a table to store leads generated from the Free AI Marketing Audit tool.

  ## New Tables
  - `seo_audit_leads`
    - `id` (uuid, primary key)
    - `business_name` (text) - Name of the business
    - `email` (text) - Contact email
    - `website_url` (text) - URL that was audited
    - `audit_report` (jsonb) - Full audit report data including scores, issues, recommendations
    - `report_emailed` (boolean) - Whether the report was emailed to the user
    - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - RLS enabled
  - Public INSERT allowed (anyone can submit an audit request)
  - Authenticated admin users can SELECT all leads
  - No UPDATE or DELETE from public
*/

CREATE TABLE IF NOT EXISTS seo_audit_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  website_url text NOT NULL DEFAULT '',
  audit_report jsonb,
  report_emailed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE seo_audit_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert seo audit lead"
  ON seo_audit_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all audit leads"
  ON seo_audit_leads
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );
