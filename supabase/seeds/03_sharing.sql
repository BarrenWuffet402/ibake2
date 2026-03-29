-- ─────────────────────────────────────────────────────────────
-- BakSelv.no Demo Seed — 03: Sharing Requests & Lineage
-- ─────────────────────────────────────────────────────────────
-- 4 sharing requests: 2 accepted, 1 pending, 1 declined
-- Lineage records created for the 2 accepted requests
-- ─────────────────────────────────────────────────────────────

-- Sharing requests
INSERT INTO sharing_requests (id, starter_id, requester_id, owner_id, status, created_at) VALUES

  -- Accepted: oslosourdough requested Bjørn from fjordbreads
  (
    'cccccccc-0000-0000-0000-000000000001',
    'bbbbbbbb-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000002',
    'aaaaaaaa-0000-0000-0000-000000000001',
    'accepted',
    NOW() - INTERVAL '12 days'
  ),

  -- Accepted: fjordbreads requested Bergljot from kneadmore
  (
    'cccccccc-0000-0000-0000-000000000002',
    'bbbbbbbb-0000-0000-0000-000000000005',
    'aaaaaaaa-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000005',
    'accepted',
    NOW() - INTERVAL '6 days'
  ),

  -- Pending: bergenbaker requested Seoulmate from nordic_dough
  (
    'cccccccc-0000-0000-0000-000000000003',
    'bbbbbbbb-0000-0000-0000-000000000004',
    'aaaaaaaa-0000-0000-0000-000000000003',
    'aaaaaaaa-0000-0000-0000-000000000004',
    'pending',
    NOW() - INTERVAL '2 days'
  ),

  -- Declined: kulturbakst requested Mjølner from bergenbaker
  (
    'cccccccc-0000-0000-0000-000000000004',
    'bbbbbbbb-0000-0000-0000-000000000003',
    'aaaaaaaa-0000-0000-0000-000000000006',
    'aaaaaaaa-0000-0000-0000-000000000003',
    'declined',
    NOW() - INTERVAL '20 days'
  )

ON CONFLICT (id) DO UPDATE
  SET status = EXCLUDED.status;

-- Lineage: Bjørn (bb01) → Bjørn Jr. (bb07), shared by fjordbreads to oslosourdough
INSERT INTO starter_lineage (id, parent_starter_id, child_starter_id, shared_by, shared_to, shared_at) VALUES
  (
    'llllllll-0000-0000-0000-000000000001',
    'bbbbbbbb-0000-0000-0000-000000000001',
    'bbbbbbbb-0000-0000-0000-000000000007',
    'aaaaaaaa-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000002',
    NOW() - INTERVAL '11 days'
  ),

  -- Lineage: Bergljot (bb05) → Bergljot Unge (bb08), shared by kneadmore to fjordbreads
  (
    'llllllll-0000-0000-0000-000000000002',
    'bbbbbbbb-0000-0000-0000-000000000005',
    'bbbbbbbb-0000-0000-0000-000000000008',
    'aaaaaaaa-0000-0000-0000-000000000005',
    'aaaaaaaa-0000-0000-0000-000000000001',
    NOW() - INTERVAL '5 days'
  )

ON CONFLICT (id) DO NOTHING;
