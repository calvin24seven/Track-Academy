# Art Direction Pro — Track Academy

*Version 1.0 · July 2026*
*The S-tier enrichment document. This supplements `art-direction.md` (the floor) with the design differentiation needed to reach S-tier (the ceiling). Read both together. Where this document and `art-direction.md` conflict, this document wins.*

---

## 0. Why This Document Exists

The existing strategy documents (`art-direction.md`, `brand-guidelines.md`, `prd.md`, `build-prd.md`, `tone-of-voice.md`) specify an A-grade engineering baseline, a strong brand voice, and a competent visual system. They do NOT specify the design differentiation needed for S-tier output. Specifically, across all five documents there is no significant specification for:

- Layout asymmetry or editorial composition
- Scroll-driven storytelling
- Bespoke data visualisation
- Typography as a design weapon (variable fonts, display treatments, numerals as feature)
- Motion design beyond two Framer-default keyframes
- Image treatment art direction (one gradient overlay across every hero)
- Texture, material, or tactile depth
- Bespoke iconography or illustration
- Mobile-specific signature patterns (just stacked desktop)
- Hero variants (one anatomy reused across ~8 pages)
- Signature moments list
- Personality in empty/loading/success/error states beyond the 404

This document closes those gaps. Every section here is operational — it specifies what to build, not just what to feel.

**Reference research:** `strategy/RESEARCH_AI-vs-S-tier-design.md` documents why AI-generated/templated sites look the same and what S-tier sites do differently. This document applies that research to Track Academy.

---

## 1. Signature Moments

Define the 5–8 moments a visitor should remember. These become bespoke components, not template blocks. If a visitor leaves and can't describe a single moment, the design failed.

### The 7 Signature Moments

| # | Moment | Page | What Makes It Signature |
|---|---|---|---|
| 1 | **The Track Entrance** | Homepage hero | A full-bleed athlete photo that bleeds past the content column. Type set INTO the negative space of the image, not overlaid on a gradient. The headline doesn't sit on the photo — it crashes through it. The first thing a visitor sees should feel like the athlete is running past them, not posing for them. |
| 2 | **The 360 Story** | Homepage, "What we do" section | Not a 4-up card grid. A scroll-driven sequence: as you scroll, the three pillars (Athletics → Education → Mentoring) pin and reveal in sequence. Each pillar takes over the screen for one scroll-beat. The transition between pillars is a horizontal wipe, not a fade. |
| 3 | **The Numbers That Prove It** | Homepage + Impact page | Stats are not a blue band with orange numbers. They are oversized numerals — 12rem on desktop, 6rem on mobile — that ESCAPE the content column. The number "577" breaks past the right edge of the text column. Tabular figures. Count-up is replaced with a scroll-velocity-driven scrub: the number advances as you scroll, not on a timer. |
| 4 | **The Athlete Stack** | Homepage stories + Impact stories | Not 3-up quote cards. A vertically swipeable stack on mobile, a horizontal scroll-snap on desktop. Each card is a full-bleed portrait with a pull-quote set into the negative space. Swipe left to advance to the next athlete. The stack has physical weight — it snaps, it resists, it settles. |
| 5 | **The Founder's Track** | About page, founder story section | A pinned scroll-driven sequence. The founder's photo stays fixed while the story text scrolls past it. As the text describes "2007, Willesden Sports Centre, one coach, one track," the image cross-fades to a second image (the track today). The scroll IS the timeline. |
| 6 | **The Registration Welcome** | Register page, success state | When a parent completes registration, they don't see a generic "Thank you" confirmation. They see: a coach's name, a coach's photo, and a first-person message: "See you Tuesday at 4pm. Bring water and trainers. — Coach Beth." This is the single most emotional moment in the entire UX. It should feel like a text from a real person. |
| 7 | **The Brent Context** | About page, "The need" section | Five stats about Brent (41% child poverty, 28% safe spaces, etc.) are not a row of icons. They are a full-width, full-bleed section with a single number at a time — the number fills the screen, the text is small below it. As you scroll, the numbers change. One scroll = one number. No icons. No grid. Just the number and the truth. |

### Anti-patterns these moments replace

| Instead of | We build |
|---|---|
| Hero image with gradient overlay + centered text | The Track Entrance (type crashes through photo) |
| 4-up card grid for "What we do" | The 360 Story (scroll-pinned pillar sequence) |
| Stat band with count-up animation | The Numbers That Prove It (scroll-scrubbed, column-escaping numerals) |
| 3-up quote cards for testimonials | The Athlete Stack (swipeable full-bleed portraits) |
| Split feature with static image + text | The Founder's Track (pinned image, scrolling text, cross-fade) |
| "Thank you for registering" confirmation page | The Registration Welcome (first-person coach message) |
| Row of 5 icon+stat cards | The Brent Context (one number at a time, full-bleed scroll) |

---

## 2. Layout Asymmetry System

The existing `art-direction.md` specifies a 12-column grid, 1280px max width, 80px section padding. This is the Framer/Webflow boilerplate. S-tier sites break grids on purpose.

### 2.1 Grid System — Revised

| Property | Floor (art-direction.md) | S-tier (this document) |
|---|---|---|
| Desktop grid | 12-column, 1280px centred | 12-column, but **three content widths**: Narrative (960px), Feature (1280px), Full-bleed (100vw). Most text content sits in the 960px Narrative width — tighter than expected, forcing editorial pacing. |
| Mobile grid | 4-column | **Full-bleed mobile.** Text constrained to 88vw (with 6vw margins). Photography and stat numerals break out to 100vw. Mobile is NOT a narrower desktop — it is a different composition. |
| Section padding | 80px desktop, 48px mobile (uniform) | Fluid: `clamp(3rem, 8vw, 7rem)`. Sections vary by importance: tight `clamp(2rem, 4vw, 4rem)` for dense info sections, spacious `clamp(4rem, 10vw, 9rem)` for hero and signature moments. Never the same value everywhere. |
| Max width | 1280px everywhere | Three tiers: `max-w-narrow` (960px, for prose), `max-w-content` (1280px, for features), `max-w-none` full-bleed (for heroes, stats, photography). |

### 2.2 Asymmetric Layout Patterns

Replace every `grid-cols-3` and every equal-split with one of these five patterns:

**Pattern A: Primary/Secondary Split (60/40 or 7fr 5fr)**
Use for: "What we do" section, programme blocks, schools "why partner" section.
One large feature takes 60% of the width. Two smaller features share 40%. Creates visual hierarchy — the primary feature is literally larger.

**Pattern B: Offset Feature (content + 1 column offset)**
Use for: Split sections (founder story, 360 approach, schools funding model).
Image fills its half but extends 1 column past the centre line. Text starts 1 column in from the opposite edge. Creates editorial tension — the image leans into the text's space.

**Pattern C: Full-Bleed with Inset Text**
Use for: Hero variants, stat numerals, the Brent Context.
The visual (photo, number, colour) spans 100vw. The text sits in a 960px inset, left-aligned, not centred. The text doesn't compete with the visual — it lives inside it.

**Pattern D: Stacked Editorial (alternating left/right, full-bleed images)**
Use for: Athlete stories, programme pages, holiday programme gallery.
Each section is a full-bleed image with text inset on alternating sides. Scroll rhythm: image-text-image-text, each taking a full viewport. Feels like a magazine spread, not a card grid.

**Pattern E: Numerals Escaping the Column**
Use for: All stat displays.
The numeral is set in a font size that makes it wider than the text column. It breaks past the right edge. The label sits below, constrained. The number IS the design.

### 2.3 Section Rhythm

| Section type | Rhythm | Padding |
|---|---|---|
| Hero / signature moment | Spacious, full-bleed | `clamp(4rem, 10vw, 9rem)` |
| Narrative/text section | Tight, prose-width | `clamp(2.5rem, 5vw, 5rem)` |
| Data/stat section | Spacious, full-bleed | `clamp(4rem, 8vw, 7rem)` |
| CTA band | Tight, contained | `clamp(3rem, 6vw, 5rem)` |
| Photo gallery / athlete stack | Full-bleed, no padding | `0` (the content IS the section) |

Never two adjacent sections with the same padding. The rhythm should breathe tight-spatial-tight-spatial, not metronomic.

---

## 3. Scroll-Driven Storytelling

Two pages get full scroll-driven treatment: **Impact** and **About (Founder Story)**. These are the highest-narrative pages and the ones where scroll storytelling creates the most emotional weight.

### 3.1 Impact Page — Scroll Choreography

The Impact page is not a sequence of bands. It is a scroll journey. As the visitor scrolls, the page tells the story of one year at Track Academy, chapter by chapter.

**Scene 1: The Number (viewport 1)**
- Full-bleed Track Navy background.
- One number: 577. Set at `clamp(8rem, 22vw, 20rem)`. Fredoka, weight 700. Track Orange.
- As you scroll, the number scrubs from 0 → 577 (scroll-driven, not timer-driven).
- Small text below: "sessions delivered in 2024."
- On scroll past, the number fades and the next scene rises.

**Scene 2: The Faces (viewport 2)**
- Pin: the 577 stays faintly visible in the background as the scene changes.
- 331 athlete photos cascade in — not a grid, but a scroll-revealed mosaic. Small photos that accumulate as you scroll. By the end of the scroll, 331 faces fill the screen.
- Caption: "331 young people. Aged 5 to 23. In Brent."

**Scene 3: The Outcomes (viewport 3-4)**
- The faces dissolve. One outcome stat at a time, each taking a full viewport:
  - "66% improved school performance" — the "66%" is enormous, the rest is small.
  - "87% gained new skills"
  - "94% believe they can achieve their goals"
- Each stat: numeral escapes the column (Pattern E), scroll-driven count, small caption below.
- The transition between stats is a horizontal slide, not a fade.

**Scene 4: The Voices (viewport 5)**
- The stats dissolve. A single full-bleed portrait appears.
- A pull-quote is set into the negative space of the photo.
- As you scroll, the portrait slides away and the next one slides in. Three quotes total.
- Each quote is from a real person: Ra'elle (age 14), a parent, Mike Finnie (Newman Catholic College).

**Scene 5: The Report (viewport 6)**
- The last portrait dissolves to Track Navy.
- A single line: "Read the full 2024 Annual Report."
- The PDF download is a deliberately unspectacular moment — after the emotional scroll, the report is the quiet evidence. No big button. Just a text link with a small file size indicator.

**Technical approach:**
- CSS scroll-driven animations (`animation-timeline: scroll()`) where supported (Chrome/Edge 2024+).
- Fallback: Intersection Observer with `requestAnimationFrame` scrubbing.
- `prefers-reduced-motion`: all scroll-driven sequences become static stacked sections. No scrubbing, no pinning. The content is the same; the choreography is removed.

### 3.2 About Page — Founder's Track

The founder story section (Connie Henry MBE, founded 2007) uses a pinned image with scrolling text.

**Layout:**
- Left side (50%): Connie's portrait, pinned. Stays fixed as the text scrolls.
- Right side (50%): The story text scrolls past the fixed portrait.
- At the midpoint of the scroll, the portrait cross-fades to a second image (the track today, or Patrik at the track).
- The cross-fade is scroll-driven, not timer-driven. The visitor controls the transition.

**Scene choreography:**
- Scroll 0%: Portrait of Connie. Text: "2007. One coach. One track. Willesden Sports Centre."
- Scroll 33%: Portrait still Connie. Text: "She grew up in Brent. She came back. She believed in kids who'd been told they can't."
- Scroll 66%: Cross-fade begins — Connie's photo dissolves to the track today. Text: "17 years later, Track Academy has delivered 577 sessions to 331 young people."
- Scroll 100%: Photo is now the track today. Text: "Connie stepped back in 2024. Patrik Ewe now stands at the track edge. The track is still open."

---

## 4. Typography as a Weapon

The existing `brand-guidelines.md` specifies Fredoka Medium for headings, Inter Regular for body. This is fine. The missed opportunity is that BOTH fonts are variable fonts, and neither document mentions axes, weight extremes, or display treatments.

### 4.1 Variable Font Strategy

Both Fredoka and Inter ship as variable fonts. Use the axes.

**Fredoka (variable):**
- `wght` axis: 300 (Light) → 700 (Bold)
- Use **Light (300)** for oversized display numerals (stats) — at 12rem+, light weight reads as elegant, not heavy.
- Use **Medium (500)** for headings (as currently specified).
- Use **SemiBold (600)** for hero headlines only — creates weight contrast against Medium headings.
- Use **Bold (700)** for stat numerals in scroll sequences where the number needs to dominate.

**Inter (variable):**
- `wght` axis: 100 (Thin) → 900 (Black)
- `opsz` axis (optical size): 14pt → 36pt — use higher opsz for large text (sharper, tighter), lower opsz for small text (more open, legible).
- Use **Regular (400)** for body (as currently specified).
- Use **Medium (500)** for labels, captions, stats labels.
- Use **Light (300)** for large editorial pull quotes (italic, light, 1.75rem) — creates a textural contrast against Fredoka headings.
- Use **SemiBold (600)** for UI text only (buttons, nav, badges) — never for body or headings.

### 4.2 Display Treatments

**The Numerals System:**
All impact stats use a consistent numeral treatment:
- Font: Fredoka, weight varies by context (300 for quiet stats, 700 for dominant stats).
- Size: `clamp(4rem, 10vw, 12rem)` for signature stats. `clamp(2.5rem, 6vw, 4.5rem)` for inline stats.
- Color: Track Orange for the number, Track Grey/white for the label.
- Features: tabular figures (`font-variant-numeric: tabular-nums`) so digits align.
- The numeral can break past the text column (Pattern E). The label stays constrained.
- No icons next to stats. The number IS the visual.

**The Hero Headline Treatment:**
- Hero headlines use Fredoka SemiBold (600), not Medium (500).
- Size: `clamp(2.5rem, 7vw, 5rem)`.
- Letter-spacing: `-0.02em` (tightened from the default).
- Line-height: `1.05` (tighter than the 1.1 specified in art-direction.md).
- `text-wrap: balance` to prevent awkward short last lines.
- On the homepage hero, the headline is set INTO the image, not overlaid on a gradient. The image has a clear area (negative space) and the type sits in it. This requires art direction per photo, not a CSS rule.

**The Pull Quote Treatment:**
- Font: Inter Light (300), italic.
- Size: `clamp(1.5rem, 3vw, 2.25rem)`.
- Line-height: `1.4`.
- Attribution: Inter Medium (500), `0.875rem`, small caps (`text-transform: uppercase; letter-spacing: 0.05em`).
- The quote sits in the negative space of a portrait photo, not in a card.

### 4.3 Type Scale — Revised

| Element | Mobile | Desktop | Weight | Tracking | Leading |
|---|---|---|---|---|---|
| Hero headline | `clamp(2.25rem, 7vw, 3.5rem)` | (same, fluid) | Fredoka 600 | `-0.02em` | `1.05` |
| Display numeral (signature) | `clamp(5rem, 18vw, 12rem)` | (same, fluid) | Fredoka 300/700 | `-0.03em` | `0.95` |
| H1 | `clamp(1.75rem, 5vw, 3rem)` | (same) | Fredoka 600 | `-0.01em` | `1.1` |
| H2 | `clamp(1.5rem, 4vw, 2.5rem)` | (same) | Fredoka 500 | `-0.01em` | `1.15` |
| H3 | `clamp(1.25rem, 2.5vw, 1.75rem)` | (same) | Fredoka 500 | `0` | `1.2` |
| Body | `clamp(1rem, 1.1vw, 1.125rem)` | (same) | Inter 400 | `0` | `1.65` |
| Body small | `0.875rem` | `0.875rem` | Inter 400 | `0` | `1.6` |
| Caption / label | `0.75rem` | `0.75rem` | Inter 500 | `0.05em` | `1.4` |
| UI text (buttons/nav) | `0.875rem` | `0.9375rem` | Inter 600 | `0` | `1.2` |
| Pull quote | `clamp(1.5rem, 3vw, 2.25rem)` | (same) | Inter 300 italic | `0` | `1.4` |
| Stat numeral (inline) | `clamp(2.5rem, 6vw, 4.5rem)` | (same) | Fredoka 700 | `-0.02em` | `1` |

All sizes use `clamp()` for fluid scaling. No breakpoint jumps. The scale is on a 1.25 ratio but with deliberate jumps (3x between hero and body, not 1.5x).

### 4.4 Anti-patterns

- Never use Fredoka Bold (700) for headings — reserve it for numerals and hero headlines only.
- Never use Inter for stats or numerals. Fredoka only.
- Never use `text-align: center` for body text. Body is always left-aligned. Center is reserved for the hero headline moment only.
- Never use all-caps for body text. Small caps (`text-transform: uppercase` + `letter-spacing: 0.05em`) is for labels and stat captions only.
- Never set stats as "big orange number + small white label below." The numeral treatment is specified above — weight, size, escaping the column.

---

## 5. Motion Design System

The existing `art-direction.md` specifies: stats count up, images fade in with 24px translate, cards lift 2px on hover. These are the two most-used motion patterns on the internet. Replace them with an authored motion language.

### 5.1 Named Eases

Replace `ease-out` everywhere with authored cubic-beziers. Each ease has a name and a character.

```css
:root {
  --ease-sprint: cubic-bezier(0.0, 0.0, 0.2, 1);        /* Fast start, clean stop. For buttons, taps, stat reveals. */
  --ease-settle: cubic-bezier(0.16, 1, 0.3, 1);          /* Fast start, gentle settle. For page loads, section reveals. */
  --ease-stretch: cubic-bezier(0.34, 1.56, 0.64, 1);     /* Slight overshoot then settle. For card entries, quote reveals. Use sparingly. */
  --ease-rest: cubic-bezier(0.4, 0, 0.6, 1);              /* Slow in, slow out. For ambient motion, image parallax. */
  --ease-track-out: cubic-bezier(0, 0, 0, 1);             /* Linear accelerate. For scroll-driven exits, elements leaving the frame. */
}
```

### 5.2 Motion Vocabulary

| Motion | Duration | Ease | Where used |
|---|---|---|---|
| Button press | 100ms | `--ease-sprint` | `:active` state on all buttons. `transform: scale(0.98)`. |
| Button hover | 150ms | `--ease-sprint` | Background colour change, not transform. |
| Card entry | 400ms | `--ease-settle` | Cards reveal on scroll. Not fade-up. Scale from 0.96 + opacity 0→1. |
| Section reveal | 500ms | `--ease-settle` | Full sections. Clip-path reveal (wipe from bottom). Not fade-up. |
| Stat scrub | Scroll-driven | n/a | Number advances with scroll position. Not timer-based. |
| Athlete stack advance | 300ms | `--ease-stretch` | Swipe gesture on mobile, scroll-snap on desktop. Slight overshoot. |
| Cross-fade (founder story) | Scroll-driven | n/a | Photo opacity tied to scroll position. |
| Image parallax | Scroll-driven | `--ease-rest` | Subtle. Max 10% translate. Only on hero and full-bleed feature images. |
| Nav state change | 200ms | `--ease-sprint` | Background fills, shadow appears on scroll-past-hero. |
| Form step transition | 300ms | `--ease-settle` | Current step slides out left, next step slides in from right. Not fade. |
| Registration success | 600ms | `--ease-stretch` | Coach photo + message scale in with slight overshoot. Emotional moment. |

### 5.3 Stagger System

When multiple elements reveal together (card grids, stat sequences), use staggered delays. Not linear — jittered (exponential).

```css
:root {
  --stagger-1: 0ms;
  --stagger-2: 80ms;
  --stagger-3: 160ms;
  --stagger-4: 280ms;  /* Gap grows — jittered, not metronomic */
  --stagger-5: 440ms;
  --stagger-6: 680ms;
}
```

Apply via `animation-delay` on sequential elements. The growing gap creates organic rhythm — feels like a human arranging elements, not a machine.

### 5.4 Entrance Variety

Never use the same entrance twice in a row. Mix:

- **Scale reveal:** `transform: scale(0.96) → 1` + opacity. For cards.
- **Clip-path wipe:** `clip-path: inset(100% 0 0 0) → inset(0 0 0 0)`. For sections. Bottom-up wipe.
- **Slide-in:** `transform: translateX(30px) → 0`. For consecutive elements (athlete stack, gallery slides).
- **Blur-in:** `filter: blur(12px) → blur(0)`. For hero images on page load. One per page.
- **Mask reveal:** `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)`. Left-to-right reveal for numerals and headlines.

### 5.5 Scroll-Driven Animation Approach

For the signature scroll sequences (Impact, About founder):
- Primary: CSS scroll-driven animations (`animation-timeline: scroll()`, `animation-timeline: view()`). Zero JS, GPU-accelerated, supported in Chrome/Edge 115+.
- Fallback: `requestAnimationFrame` + scroll position calculation. ~30 lines of JS.
- `prefers-reduced-motion`: all scroll sequences become static stacked sections. Content is identical, choreography is removed.

### 5.6 Hover — Revised

Replace "subtle lift (2px) + image zoom (1.02)" with surface-specific hover language:

| Surface | Hover behaviour |
|---|---|
| Programme card | Image scales 1.03. Card border (1px Track Blue at 20% opacity) appears. Arrow slides right 4px. No lift, no shadow. |
| Person card | Image desaturates to colour (from default slight desaturation). Name shifts to Track Orange. |
| Event card | Date badge background fills to Track Orange. Text inverts to white. |
| Story/quote card | No hover. These are not interactive — they are editorial. |
| Button (primary) | Darkens to `#d4550c`. `:active` scales to 0.98. |
| Button (secondary) | Border thickens from 2px to 3px. `:active` scales to 0.98. |
| Text link | Underline grows from left (background-size animation). |
| Nav item | Track Orange underline grows from left. |
| Stat numeral | No hover. Stats are not interactive. |

### 5.7 Anti-patterns

- Never use `transition-all`. Always specify properties: `transition: background-color, color, transform, box-shadow`.
- Never use `ease-in-out` for production motion. Use named eases.
- Never animate `width`, `height`, `margin`, or `top` — these trigger layout. Use `transform` and `opacity`.
- Never have more than 2 simultaneous animations on screen at once. Motion should be felt, not noticed.
- Never auto-play video or looping motion. The only exception is a one-time page load sequence.

---

## 6. Hero Variants

The existing `prd.md` uses one hero anatomy (full-bleed image + gradient overlay + headline + lead + CTAs) across ~8 pages. Same hero everywhere = no page-level personality. Define three hero types:

### Hero Type A: The Track Entrance (Homepage only)

- Full-bleed athlete photo, NO gradient overlay.
- The photo is art-directed to have clear negative space (sky, track surface, shadow area).
- Headline is set INTO the negative space, not overlaid on a gradient. This requires choosing a photo with space for the type.
- Headline: Fredoka SemiBold, `clamp(2.5rem, 7vw, 5rem)`, white.
- Sub: Inter Regular, `clamp(1rem, 1.5vw, 1.25rem)`, white at 90% opacity.
- CTAs: Primary (Track Orange), Secondary (white outline), positioned bottom-left.
- A thin (2px) Track Orange line runs across the bottom of the hero — the "track lane line."
- On page load: image does a blur-in (`blur(12px) → blur(0)`, 600ms). Headline does a mask reveal (left-to-right, starts after image).

### Hero Type B: The Editorial Split (About, Schools, Impact)

- 50/50 split. Left: full-bleed image (extends past content column by 1 column — Pattern B). Right: text on solid Track Light Grey background.
- No gradient overlay on the image. The image stands alone.
- Headline: Fredoka SemiBold, `clamp(2rem, 5vw, 3.5rem)`, Track Blue.
- Lead: Inter Regular, `clamp(1rem, 1.2vw, 1.125rem)`, Track Grey.
- CTAs: below the lead, left-aligned.
- On page load: image does clip-path wipe (bottom-up). Text fades in with 200ms delay.

### Hero Type C: The Data Hero (Impact page, scene 1)

- Full-bleed Track Navy background.
- One oversized numeral: `clamp(8rem, 22vw, 20rem)`. Fredoka, weight 300. Track Orange.
- Small caption below the number, Inter Medium, `0.875rem`, white, small caps.
- NO image. The number IS the hero.
- On scroll: the number scrubs from 0 to target (scroll-driven, not timer).
- This hero has no CTAs — the visitor scrolls to continue the story.

### Hero Type D: The Simple Hero (Safeguarding, Mentoring, Holiday Programmes, Support, Contact, Competitions, Events, Privacy)

- Full-bleed image with a SOLID colour treatment, not a gradient. The image is colour-graded to a Track Blue tint (duotone: Track Blue shadows, Track Orange highlights) — a consistent treatment that says "this is a Track Academy page."
- Headline: Fredoka SemiBold, `clamp(1.75rem, 4vw, 3rem)`, white.
- Lead: Inter Regular, white at 90%.
- CTAs: only if relevant. Some pages (Safeguarding, Privacy) don't need hero CTAs.
- On page load: image does a scale reveal (1.05 → 1, 500ms). Text fades in.

### Assignment

| Page | Hero type | Rationale |
|---|---|---|
| Homepage | A — The Track Entrance | The only page that gets the full signature hero. |
| About | B — Editorial Split (founder portrait) | Founder story needs a human, not a data moment. |
| Impact | C — The Data Hero | The number IS the story. |
| Safeguarding | D — Simple (duotone) | Trust page, doesn't need a showy hero. |
| Team | D — Simple (duotone, group photo) | People page, warm but not spectacular. |
| Athletics | D — Simple (duotone, action shot) | Programme page, consistent treatment. |
| Education | D — Simple (duotone, classroom) | Same. |
| Mentoring | D — Simple (duotone, coaching) | Same. |
| Holiday Programmes | D — Simple (duotone, activity) | Same. |
| Performance Coaching | D — Simple (duotone, athlete) | Same. |
| Schools | B — Editorial Split (partnership photo) | B2B page, needs human authority. |
| Events | D — Simple (duotone, event graphic) | Content page. |
| Competitions | D — Simple (duotone, competition shot) | Content page. |
| Register | D — Simple (duotone, coaching) | Action page, not a storytelling page. |
| Support | D — Simple (duotone, community) | Action page. |
| Contact | D — Simple (duotone, venue sign) | Functional page. |
| 404 | A — variant (Track Navy, no image, type only) | Signature moment for the error page. |

---

## 7. Image Treatment Art Direction

The existing `art-direction.md` specifies one treatment: "hero overlay gradient (bottom-heavy Track Blue at 40-60% opacity)" applied to every hero. Same overlay = same feeling. Replace with a system.

### 7.1 Image Treatment System

| Treatment | Where | How |
|---|---|---|
| **Raw (no treatment)** | Homepage hero (Type A), About founder portrait (Type B) | The photo stands alone. Type is set into negative space, not overlaid on a gradient. Requires art direction per photo. |
| **Duotone (Track Blue shadows → Track Orange highlights)** | All Type D heroes, section divider images | A consistent treatment that says "Track Academy." Applied via CSS `filter` or an SVG filter. The duotone is the brand signature on images — the way Instagram has a look, Track Academy has a look. |
| **Greyscale** | Section dividers, the founder story cross-fade second image, quote card backgrounds | Used for moments of stillness and reflection. "A serious youth development charity" reads in greyscale. |
| **Full colour** | Athlete stories (The Athlete Stack), programme card images, event images | Used for moments of energy and life. Real faces, real action. |
| **Colour-graded (warm)** | The Brent Context section, Impact "who we reach" demographics | Warm treatment (slightly pushed oranges in highlights) for community and population moments. |

### 7.2 Crop and Composition Rules

- **Never use the same crop twice in a row.** Alternate: wide → portrait → detail → wide.
- **Athlete portraits:** tight crop, head-and-shoulders. The face IS the story.
- **Action shots:** wide crop, the athlete is small in the frame. Shows the track, the context, the space.
- **Detail shots:** extreme close-up of hands, spikes, the track surface. Used as section dividers, not feature images.
- **Group shots:** medium crop, environmental. Shows the community, not the individuals.

### 7.3 Scale Relationships

- Hero images: 100vw × 100vh (full viewport). No content competes.
- Feature images: 100vw × 70vh. Text sits below.
- Inline images: constrained to content width (960px), `aspect-ratio: 16/9`.
- Portrait cards (athlete stack): `aspect-ratio: 3/4`. Taller than wide — faces read better.
- Thumbnail/detail images: `aspect-ratio: 1/1` or `4/3`.

### 7.4 Anti-patterns

- Never apply the same gradient overlay to every hero. The duotone treatment (Type D) is the consistent brand signature, not a CSS gradient.
- Never use images at the same size across a page. Vary: hero → detail → portrait → wide.
- Never crop faces at the chin. Head-and-shoulders or full-body — nothing in between.
- Never use a posed group shot as a hero. Action, mid-conversation, mid-stride.
- Never apply a filter to a photo without a reason. Each treatment maps to an emotional intent (see table above).

---

## 8. Texture, Material, and Tactile Depth

`brand-guidelines.md` says "Brent is in the texture. The track, the centre, the postcode." This was never operationalised. Operationalise it now.

### 8.1 The Texture System

| Texture | Where | How |
|---|---|---|
| **Track surface grain** | Stat band backgrounds, CTA bands, section dividers | A subtle noise texture (SVG filter or PNG at 4% opacity) over Track Blue backgrounds. Evokes the rubber track surface. Not obvious — felt, not noticed. |
| **Paper** | Trust strip, safeguarding policies, annual report section | A faint paper grain (SVG noise at 3% opacity) on white/light grey sections. Says "official document" without saying it loudly. |
| **Light bleed** | Hero edges, full-bleed image sections | A subtle warm radial gradient (Track Orange at 5% opacity) in one corner of hero images. Simulates light through a window at the sports centre. Not a full gradient — a single warm accent. |
| **Depth via scale, not shadow** | All layered elements | Shadows are mostly banned (per art-direction.md). Depth comes from scale: a numeral at 12rem reads as "in front of" the caption at 0.875rem. No drop shadows needed. |

### 8.2 Implementation

```css
/* Track surface grain — SVG noise as data URI */
.tracked-surface {
  position: relative;
}
.tracked-surface::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

### 8.3 Anti-patterns

- No glassmorphism (`backdrop-blur`). Anywhere.
- No drop shadows on cards, buttons, or text. Depth comes from scale and colour, not `box-shadow`.
- No grey-on-grey depth. Depth is warm (orange light) or cool (blue recede), never neutral.
- No flat-designy "everything is one layer." The page should have front (numerals, photos), middle (headlines, body), and back (track grain, light bleed) — three z-layers minimum.

---

## 9. Colour — Refined

The existing `brand-guidelines.md` colour system is strong (Track Blue + Track Orange, 80/20 ratio, "trust leads, energy follows"). The refinements below add the polish that separates competent from S-tier.

### 9.1 Neutrals — Hue-Tinted

Replace pure greys with hue-tinted neutrals. All neutrals carry 3-5% of Track Blue's hue. This creates cohesion — the entire palette feels like one family.

```css
:root {
  /* Brand colours — unchanged */
  --track-blue: hsl(230, 78%, 30%);
  --track-orange: hsl(25, 90%, 50%);
  --track-gold: hsl(43, 89%, 50%);
  --track-navy: hsl(230, 79%, 21%);

  /* Hue-tinted neutrals (carry 3-5% of Track Blue's 230° hue) */
  --grey-900: hsl(230, 10%, 12%);   /* Body text. Dark with blue tint. Never pure black. */
  --grey-700: hsl(230, 8%, 28%);    /* Secondary text. */
  --grey-500: hsl(230, 6%, 45%);    /* Tertiary text, captions. */
  --grey-300: hsl(230, 8%, 75%);    /* Borders, dividers. */
  --grey-100: hsl(230, 15%, 96%);   /* Section backgrounds. Slightly cool off-white. */
  --grey-50:  hsl(230, 20%, 98%);   /* Page background. Near-white with blue tint. */
}
```

### 9.2 Colour Budget

Three accent colours maximum per page, each appearing at most three times (nine total accent moments). The accents are: Track Orange (primary accent — CTAs, stat numerals), Track Gold (secondary accent — highlights on dark backgrounds, funder trust elements), Track Pink (tertiary — alerts/safeguarding only).

### 9.3 Selection and Focus

```css
::selection {
  background-color: hsl(25, 90%, 50%, 0.2);  /* Track Orange at 20% */
  color: hsl(230, 78%, 20%);                    /* Track Blue, dark */
}

:focus-visible {
  outline: 2px solid var(--track-orange);
  outline-offset: 2px;
  border-radius: 2px;
}
```

### 9.4 Colour-in-Context Rules

| Surface | Background | Text | Accent |
|---|---|---|---|
| Hero (Type A) | Full-bleed photo | White | Track Orange CTAs |
| Hero (Type B) | Track Light Grey (--grey-100) | Track Blue | Track Orange CTAs |
| Hero (Type C) | Track Navy | Track Orange numerals | White captions |
| Hero (Type D) | Duotone image | White | Track Orange CTAs |
| Stat band | Track Blue (with track grain) | Track Orange numbers | White labels |
| CTA band | Track Blue (with track grain) | White | Track Orange button |
| Body section | --grey-50 (warm near-white) | --grey-900 | Track Orange links |
| Trust strip | --grey-100 | --grey-700 | Greyscale logos |

### 9.5 Anti-patterns

- Never use orange as a large background colour (kept from art-direction.md — still true).
- Never use orange text on white — fails WCAG AA for body text. Orange is for large numerals and buttons only.
- Never use pure black (`#000000`). Use `--grey-900` (hue-tinted).
- Never use pure white background. Use `--grey-50` (near-white with blue tint).
- Never place orange text on blue (or blue text on orange) — low contrast.

---

## 10. Mobile Signature Patterns

The existing `art-direction.md` mobile spec is: "stack on mobile, thumb-reachable CTAs, 48px tap targets." This is the minimum. S-tier mobile has at least three bespoke mobile-only interactions.

### 10.1 The Three Mobile Signatures

**Signature 1: The Sticky Stat Bar (Impact page, mobile only)**
As the visitor scrolls through the Impact page's scroll-driven story, a thin bar pins to the bottom of the screen (in the thumb zone). It shows the current stat: "331 young people" with a small progress dot sequence showing which scene they're in. Tapping the bar scrolls to the top of the current scene. The bar dismisses when the visitor reaches the annual report download.

**Signature 2: The Swipeable Athlete Stack (Homepage + Impact, mobile only)**
On mobile, the athlete story cards are not a vertical stack — they are a full-screen swipeable carousel. Each card fills 90vw × 80vh. Swipe left to advance. The card has a snap behaviour — it resists, then snaps to the next. The stack has a small dot indicator at the bottom (not arrows, not a progress bar). On desktop, this becomes a horizontal scroll-snap (not a grid).

**Signature 3: The Thumb Session Picker (Athletics page, mobile only)**
The athletics session times are not a table on mobile. They are a thumb-driven picker: three large tap targets (Tuesday, Thursday, Saturday) at the bottom of the hero. Tapping a day reveals the session times for that day in a bottom sheet. The sheet dismisses with a downward swipe. This replaces the "two programme blocks" section on mobile — the session info is the interaction, not the content.

### 10.2 Mobile Layout Principles

- **Mobile is NOT a narrower desktop.** Every page has a mobile-specific layout decision. Not just "stack and shrink."
- **Full-bleed is the default on mobile.** Photography and stat numerals break to 100vw. Text is constrained to 88vw (6vw margins).
- **Bottom-zone CTAs.** Primary CTAs live at the bottom of each page section, in the thumb zone. Not at the top.
- **Bottom sheets, not modals.** All overlays slide up from the bottom, dismissable with a downward swipe. Never centred modals that require reaching the top of the screen.
- **Vertical rhythm differs.** Mobile sections need MORE breathing room than desktop, not less. A section that feels spacious at 1280px feels cramped at 375px. Mobile padding: `clamp(3rem, 10vw, 6rem)`.
- **Text length shortens on mobile.** Not the full desktop lead. A condensed mobile lead — the same voice, fewer words. This is content adaptation, not just layout adaptation.

### 10.3 Mobile Performance Budget

| Metric | Target | How |
|---|---|---|
| LCP | < 2.5s on 3G | Hero image: AVIF, responsive srcset, `loading="eager"` + `fetchpriority="high"`. Below-fold images: `loading="lazy"`. |
| JS bundle | < 30KB gzipped critical | Astro islands. Only the registration wizard and scroll sequences ship JS. Everything else is static HTML + CSS. |
| CSS | < 20KB gzipped | Tailwind purged. No animation libraries. CSS scroll-driven animations. |
| Fonts | < 80KB | Self-hosted, subset to Latin, two variable fonts (Fredoka + Inter), `font-display: swap`. |
| Total page weight | < 200KB initial | Above-fold only. Below-fold lazy-loaded. |

### 10.4 Anti-patterns

- Never disable pinch-to-zoom. Accessibility violation.
- Never use `hover`-only states on mobile. Always provide `:active` and `:focus-visible` equivalents.
- Never ship a hamburger menu that opens a full-screen overlay with a list of links. Use a slide-in drawer from the right, with the nav items as large tap targets.
- Never make the mobile hero shorter than the desktop hero. Mobile heroes should be 90vh — the athlete photo deserves the full screen.
- Never place primary CTAs at the top of a mobile section. Bottom of section, in the thumb zone.

---

## 11. Bespoke Components (Add to build-prd.md Component Inventory)

These components don't exist in the standard component vocabulary. They are the signature components that make the site unmistakably Track Academy's.

| Component | File | Props | Consumed by |
|---|---|---|---|
| `TrackEntranceHero.astro` | `sections/` | `image`, `headline`, `lead`, `ctaPrimary`, `ctaSecondary` | Homepage only |
| `DataHero.astro` | `sections/` | `number`, `label`, `scrollTarget` | Impact page |
| `ScrollStory.astro` | `sections/` | `scenes: {background, content, pin?}[]` | Impact, About founder |
| `NumeralsEscaping.astro` | `ui/` | `number`, `label`, `weight: 'light' \| 'bold'`, `size: 'inline' \| 'signature'` | All stat displays |
| `AthleteStack.astro` | `sections/` | `athletes: {photo, quote, attribution, context}[]` | Homepage, Impact |
| `PillarSequence.astro` | `sections/` | `pillars: {title, description, image}[]` | Homepage "What we do" |
| `BrentContext.astro` | `sections/` | `stats: {number, label}[]` | About page |
| `ThumbSessionPicker.astro` | `mobile/` | `sessions: {day, times, ages}[]` | Athletics page (mobile only) |
| `StickyStatBar.astro` | `mobile/` | `currentStat`, `totalScenes`, `currentIndex` | Impact page (mobile only) |
| `RegistrationSuccess.astro` | `forms/` | `coach: {name, photo, message}` | Register page (success state) |
| `DuotoneImage.astro` | `ui/` | `image`, `shadow: 'track-blue'`, `highlight: 'track-orange'` | All Type D heroes |
| `CountedNumeral.astro` | `ui/` | `target`, `scrollDriven: boolean`, `prefix?`, `suffix?` | Stats throughout |

### Remove from build-prd.md component inventory

These components are replaced by the bespoke ones above:

| Remove | Replace with |
|---|---|
| `StatBand.astro` (the blue band with count-up) | `NumeralsEscaping.astro` + `CountedNumeral.astro` (scroll-driven, column-escaping) |
| `CardGrid.astro` with `StoryCard.astro` (3-up quote cards) | `AthleteStack.astro` (swipeable full-bleed portraits) |
| `AudienceRouter.astro` (3-card "Who are you?") | Keep as a functional element but de-emphasise — move below the fold, use Pattern A (primary/secondary split) instead of 3 equal cards |
| `QuoteCard.astro` | `AthleteStack.astro` item (pull quote set into portrait, not a card) |

---

## 12. State Design (Empty, Loading, Success, Error)

Every state has personality. The 404 has a joke. Everything else should too.

### 12.1 Registration Success — The Welcome

This is the most important state in the entire site.

**Visual:**
- Full-bleed Track Blue background. Track grain texture.
- A coach's photo (square crop, `aspect-ratio: 1/1`, 120px) centred-top.
- A first-person message below the photo.

**Copy:**
```
[Coach photo]

See you Tuesday at 4pm.
Bring water and trainers.
Any questions? Text us on 07956 715052.

— Coach Beth
```

The coach name and photo are pulled from Sanity (the team member assigned to the session the child registered for). If no coach is assigned, the fallback is:

```
[Track Academy logo]

Registration received.
We'll see you at the next session.
Check your email for details.

— The Track Academy team
```

**Motion:**
- The coach photo scales in with `--ease-stretch` (slight overshoot). 600ms.
- The message lines fade in with stagger: line 1 at 300ms, line 2 at 400ms, line 3 at 500ms, signature at 600ms.

### 12.2 Event Empty State

When there are no upcoming events:

```
No events on the calendar right now.

The track doesn't stop though —
sessions run every Tuesday, Thursday, and Saturday.

[Find your session] → /athletics
```

Not "Check back soon." Not "Follow us on Instagram." A useful redirect with a warm voice.

### 12.3 Form Validation Errors

All form errors use the Track Academy voice. No "This field is required."

| Field | Generic error | Track Academy error |
|---|---|---|
| Name (empty) | "This field is required" | "We need your child's name to register them." |
| Email (invalid) | "Please enter a valid email" | "That email doesn't look right — can you check it?" |
| Phone (invalid) | "Please enter a valid phone number" | "We need a number we can reach you on." |
| Postcode (empty) | "This field is required" | "We need your postcode — we work in Brent and want to check you're nearby." |
| DOB (empty) | "This field is required" | "We need your child's date of birth to place them in the right group." |

### 12.4 Loading States

- Form submissions: button text changes to "Sending…" with a subtle Track Blue shimmer (not a spinner).
- Page transitions: body content fades to 80% opacity, 150ms. Never a full-screen loader.
- Image loading: `background-color: var(--grey-100)` (warm near-white) until the image loads. Never a skeleton screen with grey blocks.

### 12.5 Anti-patterns

- Never use "Oops!" or "Uh-oh!" in error copy.
- Never use full-screen loading spinners.
- Never use skeleton screens (grey block placeholders). Use solid background colours.
- Never use "Thank you for your submission." Speak like a human.
- Never show technical errors to the user (e.g., "Database connection failed"). Show "Something went wrong on our end. Try again, or call us on 07956 715052."

---

## 13. Voice Revisions

Three changes to `tone-of-voice.md`:

### 13.1 Kill "Changing lives since 2007"

This is the most-used charity headline construction in the English language. Replace with something that only Track Academy could say.

**Options to workshop (pick one):**

1. **"The track is open."** — Minimal, physical, inviting. Says "we're here, come run." Only Track Academy could say this — it's literally about the track.
2. **"Brent. Tuesdays. Thursdays. Saturdays. Since 2007."** — Brutal specificity. Names the place, the days, the years. No other charity could use this.
3. **"One track. Three hundred and thirty-one reasons to be on it."** — The stat IS the headline. Only works with the current impact data.
4. **"We stand at the track edge."** — The brand personification from `brand-guidelines.md` made into a headline. "A coach who stands at the track edge believing in kids who've been told they can't."

**Recommendation:** Option 1 ("The track is open.") for the homepage hero. Short enough to set into a photo's negative space. Physical enough to feel like Track Academy. Inviting enough to function as a CTA wrapper. The "since 2007" detail moves to the About page founder story.

### 13.2 Registration Success Voice

Add to `tone-of-voice.md`:

> When a parent completes registration, the confirmation page should feel like a text from a real person — not a system confirmation. Use the assigned coach's first name. Use first-person voice. Reference the next session day and time. Keep it under 40 words.

> Template: "See you [day] at [time]. Bring [item 1] and [item 2]. Any questions? Text us on [phone]. — Coach [name]"

> Never use "Thank you for registering." Never use "Your registration has been received." Never use "A member of our team will be in touch."

### 13.3 First-Person Coach Voice in UI

Add a section to `tone-of-voice.md`:

> Track Academy's voice is the voice of a coach. In key UI moments (registration success, first-session reminders, holiday programme confirmations), use first-person coach voice. The coach's name appears in the signature. The message references specific, physical details (the day, the time, what to bring). This is what makes Track Academy feel like a community, not a service.

> Used sparingly — only at emotional moments. Not in every CTA, not in every card, not in nav. The power is in the rarity.

---

## 14. Build Order — Revised

The `build-prd.md` Phase 1 (homepage) needs revision to accommodate the S-tier components:

### Phase 1 (Revised): Header, Footer & Homepage

| Step | What | Notes |
|---|---|---|
| 1a | Design tokens (revised — hue-tinted neutrals, named eases, stagger system, fluid type scale) | From this document, sections 4-5 and 9 |
| 2a | `DuotoneImage.astro` component | The brand signature on images — needed before any hero |
| 3a | `TrackEntranceHero.astro` (Type A) | Homepage hero — type into photo, not overlay |
| 4a | `PillarSequence.astro` | Homepage "What we do" — scroll-pinned pillar reveal |
| 5a | `NumeralsEscaping.astro` + `CountedNumeral.astro` | Homepage stat band — scroll-scrubbed, column-escaping |
| 6a | `AthleteStack.astro` | Homepage stories — swipeable full-bleed portraits |
| 7a | Remaining homepage sections (schools teaser, Instagram, get involved) | Use Pattern A (primary/secondary) for "get involved" instead of 3 equal cards |
| 8a | Client sign-off | Before proceeding to Phase 2 |

The homepage now has 3 signature moments (Track Entrance, 360 Story pillar sequence, scroll-scrubbed numerals) before client sign-off. If the client says "this looks too different from what we expected," that's the right conversation to have early.

---

## 15. Anti-Pattern Audit Checklist

Before any page ships, run this audit. If any item is "yes," the page is not S-tier.

- [ ] Is Inter the only font on the page? (Should see both Fredoka and Inter, with weight variation)
- [ ] Is there a `grid-cols-3` of equal-width cards? (Replace with asymmetric layout)
- [ ] Is every section the same padding? (Vary by importance)
- [ ] Is the only animation `fade-up`? (Should see scale, clip-path, slide, mask reveals)
- [ ] Is `ease-in-out` used anywhere? (Should see named eases)
- [ ] Is `transition-all` used? (Should specify properties)
- [ ] Is there a gradient overlay on every hero? (Should see 3+ hero types)
- [ ] Is orange text on white? (Fails WCAG AA)
- [ ] Is pure black used? (Should be hue-tinted --grey-900)
- [ ] Is the background pure white? (Should be --grey-50, warm near-white)
- [ ] Are stats in a "big number + small label" stacked format? (Should be escaping the column)
- [ ] Are stories in 3-up quote cards? (Should be AthleteStack)
- [ ] Is "Who are you?" a 3-card router at the top of the homepage? (Move below the fold, use primary/secondary split)
- [ ] Is the mobile layout just stacked desktop? (Should have at least one mobile-only interaction)
- [ ] Is "Changing lives since 2007" the hero headline? (Replace)
- [ ] Is `::selection` unstyled? (Should be Track Orange at 20%)
- [ ] Are there drop shadows on cards or buttons? (Depth from scale, not shadow)
- [ ] Is there a "Most popular" gradient badge on the middle pricing tier? (Remove)
- [ ] Does the registration success page say "Thank you for registering"? (Replace with coach voice)
- [ ] Are form errors "This field is required"? (Replace with Track Academy voice)

---

*This document is the ceiling. `art-direction.md` is the floor. Build between them — closer to the ceiling.*