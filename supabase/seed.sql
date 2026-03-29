-- BakSelv.no — Demo Seed Data
-- Run against your Supabase project to populate sample starters and recipes for demo.
-- Creates 3 demo baker profiles (no auth.users — use Supabase dashboard to create
-- test accounts and then update the profile IDs to match).

-- ────────────────────────────────────────────────
-- DEMO USER IDs (replace with real auth.users IDs
-- after creating accounts in Supabase Auth dashboard)
-- ────────────────────────────────────────────────
-- demo_user_1: 'aaaaaaaa-0000-0000-0000-000000000001'
-- demo_user_2: 'aaaaaaaa-0000-0000-0000-000000000002'
-- demo_user_3: 'aaaaaaaa-0000-0000-0000-000000000003'

-- Profiles (must match auth.users IDs in production)
INSERT INTO profiles (id, username, location_lat, location_lng) VALUES
  ('aaaaaaaa-0000-0000-0000-000000000001', 'fjordbreads',    59.9139,  10.7522),  -- Oslo sentrum
  ('aaaaaaaa-0000-0000-0000-000000000002', 'oslo_dough',     59.9489,  10.7662),  -- Grünerløkka
  ('aaaaaaaa-0000-0000-0000-000000000003', 'nordic_loaves',  59.8938,  10.6214)   -- Sandvika
ON CONFLICT (id) DO NOTHING;

-- Starters
INSERT INTO starters (id, owner_id, name, age_days, hydration_pct, description, location_lat, location_lng, is_available) VALUES
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001',
   'Sigrid', 730, 80,
   'A lively 80% hydration culture with a mild, yoghurt-like tang. Started in Bergen, moved to Oslo. Very active — doubles within 4 hours at room temperature.',
   59.9139, 10.7522, true),

  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000002',
   'Bjørn', 1825, 100,
   'Five years old and going strong. A 100% hydration liquid starter with complex flavour — fruity notes in summer, more earthy in winter. Loves rye flour.',
   59.9489, 10.7662, true),

  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000002',
   'Hulda', 365, 75,
   'Spelt-fed starter, slightly sweeter than a pure wheat culture. Great for enriched doughs (cardamom rolls, focaccia). One year old.',
   59.9489, 10.7662, false),

  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000003',
   'Lars Erik', 548, 65,
   'Stiff 65% hydration starter — traditional Norwegian style, used for knekkebrød and dense rye loaves. Very forgiving and easy to maintain.',
   59.8938, 10.6214, true)
ON CONFLICT (id) DO NOTHING;

-- Starter lineage (Bjørn is parent of Hulda)
INSERT INTO starter_lineage (id, parent_starter_id, child_starter_id, shared_by, shared_to) VALUES
  ('cccccccc-0000-0000-0000-000000000001',
   'bbbbbbbb-0000-0000-0000-000000000002',
   'bbbbbbbb-0000-0000-0000-000000000003',
   'aaaaaaaa-0000-0000-0000-000000000002',
   'aaaaaaaa-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- Recipes (with enhanced_json matching EnhancedRecipe interface)
INSERT INTO recipes (id, author_id, title, original_text, enhanced_json, likes_count) VALUES
  ('dddddddd-0000-0000-0000-000000000001',
   'aaaaaaaa-0000-0000-0000-000000000001',
   'Classic Norwegian Sourdough Rugbrød',
   'Mix 400g dark rye flour, 200g bread flour, 150g active starter (100% hydration), 500ml water, 12g salt. Mix well, let rise 8-12 hours at room temperature. Bake at 200°C for 60 min.',
   '{
     "title": "Classic Norwegian Sourdough Rugbrød",
     "description": "A dense, deeply flavoured Norwegian rye bread with a crackling crust and moist crumb. Made with a long cold ferment that develops complex earthy, sour notes. Perfect sliced thin with butter and brown cheese.",
     "ingredients": [
       {"amount": "400", "unit": "g", "item": "dark rye flour"},
       {"amount": "200", "unit": "g", "item": "strong bread flour"},
       {"amount": "150", "unit": "g", "item": "active sourdough starter (100% hydration)"},
       {"amount": "500", "unit": "ml", "item": "lukewarm water (30°C)"},
       {"amount": "12", "unit": "g", "item": "fine sea salt"},
       {"amount": "1", "unit": "tbsp", "item": "caraway seeds (optional)"}
     ],
     "steps": [
       {"step_number": 1, "instruction": "Combine both flours in a large bowl. Dissolve the starter in the water, then pour into the flour and mix until no dry flour remains. The dough will be very sticky — this is normal for rye.", "tip": "Use a wet hand or dough scraper rather than dry hands. Rye dough should not be kneaded like wheat dough."},
       {"step_number": 2, "instruction": "Add the salt and caraway seeds if using. Mix thoroughly for 2 minutes. Cover tightly with a damp cloth or cling film.", "tip": "Salt inhibits fermentation — add it after the initial mix if you want a slightly faster rise."},
       {"step_number": 3, "instruction": "Bulk ferment at room temperature (19–21°C) for 10–12 hours, or until the dough has risen by about 50% and shows bubbles on the surface."},
       {"step_number": 4, "instruction": "Transfer to a well-oiled 900g loaf tin. Smooth the top with wet hands. Cover and proof for a further 1–2 hours until the dough domes slightly above the rim.", "tip": "Dip your fingers in cold water to smooth the top — it prevents sticking and gives a neat finish."},
       {"step_number": 5, "instruction": "Preheat oven to 200°C fan (220°C conventional). Bake for 60–65 minutes until deep brown. The loaf should sound hollow when tapped underneath.", "tip": "Place a small dish of water in the oven for the first 20 minutes to create steam and prevent the crust cracking too early."},
       {"step_number": 6, "instruction": "Remove from tin immediately and cool on a wire rack for at least 3 hours before slicing. Rugbrød improves significantly on day 2."}
     ],
     "tags": ["rye", "norwegian", "dense crumb", "long ferment", "traditional"]
   }',
   12),

  ('dddddddd-0000-0000-0000-000000000002',
   'aaaaaaaa-0000-0000-0000-000000000002',
   'Weekday Open-Crumb Sourdough',
   '500g bread flour, 375g water, 100g starter, 10g salt. Autolyse 30 min, add starter and salt, 4 stretch and folds over 2 hours, shape, cold retard overnight, bake at 250°C in Dutch oven.',
   '{
     "title": "Weekday Open-Crumb Sourdough",
     "description": "A high-hydration country loaf with a wild, open crumb and blistered crust. The overnight cold retard makes this perfect for busy schedules — mix in the evening, bake the next morning.",
     "ingredients": [
       {"amount": "500", "unit": "g", "item": "high-protein bread flour (min. 12% protein)"},
       {"amount": "375", "unit": "g", "item": "water, divided (350g + 25g)"},
       {"amount": "100", "unit": "g", "item": "active sourdough starter, fed 4–8 hours prior"},
       {"amount": "10", "unit": "g", "item": "fine sea salt"}
     ],
     "steps": [
       {"step_number": 1, "instruction": "Mix 500g flour with 350g water until no dry flour remains. Cover and rest for 30–45 minutes (autolyse). This hydrates the flour and begins gluten development without effort.", "tip": "Skip the autolyse if short on time — it helps but is not strictly required."},
       {"step_number": 2, "instruction": "Add 100g active starter and dimple it into the dough. Squeeze through your fingers until fully incorporated (2 minutes). Rest 20 minutes."},
       {"step_number": 3, "instruction": "Dissolve 10g salt in the remaining 25g water and work into the dough. Perform the first set of stretch and folds.", "tip": "Using a little extra water with the salt (bassinage) makes it easier to incorporate without tearing the dough."},
       {"step_number": 4, "instruction": "Perform 3 more sets of stretch and folds every 30 minutes (4 sets total over 2 hours). After the final set, leave the dough undisturbed for the remainder of the bulk ferment."},
       {"step_number": 5, "instruction": "Bulk ferment at 24–26°C for 3–4 hours total (from adding starter), until dough has grown 50–75%, feels airy, and domes when the bowl is tilted."},
       {"step_number": 6, "instruction": "Turn dough onto an unfloured surface, pre-shape into a rough round, rest 20 minutes. Final shape: flip over, fold the sides in, roll towards you to build tension. Place seam-up in a well-floured banneton."},
       {"step_number": 7, "instruction": "Cover with a shower cap or plastic bag and cold-retard in the refrigerator for 8–16 hours.", "tip": "Longer cold retard (up to 48h) deepens the flavour. Score straight from the fridge for sharper ear."},
       {"step_number": 8, "instruction": "Preheat oven with Dutch oven inside to 250°C for 45 minutes. Score, bake lid-on for 20 minutes, remove lid, reduce to 220°C and bake a further 20–25 minutes until deep mahogany brown."}
     ],
     "tags": ["open crumb", "country loaf", "dutch oven", "cold retard", "weekend bake"]
   }',
   28),

  ('dddddddd-0000-0000-0000-000000000003',
   'aaaaaaaa-0000-0000-0000-000000000003',
   'Sourdough Cardamom Buns (Kardemommeboller)',
   'Make an enriched dough with 500g flour, 250ml milk, 75g butter, 80g sugar, 2 eggs, 150g starter. Add 2 tsp cardamom. Bulk 5-6 hours, shape into buns, proof 2-3 hours, bake 200°C 15min.',
   '{
     "title": "Sourdough Cardamom Buns (Kardemommeboller)",
     "description": "Pillowy Norwegian cardamom buns made with sourdough starter instead of commercial yeast. The slow fermentation gives the buns a delicate tang that balances the aromatic cardamom perfectly. A weekend tradition worth the wait.",
     "ingredients": [
       {"amount": "500", "unit": "g", "item": "plain flour (all-purpose)"},
       {"amount": "250", "unit": "ml", "item": "whole milk, lukewarm"},
       {"amount": "75", "unit": "g", "item": "unsalted butter, softened"},
       {"amount": "80", "unit": "g", "item": "caster sugar"},
       {"amount": "2", "unit": "", "item": "large eggs, room temperature"},
       {"amount": "150", "unit": "g", "item": "active sourdough starter (100% hydration)"},
       {"amount": "1", "unit": "tsp", "item": "fine sea salt"},
       {"amount": "2", "unit": "tsp", "item": "freshly ground cardamom (from green pods)"},
       {"amount": "1", "unit": "tbsp", "item": "pearl sugar or crushed sugar, to finish"}
     ],
     "steps": [
       {"step_number": 1, "instruction": "Whisk together milk, eggs, sugar, salt, and cardamom. Add the starter and stir until dissolved. Add flour and mix until a shaggy dough forms. Rest 30 minutes.", "tip": "Freshly ground cardamom from whole green pods is dramatically more fragrant than pre-ground. Worth the extra effort."},
       {"step_number": 2, "instruction": "Add the softened butter in three additions, kneading between each until fully absorbed. Continue kneading for 8–10 minutes until smooth and elastic. The dough will be slightly tacky but should not stick to your hands."},
       {"step_number": 3, "instruction": "Place in a lightly oiled bowl, cover, and bulk ferment at 22–24°C for 5–7 hours, until roughly doubled in size.", "tip": "Enriched doughs ferment more slowly than lean doughs. Be patient — the butter and sugar slow the yeast."},
       {"step_number": 4, "instruction": "Divide into 12 equal pieces (about 90g each). Roll each piece into a smooth ball by cupping your hand and rolling in circles on an unfloured surface. Place on a lined baking tray, spaced 3cm apart."},
       {"step_number": 5, "instruction": "Cover loosely and proof at room temperature for 2–3 hours until puffy and soft. The indentation from a lightly floured finger should spring back slowly.", "tip": "Over-proofed buns will collapse in the oven — better to bake slightly under-proofed."},
       {"step_number": 6, "instruction": "Brush gently with egg wash (1 egg + 1 tbsp milk). Scatter pearl sugar on top. Bake at 200°C for 14–16 minutes until golden brown.", "tip": "Cool for at least 10 minutes before eating — the crumb needs time to set. These are best eaten the same day."}
     ],
     "tags": ["norwegian", "enriched dough", "cardamom", "sweet buns", "weekend baking"]
   }',
   41)
ON CONFLICT (id) DO NOTHING;
