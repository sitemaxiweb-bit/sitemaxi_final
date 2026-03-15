/*
  # Fix Remaining Always-True RLS Policies

  1. contact_submissions INSERT — The edge function uses the service role key
     which bypasses RLS entirely, so authenticated-only write is safe.
     Removes anon access which was unintended.

  2. seo_audit_leads INSERT — Public form submissions come from anon users.
     Policy is restructured to be explicit about the roles allowed while
     still permitting anonymous submissions required by the audit form.
*/

-- ============================================================
-- contact_submissions
-- ============================================================
DROP POLICY IF EXISTS "Service role can insert submissions" ON public.contact_submissions;

CREATE POLICY "Service role can insert submissions"
  ON public.contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

-- ============================================================
-- seo_audit_leads
-- The public SEO audit form requires anonymous inserts.
-- We keep this open for anon but make it explicit.
-- ============================================================
DROP POLICY IF EXISTS "Anyone can insert seo audit lead" ON public.seo_audit_leads;

CREATE POLICY "Anyone can insert seo audit lead"
  ON public.seo_audit_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND full_name IS NOT NULL
  );
