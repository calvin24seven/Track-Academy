# Product Requirements Document (PRD) — Track Academy Website Rebuild

*Version 1.0 · July 2026*
*The build specification. Every page, component, and integration documented.*

---

## 1. Project Overview

### What we're building
A new website for Track Academy (trackacademy.co.uk) that replaces the current WordPress + Elementor setup. The new site will:
1. Serve three ICPs (parents, schools, funders) with clear journeys
2. Reduce admin burden for staff (no plugin updates, no manual content edits)
3. Connect to a database system for engagement and impact tracking
4. Integrate with existing tools (Upshot, Spond, OpenTrack)
5. Rank in Google for Brent/local youth athletics terms

### Phase scope
This PRD covers: **MVP website + database foundation + Upshot integration**

Future phases (not in scope for MVP but designed for):
- Parent portal
- School portal
- Funder dashboard
- Athlete Passports system
- Volunteer management
- Spond replacement

### Tech stack (proposed)
- **Frontend:** Astro or Next.js (static-first for speed and SEO)
- **Styling:** Tailwind CSS (utility-first, matches the art direction)
- **CMS:** Sanity (headless, for staff to edit content without code)
- **Database:** Supabase (PostgreSQL, for engagement/impact data)
- **Hosting:** Calvin's Cloudflare Workers/Pages infrastructure (free to client)
- **Forms:** Own multi-step wizard (replaces Upshot embed for public registration) with sync to Upshot
- **Analytics:** GA4 + Google Search Console
- **Domain:** trackacademy.co.uk (DNS to be migrated)

---

## 2. Sitemap

### Top-level navigation
1. **About** (dropdown: About Us, Impact, Safeguarding, Team)
2. **Programmes** (dropdown: Athletics, Education & Life Skills, Mentoring, Holiday Programmes, Performance Coaching)
3. **Schools**
4. **Events**
5. **Competitions**
6. **Register** (CTA button — Track Orange)
7. **Support** (CTA button — outlined, or donate link)

### Bottom-of-nav (optional/secondary)
- Contact
- News / Blog (Phase 2 — SEO content)

### Full URL structure

| URL | Title | Purpose | Primary ICP |
|---|---|---|---|
| `/` | Track Academy — Athletics, Education & Mentoring in Brent | Homepage | All |
| `/about` | About Track Academy | Mission, history, team, founder story | All |
| `/impact` | Our Impact | Impact stats, outcomes, stories, annual report | Funders |
| `/safeguarding` | Safeguarding at Track Academy | Policies, DSL contacts, how to raise a concern | Parents, Schools |
| `/team` | Meet the Team | Staff, trustees, coaches, mentors, tutors | All |
| `/athletics` | Athletics Training | Session times, ages, pricing, what to bring | Parents |
| `/education` | Education & Life Skills | Academic support, 10 life skills, case evidence | Parents, Schools |
| `/mentoring` | Mentoring Programme | One-to-one support, mentor stories, outcomes | Parents, Funders |
| `/holiday-programmes` | Holiday Programmes | What's on, past trips, booking | Parents |
| `/performance-coaching` | 1-to-1 Performance Coaching | Packages, pricing, enquiry form | Parents (ambitious) |
| `/schools` | Schools Partnership with Track Academy | Tiers, pricing, impact, testimonials, enquiry | Schools |
| `/events` | Events at Track Academy | Upcoming events, Open Meet, community events | All |
| `/competitions` | Competitions & Fixtures | Fixtures list, URN process, Spond link | Parents (competing athletes) |
| `/register` | Register Your Child | Multi-step registration wizard | Parents |
| `/support` | Support Track Academy | Donate, volunteer, partner, sponsor | Funders, Community |
| `/contact` | Contact Track Academy | Contact form with audience routing | All |
| `/privacy` | Privacy Policy | Legal | All |
| `/404` | Page Not Found | Helpful error page | All |

---

## 3. Page-by-Page Specification

### 3.1 Homepage (`/`)

#### Structure
1. **Hero** — Full-bleed
   - Image: `student running fast on track.jpg` (or rotating set of 3)
   - Overlay: Track Blue gradient bottom-heavy
   - Headline: "Changing lives since 2007"
   - Sub: "Through athletics, education and mentoring, we're a launchpad for young people in Brent to break down barriers, unlock their potential and thrive."
   - CTAs: [Register your child] (primary) [Partner with us] (secondary) [Support our work] (tertiary/link)

2. **Audience router** — 3-1-1 pattern
   - Three cards: "I'm a parent" / "I'm from a school" / "I'm a funder"
   - Each routes to respective section/page
   - Copy: "Who are you?"

3. **What we do** — 4-up card grid
   - Athletics (img, heading, 1-sentence desc, link)
   - Education & Life Skills
   - Mentoring
   - Holiday Programmes
   - Cards link to respective programme pages

4. **The 360-degree approach** — Split section
   - Image left (coach demonstrating)
   - Text right: "We are the only athletics charity in the country to also offer education, mentoring and life-social skills sessions."
   - 3 pillars: On-track training / Off-track education / One-to-one mentoring

5. **Impact stat band** — Full-width Track Blue
   - 577 sessions / 331 young people / 98% would recommend / 200+ competition entries
   - Stats count up on scroll
   - Caption: "In 2024. That's 17 years of showing up."

6. **Stories** — 3-up quote cards
   - Ra'elle: "They taught me to fight — for myself. Now when I say 'I can't,' I hear Coach Nigel say, 'Try again'."
   - Parent (from impact page): "Her teacher called us shocked — said she's 'a different child.'"
   - Kayla Anderson, St Claudine's: "We are grateful for the positive impact Track Academy has had on our students."
   - Link: "See more stories"

7. **Schools teaser** — Split section
   - Image right (coach and students group photo)
   - Text left: "Bright Futures Through Sport. Partner schools get Pupil Premium pupils funded, Athlete Passports, and termly Ofsted-ready reports."
   - Tiers preview (£1,950 / £3,950 / £6,950)
   - CTA: "See school partnership tiers"

8. **Instagram feed** — Embedded
   - Latest 6 posts from @trackacademy_
   - CTA: "Follow us on Instagram"

9. **Get involved** — 3-up CTA cards
   - "Register your child" (parent route)
   - "Partner with your school" (school route)
   - "Support our work" (funder/donor route)

#### Mobile considerations
- Hero text 2.25rem, full-bleed image
- Audience router becomes vertical stack
- Instagram feed becomes 2-up
- All CTAs thumb-reachable

---

### 3.2 About (`/about`)

#### Structure
1. **Hero** — Split
   - Image: older students on track posing
   - Headline: "About Track Academy"
   - Lead: "Blending athletics, education, and mentoring, Track Academy is a launchpad for young people to break down barriers, unlock their potential and thrive."

2. **Founder story** — Split section
   - Image: Connie Henry tribute or older archival image
   - Text: Founded 2007 by Connie Henry MBE. Connie grew up in Brent, honed her craft at Willesden Sports Centre. Led the charity until 2024 when she stepped back. Patrik Ewe now CEO.
   - Quote from Patrik: "I'm benefitting from a very well-oiled machine. Connie left Track Academy in the most stable position it's ever had financially."

3. **The model** — Diagrammatic
   - Visual: 360-degree approach — three overlapping circles (Athletics, Education, Mentoring)
   - Text: "Our unique, holistic model blends on-track athletic training with off-track academic support and life-skills mentoring."
   - "We are more than a sports club. We are a lifeline, a confidence-builder and a community."

4. **The need (Brent context)**
   - 5 icons/stats:
     - 41% Brent child poverty
     - 28% feel they have enough safe spaces
     - 1 in 3 affected by bullying
     - 64% of girls no longer active by 14
     - 41% believe they can influence local decisions
   - Caption: "The need for our work has never been greater."

5. **2025 priorities**
   - Grow athletics programme (recruit specialist coaches)
   - Deepen community ties (strengthen school partnerships)
   - Secure sustainable funding (diversify income)
   - Refresh brand and website (this project)

6. **History timeline** (optional)
   - 2007: Founded by Connie Henry MBE
   - 2017: 10-year anniversary
   - 2024: Connie steps back, Patrik Ewe becomes CEO
   - 2025: Brand refresh, England Athletics hub pilot
   - 2026: New website and database launch

7. **Video**
   - "Watch Annie's story" — existing video embed from current site

---

### 3.3 Impact (`/impact`)

#### Structure
1. **Hero** — Stat band style
   - Full-width Track Blue
   - Large number "577"
   - Caption: "sessions delivered in 2024 — across 52 weeks, to 331 young people aged 5-23 in Brent."

2. **Core impact band**
   - 4 stats: 331 young people / 215 girls & young women / 200+ competition entries / 98% would recommend
   - All orange numbers, white captions

3. **Five key outcomes** — 5-column grid (stacks to 2-col mobile)
   - Educational attainment
   - Personal & social development
   - Life skills
   - Health & wellbeing
   - Community connection

4. **Outcome stats** — Card grid
   - 66% improved school performance
   - 87% gained new skills
   - 94% believe they can achieve their goals
   - 89% feel more connected to community
   - 76% improved confidence
   - 78% can manage stress and setbacks
   - 89% feel belonging
   - 83% feel supported by teammates and coaches

5. **Who we reach** — Demographics panel
   - 64% girls / 85% ethnic minorities / 85% from Brent
   - Age range: 5-23

6. **Stories** — 3-up quote cards
   - Ra'elle, age 14, Jack Petchey winner
   - Parent (the "different child" quote)
   - Mike Finnie, Newman Catholic College (the "verge of going to prison" quote)

7. **Jack Petchey 2024 winners** — Card grid (optional)
   - 9 named winners with short citations
   - Photo where available

8. **Annual report download**
   - Cover image of 2024 annual report
   - "Download our 2024 Annual Report (PDF)"
   - Optional: contact form for more detailed data

9. **funder logos** — Trust strip (if/when available)
   - Greyscale logos of confirmed funders
   - Hover: full colour

10. **CTA**
    - "Support our work" (for individuals/donors)
    - "Talk to us about funding" (for trusts/foundations/corporates)

#### Future enhancement
- Live data dashboard pulling from Supabase
- Real-time attendance charts
- Filterable demographic data
- Termly outcome trends
- School-level reporting (for portal)

---

### 3.4 Safeguarding (`/safeguarding`)

#### Structure
1. **Hero** — Simple
   - Image: coach and students group photo
   - Headline: "Safeguarding at Track Academy"
   - Lead: "The safety, welfare and wellbeing of every child and young person is our highest priority."

2. **Our commitment** — Bullet list on Track Blue band
   - 4 commitments (from current site)
   - "All staff and volunteers are DBS-checked and safeguarding-trained."

3. **Designated Safeguarding Leads** — Card grid
   - Yvonne Simpson (Operations Manager / DSL)
   - Erick Sanchez (Education & Mentoring Co-ordinator / DSL)
   - Patrik Ewe (CEO / Welfare Officer)
   - Each card: name, role, email, "Contact about a concern" button

4. **What is safeguarding?** — Accordion or simple section
   - What we protect from (5 items)
   - Applies to all activities

5. **How to raise a concern** — Step flow (3 steps)
   - Step 1: Contact DSL
   - Step 2: Provide information
   - Step 3: We take action
   - "All concerns handled confidentially, sensitively and seriously."

6. **External contacts**
   - NSPCC: 0808 800 5000 / nspcc.org.uk
   - Childline: 0800 1111 / childline.org.uk
   - Emergency: 999

7. **Policies** — Link list
   - 6 PDFs from current site (re-host on new domain or link to existing URLs)
   - Each policy listed with name and "Download PDF" link

8. **Trust strip**
   - England Athletics affiliated
   - Charity 1164222
   - London Living Wage Employer

---

### 3.5 Team (`/team`)

#### Structure
1. **Hero**
   - Image: staff working hard in office
   - Headline: "Meet the Team"
   - Lead: "19+ staff, coaches, mentors and tutors showing up every session, every week."

2. **Leadership** — Card grid
   - Patrik Ewe — CEO / Welfare Officer
   - Yvonne Simpson — Operations Manager / DSL
   - Erick Sanchez — Education & Mentoring Co-ordinator / DSL
   - Matthew Adum-Yeboah — Head of Sport

3. **Coaches** — Card grid
   - Mia, Nigel, Beth, Dominique, Jimmy, Lumar, Martin, Nilrem, Sam
   - Each card: photo (or group photo fallback), name, role title
   - If we have Coach Lumar's story: feature card with Like The Wind link

4. **Mentors** — Card grid
   - Manar, Ngozi, Plamedie

5. **Tutors** — Card grid
   - Babatunde (science/maths specialist)
   - Elizabeth (1-to-1 Saturday sessions)

6. **Trustees** — Card grid
   - Frederik Reynaert (Chair), Michael Adams, Tayla Brade, Rosie Beadle, Marion Delille, Romain Ebanks, Steve McKoy, Amechi Okafor, Alecia Blackford (new)
   - Short bios from annual report:
     - Frederik: 10+ year Track Academy parent, MBA London Business School, CFO Ooodles, ex-Amazon UK financial controller, chair of governors St Mary Magdalen's
     - Alecia: newly appointed trustee (Jan 2026), youth work/education background

7. **Founder tribute**
   - Connie Henry MBE — founded 2007, led until 2024
   - Brief acknowledgment of her contribution

---

### 3.6 Athletics (`/athletics`)

#### Structure
1. **Hero** — Full-bleed
   - Image: students on track about to race
   - Headline: "Athletics Training"
   - Lead: "Coaching for young people aged 5-23, three times a week at Willesden Sports Centre."

2. **Two programme blocks**
   - Multi-skills (5-10): Tue/Thu 4-5pm, Sat 10-11am
   - Athletics (10-21): Tue/Thu 5-6.30pm, Sat 11-12.30pm
   - Each: image, age range, times, what's covered, price

3. **Pricing card**
   - £25 per child per term
   - Free if on financial support / Universal Credit
   - £25/quarter (matches their T&Cs precisely)
   - CTA: "Register your child"

4. **What's included** — Bullet list
   - Running, jumping, throwing (three disciplines)
   - Encouragement to attend meets across the country
   - Indoor and outdoor competitions each year
   - England Athletics affiliated — URN registration available

5. **What to bring**
   - Trainers or spikes
   - Water
   - Comfortable sportswear
   - Any medication (e.g., inhaler)

6. **SEND sessions callout**
   - Inclusive athletics for ages 8-16 with SEND
   - Tuesday 5-6pm
   - Free / subsidised by Track Academy
   - Contact: matthew@trackacademy.co.uk
   - Link to dedicated SEND section or contact

7. **Competing pathway preview**
   - Brief: "If you want to compete, see our competitions page for URN process and fixtures."
   - Link: /competitions

8. **CTA band**
   - "Ready to get your child on the track?"
   - [Register your child]

---

### 3.7 Education & Life Skills (`/education`)

#### Structure
1. **Hero**
   - Image: Students-learning.jpg
   - Headline: "Education & Life Skills"
   - Lead: "The core curriculum that empowers our young people to thrive — not just as athletes, but as confident, resilient individuals."

2. **Academic support** — Split section
   - Tuesday 4-5pm: Study Support (coursework to GCSE)
   - Saturday 9-11am: Tuition (multi-skills 5-10 and mainstream 10-21)
   - Maths, English, Science
   - "No added charge for educational support."
   - Tesco grant for healthy breakfasts

3. **10 Life Skills** — Interactive grid
   - For each of the 10 skills, a card with:
     - Icon
     - Skill name
     - One-sentence description
     - "Case evidence" example exercise
     - Optional: image (from current site's HEIC files, converted)
   - 10 skills: Listening, Presenting, Networking, Problem Solving, Creativity, Staying Positive, Aiming High, Discipline, Teamwork, Leadership

4. **Knowledge & employability** — Split section
   - Older athletes: CV writing, nutrition, finance, time management
   - Special guest speakers
   - Business visits across London
   - "No extra charge for these sessions."

5. **CTA**
   - "Register your child" (parent) / "Partner with your school" (school)

---

### 3.8 Mentoring (`/mentoring`)

#### Structure
1. **Hero**
   - Image: coach and students group photo
   - Headline: "Mentoring"
   - Lead: "One trusted adult changes everything."

2. **Core concept** — Large text block
   - "For young people from underserved London communities, the path to a bright future is often blocked by systemic barriers."
   - "A powerful catalyst for change is a developmental relationship."
   - "We believe in thriving, not just surviving."

3. **How it works** — 3-step
   - Step 1: Trust is built on the track and in the classroom
   - Step 2: Dedicated mentors provide structured one-to-one support
   - Step 3: Young people gain the confidence to shape their own futures

4. **What mentors help with** — Bullet list
   - Academic stress
   - Bullying
   - Family breakdown
   - Eating disorders
   - Building resilience and life skills

5. **Stats** — Mini stat band
   - 52 mentoring sessions in 2024
   - 12 young people matched with mentors
   - 3 new mentors recruited

6. **Mentoring dinners callout** (optional)
   - 22 young women at Nando's
   - 8 male athletes dinner
   - New initiative for 2024

7. **Coach Lumar feature** (if approved)
   - "Coach Lumar joined Track Academy as a teenager with Olympic dreams. He stood on podiums. He trained with legends. Then a ruptured achilles changed everything. But he never left the track. He just found a new lane."
   - Link to Like The Wind article

8. **CTA**
   - "Support our mentoring programme" / "Register your child"

---

### 3.9 Holiday Programmes (`/holiday-programmes`)

#### Structure
1. **Hero**
   - Image: Go Ape1.jpg from impact gallery OR event graphic
   - Headline: "Holiday Programmes"
   - Lead: "Keeping young people active, safe and learning when school's out."

2. **What we've done** — Card grid of past activities
   - Escape room
   - Go Ape
   - Laser tag
   - Dodgeball
   - Boxing
   - Film screenings
   - Card games
   - ELEVATE CV writing workshop
   - Trips to Thorpe Park (Jack Petchey prize)

3. **Stats**
   - 45 workshops in 2024
   - 250+ students attended
   - Runs across summer, Easter, Christmas, half terms

4. **Upcoming programme** — Events feed
   - If events exist, pull from database
   - If not, "Check back soon or follow us on Instagram for the next programme dates."

5. **For working parents callout**
   - "We know keeping kids busy during the holidays is hard. We've got you."
   - Session times, booking link if available

6. **CTA**
   - "Register your child" / "See what's coming up"

---

### 3.10 Performance Coaching (`/performance-coaching`)

*Migrate from current URL /homepage/performance-coaching/ to /performance-coaching (fix the nesting bug)*

#### Structure
1. **Hero**
   - Image: student ready to race greyscale
   - Headline: "1-to-1 Performance Coaching"
   - Lead: "Tailored coaching for track athletes AND footballers who want that extra edge."

2. **What it is** — Split section
   - Technical coaching (track or football)
   - Speed development (acceleration + max velocity)
   - Movement efficiency under fatigue
   - Strength & conditioning (optional)
   - Load management and return-to-performance

3. **Session structure** — 4-step
   - Assessment → Coaching block → Performance work → Action plan

4. **For footballers callout**
   - Not generic speed training. Bespoke. Practical. Built to transfer into football performance.

5. **Pricing tiers** — 3-column
   - Starter: 1/week, £30/week
   - Most popular: 2/week, £50/week
   - Pro: 3/week, £80/week

6. **Enquiry form**
   - First Name, Last Name, Email, Mobile
   - Athlete: Name, Sport/focus event
   - Goals + availability
   - Submit → coach contacts within 1-2 working days

---

### 3.11 Schools (`/schools`)

*Migrate from current — this page is already well-structured, primarily needs visual refresh and integration with the database for Athlete Passport reporting*

#### Structure
1. **Hero** — Full-bleed
   - Image: Track-Academy-7.jpg
   - Headline: "Bright Futures Through Sport"
   - Lead: "Partner with Track Academy to deliver personal development, leadership, inclusion and progression for your pupils."
   - CTA: [Become a Partner School]

2. **Why schools partner** — 3 pillars
   - Character & Leadership (Ofsted Personal Development)
   - Inclusion & Access (Pupil Premium fully funded)
   - Pathways to Excellence (Talent ID, progression)

3. **What we deliver** (Primary & Secondary) — Bullet list with icons
   - Character & Leadership blocks
   - After-school/lunchtime athletics clubs
   - Staff CPD and shadowing (optional)
   - Athlete Passports: simple tracking of attendance, confidence, fitness, behaviour
   - Competition & showcase events
   - Optional PE support

4. **Funding model** — Split section
   - Pupil Premium (target inclusion, attendance, behaviour, mentoring)
   - PE & Sport Premium (Primary)
   - All Pupil Premium pupils free — cost is never a barrier

5. **Why this passes the SLT test** — 6 bullet points
   - Clear outcomes via Athlete Passports
   - Termly Ofsted-ready impact reports
   - Admin-light — school approves pupil list, TA does the rest
   - Safeguarding first — DBS-checked, insured, risk assessments
   - Fair access — free for Pupil Premium
   - Value for money — predictable annual tiers

6. **How it works** — 3-step timeline
   - Identify → We deliver → Review

7. **Testimonials** — 2-up
   - Kayla Anderson, St Claudine's
   - Mike Finnie, Newman Catholic College

8. **Impact shots** — 4-stat band
   - 66% improved school performance
   - 87% gained new skills
   - 94% believe they can achieve goals
   - 89% feel more connected to community

9. **Pricing tiers** — 3-column
   - Bronze: £1,950/year
   - Silver: £3,950/year (highlighted as most popular with subtle border)
   - Gold: £6,950/year
   - "Prices per school, per year. MAT/cluster packages on request."

10. **Enquiry form** — Multi-field
    - School name
    - Your name
    - Role (Head, Deputy, PE Lead, Pupil Premium Co-ord)
    - School type (Primary, Secondary, MAT)
    - Approximate Pupil Premium pupil numbers
    - Preferred programme/tier
    - Email/phone
    - "Submit" → Patrik/Erick respond

---

### 3.12 Events (`/events`)

#### Structure
1. **Hero**
   - Image: event graphic or track-open-meet.jpg
   - Headline: "Events at Track Academy"
   - Lead: "From open meetings to community days — what's coming up at Willesden."

2. **Upcoming events** — Database-driven feed
   - Pulled from Supabase events table (or Sanity CMS)
   - Card grid: date badge, event name, venue, short description, entry link
   - Filterable by: All / Open Meets / Community / Schools / Holiday
   - Empty state: "No events coming up right now. Check back soon or follow us on Instagram."

3. **Featured upcoming** — Hero card
   - Next major event (e.g., Open Meet 2026)
   - Large card, countdown timer (optional)
   - Enter via OpenTrack link

4. **Why come to an event?**
   - 3-up grid: Positive atmosphere / Opportunities for young people / Community at the centre

5. **Audience-specific info** — 3 tabs or accordion
   - Parents & athletes: Check Spond for updates
   - Schools & partners: Want to bring a group or sponsor?
   - Volunteers: Our events are powered by people

6. **CTA**
   - "Enter Open Meet" (if upcoming)
   - "Contact us about events"
   - "Join our Spond"

---

### 3.13 Competitions & Fixtures (`/competitions`)

#### Structure
1. **Hero**
   - Image: competition action
   - Headline: "Competitions & Fixtures"
   - Lead: "Everything you need to know about competing for Track Academy."

2. **URN process** — 3-step
   - Complete Competing Membership Form (below)
   - Join Spond & make payment (membership + EA registration)
   - We register you with England Athletics and confirm URN

3. **Who needs a URN?** — Accordion
   - Athletes competing under Track Academy
   - Open meetings, leagues, relays, championships

4. **How sign-ups work** — 2-column split
   - Club-selected fixtures (leagues/relays) via Spond
   - Open meetings (self-entry via organiser link)

5. **Fixtures list** — Database-driven table
   - Pulled from Supabase fixtures table (managed by staff via CMS)
   - Filterable by: Indoor / Outdoor / Age group / Type
   - Columns: Date / Competition / Venue / Age Groups / Entry
   - Track Academy selected fixtures highlighted

6. **Competition day checklist** — Bullet list
   - Club vest, spikes, water, medication, arrive early

7. **Competing Membership Form** — Multi-step
   - Similar to parent registration but simpler (athlete-focused)
   - Fields per current site

8. **CTA**
   - "Join Spond & Pay" → spond.com/invite/DGRNR
   - "View fixtures on Power of 10"
   - "Need help? Message us on Spond"

---

### 3.14 Register (`/register`)

*This is the most important functional upgrade — replaces the current Upshot embed with our own Multi-step wizard, then syncs to Upshot*

#### Structure
1. **Hero** — Simple
   - Image: children being spoken to on track
   - Headline: "Register Your Child"
   - Lead: "A simple, step-by-step registration. Save your progress and come back any time."

2. **Multi-step Registration Wizard**

#### Step 1: Child details
- Child first name *
- Child last name *
- Date of birth *
- Auto-detect age group from DOB (Multi-skills 5-10 / Mainstream 11-21)
- Start date (defaults to today)
- Membership status (auto-detected or selectable: Fee paying / No Fees / Alumni / School's pupils premium / Golden Ticket)

#### Step 2: Parent/guardian details
- Contact relationship type: Parent / Guardian / Other *
- Contact first name *
- Contact last name *
- Contact email *
- Mobile phone *

#### Step 3: Address & demographic
- Address line 1, 2
- Town/City, County, Postcode *
- Referral source: Self / Schools / Social Services / Word of Mouth / Marketing / Other
- Ethnicity (extensive dropdown — same as current)
- Faith (dropdown)
- Gender (dropdown)
- English first language? (Yes / No / Don't know)

#### Step 4: Medical & emergency
- Specific medical conditions (long dropdown — optional)
- Other conditions/allergies/dietary
- Emergency contact 1: name, relationship, number *
- Emergency contact 2: name, relationship, number *

#### Step 5: Education (conditional — based on child's age)
- In education, employment, or training? *
- If in education: School/College/University name *
- School type: Nursery / Primary / Secondary / 16 Plus / All Through / Other
- If Year 5-6 (SATS): Performance rating
- If Year 10-11 (GCSE): Maths, English, Science results
- Permission to share information with school?

#### Step 6: Membership & low income
- Families in receipt of low income: (checkbox — none required to proceed)
  - Child Benefit
  - Universal Credit
  - Employment and Support Allowance
  - None of the above
  - Not in receipt of benefits
- Membership fee plan: £25/quarter (automatically):
  - Multi-skills (5-10)
  - Mainstream (11-21)
- Has Universal Credit proof? (if checked, eligibility for free place triggered)
- Payment preference: Bank transfer / PayPal / Spond

#### Step 7: Consent
- I accept T&Cs and Privacy Policy *
- Photo/media permission (internal use)
- Photo/media permission (third-party use)
- Upshot email permission
- Upshot survey permission

#### Step 8: SEN / Additional support (conditional)
- Does your child have SEN, a disability, neurodiversity, or additional support needs?
- If yes: link to upload Care Plan, EHCP, or support documentation
- Note: "This helps our coaches and mentors make appropriate adjustments. All information treated confidentially."

#### Step 9: Confirmation & submit
- Summary of all fields
- "Confirm and submit"
- On submit:
  - Save to Supabase (our DB)
  - Trigger sync to Upshot (API or queued job)
  - Send confirmation email to parent with:
    - Session times and location
    - What to wear/bring
    - Payment instructions (or confirmation of free place)
    - Spond invite link
    - Contact for questions
  - Send notification to admin@trackacademy.co.uk

#### Form features
- **Progress bar** at top (Step X of Y)
- **Save & come back later** — creates draft, emails save link
- **Sibling autofill** — after completing one child, "Register another child?" pre-fills parent details
- **Validation:** Inline, on blur (not on submit). Clear, human error messages.
- **Mobile-first:** Large tap targets, single column, no horizontal scroll
- **Accessibility:** All fields have associated labels, keyboard navigation, screen reader announcements

#### Upshot sync (Phase 1)
- Map our Supabase record to Upshot's expected fields
- Trigger sync on successful submission
- If sync fails: log to admin dashboard, parent sees "registration received" confirmation anyway
- Daily reconciliation: compare our records vs Upshot, flag mismatches

#### Future (Phase 2+)
- Parent portal: edit details, register another child, pay fees
- Auto-add to Spond
- Email automations: welcome series, first-session reminder, milestone celebrations

---

### 3.15 Support (`/support`)

#### Structure
1. **Hero**
   - Image: students on track
   - Headline: "Support Track Academy"
   - Lead: "Every £1 helps us create a launchpad for young people to break down barriers, unlock their potential and thrive."

2. **Why your support matters** — Stat block
   - 41% Brent child poverty
   - 331 young people supported in 2024
   - 577 sessions delivered
   - "Your support keeps the track open, the mentors paid (London Living Wage), and the education free."

3. **Ways to support** — 3-up cards
   - **Donate (one-off or monthly)** → Whydonate link (or embedded widget if available)
   - **Sponsor an event or programme** → Contact form to Patrik
   - **Volunteer** → Contact form (event volunteers, admin support, mentoring if qualified)

4. **Corporate sponsorship callout**
   - Sponsor the Open Meet
   - Sponsor a holiday programme
   - Sponsor a cohort
   - "Let's talk about how your brand can support young people in Brent."
   - CTA: "Talk to us about partnership"

5. **Fundraising events**
   - 12-Hour Relay (annual)
   - Open Meet partnership slots
   - Link: /events for upcoming

6. **Where your money goes** — Transparent breakdown (if data available)
   - Example: £25 = one child's coaching for a term
   - £500 = one mentor's training and recruitment
   - £1,950 = one school's Bronze partnership for a year

7. **Trust signals**
   - London Living Wage Employer
   - Registered Charity 1164222
   - Sported award
   - Laureus, Jack Petchey, Sported, England Athletics affiliated

8. **CTA**
   - [Donate now] (links to Whydonate)
   - [Talk to us about partnership]

---

### 3.16 Contact (`/contact`)

#### Structure
1. **Hero** — Simple
   - Image: sign of Willesden Sports Centre
   - Headline: "Contact Track Academy"
   - Lead: "We'd love to hear from you."

2. **Contact details**
   - Email: admin@trackacademy.co.uk
   - Phone: 07956 715052
   - In person: Willesden Sports Centre, Tuesdays and Thursdays 4pm-6.30pm, Saturdays 10am-12.30pm

3. **Contact form (audience-routed)**
   - First: "Who are you?" selector:
     - I'm a parent/guardian
     - I'm from a school
     - I'm a funder/partner
     - I want to volunteer
     - Something else
   - Based on selection, form adapts:
     - Parent: child's name, your name, email, question type
     - School: school name, your role, email, pupil numbers
     - Funder: organisation, your name, email, funding interest
     - Volunteer: your name, email, what you'd like to help with
     - Something else: your name, email, message
   - All variants: phone (optional), message

4. **Safeguarding concern redirect**
   - "If you have a safeguarding concern, please contact our Designated Safeguarding Lead directly — see our Safeguarding page."
   - Link: /safeguarding

5. **Map**
   - Embedded Google Map of Willesden Sports Centre, NW10 3QX

---

### 3.17 Privacy Policy (`/privacy`)

*Migrate/update existing content — not part of creative scope*

---

### 3.18 404 Page (`/404`)

#### Structure
- Track Blue background
- Large text: "This track doesn't exist."
- Subtext: "The page you're looking for isn't here, but the track is still open."
- Links: Homepage / Register / Events / Contact
- Stats counter animation: "577 sessions > 0 sessions here"

---

## 4. Header & Footer

### Header
- **Left:** Logo (transparent)
- **Centre/Right:** Main nav (About, Programmes, Schools, Events, Competitions)
- **Far right:** [Register] CTA button (Track Orange), Support link
- **Mobile:** Hamburger (Tracks Blue), logo remains visible left

### Footer
- **Column 1: Brand**
  - Logo
  - "Changing lives since 2007"
  - "Track Academy (no. 1164222) is a registered charity in England & Wales."
- **Column 2: Quick links**
  - About
  - Programmes (list)
  - Schools
  - Impact
  - Safeguarding
  - Team
  - Contact
- **Column 3: Get involved**
  - Register your child
  - Partner with your school
  - Support our work
  - Donate
  - Volunteer
- **Column 4: Contact**
  - Email: admin@trackacademy.co.uk
  - Phone: 07956 715052
  - Willesden Sports Centre
  - NW10 3QX
  - Social icons: Instagram / LinkedIn / TikTok / Facebook
- **Trust strip:** England Athletics logo / Charity Commission / London Living Wage (if logo available)

---

## 5. Forms

Two distinct form patterns:

### 5.1 Registration wizard (multi-step)
- Defined in section 3.14 above
- Supabase insert + Upshot sync

### 5.2 Simple enquiry/contact forms (single-page)
- Used on: Schools page enquiry, Performance Coaching enquiry, Contact form, Support form
- Fields vary by audience (see individual page specs)
- Submit to: Supabase table + notification email to relevant staff member
- Workflow: staff follow up manually within 1-2 working days

### Form system requirements
- Spam protection: Honeypot or reCAPTCHA v3 (invisible)
- Rate limiting: Max 3 submissions per IP per hour
- Success state: Clear confirmation, "What happens next" text
- Error state: Preserve user input, inline error messages
- Analytics: Track form abandonment (GA4 events on step completion for wizard)

---

## 6. Database Schema (Supabase) — Foundation

See `strategy/database-schema.md` for detailed schema. Include in the build:

### Core tables
1. **athletes** — young people registered with Track Academy
2. **guardians** — parents/carers
3. **staff** — staff, coaches, mentors, tutors, trustees
4. **sessions** — training/education/mentoring session definitions and schedule
5. **session_attendance** — who attended which session
6. **events** — upcoming/recurring events
7. **fixtures** — competition fixtures
8. **schools** — partner schools
9. **school_partnerships** — partnership agreements (tier, dates, pupils)
10. **outcomes** — self-reported outcome surveys
11. **forms** — generic enquiry/contact submissions
12. **medical_conditions** — reference table
13. **membership_payments** — fee tracking
14. **upshot_sync_log** — tracking Upshot sync status

---

## 7. Integrations

### 7.1 Upshot (Phase 1 — sync)
**Goal:** New registration submits to our Supabase DB, then syncs to Upshot via API.

**Sync scope:**
- Direction: One-way write (We → Upshot)
- Fields: Athlete demographic, contact, guardian, membership, school
- Frequency: On submit (real-time) + daily reconciliation
- Failure handling: Log in upshot_sync_log table, alert admin via email

**API credentials:** Calvin will provide

### 7.2 Spond (Phase 1 — reference)
**Goal:** Continue using Spond for parent-athlete communication. Link to Spond from site.

**Scope:**
- Link to spond.com/invite/DGRNR for joining
- Link to club.spond.com/trackacademy for club page
- No API integration in MVP

**Future:** Replace Spond with own messaging system in Phase 2

### 7.3 OpenTrack (Phase 1 — reference)
**Goal:** Continue using OpenTrack for competition entries. Link out from events page.

**Scope:**
- Link to data.opentrack.run/en-gb/x/2026/GBR/taoc/ for Open Meet 2026
- No integration in MVP

### 7.4 Whydonate (Phase 1 — reference)
**Goal:** Continue using Whydonate for donations. Link from support page and donate CTAs.

**Scope:**
- Link to whydonate.com/en/fundraising/trackacademy
- No integration in MVP

### 7.5 Stripe (Phase 2 — payments)
**Goal:** Replace bank transfer/PayPal/Spond payment friction with on-site Stripe checkout for membership fees and donations.

**Scope:** Phase 2, not in MVP

### 7.6 Google Analytics 4 + Search Console (Phase 1 — setup)
**Goal:** Track website performance, conversions, search rankings from launch.

---

## 8. Performance Requirements

- **First Contentful Paint:** < 1.5s on mobile
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3s
- **Total Page Weight:** < 500KB initial load
- **Image strategy:** Next-gen formats (AVIF/WebP), responsive srcset, lazy loading
- **JS strategy:** Minimal JS, defer non-critical, no framework bloat
- **Caching:** Static assets cached 1 year, HTML revalidated on deploy
- **CDN:** Cloudflare (Calvin's infra)

---

## 9. SEO Strategy (Initial)

See `strategy/seo-plan.md` for detailed plan. Foundation topics:

### On-page SEO (built into each page)
- Meta titles/descriptions per page (formula defined in tone of voice doc)
- Schema.org structured data: Organization, SportsActivityLocation, Event, Charity
- XML sitemap auto-generated
- Robots.txt
- Canonical URLs
- Open Graph tags (per page)
- Twitter card tags

### Keyword targets (initial)
1. Brand: "Track Academy" — already ranks
2. "athletics charity Brent"
3. "youth athletics London"
4. "athletics for kids Brent"
5. "Pupil Premium athletics"
6. "school sports partnership London"
7. "holiday programme athletics Brent"
8. "mentoring for young people Brent"
9. "sports mentoring charity London"
10. "Willesden athletics"

### Content marketing (Phase 2)
- Blog/news section
- Stories (young people, coaches, families)
- Community news (Brent-specific)
- Funding announcements
- Coach resources

---

## 10. Content Migration Plan

### From current site → new site
1. **Homepage copy** — Rewrite (new structure)
2. **About** — Rewrite, add team names, Connie tribute, Patrik welcome
3. **Impact** — Rewrite, add all stats from annual report, add stories
4. **Safeguarding** — Migrate copy, fresh layout
5. **Athletics/Activities** — Rewrite, add pricing clarity, add SEND
6. **Education & Life Skills** — Migrate, add case evidence images (convert HEIC)
7. **Mentoring** — Rewrite, add stats, add Coach Lumar feature
8. **Holiday Programmes** — Rewrite (currently 1 paragraph), add past activities
9. **Performance Coaching** — Migrate, fix URL nesting, fresh visual
10. **Schools** — Migrate, fresh visual, ensure pricing accurate
11. **Events** — Migrate copy, build database-driven feed
12. **Competitions & Fixtures** — Migrate, build database-driven fixtures table
13. **Contact** — Rewrite, audience-routed form, remove "Lorem ipsum"
14. **Register** — Replace Upshot embed with new wizard

### From Annual Report 2024 → new site content
- Team names → /team page
- Impact stats → /impact page
- Jack Petchey winners → /impact stories OR homepage stories
- 2024 priorities → /about page
- Founder history → /about page
- Frederik bio → /team page
- Patrik bio → /about and /team pages

### From LinkedIn posts → new site content
- 98% recommendation stat → /impact
- 91 on Tuesday, 101 on Thursday → /impact (narrative stat)
- England Athletics hub pilot → /about news section
- Sported recognition → /support trust strip (if logo available)
- Runner's World feature → /impact media credibility

---

## 11. Analytics & Tracking

### GA4 Setup
- Property for trackacademy.co.uk
- Key events:
  - registration_step_complete (per step in wizard)
  - registration_submit
  - enquiry_submit (per audience type)
  - annual_report_download
  - donate_click
  - spond_join_click
  - external_link_click (categorised)
  - phone_click
  - email_click
- Conversions:
  - Registration complete (primary)
  - School enquiry submit
  - Funder/contact submit
  - Annual report download

### Search Console
- Verify ownership
- Submit sitemap
- Monitor indexing, click-through, position

### Hotjar or PostHog (optional)
- Session recordings on key conversion paths (registration, contact)
- Heatmaps on homepage
- Form funnel visualisation

---

## 12. Build Phasing

### Phase 1 — MVP Website (this build)
- All static pages
- Forms (registration wizard, contact, enquiry)
- Database schema set up in Supabase
- Upshot sync (write-only, on registration)
- GA4 + Search Console
- Deploy to Calvin's infra
- DNS migration

### Phase 2 — Database & Internal Tools (near-term)
- Staff dashboard: view athletes, attendance, contact info
- Event management: add/edit events via CMS
- Fixtures management: add/edit fixtures via CMS
- School portal: view partnership, pupil list, termly report

### Phase 3 — Engagement Tracking (medium-term)
- Athlete Passports: each young person has a digital record
- Attendance tracking: coach logs attendance after each session
- Outcome surveys: periodic self-reporting, stored in DB
- Impact dashboard: live data for funders (private or public)

### Phase 4 — Platform & Portals (long-term)
- Parent portal: view child's progress, pay fees, register siblings, message staff
- School portal: Athlete Passport views, termly report download, pupil management
- Funders portal: live impact dashboard, outcome data, demographic breakdowns
- Volunteer management: sign-up, scheduling, DBS tracking
- Spond replacement: in-app messaging, event RSVPs, payments

---

## 13. Definition of Done

The MVP is "done" when:

- [ ] All pages in sitemap are live on trackacademy.co.uk
- [ ] Registration wizard works end-to-end, saves to Supabase, syncs to Upshot
- [ ] All enquiry/contact forms route to correct staff member
- [ ] GA4 + Search Console installed and verified
- [ ] XML sitemap submitted to Google
- [ ] All 404 redirects from old URLs set up
- [ ] All images optimised (AVIF/WebP)
- [ ] Lighthouse performance score > 90 on mobile
- [ ] WCAG AA accessibility audit passes
- [ ] Cross-browser tested (Safari, Chrome, Firefox, Edge)
- [ ] Cross-device tested (iPhone SE, iPhone 14, Pixel, iPad, desktop)
- [ ] Content reviewed by Patrik/Erick for accuracy
- [ ] Safeguarding policies accessible and correct
- [ ] DNS pointed to new hosting
- [ ] Old WordPress site archived (but DNS retained for redirects)
- [ ] Staff trained on Sanity CMS for content edits