/*
  # Create API Configuration and Contact Submissions Tables

  ## 1. New Tables
    
    ### `api_config`
    - `id` (uuid, primary key) - Unique identifier
    - `key_name` (text, unique) - Name of the API key (e.g., 'heffl_api_key')
    - `key_value` (text) - Encrypted API key value
    - `description` (text) - Description of what this key is used for
    - `created_at` (timestamptz) - When the config was created
    - `updated_at` (timestamptz) - When the config was last updated
    
    ### `contact_submissions`
    - `id` (uuid, primary key) - Unique identifier
    - `first_name` (text) - Contact's first name
    - `last_name` (text) - Contact's last name
    - `email` (text) - Contact's email address
    - `phone` (text, nullable) - Contact's phone number
    - `service` (text) - Service they're interested in
    - `message` (text) - Their message
    - `status` (text) - Submission status: 'pending', 'success', 'failed'
    - `heffl_client_id` (text, nullable) - ID returned from Heffl API if successful
    - `api_response` (jsonb, nullable) - Full API response or error details
    - `created_at` (timestamptz) - When the submission was created
    - `updated_at` (timestamptz) - When the submission was last updated

  ## 2. Security
    - Enable RLS on both tables
    - `api_config`: Only service role can access (no public access)
    - `contact_submissions`: Only service role can access (no public access)

  ## 3. Indexes
    - Index on `contact_submissions.status` for filtering
    - Index on `contact_submissions.email` for lookup
    - Index on `api_config.key_name` for fast key retrieval

  ## 4. Important Notes
    - API keys stored in `api_config` should be treated as sensitive
    - Contact submissions are backed up regardless of API success/failure
    - Status tracking allows for retry logic and monitoring
*/

-- Create api_config table
CREATE TABLE IF NOT EXISTS api_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key_name text UNIQUE NOT NULL,
  key_value text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  heffl_client_id text,
  api_response jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE api_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies (restrictive - no public access)
-- These tables will be accessed via Edge Functions with service role key only

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_api_config_key_name ON api_config(key_name);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_api_config_updated_at ON api_config;
CREATE TRIGGER update_api_config_updated_at
  BEFORE UPDATE ON api_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();