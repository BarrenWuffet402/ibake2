-- ─────────────────────────────────────────────────────────────
-- BakSelv.no Demo Seed — 01: Profiles
-- ─────────────────────────────────────────────────────────────
-- NOTE: These UUIDs must match real auth.users entries.
-- For local dev, insert them into auth.users first via Supabase
-- dashboard or using the auth admin API.
--
-- User mapping:
--   u1  fjordbreads    — Oslo sentrum
--   u2  oslosourdough  — Grünerløkka
--   u3  bergenbaker    — Bergen sentrum
--   u4  nordic_dough   — Majorstuen, Oslo
--   u5  kneadmore      — Fløen, Bergen
--   u6  kulturbakst    — Frogner, Oslo
-- ─────────────────────────────────────────────────────────────

INSERT INTO profiles (id, username, avatar_url, location_lat, location_lng) VALUES
  (
    'aaaaaaaa-0000-0000-0000-000000000001',
    'fjordbreads',
    'https://api.dicebear.com/7.x/initials/svg?seed=fjordbreads&backgroundColor=7B3F2B&fontColor=F2E8D9',
    59.9139,
    10.7522
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000002',
    'oslosourdough',
    'https://api.dicebear.com/7.x/initials/svg?seed=oslosourdough&backgroundColor=4A6741&fontColor=F2E8D9',
    59.9231,
    10.7585
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000003',
    'bergenbaker',
    'https://api.dicebear.com/7.x/initials/svg?seed=bergenbaker&backgroundColor=B8873A&fontColor=F2E8D9',
    60.3913,
    5.3221
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000004',
    'nordic_dough',
    'https://api.dicebear.com/7.x/initials/svg?seed=nordicdough&backgroundColor=7B3F2B&fontColor=F2E8D9',
    59.9271,
    10.7150
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000005',
    'kneadmore',
    'https://api.dicebear.com/7.x/initials/svg?seed=kneadmore&backgroundColor=4A6741&fontColor=F2E8D9',
    60.3929,
    5.3413
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000006',
    'kulturbakst',
    'https://api.dicebear.com/7.x/initials/svg?seed=kulturbakst&backgroundColor=B8873A&fontColor=F2E8D9',
    59.9220,
    10.7078
  )
ON CONFLICT (id) DO UPDATE
  SET username    = EXCLUDED.username,
      avatar_url  = EXCLUDED.avatar_url,
      location_lat = EXCLUDED.location_lat,
      location_lng = EXCLUDED.location_lng;
