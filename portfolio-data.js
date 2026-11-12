/* =========================================================================
   PORTFOLIO DATA — Sir Zeal
   =========================================================================
   HOW TO ADD A NEW PROJECT:
   Copy one object below, paste it into the PROJECTS array, and edit the
   fields. That's it — the homepage grid AND the project detail page both
   read from this same array automatically. No other file needs to change.

   FIELD GUIDE:
   - id           : unique, lowercase, no spaces (used in the URL, e.g.
                    project.html?id=gleamguard)
   - title        : project name shown on the card and detail page
   - category     : short label, also used for the filter chips
                    (keep category names consistent so filtering works —
                    e.g. always "Ecommerce" not sometimes "E-commerce")
   - status       : "live" or "in-progress" — shows the status dot
   - thumbnail    : URL to a screenshot/image. Leave "" to show a
                    placeholder box instead.
   - summary      : one sentence, shown on the card
   - liveUrl      : the actual live URL of the deployed software
   - year         : year shipped
   - tags         : array of tech/stack tags, shown as small pills
   - description  : longer paragraph(s) for the detail page. Use "\n\n"
                    to separate paragraphs.
   - features     : array of bullet points for the detail page
   - role         : your role on the project (optional, shown on detail page)
   ========================================================================= */

const PROJECTS = [
  {
    id: "sir-zeal-academy",
    title: "Sir Zeal Academy",
    category: "Platform",
    status: "live",
    thumbnail: "images/portfolio/sir-zeal-academy.png",
    liveUrl: "https://sirzealacademy.lovable.app",
    year: "2026",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "M-Pesa"],
    description: "A large-scale learning platform serving two audiences at once — learners chasing digital skills like web development and AI, and students working through the Kenyan curriculum for KCSE and CBC.\n\nThe platform supports student, instructor, and admin roles, with M-Pesa, Stripe, and PayPal all wired into the checkout flow so payment is never the blocker between a learner and a course.",
    features: [
      "Dual-track design: Digital Wing and Curriculum Wing",
      "Student, instructor, and admin role systems",
      "M-Pesa, Stripe, and PayPal checkout",
      "21 routes, 80+ components across the platform"
    ],
    role: "Full-stack design & development"
  },
  {
    id: "gleamguard",
    title: "GleamGuard",
    category: "Business Website",
    status: "live",
    thumbnail: "images/portfolio/gleamguard.png",
    liveUrl: "https://gleamguard-com.vercel.app",
    year: "2026",
    tags: ["React", "Supabase", "SSR"],
    description: "A full rebuild for a cleaning and pest control company, moved from a design tool export into a production-ready, server-rendered site with a real backend behind it.\n\nThe brief expanded mid-project to include a live booking system and an admin dashboard, so the client could manage incoming jobs without touching code.",
    features: [
      "Server-side rendering fixed for reliable routing",
      "Custom SVG illustrations replacing corrupted image assets",
      "Supabase backend powering bookings",
      "Admin dashboard for job management"
    ],
    role: "Development & deployment"
  },
  {
    id: "ZealPro Cleaners",
    title: "ZealPro Cleaners",
    category: "Business Website",
    status: "live",
    thumbnail: "images/portfolio/ZealPro Cleaners.png",
    liveUrl: "https://zealjack.github.io/-zeal-s-cleaning-site/",
    year: "2025",
    tags: ["React", "Supabase", "SSR"],
    description: "A full rebuild for a cleaning and pest control company, moved from a design tool export into a production-ready, server-rendered site with a real backend behind it.\n\nThe brief expanded mid-project to include a live booking system and an admin dashboard, so the client could manage incoming jobs without touching code.",
    features: [
      "Server-side rendering fixed for reliable routing",
      "Custom SVG illustrations replacing corrupted image assets",
      "Supabase backend powering bookings",
      "Admin dashboard for job management"
    ],
    role: "Development & deployment"
  }


  /* Add your next live project below this line — copy the block above. */
];
