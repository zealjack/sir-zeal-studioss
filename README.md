# Sir Zeal — Site Files

## Files
- `index.html` — home page (single-page overview, unchanged)
- `systems.html`, `services.html`, `portfolio.html`, `blogs.html`, `about-us.html` — dedicated pages
- `project.html` — portfolio detail page (reads `?id=` from the URL)
- `post.html` — blog post detail page (reads `?id=` from the URL)
- `styles.css` — shared stylesheet for the entire site
- `nav.js` — shared hamburger menu behavior, loaded on every page
- `portfolio-data.js` — local fallback project data
- `blogs-data.js` — blog post content
- `supabase-schema.sql` — database schema — run this once in Supabase
- `supabase-client.js` — connects the site to your database + handles caching
- `vercel.json` — cache headers for when this is deployed
- `.gitignore` — keeps junk files (`.DS_Store`, logs, etc.) out of Git
- `images/` — organized into subfolders, see below

## Images folder structure
```
images/
├── brand/
│   ├── logo.jpg        → favicon, used on every page
│   └── founder.jpg      → About page + home page photo
├── portfolio/
│   ├── sir-zeal-academy.png
│   └── gleamguard.png   → project thumbnails, add new ones here
└── blog/
    └── (empty for now — add post cover images here)
```

**Adding a new portfolio image:** drop it in `images/portfolio/`, then
reference it in `portfolio-data.js` (or the Supabase `projects` table)
as `"images/portfolio/your-filename.png"`.

**Adding a new blog cover image:** drop it in `images/blog/`, then
reference it in `blogs-data.js` as `"images/blog/your-filename.jpg"`.

**Naming convention:** lowercase, hyphens instead of spaces
(`gleamguard-dashboard.png`, not `GleamGuard Dashboard.PNG`) — this avoids
case-sensitivity mismatches between your computer and GitHub's servers.

## Avoiding the earlier GitHub folder issue
This structure includes two safeguards:
- **`.gitkeep`** inside `images/blog/` — Git doesn't track empty folders
  at all, so without this placeholder file, that folder simply wouldn't
  get committed or pushed until you added a real image to it.
- **`.gitignore`** — keeps OS junk files out of your repo so `git status`
  stays clean and it's obvious when something real is unstaged.

Before pushing, always run `git status` and confirm every image file you
expect to see is listed — if a file (or folder) doesn't show up there,
it won't make it to GitHub no matter how many times you push.

## Running it in VS Code
1. Open this folder in VS Code
2. Install the **Live Server** extension (Ritwick Dey) if you don't have it
3. Right-click `index.html` → **Open with Live Server**



Without Supabase set up, the site still works fully — portfolio, forms
included — it just falls back to local data and forms will show a
friendly "not live yet" message instead of actually saving anything.

---

## Setting up the database (Supabase)

1. Go to **supabase.com** → create a free account → create a new project
2. Once it's ready, open **SQL Editor** in the left sidebar
3. Open `supabase-schema.sql` from this folder, copy all of it, paste into
   the SQL Editor, click **Run**
   - This creates the `projects`, `newsletter_subscribers`, and
     `contact_submissions` tables, sets up security rules, and seeds your
     two existing projects (Sir Zeal Academy + GleamGuard)
4. Go to **Project Settings → API**
5. Copy the **Project URL** and the **anon / public** key
6. Open `supabase-client.js` in this folder, paste them in at the top:
   ```js
   const SUPABASE_URL = "https://your-project.supabase.co";
   const SUPABASE_ANON_KEY = "your-anon-key-here";
   ```
7. Save, refresh the site — the portfolio grid, newsletter form, and
   contact form are now all live and backed by a real database.

**The anon key is safe to put directly in this file** — it's designed to
be public. Row Level Security (set up by the schema file) is what
actually keeps your data safe: visitors can read projects and submit
forms, but can't read other people's submissions or edit/delete anything.

## Adding a new portfolio project
Once Supabase is connected, do this instead of editing code:
1. Supabase dashboard → **Table Editor** → `projects` table
2. Click **Insert row**
3. Fill in the fields (see the comments at the top of `supabase-schema.sql`
   for what each one means) — `tags` and `features` are arrays, click the
   `{}` icon next to those fields to add multiple items
4. Save — it appears on the live site within 5 minutes (or immediately on
   a hard refresh, since that clears the local cache)

If you haven't set up Supabase yet, you can still add projects the old
way by editing `portfolio-data.js` directly — same format as before.

## Viewing form submissions
Supabase dashboard → **Table Editor** → `newsletter_subscribers` or
`contact_submissions`. Both fill up automatically as people use the site.
Consider adding a Supabase **Database Webhook** or email notification later
so you don't have to check the dashboard manually — ask if you want help
setting that up.

## Caching — what's already in place
- **Portfolio data**: cached in the browser (`localStorage`) for 5 minutes
  after each fetch, so repeat visits don't keep re-querying the database.
  A hard refresh (Ctrl/Cmd+Shift+R) always bypasses this.
- **Static assets** (`vercel.json`): once deployed to Vercel, images are
  cached for a full year (they rarely change), while HTML pages are never
  cached so your content updates always show immediately.
- **Note**: because images are cached aggressively, if you ever replace
  an image but keep the same filename, visitors' browsers may keep
  showing the old one for a while. Best practice: use a new filename
  (e.g. `gleamguard-v2.png`) whenever you swap an image.

## Things still marked as placeholders
- WhatsApp number `254700000000` — multiple spots in `index.html` and
  `project.html`
- Founder School / Academy link — currently `https://academy.sirzeal.com`
- Email address `hello@sirzeal.com` in the Contact section and footer
