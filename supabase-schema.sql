-- =========================================================================
-- Sir Zeal — Supabase Schema
-- =========================================================================
-- HOW TO USE:
-- 1. Create a project at https://supabase.com (free tier is enough to start)
-- 2. Go to SQL Editor in the Supabase dashboard
-- 3. Paste this whole file in and click "Run"
-- 4. Go to Project Settings > API, copy your Project URL and anon/public key
-- 5. Paste them into supabase-client.js (see that file's top for where)
-- =========================================================================

-- ---- PROJECTS (your live portfolio, replaces portfolio-data.js) --------
create table if not exists projects (
  id text primary key,                 -- short slug, e.g. 'gleamguard'
  title text not null,
  category text not null,
  status text not null default 'live', -- 'live' or 'in-progress'
  thumbnail text,                      -- image URL
  summary text,                        -- one-line card summary
  live_url text,
  year text,
  tags text[] default '{}',
  description text,                    -- long-form, paragraphs separated by \n\n
  features text[] default '{}',
  role text,
  created_at timestamptz default now()
);

alter table projects enable row level security;

-- Anyone can read projects (needed for the public site to display them)
create policy "Public read access on projects"
  on projects for select
  using (true);

-- No public insert/update/delete policy is created on purpose.
-- This means new projects can ONLY be added via the Supabase dashboard
-- (Table Editor) or with your service role key — never from the public
-- website. That's your "admin" — safe by default.


-- ---- NEWSLETTER SUBSCRIBERS ---------------------------------------------
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null unique,
  subscribed_at timestamptz default now()
);

alter table newsletter_subscribers enable row level security;

-- Public can INSERT (sign up) but not read the list back — keeps emails private
create policy "Public can subscribe"
  on newsletter_subscribers for insert
  with check (true);


-- ---- CONTACT / INQUIRY SUBMISSIONS --------------------------------------
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  project_interest text,               -- e.g. which Service they're asking about
  submitted_at timestamptz default now()
);

alter table contact_submissions enable row level security;

create policy "Public can submit contact form"
  on contact_submissions for insert
  with check (true);


-- ---- SEED DATA: your two existing live projects -------------------------
insert into projects (id, title, category, status, thumbnail, summary, live_url, year, tags, description, features, role)
values
(
  'sir-zeal-academy',
  'Sir Zeal Academy',
  'Platform',
  'live',
  'images/portfolio/sir-zeal-academy.png',
  'A premium online learning platform for digital skills and Kenyan curriculum subjects.',
  'https://academy.sirzeal.com',
  '2026',
  array['Next.js','TypeScript','PostgreSQL','Prisma','M-Pesa'],
  'A large-scale learning platform serving two audiences at once — learners chasing digital skills like web development and AI, and students working through the Kenyan curriculum for KCSE and CBC.

The platform supports student, instructor, and admin roles, with M-Pesa, Stripe, and PayPal all wired into the checkout flow so payment is never the blocker between a learner and a course.',
  array['Dual-track design: Digital Wing and Curriculum Wing','Student, instructor, and admin role systems','M-Pesa, Stripe, and PayPal checkout','21 routes, 80+ components across the platform'],
  'Full-stack design & development'
),
(
  'gleamguard',
  'GleamGuard',
  'Business Website',
  'live',
  'images/portfolio/gleamguard.png',
  'Booking and admin system for a Nairobi CBD cleaning and pest control business.',
  'https://gleamguard-com.vercel.app',
  '2026',
  array['React','Supabase','SSR'],
  'A full rebuild for a cleaning and pest control company, moved from a design tool export into a production-ready, server-rendered site with a real backend behind it.

The brief expanded mid-project to include a live booking system and an admin dashboard, so the client could manage incoming jobs without touching code.',
  array['Server-side rendering fixed for reliable routing','Custom SVG illustrations replacing corrupted image assets','Supabase backend powering bookings','Admin dashboard for job management'],
  'Development & deployment'
)
on conflict (id) do nothing;
