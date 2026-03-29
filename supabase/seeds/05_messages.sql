-- ─────────────────────────────────────────────────────────────
-- BakSelv.no Demo Seed — 05: Chat Messages
-- ─────────────────────────────────────────────────────────────
-- Messages for the 2 accepted sharing requests:
--   Request cc01: oslosourdough (u2) requested Bjørn from fjordbreads (u1)
--   Request cc02: fjordbreads (u1) requested Bergljot from kneadmore (u5)
-- ─────────────────────────────────────────────────────────────

INSERT INTO messages (id, request_id, sender_id, content, created_at) VALUES

  -- ── Conversation 1: Bjørn sharing (cc01) ──────────────────
  -- oslosourdough initiates
  (
    'mmmmmmmm-0000-0000-0000-000000000001',
    'cccccccc-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000002',
    'Hei! I saw your starter Bjørn on the map and I''m so excited — a 2-year-old liquid levain is exactly what I''ve been looking for. Is it still available?',
    NOW() - INTERVAL '12 days 2 hours'
  ),
  -- fjordbreads replies
  (
    'mmmmmmmm-0000-0000-0000-000000000002',
    'cccccccc-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000001',
    'Yes, absolutely! Bjørn is very much alive and thriving. I feed him every morning on 50/50 bread flour and water. Very consistent — you''ll love him. When would you like to meet?',
    NOW() - INTERVAL '12 days 1 hour 45 minutes'
  ),
  -- oslosourdough suggests meetup
  (
    'mmmmmmmm-0000-0000-0000-000000000003',
    'cccccccc-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000002',
    'How about Saturday morning? I''m in Grünerløkka. Could meet at the market on Birkelunden around 10?',
    NOW() - INTERVAL '12 days 1 hour 30 minutes'
  ),
  -- fjordbreads confirms
  (
    'mmmmmmmm-0000-0000-0000-000000000004',
    'cccccccc-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000001',
    'Perfect! I''ll bring him in a small jar. One tip: keep him at room temperature for the first few days while he adjusts to your kitchen. He can be a bit dramatic about new environments 😄',
    NOW() - INTERVAL '12 days 1 hour'
  ),
  -- after pickup — oslosourdough thanks
  (
    'mmmmmmmm-0000-0000-0000-000000000005',
    'cccccccc-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000002',
    'Just got home and already fed him! He looks incredibly active. Thank you so much — this is exactly the culture I''ve been hoping to find. Already planning my first bake for tomorrow morning 🙌',
    NOW() - INTERVAL '11 days 3 hours'
  ),
  -- fjordbreads wraps up
  (
    'mmmmmmmm-0000-0000-0000-000000000006',
    'cccccccc-0000-0000-0000-000000000001',
    'aaaaaaaa-0000-0000-0000-000000000001',
    'Wonderful! Let me know how the first bake goes. Send a crumb shot — I love seeing what people do with his descendants 🍞',
    NOW() - INTERVAL '11 days 2 hours'
  ),

  -- ── Conversation 2: Bergljot sharing (cc02) ──────────────────
  -- fjordbreads requests Bergljot
  (
    'mmmmmmmm-0000-0000-0000-000000000007',
    'cccccccc-0000-0000-0000-000000000002',
    'aaaaaaaa-0000-0000-0000-000000000001',
    'Hei! I''ve been wanting to try a spelt starter for ages. Bergljot sounds incredible — 4 years old and fed on Hardanger spelt? That''s the dream. Would you be willing to share?',
    NOW() - INTERVAL '6 days 4 hours'
  ),
  -- kneadmore responds
  (
    'mmmmmmmm-0000-0000-0000-000000000008',
    'cccccccc-0000-0000-0000-000000000002',
    'aaaaaaaa-0000-0000-0000-000000000005',
    'Of course! Bergljot loves travelling. One thing to know: she runs slower than a wheat starter — give her 8 hours to peak after feeding, not the usual 4. She''s worth the wait.',
    NOW() - INTERVAL '6 days 3 hours 40 minutes'
  ),
  -- logistics
  (
    'mmmmmmmm-0000-0000-0000-000000000009',
    'cccccccc-0000-0000-0000-000000000002',
    'aaaaaaaa-0000-0000-0000-000000000001',
    'Good to know! Can you send her by mail in a cold pack, or is pick-up only? I''m in Oslo but could potentially make the trip to Bergen — I have family there.',
    NOW() - INTERVAL '6 days 3 hours'
  ),
  -- kneadmore offers mail
  (
    'mmmmmmmm-0000-0000-0000-000000000010',
    'cccccccc-0000-0000-0000-000000000002',
    'aaaaaaaa-0000-0000-0000-000000000005',
    'I can send her! I''ll dry a portion on parchment paper — dried starter travels perfectly and reconstitutes within 2–3 feedings. I''ll post her tomorrow with care instructions. No need to travel all the way to Bergen for this 😊',
    NOW() - INTERVAL '6 days 2 hours'
  )

ON CONFLICT (id) DO NOTHING;
