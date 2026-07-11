# Sitemap & SEO Plan — Track Academy

*Version 1.0 · July 2026*

---

## 1. Sitemap

### Top-level structure (10 main sections + secondary)

```
trackacademy.co.uk/
├── /                                  # Homepage
├── /about                             # About Us
├── /impact                            # Impact (Funder-facing)
├── /safeguarding                      # Safeguarding
├── /team                              # Team
├── /athletics                         # Athletics Training
├── /education                         # Education & Life Skills
├── /mentoring                         # Mentoring
├── /holiday-programmes                # Holiday Programmes
├── /performance-coaching              # 1-to-1 Performance Coaching
├── /schools                           # Schools Partnership
├── /events                            # Events
├── /competitions                      # Competitions & Fixtures
├── /register                          # Register Your Child (Multi-step wizard)
├── /support                           # Support / Donate / Volunteer
├── /contact                           # Contact (audience-routed)
├── /privacy                           # Privacy Policy
├── /404                               # Custom 404
└── /news                              # Blog/Stories (Phase 2)
```

### Removed from old sitemap
- `/homepage/performance-coaching/` → migrated to `/performance-coaching` (fixes the nested URL bug)
- `/register/` (Upshot embed) → replaced with `/register` (our own wizard)

### Added to sitemap (new)
- `/team` (split from `/about` — easier to find)
- `/support` (consolidates donate, volunteer, sponsor)

### URL redirect plan (SEO preservation)
301 redirect old URLs to new equivalents:
- `/about-us/` → `/about`
- `/impact/` → `/impact`
- `/safeguarding/` → `/safeguarding`
- `/activities/` → `/athletics`
- `/education-life-skills/` → `/education`
- `/mentoring/` → `/mentoring`
- `/holiday-programmes/` → `/holiday-programmes`
- `/homepage/performance-coaching/` → `/performance-coaching`
- `/schools/` → `/schools`
- `/events/` → `/events`
- `/competitions-fixtures/` → `/competitions`
- `/register/` → `/register`
- `/contact-us/` → `/contact`

---

## 2. Page-Level Meta Data

### Meta title formula
`Track Academy — [Page purpose] | Athletics in Brent`

### Page-by-page meta

| URL | Title | Description |
|---|---|---|
| `/` | Track Academy — Athletics, Education & Mentoring in Brent | Athletics, education and mentoring for young people aged 5-21 in Brent. The only athletics charity in the country offering 360-degree support. £25 per term. Register your child. |
| `/about` | About Track Academy — 17 Years of Changing Lives in Brent | Founded in 2007 by Connie Henry MBE, Track Academy blends athletics, education and mentoring in Brent. Meet the team, read our story. |
| `/impact` | Our Impact — Track Academy: 577 Sessions, 331 Young People in 2024 | 577 sessions, 331 young people, 98% recommendation rate. 66% improved school performance. Track Academy's 2024 impact in Brent. Download our annual report. |
| `/safeguarding` | Safeguarding at Track Academy | DBS-checked, England Athletics safeguarding standards. DSLs Yvonne Simpson and Erick Sanchez. Policies, reporting procedures, and contacts. |
| `/team` | Meet the Track Academy Team — Coaches, Mentors, Tutors, Trustees | 19+ staff, coaches, mentors, tutors and trustees. CEO Patrik Ewe leads Track Academy in Brent. |
| `/athletics` | Athletics Training in Brent for Ages 5-21 — Track Academy | Three sessions a week at Willesden Sports Centre. Running, jumping, throwing for ages 5-21. £25 per term or free if on financial support. |
| `/education` | Education & Life Skills — Free Tuition and 10 Life Skills at Track Academy | Maths, English, Science tuition every Saturday. 10 life skills: Listening, Presenting, Leadership. Free for all registered athletes. |
| `/mentoring` | Mentoring at Track Academy — One Trusted Adult Changes Everything | One-to-one mentoring for young people in Brent. 52 sessions in 2024. Trained mentors help with confidence, resilience, and life challenges. |
| `/holiday-programmes` | Holiday Programmes in Brent — Track Academy | 45 workshops, 250+ young people in 2024. Escape rooms, laser tag, CV workshops. Keeping young people active and safe during school holidays. |
| `/performance-coaching` | 1-to-1 Performance Coaching in Brent — Track and Football | £30-£80/week. Tailored coaching for track athletes and footballers. Speed, acceleration, movement efficiency. |
| `/schools` | School Sports Partnership — Track Academy in Brent | Pupil Premium pupils free. Bronze, Silver, Gold tiers from £1,950/year. Athlete Passports, termly impact reports, Ofsted-ready. Partner with us. |
| `/events` | Events at Track Academy — Open Meets, Community Days in Brent | Upcoming athletics events at Willesden Sports Centre. Open Meet, community days, school events. Enter on OpenTrack. |
| `/competitions` | Competitions & Fixtures — Track Academy, affiliated England Athletics | Track Academy is a competing club affiliated with England Athletics. Fixtures, URN registration, Power of 10, OpenTrack entry. |
| `/register` | Register Your Child — Track Academy, Brent | Simple step-by-step registration for young people aged 5-21. £25 per term or free if on financial support. Willesden Sports Centre. |
| `/support` | Support Track Academy — Donate, Sponsor, Volunteer | Donate, sponsor an event, or volunteer. Every £1 helps young people in Brent break down barriers and thrive. Registered Charity 1164222. |
| `/contact` | Contact Track Academy — Willesden Sports Centre, Brent | Email admin@trackacademy.co.uk or call 07956 715052. In person: Willesden Sports Centre, Tue/Thu 4-6.30pm, Sat 10-12.30pm. |
| `/privacy` | Privacy Policy — Track Academy | Track Academy GDPR-compliant privacy policy. |

---

## 3. Schema.org Structured Data

### Sitewide
- `Organization` — name, url, logo, address, contactPoint, sameAs (social links), charityNumber, foundingDate
- `WebSite` — name, url, potentialAction (search, if added)

### Per page types
- `SportsActivityLocation` on `/athletics`, `/schools`
- ` NGO` on homepage and `/about`
- `BreadcrumbList` on every page
- ` FAQPage` on `/safeguarding`, `/schools` if FAQ sections added
- ` Event` on `/events` for each event (pull from database)
- `Person` on `/team` page

---

## 4. Keyword Targets

### Tier 1 — Brand defence (immediate)
- "Track Academy"
- "Track Academy Brent"
- "Track Academy Willesden"
- "Track Academy athletics"

### Tier 2 — Programme-specific (high intent)
- "athletics for kids Brent" → `/athletics`
- "after school sports Willesden" → `/athletics`
- "youth athletics London" → `/athletics`
- "athletics holiday programme Brent" → `/holiday-programmes`
- "school sports partnership Brent" → `/schools`
- "Pupil Premium athletics" → `/schools`
- "mentoring for young people Brent" → `/mentoring`
- "sports mentoring charity London" → `/mentoring`
- "performance coaching athletics London" → `/performance-coaching`

### Tier 3 — Problem-aware (content marketing, Phase 2)
- "youth charity in Brent"
- "sports charity London"
- "athletics charity"
- "free activities for kids in Brent"
- "things to do with kids in Brent"
- "Pupil Premium intervention ideas"
- "Ofsted personal development evidence"
- "trusted adult mentoring"
- "athletics coaching for footballers"
- "athletics open meet London"

### Tier 4 — Local SEO
- "Willesden Sports Centre athletics"
- "things to do in NW10"
- "youth clubs in Brent"
- "free sports for kids in London"
- "Brent youth activities"
- " NW10 children's activities"

---

## 5. Local SEO

### Google Business Profile
- Claim or verify Track Academy's Google Business Profile (if not done)
- Address: Willesden Sports Centre, Donnington Road, London NW10 3QX
- Categories: Charity, Youth Organization, Sports Club, Athletics Club
- Hours: Tue/Thu 4-6.30pm, Sat 10-12.30pm
- Photos: from the research folder
- Posts: weekly event updates, pictures of sessions
- Reviews: ask parents to leave reviews (98% recommendation rate → GMB reviews is gold)

### Local citations
- Ensure Track Academy is listed on:
  - Brent Council directory
  - London Youth directory (they appear to be a member)
  - Sport England's club finder
  - England Athletics club finder
  - NHS Brent community directory
  - Facebook local business page
  - PenguinPickup/Brent Mums (if applicable)

---

## 6. Content Marketing Strategy (Phase 2)

### News/Stories blog
- `/news` — hub for stories and updates
- Categories:
  - Stories (young people journeys, anonymised)
  - Coach profiles (like Lumar's)
  - Funding news
  - Community news (Brent-specific)
  - Event recaps (Open Meet, community events)
  - Education & Life Skills features

### Content cadence
- 1-2 stories/month
- 1 event recap per major event
- 1 funding announcement when awarded
- 1 community spotlight per quarter

### Internal linking strategy
- Every story should link to 2-3 relevant pages
- Stories should cross-reference each other thematically
- Tag pages by age group, programme, outcome

---

## 7. Technical SEO Requirements

### On-build
- Semantic HTML5 (article, main, nav, header, footer)
- Heading hierarchy (only one H1 per page)
- Image alt text on all images
- Internal links: descriptive anchor text (not "click here")
- External links: no follow where appropriate
- XML sitemap at `/sitemap.xml` — auto-generated
- Robots.txt at `/robots.txt`
- canonical URLs on every page
- Open Graph + Twitter card meta
- Page speed: Lighthouse > 90 mobile
- Mobile responsive
- HTTPS enforced
- No mixed content

### Post-launch monitoring
- Submit sitemap to Google Search Console
- Monitor indexing weekly
- Track position for Tier 1 and Tier 2 keywords
- Identify new keyword opportunities from Search Console queries
- Monitor backlinks (SEMrush/Ahrefs)

---

## 8. Conversion Tracking

### Primary conversions
1. Registration completion (parent journey)
2. School enquiry form submission
3. Funder enquiry form submission
4. Annual report download

### Secondary conversions
- OpenTrack entry click (from `/events`)
- Spond join click
- Donate click
- Phone/email click
- Social follow click

### GA4 events
- `registration_step_complete` — step number included
- `registration_submit` — conversion event
- `enquiry_submit` — form_type included (school, funder, volunteer, other)
- `annual_report_download` — conversion event
- `external_link_click` — destination categorised
- `cta_click` — cta_type included (register, support, partner, contact)

---

## 9. Launch Checklist

### Pre-launch
- [ ] All redirects from old URLs set up (301)
- [ ] All meta titles/descriptions written
- [ ] Schema.org markup tested
- [ ] XML sitemap generated and submitted
- [ ] Robots.txt configured
- [ ] GA4 property created, tracking code installed
- [ ] Google Search Console verified
- [ ] Google Business Profile updated
- [ ] Open Site Explorer audit (look for broken links)
- [ ] Lighthouse mobile > 90
- [ ] WCAG AA passed
- [ ] All pages cross-browser tested

### Launch day
- [ ] DNS pointed to new hosting
- [ ] 301 redirects active
- [ ] Sitemap submitted via Search Console
- [ ] "Fetch as Google" on homepage
- [ ] GA4 real-time check
- [ ] All forms tested end-to-end

### Post-launch (first 30 days)
- [ ] Daily check: site up, forms working
- [ ] Weekly: Search Console indexing, keyword positions
- [ ] Weekly: GA4 traffic and conversion report
- [ ] Day 30: redirect errors fixed, all old URLs indexed at new locations
- [ ] Day 30: review content for improvements (bounce rate, time on page)