// Sample data for demo — not auto-inserted, use Supabase dashboard

import { Starter, Recipe } from '../lib/types';

// ─── Full Demo Starters (for map display, includes id/created_at/profiles) ────

export const DEMO_STARTERS: Starter[] = [
  {
    id: 'demo-starter-1', owner_id: 'demo-user-1', created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
    name: 'Bergljot', age_days: 2190, hydration_pct: 75,
    description: 'My oldest culture, named after my grandmother. Kept alive since 2018 through two moves. She thrives on whole rye and bread flour, fed every morning. Incredibly active even at low temperatures — the Viking of starters.',
    photo_url: null, location_lat: 59.9139, location_lng: 10.7522, is_available: true,
    profiles: { id: 'demo-user-1', username: 'Lars_M', created_at: '', avatar_url: undefined },
    distance: 0.4,
  },
  {
    id: 'demo-starter-2', owner_id: 'demo-user-2', created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    name: 'Seoulmate', age_days: 547, hydration_pct: 100,
    description: 'A 100% hydration liquid levain from a Seoul baking workshop. Ferments fast with a mild, sweet tang. Perfect for Korean-style milk breads and soft sandwich loaves.',
    photo_url: null, location_lat: 59.9256, location_lng: 10.7182, is_available: true,
    profiles: { id: 'demo-user-2', username: 'Tor_A', created_at: '', avatar_url: undefined },
    distance: 1.2,
  },
  {
    id: 'demo-starter-3', owner_id: 'demo-user-3', created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    name: 'Mjølner', age_days: 365, hydration_pct: 65,
    description: "A stiff rye starter — 65% hydration — named after Thor's hammer. Hits hard and lifts anything. Used exclusively for dark Scandinavian bread. Almost impossible to kill.",
    photo_url: null, location_lat: 59.9405, location_lng: 10.6935, is_available: true,
    profiles: { id: 'demo-user-3', username: 'Kari_T', created_at: '', avatar_url: undefined },
    distance: 2.1,
  },
  {
    id: 'demo-starter-4', owner_id: 'demo-user-4', created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
    name: 'Fjordkanten', age_days: 912, hydration_pct: 80,
    description: 'High-hydration wheat starter with western Norway roots. Cultivated on mountain spring water — bright, clean acidity with floral notes. Exceptional for open-crumb loaves.',
    photo_url: null, location_lat: 59.9312, location_lng: 10.7641, is_available: true,
    profiles: { id: 'demo-user-4', username: 'Ole_J', created_at: '', avatar_url: undefined },
    distance: 0.9,
  },
  {
    id: 'demo-starter-5', owner_id: 'demo-user-5', created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    name: 'Solbrød', age_days: 183, hydration_pct: 100,
    description: 'Young but vigorous whole wheat starter named for the golden crumb color. Doubles in under 4 hours in summer. Great for everyday loaves with a mild, nutty flavor.',
    photo_url: null, location_lat: 59.9489, location_lng: 10.7298, is_available: true,
    profiles: { id: 'demo-user-5', username: 'Frida_W', created_at: '', avatar_url: undefined },
    distance: 1.8,
  },
  {
    id: 'demo-starter-6', owner_id: 'demo-user-6', created_at: new Date(Date.now() - 120 * 86400000).toISOString(),
    name: 'Bergen 1984', age_days: 14600, hydration_pct: 70,
    description: '40-year-old Bergen culture. Survived three generations of the Haugen family. Has a deep, almost winey tang unlike any younger starter. Irreplaceable.',
    photo_url: null, location_lat: 59.9070, location_lng: 10.7700, is_available: true,
    profiles: { id: 'demo-user-6', username: 'Bjørn_H', created_at: '', avatar_url: undefined },
    distance: 2.5,
  },
  {
    id: 'demo-starter-7', owner_id: 'demo-user-7', created_at: new Date(Date.now() - 55 * 86400000).toISOString(),
    name: 'Grüner', age_days: 410, hydration_pct: 90,
    description: 'Born in Grünerløkka — the baker\'s neighborhood. High hydration, very active, slightly tangy. Perfect for sourdough focaccia and pizza dough.',
    photo_url: null, location_lat: 59.9290, location_lng: 10.7550, is_available: true,
    profiles: { id: 'demo-user-7', username: 'Emma_S', created_at: '', avatar_url: undefined },
    distance: 1.1,
  },
  {
    id: 'demo-starter-8', owner_id: 'demo-user-8', created_at: new Date(Date.now() - 80 * 86400000).toISOString(),
    name: 'Nordic Wild', age_days: 730, hydration_pct: 85,
    description: 'A blend of spelt, emmer, and rye — ancient grains from a farm in Valdres. Nutty, slightly sweet, utterly unique. No other culture tastes similar.',
    photo_url: null, location_lat: 59.9380, location_lng: 10.6800, is_available: true,
    profiles: { id: 'demo-user-8', username: 'Magnus_C', created_at: '', avatar_url: undefined },
    distance: 2.8,
  },
  {
    id: 'demo-starter-9', owner_id: 'demo-user-9', created_at: new Date(Date.now() - 200 * 86400000).toISOString(),
    name: 'Trondheim Dark', age_days: 5475, hydration_pct: 68,
    description: 'From an old konditor in Midtbyen Trondheim — 15+ years old. Ferments slowly for a deep, caramel-like flavor. Perfect for long cold retards.',
    photo_url: null, location_lat: 59.9010, location_lng: 10.7350, is_available: true,
    profiles: { id: 'demo-user-9', username: 'Kristoffer_B', created_at: '', avatar_url: undefined },
    distance: 3.5,
  },
  {
    id: 'demo-starter-10', owner_id: 'demo-user-10', created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    name: 'Hokkaido', age_days: 300, hydration_pct: 100,
    description: 'Brought from a Japanese baking class in Hokkaido. Incredibly mild, almost sweet. Makes the fluffiest shokupan and tangzhong milk bread.',
    photo_url: null, location_lat: 59.9330, location_lng: 10.7250, is_available: true,
    profiles: { id: 'demo-user-10', username: 'Ji_Yeon_P', created_at: '', avatar_url: undefined },
    distance: 0.6,
  },
];

// ─── Sample Starters ──────────────────────────────────────────────────────────

export const SAMPLE_STARTERS: Omit<Starter, 'id' | 'created_at' | 'profiles'>[] = [
  {
    owner_id: 'demo-user-1',
    name: 'Bergljot',
    age_days: 2190, // ~6 years
    hydration_pct: 75,
    description:
      'My oldest culture, named after my grandmother. Kept alive since 2018 through two moves. She thrives on a mix of whole rye and bread flour, fed every morning. Incredibly active even at low temperatures — the Viking of starters.',
    photo_url: null,
    location_lat: 59.9139,
    location_lng: 10.7522,
    is_available: true,
  },
  {
    owner_id: 'demo-user-2',
    name: 'Seoulmate',
    age_days: 547, // ~1.5 years
    hydration_pct: 100,
    description:
      'A 100% hydration liquid levain I brought back from a baking workshop in Seoul. Ferments beautifully fast and produces a mild, slightly sweet tang. Perfect for Korean-style milk breads and soft sandwich loaves.',
    photo_url: null,
    location_lat: 59.9256,
    location_lng: 10.7182,
    is_available: true,
  },
  {
    owner_id: 'demo-user-3',
    name: 'Mjølner',
    age_days: 365,
    hydration_pct: 65,
    description:
      'A stiff rye starter — 65% hydration — named after Thor\'s hammer because it hits hard and lifts anything. I use it exclusively for dark Scandinavian bread: rugbrød, knekkebrød, and dark Nordic loaves. Very forgiving and almost impossible to kill.',
    photo_url: null,
    location_lat: 59.9405,
    location_lng: 10.6935,
    is_available: true,
  },
  {
    owner_id: 'demo-user-4',
    name: 'Fjordkanten',
    age_days: 912,
    hydration_pct: 80,
    description:
      'A high-hydration wheat starter with roots in western Norway. Originally cultivated on water from a mountain spring — gives a bright, clean acidity with subtle floral notes. Exceptional for open-crumb loaves.',
    photo_url: null,
    location_lat: 59.9312,
    location_lng: 10.7641,
    is_available: true,
  },
  {
    owner_id: 'demo-user-5',
    name: 'Solbrød',
    age_days: 183,
    hydration_pct: 100,
    description:
      'A young but vigorous whole wheat starter — named for the golden color of its crumb. Incredibly active and doubles in under 4 hours in summer. Great for everyday loaves with a mild, nutty flavor.',
    photo_url: null,
    location_lat: 59.9489,
    location_lng: 10.7298,
    is_available: true,
  },
];

// ─── Sample Recipes ───────────────────────────────────────────────────────────

export const SAMPLE_RECIPES: any[] = [
  {
    id: 'demo-recipe-1',
    author_id: 'demo-user-1',
    title: 'Nordic Dark Rye (Rugbrød)',
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    profiles: { username: 'Bergljot_Baker', avatar_url: null },
    original_text:
      'Mix 200g rye starter with 300g dark rye flour, 200g bread flour, 500ml water, 12g salt. Add sunflower seeds and flaxseed. Mix well. Rest 1 hour. Pour into loaf tin. Proof 8–12 hours overnight. Bake at 200°C for 60 minutes covered, 15 uncovered.',
    likes_count: 47,
    photo_urls: [],
    enhanced_json: {
      title: 'Nordic Dark Rye (Rugbrød)',
      description:
        'A dense, deeply flavored Scandinavian rye loaf with a satisfying chew and complex, slightly sour tang. This recipe uses a 100% rye starter for authenticity and an overnight proof for maximum flavor development. Excellent sliced thin with butter and cured fish.',
      ingredients: [
        { amount: '200', unit: 'g', item: 'active rye sourdough starter (100% hydration)' },
        { amount: '300', unit: 'g', item: 'dark rye flour' },
        { amount: '200', unit: 'g', item: 'strong bread flour' },
        { amount: '500', unit: 'ml', item: 'warm water (30–35°C)' },
        { amount: '12', unit: 'g', item: 'fine sea salt' },
        { amount: '80', unit: 'g', item: 'sunflower seeds' },
        { amount: '40', unit: 'g', item: 'whole flaxseed' },
      ],
      steps: [
        {
          step_number: 1,
          instruction: 'Combine the rye starter with warm water in a large bowl and whisk until fully dissolved.',
          tip: 'Your starter should be fed 4–6 hours before mixing and at peak activity — it should float in water.',
        },
        {
          step_number: 2,
          instruction: 'Add both flours and salt. Mix with a sturdy spatula until no dry flour remains. Fold in sunflower seeds and flaxseed.',
          tip: 'Rye dough is more batter-like than wheat dough — this is normal. Do not over-knead.',
        },
        {
          step_number: 3,
          instruction: 'Cover and rest at room temperature for 1 hour, then transfer to a well-oiled 900g loaf tin.',
        },
        {
          step_number: 4,
          instruction: 'Smooth the top with a wet spatula. Cover with oiled cling film or a damp cloth and proof at room temperature for 8–12 hours (overnight is ideal).',
          tip: 'The dough is ready when it has risen to just below the rim of the tin and shows small bubbles on the surface.',
        },
        {
          step_number: 5,
          instruction: 'Preheat oven to 200°C (fan). Bake covered with foil for 60 minutes, then remove foil and bake a further 15 minutes until the loaf has a deep brown crust and internal temperature reads 96–98°C.',
        },
        {
          step_number: 6,
          instruction: 'Cool completely on a wire rack — at least 2 hours — before slicing. The crust will soften as it cools.',
          tip: 'Rugbrød tastes best on day 2 or 3. Wrap tightly in a cloth or beeswax wrap and store at room temperature for up to 5 days.',
        },
      ],
      tags: ['rye', 'nordic', 'scandinavian', 'dark bread', 'rugbrød', 'overnight', 'seeds'],
    },
  },
  {
    id: 'demo-recipe-2',
    author_id: 'demo-user-2',
    title: 'Open-Crumb Country Sourdough',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    profiles: { username: 'Seoulmate_Sourdough', avatar_url: null },
    original_text:
      'Autolyse 450g bread flour + 50g whole wheat + 370ml water 1hr. Add 100g starter + 10g salt dissolved in 20ml water. Stretch and fold every 30min x4. Bulk 4hrs at 24C. Pre-shape, bench rest 30min. Final shape. Cold proof overnight. Bake in Dutch oven 250C 20min lid on, 25min lid off.',
    likes_count: 83,
    photo_urls: [],
    enhanced_json: {
      title: 'Open-Crumb Country Sourdough',
      description:
        'A beautiful, golden-crusted country loaf with a dramatically open, irregular crumb. This recipe uses the autolyse method for superior gluten development and a cold retard to build complex flavors. The result is crackling crust, chewy crumb, and a mild, balanced tang — the ideal everyday sourdough.',
      ingredients: [
        { amount: '450', unit: 'g', item: 'strong white bread flour (12%+ protein)' },
        { amount: '50', unit: 'g', item: 'whole wheat flour' },
        { amount: '370', unit: 'ml', item: 'water, divided: 350ml + 20ml' },
        { amount: '100', unit: 'g', item: 'active sourdough starter (100% hydration)' },
        { amount: '10', unit: 'g', item: 'fine sea salt' },
      ],
      steps: [
        {
          step_number: 1,
          instruction: 'Autolyse: Mix both flours with 350ml water until no dry flour remains. Cover and rest 1 hour at room temperature.',
          tip: 'Autolyse pre-hydrates the flour and begins gluten development before the starter and salt are added — this is what creates an extensible, open dough.',
        },
        {
          step_number: 2,
          instruction: 'Dissolve salt in the remaining 20ml water. Add starter to the autolyse dough and squish together with your fingers until incorporated, then pour in the salt water and mix until combined.',
        },
        {
          step_number: 3,
          instruction: 'Perform 4 sets of stretch-and-folds over the first 2 hours of bulk fermentation, spaced 30 minutes apart. After the 4th set, leave the dough undisturbed.',
          tip: 'For each set: grab the dough from one side, stretch it up as high as it will go without tearing, then fold it over to the opposite side. Rotate 90° and repeat 4 times.',
        },
        {
          step_number: 4,
          instruction: 'Continue bulk fermentation for a further 2 hours (4 hours total at ~24°C). The dough is ready when it is 50–75% larger, domed on top, and jiggles like jelly when shaken.',
        },
        {
          step_number: 5,
          instruction: 'Pre-shape: Turn dough onto an unfloured surface. Fold edges toward center, then flip seam-side down and drag toward you to build tension. Rest uncovered 30 minutes.',
        },
        {
          step_number: 6,
          instruction: 'Final shape: Flip dough, fold like a letter, then roll into a tight ball. Place seam-side up into a well-floured banneton. Cover and refrigerate overnight (8–16 hours).',
          tip: 'Dust the banneton generously with rice flour — it absorbs no moisture and releases the dough cleanly.',
        },
        {
          step_number: 7,
          instruction: 'Preheat oven with Dutch oven inside to 250°C for at least 45 minutes. Turn cold dough onto parchment, score with a confident single slash, lower into Dutch oven. Bake 20 minutes lid on, then 20–25 minutes lid off until deeply golden.',
          tip: 'Baking from cold is fine — the thermal shock actually helps oven spring. Score immediately before loading.',
        },
      ],
      tags: ['open crumb', 'country loaf', 'dutch oven', 'autolyse', 'cold proof', 'artisan'],
    },
  },
  {
    id: 'demo-recipe-3',
    author_id: 'demo-user-2',
    title: 'Korean Tangzhong Milk Bread (식빵)',
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    profiles: { username: 'Seoulmate_Sourdough', avatar_url: null },
    original_text:
      'Make tangzhong: 25g flour + 125ml milk, cook until thick paste. Combine 300g bread flour, 40g sugar, 6g salt, 1 egg, 120ml warm milk, 80g active starter, tangzhong. Knead 12 min. Add 40g softened butter, knead 8 min more. Bulk 4hrs. Shape into 4 rolls in loaf tin. Proof 4hrs. Brush with egg wash. Bake 180C 30min.',
    likes_count: 124,
    photo_urls: [],
    enhanced_json: {
      title: 'Korean Tangzhong Milk Bread (식빵)',
      description:
        'Cloud-soft Korean shokupan with a sourdough twist — impossibly pillowy crumb achieved through the tangzhong technique combined with a long, slow sourdough ferment. Mildly sweet, lightly tangy, and pulls apart in silky sheets. A perfect fusion of Nordic patience and Korean pastry tradition.',
      ingredients: [
        { amount: '25', unit: 'g', item: 'bread flour (for tangzhong)' },
        { amount: '125', unit: 'ml', item: 'whole milk (for tangzhong)' },
        { amount: '300', unit: 'g', item: 'bread flour' },
        { amount: '40', unit: 'g', item: 'caster sugar' },
        { amount: '6', unit: 'g', item: 'fine sea salt' },
        { amount: '1', unit: 'large', item: 'egg, lightly beaten' },
        { amount: '120', unit: 'ml', item: 'warm whole milk (38°C)' },
        { amount: '80', unit: 'g', item: 'active liquid sourdough starter (100% hydration)' },
        { amount: '40', unit: 'g', item: 'unsalted butter, softened to room temperature' },
        { amount: '1', unit: '', item: 'egg yolk + 1 tbsp milk (for egg wash)' },
      ],
      steps: [
        {
          step_number: 1,
          instruction: 'Make tangzhong: Whisk 25g flour with 125ml cold milk in a small saucepan. Cook over medium heat, stirring constantly, until the mixture thickens to a paste that holds a line when dragged across the bottom. Remove from heat and cool to room temperature.',
          tip: 'The tangzhong is ready at about 65°C. It pre-gelatinizes the starch, locking in moisture for that signature pillowy texture.',
        },
        {
          step_number: 2,
          instruction: 'In a large bowl, combine flour, sugar, and salt. Add the cooled tangzhong, egg, warm milk, and starter. Mix until a shaggy dough forms, then knead by hand or with a dough hook for 12 minutes until smooth and slightly tacky.',
        },
        {
          step_number: 3,
          instruction: 'Add the softened butter in small pieces. Knead for a further 8 minutes until the butter is fully incorporated and the dough passes the windowpane test — it should stretch thin without tearing.',
          tip: 'The dough will feel greasy at first as you add the butter. Keep going — it will come together into a silky, elastic ball.',
        },
        {
          step_number: 4,
          instruction: 'Cover and bulk ferment at 24–26°C for 4–5 hours, until the dough has grown by 50–60% and feels light and airy.',
        },
        {
          step_number: 5,
          instruction: 'Turn dough onto a lightly floured surface. Divide into 4 equal pieces (~160g each). Flatten each piece, roll into a log shape, and arrange side by side in a buttered 900g loaf tin.',
        },
        {
          step_number: 6,
          instruction: 'Cover with plastic wrap and proof at room temperature for 3–4 hours, until the dough domes about 2cm above the rim of the tin.',
          tip: 'For an even fluffier result, cold-proof in the fridge overnight after shaping, then bring to room temperature for 1–2 hours before baking.',
        },
        {
          step_number: 7,
          instruction: 'Preheat oven to 180°C. Brush the top gently with egg wash. Bake for 28–32 minutes until deep golden brown. Cool in the tin for 10 minutes, then on a rack for at least 30 minutes before slicing.',
          tip: 'The bread is done when an internal thermometer reads 92–95°C. The top should sound hollow when tapped.',
        },
      ],
      tags: ['korean', 'milk bread', 'tangzhong', 'shokupan', 'soft bread', 'enriched', 'pullman'],
    },
  },
  {
    id: 'demo-recipe-4',
    author_id: 'demo-user-3',
    title: 'Knekkebrød (Sourdough Crispbread)',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    profiles: { username: 'Mjolner_Dark', avatar_url: null },
    original_text:
      'Mix 150g rye starter with 100g rye flour, 50g oat flour, 1 tbsp chia seeds, 1 tbsp sesame, 1 tbsp sunflower, 1 tbsp pumpkin seeds, 1 tsp salt, 50ml water. Spread thin on baking paper. Score into rectangles. Dry at 160°C for 40min, flip, 20min more until completely dry and crisp.',
    likes_count: 61,
    photo_urls: [],
    enhanced_json: {
      title: 'Knekkebrød (Sourdough Crispbread)',
      description:
        'Ultra-thin, shatteringly crisp Norwegian crispbread packed with seeds and the deep, tangy complexity of rye sourdough. This fermented version beats any shop-bought knekkebrød — better flavor, better crunch, and keeps for weeks in a tin. Perfect with brunost, smoked salmon, or aged cheese.',
      ingredients: [
        { amount: '150', unit: 'g', item: 'rye sourdough starter (100% hydration)' },
        { amount: '100', unit: 'g', item: 'dark rye flour' },
        { amount: '50', unit: 'g', item: 'oat flour (or finely ground rolled oats)' },
        { amount: '1', unit: 'tbsp', item: 'chia seeds' },
        { amount: '1', unit: 'tbsp', item: 'sesame seeds' },
        { amount: '2', unit: 'tbsp', item: 'sunflower seeds' },
        { amount: '2', unit: 'tbsp', item: 'pumpkin seeds' },
        { amount: '1', unit: 'tsp', item: 'fleur de sel or coarse sea salt' },
        { amount: '1', unit: 'tsp', item: 'caraway seeds (optional, traditional)' },
        { amount: '50', unit: 'ml', item: 'water' },
      ],
      steps: [
        {
          step_number: 1,
          instruction: 'Combine all ingredients in a bowl and mix until a thick, sticky batter forms. If too stiff to spread, add water a teaspoon at a time. The batter should be spreadable but not liquid.',
        },
        {
          step_number: 2,
          instruction: 'Divide between two sheets of baking paper. Place another sheet on top of each portion and use a rolling pin to roll as thin as possible — aim for 2–3mm. The thinner the crispier.',
          tip: 'Wetting the rolling pin slightly prevents sticking. An offset spatula also helps spread the edges evenly.',
        },
        {
          step_number: 3,
          instruction: 'Remove the top baking paper. Score into rectangles (roughly 8 x 5cm) with a pizza wheel or sharp knife. Sprinkle with a pinch of extra fleur de sel.',
        },
        {
          step_number: 4,
          instruction: 'Bake at 160°C (fan) for 35–40 minutes. Carefully flip the large sheet over, peel back the baking paper, and bake a further 15–20 minutes until completely dry, crisp, and lightly golden at the edges.',
          tip: 'Every oven is different — the knekkebrød is done when it breaks cleanly with a sharp snap. If it bends, it needs more time. Check from the edges inward.',
        },
        {
          step_number: 5,
          instruction: 'Cool completely on a wire rack. Break into individual crackers along the scored lines. Store in an airtight tin at room temperature — they keep perfectly for 3–4 weeks.',
        },
      ],
      tags: ['crispbread', 'knekkebrød', 'rye', 'seeds', 'nordic', 'no-knead', 'long-life'],
    },
  },
  {
    id: 'demo-recipe-5',
    author_id: 'demo-user-1',
    title: 'Kanelsnurrer (Sourdough Cinnamon Rolls)',
    created_at: new Date(Date.now() - 2.5 * 86400000).toISOString(),
    profiles: { username: 'Bergljot_Baker', avatar_url: null },
    original_text:
      'Enrich 400g bread flour with 2 eggs, 60g sugar, 8g salt, 200ml warm milk, 100g starter. Knead 10min. Add 60g butter. Knead 8min. Bulk 5hrs. Roll to rectangle. Spread filling: 80g softened butter, 100g brown sugar, 3 tsp cinnamon, 1 tsp cardamom. Roll up, slice into 12. Proof 3hrs. Bake 190C 18min.',
    likes_count: 152,
    photo_urls: [],
    enhanced_json: {
      title: 'Kanelsnurrer (Sourdough Cinnamon Rolls)',
      description:
        'Norwegian cinnamon rolls elevated by sourdough — the long ferment adds a subtle tang that cuts through the rich buttery filling and makes the cardamom sing. These are pillowy, pull-apart beautiful, and fill the kitchen with the most intoxicating smell. A Norwegian bakery staple, made extraordinary at home.',
      ingredients: [
        { amount: '400', unit: 'g', item: 'strong bread flour' },
        { amount: '2', unit: 'large', item: 'eggs, beaten' },
        { amount: '60', unit: 'g', item: 'caster sugar' },
        { amount: '8', unit: 'g', item: 'fine sea salt' },
        { amount: '200', unit: 'ml', item: 'whole milk, warmed to 38°C' },
        { amount: '100', unit: 'g', item: 'active sourdough starter (100% hydration)' },
        { amount: '60', unit: 'g', item: 'unsalted butter, softened (for dough)' },
        { amount: '80', unit: 'g', item: 'unsalted butter, very soft (for filling)' },
        { amount: '100', unit: 'g', item: 'light brown sugar (for filling)' },
        { amount: '3', unit: 'tsp', item: 'ground cinnamon (for filling)' },
        { amount: '1.5', unit: 'tsp', item: 'ground cardamom (for filling)' },
        { amount: '1', unit: 'pinch', item: 'fleur de sel (for filling)' },
      ],
      steps: [
        {
          step_number: 1,
          instruction: 'In a large bowl, combine flour, sugar, and salt. Add eggs, warm milk, and starter. Mix to a shaggy dough, then knead for 10 minutes until smooth.',
        },
        {
          step_number: 2,
          instruction: 'Add softened butter in small pieces and knead for a further 8 minutes until fully incorporated and the dough is silky and passes the windowpane test. Cover and bulk ferment at 24°C for 4–5 hours.',
          tip: 'A long bulk in a warm kitchen (24–26°C) gives the best results. The dough should feel light and pillowy when ready — don\'t rush it.',
        },
        {
          step_number: 3,
          instruction: 'Make the filling: Beat together the soft butter, brown sugar, cinnamon, cardamom, and a pinch of fleur de sel until a smooth, spreadable paste forms.',
        },
        {
          step_number: 4,
          instruction: 'On a lightly floured surface, roll the dough into a large rectangle approximately 40 x 30cm. Spread the filling evenly to the edges. Roll up tightly from the long side into a log.',
          tip: 'Chill the log for 20 minutes in the fridge before slicing — it firms up slightly and gives cleaner cuts.',
        },
        {
          step_number: 5,
          instruction: 'Slice into 12 equal pieces (~3.5cm thick). Arrange in a buttered baking dish (or on lined trays with space between). Proof at room temperature for 2–3 hours until puffed and touching.',
        },
        {
          step_number: 6,
          instruction: 'Preheat oven to 190°C. Brush rolls with milk or egg wash. Bake 17–20 minutes until golden brown. Cool for 10 minutes. Dust with pearl sugar or drizzle with cardamom glaze.',
          tip: 'For pearl sugar: press Scandinavian pearl sugar onto rolls immediately after baking while still warm. For glaze: whisk 100g icing sugar with 2 tbsp cream and a pinch of cardamom.',
        },
      ],
      tags: ['cinnamon', 'kanelsnurrer', 'cardamom', 'enriched', 'rolls', 'norwegian', 'pastry'],
    },
  },
  {
    id: 'demo-recipe-6',
    author_id: 'demo-user-4',
    title: 'San Francisco Style Sourdough',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    profiles: { username: 'Fjordkanten_Baker', avatar_url: null },
    original_text:
      'High hydration: 500g flour, 390ml water, 100g 100% starter, 10g salt. Autolyse 30min. Bassinage to incorporate starter and salt. 4 stretch folds. 3 lamination. Long bulk 5-6hrs 22C. Divide, pre-shape, 30min rest. Final shape, flour banneton well. Cold retard 16-24hrs fridge. Bake 260C Dutch oven 20min lid, 25min off.',
    likes_count: 98,
    photo_urls: [],
    enhanced_json: {
      title: 'San Francisco Style Sourdough',
      description:
        'The gold standard of sourdough bread — a crackling, caramelized crust with complex, assertive acidity and a honeycomb crumb full of irregular holes. Built for maximum tang through an extended cold retard, this is the loaf that started a global bread revival. Best eaten same day, standing over the kitchen counter.',
      ingredients: [
        { amount: '500', unit: 'g', item: 'strong white bread flour (13%+ protein)' },
        { amount: '375', unit: 'ml', item: 'cool water (25°C), plus extra for bassinage' },
        { amount: '100', unit: 'g', item: 'active sourdough starter (100% hydration, peaked)' },
        { amount: '10', unit: 'g', item: 'fine sea salt' },
      ],
      steps: [
        {
          step_number: 1,
          instruction: 'Autolyse: Combine flour and 350ml water. Mix until no dry flour remains. Cover and rest 30–45 minutes.',
        },
        {
          step_number: 2,
          instruction: 'Bassinage: Add starter by squeezing it through the dough. Gradually work in the salt dissolved in the remaining water, adding it slowly — this is bassinage. Mix vigorously for 3–5 minutes.',
          tip: 'Cool water (25°C) slows fermentation and builds better acidity over the long bulk. This is the key to genuine SF tang.',
        },
        {
          step_number: 3,
          instruction: 'Perform 4 sets of stretch-and-folds in the first 2 hours, then 1 set of lamination on a wet surface: stretch the dough into a thin sheet, fold from all sides, then roll into a ball. Rest undisturbed for the remaining bulk.',
        },
        {
          step_number: 4,
          instruction: 'Bulk ferment at ~22°C for 5–6 hours total until 50–60% increase, the dough is domed, pulls cleanly from the bowl walls, and jiggles cohesively.',
        },
        {
          step_number: 5,
          instruction: 'Pre-shape into a round on an unfloured surface using a bench scraper. Rest uncovered 30–45 minutes until the surface looks slightly dull and a small skin forms.',
        },
        {
          step_number: 6,
          instruction: 'Final shape: Flip, perform a letter fold, then roll into a tight boule, building strong surface tension. Place seam-side up into a heavily rice-floured banneton. Cover and refrigerate 16–24 hours.',
          tip: 'The long cold retard (up to 24 hours) is what builds maximum acidity. Try to let it go the full time if you can plan ahead.',
        },
        {
          step_number: 7,
          instruction: 'Preheat oven with Dutch oven to 260°C for 1 hour. Turn dough directly onto parchment, score with a razor blade at 45°, drop into Dutch oven. Bake 20 minutes lid on, 20–25 minutes lid off. Cool 2 hours before cutting.',
        },
      ],
      tags: ['san francisco', 'high hydration', 'sourdough', 'cold retard', 'boule', 'artisan', 'tangy'],
    },
  },
  {
    id: 'demo-recipe-7',
    author_id: 'demo-user-5',
    title: 'Whole Wheat Honey Sourdough',
    created_at: new Date(Date.now() - 1.5 * 86400000).toISOString(),
    profiles: { username: 'Solbrod_Oslo', avatar_url: null },
    original_text:
      'Combine 350g whole wheat, 150g bread flour, 380ml water, 100g starter, 25g honey, 10g salt. Rest 1hr. Fold every 45min x4. Bulk 5hrs. Shape round. Cold proof overnight. Bake 240C Dutch oven 20+20min.',
    likes_count: 74,
    photo_urls: [],
    enhanced_json: {
      title: 'Whole Wheat Honey Sourdough',
      description:
        'A wholesome, fragrant loaf that balances the earthiness of whole wheat with a touch of wildflower honey — and sourdough tang that ties it all together. Excellent sandwich bread, sublime with salted butter, and deeply satisfying in a way that white bread cannot match. Approachable for newer bakers.',
      ingredients: [
        { amount: '350', unit: 'g', item: 'stoneground whole wheat flour' },
        { amount: '150', unit: 'g', item: 'strong white bread flour' },
        { amount: '380', unit: 'ml', item: 'warm water (32°C)' },
        { amount: '100', unit: 'g', item: 'active sourdough starter (100% hydration)' },
        { amount: '25', unit: 'g', item: 'raw wildflower honey' },
        { amount: '10', unit: 'g', item: 'fine sea salt' },
      ],
      steps: [
        {
          step_number: 1,
          instruction: 'Combine flours with 350ml of the water. Mix thoroughly and autolyse for 45 minutes. The whole wheat will absorb water quickly and the dough will feel denser than a white dough.',
          tip: 'Whole wheat flour is thirsty — using warm water (32°C) helps hydration and speeds the ferment to compensate for the slower-fermenting bran particles.',
        },
        {
          step_number: 2,
          instruction: 'Add starter, honey, salt, and the remaining 30ml water. Squish and fold until everything is incorporated. The dough will be sticky and quite firm — this is correct.',
        },
        {
          step_number: 3,
          instruction: 'Perform 4 sets of stretch-and-folds over 3 hours, spaced ~45 minutes apart. After each set, the dough will become notably smoother and more cohesive.',
        },
        {
          step_number: 4,
          instruction: 'Bulk ferment for a further 2 hours (5 hours total). Whole wheat ferments faster than white flour — watch the dough rather than the clock.',
          tip: 'Look for a 40–50% volume increase and a slightly domed top with visible bubbles near the surface. Whole wheat loaves typically ferment 20–30% faster.',
        },
        {
          step_number: 5,
          instruction: 'Shape into a round boule with good tension. Place seam-side up into a floured banneton. Refrigerate overnight (8–14 hours).',
        },
        {
          step_number: 6,
          instruction: 'Preheat oven and Dutch oven to 240°C for 45 minutes. Score with a cross or single slash, bake 20 minutes lid on, then 18–22 minutes lid off until the crust is a rich mahogany brown.',
        },
      ],
      tags: ['whole wheat', 'honey', 'wholesome', 'everyday', 'healthy', 'boule', 'beginner-friendly'],
    },
  },
  {
    id: 'demo-recipe-8',
    author_id: 'demo-user-3',
    title: 'Sourdough Focaccia with Rosemary & Sea Salt',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    profiles: { username: 'Mjolner_Dark', avatar_url: null },
    original_text:
      'Mix 500g flour, 425ml water, 100g starter, 10g salt. Coil fold x4. Add 50ml olive oil gradually during folds. Refrigerate overnight. Next day pour into oiled pan, dimple generously, top with rosemary, coarse salt, cherry tomatoes. Proof 2-4hrs at room temp. Bake 220C 25-30min golden.',
    likes_count: 189,
    photo_urls: [],
    enhanced_json: {
      title: 'Sourdough Focaccia with Rosemary & Sea Salt',
      description:
        'Pillowy, golden-bottomed focaccia with crispy edges, a wildly open crumb, and those iconic dimples pooled with olive oil. The sourdough ferment — especially the cold overnight rest — adds a depth of flavor that sets this apart from quick-yeast versions. Topped with rosemary, fleur de sel, and blistered cherry tomatoes, it is embarrassingly good.',
      ingredients: [
        { amount: '500', unit: 'g', item: 'bread flour (or 00 flour for extra tenderness)' },
        { amount: '425', unit: 'ml', item: 'warm water (30°C)' },
        { amount: '100', unit: 'g', item: 'active sourdough starter (100% hydration)' },
        { amount: '10', unit: 'g', item: 'fine sea salt' },
        { amount: '80', unit: 'ml', item: 'good extra-virgin olive oil, divided' },
        { amount: '4', unit: 'sprigs', item: 'fresh rosemary' },
        { amount: '200', unit: 'g', item: 'cherry tomatoes, halved (optional)' },
        { amount: '1', unit: 'tbsp', item: 'fleur de sel or Maldon sea salt' },
      ],
      steps: [
        {
          step_number: 1,
          instruction: 'Combine flour, water, and starter. Mix until a shaggy dough forms. Cover and rest 30 minutes. Add salt and mix well. Perform first coil fold.',
          tip: 'Coil folds for focaccia: wet your hand, reach under the dough from one side, lift the center, and fold it over itself. Rotate 90° and repeat 4 times. This method preserves the open structure.',
        },
        {
          step_number: 2,
          instruction: 'During the next 2 hours, perform 3 more coil folds spaced 30 minutes apart. After the 2nd fold, pour 2 tablespoons of olive oil around the edges of the bowl and let it gradually absorb.',
        },
        {
          step_number: 3,
          instruction: 'After 4 folds total (about 2.5 hours bulk), cover tightly and refrigerate overnight — at least 12 hours, up to 24 hours. The cold retard builds remarkable flavor.',
        },
        {
          step_number: 4,
          instruction: 'Pour 3 tablespoons of olive oil into a large baking pan (30 x 40cm). Gently transfer the cold dough into the pan — don\'t deflate it. Drizzle with 2 more tablespoons oil. Let come to room temperature and relax for 2–3 hours.',
          tip: 'Don\'t rush this step — the dough needs to relax fully before dimpling or it will spring back. Be patient. The longer it relaxes at room temperature, the better the open crumb.',
        },
        {
          step_number: 5,
          instruction: 'With oiled fingers, press deep dimples all across the surface — really go for it, right to the bottom of the pan. Scatter rosemary leaves, press in cherry tomatoes (cut-side down), and finish with generous fleur de sel.',
        },
        {
          step_number: 6,
          instruction: 'Proof for a further 45–60 minutes until visibly puffed. Preheat oven to 220°C. Drizzle with the remaining olive oil and bake for 25–30 minutes until deeply golden on top and the underside is crispy (lift a corner to check). Cool 15 minutes before cutting.',
        },
      ],
      tags: ['focaccia', 'italian', 'olive oil', 'rosemary', 'flatbread', 'crowd-pleaser', 'beginner-friendly'],
    },
  },
  {
    id: 'demo-recipe-9',
    author_id: 'demo-user-4',
    title: 'Dark Chocolate & Orange Sourdough',
    created_at: new Date(Date.now() - 0.5 * 86400000).toISOString(),
    profiles: { username: 'Fjordkanten_Baker', avatar_url: null },
    original_text:
      'Standard loaf dough: 450g flour, 350ml water, 90g starter, 9g salt. After first fold, add 100g 70% dark chocolate chips and zest of 2 oranges. 4 folds total. Bulk 4-5hrs. Shape, cold proof 10hrs. Bake 240C Dutch oven 20+20min. The chocolate melts into pools and the orange perfumes the entire loaf.',
    likes_count: 211,
    photo_urls: [],
    enhanced_json: {
      title: 'Dark Chocolate & Orange Sourdough',
      description:
        'A showstopping celebration loaf — jet-black pools of melted 70% chocolate wound through a golden, tangy crumb, lifted by the bright perfume of orange zest. The sourdough tang cuts through the richness brilliantly. This is the bread that converts non-believers, the loaf you bring to dinner parties, the recipe everyone asks for.',
      ingredients: [
        { amount: '450', unit: 'g', item: 'strong white bread flour' },
        { amount: '350', unit: 'ml', item: 'warm water (30°C)' },
        { amount: '90', unit: 'g', item: 'active sourdough starter (100% hydration)' },
        { amount: '9', unit: 'g', item: 'fine sea salt' },
        { amount: '100', unit: 'g', item: '70% dark chocolate, roughly chopped into chunks' },
        { amount: '2', unit: '', item: 'oranges, zest only (unwaxed)' },
        { amount: '1', unit: 'tbsp', item: 'cocoa powder (optional, for deeper color)' },
      ],
      steps: [
        {
          step_number: 1,
          instruction: 'Combine flour, water, and starter. Mix until no dry flour remains. Rest 30 minutes (autolyse). Add salt and mix thoroughly.',
        },
        {
          step_number: 2,
          instruction: 'Perform first stretch-and-fold. During the second set (30 min later), add the chocolate chunks and orange zest by folding them in gradually — they will incorporate over the next few folds.',
          tip: 'Keep the chocolate cold from the fridge — warmer chocolate melts too quickly and can streak rather than hold its shape as chunks.',
        },
        {
          step_number: 3,
          instruction: 'Perform 2 more sets of stretch-and-folds (4 total) over 2 hours. The dough will feel slightly slippery from the chocolate fat — this is normal. Continue bulk ferment for 2–3 more hours until 50% increase.',
        },
        {
          step_number: 4,
          instruction: 'Pre-shape into a round. Rest 30 minutes. Final shape into a tight boule — be gentle to avoid breaking too many chocolate pockets. Place into a well-floured banneton.',
          tip: 'Score slightly deeper than usual — the chocolate chunks can cause minor tearing at the surface, and a confident deep score guides the expansion beautifully.',
        },
        {
          step_number: 5,
          instruction: 'Cold proof in the fridge for 10–14 hours. The citrus flavor intensifies beautifully during the long retard.',
        },
        {
          step_number: 6,
          instruction: 'Preheat oven and Dutch oven to 240°C for 1 hour. Score confidently. Bake 20 minutes lid on, 20–22 minutes lid off until the crust is very deep mahogany. The chocolate will smell intensely at first — this is correct. Cool at least 1 hour before slicing or the chocolate will pour out.',
        },
      ],
      tags: ['chocolate', 'orange', 'celebration', 'showstopper', 'enriched', 'artisan', 'gifting'],
    },
  },
  {
    id: 'demo-recipe-10',
    author_id: 'demo-user-1',
    title: 'Sourdough Lefse (Norwegian Flatbread)',
    created_at: new Date(Date.now() - 0.25 * 86400000).toISOString(),
    profiles: { username: 'Bergljot_Baker', avatar_url: null },
    original_text:
      'Boil and rice 500g starchy potatoes. Cool completely. Mix with 50g butter, 100ml cream, 1 tsp salt, 1 tsp sugar, 2 tbsp sourdough discard, 200g plain flour. Refrigerate dough 2hrs. Roll paper thin on floured surface. Cook on dry flat griddle/pan 1-2min each side until brown spots appear. Serve with butter and sugar, or brunost.',
    likes_count: 88,
    photo_urls: [],
    enhanced_json: {
      title: 'Sourdough Lefse (Norwegian Flatbread)',
      description:
        'The iconic Norwegian potato flatbread, elevated with sourdough discard for a subtle tang and better texture. Lefse is synonymous with Norwegian Christmas and celebration — soft, paper-thin, pliable, and irresistible spread with salted butter and a sprinkle of sugar. A living piece of Nordic culinary heritage made with your own hands.',
      ingredients: [
        { amount: '500', unit: 'g', item: 'floury starchy potatoes (Asterix, Mandel, or Russet)' },
        { amount: '50', unit: 'g', item: 'unsalted butter, softened' },
        { amount: '100', unit: 'ml', item: 'heavy cream' },
        { amount: '1', unit: 'tsp', item: 'fine sea salt' },
        { amount: '1', unit: 'tsp', item: 'sugar' },
        { amount: '60', unit: 'g', item: 'sourdough discard (unfed starter)' },
        { amount: '200', unit: 'g', item: 'plain flour (all-purpose), plus extra for rolling' },
        { amount: '', unit: '', item: 'salted butter and caster sugar to serve' },
      ],
      steps: [
        {
          step_number: 1,
          instruction: 'Peel, cube, and boil potatoes until completely tender. Drain very well and pass through a potato ricer — do not mash. Spread the riced potato on a clean surface and allow to cool completely to room temperature. Any warmth will melt the butter and ruin the texture.',
          tip: 'Use the driest, starchiest potatoes you can find. Waxy salad potatoes will make the lefse gummy. Drying the riced potato well is the most important step — moisture is the enemy of a thin, crisp lefse.',
        },
        {
          step_number: 2,
          instruction: 'Combine the cooled potato with butter, cream, salt, sugar, and sourdough discard. Mix until smooth. Gradually work in the flour until a soft, pliable dough forms. It should not be sticky — add flour a tablespoon at a time if needed.',
        },
        {
          step_number: 3,
          instruction: 'Wrap the dough and refrigerate for at least 2 hours (overnight is ideal). The cold firms the butter and makes the dough much easier to roll paper-thin.',
        },
        {
          step_number: 4,
          instruction: 'Divide dough into balls the size of a golf ball (~40g). On a well-floured surface, roll each ball out as thin as humanly possible — 1–2mm. A lefse stick (or thin dowel) is traditional, but a standard rolling pin works.',
          tip: 'The thinner, the better — authentic lefse is almost translucent. Keep flouring generously and use a thin palette knife to move the lefse to the pan without tearing.',
        },
        {
          step_number: 5,
          instruction: 'Cook on a completely dry (no oil or butter), very hot flat griddle or heavy skillet over medium-high heat. Cook 60–90 seconds per side until light brown spots appear. The lefse should look dry with scattered golden patches. Remove and stack between clean cloths to keep pliable.',
        },
        {
          step_number: 6,
          instruction: 'Serve immediately with generous salted butter spread to the edges, a sprinkle of sugar, and roll up. Alternatively, serve with brunost (brown cheese), smoked salmon, or — for the traditionalist — nothing at all.',
          tip: 'Lefse can be made ahead and reheated in a dry pan for 30 seconds. Store uncooked between baking paper in the fridge for up to 3 days.',
        },
      ],
      tags: ['lefse', 'norwegian', 'potato', 'flatbread', 'discard', 'christmas', 'traditional'],
    },
  },
];

// ─── Demo Recipe Comments ─────────────────────────────────────────────────────

export const DEMO_COMMENTS: Record<string, any[]> = {
  'demo-recipe-1': [
    { id: 'dc-1-1', recipe_id: 'demo-recipe-1', author_id: 'demo-u-a', content: 'Laget dette for tredje gang i dag — hvert eneste brød har blitt bedre. Rugbrød er endelig min venn. Tusen takk! 🙏', created_at: new Date(Date.now() - 6 * 86400000).toISOString(), profiles: { username: 'Maja_Hedmark' } },
    { id: 'dc-1-2', recipe_id: 'demo-recipe-1', author_id: 'demo-u-b', content: 'I tried this with 100% dark rye and it was incredibly dense but so satisfying. Had to bake an extra 10 minutes. Would recommend adding 1 tsp of fennel seeds to the seed mix.', created_at: new Date(Date.now() - 5 * 86400000).toISOString(), profiles: { username: 'Lars_Stavanger' } },
    { id: 'dc-1-3', recipe_id: 'demo-recipe-1', author_id: 'demo-u-c', content: 'The overnight proof is key — I tried rushing it to 6 hours and the flavor was noticeably flatter. Patience is the ingredient nobody mentions in rugbrød recipes.', created_at: new Date(Date.now() - 4 * 86400000).toISOString(), profiles: { username: 'Ingrid_Tromsø' } },
    { id: 'dc-1-4', recipe_id: 'demo-recipe-1', author_id: 'demo-u-d', content: 'My Norwegian grandmother would be proud. Sliced thin with butter and gravlaks — this is perfection. I add a tablespoon of dark treacle for extra color and depth.', created_at: new Date(Date.now() - 2 * 86400000).toISOString(), profiles: { username: 'Erik_Bergen' } },
    { id: 'dc-1-5', recipe_id: 'demo-recipe-1', author_id: 'demo-u-e', content: 'Day 3 slice with brunost and a strong coffee — absolutely transcendent. Worth every minute of the long ferment. This recipe has completely replaced store-bought for my family.', created_at: new Date(Date.now() - 86400000).toISOString(), profiles: { username: 'Frida_Oslo' } },
  ],
  'demo-recipe-2': [
    { id: 'dc-2-1', recipe_id: 'demo-recipe-2', author_id: 'demo-u-f', content: 'Finally cracked the open crumb! The key for me was a much longer bench rest after pre-shaping — 45 minutes instead of 30. The gluten really relaxes and you get those gorgeous holes.', created_at: new Date(Date.now() - 4.5 * 86400000).toISOString(), profiles: { username: 'Anders_Trondheim' } },
    { id: 'dc-2-2', recipe_id: 'demo-recipe-2', author_id: 'demo-u-g', content: 'Baked this at 270°C and got incredible oven spring — the ear lifted beautifully. I think the extra heat is worth it if your oven can handle it. Crust was absolutely shatteringly crisp.', created_at: new Date(Date.now() - 3 * 86400000).toISOString(), profiles: { username: 'Nora_Lillehammer' } },
    { id: 'dc-2-3', recipe_id: 'demo-recipe-2', author_id: 'demo-u-h', content: 'The autolyse instruction is so clearly explained here — I\'ve read about it in 10 other recipes and never understood WHY until this one. Made all the difference. Thank you!', created_at: new Date(Date.now() - 2 * 86400000).toISOString(), profiles: { username: 'Kari_Drammen' } },
    { id: 'dc-2-4', recipe_id: 'demo-recipe-2', author_id: 'demo-u-i', content: 'Substituted 50g of the bread flour for semola rimacinata and the crust color was extraordinary — almost amber. Flavor-wise also slightly sweeter. Worth trying!', created_at: new Date(Date.now() - 86400000).toISOString(), profiles: { username: 'Ole_Fredrikstad' } },
    { id: 'dc-2-5', recipe_id: 'demo-recipe-2', author_id: 'demo-u-j', content: '이 레시피 정말 최고예요! 오픈 크럼이 완벽하게 나왔어요 🍞 I\'ve been trying to get that hole structure for months — the cold proof tip about rice flour was the game changer.', created_at: new Date(Date.now() - 43200000).toISOString(), profiles: { username: 'Ji_Yeon_Oslo' } },
  ],
  'demo-recipe-3': [
    { id: 'dc-3-1', recipe_id: 'demo-recipe-3', author_id: 'demo-u-k', content: '식빵 레시피를 이렇게 완벽하게 설명한 건 처음 봤어요! 결과물이 너무 부드럽고 맛있었어요. This is the softest bread I have ever made — surreal texture.', created_at: new Date(Date.now() - 3.5 * 86400000).toISOString(), profiles: { username: 'Soo_Jin_Park' } },
    { id: 'dc-3-2', recipe_id: 'demo-recipe-3', author_id: 'demo-u-l', content: 'Made this for my Korean mother-in-law\'s birthday and she actually cried. Said it was exactly like the bakery bread from her childhood neighborhood in Busan. This recipe is precious.', created_at: new Date(Date.now() - 2.5 * 86400000).toISOString(), profiles: { username: 'Magnus_Christoffersen' } },
    { id: 'dc-3-3', recipe_id: 'demo-recipe-3', author_id: 'demo-u-m', content: 'The windowpane test tip is crucial — I underworked my first attempt and the crumb was too tight. Second bake, full 20 minutes of kneading, and it was pure cloud. Do not skip!', created_at: new Date(Date.now() - 1.5 * 86400000).toISOString(), profiles: { username: 'Astrid_Viken' } },
    { id: 'dc-3-4', recipe_id: 'demo-recipe-3', author_id: 'demo-u-n', content: 'I added 1 tbsp of condensed milk to the dough and a swipe of honey butter straight from the oven. Absolutely decadent — like the best hotel breakfast bread but made in my own kitchen in Oslo.', created_at: new Date(Date.now() - 86400000).toISOString(), profiles: { username: 'Tuva_Nordstrand' } },
    { id: 'dc-3-5', recipe_id: 'demo-recipe-3', author_id: 'demo-u-o', content: 'The cold proof overnight tip saved me so much time on baking day. Pulled it from the fridge, 2 hour warm proof, baked — perfect results. This is now my go-to weekend bake.', created_at: new Date(Date.now() - 43200000).toISOString(), profiles: { username: 'Bjorn_Haugen' } },
  ],
  'demo-recipe-4': [
    { id: 'dc-4-1', recipe_id: 'demo-recipe-4', author_id: 'demo-u-p', content: 'Finally no more buying expensive knekkebrød at the shop. This recipe costs almost nothing and tastes infinitely better. I\'ve been making a double batch every Sunday for a month now.', created_at: new Date(Date.now() - 2.5 * 86400000).toISOString(), profiles: { username: 'Gunnar_Reistad' } },
    { id: 'dc-4-2', recipe_id: 'demo-recipe-4', author_id: 'demo-u-q', content: 'I add 1 tsp of caraway and 1 tsp fennel seed — very traditional Norwegian combination. Goes perfectly with strong brunost and a thin slice of spekeskinke. Highly recommend!', created_at: new Date(Date.now() - 2 * 86400000).toISOString(), profiles: { username: 'Lise_Midtstuen' } },
    { id: 'dc-4-3', recipe_id: 'demo-recipe-4', author_id: 'demo-u-r', content: 'The snap test tip is so useful — mine needed an extra 10 minutes and once I followed that advice it came out perfectly dry with no bendy center bits. Paper thin and totally addictive.', created_at: new Date(Date.now() - 86400000).toISOString(), profiles: { username: 'Petter_Kirkeby' } },
    { id: 'dc-4-4', recipe_id: 'demo-recipe-4', author_id: 'demo-u-s', content: 'I used my rye discard instead of active starter and the flavor was even more intense — almost cheesy. Works beautifully for the carbohydrate and fat content. Discard baking at its finest!', created_at: new Date(Date.now() - 54000000).toISOString(), profiles: { username: 'Sofia_Kjeldsen' } },
    { id: 'dc-4-5', recipe_id: 'demo-recipe-4', author_id: 'demo-u-t', content: 'Takes exactly 3 months from discovering this recipe to having people ask you to sell these. I now gift tins of knekkebrød at Christmas. Best baking investment of my year.', created_at: new Date(Date.now() - 21600000).toISOString(), profiles: { username: 'Kristoffer_Boe' } },
  ],
  'demo-recipe-5': [
    { id: 'dc-5-1', recipe_id: 'demo-recipe-5', author_id: 'demo-u-u', content: 'The cardamom is absolutely non-negotiable. I made a batch without it thinking it was optional and they were just ordinary cinnamon rolls. Made another batch with it and the whole apartment smelled like a Norwegian bakery. Use the cardamom.', created_at: new Date(Date.now() - 2 * 86400000).toISOString(), profiles: { username: 'Emma_Sandvik' } },
    { id: 'dc-5-2', recipe_id: 'demo-recipe-5', author_id: 'demo-u-v', content: 'The sourdough tang in these is so subtle but so important — it balances the sweetness perfectly. These are better than anything I\'ve bought at a Norwegian bakery in years.', created_at: new Date(Date.now() - 1.5 * 86400000).toISOString(), profiles: { username: 'Tor_Amundsen' } },
    { id: 'dc-5-3', recipe_id: 'demo-recipe-5', author_id: 'demo-u-w', content: 'Chilling the log before slicing is genius advice — clean, beautiful spirals every time instead of crushed flat rolls. Also, pearl sugar on top instead of icing looks absolutely stunning. 🌟', created_at: new Date(Date.now() - 86400000).toISOString(), profiles: { username: 'Ingrid_Solberg' } },
    { id: 'dc-5-4', recipe_id: 'demo-recipe-5', author_id: 'demo-u-x', content: '계피롤인데 한국식 식빵 반죽법이랑 비슷하네요! 너무 맛있어요. The combination of the enriched Nordic dough with Korean baking techniques is brilliant. My family finished all 12 in one sitting.', created_at: new Date(Date.now() - 54000000).toISOString(), profiles: { username: 'Hyeon_Ji_Kim' } },
    { id: 'dc-5-5', recipe_id: 'demo-recipe-5', author_id: 'demo-u-y', content: 'I do a cold proof after shaping — fill the tin, cling film, fridge overnight, then bring to room temp for 90 minutes before baking. The flavor is incredible and it fits perfectly into a morning routine. Sunday baking ritual sorted.', created_at: new Date(Date.now() - 21600000).toISOString(), profiles: { username: 'Ragnhild_Bakke' } },
  ],
  'demo-recipe-6': [
    { id: 'dc-6-1', recipe_id: 'demo-recipe-6', author_id: 'demo-u-aa', content: 'I\'ve been chasing that real SF sourdough flavor for 3 years. The cool water + long bulk at 22°C is the secret I was missing. Finally made a loaf that actually tastes tangy. This recipe is a gift.', created_at: new Date(Date.now() - 1.5 * 86400000).toISOString(), profiles: { username: 'Lars_Midtbø' } },
    { id: 'dc-6-2', recipe_id: 'demo-recipe-6', author_id: 'demo-u-bb', content: 'The 24-hour cold retard makes a jaw-dropping difference. I did a side-by-side: 10hr vs 24hr with same dough. The 24hr loaf was noticeably more complex and tangy. Worth planning ahead every time.', created_at: new Date(Date.now() - 86400000).toISOString(), profiles: { username: 'Karin_Westlie' } },
    { id: 'dc-6-3', recipe_id: 'demo-recipe-6', author_id: 'demo-u-cc', content: 'Scored with my new lame at 45° and got the most dramatic ear I have ever achieved. The bassinage method is totally new to me and it made the dough extensibility unlike anything from simple mixing. Changed my whole process.', created_at: new Date(Date.now() - 64800000).toISOString(), profiles: { username: 'Håkon_Fjeld' } },
    { id: 'dc-6-4', recipe_id: 'demo-recipe-6', author_id: 'demo-u-dd', content: 'The crust crackled like a gunshot when I cut into it — my partner came running from the next room. The crumb was that exact honeycomb pattern I\'ve been chasing. This is definitively the best sourdough recipe I\'ve tried in years of baking.', created_at: new Date(Date.now() - 43200000).toISOString(), profiles: { username: 'Maja_Rustad' } },
    { id: 'dc-6-5', recipe_id: 'demo-recipe-6', author_id: 'demo-u-ee', content: 'Used my 2-year-old established starter and got massive oven spring — bread taller than my Dutch oven lid would usually allow. Strong starter + cold water + patience = magic. This recipe is technically perfect.', created_at: new Date(Date.now() - 21600000).toISOString(), profiles: { username: 'Svein_Eriksen' } },
  ],
  'demo-recipe-7': [
    { id: 'dc-7-1', recipe_id: 'demo-recipe-7', author_id: 'demo-u-ff', content: 'The honey makes such a difference — adds a warmth and slight sweetness that white sourdoughs lack. My kids who claimed they hate brown bread asked for seconds. Absolute miracle recipe.', created_at: new Date(Date.now() - 86400000).toISOString(), profiles: { username: 'Marte_Haugen' } },
    { id: 'dc-7-2', recipe_id: 'demo-recipe-7', author_id: 'demo-u-gg', content: 'The note about whole wheat fermenting faster is so important — my first attempt over-fermented because I went by time not by look. Now I check by the jiggle test and it\'s perfect every time.', created_at: new Date(Date.now() - 64800000).toISOString(), profiles: { username: 'Torbjørn_Sand' } },
    { id: 'dc-7-3', recipe_id: 'demo-recipe-7', author_id: 'demo-u-hh', content: 'I use local Norwegian heather honey and it gives an almost smoky sweetness that pairs beautifully with the rye tang. This recipe is wonderful as a starting point but really rewards experimentation.', created_at: new Date(Date.now() - 43200000).toISOString(), profiles: { username: 'Silje_Brevik' } },
    { id: 'dc-7-4', recipe_id: 'demo-recipe-7', author_id: 'demo-u-ii', content: 'Makes the most extraordinary avocado toast I have ever eaten in my life. The earthiness of the whole wheat with the honey tang is a perfect canvas. I am fully converted away from white bread.', created_at: new Date(Date.now() - 28800000).toISOString(), profiles: { username: 'Arne_Solberg' } },
    { id: 'dc-7-5', recipe_id: 'demo-recipe-7', author_id: 'demo-u-jj', content: 'Great beginner recipe — more forgiving than white flour because the bran slows gluten overdevelopment. My third ever loaf was this and it turned out almost perfect. Recommended to everyone starting out.', created_at: new Date(Date.now() - 14400000).toISOString(), profiles: { username: 'Hanna_Dahl' } },
  ],
  'demo-recipe-8': [
    { id: 'dc-8-1', recipe_id: 'demo-recipe-8', author_id: 'demo-u-kk', content: 'The cold retard for focaccia is something I never thought to try before. The flavor after 18 hours in the fridge was extraordinary — almost cheesy and complex in a way I\'ve never gotten from same-day focaccia.', created_at: new Date(Date.now() - 0.8 * 86400000).toISOString(), profiles: { username: 'Rolf_Andersen' } },
    { id: 'dc-8-2', recipe_id: 'demo-recipe-8', author_id: 'demo-u-ll', content: 'Added sliced Kalamata olives and caramelized onions along with the rosemary — absolutely stunning result. Topped with fleur de sel from Brittany. Brought to a dinner party and it was demolished in 8 minutes.', created_at: new Date(Date.now() - 64800000).toISOString(), profiles: { username: 'Sigrid_Holmen' } },
    { id: 'dc-8-3', recipe_id: 'demo-recipe-8', author_id: 'demo-u-mm', content: 'The instruction to check the bottom by lifting a corner is so simple but I never thought to do it before. Got a perfect crispy golden base for the first time ever. Little tips like this change everything.', created_at: new Date(Date.now() - 43200000).toISOString(), profiles: { username: 'Per_Blystad' } },
    { id: 'dc-8-4', recipe_id: 'demo-recipe-8', author_id: 'demo-u-nn', content: 'Sourdough focaccia > regular focaccia. No contest. The depth of flavor after the long ferment is on another level. This is my go-to recipe to show people why sourdough is worth the effort.', created_at: new Date(Date.now() - 28800000).toISOString(), profiles: { username: 'Guro_Selstad' } },
    { id: 'dc-8-5', recipe_id: 'demo-recipe-8', author_id: 'demo-u-oo', content: 'I use the dimpling step as meditation — genuinely the most satisfying part of bread making. The patience of letting it relax in the pan for 3 full hours paid off with the most open, airy crumb I\'ve ever seen in a flatbread.', created_at: new Date(Date.now() - 14400000).toISOString(), profiles: { username: 'Kristin_Wessel' } },
  ],
  'demo-recipe-9': [
    { id: 'dc-9-1', recipe_id: 'demo-recipe-9', author_id: 'demo-u-pp', content: 'Took this to my family Christmas dinner instead of a bottle of wine. My aunt — who has been baking bread for 40 years — asked me for the recipe. That is the highest compliment I have ever received.', created_at: new Date(Date.now() - 0.4 * 86400000).toISOString(), profiles: { username: 'Vibeke_Nordal' } },
    { id: 'dc-9-2', recipe_id: 'demo-recipe-9', author_id: 'demo-u-qq', content: 'The combination of sourdough tang with 70% chocolate is extraordinary — the acidity brings out the fruitiness of the chocolate in a way I\'ve never tasted before. Used Valrhona Guanaja and it was transcendent.', created_at: new Date(Date.now() - 32400000).toISOString(), profiles: { username: 'Eivind_Bakken' } },
    { id: 'dc-9-3', recipe_id: 'demo-recipe-9', author_id: 'demo-u-rr', content: 'Kept the chocolate in the fridge until the very last moment of folding and it made a huge difference — distinct pockets of chocolate throughout rather than streaks. The orange tip about slicing when cool is also critical. Do not rush.', created_at: new Date(Date.now() - 21600000).toISOString(), profiles: { username: 'Heidi_Gjerde' } },
    { id: 'dc-9-4', recipe_id: 'demo-recipe-9', author_id: 'demo-u-ss', content: '초콜릿 오렌지 빵이 이렇게 맛있을 줄 몰랐어요! 사워도우 신맛이 초콜릿이랑 완벽하게 어울려요 😍 This is genuine magic. My Oslo baker friends are obsessed with this recipe now.', created_at: new Date(Date.now() - 14400000).toISOString(), profiles: { username: 'Min_Ji_Lee' } },
    { id: 'dc-9-5', recipe_id: 'demo-recipe-9', author_id: 'demo-u-tt', content: 'The smell from the oven when this is baking is so intense and wonderful that my neighbor knocked on my door to ask what was happening. I gave her a slice and she immediately asked to be added to my baking list. This loaf makes friends.', created_at: new Date(Date.now() - 7200000).toISOString(), profiles: { username: 'Jostein_Moe' } },
  ],
  'demo-recipe-10': [
    { id: 'dc-10-1', recipe_id: 'demo-recipe-10', author_id: 'demo-u-uu', content: 'My bestemor used to make lefse every Christmas. I tried for years to recreate them and always failed — too thick, too gummy, would crack. This recipe with the sourdough discard is the closest I have ever come. She would be so happy.', created_at: new Date(Date.now() - 0.2 * 86400000).toISOString(), profiles: { username: 'Torill_Haug' } },
    { id: 'dc-10-2', recipe_id: 'demo-recipe-10', author_id: 'demo-u-vv', content: 'The drying the riced potato step is completely non-negotiable. My first attempt was slightly warm and the dough was unworkable. Second attempt — fully cooled — and the dough came together beautifully and rolled paper thin.', created_at: new Date(Date.now() - 18000000).toISOString(), profiles: { username: 'Olaf_Brattøy' } },
    { id: 'dc-10-3', recipe_id: 'demo-recipe-10', author_id: 'demo-u-ww', content: 'The sourdough discard adds something truly special — a very subtle tang that actually makes the lefse taste more traditional and complex. Much better than the plain flour version I\'ve been making. Upgrading my Christmas tradition permanently.', created_at: new Date(Date.now() - 10800000).toISOString(), profiles: { username: 'Anne_Brit_Sæther' } },
    { id: 'dc-10-4', recipe_id: 'demo-recipe-10', author_id: 'demo-u-xx', content: 'Filled mine with brown sugar, butter, AND a thin layer of Nutella — technically sacrilege but absolutely delicious. Kids went absolutely wild. Traditional Norway meets modern Oslo. Lefse evolution is real.', created_at: new Date(Date.now() - 7200000).toISOString(), profiles: { username: 'Fredrik_Nygård' } },
    { id: 'dc-10-5', recipe_id: 'demo-recipe-10', author_id: 'demo-u-yy', content: 'I\'m half-Korean and made these for my Norwegian partner\'s family for the first time. They showed me how to eat it with brunost. I showed them how to eat it with red bean paste. Both versions disappeared instantly. Cultural exchange via flatbread — this is why baking matters. 🌾', created_at: new Date(Date.now() - 3600000).toISOString(), profiles: { username: 'Da_Eun_Lindqvist' } },
  ],
};

// ─── Demo Messages (structured, for ChatScreen rendering) ────────────────────
// Each entry is an array of Message-like objects for a given demo request id.

export const DEMO_MESSAGES: Record<string, any[]> = {
  'demo-msg-1': [
    { id: 'dm1-1', request_id: 'demo-msg-1', sender_id: 'demo-u1', content: 'Hei Lars! Jeg så at Bergljot er tilgjengelig. Har du hatt henne lenge? 🍞', created_at: new Date(Date.now() - 2 * 86400000 + 1 * 60000).toISOString(), sender: { username: 'Ingrid B.' } },
    { id: 'dm1-2', request_id: 'demo-msg-1', sender_id: 'demo-u2', content: 'Hei! Ja, Bergljot er min eldste kultur — hun er nesten 6 år gammel nå. Oppkalt etter bestemoren min 🥹', created_at: new Date(Date.now() - 2 * 86400000 + 5 * 60000).toISOString(), sender: { username: 'Lars M.' } },
    { id: 'dm1-3', request_id: 'demo-msg-1', sender_id: 'demo-u1', content: 'Å, det er så vakkert! Kan jeg virkelig få en del av henne?', created_at: new Date(Date.now() - 2 * 86400000 + 8 * 60000).toISOString(), sender: { username: 'Ingrid B.' } },
    { id: 'dm1-4', request_id: 'demo-msg-1', sender_id: 'demo-u2', content: 'Absolutt! Jeg mater henne hver morgen kl 7. Du kan komme og ta en porsjon når det passer deg best.', created_at: new Date(Date.now() - 2 * 86400000 + 12 * 60000).toISOString(), sender: { username: 'Lars M.' } },
    { id: 'dm1-5', request_id: 'demo-msg-1', sender_id: 'demo-u1', content: 'Fantastisk! Kan vi møtes i helgen? Kanskje lørdag ved Mathallen?', created_at: new Date(Date.now() - 86400000 + 2 * 60000).toISOString(), sender: { username: 'Ingrid B.' } },
    { id: 'dm1-6', request_id: 'demo-msg-1', sender_id: 'demo-u2', content: 'Lørdag kl 11 passer perfekt 🌾 Jeg pakker henne i et glass med litt mel slik at hun holder seg i transporten.', created_at: new Date(Date.now() - 86400000 + 6 * 60000).toISOString(), sender: { username: 'Lars M.' } },
    { id: 'dm1-7', request_id: 'demo-msg-1', sender_id: 'demo-u1', content: 'Tusen hjertelig takk! Gleder meg enormt! ✨🍞', created_at: new Date(Date.now() - 86400000 + 8 * 60000).toISOString(), sender: { username: 'Ingrid B.' } },
  ],
  'demo-msg-3': [
    { id: 'dm3-1', request_id: 'demo-msg-3', sender_id: 'demo-u5', content: 'Hi Tor! I\'ve been looking for a good liquid levain forever. Seoulmate sounds perfect for milk bread 🥛', created_at: new Date(Date.now() - 1.5 * 86400000 + 1 * 60000).toISOString(), sender: { username: 'Maja H.' } },
    { id: 'dm3-2', request_id: 'demo-msg-3', sender_id: 'demo-u6', content: 'Hi Maja! Yes she\'s incredibly active — doubles in under 4 hours at room temperature in summer. Very mild and slightly sweet.', created_at: new Date(Date.now() - 1.5 * 86400000 + 4 * 60000).toISOString(), sender: { username: 'Tor A.' } },
    { id: 'dm3-3', request_id: 'demo-msg-3', sender_id: 'demo-u5', content: 'I\'ve been trying to make Korean 식빵 for months with mixed results. Would Seoulmate work better than my current wheat starter?', created_at: new Date(Date.now() - 1.5 * 86400000 + 7 * 60000).toISOString(), sender: { username: 'Maja H.' } },
    { id: 'dm3-4', request_id: 'demo-msg-3', sender_id: 'demo-u6', content: 'Absolutely — she\'s 100% hydration which is perfect for tangzhong milk bread. The mild tang won\'t compete with the sweetness at all.', created_at: new Date(Date.now() - 1.5 * 86400000 + 11 * 60000).toISOString(), sender: { username: 'Tor A.' } },
    { id: 'dm3-5', request_id: 'demo-msg-3', sender_id: 'demo-u5', content: 'I\'m so excited! Can I bring something in return? I have a Hokkaido-style starter from a Japanese baking class last year.', created_at: new Date(Date.now() - 86400000 + 1 * 60000).toISOString(), sender: { username: 'Maja H.' } },
    { id: 'dm3-6', request_id: 'demo-msg-3', sender_id: 'demo-u6', content: 'Oh a starter swap! Yes please 🙌 I\'ve always wanted to try Hokkaido. Saturday at Grünerløkka market? I\'ll be there anyway, around noon.', created_at: new Date(Date.now() - 86400000 + 5 * 60000).toISOString(), sender: { username: 'Tor A.' } },
    { id: 'dm3-7', request_id: 'demo-msg-3', sender_id: 'demo-u5', content: 'Perfect! See you there Saturday noon ☕🌾', created_at: new Date(Date.now() - 86400000 + 7 * 60000).toISOString(), sender: { username: 'Maja H.' } },
  ],
  'demo-msg-4': [
    { id: 'dm4-1', request_id: 'demo-msg-4', sender_id: 'demo-u7', content: 'Hei Kari! Er Mjølner god til mørkt knekkebrød? 🌾', created_at: new Date(Date.now() - 3 * 86400000 + 2 * 60000).toISOString(), sender: { username: 'Anders P.' } },
    { id: 'dm4-2', request_id: 'demo-msg-4', sender_id: 'demo-u8', content: 'Hei Anders! Mjølner er perfekt til knekkebrød — lavt hydrasjon gjør deigen mer håndterlig og gir en kraftigere rugsmak.', created_at: new Date(Date.now() - 3 * 86400000 + 6 * 60000).toISOString(), sender: { username: 'Kari T.' } },
    { id: 'dm4-3', request_id: 'demo-msg-4', sender_id: 'demo-u7', content: 'Jeg har forsøkt med min hvete-starter men teksturen ble for seig. Rughvete er vel svaret?', created_at: new Date(Date.now() - 3 * 86400000 + 10 * 60000).toISOString(), sender: { username: 'Anders P.' } },
    { id: 'dm4-4', request_id: 'demo-msg-4', sender_id: 'demo-u8', content: 'Ja! Rugstarter gir en kraftigere smak og tørrere krumme som tåler lang tørking i ovnen. Mjølner løfter godt selv med 65% rug.', created_at: new Date(Date.now() - 2 * 86400000 + 1 * 60000).toISOString(), sender: { username: 'Kari T.' } },
    { id: 'dm4-5', request_id: 'demo-msg-4', sender_id: 'demo-u7', content: 'Imponerende. Kan jeg få ta en porsjon neste uke?', created_at: new Date(Date.now() - 2 * 86400000 + 4 * 60000).toISOString(), sender: { username: 'Anders P.' } },
    { id: 'dm4-6', request_id: 'demo-msg-4', sender_id: 'demo-u8', content: 'Selvfølgelig! Jeg har nok til alle. Kommer du til Grønland tirsdag kl 18? Ta med et rent glass 🫙', created_at: new Date(Date.now() - 2 * 86400000 + 8 * 60000).toISOString(), sender: { username: 'Kari T.' } },
    { id: 'dm4-7', request_id: 'demo-msg-4', sender_id: 'demo-u7', content: 'Tirsdag kl 18 passer bra 👍 Vi ses!', created_at: new Date(Date.now() - 2 * 86400000 + 10 * 60000).toISOString(), sender: { username: 'Anders P.' } },
  ],
  'demo-msg-7': [
    { id: 'dm7-1', request_id: 'demo-msg-7', sender_id: 'demo-u13', content: 'Hi Petter! I saw your Oslo Sourdough starter — a starter named after the city feels really special 🏙️', created_at: new Date(Date.now() - 86400000 + 1 * 60000).toISOString(), sender: { username: 'Emma S.' } },
    { id: 'dm7-2', request_id: 'demo-msg-7', sender_id: 'demo-u14', content: 'Hi Emma! Yes, I started it the year I moved to Oslo — felt right to name it after my new home city 😊', created_at: new Date(Date.now() - 86400000 + 5 * 60000).toISOString(), sender: { username: 'Petter K.' } },
    { id: 'dm7-3', request_id: 'demo-msg-7', sender_id: 'demo-u13', content: 'What kind of bread does it work best for? I\'ve been frustrated with commercial yeast pizza — no flavor at all.', created_at: new Date(Date.now() - 86400000 + 9 * 60000).toISOString(), sender: { username: 'Emma S.' } },
    { id: 'dm7-4', request_id: 'demo-msg-7', sender_id: 'demo-u14', content: 'Sourdough pizza changes everything — 72hr cold ferment, the flavor is incredible. I\'ll give you the technique when I pass along the starter 🍕', created_at: new Date(Date.now() - 86400000 + 14 * 60000).toISOString(), sender: { username: 'Petter K.' } },
    { id: 'dm7-5', request_id: 'demo-msg-7', sender_id: 'demo-u13', content: 'Amazing! When are you free? I\'m near Majorstuen, can come wherever works for you.', created_at: new Date(Date.now() - 43200000 + 2 * 60000).toISOString(), sender: { username: 'Emma S.' } },
    { id: 'dm7-6', request_id: 'demo-msg-7', sender_id: 'demo-u14', content: 'I\'m also near Majorstuen actually! Thursday evening around 7pm? I\'ll have her freshly fed and ready. 🌾✨', created_at: new Date(Date.now() - 43200000 + 7 * 60000).toISOString(), sender: { username: 'Petter K.' } },
    { id: 'dm7-7', request_id: 'demo-msg-7', sender_id: 'demo-u13', content: 'Thursday 7pm is perfect! I\'ll bring some fresh-baked knekkebrød as a thank you 🥨', created_at: new Date(Date.now() - 43200000 + 10 * 60000).toISOString(), sender: { username: 'Emma S.' } },
  ],
  'demo-msg-9': [
    { id: 'dm9-1', request_id: 'demo-msg-9', sender_id: 'demo-u17', content: 'Hei Magnus! Nordic Wild — hva slags korn bruker du til den? Beskrivelsen er veldig spennende 🌿', created_at: new Date(Date.now() - 5 * 86400000 + 2 * 60000).toISOString(), sender: { username: 'Astrid V.' } },
    { id: 'dm9-2', request_id: 'demo-msg-9', sender_id: 'demo-u18', content: 'Hei Astrid! Det er en blanding av spelt, emmer og litt rug — alle frøkorn jeg fant på en gård i Valdres.', created_at: new Date(Date.now() - 5 * 86400000 + 6 * 60000).toISOString(), sender: { username: 'Magnus C.' } },
    { id: 'dm9-3', request_id: 'demo-msg-9', sender_id: 'demo-u17', content: 'Spelt-starter gir jo den nydelige nøtteaktige smaken. Og emmer tilsetter noe søtlig? Kombinasjonen er unik.', created_at: new Date(Date.now() - 5 * 86400000 + 10 * 60000).toISOString(), sender: { username: 'Astrid V.' } },
    { id: 'dm9-4', request_id: 'demo-msg-9', sender_id: 'demo-u18', content: 'Nøyaktig! Emmer gir en litt grasaktig og søtlig tone. Ingen annen kultur jeg har smakt ligner. Jeg er veldig forsiktig med hvem jeg deler med 😄', created_at: new Date(Date.now() - 4 * 86400000 + 3 * 60000).toISOString(), sender: { username: 'Magnus C.' } },
    { id: 'dm9-5', request_id: 'demo-msg-9', sender_id: 'demo-u17', content: 'Det setter jeg stor pris på — jeg vil passe veldig godt på henne, det lover jeg 🙏', created_at: new Date(Date.now() - 4 * 86400000 + 6 * 60000).toISOString(), sender: { username: 'Astrid V.' } },
    { id: 'dm9-6', request_id: 'demo-msg-9', sender_id: 'demo-u18', content: 'Jeg vet det 😊 Kom forbi Frogner på søndag formiddag — jeg baker som regel noe fint vi kan smake på mens vi snakker 🍞', created_at: new Date(Date.now() - 4 * 86400000 + 9 * 60000).toISOString(), sender: { username: 'Magnus C.' } },
    { id: 'dm9-7', request_id: 'demo-msg-9', sender_id: 'demo-u17', content: 'Søndag formiddag passer perfekt. Jeg gleder meg veldig! ✨🌾', created_at: new Date(Date.now() - 4 * 86400000 + 12 * 60000).toISOString(), sender: { username: 'Astrid V.' } },
  ],
  'demo-msg-10': [
    { id: 'dm10-1', request_id: 'demo-msg-10', sender_id: 'demo-u19', content: 'Hei Kristoffer! Er Trondheim Dark-starteren din fra Trondheim opprinnelig? 🏔️', created_at: new Date(Date.now() - 6 * 86400000 + 3 * 60000).toISOString(), sender: { username: 'Tuva N.' } },
    { id: 'dm10-2', request_id: 'demo-msg-10', sender_id: 'demo-u20', content: 'Hei Tuva! Ja, jeg fikk henne av en gammel konditor i Midtbyen som hadde hatt henne i over 15 år. Ekte Trondheim-kultur!', created_at: new Date(Date.now() - 6 * 86400000 + 7 * 60000).toISOString(), sender: { username: 'Kristoffer B.' } },
    { id: 'dm10-3', request_id: 'demo-msg-10', sender_id: 'demo-u19', content: '15 år! Det er nesten ufattelig. Hva gjør henne så spesiell?', created_at: new Date(Date.now() - 6 * 86400000 + 11 * 60000).toISOString(), sender: { username: 'Tuva N.' } },
    { id: 'dm10-4', request_id: 'demo-msg-10', sender_id: 'demo-u20', content: 'Hun fermenterer saktere enn de fleste — perfekt for lange, kalde hevinger. Gir en veldig dyp, nesten karamellartet smak i mørkt brød.', created_at: new Date(Date.now() - 5 * 86400000 + 2 * 60000).toISOString(), sender: { username: 'Kristoffer B.' } },
    { id: 'dm10-5', request_id: 'demo-msg-10', sender_id: 'demo-u19', content: 'Du er den fjerde jeg deler med — jeg holder regnskap over hvem hun reiser til 🌳 Som et stamtre!', created_at: new Date(Date.now() - 5 * 86400000 + 5 * 60000).toISOString(), sender: { username: 'Kristoffer B.' } },
    { id: 'dm10-6', request_id: 'demo-msg-10', sender_id: 'demo-u20', content: 'Akkurat slik jeg liker det 😊 Kan du komme til Nidelven på lørdag? Jeg er der fra 10 til 14.', created_at: new Date(Date.now() - 5 * 86400000 + 8 * 60000).toISOString(), sender: { username: 'Tuva N.' } },
    { id: 'dm10-7', request_id: 'demo-msg-10', sender_id: 'demo-u19', content: 'Lørdag kl 11 passer perfekt! Jeg tar med noe hjembakt til deg i bytte 🍞', created_at: new Date(Date.now() - 5 * 86400000 + 10 * 60000).toISOString(), sender: { username: 'Kristoffer B.' } },
  ],
};

// ─── Demo Conversations ───────────────────────────────────────────────────────

export const DEMO_CONVERSATIONS: Record<string, string> = {
  'demo-msg-1': `Ingrid B.: Hei Lars! Jeg så at Bergljot er tilgjengelig. Har du hatt henne lenge? 🍞

Lars M.: Hei! Ja, Bergljot er min eldste kultur — hun er nesten 6 år gammel nå. Oppkalt etter bestemoren min 🥹

Ingrid B.: Å, det er så vakkert! Kan jeg virkelig få en del av henne?

Lars M.: Absolutt! Jeg mater henne hver morgen kl 7. Du kan komme og ta en porsjon når det passer.

Ingrid B.: Fantastisk! Kan vi møtes i helgen? Kanskje lørdag ved Mathallen?

Lars M.: Lørdag kl 11 passer perfekt 🌾 Jeg pakker henne i et glass med litt mel.

Ingrid B.: Tusen hjertelig takk! Gleder meg enormt! ✨🍞`,

  'demo-msg-3': `Maja H.: Hi Tor! I've been looking for a good liquid levain forever. Seoulmate sounds perfect for milk bread.

Tor A.: Hi Maja! Yes she's incredibly active — doubles in under 4 hours at room temperature in summer. Very mild and slightly sweet.

Maja H.: I've been trying to make Korean 식빵 for months with mixed results. Would Seoulmate work better than my current wheat starter?

Tor A.: Absolutely — she's 100% hydration which is perfect for tangzhong milk bread. The mild tang won't compete with the sweetness.

Maja H.: I'm so excited. Can I bring something in return? I have a Hokkaido-style starter from a Japanese baking class.

Tor A.: Oh a starter swap! Yes please 🙌 I've always wanted to try Hokkaido.

Maja H.: Deal! Saturday or Sunday works for me — wherever is easiest for you 🍞

Tor A.: Saturday at Grünerløkka market? I'll be there anyway. Around noon? ☕

Maja H.: Perfect! See you there! 🌾`,

  'demo-msg-4': `Anders P.: Hei Kari! Er Mjølner god til mørkt knekkebrød?

Kari T.: Hei Anders! Mjølner er perfekt til knekkebrød — lavt hydrasjon gjør deigen mer håndterlig.

Anders P.: Jeg har forsøkt med min hvete-starter men teksturen ble for seig. Rughvete er vel svaret?

Kari T.: Ja! Rugstarter gir en kraftigere smak og tørrere krumme. Mjølner løfter godt selv med 65% rug.

Anders P.: Imponerende. Kan jeg få ta en porsjon neste uke?

Kari T.: Selvfølgelig! Jeg har nok til alle. Kommer du til Grønland tirsdag?

Anders P.: Tirsdag kl 18 passer bra 👍

Kari T.: Bra! Ta med et rent glass 🫙 Vi ses!`,

  'demo-msg-7': `Emma S.: Hi Petter! I saw your Oslo Sourdough starter description — a starter named after the city feels special.

Petter K.: Hi Emma! Yes, I started it the year I moved to Oslo — felt right to name it after my new home city 😊

Emma S.: How old is it? And what kind of bread does it work best for?

Petter K.: She's about 2.5 years now. Works beautifully for everyday boules, baguette-style batards, and surprisingly well in pizza dough.

Emma S.: Pizza dough! That's exactly what I need. I've been frustrated with commercial yeast pizza — no flavor.

Petter K.: Sourdough pizza changes everything — 72 hour cold ferment, the flavor is incredible. I'll give you the technique when I pass along the starter 🍕

Emma S.: Amazing! When are you free? I can come to wherever in Oslo works.

Petter K.: I'm near Majorstuen — anytime this week works. Evenings are easier for me.

Emma S.: Thursday evening? Around 7pm?

Petter K.: Perfect. I'll have her freshly fed and ready to go 🌾✨`,

  'demo-msg-9': `Astrid V.: Hei Magnus! Nordic Wild — hva slags korn bruker du til den?

Magnus C.: Hei Astrid! Det er en blanding av spelt, emmer og litt rug — alle frøkorn jeg fant på en gård i Valdres.

Astrid V.: Det høres fantastisk ut. Spelt-starter gir jo den nydelige nøtteaktige smaken.

Magnus C.: Ja! Og emmer tilsetter en litt søtlig, grasaktig tone. Kombinasjonen er unik — ingen annen kultur jeg har smakt ligner.

Astrid V.: Jeg bager mye med spelt men har aldri prøvd å kombinere tre typer. Kan jeg virkelig få en porsjon?

Magnus C.: Med glede! Jeg er veldig forsiktig med hvem jeg deler med — men du virker som en seriøs baker 😄

Astrid V.: Det setter jeg stor pris på! Jeg vil passe godt på henne 🙏

Magnus C.: Jeg vet det. Kom forbi Frogner på søndag formiddag — jeg baker som regel noe fint vi kan smake på 🍞

Astrid V.: Søndag formiddag passer perfekt. Jeg gleder meg veldig! ✨🌾`,

  'demo-msg-10': `Tuva N.: Hei Kristoffer! Er Trondheims-starteren din fra Trondheim opprinnelig?

Kristoffer B.: Hei Tuva! Ja, jeg fikk henne av en gammel konditor i Midtbyen som hadde hatt henne i 15 år. Ekte Trondheim-kultur!

Tuva N.: 15 år! Det er nesten ufattelig. Hva gjør den spesielt?

Kristoffer B.: Hun fermenterer saktere enn de fleste — perfekt for lange, kalde heving. Gir en veldig dyp, nesten karamellartet smak.

Tuva N.: Det høres ut som akkurat det jeg trenger til mørkt rugbrød. Kan jeg be om en porsjon?

Kristoffer B.: Absolutt! Du er den fjerde jeg deler med — jeg holder regnskap over hvem hun reiser til 🌳

Tuva N.: Som et stamtre! Det er så poetisk. Jeg vil oppdatere deg etter hvert bakverk.

Kristoffer B.: Akkurat slik jeg liker det 😊 Kan du komme til Nidelven på lørdag? Jeg er der fra 10 til 14.

Tuva N.: Lørdag kl 11 passer! Jeg tar med noe hjembakt til deg i bytte 🍞`,
};
