/*
  # Fix Mutable Search Path on update_keywords_updated_at

  Sets a fixed search_path on the trigger function to prevent search_path
  injection attacks. Using SET search_path = '' forces fully-qualified
  object references, which is the most secure approach.
*/

CREATE OR REPLACE FUNCTION public.update_keywords_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
