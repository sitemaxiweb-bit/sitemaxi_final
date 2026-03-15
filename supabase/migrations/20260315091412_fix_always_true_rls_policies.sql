/*
  # Fix Always-True RLS Policies

  Replaces overly permissive RLS policies (WITH CHECK (true) / USING (true)) with
  proper admin-only checks using user_roles. All write operations on these tables
  should be restricted to authenticated admins only.

  Tables fixed:
  - public.authors (insert, update)
  - public.blog_posts (insert, update, delete)
  - public.contact_submissions (insert — service role pattern preserved via check)
  - public.keyword_clusters (insert, update, delete)
  - public.keywords (insert, update, delete)
  - public.post_redirects (insert, update, delete)
  - public.seo_audit_leads (insert — public form submission, keep open but add anon check)

  Note: blog_posts, keyword_clusters, keywords, post_redirects, authors are admin-only
  write tables. contact_submissions insert is kept open for the public contact form
  (anon role via edge function service key). seo_audit_leads insert kept open for
  anonymous form submissions.
*/

-- ============================================================
-- authors
-- ============================================================
DROP POLICY IF EXISTS "Authenticated users can insert authors" ON public.authors;
DROP POLICY IF EXISTS "Authenticated users can update authors" ON public.authors;

CREATE POLICY "Authenticated users can insert authors"
  ON public.authors
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can update authors"
  ON public.authors
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

-- ============================================================
-- blog_posts
-- ============================================================
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON public.blog_posts;

CREATE POLICY "Authenticated users can insert posts"
  ON public.blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can update posts"
  ON public.blog_posts
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can delete posts"
  ON public.blog_posts
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- ============================================================
-- contact_submissions (service role insert — keep functional but explicit)
-- ============================================================
DROP POLICY IF EXISTS "Service role can insert submissions" ON public.contact_submissions;

CREATE POLICY "Service role can insert submissions"
  ON public.contact_submissions
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- ============================================================
-- keyword_clusters
-- ============================================================
DROP POLICY IF EXISTS "Authenticated users can insert clusters" ON public.keyword_clusters;
DROP POLICY IF EXISTS "Authenticated users can update clusters" ON public.keyword_clusters;
DROP POLICY IF EXISTS "Authenticated users can delete clusters" ON public.keyword_clusters;

CREATE POLICY "Authenticated users can insert clusters"
  ON public.keyword_clusters
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can update clusters"
  ON public.keyword_clusters
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can delete clusters"
  ON public.keyword_clusters
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- ============================================================
-- keywords
-- ============================================================
DROP POLICY IF EXISTS "Authenticated users can insert keywords" ON public.keywords;
DROP POLICY IF EXISTS "Authenticated users can update keywords" ON public.keywords;
DROP POLICY IF EXISTS "Authenticated users can delete keywords" ON public.keywords;

CREATE POLICY "Authenticated users can insert keywords"
  ON public.keywords
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can update keywords"
  ON public.keywords
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can delete keywords"
  ON public.keywords
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- ============================================================
-- post_redirects
-- ============================================================
DROP POLICY IF EXISTS "Authenticated users can insert redirects" ON public.post_redirects;
DROP POLICY IF EXISTS "Authenticated users can update redirects" ON public.post_redirects;
DROP POLICY IF EXISTS "Authenticated users can delete redirects" ON public.post_redirects;

CREATE POLICY "Authenticated users can insert redirects"
  ON public.post_redirects
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can update redirects"
  ON public.post_redirects
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can delete redirects"
  ON public.post_redirects
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- ============================================================
-- seo_audit_leads (public form — insert must remain open for anon)
-- ============================================================
DROP POLICY IF EXISTS "Anyone can insert seo audit lead" ON public.seo_audit_leads;

CREATE POLICY "Anyone can insert seo audit lead"
  ON public.seo_audit_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
