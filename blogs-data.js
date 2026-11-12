/* =========================================================================
   BLOG DATA — Sir Zeal Insights
   =========================================================================
   HOW TO ADD A NEW POST:
   Copy one object below, paste it into the POSTS array, edit the fields.
   Both the Insights listing page and each post's detail page read from
   this same array. Kept as a local file (not the database) since blog
   content tends to be edited more freely than portfolio data — happy to
   move this into Supabase too later if you'd rather manage it from there.

   FIELD GUIDE:
   - id        : unique, lowercase, no spaces (used in the URL)
   - title     : post title
   - category  : short label, also used for the filter chips
   - date      : e.g. "Aug 2026"
   - excerpt   : one or two sentences, shown on the card
   - cover     : image URL, leave "" for a placeholder
   - body      : full post content — array of paragraph strings
   ========================================================================= */

const POSTS = [
  {
    id: "why-most-business-websites-dont-convert",
    title: "Why most business websites don't convert",
    category: "Strategy",
    date: "Jul 2026",
    cover: "images/blog/why most biz don't convert.jpeg",
    excerpt: "The three structural gaps that quietly kill inquiries before they ever happen.",
    body: [
      "Most businesses don't have a traffic problem. They have a structure problem — the website exists, people land on it, and then nothing happens.",
      "The first gap is messaging that talks about the business instead of the buyer's problem. Visitors decide in seconds whether a page is for them, and vague language costs that decision.",
      "The second gap is missing proof. A site with no evidence — no case studies, no numbers, no specifics — asks for trust it hasn't earned yet.",
      "The third gap is friction at the point of action. Every extra field, unclear button, or missing next step is a chance for someone to leave instead of reaching out.",
      "Fixing these three things, in this order, is usually worth more than any amount of extra traffic."
    ]
  },
  {
    id: "mpesa-checkout-what-actually-breaks-it",
    title: "M-Pesa checkout: what actually breaks it",
    category: "Ecommerce",
    date: "Jun 2026",
    cover: "images/blog/why mpesa crashes.jpeg",
    excerpt: "The common integration mistakes that cost Kenyan stores real sales at the worst possible moment — checkout.",
    body: [
      "M-Pesa checkout looks simple from the outside, but the failure points are almost always in the details nobody tests for.",
      "The most common issue is timeout handling. STK push has a narrow window, and if a store doesn't handle a delayed confirmation gracefully, customers assume the payment failed and abandon the order — even when it eventually goes through.",
      "The second issue is phone number formatting. Kenyan numbers show up in several formats, and if the integration doesn't normalize them before sending the request, valid customers get rejected.",
      "The third is silence after payment. A customer who pays and sees nothing confirming it will contact support, or worse, try to pay again.",
      "None of this is exotic — it's just detail work that's easy to skip under a deadline."
    ]
  },
  {
    id: "from-hired-hand-to-system-owner",
    title: "From hired hand to system owner",
    category: "Founders",
    date: "May 2026",
    cover: "images/blog/hired hand to system owner.jpeg",
    excerpt: "The mindset shift behind Founder School, broken into five practical steps.",
    body: [
      "There's a specific moment a lot of skilled people hit: they're good at the work, but every project starts from zero — no pipeline, no repeatable process, just the next inquiry if it happens to come.",
      "The shift from hired hand to system owner starts with treating outreach as a process, not an event. One-off effort produces one-off results.",
      "It continues with productizing what you do — turning a vague skill into a specific, describable offer that's easy for someone to say yes to.",
      "It requires proof before pitch: showing evidence of results before asking someone to trust you with theirs.",
      "And it ends with follow-up systems, because most business is lost not in the pitch but in the silence afterward.",
      "None of this replaces skill. It's what makes skill visible to the people who'd pay for it."
    ]
  }
];
