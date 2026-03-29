-- ─────────────────────────────────────────────────────────────
-- BakSelv.no Demo Seed — 04: Recipes
-- ─────────────────────────────────────────────────────────────
-- 5 recipes with full AI-enhanced JSON (all enhanced)
-- ─────────────────────────────────────────────────────────────

INSERT INTO recipes (id, author_id, title, original_text, enhanced_json, likes_count, created_at) VALUES

  -- Recipe 1: Classic Norwegian Sourdough — fjordbreads — 12 likes
  (
    'eeeeeeee-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000001',
    'Classic Norwegian Sourdough',
    'Mix 500g bread flour, 375g water, 100g active starter, 10g salt. Autolyse 30 min. Add starter, rest 20 min. Add salt. 4 stretch-and-folds over 2 hours. Bulk 5 hours at 24C. Shape. Cold proof overnight. Bake 250C Dutch oven, 20 min lid on, 20 min lid off.',
    '{
      "title": "Classic Norwegian Sourdough",
      "description": "A confident, open-crumb country loaf built for the Norwegian kitchen — mild tang, blistered crust, and a crumb you can tear into with your hands. This is the bread that started it all: simple technique, extraordinary results. Perfect with butter and brunost or alongside a bowl of fish soup.",
      "ingredients": [
        {"amount": "500", "unit": "g", "item": "strong white bread flour (min. 12% protein)"},
        {"amount": "375", "unit": "g", "item": "water, divided (350g + 25g)"},
        {"amount": "100", "unit": "g", "item": "active sourdough starter, at peak activity"},
        {"amount": "10", "unit": "g", "item": "fine sea salt"}
      ],
      "steps": [
        {"step_number": 1, "instruction": "Combine 500g flour with 350g water. Mix until no dry flour remains. Cover and autolyse for 30–45 minutes. This step builds extensibility without effort.", "tip": "The dough will feel shaggy and rough — that is exactly right. Do not add the starter yet."},
        {"step_number": 2, "instruction": "Add 100g active starter. Squeeze and fold through the dough for 2–3 minutes until fully incorporated. Rest 20 minutes uncovered."},
        {"step_number": 3, "instruction": "Dissolve 10g salt in 25g water. Pour over dough and work in thoroughly. This is your first set of stretch-and-folds.", "tip": "Using a small amount of extra water with the salt (bassinage technique) prevents tearing the dough while incorporating."},
        {"step_number": 4, "instruction": "Perform 3 more sets of stretch-and-folds at 30-minute intervals (4 sets total). After the final set, leave the dough undisturbed to complete bulk fermentation."},
        {"step_number": 5, "instruction": "Bulk ferment at 24°C for 4–5 hours total until the dough has grown 50–70%, domes on top, and jiggles like panna cotta when the container is shaken."},
        {"step_number": 6, "instruction": "Gently tip dough onto an unfloured surface. Pre-shape into a rough round, rest uncovered 20 minutes. Final shape: flip, fold sides to center, roll toward you to build surface tension."},
        {"step_number": 7, "instruction": "Place seam-side up in a well-floured banneton. Cover with a shower cap and refrigerate for 10–16 hours.", "tip": "Rice flour is the best banneton dusting — it absorbs no moisture and releases cleanly every time."},
        {"step_number": 8, "instruction": "Preheat oven with Dutch oven inside at 250°C for 45 minutes. Turn cold dough onto parchment, score with a confident slash, lower into Dutch oven. Bake 20 min lid on, 20–25 min lid off until deep mahogany.", "tip": "Score immediately before loading — cold dough scores cleanest. The colder the dough, the sharper the ear."}
      ],
      "tags": ["country loaf", "norwegian", "open crumb", "dutch oven", "classic", "everyday bread"]
    }',
    12,
    NOW() - INTERVAL '30 days'
  ),

  -- Recipe 2: Dark Rye with Fennel — oslosourdough — 34 likes
  (
    'eeeeeeee-0000-0000-0000-000000000002',
    'aaaaaaaa-0000-0000-0000-000000000002',
    'Dark Rye with Fennel',
    '400g dark rye flour, 100g bread flour, 200g rye sourdough starter, 450ml water, 10g salt, 1 tbsp fennel seeds, 1 tbsp caraway seeds. Mix all. Ferment 10-12 hours room temp. Bake in tin at 200C 65 minutes.',
    '{
      "title": "Dark Rye with Fennel",
      "description": "A deeply satisfying Norwegian-style dark rye with a perfume of fennel and caraway that fills the kitchen as it bakes. Dense, moist, and extraordinarily flavourful — this is the bread of Norwegian winters, of open-faced sandwiches piled with smoked salmon, pickled cucumber, and a smear of cream cheese. Improves dramatically on day two.",
      "ingredients": [
        {"amount": "400", "unit": "g", "item": "dark rye flour (coarsely milled preferred)"},
        {"amount": "100", "unit": "g", "item": "strong bread flour"},
        {"amount": "200", "unit": "g", "item": "active rye sourdough starter (100% hydration)"},
        {"amount": "450", "unit": "ml", "item": "warm water (32°C)"},
        {"amount": "10", "unit": "g", "item": "fine sea salt"},
        {"amount": "1", "unit": "tbsp", "item": "whole fennel seeds, lightly toasted"},
        {"amount": "1", "unit": "tbsp", "item": "whole caraway seeds"},
        {"amount": "1", "unit": "tsp", "item": "dark treacle or malt syrup (optional, for colour and depth)"}
      ],
      "steps": [
        {"step_number": 1, "instruction": "Toast fennel and caraway seeds in a dry pan over medium heat for 60–90 seconds until fragrant. Set aside to cool.", "tip": "Toasting wakes up the aromatic oils. Do not burn — they turn bitter quickly."},
        {"step_number": 2, "instruction": "Dissolve the rye starter in warm water. Add treacle if using and stir to combine. Add both flours, salt, and toasted seeds. Mix thoroughly with a sturdy spatula for 3 minutes — the dough will be thick and sticky like a very dense porridge."},
        {"step_number": 3, "instruction": "Cover tightly with cling film pressed directly onto the dough surface and ferment at room temperature (18–20°C) for 10–12 hours. The dough is ready when it has risen by 30–40% and shows small bubbles across the surface."},
        {"step_number": 4, "instruction": "Oil a 900g loaf tin generously. Transfer dough and smooth the top with a wet spatula or wet hands. Scatter a few extra fennel seeds on top if desired.", "tip": "Wet tools are essential for handling rye dough. Keep a bowl of water beside you at all times."},
        {"step_number": 5, "instruction": "Cover loosely and proof at room temperature for 1.5–2 hours until the dough has risen to the rim of the tin."},
        {"step_number": 6, "instruction": "Preheat oven to 200°C fan. Place a small tray of boiling water on the oven floor. Bake for 65–70 minutes until the crust is very dark brown and the internal temperature reads 97–98°C."},
        {"step_number": 7, "instruction": "Remove from tin and cool on a wire rack completely — minimum 3 hours. Wrap in a clean cloth and rest overnight for best results.", "tip": "Cutting too soon makes the crumb gummy. The starch needs time to set. Your patience will be rewarded."}
      ],
      "tags": ["dark rye", "fennel", "norwegian", "rugbrød", "dense", "traditional", "smørbrød"]
    }',
    34,
    NOW() - INTERVAL '21 days'
  ),

  -- Recipe 3: 75% Hydration Bâtard — bergenbaker — 7 likes
  (
    'eeeeeeee-0000-0000-0000-000000000003',
    'aaaaaaaa-0000-0000-0000-000000000003',
    '75% Hydration Bâtard',
    '500g bread flour, 375g water, 100g starter, 10g salt. Mix, autolyse 1hr. 4 coil folds. Bulk 4-5 hrs. Shape into batard. Cold proof 14hrs. Bake 240C in combo cooker.',
    '{
      "title": "75% Hydration Bâtard",
      "description": "An intermediate-level loaf with an open, irregular crumb and dramatic ear — shaped as a bâtard (oval) rather than a boule for more crust surface area. 75% hydration is the sweet spot: extensible enough for an open crumb but structured enough to hold a beautiful shape. This is the bread that turns beginners into bakers.",
      "ingredients": [
        {"amount": "500", "unit": "g", "item": "strong white bread flour"},
        {"amount": "375", "unit": "g", "item": "water (75% hydration), divided: 350g + 25g"},
        {"amount": "100", "unit": "g", "item": "active white sourdough starter"},
        {"amount": "10", "unit": "g", "item": "fine sea salt"}
      ],
      "steps": [
        {"step_number": 1, "instruction": "Mix 500g flour with 350g water to shaggy dough. Autolyse 1 hour — longer than a standard autolyse to ensure full hydration at this flour ratio."},
        {"step_number": 2, "instruction": "Add starter and work in for 3 minutes. Rest 30 minutes. Add salt dissolved in remaining 25g water and incorporate fully."},
        {"step_number": 3, "instruction": "Perform 4 sets of coil folds (not stretch-and-folds) every 30 minutes. For coil folds: lift the dough from underneath, let gravity stretch it down, fold the ends under. Rotate 90° and repeat.", "tip": "Coil folds are gentler than stretch-and-folds and better preserve the open structure at higher hydrations."},
        {"step_number": 4, "instruction": "Complete bulk fermentation at 24–26°C until dough is 50–60% larger. Total bulk: 4–5 hours from adding starter."},
        {"step_number": 5, "instruction": "Pre-shape as a loose oval. Bench rest 25 minutes. Final shape: flip, stretch gently into a rectangle, fold the top third down and bottom third up (letter fold), then roll away from you into a tight cylinder (bâtard shape)."},
        {"step_number": 6, "instruction": "Place seam-up in an oval banneton dusted with rice flour. Cover and cold-proof in refrigerator for 12–16 hours."},
        {"step_number": 7, "instruction": "Preheat combo cooker (or Dutch oven with lid) at 240°C for 45 minutes. Score with a single long slash at 30–45° angle. Bake 20 min covered, 20–25 min uncovered.", "tip": "The angle of the score determines the direction of the ear. A shallow 30° angle creates a dramatic, pronounced ear. A steeper angle creates a wider, more open score."}
      ],
      "tags": ["bâtard", "intermediate", "open crumb", "75% hydration", "artisan", "combo cooker"]
    }',
    7,
    NOW() - INTERVAL '14 days'
  ),

  -- Recipe 4: Seeded Scandinavian Loaf — nordic_dough — 19 likes
  (
    'eeeeeeee-0000-0000-0000-000000000004',
    'aaaaaaaa-0000-0000-0000-000000000004',
    'Seeded Scandinavian Loaf',
    '400g bread flour, 100g whole wheat, 350g water, 90g starter, 10g salt, 50g sunflower seeds, 30g pumpkin seeds, 20g sesame seeds, 20g linseeds. Mix, bulk 5 hours with folds. Shape. Cold proof. Bake Dutch oven.',
    '{
      "title": "Seeded Scandinavian Loaf",
      "description": "A hearty Scandinavian-style sourdough packed with four types of seeds — sunflower, pumpkin, sesame, and linseed — for crunch, nutrition, and that distinctive Nordic wholesomeness. The whole wheat adds nuttiness and colour. Brilliant for open-faced sandwiches, or thick slices toasted with butter and honey.",
      "ingredients": [
        {"amount": "400", "unit": "g", "item": "strong white bread flour"},
        {"amount": "100", "unit": "g", "item": "whole wheat flour"},
        {"amount": "350", "unit": "g", "item": "water (70% hydration)"},
        {"amount": "90", "unit": "g", "item": "active sourdough starter (100% hydration)"},
        {"amount": "10", "unit": "g", "item": "fine sea salt"},
        {"amount": "50", "unit": "g", "item": "sunflower seeds"},
        {"amount": "30", "unit": "g", "item": "pumpkin seeds"},
        {"amount": "20", "unit": "g", "item": "sesame seeds (white or black)"},
        {"amount": "20", "unit": "g", "item": "whole linseeds (flaxseed)"},
        {"amount": "1", "unit": "tbsp", "item": "extra seeds, mixed, for topping"}
      ],
      "steps": [
        {"step_number": 1, "instruction": "Soak all seeds in 50ml warm water for 30 minutes before mixing. This prevents them absorbing moisture from the dough and making it dry.", "tip": "Soaked seeds integrate better and stay moist inside the crumb rather than creating dry pockets."},
        {"step_number": 2, "instruction": "Mix both flours with 350g water until no dry flour remains. Autolyse 30 minutes. Add starter and work in. Rest 20 minutes. Add salt and incorporate fully."},
        {"step_number": 3, "instruction": "Drain soaked seeds and fold into dough during the second set of stretch-and-folds. Perform 4 sets total over 2 hours.", "tip": "Adding seeds during fold sets (rather than mixing) preserves the gluten structure you have built."},
        {"step_number": 4, "instruction": "Complete bulk fermentation at 23–25°C for 4–5 hours. The dough will feel heavier than a plain loaf due to the seeds — this is normal."},
        {"step_number": 5, "instruction": "Shape into a boule or bâtard. Before placing in banneton, roll the top of the shaped loaf in the extra mixed seeds to coat. Place seed-side down in floured banneton."},
        {"step_number": 6, "instruction": "Cold proof overnight (10–16 hours). Preheat Dutch oven at 240°C for 45 minutes. Invert loaf onto parchment — seeds will be on top. Score and bake 20 min covered, 20–25 min uncovered.", "tip": "The seed crust can scorch slightly at high heat — this adds flavour, but if your oven runs hot, reduce to 230°C for the uncovered phase."}
      ],
      "tags": ["seeded", "scandinavian", "whole wheat", "sunflower", "pumpkin", "nordic", "hearty"]
    }',
    19,
    NOW() - INTERVAL '9 days'
  ),

  -- Recipe 5: Overnight Focaccia — kulturbakst — 28 likes
  (
    'eeeeeeee-0000-0000-0000-000000000005',
    'aaaaaaaa-0000-0000-0000-000000000006',
    'Overnight Focaccia',
    '500g bread flour, 425g water (85%), 100g starter, 10g salt. Mix. Bulk 5 hours with 4 folds. Stretch into oiled pan. Add olive oil on top. Refrigerate overnight. Dimple and add toppings. Bake 230C 22 minutes.',
    '{
      "title": "Overnight Focaccia",
      "description": "The most forgiving sourdough bread you will ever bake — and the most crowd-pleasing. An 85% hydration dough that cold-ferments overnight in the pan, dimpled generously and flooded with good olive oil. The result: a billowing, golden focaccia with crisp, oily edges, an airy crumb, and a flavour so complex it tastes like it took days (because it did). Top with rosemary and sea salt flakes, or go full Norwegian with dried thyme and sliced red onion.",
      "ingredients": [
        {"amount": "500", "unit": "g", "item": "strong white bread flour"},
        {"amount": "425", "unit": "g", "item": "water (85% hydration)"},
        {"amount": "100", "unit": "g", "item": "active sourdough starter, at peak"},
        {"amount": "10", "unit": "g", "item": "fine sea salt"},
        {"amount": "60", "unit": "ml", "item": "extra-virgin olive oil, plus more for the pan"},
        {"amount": "1", "unit": "tbsp", "item": "fresh rosemary leaves"},
        {"amount": "1", "unit": "tsp", "item": "flaky sea salt, to finish"},
        {"amount": "1", "unit": "small", "item": "red onion, thinly sliced (optional)"}
      ],
      "steps": [
        {"step_number": 1, "instruction": "Combine flour and water. Mix until no dry flour remains. Autolyse 30 minutes. Add starter and mix in. Add salt dissolved in a tablespoon of water. Mix thoroughly.", "tip": "This dough is very wet — use a container with straight sides (like a plastic tub) for easier handling and folding."},
        {"step_number": 2, "instruction": "Perform 4 sets of stretch-and-folds over the first 2 hours, then leave undisturbed. Bulk ferment at 23–25°C for 4–5 hours total until dough is bubbly, lighter, and 60–80% larger."},
        {"step_number": 3, "instruction": "Pour 2 tbsp olive oil into a 30×40cm baking tray or large cast-iron pan and spread across the base and sides. Gently pour the dough out into the centre — do not degas it.", "tip": "The olive oil is not optional — it is what creates the legendary crisp, golden focaccia base. Do not skimp."},
        {"step_number": 4, "instruction": "Using oiled hands, gently stretch the dough toward the edges of the pan. It will resist — that is fine. Cover and refrigerate overnight (12–18 hours)."},
        {"step_number": 5, "instruction": "Remove from refrigerator 2 hours before baking to allow dough to warm and puff back up. Preheat oven to 230°C fan."},
        {"step_number": 6, "instruction": "Drizzle the remaining olive oil over the surface. With oiled fingers, press firmly all over to create deep dimples — do not be timid. The dimples should go almost to the bottom of the tray.", "tip": "The deeper the dimples, the more oil pools form, which creates those iconic crispy-edged, chewy-centred bites."},
        {"step_number": 7, "instruction": "Press rosemary into the dimples. Scatter red onion if using. Sprinkle generously with flaky sea salt. Bake for 20–25 minutes until deep golden-brown all over.", "tip": "If the top colours too fast, tent loosely with foil. The base should be as golden as the top — check by lifting a corner with a spatula."},
        {"step_number": 8, "instruction": "Cool in the pan for 5 minutes, then slide onto a rack. Focaccia is best eaten warm or at room temperature on the day of baking. Any leftovers reheat brilliantly in a dry pan."}
      ],
      "tags": ["focaccia", "overnight", "olive oil", "high hydration", "flatbread", "beginner-friendly", "crowd pleaser"]
    }',
    28,
    NOW() - INTERVAL '4 days'
  )

ON CONFLICT (id) DO UPDATE
  SET title        = EXCLUDED.title,
      original_text = EXCLUDED.original_text,
      enhanced_json = EXCLUDED.enhanced_json,
      likes_count  = EXCLUDED.likes_count;
