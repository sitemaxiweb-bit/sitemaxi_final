/*
  # Drop Newly Flagged Unused Indexes

  The indexes below were created in the previous migration but are reported
  as unused. They are safe to drop as the tables have low query volume and
  the FK constraints themselves do not require a covering index for correctness.

  Dropped:
  - idx_post_redirects_post_id
  - idx_blog_posts_author_id
  - idx_blog_posts_cluster_id
  - idx_blog_posts_keyword_id
  - idx_media_library_uploaded_by
*/

DROP INDEX IF EXISTS public.idx_post_redirects_post_id;
DROP INDEX IF EXISTS public.idx_blog_posts_author_id;
DROP INDEX IF EXISTS public.idx_blog_posts_cluster_id;
DROP INDEX IF EXISTS public.idx_blog_posts_keyword_id;
DROP INDEX IF EXISTS public.idx_media_library_uploaded_by;
