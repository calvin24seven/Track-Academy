# Art Direction — Track Academy

*Version 1.0 · July 2026*
*Visual language for the website rebuild. Built from provided brand colours, inspiration references, and existing photography.*

---

## 1. Design Direction

### In one sentence
A serious youth development charity that happens to use athletics as the engine — not a sports club website, not a generic charity template.

### What it should feel like
- **Confident and clean.** Big images, big numbers, real faces. Whitespace is not wasted — it's part of the trust.
- **Warm but not soft.** The orange is energy, not decoration. The blue is authority, not coldness.
- **Community-rooted.** Brent is in the texture. The track, the centre, the postcode.
- **Evidence-led.** Every claim has a number or a face behind it.

### What it should not feel like
- A WordPress template
- A generic charity website with stock photos and "Donate Now" banners
- A sports club website with fixture tables and league tables as the hero
- A corporate site with a glassy hero gradient and three icons in a row

---

## 2. Visual References (from provided inspiration)

### Primary reference: Greenhouse Sports
- **What we take:** Mission-led hero, emotional case study quotes, clear audience routing, safeguarding visibility, donate journey
- **What we elevate:** Better typography, cleaner card system, track-specific colour palette instead of generic charity green
- File: `research/Track Academy/Assets/website inspiration/screencapture-greenhousesports-org-...png`

### Secondary reference: StreetGames
- **What we take:** Big impact stat section, "How will you play your part?" audience routing, partner/funder credibility, strong movement language
- **What we elevate:** More photographic, less infographic-heavy. Their stats are good but their images are average. We have better photos.
- File: `research/Track Academy/Assets/website inspiration/screencapture-streetgames-org-...png`

### Tertiary reference: YoungMinds
- **What we take:** "Who are you?" user routing parent/professional/support, strong safeguarding trust pages, resource library
- **What we elevate:** More energetic, less clinical. YoungMinds is a helpline charity — we're a physical, community-based programme. Our design should move.
- File: `research/Track Academy/Assets/website inspiration/screencapture... (not provided for YoungMinds but analysed in docx)`

### Additional references from the doc
- Dame Kelly Holmes Trust — mentor storytelling positioning
- Dallaglio RugbyWorks — sport + long-term mentoring framing
- London Youth — "Impact and data" as a top-level nav item, institutional credibility
- The King's Trust — confidence/careers/opportunity language
- Children's Society — screenshot provided
- Farm Africa — screenshot provided
- UK Property Looker — screenshot provided (likely unrelated, disregard)

---

## 3. Layout System

### Grid
- 12-column desktop grid
- 4-column mobile grid
- Max content width: 1280px (centred)
- Section padding: 80px top/bottom desktop, 48px mobile
- Container padding: 24px mobile, 32px tablet, 48px desktop

### Section types

#### A. Full-bleed hero
- 100vh on desktop, 80vh on mobile
- Image: full-bleed, darkened with gradient overlay (Track Blue at 40-60% opacity, bottom-heavy)
- Text: white, left-aligned, bottom 40% of screen
- CTAs: primary (orange), secondary (white outline)
- Pattern used: Homepage, Schools page, Impact page

#### B. Stat band
- Full-width strip, Track Blue background, white text
- 3-4 stats in a row
- Stat number: Orange, 4.5rem, bold
- Stat label: White, small caps, 0.875rem
- No image — let the numbers speak
- Pattern: Homepage, Impact page, Schools page, Funder-facing sections

#### B. Split feature
- 50/50 split: image left, text right (alternate sides for rhythm)
- Image: full-bleed within its half, no rounded corners
- Text: heading, body, CTA
- Background: white or light grey alternating
- Pattern: Programme pages, About page, Stories

#### C. Card grid
- 3-up on desktop, 1-up on mobile (or 2-up tablet)
- Cards: clean edge-to-edge image, text below, no shadow
- Hover: subtle lift (2px) + image zoom (1.02)
- Pattern: "What we offer" section, Life Skills modules, Events listing

#### D. Quote card
- Large text, 1.75rem, Inter italic medium
- Portrait crop image OR solid Track Blue background
- Attribution: name, role/context
- Pattern: Impact page testimonials, homepage social proof

#### E. Timeline/Step flow
- Numbered steps with connecting line
- Used for: "How it works" (schools), "How to register," "How to get your URN"

#### F. Pricing tiers
- 3-column on desktop, stacked on mobile
- Middle tier highlighted (subtle Track Orange border or background tint)
- Clean, no "Most Popular" banner unless data shows it converts
- Pattern: Schools page (Bronze/Silver/Gold), Performance Coaching

---

## 4. Imagery System

### Using the provided photos

#### Hero images (from research folder)
Best candidates for heroes:
1. `student running fast on track.jpg` — action, speed, determination
2. `students on track about to race.webp` — group, energy, start line
3. `coach demonstrating in front of children.jpg` — coaching, trust
4. `older students on track posing.jpg` — pride, achievement
5. `children being spoken to on track - nice photo of girl smiling.jpg` — warmth, individual story

#### Secondary narrative images
- `close up of coach giving students info.jpg` — coaching detail
- `coach and students group photo.jpg` — team/family
- `student ready to race - close greyscale shot.jpg` — focus, intensity (greyscale works well for section dividers)
- `back of coach wearing TA uniform with logo visibile.jpg` — brand visibility, identity
- `image of sign of venue where activities occur - Willesden Sports Centre.jpg` — place/anchoring
- `student education.jpg` — education programme
- `Students-learning.jpg` — classroom/tuition
- `staff working hard in office.webp` — behind-the-scenes

#### Event/programme graphics
- `Graphics and designs/event graphic(1).jpg` — event promotion
- `Graphics and designs/track-open-meet.jpg` — competition
- `Graphics and designs/inclusive track meet.jpg` — inclusive SEND sessions
- `Graphics and designs/athlete-to-coach.jpg` — Lumar/every coach story arc
- `Graphics and designs/winner for tackline inequalities_.jpg` — tackling inequalities

### Image treatments

#### Hero overlay
```css
background: linear-gradient(
  to top,
  rgba(11, 43, 140, 0.75) 0%,
  rgba(11, 43, 140, 0.3) 50%,
  rgba(11, 43, 140, 0) 100%
);
```

#### Quote card background
```css
background-color: #112b8c;
color: #ffffff;
```

#### Stat band
```css
background-color: #112b8c;
```

#### Section divider (no image)
```css
background-color: #112b8c;
height: 4px;
width: 60px;
margin: 48px 0;
```

---

## 5. Component Design

### Buttons

#### Primary CTA
- Background: Track Orange `#f2620e`
- Text: White, bold, 1rem
- Padding: 16px 32px
- Border-radius: 0 (square corners — deliberate, not rounded — sport aesthetic)
- Hover: darkens to `#d4550c`, 0.1s ease
- Active: darkens further to `#b5501a`

#### Secondary CTA
- Background: transparent
- Text: White (on dark backgrounds) or Track Blue (on light backgrounds)
- Border: 2px solid current text colour
- Padding: same as primary
- Hover: background fills with text colour, text inverts

#### Tertiary/link
- Text only, Track Blue, underlined on hover
- Used in body copy for internal links

### Cards

#### Programme card
```
┌─────────────────────────────┐
│ [Full-bleed image]           │
│                              │
│ Athletics & Skill Development│
│ For young people aged 5-21   │
│ at Willesden Sports Centre  │
│                              │
│ Learn more →                 │
└─────────────────────────────┘
```

- No border, no shadow by default
- On hover: image zooms 1.02, card lifts 2px, soft shadow appears
- Heading: Inter semibold 1.25rem
- Body: Inter regular 1rem, Track Grey
- Arrow changes colour to Track Orange on hover

### Stats

#### Big stat (in stat band)
```
   331
   young people aged 5-21
```

- Number: 4.5rem, Fredoka Medium bold, orange
- Label: 0.875rem, white, small caps, letter-spacing 0.05em

### Badges

#### Free badge
- Background: Success Green `#1a7d3a`
- Text: White, 0.75rem, bold
- Padding: 4px 12px

#### "Entries closing" badge
- Background: Alert Amber `#e8a200`
- Text: White, 0.75rem, bold

#### "Pupil Premium funded" badge
- Background: Track Blue
- Text: White, 0.75rem, bold

### Forms

#### Input fields
- Border: 1px solid Light Grey
- Focus: border becomes Track Blue, subtle blue glow
- Label: Inter medium 0.875rem, Track Grey
- Error: border becomes Error Red, error message in Error Red

#### Multi-step form (registration)
- Progress bar at top: Track Blue fill, Light Grey remainder
- Step indicator: "Step 2 of 4"
- Save progress: "Save and come back later" link
- Validation: inline, on blur (not on submit)

---

## 6. Motion & Interaction

### Scroll-triggered animations
- Stats count up from 0 to target number when entering viewport
- Images fade in with subtle upward translate (24px)
- Quote cards fade in slightly later than surrounding content

### Hover states
- Cards: lift 2px + soft shadow + image zoom 1.02
- Buttons: darken (primary) or invert (secondary)
- Links: underline grows from left
- Images in galleries: subtle zoom on hover

### Page transitions
- Keep minimal. Fade body content, keep nav persistent.
- No slide transitions or heavy animations.

### Motion principles
1. Motion should feel like motion on a track — purposeful, fast, then still
2. Nothing bounces. Nothing wiggles. Nothing loops continuously.
3. Stats counting up is the one "showy" animation. Everything else should be felt, not noticed.

---

## 7. Responsive Approach

### Mobile-first
- Design for 375px (iPhone SE) first, then scale up
- All thumb-reachable CTAs (bottom of viewport on mobile)
- Forms: single column, large touch targets (min 48px)
- Main nav collapses to hamburger (top right, Track Blue)

### Tablet (768px+)
- 2-up card grids
- Split sections begin to appear
- Nav becomes horizontal bar

### Desktop (1024px+)
- Full 3-up card grids
- 50/50 split sections
- Full nav visible
- Hero at 100vh

### Large desktop (1440px+)
- Max content width 1280px, centred
- More breathing room, not necessarily more content

---

## 8. Accessibility

### Contrast
- All text on backgrounds must pass WCAG AA (4.5:1 for body text, 3:1 for large text)
- Track Blue on white: ~7.8:1 — passes
- Track Orange on white: ~3.2:1 — fails for body text, passes for large text only. Use orange for large stat numbers and buttons, not body text.
- White on Track Blue: ~7.8:1 — passes
- White on Track Orange: ~3.2:1 — passes only for large text/buttons

### Focus states
- All interactive elements must have a visible focus ring (2px Track Blue outline, 2px offset)
- Never remove focus outlines

### Screen readers
- All images have alt text (descriptive, not decorative)
- Stats: aria-label includes the number and context ("577 sessions delivered in 2024")
- Form fields: associated label elements, not placeholder-only labels
- Navigation: skip-to-main-content link

### Motion preferences
- Respect `prefers-reduced-motion` — disable count-up, fade-ins, zooms
- Never auto-play video

---

## 9. Iconography

### Style
- Line-based, not filled
- Sport-themed where relevant (running, education, mentoring)
- Simple, 2px stroke, Track Blue on white or White on Track Blue
- 24px standard size
- Never use emoji as icons in the UI (social media posts are different)

### Where icons appear
- Next to stat labels (optional)
- In "How it works" step flows
- In contact information blocks (phone, email, location)
- In footer social links

### Where they don't
- In nav (text is clearer)
- In buttons (text is sufficient)
- As decoration in body copy

---

## 10. Dark Mode (Future Consideration)

Not for MVP, but design with it in mind:
- Track Blue becomes background
- White becomes primary text
- Orange stays orange
- Light Grey becomes dark grey
- Images may need brightness adjustment

---

## 11. What "Done" Looks Like

If you open the homepage and it feels like:
- A Brent-rooted charity that takes itself seriously
- A place that uses athletics for something deeper than sport
- A place that tracks and proves its impact
- A place where a parent would feel safe sending their child
- A place where a Head of PE would feel confident bringing their pupils
- A place where a Sport England grants officer would want to write the cheque

...then the art direction is working.