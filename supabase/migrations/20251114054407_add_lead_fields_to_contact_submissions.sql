/*
  # Update Contact Submissions Table for Lead Management

  ## 1. Schema Changes
    
    ### Update `contact_submissions` table
    - Add `heffl_lead_id` (text, nullable) - ID returned from Heffl Leads API
    - Add `lead_value` (integer, nullable) - Potential value of the lead
    - Add `lead_source` (text) - Source of the lead (default: 'Website')
    - Add `lead_stage` (text) - Current stage of the lead (default: 'New')
    - Rename `heffl_client_id` to keep backward compatibility but add new lead field

  ## 2. Important Notes
    - Maintains backward compatibility by keeping heffl_client_id
    - Adds new lead-specific fields to support Heffl Leads API
    - Default values ensure smooth transition for new submissions
    - Existing submissions remain unaffected
*/

-- Add new lead-specific fields to contact_submissions table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'heffl_lead_id'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN heffl_lead_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'lead_value'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN lead_value integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'lead_source'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN lead_source text DEFAULT 'Website';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'lead_stage'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN lead_stage text DEFAULT 'New';
  END IF;
END $$;

-- Create index on heffl_lead_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_heffl_lead_id ON contact_submissions(heffl_lead_id);

-- Update existing records to have default lead values
UPDATE contact_submissions
SET 
  lead_source = 'Website',
  lead_stage = 'New'
WHERE lead_source IS NULL OR lead_stage IS NULL;
