/*
  # Fix RLS Auth Initialization Plan Issues

  Replace bare auth.uid() / auth.role() calls with (select auth.uid()) in all
  RLS policies that re-evaluate the function per-row. This allows Postgres to
  cache the result for the entire query, significantly improving performance.

  Tables fixed:
  - public.media_library (delete, update, insert policies)
  - public.seo_audit_leads (view policy)
  - public.locations (insert, update, delete policies)
  - public.location_pages (insert, update, delete policies)
*/

-- ============================================================
-- media_library
-- ============================================================
DROP POLICY IF EXISTS "Authenticated users can delete their media" ON public.media_library;
DROP POLICY IF EXISTS "Authenticated users can update their media" ON public.media_library;
DROP POLICY IF EXISTS "Authenticated users can insert media" ON public.media_library;

CREATE POLICY "Authenticated users can insert media"
  ON public.media_library
  FOR INSERT
  TO authenticated
  WITH CHECK (uploaded_by = (select auth.uid()));

CREATE POLICY "Authenticated users can update their media"
  ON public.media_library
  FOR UPDATE
  TO authenticated
  USING (uploaded_by = (select auth.uid()))
  WITH CHECK (uploaded_by = (select auth.uid()));

CREATE POLICY "Authenticated users can delete their media"
  ON public.media_library
  FOR DELETE
  TO authenticated
  USING (uploaded_by = (select auth.uid()));

-- ============================================================
-- seo_audit_leads
-- ============================================================
DROP POLICY IF EXISTS "Authenticated users can view all audit leads" ON public.seo_audit_leads;

CREATE POLICY "Authenticated users can view all audit leads"
  ON public.seo_audit_leads
  FOR SELECT
  TO authenticated
  USING ((select auth.role()) = 'authenticated');

-- ============================================================
-- locations
-- ============================================================
DROP POLICY IF EXISTS "Admins can insert locations" ON public.locations;
DROP POLICY IF EXISTS "Admins can update locations" ON public.locations;
DROP POLICY IF EXISTS "Admins can delete locations" ON public.locations;

CREATE POLICY "Admins can insert locations"
  ON public.locations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = (select auth.uid())
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update locations"
  ON public.locations
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = (select auth.uid())
      AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = (select auth.uid())
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete locations"
  ON public.locations
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = (select auth.uid())
      AND role = 'admin'
    )
  );

-- ============================================================
-- location_pages
-- ============================================================
DROP POLICY IF EXISTS "Admins can insert location pages" ON public.location_pages;
DROP POLICY IF EXISTS "Admins can update location pages" ON public.location_pages;
DROP POLICY IF EXISTS "Admins can delete location pages" ON public.location_pages;

CREATE POLICY "Admins can insert location pages"
  ON public.location_pages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = (select auth.uid())
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update location pages"
  ON public.location_pages
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = (select auth.uid())
      AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = (select auth.uid())
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete location pages"
  ON public.location_pages
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = (select auth.uid())
      AND role = 'admin'
    )
  );
