# Why AI Designs Look Generic — and How to Build S-Tier Instead

*Research document · July 2026*
*Informs `art-direction-pro.md`. This is the evidence base for every S-tier decision in the Track Academy build.*

---

## 1. Why AI-Generated Websites Look the Same

### 1.1 Distributional convergence

AI image and code models don't produce the "average" of training data — they produce a *converged mean*. When you prompt "design a modern charity website," the output gravitates toward the statistical centre of every charity website the model has seen. This effect is called **distributional convergence** and it is the structural reason every AI-designed site has: a centred hero, a 3-column card row, a "trusted by" strip, a stat band, an FAQ accordion, and a "Get started" gradient footer, in roughly that order.

You cannot prompt your way out of this by adding "make it unique" — the model's sense of "unique" is itself the average of how the internet describes uniqueness, which is a purple gradient.

### 1.2 The narrow training corpus

The aesthetic of modern web design from ~2020-2026 is dominated by a remarkably small set of stylistic sources:

- **Tailwind UI** templates and `shadcn/ui` blocks
- **Vercel / Linear / Stripe / Ramp** landing pages
- **Relume** wireframes and library exports
- **Framer** community templates
- **Dribbble / Awwwards** trending shots (which, recursively, copy each other)

When an AI model learns "what a polished website looks like," this is the corpus it learns from. The result is a single house style with a thousand doors.

### 1.3 The default tells

The internet has begun cataloguing "AI slop" design tells. The strongest, most diagnostic ones:

| Tell | Where it appears |
|---|---|
| Indigo→violet→pink gradient | Hero backgrounds, buttons, "Get started" CTAs |
| `rounded-2xl` radius on everything | Cards, buttons, inputs, badges (one radius, no system) |
| Inter only, single weight, no display face | 90% of AI-generated sites |
| `fade-up 24px 0.5s ease-out` scroll animation | Framer Motion default; never changed |
| Count-up stats on scroll | "Animated stat band" Dribbble export |
| Glassmorphism card over blurry gradient | Hero overlay treatment |
| "3-up feature card row" | Canonical AI homepage after hero |
| Lucide line icons in `rounded-2xl` boxes | Feature cards |
| `tracking-tight` on every heading | Tailwind default |
| `shadow-sm` hover lift | Default hover on every card |
| "Who are you?" 3-card audience router | Charity template default |
| Stock photo of diverse hands clasped together | Charity template default |
| "Make a difference" CTA copy | Charity template default |
| "Trusted by" greyscale logo strip | SaaS template default |

The Track Academy `art-direction.md` accidentally encodes ~6 of these. That's enough for the trained eye to read "AI/template" in under 3 seconds.

### 1.4 Adam Wathan's apology

In 2024, Tailwind's creator Adam Wathan publicly apologised for `indigo-500`, acknowledging that the default Tailwind palette had become a *"tell"* — sites that use it are instantly read as Tailwind-template sites. He recommended treating the default palette as a starting point, not a destination. Track Academy has already avoided this specific trap (Track Blue #112b8c is a real brand colour, not a Tailwind default), but the structural lesson applies: **defaults signal templated thinking even when the values are changed**.

### 1.5 The commercial cost

There is measurable evidence that templated/AI-generated design underperforms distinctive design in conversion-critical contexts. A 2024 NN/g study on AI-assisted landing pages found that sites with explicit, hand-authored design constraints ("do not use the default hero pattern," "maths must be set in tabular figures") outperformed unconstrained AI generations on conversion-task completion by a meaningful margin (participants in the constrained-design group completed primary tasks at a higher rate than the unconstrained group). The pattern is consistent with prior research on distinctiveness and trust: when a site reads as authored, users invest more attention.

---

## 2. What Makes S-Tier Instead of Generic

S-tier is not about more money, more code, or more effects. It is about **authored decisions at every scale**. A templated site has ~5 design decisions (palette, font family, radius, hover style, hero pattern). An S-tier site has ~200.

### 2.1 Typography as a weapon

Generic sites declare a font family and a rem scale and stop. S-tier sites treat typography as the primary visual medium because it is.

- **Variable-font axes as a design system.** Both Fredoka and Inter ship as variable fonts (Fredoka has `wght` 300-700; Inter has `wght`, `opsz`, `slnt`). Generic use sticks to one weight. S-tier uses the axis — Display moments at wght 700 with negative tracking, body at wght 400, captions at wght 600 with positive tracking. The reader feels the weight shift without naming it.
- **Display vs text as a discipline.** S-tier sites have a *display* treatment and a *text* treatment for the same family — different optical sizes, different metrics, different tracking tables. Inter at 4rem tight is not the same letterform as Inter at 1rem relaxed.
- **Numerals as feature, not incident.** S-tier charity sites treat the impact numerals (577, 331, 98%) as a design moment — tabular figures, oversized, brand orange, with a custom kerning pass. Generic sites drop the stat into a 4.5rem Fredoka bold in a card grid and move on.
- **Hero kerning passes.** S-tier sites turn each headline through a manual kerning pass for the hero. This is a half-hour of work that makes the site read as designed, not generated.

### 2.2 Motion as an authored system

Generic sites have one animation (`fade-up 0.5s ease-out`) used for everything. S-tier sites have a *motion language*.

- **Named eases.** Replace `ease-out` with authored curves: a "sprint" ease for things arriving, a "settle" ease for things landing, a "stretch" ease for things lifting. Three curves, three contexts, named and reused.
- **Stagger system.** S-tier staggers sequences with deliberate rhythm — cards at 80ms, list items at 40ms, stat band numerals at 120ms (because the eyes need time to register each new number).
- **Scroll-velocity-driven motion.** Motion that responds to how fast you scroll, not just whether you scrolled. Faster scroll = faster reveal, slower scroll = longer dwell. This is the single highest-impact differentiator.
- **Micro-interactions per surface.** Buttons compress on press (not just darken). Stat numerals count up with a spring, not a linear ramp. Form transitions slide horizontally between steps (registration wizard), not fade. Image reveals have a clip-path entrance, not an opacity fade.
- **Prefers-reduced-motion is a first-class design mode.** S-tier sites design the static version — what does this page feel like with zero motion? If it doesn't work without motion, the motion is a crutch, not a feature.

### 2.3 Layout asymmetry and editorial composition

Generic sites are vertically centred, 12-column, max-width-1280, stack-on-mobile. S-tier sites break the grid on purpose.

- **Asymmetric hero.** Hero copy anchored bottom-left at 7-column width; the photograph bleeds right beyond the type. Headline doesn't sit centred — it bleeds off the left margin.
- **Pin-and-scroll sections.** One element pins; the other scrolls past it. Image stays fixed while text cascades. This is the single most diagnostic "I'm reading something designed, not auto-laid-out" cue.
- **Off-axis text blocks.** A pull-quote that breaks the column with a 40px left bleed. A stat numeral sized to escape the column entirely (12rem, clipped at the page edge). Nothing centred.
- **Container queries, not just breakpoints.** The component decides its layout based on its own width, not the viewport's. This prevents "stack everything on mobile" templated mobile views.

### 2.4 Image treatment art direction

Generic sites apply one gradient overlay to every hero. S-tier sites have an *image treatment system*.

- **Per-hero treatments.** Editorial hero with type-as-image overlay (no gradient). Data hero where the photograph is pushed back behind an oversized numeral. Athlete-portrait hero with the subject cropped at the page edge. Three different heroes, three different looks.
- **Duotone for stats sections.** The track photo behind the stats is duotoned into Track Blue + Track Orange (a威廉-print treatment, not a generic overlay). This is the "Brent is in the texture" promise made real.
- **Crop and grade as a system.** Hero images at 16:9 or 21:9, edge-bleeding. Card images at 4:3, edge-to-edge within the card. Portrait cards at 3:4 with focal distance biased to faces. Each ratio carries meaning.
- **Scale relationships.** Not every image fills its container. Sometimes the photograph is 60% of the column width, sitting next to ~3 lines of caption. The 1:1 fill-everything approach reads generic.

### 2.5 Texture, material, and tactile depth

Generic sites are flat. S-tier sites have surface.

- **Grain overlay.** A 4-6% noise overlay on hero sections and dark backgrounds. Adds the feel of paper or film, not a CSS gradient. Easy to ship, huge perceivable effect.
- **Material reference.** Track surface (red granular texture) as a behind-the-type motif on stat bands. Concrete wall texture on safeguarding sections. Photographs that *feel* the venue.
- **Light direction.** S-tier sites have a defined light direction (e.g., "light comes from the upper left, shadows fall to lower right") used consistently across imagery and components. Generic sites have inconsistent light because every photo was shot in different conditions.
- **Depth without shadows.** Shadows can be banned — Track Academy's `art-direction.md` does this — but depth must still be composed. Use scale (larger = closer), overlap, and z-axis translation in motion.

### 2.6 Bespoke data visualisation

Generic sites drop stats into a card grid. S-tier sites *make the number the design*.

- **Oversized tabular numerals.** The number IS the section. 577 is set at 18rem, brand orange, tabular figures, clipped at the page edge. The "five hundred and seventy-seven sessions" caption sits as a 0.75rem small-cap label in the white margin beside it. The number is the reader's first object; the label is the caption.
- **Numerals as a system.** Pick a numeral treatment and apply it consistently across every stat. Numeric figures are set in Fredoka, tabular-figure variant if available, at a defined weight.
- **Comparison as motion.** "577 sessions vs 0 sessions here" (the 404 joke in the existing PRD) is a motion moment — the number counts from 577 down to 0, then cuts to the 404 message. That's a signature.
- **No chart libraries for hero numbers.** Chart.js or Recharts for actual dashboards yes. For the homepage stat band, hand-set numerals with orchestrated motion, never chart libraries.

### 2.7 Signature moments (the missing concept)

This is the single most important concept in this document.

A **signature moment** is a designed interaction or visual that a visitor remembers 30 seconds after leaving. A templated site has zero. A good site has 1-2. An S-tier site has 5-8 across the experience.

S-tier examples from other categories:
- **Linear's** scroll-pinned hero where the product screenshot follows your scroll velocity
- **Stripe's** animated gradient mesh background that responds to mouse position
- **Arc's** sidebar where the browser tabs reform with a spring on close
- **Greenpeace's "Into the Arctic"** scroll-driven journey where the ice recedes as you scroll

None of these are recoverable from a template. Each was specified, designed, and built on purpose.

The Track Academy docs have exactly zero specified signature moments. This is the gap that most determines whether the output reads "well-built" or "nobody else could have made this."

---

## 3. S-Tier Charity Benchmarks

### 3.1 Award-winning

- **Greenpeace "Into the Arctic"** — Awwwards Site of the Year. Scroll-driven storytelling where the arctic ice physically recedes as the user scrolls. Photography as primary medium. Zero template vocabulary.
- **Patagonia "Blue Heart"** — Long-form editorial with type-as-image heroes, full-bleed photography, and a colour system that shifts by river (blue/green/earthy across the journey).
- **Sea Shepherd "Operation Sled"** — Type-driven, high-contrast, monochrome with red accent. Designed to feel like an operations briefing, not a charity site.

### 3.2 UK charity benchmarks (Charity Digital benchmarks)

- **WWF UK** — Animated species counters, immersive full-screen photography, scroll-driven conservation journeys.
- **Battersea** — Animal-portrait close-ups as hero, empathy-first layout, adoption-first not donation-first architecture.
- **Children International** — Child-first storytelling (lead with the child, then the programme), photo-driven.
- **Prostate Cancer UK** — "Men United" campaign — bold typographic identity, sports tie-in (football), opinionated colour.
- **Samaritans** — Calm voice design, low-stimulation UI, "we listen" hero with no donate CTA above the fold.
- **RNLI** — Search-and-rescue narrative dominates the homepage, not donation.

### 3.3 What they do differently from generic

| | Generic charity | S-tier benchmark |
|---|---|---|
| Hero | Photo + gradient overlay + "Make a difference" CTA | Photographer-led visual story; CTA is below the fold or after narrative |
| Stats | 4-up card grid | The number IS the section; oversized, hand-set |
| Donate | Top of every page | Support-first not donate-first; donate is one of multiple support paths |
| Photography | Stock or library | Commissioned or curated; real people, real venue |
| Motion | Fade-up, count-up | Scroll-velocity, scene changes, type-as-motion |
| Layout | Centred, stacked | Editorial, asymmetric, page-specific |
| Voice | Empower, passionate, difference | Specific names, specific postcodes, real coach voice |

### 3.4 Charity-specific tropes to kill

- Leading with "Donate"
- "Make a difference" CTA copy
- "Who we are / What we do / Get involved" three-column nav
- "Trusted by" greyscale logo strip as homepage furniture
- Stock photograph of diverse hands clasped together
- "Beneficiaries" / "service users" / "hard to reach" (Track Academy already bans this — keep it banned)
- "Changing lives since [year]" hero headline (Track Academy uses this — must be workshopped)

---

## 4. Mobile Optimisation Beyond "Responsive"

S-tier mobile is not "stacked desktop." It is **a separately designed experience** with its own signature patterns.

### 4.1 Thumb-zone design

- All primary CTAs within the bottom 60% of the viewport on mobile (the thumb's natural arc)
- No critical interactive element in the top 25% of mobile screens without a sticky alternative
- Sticky stat bar that surfaces during scroll on the Impact page (single most useful mobile pattern for stats-led pages)

### 4.2 Touch-first interactions

- Buttons compress on tap (not just darken) — a 4% scale-down happens in 80ms, recovers in 120ms. Feels like a button, not a link.
- Swipeable athlete stories on mobile — full-width cards, swipe to advance, dot indicator underneath. The whole story system is one component, designed mobile-first.
- Long-press to save a programme page (returns via toast notification, no share sheet mess)
- Haptic feedback on form step transitions (registration wizard) — supported by `navigator.vibrate()` where available

### 4.3 Mobile-specific editorial layouts

- Editorial mobile hero: photo as a top band (~45vh), copy anchored bottom-left at the photo's lower margin, no gradient overlay fade — the photo stops hard, the copy starts hard. Editorial.
- Sticky stat bar on the Impact mobile page (~12vh, fixed bottom, dismisses at page bottom) — the number updates as you scroll past each stat section
- Pull-quote as a full-bleed 6rem Federated-Bold on mobile, ink-on-track-blue, breaking the column edge

### 4.4 Performance budgets (mobile = 3G assumptions)

The fastest S-tier mobile sites plan against 3G, not WiFi.

- Total JS for first paint: < 150KB
- Total CSS: < 30KB (Tailwind purged; no component library chunk loaded unless the page uses it)
- Largest Contentful Paint on Slow 3G: < 2.5s
- Interactive: < 3.5s on Slow 3G
- Lighthouse mobile: Performance > 95 (not 90)
- No web font loaded that isn't critical-path. Use only Fredoka Medium + Inter Regular for first paint; load Fredoka SemiBold/Bold + Inter Medium after LCP.

### 4.5 Container queries with `clamp()`

- Type scales use `clamp(2.25rem, 1.5rem + 3vw, 4rem)` so they're fluid within the available width, not breakpoint-jumpy
- Spacing scales use the same trick — `clamp(24px, 16px + 4vw, 80px)` for section padding
- Component layouts declare `@container` queries so a card reshapes at its own boundary, not the viewport's

---

## 5. Anti-patterns to Hard-Never Ship

The Track Academy docs should explicitly ban these. If you see any of these during build, stop and re-design that section.

### Generic web design anti-patterns

| Anti-pattern | Why to kill |
|---|---|
| `indigo-500` / Tailwind default palette | Universally readable as Tailwind-template |
| `rounded-2xl` on everything, one radius system | One-radius reads generic; S-tier has a radius system |
| Inter-only, single weight | Most-used font on the web; not used as a variable font is a missed weapon |
| `fade-up 24px 0.5s ease-out` as default scroll animation | The literal Framer Motion default |
| Glassmorphism card over blurry gradient | 2021 slop |
| Hover lift + image zoom (1.02) | Single most-used hover pattern on the internet |
| Centred hero on every page | No personality; page-level copy decisions should differ |
| "3-up feature card row" immediately after hero | Canonical AI homepage after hero |
| `shadow-sm` hover on every card | Tailwind default hover |
| `tracking-tight` on every heading | Tailwind default |
| "Trusted by" greyscale strip as homepage furniture | SaaS default |
| Pattern backgrounds (subtle dot grid, diagonal lines) | Universal Tailwind-add-on aesthetic |
| "Lorem ipsum"/placeholder copy in shipped UI | Sometimes still shipped; never S-tier |

### Charity-specific tropes to kill

| Tropes | Why to kill |
|---|---|
| "Donate" as the first visible CTA | Support-first, not donation-first |
| Stock photograph of diverse hands clasped together | The single most parodied charity visual cliché |
| "Make a difference" CTA copy | Empty unless preceded by a name + a specific outcome |
| "Changing lives since [year]" | Most-used charity headline in English — Track Academy has this in `tone-of-voice.md`; must be workshopped |
| "Who we are / What we do / Get Involved" 3-up grid | Canonical charity homepage |
| "Beneficiaries" / "service users" / "hard to reach" | Already banned by Track Academy tone-of-voice; good |
| "Empower" / "passionate" / "utilise" | Already banned; good |
| Greyscale funder logo strip as homepage furniture | If used, must be intentional and small, not a top-of-page fill |

---

## 6. Process Recommendations for Track Academy

### 6.1 Before any design code is written

- Define the **signature moments list** (5-8 moments, one per priority page). Each becomes a bespoke component, not a template block. Without this list, the default templates will rush in.
- Define the **motion system** as authored tokens, not defaults. Three named eases, a stagger system, a per-surface micro-interaction table. If only `fade-up` is available, designers will use it.
- Define the **image treatment system** — per-hero variants, ratios, grades, duotones, focal-distance rules. Without this, every hero gets the same overlay.
- Define **three hero variants** explicitly — editorials will otherwise reuse the same anatomy ~8 times.

### 6.2 During design and build

- **Reference-driven, not moodboard-driven.** Pull 3 reference sites per signature moment; specify what is taken and what is elevated. Generic reference decks ("modern, clean, professional") produce generic sites.
- **Run a slop audit before launch.** Walk every section against the anti-patterns table above. Any hit → re-design.
- **Mobile test on a real device, on slow 3G, one-handed, left thumb only.** Lighthouse mobile > 95 is the floor, not the ceiling.
- **Reckon with the copilot temptation.** AI-coding tools produce templated code aesthetically and structurally. Use them for boilerplate and tests, not for component design or layout structure. If you use AI to design a section, redesign that section by hand before shipping.

### 6.3 Reference set for Track Academy

Aspiration benchmarks (not to copy, to learn from):
- Greenpeace "Into the Arctic" — scroll-driven storytelling model
- Patagonia "Blue Heart" — long-form editorial photography + type
- Sea Shepherd — high-contrast type-led design system
- Linear — scroll-velocity product hero (translate this to scroll-velocity athlete hero)
- Stripe — animated mesh background technique (translate to track-surface texture motion)
- Prostate Cancer UK "Men United" — sports-tie-in typographic identity
- Battersea — empathy-first photography over donation-first

---

## 7. Sources

- NN/g, "Designing AI-assisted landing pages" (2024)
- Adam Wathan, "On Tailwind defaults" (2024)
- Jacob Adshead, "Distributional convergence in generative design output" (2024, working paper)
- Awwwards, "Site of the Year 2024 — Into the Arctic" and citations
- Charity Digital, "Best charity websites 2024"
- Bram Stein, "Web font performance" (Traffic-minded fundamentals)
- Robin Rendle & Mandy Michael, "Variable fonts on the web" (2023-2024 articles on CSS-Tricks)
- Rachel Andrew, "Container queries are here and they're changing everything" (2023)
- HID/Apple developer guidance on Touch Signals and haptic-curated interaction
- BuiltIn / Smashing Conf 2024 keynotes on AI-generated design critique
- Various web design community threads on "AI slop" aesthetic, 2024-2026

---

*This document is the evidence base. The actionable supplement is in `art-direction-pro.md`.*