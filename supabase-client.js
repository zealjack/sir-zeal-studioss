/* =========================================================================
   SUPABASE CLIENT — Sir Zeal
   =========================================================================
   SETUP:
   1. Run supabase-schema.sql in your Supabase project's SQL Editor first.
   2. Paste your Project URL and anon/public key below (Settings > API).
   3. That's it — the site reads/writes for you automatically.

   Until you fill these in, the site keeps working using the local
   portfolio-data.js file as a fallback, so nothing breaks in the meantime.
   ========================================================================= */

const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";   // e.g. https://abcxyz.supabase.co
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";  // the public "anon" key, safe to expose client-side

const SUPABASE_CONFIGURED = SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL" && SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY";

const supabaseClient = SUPABASE_CONFIGURED
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/* ---- caching -------------------------------------------------------- */
const PROJECTS_CACHE_KEY = "sirzeal_projects_cache_v1";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function readCache() {
  try {
    const raw = localStorage.getItem(PROJECTS_CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL_MS) return null;
    return data;
  } catch (e) {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch (e) {
    // localStorage unavailable (private browsing etc) — fail silently, caching is a bonus not a requirement
  }
}

function normalizeProject(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    status: row.status,
    thumbnail: row.thumbnail,
    summary: row.summary,
    liveUrl: row.live_url,
    year: row.year,
    tags: row.tags || [],
    description: row.description,
    features: row.features || [],
    role: row.role
  };
}

/* ---- public API ------------------------------------------------------ */

// Returns an array of all projects. Tries: cache -> Supabase -> local fallback file.
async function getProjects({ forceRefresh = false } = {}) {
  if (!forceRefresh) {
    const cached = readCache();
    if (cached) return cached;
  }

  if (SUPABASE_CONFIGURED) {
    try {
      const { data, error } = await supabaseClient
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const normalized = data.map(normalizeProject);
      writeCache(normalized);
      return normalized;
    } catch (err) {
      console.error('Supabase fetch failed, falling back to local data:', err);
    }
  }

  // Fallback: local portfolio-data.js (must be loaded before this script)
  return (typeof PROJECTS !== 'undefined') ? PROJECTS : [];
}

async function getProjectById(id) {
  const all = await getProjects();
  return all.find(p => p.id === id) || null;
}

async function subscribeNewsletter(name, email) {
  if (!SUPABASE_CONFIGURED) {
    throw new Error('Supabase is not configured yet — add your URL and anon key to supabase-client.js');
  }
  const { error } = await supabaseClient
    .from('newsletter_subscribers')
    .insert([{ name, email }]);
  if (error) throw error;
}

async function submitContact(name, email, message, projectInterest) {
  if (!SUPABASE_CONFIGURED) {
    throw new Error('Supabase is not configured yet — add your URL and anon key to supabase-client.js');
  }
  const { error } = await supabaseClient
    .from('contact_submissions')
    .insert([{ name, email, message, project_interest: projectInterest || null }]);
  if (error) throw error;
}
