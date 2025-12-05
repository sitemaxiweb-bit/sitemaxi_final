/*
  # Allow Manual Publish Date for Blog Posts

  ## Description
  Modifies the blog posts system to allow admins to set custom publish dates,
  enabling backdating of posts for content migration or scheduling purposes.

  ## Changes
  1. Drop the automatic published_at trigger
  2. The published_at field can now be manually set by admins
  3. If not set manually, it defaults to now() when published = true

  ## Security
  - No RLS changes needed
  - Only authenticated admins can set publish dates via existing policies

  ## Notes
  - This allows content managers to backdate posts when migrating from other platforms
  - Posts can appear to be published in the past for better content organization
*/

-- Drop the automatic published_at trigger since we want manual control
DROP TRIGGER IF EXISTS set_blog_post_published_at_trigger ON blog_posts;
DROP FUNCTION IF EXISTS set_blog_post_published_at();

-- Create new function that only sets published_at if not already set
CREATE OR REPLACE FUNCTION set_blog_post_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.published = true AND OLD.published = false AND NEW.published_at IS NULL THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger with new logic
CREATE TRIGGER set_blog_post_published_at_trigger
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION set_blog_post_published_at();
