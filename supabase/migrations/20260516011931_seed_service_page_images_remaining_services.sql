/*
  # Seed Default Methodology Images for Remaining Service Pages

  ## Purpose
  Inserts default Pexels fallback images for the 5 remaining service pages so their
  ServiceMethodologyCarousel renders immediately before admins upload custom images.

  ## Services Seeded
  - searchmaxi (4 steps: Audit, Strategy, Optimize, Scale)
  - admaxi     (4 steps: Research, Build, Launch, Optimize)
  - socialmaxi (4 steps: Brand Audit, Strategy, Produce, Grow)
  - clickmaxi  (4 steps: Discovery, Build, Launch, Optimize)
  - sitemaxi   (4 steps: Discovery, Design, Build, Launch)

  ## Notes
  - Uses ON CONFLICT DO NOTHING so safe to re-run
  - Images are Pexels URLs at 1200px width — no bandwidth cost to the project
*/

INSERT INTO service_page_images (service_slug, step_index, image_url, label) VALUES
  -- SearchMaxi
  ('searchmaxi', 0, 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Audit — Technical & content SEO review'),
  ('searchmaxi', 1, 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Strategy — Keyword and content roadmap'),
  ('searchmaxi', 2, 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Optimize — On-page and technical improvements'),
  ('searchmaxi', 3, 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Scale — Link building and authority growth'),

  -- AdMaxi
  ('admaxi', 0, 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Research — Audience and competitor analysis'),
  ('admaxi', 1, 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Build — Campaign and creative setup'),
  ('admaxi', 2, 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Launch — Campaign activation and A/B testing'),
  ('admaxi', 3, 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Optimize — Continuous bid and creative optimization'),

  -- SocialMaxi
  ('socialmaxi', 0, 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Brand Audit — Review current social presence'),
  ('socialmaxi', 1, 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Strategy — Content calendar and platform plan'),
  ('socialmaxi', 2, 'https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Produce — Content creation and scheduling'),
  ('socialmaxi', 3, 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Grow — Engagement and community building'),

  -- ClickMaxi
  ('clickmaxi', 0, 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Discovery — Funnel and audience analysis'),
  ('clickmaxi', 1, 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Build — Campaign and landing page setup'),
  ('clickmaxi', 2, 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Launch — Go-live with conversion tracking'),
  ('clickmaxi', 3, 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Optimize — Bid strategy and creative refinement'),

  -- SiteMaxi
  ('sitemaxi', 0, 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Discovery — Goals, brand, and competitor review'),
  ('sitemaxi', 1, 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Design — Wireframes and visual design'),
  ('sitemaxi', 2, 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Build — Development and content integration'),
  ('sitemaxi', 3, 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Launch — Testing, SEO setup, and go-live')
ON CONFLICT (service_slug, step_index) DO NOTHING;
