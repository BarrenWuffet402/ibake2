-- ─────────────────────────────────────────────────────────────
-- BakSelv.no Demo Seed — 02: Starters
-- ─────────────────────────────────────────────────────────────
-- 6 starters spread across Oslo & Bergen.
-- IDs bb01–bb06 are the "primary" starters.
-- IDs bb07–bb08 are child starters created by sharing (see 03_sharing.sql).
-- ─────────────────────────────────────────────────────────────

INSERT INTO starters (id, owner_id, name, age_days, hydration_pct, description, photo_url, location_lat, location_lng, is_available) VALUES

  -- Bjørn — 2-year-old liquid starter, owned by fjordbreads
  (
    'bbbbbbbb-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000001',
    'Bjørn',
    730,
    100,
    'Two years old and at his absolute prime. A 100% hydration liquid levain with extraordinary depth — fruity and floral in summer, earthy and complex in winter. Named after my grandfather who taught me that patience is the only real ingredient. Doubles within 3 hours at 24°C and has never once been neglected.',
    'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&q=80',
    59.9139,
    10.7522,
    true
  ),

  -- Freya — 1-year-old high-hydration starter, owned by oslosourdough
  (
    'bbbbbbbb-0000-0000-0000-000000000002',
    'aaaaaaaa-0000-0000-0000-000000000002',
    'Freya',
    365,
    80,
    'Exactly one year old today — and what a year it has been. An 80% hydration starter with a mild, yoghurt-like tang and incredible oven spring. Freya was born during the first bake of 2025 and has produced over 50 loaves since. She thrives on a 50/50 bread flour and whole wheat blend.',
    'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=400&q=80',
    59.9231,
    10.7585,
    true
  ),

  -- Mjølner — stiff rye starter, owned by bergenbaker
  (
    'bbbbbbbb-0000-0000-0000-000000000003',
    'aaaaaaaa-0000-0000-0000-000000000003',
    'Mjølner',
    180,
    65,
    'Named after Thor''s hammer — stiff, powerful, and impossible to kill. This 65% hydration rye starter is my workhorse for dark Scandinavian loaves: rugbrød, knekkebrød, and Bergen-style mørkt brød. Tolerates long refrigeration and still bounces back like a champion after 2 weeks without feeding.',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    60.3913,
    5.3221,
    true
  ),

  -- Seoulmate — fast liquid starter, owned by nordic_dough
  (
    'bbbbbbbb-0000-0000-0000-000000000004',
    'aaaaaaaa-0000-0000-0000-000000000004',
    'Seoulmate',
    90,
    100,
    'Brought back from a baking workshop in Seoul — this 100% hydration levain has a uniquely mild, almost sweet tang. Perfect for Korean-inspired milk breads, soft sandwich loaves, and focaccia. Very fast fermenter (ready in 2–3 hours in warm weather) and incredibly consistent. My newest culture and already my most versatile.',
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80',
    59.9271,
    10.7150,
    true
  ),

  -- Bergljot — elderly spelt starter, owned by kneadmore
  (
    'bbbbbbbb-0000-0000-0000-000000000005',
    'aaaaaaaa-0000-0000-0000-000000000005',
    'Bergljot',
    1460,
    75,
    'Four years old and fed exclusively on organic spelt flour from a mill in Hardanger. Bergljot produces a distinctly nutty, slightly sweet flavour that you simply cannot replicate with wheat. She is slower than most starters — takes 6–8 hours to peak — but the flavour payoff is extraordinary. A true heirloom culture.',
    'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&q=80',
    60.3929,
    5.3413,
    true
  ),

  -- Old Faithful — decade-old starter, owned by kulturbakst
  (
    'bbbbbbbb-0000-0000-0000-000000000006',
    'aaaaaaaa-0000-0000-0000-000000000006',
    'Old Faithful',
    3650,
    100,
    'Ten years old. Born in a flat in Frogner in 2016 and has survived three kitchen renovations, a global pandemic, and a house move to Stavanger and back. Old Faithful is exactly as reliable as the name suggests: peak activity every single time, deep complex flavour, and a starter personality that somehow manages to feel wise. A piece of Oslo baking history.',
    'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=400&q=80',
    59.9220,
    10.7078,
    true
  ),

  -- bb07: Child of Bjørn — gifted to oslosourdough via accepted sharing request
  (
    'bbbbbbbb-0000-0000-0000-000000000007',
    'aaaaaaaa-0000-0000-0000-000000000002',
    'Bjørn Jr.',
    14,
    100,
    'Offspring of Bjørn — gifted by fjordbreads. Just getting started but already showing his father''s character. 100% hydration, fed on bread flour.',
    'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&q=80',
    59.9231,
    10.7585,
    false
  ),

  -- bb08: Child of Bergljot — gifted to fjordbreads via accepted sharing request
  (
    'bbbbbbbb-0000-0000-0000-000000000008',
    'aaaaaaaa-0000-0000-0000-000000000001',
    'Bergljot Unge',
    7,
    75,
    'Daughter of Bergljot — received from kneadmore in Bergen. Spelt-based, 75% hydration. Still establishing but already nutty and active.',
    'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&q=80',
    59.9139,
    10.7522,
    false
  )

ON CONFLICT (id) DO UPDATE
  SET name         = EXCLUDED.name,
      age_days     = EXCLUDED.age_days,
      hydration_pct = EXCLUDED.hydration_pct,
      description  = EXCLUDED.description,
      photo_url    = EXCLUDED.photo_url,
      is_available = EXCLUDED.is_available;
