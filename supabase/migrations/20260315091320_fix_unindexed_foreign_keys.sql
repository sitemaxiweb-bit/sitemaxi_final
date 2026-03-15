/*
  # Fix Unindexed Foreign Keys

  Adds covering indexes for all foreign key columns that lack them.
  This prevents sequential scans when joining or filtering by these columns.

  1. blog_posts.author_id -> authors
  2. blog_posts.cluster_id -> keyword_clusters
  3. blog_posts.keyword_id -> keywords
  4. media_library.uploaded_by -> auth.users
  5. post_redirects.post_id -> blog_posts
*/

CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON public.blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_cluster_id ON public.blog_posts(cluster_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_keyword_id ON public.blog_posts(keyword_id);
CREATE INDEX IF NOT EXISTS idx_media_library_uploaded_by ON public.media_library(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_post_redirects_post_id ON public.post_redirects(post_id);
