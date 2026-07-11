# Strategy Pack — Track Academy

*Version 1.0 · July 2026*
*This folder contains the strategic foundation for the Track Academy website rebuild.*

---

## Documents

| Document | Purpose | Read first? |
|---|---|---|
| `brand-guidelines.md` | Logo usage, colour system, typography, brand voice summary, imagery rules | Start here |
| `tone-of-voice.md` | Full tone of voice guide with examples, vocabulary, microcopy, SEO writing | Start here |
| `art-direction.md` | Visual language, layout system, components, motion, accessibility | Start here |
| `icps.md` | Detailed profiles for three Ideal Customer Profiles: Parents, Schools, Funders (plus secondary audiences) | After brand |
| `customer-journeys.md` | End-to-end journeys from discovery to post-conversion for each ICP | After ICPs |
| `prd.md` | Product Requirements Doc: sitemap, every page spec, forms, integrations, performance, phases | After journeys |
| `sitemap-seo.md` | URL structure, meta data, keyword targets, local SEO, technical SEO roadmap | During PRD |
| `database-schema.md` | Supabase/PostgreSQL tables for engagement tracking and operations | For build phase |

---

## How to use these docs

### If you're Calvin (or another designer)
1. Read brand-guidelines, tone-of-voice, art-direction back-to-back
2. Skim ICPs and customer journeys to understand who you're designing for
3. Use prd.md as the build checklist — each page is specified
4. Reference sitemap-seo for URL structure and meta tags when templating
5. database-schema is for the backend build phase

### If you're building the website
1. art-direction.md is your visual bible
2. prd.md is your build list — go top to bottom
3. brand-guidelines.md for any colour/type decisions
4. tone-of-voice.md for any copy you write
5. sitemap-seo.md for meta tags and URL rules

### If you're writing copy
1. tone-of-voice.md first (pronunciation of the brand voice)
2. brand-guidelines.md (vocabulary rules)
3. icps.md (who you're writing for)
4. prd.md (what each page needs to say)

### If you're building the proposal page
1. brand-guidelines.md for colours and typography
2. tone-of-voice.md for proposal copy voice
3. prd.md for project scope and deliverables
4. Mindbeat proposal reference (https://mindbeat-proposal.calvin-6fc.workers.dev/) for structure

---

## Status

Strategy phase: **Complete**

Next phases:
- Proposal page build (in `proposal/`)
- Website build (in `website/`)
- Database setup in Supabase (scripts TBD)