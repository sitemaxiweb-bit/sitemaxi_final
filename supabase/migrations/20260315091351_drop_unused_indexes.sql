/*
  # Drop Unused Indexes

  Removes indexes that have never been used according to pg_stat_user_indexes.
  These consume disk space and slow down writes without providing query benefit.

  Indexes dropped:
  - user_roles: idx_user_roles_role
  - contact_submissions: idx_contact_submissions_created_at, idx_contact_submissions_heffl_lead_id
  - credit_card_authorizations: idx_cc_auth_confirmation_number, idx_cc_auth_email,
      idx_cc_auth_created_at, idx_cc_auth_last4
  - cc_access_audit_log: idx_cc_audit_user_id, idx_cc_audit_created_at, idx_cc_audit_authorization_id
  - cc_admin_passwords: idx_cc_admin_passwords_created_by
  - location_pages: idx_location_pages_service_type
  - keywords: idx_keywords_status, idx_keywords_category, idx_keywords_business_type, idx_keywords_cluster_id
  - keyword_clusters: idx_clusters_cluster_type
*/

DROP INDEX IF EXISTS public.idx_user_roles_role;
DROP INDEX IF EXISTS public.idx_contact_submissions_created_at;
DROP INDEX IF EXISTS public.idx_contact_submissions_heffl_lead_id;
DROP INDEX IF EXISTS public.idx_cc_auth_confirmation_number;
DROP INDEX IF EXISTS public.idx_cc_auth_email;
DROP INDEX IF EXISTS public.idx_cc_auth_created_at;
DROP INDEX IF EXISTS public.idx_cc_auth_last4;
DROP INDEX IF EXISTS public.idx_cc_audit_user_id;
DROP INDEX IF EXISTS public.idx_cc_audit_created_at;
DROP INDEX IF EXISTS public.idx_cc_audit_authorization_id;
DROP INDEX IF EXISTS public.idx_cc_admin_passwords_created_by;
DROP INDEX IF EXISTS public.idx_location_pages_service_type;
DROP INDEX IF EXISTS public.idx_keywords_status;
DROP INDEX IF EXISTS public.idx_keywords_category;
DROP INDEX IF EXISTS public.idx_keywords_business_type;
DROP INDEX IF EXISTS public.idx_keywords_cluster_id;
DROP INDEX IF EXISTS public.idx_clusters_cluster_type;
