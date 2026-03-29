-- ─────────────────────────────────────────────────────────────
-- BakSelv.no Demo Seed — 06: Recipe Comments
-- ─────────────────────────────────────────────────────────────
-- 2-3 comments per recipe, 13 total
-- From different demo users per recipe
-- ─────────────────────────────────────────────────────────────

INSERT INTO recipe_comments (id, recipe_id, author_id, content, created_at) VALUES

  -- ── Recipe 1: Classic Norwegian Sourdough ─────────────────
  (
    'ffffffff-0000-0000-0000-000000000001',
    'eeeeeeee-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000002',
    'Baked this last Sunday and the crumb was incredible — wide, irregular holes and that perfect blistered crust. I followed the coil fold method instead of stretch-and-folds and it made a real difference.',
    NOW() - INTERVAL '25 days'
  ),
  (
    'ffffffff-0000-0000-0000-000000000002',
    'eeeeeeee-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000004',
    'My go-to everyday loaf now. What flour do you use for the banneton dusting? I''ve been using wholemeal but I keep getting bits baked in.',
    NOW() - INTERVAL '22 days'
  ),
  (
    'ffffffff-0000-0000-0000-000000000003',
    'eeeeeeee-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000003',
    'Rice flour for the banneton — game changer. Also tried this with 10% dark rye added and it gave the crumb a beautiful nutty note. Highly recommend.',
    NOW() - INTERVAL '20 days'
  ),

  -- ── Recipe 2: Dark Rye with Fennel ────────────────────────
  (
    'ffffffff-0000-0000-0000-000000000004',
    'eeeeeeee-0000-0000-0000-000000000002',
    'aaaaaaaa-0000-0000-0000-000000000001',
    'The fennel seeds make this completely special. I''ve baked plenty of rugbrød but this combination is something else entirely. Had it this morning with smoked mackerel and it was transcendent.',
    NOW() - INTERVAL '18 days'
  ),
  (
    'ffffffff-0000-0000-0000-000000000005',
    'eeeeeeee-0000-0000-0000-000000000002',
    'aaaaaaaa-0000-0000-0000-000000000005',
    'What hydration did you end up using for the rye starter in this? Mine seems to slow down the ferment significantly and I ended up going 13 hours instead of 10.',
    NOW() - INTERVAL '16 days'
  ),
  (
    'ffffffff-0000-0000-0000-000000000006',
    'eeeeeeee-0000-0000-0000-000000000002',
    'aaaaaaaa-0000-0000-0000-000000000006',
    '100% hydration rye starter here — 13 hours is totally fine at room temperature below 20°C. Don''t rush it. The long ferment is exactly what makes it taste so good.',
    NOW() - INTERVAL '15 days'
  ),

  -- ── Recipe 3: 75% Hydration Bâtard ───────────────────────
  (
    'ffffffff-0000-0000-0000-000000000007',
    'eeeeeeee-0000-0000-0000-000000000003',
    'aaaaaaaa-0000-0000-0000-000000000002',
    'First time trying a bâtard shape instead of a boule and I''m converted. The surface area for scoring is so much better. Got a beautiful dramatic ear on my second attempt.',
    NOW() - INTERVAL '12 days'
  ),
  (
    'ffffffff-0000-0000-0000-000000000008',
    'eeeeeeee-0000-0000-0000-000000000003',
    'aaaaaaaa-0000-0000-0000-000000000006',
    'The tip about scoring at 30 degrees for a bigger ear is gold. Spent months wondering why my scores looked flat. Thank you!',
    NOW() - INTERVAL '10 days'
  ),

  -- ── Recipe 4: Seeded Scandinavian Loaf ───────────────────
  (
    'ffffffff-0000-0000-0000-000000000009',
    'eeeeeeee-0000-0000-0000-000000000004',
    'aaaaaaaa-0000-0000-0000-000000000001',
    'This has become my weekly bread. The soaking step for the seeds is essential — I skipped it once and the crumb was noticeably drier. Now I set a timer and never skip it.',
    NOW() - INTERVAL '7 days'
  ),
  (
    'ffffffff-0000-0000-0000-000000000010',
    'eeeeeeee-0000-0000-0000-000000000004',
    'aaaaaaaa-0000-0000-0000-000000000003',
    'Tried adding a tablespoon of dark malt flour alongside the whole wheat and it gave the crust an incredible deep colour and faint caramel note. Really recommend trying it.',
    NOW() - INTERVAL '6 days'
  ),
  (
    'ffffffff-0000-0000-0000-000000000011',
    'eeeeeeee-0000-0000-0000-000000000004',
    'aaaaaaaa-0000-0000-0000-000000000005',
    'Perfect lunch bread. I slice it thin and freeze half the loaf — it toasts from frozen beautifully. Great recipe.',
    NOW() - INTERVAL '5 days'
  ),

  -- ── Recipe 5: Overnight Focaccia ─────────────────────────
  (
    'ffffffff-0000-0000-0000-000000000012',
    'eeeeeeee-0000-0000-0000-000000000005',
    'aaaaaaaa-0000-0000-0000-000000000002',
    'Made this for a dinner party and it disappeared before I could get a photo. The overnight cold ferment gives it a complexity you just don''t get from same-day focaccia. Everyone asked for the recipe.',
    NOW() - INTERVAL '3 days'
  ),
  (
    'ffffffff-0000-0000-0000-000000000013',
    'eeeeeeee-0000-0000-0000-000000000005',
    'aaaaaaaa-0000-0000-0000-000000000004',
    'The olive oil tip is no joke. I used 60ml as written and the base came out like the best pizza crust I''ve ever had — crisp, golden, and slightly chewy. Don''t reduce the oil!',
    NOW() - INTERVAL '2 days'
  )

ON CONFLICT (id) DO NOTHING;
