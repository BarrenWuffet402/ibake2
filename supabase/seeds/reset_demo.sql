-- ─────────────────────────────────────────────────────────────
-- BakSelv.no — Demo Reset Script
-- ─────────────────────────────────────────────────────────────
-- Truncates all app tables and re-inserts all demo seed data.
-- auth.users rows are preserved (not touched).
-- Run before every investor demo or test session.
-- ─────────────────────────────────────────────────────────────

-- Disable triggers temporarily to avoid FK constraint issues during truncate
SET session_replication_role = 'replica';

TRUNCATE TABLE
  recipe_comments,
  messages,
  starter_lineage,
  sharing_requests,
  recipes,
  starters,
  profiles
CASCADE;

-- Re-enable triggers
SET session_replication_role = 'DEFAULT';

-- ─── Re-seed in dependency order ──────────────────────────────

\ir 01_profiles.sql
\ir 02_starters.sql
\ir 03_sharing.sql
\ir 04_recipes.sql
\ir 05_messages.sql
\ir 06_comments.sql
