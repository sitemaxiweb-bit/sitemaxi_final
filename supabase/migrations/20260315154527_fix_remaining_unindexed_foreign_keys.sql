/*
  # Fix Remaining Unindexed Foreign Keys

  Adds covering indexes for foreign key columns that still lack them.
  The previously added indexes were dropped as "unused" — these are new
  dedicated indexes for the remaining unindexed FKs.

  1. cc_access_audit_log.authorization_id -> credit_card_authorizations
  2. cc_access_audit_log.user_id -> auth.users
  3. cc_admin_passwords.created_by -> auth.users
  4. keywords.cluster_id (fk_keywords_cluster) -> keyword_clusters
*/

CREATE INDEX IF NOT EXISTS idx_cc_audit_log_authorization_id ON public.cc_access_audit_log(authorization_id);
CREATE INDEX IF NOT EXISTS idx_cc_audit_log_user_id ON public.cc_access_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_cc_admin_passwords_created_by ON public.cc_admin_passwords(created_by);
CREATE INDEX IF NOT EXISTS idx_keywords_cluster_id_fk ON public.keywords(cluster_id);
