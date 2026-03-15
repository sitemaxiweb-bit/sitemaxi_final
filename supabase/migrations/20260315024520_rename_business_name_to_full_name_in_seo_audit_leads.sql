/*
  # Rename business_name to full_name in seo_audit_leads

  ## Summary
  Renames the `business_name` column to `full_name` in the `seo_audit_leads` table.
  This aligns with the updated audit form which now collects the user's full name
  instead of their business name.

  ## Changes
  - `seo_audit_leads` table: `business_name` column renamed to `full_name`

  ## Notes
  - Uses a safe ADD + UPDATE + DROP approach (no data loss)
  - Existing data in `business_name` is preserved and copied to `full_name`
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'seo_audit_leads' AND column_name = 'business_name'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'seo_audit_leads' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE seo_audit_leads ADD COLUMN full_name text;
    UPDATE seo_audit_leads SET full_name = business_name;
    ALTER TABLE seo_audit_leads DROP COLUMN business_name;
  END IF;
END $$;
