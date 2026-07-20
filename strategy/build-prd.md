# Build PRD — Track Academy Website Rebuild

*Version 1.0 · July 2026*
*The engineering execution document. Read this while building. For page content and copy, see `prd.md`. For visual language, see `art-direction.md`. For brand tokens, see `brand-guidelines.md`.*

---

## 1. Purpose of This Document

This is the developer's working document. It defines:

- Locked technical decisions
- The exact file and folder architecture
- The component inventory (what to build once, reuse everywhere)
- A compact page-to-component matrix (not full content specs — those live in `prd.md`)
- Sanity CMS schema types
- Supabase MVP scope (subset of the full 18-table schema)
- Build phases with dependencies and acceptance criteria
- Design tokens formatted for Tailwind config
- Risk register
- Definition of done

**What this document is NOT:** A re-specification of page content, copy, or visual design. Those are complete in the referenced strategy documents. If you need to know what the homepage says, open `prd.md` section 3.1. If you need to know which components to build and in what order, you're in the right place.

---

## 2. Locked Technical Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **Framework** | **Astro** | Static-first, island architecture, zero JS by default, best Lighthouse scores for a content-heavy 17-page site. Next.js is overkill — no authenticated pages, no server components needed for MVP. |
| **Styling** | **Tailwind CSS v4** | Already specified in art-direction.md. Utility classes map 1:1 to design tokens. No CSS-in-JS overhead. |
| **CMS** | **Sanity (headless)** | Staff edit content without code. Free tier covers this scale. Studio can be deployed or run locally. |
| **Database** | **Supabase (PostgreSQL)** | Registration form data, enquiry submissions, Upshot sync log. Full 18-table schema exists in `database-schema.md` but MVP only needs a subset. |
| **Hosting** | **Cloudflare Pages** | Calvin's infrastructure. Free to client. Pair with `@astrojs/cloudflare` adapter. |
| **Forms** | **Astro components + Supabase Edge Functions** | Registration wizard needs server-side validation + Upshot sync. No third-party form services. |
| **Fonts** | **Self-hosted (Fredoka + Inter)** | Both are Open Font License. No Google Fonts CDN = no GDPR consent banner, no FOUT, better LCP. |
| **Image optimisation** | **Astro's built-in `<Image>` with `astro:assets`** | Automatic AVIF/WebP, responsive srcset, lazy loading. No Cloudflare Image Resizing for MVP. |
| **Analytics** | **GA4 + Google Search Console** | Via `@analytics/google-analytics` or native gtag. Not Vercel Analytics — we're on Cloudflare. |
| **Package manager** | **npm** | Standard, no monorepo complexity. |
| **TypeScript** | **Yes, strict mode** | Catch errors at build. Astro has first-class TS support. |

### Not in scope for MVP (Phase 2+)

- Stripe payments
- Parent/school/funder portals
- Athlete Passports
- Live impact dashboard
- Spond replacement
- Blog/news section

---

## 3. Project Structure

```
website/
├── astro.config.mjs                    # Astro config: Cloudflare adapter, Tailwind, Sanity integration
├── tailwind.config.mjs                 # Design tokens from brand-guidelines.md
├── tsconfig.json
├── package.json
├── .env                                # SANITY_PROJECT_ID, SANITY_DATASET, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
├── .env.example
├── public/
│   ├── favicon.ico
│   ├── og-image.png                    # Default Open Graph image
│   ├── robots.txt
│   ├── fonts/
│   │   ├── Fredoka-Medium.woff2
│   │   ├── Fredoka-SemiBold.woff2
│   │   ├── Inter-Regular.woff2
│   │   ├── Inter-Medium.woff2
│   │   └── Inter-SemiBold.woff2
│   └── pdfs/                           # Safeguarding policies, annual report, re-hosted from current site
│       ├── safeguarding-policy-2024.pdf
│       └── annual-report-2024.pdf
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro            # <html>, <head>, SEO meta, header, footer, skip link, slot
│   │   └── BlankLayout.astro           # No header/footer — for potential iframe embeds or print pages
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro            # Logo, nav, dropdowns, mobile hamburger, Register CTA
│   │   │   ├── Footer.astro            # 4-column: brand, quick links, get involved, contact + trust strip
│   │   │   ├── NavDropdown.astro       # Reusable dropdown for About and Programmes nav items
│   │   │   └── MobileMenu.astro        # Slide-in mobile nav
│   │   ├── sections/
│   │   │   ├── Hero.astro              # Full-bleed hero with image + gradient overlay + CTAs
│   │   │   ├── SplitFeature.astro     # 50/50 image+text, alternate sides via prop
│   │   │   ├── StatBand.astro          # Full-width Track Blue band, count-up animation on scroll
│   │   │   ├── CardGrid.astro          # Configurable: 2-up, 3-up, 4-up. Slot for card content.
│   │   │   ├── QuoteCard.astro         # Large text, attribution, optional portrait image
│   │   │   ├── AudienceRouter.astro    # 3-card "Who are you?" pattern
│   │   │   ├── StepFlow.astro          # Numbered steps with connecting line
│   │   │   ├── CTABanner.astro         # Full-width CTA band, configurable variant
│   │   │   ├── TrustStrip.astro        # Greyscale logos, colour on hover
│   │   │   └── InstagramFeed.astro     # Latest 6 posts from @trackacademy_
│   │   ├── cards/
│   │   │   ├── ProgrammeCard.astro     # Edge-to-edge image, heading, desc, arrow link
│   │   │   ├── PersonCard.astro        # Photo, name, role, optional bio
│   │   │   ├── EventCard.astro         # Date badge, title, venue, description, entry link
│   │   │   ├── StatCard.astro          # Number + label, used inside StatBand and standalone
│   │   │   ├── StoryCard.astro         # Quote + attribution + image, for testimonials
│   │   │   └── PricingTier.astro        # Tier name, price, features list, CTA, highlight prop
│   │   ├── ui/
│   │   │   ├── Button.astro            # Variants: primary, secondary, tertiary/link. Sizes: default, large.
│   │   │   ├── Badge.astro             # Variants: free, closing, pupil-premium, custom
│   │   │   ├── Accordion.astro         # Accessible disclosure component
│   │   │   ├── Tabs.astro              # For audience-specific content panels
│   │   │   └── CountUp.astro           # Intersection Observer + requestAnimationFrame count-up
│   │   └── forms/
│   │       ├── RegistrationWizard.astro # 9-step multi-step form (see Phase 5)
│   │       ├── ContactForm.astro       # Audience-routed contact form
│   │       ├── EnquiryForm.astro       # Reusable: schools enquiry, performance coaching enquiry
│   │       └── FormField.astro         # Generic input: text, email, tel, select, radio, checkbox, date
│   ├── pages/
│   │   ├── index.astro                 # Homepage
│   │   ├── about.astro
│   │   ├── impact.astro
│   │   ├── safeguarding.astro
│   │   ├── team.astro
│   │   ├── athletics.astro
│   │   ├── education.astro
│   │   ├── mentoring.astro
│   │   ├── holiday-programmes.astro
│   │   ├── performance-coaching.astro
│   │   ├── schools.astro
│   │   ├── events.astro
│   │   ├── competitions.astro
│   │   ├── register.astro
│   │   ├── support.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   └── 404.astro
│   ├── styles/
│   │   └── global.css                  # Tailwind directives + @font-face + base layer + custom utilities
│   ├── lib/
│   │   ├── sanity.ts                   # Sanity client, groq queries, preview mode
│   │   ├── supabase.ts                 # Supabase client (browser + server)
│   │   ├── utils.ts                    # cn() class merger, formatters, helpers
│   │   └── seo.ts                      # Meta tag builder, schema.org JSON-LD, OG tags
│   ├── content/                        # For markdown-only pages (privacy policy)
│   │   └── privacy.md
│   └── assets/                         # Optimised images (astro:assets processes these)
│       ├── hero/                       # Hero images, organised by page
│       ├── programme/                  # Programme card images
│       ├── team/                        # Staff photos
│       └── graphics/                   # Event graphics, programme graphics
├── sanity/
│   ├── sanity.config.ts                # Studio config
│   ├── schemas/
│   │   ├── index.ts                    # Schema barrel export
│   │   ├── siteSettings.ts             # Global: logo, nav, social, contact, footer
│   │   ├── page.ts                     # Generic page: title, slug, meta, portable content
│   │   ├── programmePage.ts            # Programme-specific: schedule, pricing, content sections
│   │   ├── teamMember.ts               # Name, role category, photo, bio, display order
│   │   ├── event.ts                    # Title, date, venue, type, description, entry link, image
│   │   ├── fixture.ts                  # Date, competition, venue, age groups, type, entry link, isClubSelected
│   │   ├── story.ts                    # Quote, attribution, context, image, category, display
│   │   ├── stat.ts                     # Number, label, context, year
│   │   ├── funderLogo.ts               # Name, logo, url, display order
│   │   └── policy.ts                   # Title, file, category
│   └── plugins/
│       └── (future: custom input components)
├── supabase/
│   └── migrations/
│       ├── 001_create_athletes_guardians.sql
│       ├── 002_create_enquiries.sql
│       ├── 003_create_upshot_sync_log.sql
│       └── 004_rls_policies.sql
├── tests/
│   └── e2e/                            # Playwright tests (optional for MVP, recommended for forms)
│       └── registration.spec.ts
└── CLAUDE.md                           # Instructions for AI assistants working on this repo
```

---

## 4. Design Tokens (for Tailwind Config)

Extracted from `brand-guidelines.md`. Paste into `tailwind.config.mjs`.

```js
// tailwind.config.mjs — design tokens
export default {
  theme: {
    extend: {
      colors: {
        // Primary
        'track-blue': '#112b8c',
        'track-orange': '#f2620e',
        // Extended
        'track-gold': '#f2b90e',
        'track-light-orange': '#f2a30f',
        'track-navy': '#0a1c5f',
        'track-pink': '#d90152',
        'track-grey': '#4a4a4a',
        'track-light-grey': '#f5f5f5',
        // Utilities
        'ink': '#1a1a1a',
        // Semantic
        'success': '#1a7d3a',
        'warning': '#e8a200',
        'error': '#d90152',
      },
      fontFamily: {
        'heading': ['Fredoka', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Mobile-first scale (use responsive variants for desktop)
        'hero': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h2': ['1.5rem', { lineHeight: '1.2' }],
        'h3': ['1.25rem', { lineHeight: '1.3' }],
        'stat': ['2.5rem', { lineHeight: '1', fontWeight: '700' }],
      },
      maxWidth: {
        'content': '1280px',
      },
      spacing: {
        'section': '80px',    // Desktop section padding (48px mobile via responsive)
        'container': '48px',  // Desktop container padding (24px mobile via responsive)
      },
      borderRadius: {
        '0': '0px', // Square corners — deliberate sport aesthetic per art-direction.md
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
        'count-up': 'count-up 0.8s ease-out forwards',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}
```

### Desktop type scale (apply via responsive breakpoints)

| Element | Mobile | Desktop (`lg:`) |
|---|---|---|
| Hero | `text-hero` (2.25rem) | `lg:text-[4rem]` |
| H1 | `text-h1` (1.75rem) | `lg:text-[3rem]` |
| H2 | `text-h2` (1.5rem) | `lg:text-[2.25rem]` |
| H3 | `text-h3` (1.25rem) | `lg:text-[1.5rem]` |
| Body | `text-base` (1rem) | `lg:text-lg` (1.125rem) |
| Stat | `text-stat` (2.5rem) | `lg:text-[4.5rem]` |

### Hero gradient overlay (from art-direction.md)

```css
/* In global.css under @layer components or as utility class */
.hero-overlay {
  background: linear-gradient(
    to top,
    rgba(17, 43, 140, 0.75) 0%,
    rgba(17, 43, 140, 0.3) 50%,
    rgba(17, 43, 140, 0) 100%
  );
}
```

---

## 5. Component Inventory

Every component listed with its props, reusability, and which pages consume it.

### Layout Components

| Component | Props | Consumed By |
|---|---|---|
| `Header.astro` | `siteSettings` (from Sanity: logo, nav structure, social links) | `BaseLayout` (all pages) |
| `Footer.astro` | `siteSettings` (same) | `BaseLayout` (all pages) |
| `NavDropdown.astro` | `label: string`, `items: {label, href}[]` | `Header` |
| `MobileMenu.astro` | `navStructure` | `Header` |

### Section Components (page building blocks)

| Component | Props | Consumed By |
|---|---|---|
| `Hero.astro` | `image: ImageMetadata`, `headline: string`, `lead?: string`, `ctaPrimary?: {label, href}`, `ctaSecondary?, {label, href}`, `ctaTertiary?: {label, href}`, `variant: 'full-bleed' | 'split' | 'simple'` | Homepage, Athletics, Schools, Safeguarding, Mentoring, Events, Competitions, Support, Contact |
| `SplitFeature.astro` | `image`, `imageSide: 'left' | 'right'`, `heading`, `body` (slot or HTML), `cta?`, `background: 'white' | 'light-grey'` | Homepage (schools teaser, 360 approach), About (founder story), Education, Mentoring, Schools (funding model), Performance Coaching |
| `StatBand.astro` | `stats: {number, label, context?}[]`, `caption?: string`, `background: 'track-blue' | 'track-navy'` | Homepage, Impact (x2), Schools, Mentoring, Support |
| `CardGrid.astro` | `columns: 2 | 3 | 4`, `cards: slot` | Homepage (what we do, get involved), Education (life skills), Holiday Programmes (past activities), Events |
| `QuoteCard.astro` | `quote: string`, `attribution: string`, `context?: string`, `image?: ImageMetadata` | Homepage, Impact, Schools, Mentoring |
| `AudienceRouter.astro` | `title?: string` (default "Who are you?"), `routes: {label, href, description}[]` | Homepage, Contact |
| `StepFlow.astro` | `steps: {number, title, description}[]`, `variant: 'timeline' | 'numbered'` | Mentoring (how it works), Schools (how it works), Safeguarding (how to raise concern), Performance Coaching (session structure), Competitions (URN process) |
| `CTABanner.astro` | `heading`, `body?`, `ctaPrimary?`, `ctaSecondary?`, `variant: 'solid-blue' | 'solid-orange' | 'split'` | Athletics, Education, Mentoring, Performance Coaching, Holiday Programmes, Support, Competitions |
| `TrustStrip.astro` | `logos: {name, image, url?}[]` | Footer, Impact, Safeguarding, Support |
| `InstagramFeed.astro` | `username: string` (default "@trackacademy_"), `count: number` (default 6) | Homepage |

### Card Components (used inside CardGrid or standalone)

| Component | Props | Consumed By |
|---|---|---|
| `ProgrammeCard.astro` | `image`, `title`, `description`, `href` | Homepage (what we do grid) |
| `PersonCard.astro` | `photo?`, `name`, `role`, `bio?`, `featureLink?` | Team page, Safeguarding (DSL cards) |
| `EventCard.astro` | `date`, `title`, `venue`, `description`, `entryLink?`, `image?` | Events, Holiday Programmes |
| `StatCard.astro` | `number`, `label`, `context?` | Inside StatBand, Impact page |
| `StoryCard.astro` | `quote`, `attribution`, `context?`, `image?` | Homepage, Impact, Stories section |
| `PricingTier.astro` | `name`, `price`, `features: string[]`, `cta: {label, href}`, `highlight: boolean` | Schools (tiers), Performance Coaching (tiers) |

### UI Components

| Component | Props | Consumed By |
|---|---|---|
| `Button.astro` | `href`, `label`, `variant: 'primary' | 'secondary' | 'link'`, `size: 'default' | 'large'`, `external?: boolean` | Everywhere |
| `Badge.astro` | `label`, `variant: 'success' | 'warning' | 'info' | 'custom'`, `customColor?` | Athletics (free badge), Events (entries closing), Schools (pupil premium) |
| `Accordion.astro` | `items: {title, content}[]` | Safeguarding (what is safeguarding), Competitions (URN accordion) |
| `Tabs.astro` | `tabs: {label, content/slot}[]` | Events (audience-specific info), Competitions (sign-up types) |
| `CountUp.astro` | `target: number`, `duration?: number` (default 800ms), `prefix?`, `suffix?` | StatBand, StatCard |

### Form Components

| Component | Props | Consumed By |
|---|---|---|
| `RegistrationWizard.astro` | (internal state, 9 steps) | Register page only |
| `ContactForm.astro` | (audience-route logic) | Contact page |
| `EnquiryForm.astro` | `variant: 'schools' | 'performance' | 'support'`, `fields: FieldConfig[]` | Schools, Performance Coaching, Support |
| `FormField.astro` | `name`, `label`, `type`, `required`, `options?`, `placeholder?`, `error?`, `helperText?`, `conditional?: {showWhen, equals}` | All forms |

---

## 6. Page-to-Component Matrix

Compact reference. For full content and copy, see `prd.md` section 3.x.

### Key
- **Data**: `S` = Sanity, `Db` = Supabase, `Static` = hardcoded in page file
- **Phase**: build phase (see section 8)

| Page | URL | Components Used | Data | Special | Phase |
|---|---|---|---|---|---|
| Homepage | `/` | Hero, AudienceRouter, CardGrid+ProgrammeCard x4, SplitFeature, StatBand, CardGrid+StoryCard x3, SplitFeature (schools teaser), InstagramFeed, CardGrid+CTABanner x3 | Stats: Sanity. Rest: Static. Instagram: API. | Count-up animation, Instagram embed | 1 |
| About | `/about` | Hero(split), SplitFeature, 360 diagram (custom), StatBand (Brent context), timeline (StepFlow), video embed | Founder quote: Sanity. Video: existing embed. | 360-degree diagram component (custom SVG/CSS circles) | 3 |
| Impact | `/impact` | StatBand (hero), StatBand (core), CardGrid+StatCard x8, demographics panel, CardGrid+StoryCard x3, annual report download, TrustStrip, CTABanner | Stats: Sanity (yearly figures). Stories: Sanity. Report: PDF in `/public/pdfs/`. | Count-up, PDF download tracking | 3 |
| Safeguarding | `/safeguarding` | Hero(simple), commitment band (custom), CardGrid+PersonCard x3 (DSLs), Accordion, StepFlow, external contacts (custom), policy links, TrustStrip | Policies: Sanity (file links). DSL contacts: Sanity. | Direct email/mailto links to DSLs | 3 |
| Team | `/team` | Hero, CardGrid+PersonCard (leadership, coaches, mentors, tutors, trustees), founder tribute section | All team members: Sanity (photo, name, role, bio, category, display order) | Group by category, display order sorting | 3 |
| Athletics | `/athletics` | Hero(full-bleed), two programme blocks (custom SplitFeature), pricing card (custom), bullet list, SEND callout (Badge), CTABanner | Session times/prices: Sanity | Auto-detect age group from DOB (on registration, not here) | 3 |
| Education | `/education` | Hero, SplitFeature, 10 Life Skills grid (CardGrid+custom skill cards), SplitFeature, CTABanner | 10 skills: Sanity (icon, name, desc, case evidence) | Life skills interactive grid (hover/tap to reveal case evidence) | 3 |
| Mentoring | `/mentoring` | Hero, text block, StepFlow, bullet list, StatBand (mini), mentoring dinners callout, Coach Lumar feature, CTABanner | Stats: Sanity. Lumar story: Sanity or static. | Optional Lumar feature (toggle via Sanity entry) | 3 |
| Holiday Programmes | `/holiday-programmes` | Hero, CardGrid (past activities), StatBand, events feed (EventCard), callout, CTABanner | Past activities: Sanity. Upcoming: Sanity events filtered by type. | Conditional: if no upcoming events, show Instagram CTA instead | 3 |
| Performance Coaching | `/performance-coaching` | Hero, SplitFeature, StepFlow (session structure), football callout, PricingTier x3, EnquiryForm | Pricing: Sanity. Form: Supabase enquiries. | Enquiry form writes to Supabase + email notification | 3+5 |
| Schools | `/schools` | Hero(full-bleed), 3 pillars, bullet list, SplitFeature (funding), 6-point list, StepFlow, 2x QuoteCard, StatBand, PricingTier x3, EnquiryForm | Tiers/pricing: Sanity. Testimonials: Sanity. Form: Supabase. | Tier highlight (middle), enquiry form to Patrik/Erick | 3+5 |
| Events | `/events` | Hero, EventCard grid (filtered), featured event card (hero card), 3-up grid, Tabs (audience info), CTABanner | Events: Sanity (staff add/edit via CMS). Filter: client-side. | Filter by type (All/Open Meets/Community/Schools/Holiday), empty state | 4 |
| Competitions | `/competitions` | Hero, StepFlow (URN), Accordion, fixtures table (custom), bullet checklist, Competing Membership Form, CTABanner | Fixtures: Sanity (staff manage via CMS). Form: Supabase. | Filterable table (Indoor/Outdoor/Age/Type), external Spond link | 4+5 |
| Register | `/register` | Hero(simple), RegistrationWizard | Form: Supabase (athletes, guardians, athlete_guardians). Sync: Upshot API (Edge Function). | 9-step wizard, save & resume, sibling autofill, validation on blur, count-up progress bar. **Most complex component in the build.** | 5 |
| Support | `/support` | Hero, StatBand, 3-up cards (donate/sponsor/volunteer), corporate callout, fundraising events, transparency breakdown, TrustStrip, CTABanner | Fundraising events: Sanity. Donate link: Whydonate (external). | External Whydonate link, corporate sponsorship enquiry form | 3+5 |
| Contact | `/contact` | Hero(simple), contact details (custom), ContactForm (audience-routed), safeguarding redirect callout, Google Map embed | Form: Supabase enquiries. Map: Google Maps embed. | Audience-type selector changes form fields dynamically | 5 |
| Privacy | `/privacy` | BlankLayout or BaseLayout with simple content | Content: markdown file or Sanity page | Static legal page | 6 |
| 404 | `/404` | Track Blue hero, quick links (custom), count-up joke | Static | Error page, must be useful not decorative | 6 |

---

## 7. Sanity CMS Schema Plan

### What goes in Sanity (staff-edited) vs what stays in code (developer-edited)

**In Sanity (needs to be editable by non-technical staff):**
- Site settings (logo, nav structure, social links, contact info, footer links)
- Team members (name, photo, role, category, bio, display order)
- Events (title, date, venue, type, description, entry link, image)
- Fixtures (date, competition name, venue, age groups, type, entry link, is club selected)
- Stories/testimonials (quote, attribution, context, image, category)
- Stats (number, label, year — so annual report figures can be updated yearly)
- Programme content (session times, pricing, what's included — these change termly)
- Policies (title, file upload, category — safeguarding policies update)
- Funder logos (name, logo, url, display order)
- Page meta content (SEO title, description per page)

**In code (doesn't change without a developer):**
- Page layout and structure
- Navigation hierarchy (which pages exist, dropdown groupings)
- Homepage hero image (or: make this Sanity-managed too via siteSettings)
- 360-degree diagram component
- 10 Life Skills definitions (rarely change; if they do, it's a code change)
- Form field definitions for registration wizard (complex logic, validation rules)

### Schema Types

#### 1. `siteSettings` (singleton)
```
- logo: image (two variants: standard + white)
- navStructure: array of { label, href, dropdown?: array of {label, href} }
- footerLinks: array of { column: string, links: array of {label, href} }
- socialLinks: array of { platform, url }
- contactInfo: { email, phone, addressLine1, postcode, venueName, sessionTimes }
- charityNumber: string
- accreditationLogos: array of image
```

#### 2. `teamMember`
```
- name: string
- role: string
- category: enum [leadership, coach, mentor, tutor, trustee, founder]
- photo: image
- bio: text (optional)
- featureLink: { label, url } (optional — e.g., Coach Lumar's Like The Wind article)
- displayOrder: number
```

#### 3. `event`
```
- title: string
- date: datetime
- endDate: datetime (optional)
- venue: string
- eventType: enum [open-meet, community, schools, holiday, fundraiser]
- description: text
- entryLink: url (optional — e.g., OpenTrack URL)
- image: image
- isFeatured: boolean
- isPublished: boolean
```

#### 4. `fixture`
```
- date: datetime
- competition: string
- venue: string
- ageGroups: array of enum [U11, U13, U15, U17, U20, Senior, Masters]
- fixtureType: enum [indoor, outdoor, track, field, combined, cross-country, relay]
- entryLink: url (optional)
- isClubSelected: boolean (Track Academy selected fixture — highlighted in table)
- isPublished: boolean
```

#### 5. `story`
```
- quote: text
- attribution: string (name)
- context: string (e.g., "Age 14, Jack Petchey winner")
- image: image (optional)
- category: enum [athlete, parent, school, community, media]
- displayOnHomepage: boolean
- displayOrder: number
```

#### 6. `stat`
```
- number: string (e.g., "577", "98%", "200+")
- label: string (e.g., "sessions delivered", "would recommend")
- context: string (e.g., "In 2024")
- year: number
- displayLocation: array of enum [homepage-band, impact-core, impact-outcomes, schools, mentoring, support]
```

#### 7. `programmeContent`
```
- programme: enum [athletics, education, mentoring, holiday-programmes, performance-coaching, schools]
- scheduleBlocks: array of { day, time, ageRange, description }
- pricing: { amount, period, freeEligibility, notes }
- whatIncluded: array of string
- whatToBring: array of string (optional)
- sendSessions: { description, day, time, contact } (optional)
- pageContent: portableText (main body content for the page)
```

#### 8. `policy`
```
- title: string
- category: enum [safeguarding, privacy, terms, accessibility, other]
- file: file
- uploadedAt: datetime
```

#### 9. `funderLogo`
```
- name: string
- logo: image
- url: url (optional)
- displayOrder: number
- displayOnPages: array of enum [footer, impact, support, safeguarding]
```

---

## 8. Supabase MVP Scope

The full 18-table schema in `database-schema.md` is designed for Phase 1-4. **For the MVP website, only implement these tables:**

### MVP Tables (create in this order)

#### 1. `athletes`
Full schema per `database-schema.md` section 1. Needed for registration wizard step 1.

#### 2. `guardians`
Full schema per `database-schema.md` section 2. Needed for registration wizard step 2.

#### 3. `athlete_guardians` (junction)
Per `database-schema.md` section 3.

#### 4. `schools` (minimal — for enquiry routing and athlete-school mapping)
Per `database-schema.md` section 4. MVP only needs: id, name, type, contact info, is_partner. Partnership tiers and management are Phase 2.

#### 5. `enquiries`
New table (not in original schema — add it):
```sql
CREATE TABLE enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_type text NOT NULL,  -- 'contact', 'school_enquiry', 'performance_enquiry', 'support_enquiry', 'volunteer'
  audience_type text,           -- 'parent', 'school', 'funder', 'volunteer', 'other'
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  organisation text,            -- school name, company, etc.
  role text,                    -- Head of PE, etc.
  message text NOT NULL,
  metadata jsonb,               -- additional fields specific to form variant
  status text DEFAULT 'new',    -- 'new', 'in_progress', 'responded', 'closed'
  assigned_to text,             -- staff email
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### 6. `upshot_sync_log`
Per `database-schema.md` section 14. Tracks sync status of registrations to Upshot.

### RLS Policies (MVP)

```sql
-- Public can INSERT into athletes, guardians, athlete_guardians (registration)
-- Public can INSERT into enquiries (contact/enquiry forms)
-- Public cannot SELECT, UPDATE, or DELETE any table
-- Staff (authenticated via Supabase Auth) can SELECT and UPDATE all tables
-- See database-schema.md for full RLS policy definitions
```

### Migrations

Create SQL migration files in `supabase/migrations/`:
1. `001_create_athletes_guardians.sql` — athletes, guardians, athlete_guardians, athlete_schools junction
2. `002_create_enquiries.sql` — enquiries table
3. `003_create_upshot_sync_log.sql` — sync tracking
4. `004_rls_policies.sql` — enable RLS, create policies

### What stays for Phase 2+
- `staff` table (use Supabase Auth for MVP staff access)
- `sessions`, `session_attendance` (Phase 3 engagement tracking)
- `outcomes` (Phase 3 impact surveys)
- `membership_payments` (Phase 2 Stripe)
- `volunteers` (Phase 4)
- `school_partnerships` management (Phase 2 school portal)

---

## 9. Build Phases

Each phase has: **goal, inputs (dependencies), deliverables, acceptance criteria.**

### Phase 0: Project Scaffold
**Goal:** Empty Astro project that builds and deploys.

| | |
|---|---|
| **Inputs** | None |
| **Deliverables** | `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `.env.example`, `global.css` with design tokens, self-hosted fonts, `BaseLayout.astro` (minimal), `index.astro` (hello world) |
| **Acceptance** | `npm run dev` starts server. `npm run build` produces `dist/`. Fonts load (no Google Fonts requests). Tailwind classes work. Design tokens render correctly (Track Blue, Track Orange, Fredoka, Inter). |
| **Estimate** | 1 day |

### Phase 1: Header, Footer & Homepage
**Goal:** A visual homepage that the client signs off on.

| | |
|---|---|
| **Inputs** | Phase 0 complete. Brand images from `research/Track Academy/Assets/`. |
| **Deliverables** | `Header.astro` (logo, nav, dropdowns, mobile menu), `Footer.astro` (4 columns + trust strip), homepage (all 9 sections per `prd.md` 3.1) with inline component usage (extracting to reusable components comes in Phase 2) |
| **Acceptance** | Homepage matches `prd.md` spec and `art-direction.md` visual language. Mobile responsive (375px through 1440px+). Lighthouse mobile performance > 90. Client approves direction. |
| **Key decision point** | Client sign-off on homepage before proceeding. If they want changes, iterate here, not later. |
| **Estimate** | 3-4 days |

### Phase 2: Component Library Extraction
**Goal:** All reusable components built, documented, and ready for page assembly.

| | |
|---|---|
| **Inputs** | Phase 1 complete. Homepage has proven the visual direction. |
| **Deliverables** | All section, card, and UI components from section 5 built as standalone `.astro` files with TypeScript props. Homepage refactored to use extracted components. Storybook or `/dev/components` route showing each component in isolation. |
| **Acceptance** | Every component renders correctly with props. Homepage still works after refactor. No visual regression. |
| **Estimate** | 2-3 days |

### Phase 3: Static Content Pages
**Goal:** All 12 non-form, non-dynamic pages built and populated.

| Build order | Page | Complexity | Notes |
|---|---|---|---|
| 3a | About | Medium | Founder story, 360 diagram (custom), Brent context stats, timeline |
| 3b | Team | Low | Pure card grid page, 6 categories |
| 3c | Safeguarding | Medium | DSL cards, accordion, policies, step flow |
| 3d | Impact | Medium-high | Multiple stat bands, outcome grid, stories, PDF download |
| 3e | Athletics | Medium | Programme blocks, pricing card, SEND callout |
| 3f | Education | Medium | 10 Life Skills grid (interactive) |
| 3g | Mentoring | Low-medium | Step flow, stats, optional Lumar feature |
| 3h | Holiday Programmes | Low | Card grid, stats, events feed placeholder |
| 3i | Support | Medium | Donate, sponsor, volunteer cards, transparency breakdown |

| | |
|---|---|
| **Inputs** | Phase 2 complete. Content from `research/scraped/*.md` and `prd.md` section 3. |
| **Deliverables** | All listed page files built and populated with real content. |
| **Acceptance** | Each page matches its `prd.md` spec. Cross-browser tested. Mobile responsive. No broken links. |
| **Estimate** | 5-7 days |

### Phase 4: Dynamic Pages (Sanity-powered)
**Goal:** Events and Competitions pages pulling live data from Sanity CMS.

| | |
|---|---|
| **Inputs** | Phase 3 complete. Sanity project created, schemas deployed, initial content entered. |
| **Deliverables** | `events.astro` pulling from Sanity events schema, filtered by type. `competitions.astro` with fixtures table from Sanity fixtures schema. Sanity Studio accessible for staff. |
| **Acceptance** | Staff can add/edit/delete events and fixtures in Sanity Studio. Changes reflect on website within revalidation window (on-demand revalidation or scheduled build). Filter functionality works. Empty states display correctly. |
| **Estimate** | 3-4 days |

### Phase 5: Forms
**Goal:** All forms functional, writing to Supabase, with email notifications.

| Build order | Form | Complexity | Backend |
|---|---|---|---|
| 5a | ContactForm | Medium | Audience routing, Supabase enquiries table, email to admin@ |
| 5b | EnquiryForm (schools) | Low-medium | Reusable form, Supabase enquiries, email to Patrik |
| 5c | EnquiryForm (performance) | Low | Same component, different fields, email to coach |
| 5d | RegistrationWizard | **High** | 9 steps, conditional fields, Supabase insert (3 tables), Upshot sync (Edge Function), confirmation email, save & resume, sibling autofill |

| | |
|---|---|
| **Inputs** | Phase 4 complete. Supabase project created, migrations applied. Edge Function environment configured. |
| **Deliverables** | All forms functional. Registration wizard complete with validation, save & resume, and Upshot sync. |
| **Acceptance** | Form submissions write to Supabase. Registration creates athlete + guardian records. Email notifications arrive. Upshot sync attempts and logs status. Form validation prevents invalid submissions. Save & resume works (draft saved to Supabase or localStorage). Sibling autofill pre-fills guardian details. |
| **Estimate** | 7-10 days (registration wizard alone is 4-5) |

### Phase 6: Polish & Launch Prep
**Goal:** Site is production-ready.

| | |
|---|---|
| **Inputs** | Phase 5 complete. |
| **Deliverables** | Privacy policy page, 404 page. SEO implementation (meta tags, schema.org, OG tags, sitemap.xml, robots.txt). 301 redirect map from old URLs. Image optimisation pass. Accessibility audit (WCAG AA). Performance audit. GA4 + Search Console setup. Cross-device testing. |
| **Acceptance** | Lighthouse mobile: Performance > 90, Accessibility > 95, SEO > 95, Best Practices > 95. WCAG AA passes (automated + manual). All 404 redirects tested. Sitemap submitted to Google. |
| **Estimate** | 2-3 days |

### Phase 7: Deploy & DNS Migration
**Goal:** Site live on trackacademy.co.uk.

| | |
|---|---|
| **Inputs** | Phase 6 complete. Client content review approved. |
| **Deliverables** | Deploy to Cloudflare Pages. DNS records updated. SSL verified. Old WordPress site archived. Sanity Studio deployed. |
| **Acceptance** | Site accessible at trackacademy.co.uk. HTTPS working. All pages load. Forms submit correctly in production. Sanity Studio accessible to staff. GA4 receiving data. |
| **Estimate** | 1 day + DNS propagation |

### Phase 8: Staff Training & Handover
**Goal:** Staff can manage content independently.

| | |
|---|---|
| **Deliverables** | Sanity CMS training session (recorded). Documentation: how to add team members, events, fixtures, stories, stats, programmes. How to update annual report figures. How to update safeguarding policies. |
| **Acceptance** | Staff can independently: add an event, add a team member, update a stat, update a programme price. |
| **Estimate** | 0.5 days |

---

## 10. Risk Register

| # | Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| 1 | **Upshot API integration is more complex than expected** | Registration can't sync. Admin still has to manually enter to Upshot. | Medium | Build registration wizard with Supabase insert as primary (guaranteed to work). Upshot sync is a bonus layer — if it fails, log the error and notify admin. Manual fallback is documented. Don't block launch on Upshot sync. |
| 2 | **Client doesn't have photos for all team members** | Team page looks incomplete | High | Build PersonCard with graceful fallback: if no photo, show Track Blue background with initials. Don't block on missing photos. |
| 3 | **Instagram API requires Meta developer account approval** | Instagram feed on homepage doesn't work | Medium | Use a lightweight Instagram embed (static profile link with last-known posts) or Elfsite widget (they already have this). Don't build custom Instagram API integration for MVP. |
| 4 | **DNS propagation causes downtime during migration** | Site temporarily inaccessible | Low | Schedule DNS change for low-traffic time (Sunday 2am). Keep old WordPress site running in parallel until new site is confirmed live. Use Cloudflare's DNS (fast propagation). |
| 5 | **Client requests significant homepage changes after sign-off** | Phase 3+ work needs rework | Medium | Get explicit written sign-off on homepage before Phase 2. Document that changes after sign-off are billed as variations. |
| 6 | **Sanity free tier limits hit** | CMS becomes unusable | Low | Sanity free tier: 3 users, 10k documents, 100k API requests/day. Track Academy won't exceed this. Monitor usage. |
| 7 | **Font files (Fredoka/Inter) are large** | LCP exceeds 2.5s target | Medium | Subset fonts to only include characters used (latin + basic punctuation). Use `font-display: swap`. Preload critical font weights. Verify LCP with Lighthouse after Phase 0. |
| 8 | **Registration wizard complexity underestimation** | Phase 5 overruns significantly | High | This is the hardest component. Start it early (can parallelise with Phase 3 for a different developer if available). Build step-by-step, test each step independently. Don't try to build all 9 steps at once. |
| 9 | **Content wasn't fully written — client needs to provide copy** | Pages launch with placeholder content | Medium | Use the `research/scraped/` markdown files as content base. All 20 scraped files have real content from the current site. For rewritten sections (homepage, impact, about), draft copy and send to Patrik for review during Phase 3. |
| 10 | **Safeguarding PDFs are large and slow to download** | UX issue on mobile | Low | Compress PDFs before hosting. Offer as download links, not inline viewing. Use `download` attribute on anchor tags. |

---

## 11. Environment Variables

```env
# Sanity
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
SANITY_API_WRITE_TOKEN=your_write_token  # Studio only

# Supabase
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_ANON_KEY=your_anon_key           # Client-side (public, RLS-protected)
SUPABASE_SERVICE_ROLE_KEY=your_service_key # Server-side only (Edge Functions, never exposed)

# Upshot (Phase 5)
UPSHOT_API_KEY=your_api_key
UPSHOT_API_URL=https://api.upshot.co.uk/v1  # confirm endpoint

# Email (Phase 5 — for form notifications)
# Option A: Resend
RESEND_API_KEY=your_resend_key
EMAIL_FROM=notifications@trackacademy.co.uk
EMAIL_TO_ADMIN=admin@trackacademy.co.uk
EMAIL_TO_PATRIK=patricks@trackacademy.co.uk
EMAIL_TO_COACH=matthew@trackacademy.co.uk

# Google Analytics (Phase 6)
GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Cloudflare (Phase 7)
CLOUDFLARE_API_TOKEN=your_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

---

## 12. Definition of Done

The MVP website is "done" when:

### Functional
- [ ] All 17 pages in sitemap are live at trackacademy.co.uk
- [ ] Registration wizard completes end-to-end, saves to Supabase, attempts Upshot sync
- [ ] All enquiry/contact forms submit to Supabase and email correct staff member
- [ ] Events page displays Sanity-managed events with working filters
- [ ] Competitions page displays Sanity-managed fixtures table
- [ ] Team page displays Sanity-managed team members grouped by category
- [ ] All internal links work (no 404s)
- [ ] All 404 redirects from old URLs set up and tested

### Performance
- [ ] Lighthouse mobile: Performance > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Total page weight < 500KB initial load
- [ ] All images in AVIF/WebP with responsive srcset
- [ ] Fonts self-hosted, subset, preloaded

### Accessibility
- [ ] WCAG AA passes (automated via axe-core + manual testing)
- [ ] All images have alt text
- [ ] All form fields have associated labels
- [ ] Keyboard navigation works on all interactive elements
- [ ] Skip-to-main-content link present
- [ ] Focus states visible on all interactive elements
- [ ] `prefers-reduced-motion` respected (no count-up, no fade-ins)
- [ ] Colour contrast passes AA on all text/background combinations

### SEO
- [ ] Meta title and description on every page (from `sitemap-seo.md`)
- [ ] Schema.org structured data: Organization, SportsActivityLocation, Event, Charity
- [ ] XML sitemap auto-generated and submitted to Google
- [ ] robots.txt configured
- [ ] Canonical URLs on every page
- [ ] Open Graph + Twitter card tags on every page
- [ ] GA4 installed and receiving data
- [ ] Google Search Console verified and monitoring

### Content & Brand
- [ ] Content reviewed by Patrik/Erick for accuracy
- [ ] No stock photos used (only provided session photography)
- [ ] Brand colours and typography match `brand-guidelines.md`
- [ ] Tone of voice matches `tone-of-voice.md`
- [ ] Safeguarding policies accessible and current
- [ ] Charity number (1164222) in footer on every page

### Infrastructure
- [ ] Deployed to Cloudflare Pages
- [ ] DNS pointed to new hosting
- [ ] HTTPS working with valid SSL
- [ ] Old WordPress site archived (image/data backup)
- [ ] Sanity Studio deployed and accessible to staff
- [ ] Staff trained on CMS (how to add events, team members, stats, programmes)

### Cross-device
- [ ] iPhone SE (375px) tested
- [ ] iPhone 14 Pro (393px) tested
- [ ] iPad (768px) tested
- [ ] Desktop 1280px tested
- [ ] Large desktop 1920px tested
- [ ] Safari (iOS + macOS) tested
- [ ] Chrome tested
- [ ] Firefox tested
- [ ] Edge tested

---

## 13. Key References (always open while building)

| Document | When to open |
|---|---|
| `strategy/prd.md` | Building any page — section 3.x has the full content spec |
| `strategy/art-direction.md` | Building any component — visual rules, hover states, motion |
| `strategy/brand-guidelines.md` | Setting up Tailwind tokens — section 6 has colours, section 7 has type scale |
| `strategy/tone-of-voice.md` | Writing any UI text, error messages, CTAs |
| `strategy/sitemap-seo.md` | Adding meta tags, URLs, redirects |
| `strategy/database-schema.md` | Building Supabase migrations — full table definitions |
| `strategy/customer-journeys.md` | Validating that page flows match parent/school/funder journeys |
| `research/scraped/*.md` | Getting content for each page (current site content as markdown) |
| `research/Track Academy/Assets/` | Getting actual images, logos, PDFs |
| `proposal/index.html` | Reference for visual language — this already proves the look works |

---

*This document is the single source of truth for the build. If a decision changes, update this document. If a phase scope shifts, update this document. Strategy documents (prd.md, art-direction.md, etc.) are reference material — this is the execution plan.*