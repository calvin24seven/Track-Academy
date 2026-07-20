# Research: AI-Generated Web Design vs S-Tier Custom Design

## Informing an S-tier website build for Track Academy (Brent, London)

Compiled from recent articles, design critiques, and analysis (2024–2026).

---

## 1. WHY AI-Generated Websites Look the Same

### 1.1 The Root Cause: Distributional Convergence

The single most important concept: **AI models are prediction engines, not designers.** When you prompt an LLM to "build a landing page" without specific constraints, you are not getting design — you are getting **the statistical average of every website in the training corpus.**

> "It's not a bug in your prompt. It's **distributional convergence** — a statistical phenomenon baked into how language models work, turning infinite creative possibilities into a narrow corridor of sameness." 
> — David Min, "Why Do AI-Generated Websites All Look Identical?" (Medium, Nov 2025)
> Source: https://medium.com/@dminhk/why-do-ai-generated-websites-all-look-identical-02a68015613d

### 1.2 The Training Data Problem — What Sites AI Learns From

The corpus is shockingly narrow. Multiple sources confirm the same finding:

> "Every AI was trained on the same Tailwind defaults, shadcn templates, and Vercel-aesthetic landing pages. Same input, same output."
> — Rottoways, "Why your AI generated website looks like every other AI generated website" (May 2026)
> Source: https://rottoways.com/blog/ai-generated-website-looks-generic

The training data is roughly:
- **Tailwind CSS documentation examples** (Adam Wathan, Tailwind's creator, publicly apologized in August 2025 for making every button `bg-indigo-500`, which caused "every AI-generated interface on Earth to turn purple" — the tweet got over 1 million views)
- **shadcn/ui component library** templates
- **The top 200 templates on Vercel**
- **Public landing pages of YC-backed startups from 2022–2024**
- **A long tail of design systems that all reference the same canonical patterns**

This creates a **feedback loop of mediocrity**: the most popular design trends get over-represented in training datasets because they're everywhere online. AI tools learn these patterns as "correct" design and reproduce variations of them endlessly.

Source: https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website
Source: https://www.vandelaydesign.com/why-ai-generated-designs-look-the-same/

### 1.3 The Default Tailwind / Component Library Aesthetic

This is the most deep-rooted issue. The **entire visual language of AI-generated sites is inherited from Tailwind defaults**:

- **Colors:** `blue-600` (#2563EB) appears in ~34% of AI-generated sites. `indigo-500/600` in ~22%. When AI does gradients, they run blue-to-purple in 41% of cases that use one.
- **Fonts:** Inter appears in 47% of AI-generated sites. When not Inter, it's Roboto (the Android system font) or Poppins (for "friendly").
- **Corner radius:** `rounded-2xl` (1rem) on everything — every container, card, button.
- **Spacing:** `py-20` or `py-24` on every section, mechanically metronomic.
- **Container:** `max-w-7xl mx-auto` — every site is the same width.
- **Grid:** `grid-cols-3` for features, pricing, testimonials — always three equal columns.
- **Animation:** fade-up on scroll — "the only entrance AI knows."
- **Navigation:** sticky nav with `backdrop-blur-md` — "novel in 2023, a signature by 2026."

Sources:
- Sailop "AI Slop Encyclopedia" (March 2026): https://www.sailop.com/blog/ai-slop-encyclopedia
- axe-web "Why AI Websites All Look the Same" (Dec 2025): https://axe-web.com/insights/ai-website-design-sameness/

### 1.4 The Lack of Brand Personality Distinction

> "It fails the 'Know' test because it doesn't look like *you* — it looks like a template anyone could have bought for $10. It fails the 'Like' test because it looks like *everyone else*, lacking the unique personality or emotional hook that connects with users. Finally, and most critically, it fails the 'Trust' test. When a prospect lands on your site and sees the exact same layout they saw on five other sites this week, it signals 'Low Effort.' If they didn't invest in a unique website, did they invest in a unique product?"
> — axe-web, "Why AI Websites All Look the Same"
> Source: https://axe-web.com/insights/ai-website-design-sameness/

Generic AI sites lack:
- Visual hierarchy beyond "bigger text = header"
- Thoughtful white space usage as a design element
- Color theory (complementary, analogous, triadic relationships)
- Typography pairings (mixing serif and sans-serif with intention)
- Personality or brand voice
- Any unique emotional hook

### 1.5 The "AI Slop" Aesthetic — The Specific Tells

The term "AI slop" (also "slop aesthetic") emerged in early 2025 in design communities and is now standard terminology. By 2026, tools like Sailop scan AI-generated sites and score them 0–100 on "slop-ness" across 7 dimensions, cataloging **87 specific patterns**.

**The 5 most visible tells** (from Rottoways, May 2026):
1. **The purple gradient hero** — gradient from violet to indigo, sometimes via pink or cyan. Text centered and white. Stripe popularized the conic-gradient aesthetic in 2021; Vercel spread it; every Tailwind template has three examples.
2. **Three identical feature cards in a row** — equal width, icon + heading + paragraph. The lowest-risk way to fill a feature section.
3. **Inter typography at weight 700** — display headlines always Inter 700 with `letter-spacing: -0.02em`. "It looks designerly. It looks like every other AI-built site."
4. **Centered everything** — hero, subhead, button, features, testimonials. "The visual equivalent of every sentence ending in a question mark."
5. **The "Most popular" gradient pricing badge** — purple-to-pink pill above the middle pricing tier. "The most visible single tell."

Source: https://rottoways.com/blog/ai-generated-website-looks-generic

**The fuller anatomy of "AI slop"** (from Sailop's 87 patterns, March 2026):
- Overly perfect gradients with no character
- Color palettes pulled from the same 5 trending combinations
- Pure black text (`#000000`) on pure white (`bg-white`) — harsh, eye-straining
- Slate palette domination — every gray from one Tailwind scale
- Single accent color for buttons, links, highlights, icons (no secondary)
- Hardcoded hex values (no CSS custom properties, no theming)
- No `::selection` styling (one rule that signals intentional design)
- Animations always `duration-300` with `ease-in-out` — robotic
- `transition-all` on everything (animates layout-triggering properties)
- No `prefers-reduced-motion` support — an accessibility failure
- No `:active` feedback (hover styled, pressed state ignored)
- Terminal mockup with three colored dots (red/yellow/green) — appears in 61% of AI dev-tool sites
- Stats row of unverifiable big numbers
- "Built with [heart] in San Francisco" footers
- "Get Started" as primary CTA (38% of AI sites) — runners-up: "Start Free Trial," "Try for Free"

Source: https://www.sailop.com/blog/ai-slop-encyclopedia

### 1.6 The "Aggressively Mediocre" Problem

A Reddit formulation quoted across multiple sources:
> "Every AI model seems to converge on the same aggressively-mediocre design when asked."

"Aggressively-mediocre" is exact. The output isn't *broken*. It's *indistinguishable*. It's the design equivalent of stock photography: technically competent, instantly forgettable. The moment you see it, you know what made it.

This slop has a **commercial cost**. From the AI Agent Skills blog (December 2024):
- AI-generated landing page: 2,847 visitors, 23 signups, 0.8% conversion rate.
- Industry average: 2–5%. Good landing pages: 10%+.
- After applying design-skill constraints with the same copy: 4.7% conversion — a ~6x improvement.

Source: https://www.aiagentskills.ai/blog/ai-websites-all-look-the-same

Sailop's own A/B data (March 2026): sites scoring Grade D or worse converted 23% lower than sites scoring Grade B or better, controlling for copy and offer.

### 1.7 Why Switching Tools Doesn't Help

> "Lovable, Cursor, Claude Code, v0, and Bolt all produce variations of the same five patterns, because they all learned design from variations of the same training corpus. You can change the prompt, change the model, change the platform, and you'll get a different shade of the same page."
> — Rottoways
> Source: https://rottoways.com/blog/ai-generated-website-looks-generic

The fix is **not** at the prompt level. It's at the **design-system level** — you need to give the model a different corpus or constraints that force it off the median.

---

## 2. What Makes a Website Look CUSTOM and S-TIER vs Generic/Templated

### 2.1 Typography as Differentiation

This is the single highest-leverage move. Typography is the second-most-visible dimension (after color) and one where AI is remarkably predictable.

**S-tier typography principles:**
- **Never use** Inter, Roboto, Poppins, Open Sans, Lato, or system fonts as your only face. They signal "I did not choose a font."
- **Pair a display face with a text face.** A serif heading over a sans body, or a geometric heading over a humanist body, creates contrast a single font cannot.
- **Use extremes of weight and size.** Weight 100/200 vs 800/900, not 400 vs 600. Size jumps of 3x+, not 1.5x. AI uses only `font-normal` and `font-bold` — the entire professional range is 300, 400, 500, 600, 700 at minimum (headings at 600, body at 400, captions at 300).
- **Adjust tracking per size.** Tighter on large headings (`-0.02em`), looser on small caps/uppercase (`+0.05em`). AI never touches tracking.
- **Use italics as variation** — for titles, emphasis, pull quotes. AI never uses italic.
- **Use variable fonts** — continuous weight and width from a single file, smaller payload than three static weights.
- **Add `text-wrap: balance`** to headings (kills awkward short last lines) and `text-wrap: pretty` to body. One-line fixes AI never generates.
- **Define a custom type scale** on a different ratio (1.2 or 1.333), not Tailwind's default 1.25.

From Anthropic's own cookbook (quoted in prg.sh):
> "Typography instantly signals quality. Avoid using boring, generic fonts.
> **Impact choices:** Code: JetBrains Mono, Fira Code, Space Grotesk. Editorial: Playfair Display, Crimson Pro, Fraunces. Startup: Clash Display, Satoshi, Cabinet Grotesk. Technical: IBM Plex family, Source Sans 3. Distinctive: Bricolage Grotesque, Obviously, Newsreader.
> **Pairing principle:** High contrast = interesting. Display + monospace, serif + geometric sans, variable font across weights."

Source: https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website

### 2.2 Motion and Micro-interactions That Feel Intentional

Motion is where slop becomes physically recognizable — the same motion patterns create a feel users register before they can name it.

**S-tier motion principles:**
- **One well-orchestrated page load beats scattered micro-interactions.** Use staggered reveals with `animation-delay` rather than fading up every element independently.
- **Vary entrances.** Fade with no movement, scale from 0.95, slide from the side, clip-path reveals — not just fade-up every time.
- **Scale duration with visual size.** Small elements like buttons: 150ms. Large page sections: 500ms. Never a uniform 300ms.
- **Use real easing curves.** `cubic-bezier(0.16, 1, 0.3, 1)` for fast start and gentle settle. Different easings for enter vs exit. Never just `ease-in-out` everywhere.
- **Write custom `@keyframes`.** Brand-specific motion — a "subtle float" or a "gentle breathe" — gives you a motion language that is unmistakably yours.
- **Jittered/exponential stagger delays**, not linear (0ms, 100ms, 200ms, 300ms cascades mechanically).
- **Always provide `:active` feedback** — `transform: scale(0.98)` on press makes buttons feel alive. AI styles hover but never active.
- **Add hover states to cards** — subtle shadow change, lift, border-color shift.
- **Honor `prefers-reduced-motion`** — an accessibility requirement, not optional:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- **Use scroll-driven animations** (CSS scroll-driven animations are well-supported in 2026) — progress bars that fill as you scroll, pure-CSS parallax. Zero JS, instantly separates a site from AI output.

Source: https://www.sailop.com/blog/ai-slop-encyclopedia

### 2.3 Layout Asymmetry and Grid-Breaking

**S-tier layout principles:**
- **Kill `grid-cols-3` everywhere.** Replace three identical cards with: a primary feature taking 60% of the width and two secondary features sharing 40%; vertical stacks with alternating image alignment; a single hero feature with a tabbed interface.
- **Use asymmetric grids.** `2fr 1fr`, `3fr 2fr`, `1fr min-content` — never just `1fr 1fr`.
- **Break `max-w-7xl`.** Try `max-w-5xl` for tighter content, or break the container for full-bleed sections.
- **Vary section padding.** `py-12` for tight sections, `py-32` for spacious ones — scaled to importance. AI uses `py-20` on every section identically.
- **Let elements off-grid.** A testimonial that straddles two sections, an image that bleeds past the content column. Real design occasionally breaks the strict grid.
- **Use CSS Grid with named template areas** — readable, flexible, distinctive.
- **Use container queries**, not just viewport media queries — components respond to their container's size, making them genuinely reusable.
- **Use `clamp()` for fluid spacing** that scales between viewports, instead of fixed breakpoints that jump:
  ```css
  section { padding-block: clamp(2rem, 5vw, 5rem); }
  ```
- **Try CSS columns** (`column-count: 2`) for text-heavy content — newspaper-style flowing columns, hard to mistake for AI output.
- **Use subgrid** so nested elements align to the parent grid.

Source: https://www.sailop.com/blog/ai-slop-encyclopedia
Source: https://rottoways.com/blog/ai-generated-website-looks-generic

### 2.4 Color Confidence

**S-tier color principles:**
- **Pick colors that don't land on default Tailwind swatches.** Use HSL with an odd lightness like `hsl(217 71% 48%)` instead of the exact `blue-600` hex.
- **Have a primary, secondary, AND tertiary.** A complementary or split-complementary creates richness. AI uses one accent for everything.
- **Color budget.** Pick three accent colors maximum, let each appear at most three times on the page (nine total accent moments). Most AI sites use 4–6 accents that each appear 6–10 times — "a slot machine."
- **Add hue to neutrals.** Good palettes have neutrals that carry 3–5% of the primary hue. AI neutrals are pure grays at zero saturation — no cohesion.
- **Never use pure black** (`#000000`) on pure white. Use dark gray with a faint hue tint like `#1a1a2e` or `hsl(240 10% 10%)`. Pure black/white is harsh and causes eye strain.
- **Use off-white backgrounds.** `#fafaf8` for warm, `#f8f9fb` for cool. The shift is small but it changes the whole feel.
- **Mix gray families** — a warm gray for text, a cool gray for borders — rather than one Tailwind slate scale for everything.
- **Define colors as CSS custom properties** in `:root` — no theming, no dark mode, no easy palette swap without it.
- **Style `::selection`** — one rule, immediate signal of intentional design:
  ```css
  ::selection {
    background-color: hsl(217 71% 48% / 0.2);
    color: hsl(217 71% 20%);
  }
  ```
- **Use unexpected gradient pairs** — amber to rose, teal to lime, or single-hue gradients that shift in lightness only. Never blue-to-purple.
- **Use gradient directions beyond `to-r`.** Radial, conic, `135deg`, `200deg`, mesh gradients.

Source: https://www.sailop.com/blog/ai-slop-encyclopedia

### 2.5 Material, Texture, and Depth

- **Add atmosphere to backgrounds** — layer CSS gradients, geometric patterns, contextual effects that match the aesthetic. Never default to pure solid colors.
- **Use noise textures** at 4–6% opacity, solid dark backgrounds with a single warm radial accent in a corner, static images with heavy vignettes.
- **Vary border radius by context** — `rounded-md` for buttons, `rounded-xl` for cards, `rounded-3xl` for hero images, none for full-bleed sections. Mixing sharp and rounded corners creates contrast.
- **Use layered shadows**, not generic `shadow-lg`. A tuned `shadow-[0_20px_50px_rgba(139,92,246,0.3)]` creates depth a utility class cannot.
- **Add a subtle inner shadow and soft outer glow** to buttons. A button should be a button, not an event.

Source: https://www.monet.design/blog/posts/ai-design-pro-strategies-avoid-slop
Source: https://www.sailop.com/blog/ai-slop-encyclopedia

### 2.6 Photography Treatment (Not Just "Hero Image with Overlay")

**Editorial design principles applied to web:**
- Treat photography as editorial — full-bleed images that bleed past content columns, asymmetric crops, duotone treatments tied to brand palette.
- Use real photography of real people (athletes, coaches, community members), not stock-photo-esque illustration styles.
- Layer text into images with intent — not a dark overlay with white text centered, but type set into negative space of the image.
- Use image-driven section breaks where the image becomes the section transition.
- Treat motion within photography: subtle parallax on hero images, Ken Burns effects on full-bleed feature images, image reveal masks on scroll.

### 2.7 Editorial Design Principles Applied to Web

- **Asymmetric, magazine-style layouts** with deliberate use of negative space — "Japanese print design: asymmetric, plenty of negative space."
- **Hierarchy through scale contrast** — big jumps (3x+ between heading and body), not the timid 1.5x AI defaults.
- **Pull quotes, drop caps, editorial components** that borrow from print.
- **Vary section rhythm** — a tight info-dense section followed by a spacious image-driven one. Not the metronomic same-padding-every-section.
- **Counterweight composition** — a large element on one side balanced by a small, dense element on the other.
- **Use CSS columns** for flowing text where appropriate — a layout that reads as editorial, not templated.

---

## 3. S-Tier Sports Charity / Non-Profit Website Benchmarks

### 3.1 Award-Winning Non-Profit Websites (Awwwards Collection)

Awwwards maintains a curated "NonProfit Websites" collection of 36 sites. Notable benchmarks:

- **Patagonia: Blue Heart" (blueheart.patagonia.com)** — by Upperquad. "Dams are dirty collage scroll." Scroll-driven storytelling using collage, full-bleed photography, and editorial layout. Awarded for its scroll-journey narrative approach.
  Source: https://www.awwwards.com/awwwards/collections/nonprofit-websites/

- **Sea Shepherd: No Fishing Net" (no-fishing.net)** — by makemepulse. Interactive take-action design with WebGL-driven ocean visuals. Awarded for innovation in cause-driven interaction design.

- **Searching for Syria" (searchingforsyria.org)** — by Google Brand Studio. Narrative-driven, scroll-driven journey with photography and editorial layout. A benchmark for how a non-profit/cause site can use scroll-driven storytelling.

- **Into the Arctic - Greenpeace" (hellomonday.net/archive/greenpeace/intothearctic/)** — by Hello Monday. **Awwwards Site of the Year 2013.** Immersive scroll-driven narrative with full-bleed photography, atmospheric depth, and motion tied to scroll position. Still referenced as a benchmark for cause-driven immersive design.

- **Give a Hand" (giveahand.ai)** — by Hello Monday. 3D hand-tracking dataset visualization for a non-profit cause.

- **Return to Hope" (returntohope.com)** — by boondoggle. **Awwwards Site of the Day (Sep 2014).** Hope-driven narrative site.

- **RadiatingHope" (radiatinghope.org)** — by Won Agency. Honorable Mention, March 2025. A recent 2025 award in this category.

Source: https://www.awwwards.com/awwwards/collections/nonprofit-websites/
Source: https://www.webdesignawards.io/winners/2025/nonprofit (Web Design Awards 2025 non-profit winners)

### 3.2 UK Charity Benchmarks (Charity Digital's "Ten of the Best")

Source: https://charitydigital.org.uk/topics/ten-of-the-best-charity-and-non-profit-websites1-6147 (July 2025)

- **WWF (worldwildlife.org)** — "Outstanding photography." Uses stunning wildlife images to enthuse visitors and educate them about campaigns. Photography as the primary brand asset, not templated feature cards.

- **Battersea (battersea.org.uk)** — "Simplicity." Prominent orange "Rehome" and "Donate" buttons. Everything else is about the animals: profiles of pets "waiting to be loved." Focused, purposeful, not feature-card-driven.

- **Children International (children.org)** — "Razor-sharp focus." One key proposition — sponsoring a child in need — with a search facility to find a child in seconds. Conversion-focused design.

- **Prostate Cancer UK (prostatecanceruk.org)** — Online community forum + chat with specialist nurses. Support-first design, not donation-first.

- **MS Society (mssociety.org.uk)** — Community feedback-driven: a panel of 150 people with MS helped shape the site, and 1,000+ provided feedback during development.

- **Samaritans (samaritans.org)** — Effective brand refresh targeting a wider, younger audience. Accessible, easy to navigate, with the key message "We're waiting for your call."

- **RNLI (rnli.org)** — Up-to-the-minute updates on the four most recent lifeboat launches. Real-time impact data as the emotional driver.

- **Parkinson's UK (parkinsons.org.uk)** — Powerful donation journeys that drove significant growth in digital-led income. Improved donation UX with wider payment options.

### 3.3 What S-Tier Charity Sites Do Differently

Synthesizing the benchmarks, the patterns that separate S-tier charity sites from generic ones:

1. **Storytelling over feature lists.** S-tier sites like *Into the Arctic*, *Searching for Syria*, and *Blue Heart* use scroll-driven narrative — each scroll advances a chapter — instead of the generic hero/features/pricing template.

2. **Photography as the primary medium, not a stock hero image with overlay.** WWF, Battersea, and the Greenpeace sites let real images drive the layout.

3. **Real-time impact data** (RNLI's latest launches) creates urgency and authenticity — not a static "10,000+ served" stat.

4. **Community co-design** (MS Society's panel of 150) — the site serves the actual community, not a generic donor persona.

5. **Focused, single-proposition design** (Children International's sponsorship search). S-tier charity sites resist the urge to include every program; they lead with one.

6. **Support-first, donation-second** (Prostate Cancer UK, Samaritans). Generic charity sites lead with a donate button; S-tier ones lead with the help.

7. **Bold, simple, purposeful color** (Battersea's orange "Rehome"/"Donate" buttons). Not purple gradients — a committed, confident, single accent.

8. **Brand refresh as design opportunity** (Samaritans). S-tier sites treat the redesign as a chance to reach new audiences, not just refresh the template.

---

## 4. Mobile Optimisation at S-Tier Level (Beyond "Responsive")

> "Mobile-first" in 2026 means more than stacked columns and a hamburger menu. S-tier mobile is touch-first, gesture-aware, performance-budgeted, and thumb-zone-designed.

### 4.1 Thumb-Zone Design

- **Primary actions in the thumb zone.** The bottom third of the screen (especially the bottom-right for right-handed users) is where the thumb naturally rests. Navigation, CTAs, and key interactions should live there.
- **Bottom-sheet patterns** over modals on mobile — they're more ergonomic, dismissable with a downward swipe, and don't require reaching the top of the screen.
- **Avoid top-of-screen primary actions.** Reaching the top of a phone screen with one hand is awkward on phones over 5.5". Tab bars, action bars, and floating action buttons belong at the bottom.
- **Hit targets minimum 44x44px** (Apple HIG) / 48x48dp (Google Material). AI-generated sites frequently ship sub-44px tap targets.
- **Test one-handed.** S-tier mobile design is validated with the phone held in one hand, thumb-only, while walking.

### 4.2 Touch-First Interactions

- **Touch-first hover states.** On mobile, `:hover` doesn't exist — design tap feedback via `:active` and `:focus-visible`. AI frequently ships hover-only states.
- **Swipe gestures** — carousel/swipeable sections, swipe-to-reveal actions, swipe-to-dismiss. Use vanilla touch events or a small library.
- **Pinch-to-zoom** on maps and photography — preserve native mobile behaviors rather than disabling them.
- **Pull-to-refresh** patterns for live content (e.g., RNLI's latest launches).
- **Long-press for contextual actions** — a mobile-native pattern AI-generated sites almost never implement.
- **Haptic feedback** (where supported) on key actions — a subtle vibration on donation confirmation or form submission.

### 4.3 Gesture-Based Navigation

- **Horizontal swipe** between sections/stories — particularly powerful for a charity tellings sequential stories (athlete journeys, program impact, community stories).
- **Swipeable case studies / athlete profiles** instead of a 3-column testimonial grid.
- **Drag-to-reveal** details — e.g., "drag to see the impact of your donation" — an interactive, touch-native metaphor.
- **Avoid hover-driven navigation menus** that break on touch devices. Use tap-to-open accordions and drawer navigation instead.

### 4.4 Mobile-Specific Layouts (Not Just Stacked Desktop)

- **Mobile is not a narrower desktop.** S-tier mobile layouts are designed independently, not just all `flex-col`.
- **Vertical rhythm and section pacing differ on mobile.** What reads as spacious on desktop feels cramped on a phone. Mobile sections often need MORE breathing room, not less.
- **Use full-bleed sections** on mobile — break out of the container, use the full width for photography and impact moments, then constrain text to a comfortable reading width.
- **Editorial mobile layouts** — magazine-style flowing text, pull quotes, alternating left/right image alignment — not the generic top-to-bottom card stack.
- **Sticky bottom CTAs** that stay in the thumb zone as the user scrolls, with a subtle dismiss affordance.
- **Progressive disclosure** — reveal details as the user scrolls/swipes, rather than dumping every program onto one mobile page.
- **Mobile-first performance budget** (see below) — every mobile layout decision should be paired with a performance decision.

### 4.5 Performance Budgets for Mobile

- **LCP < 2.5s on 3G.** S-tier mobile sites are tested on a throttled 3G connection, not just WiFi.
- **First Input Delay < 100ms.** AI-generated code often ships large JS bundles (animation libraries, framework overhead). S-tier mobile ships minimal JS.
- **Budget: < 170KB JS Critical.** The baseline today. The rest loads as the user engages.
- **Self-host fonts** with `font-display: swap` and a fallback font stack — prevents FOIT (Flash of Invisible Text). AI omits `font-display: swap`.
- **Use CSS-only animations** and scroll-driven animations (well-supported in 2026) instead of JS animation libraries. Zero JS, instant, accessible.
- **Images: responsive `srcset`, `sizes`, AVIF/WebP.** Use `loading="lazy"` below the fold. AI often ships un-optimized `<img>` tags.
- **Inline critical CSS**, defer the rest.
- **Preconnect to font origins** — excludes a round-trip from the critical path.
- **No render-blocking third-party scripts** — analytics deferred, chat widgets lazy-loaded.
- **Measure with real-user metrics** (Core Web Vitals via field data), not just Lighthouse lab data. S-tier mobile means the 75th-percentile real user has a good experience.

### 4.6 Beyond Responsive: Container Queries and Adaptive Layout

- **Container queries** let a component respond to its container, not the viewport. A "donate card" in a sidebar vs. full-bleed can adapt independently — genuinely reusable, genuinely mobile-aware.
- **`clamp()` for fluid type and spacing** that scales smoothly between viewports, no abrupt breakpoint jumps:
  ```css
  h1 { font-size: clamp(2rem, 6vw, 4.5rem); }
  section { padding-block: clamp(2rem, 5vw, 5rem); }
  ```
- **Adaptive content** — not just layout-shifting, but content-shifting. Mobile shows condensed headlines, progressive detail, swipeable cards. Desktop shows the full editorial spread.

---

## 5. What Our Project Should AVOID — The Anti-Patterns

A consolidated "do not ship" list informed by everything above. If any of these appear in the Track Academy build, it will read as AI slop.

### 5.1 The Hard "Never" List

| Anti-pattern | What it signals | Fix |
|---|---|---|
| Inter / Roboto / Poppins as the only font | "I did not choose a font" | Pair a distinctive display face with a text face (see §2.1) |
| `blue-600` / `indigo-500/600` / violet as primary | Tailwind color pollution | Use HSL with non-default lightness / a committed brand color |
| Purple-to-blue or purple-to-pink gradient | AI's signature (the "Vercel aesthetic") | Solid colors with a single radial accent, or unexpected gradient pairs |
| `rounded-2xl` on everything | Single-radius monotony | Vary radius by context (md / xl / 3xl / none) |
| Three identical feature cards in `grid-cols-3` | "The lowest-risk way to fill a section" | Asymmetric layout: primary + secondary, vertical stacks, tabbed interfaces |
| `max-w-7xl mx-auto` container on every section | Every site is the same width | `max-w-5xl` for content, full-bleed for hero/feature sections |
| `py-20` on every section | Mechanical, metronomic rhythm | Vary: `py-12` to `py-32`, scaled to importance |
| Fade-up on scroll (the only animation) | AI's only entrance | Scale, slide, clip-path reveal, varied entrance and easing |
| `transition-all duration-300 ease-in-out` everywhere | Robotic, animates layout-triggering properties | Specific properties, varied durations, custom cubic-bezier |
| `backdrop-blur-md` sticky nav | Glassmorphism AI tell (2026) | Solid nav that changes on scroll, or hide-on-scroll-down |
| Terminal mockup with three dots | 61% of AI dev-tool sites have this | Real screenshots, code blocks without chrome, interactive demos |
| Centered everything (hero, subhead, button, features) | "Visual equivalent of every sentence ending in a question mark" | Left-align body text, reserve center for true hero moments |
| Stats row of unverifiable big numbers | Generic credibility theater | Fold stats into narrative, or remove |
| "Get Started" / "Start Free Trial" CTAs | Invisible from overuse (38% of AI sites) | Be specific: "Donate £10," "Sponsor an Athlete," "Find a Programme" |
| "Most popular" gradient pill on pricing | "The most visible single tell" | Checkmark on recommended features, or bold the plan name |
| "Built with [heart] in [city]" footer | AI cliché | Real footer with useful links |
| Pure black on pure white | Harsh, eye-straining | Dark gray with hue tint on off-white |
| Slate palette only | Every gray from one Tailwind scale | Mix gray families, add 3–5% brand hue to neutrals |
| Hardcoded hex without CSS custom properties | No theming, no dark mode, no swap | Define palette in `:root` as HSL/OKLCH custom properties |
| `transition-all` | Animates width/height (layout thrash) | `transition-property: color, background-color, box-shadow, transform` |
| No `prefers-reduced-motion` | Accessibility failure | Always provide reduced-motion path |
| No `:focus-visible` styling | Accessibility failure | Custom branded focus ring |
| No skip link | Accessibility failure | `<a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>` |
| Div soup (no `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`) | Structural slop | Semantic HTML throughout |

### 5.2 The Soft "Avoid Unless Intentional" List

- **Generic emoji icons** in feature cards. Use custom SVG, branded iconography, or no icons at all.
- **"Trusted by 1000+ teams" badges with `animate-pulse` glow** — a reliable fingerprint.
- **Stock-looking illustration style** — invest in custom illustration or skip it.
- **Testimonial grid of three identical cards** — vary it: one large + two smaller, or a single scrolling quote.
- **FAQ accordion with chevron rotation** — use native `<details>`/`<summary>` for accessibility, or a plain list.
- **Numbered steps section** — present process as narrative paragraph or visual flow instead.
- **Dashboard preview cards with fake numbers** — show a real screenshot.
- **Three-tier pricing with middle highlighted** — if you must have tiers, make them visually distinct (different backgrounds, sizes, non-grid layout).
- **`@py-12 md:py-20` responsive spacing** — use `clamp()` for fluid scaling instead.
- **Hero-Features-Pricing-Testimonial-CTA-Footer page structure** — break the order, lead with a story or case study.

### 5.3 Anti-Patterns Specific to Charity Sites (From the Benchmarks)

- **Leading with a "Donate" CTA before showing what the charity does.** S-tier charity sites lead with the cause/support, not the ask (see Prostate Cancer UK, Samaritans, MS Society).
- **Generic "Make a difference" hero copy.** Be specific to the charity's actual work and beneficiaries.
- **Stock photography of diverse hands clasped together.** Use real photography of real athletes, coaches, and community members.
- **A "Our Impact" stats grid (10,000 served, 95% success, etc.).** Replace with a single real-time stat (RNLI's latest launches) or fold stats into narrative.
- **A "Help Us Reach Our Goal" progress bar with a rounded gradient fill.** A templated trope. Use a real visualization or a simple sentence.
- **Three-column "Who We Are / What We Do / Get Involved" card layout.** Tell the story; don't grid it.
- **Generic Material/Feather/Lucide icons** in the feature cards — use custom SVG or skip icons.

---

## 6. Actionable Recommendations for Track Academy

### 6.1 Design System: Establish Before Touching Any AI Tool

Define these explicitly before any code generation:
- **Color palette:** 3 accent colors, each appearing ≤3 times per page. Defined in `:root` as HSL custom properties. With hue-tinted neutrals.
- **Typography:** A distinctive display face (e.g., Fraunces, Bricolage Grotesque, Clash Display) paired with a text face (e.g., Source Sans 3, General Sans). Variable fonts where possible. Custom type scale on a 1.2 or 1.333 ratio.
- **Motion language:** Custom `@keyframes` for branded micro-interactions. One orchestrated page load with staggered reveals. `prefers-reduced-motion` honored.
- **Spacing:** `clamp()` for fluid scaling. Sections vary between `py-12` and `py-32`.
- **Radius:** Mixed (`rounded-md`, `rounded-xl`, `rounded-3xl`, none).

### 6.2 Layout Strategy

- **Asymmetric, editorial.** No three-card grids. Primary + secondary splits, vertical stacks with alternating image sides.
- **Full-bleed hero and feature moments.** Break `max-w-7xl`. Photography that bleeds past the content column.
- **Scroll-driven storytelling** for the mission/impact narrative (the Greenpeace/Patagonia model). Each scroll advances a chapter.

### 6.3 Mobile Strategy

- **Independently designed mobile layouts**, not stacked desktop.
- **Bottom-zone CTAs** (donate, sign up, find a programme) in the thumb zone.
- **Swipeable athlete stories and case studies** instead of a 3-column testimonial grid.
- **Performance budget:** < 170KB JS critical, LCP < 2.5s on 3G, CSS-only animations.
- **Container queries** for genuinely responsive cards.

### 6.4 Content Strategy

- **Lead with the athletes and the community** (Battersea / Children International model) — focused, single-proposition hero.
- **Support-first, donation-second** (Prostate Cancer UK / Samaritans model) — show what Track Academy does for the people of Brent before asking for money.
- **Real-time impact** (RNLI model) — recent sessions, athlete milestones, programme attendance.
- **Real photography** of real athletes and coaches — no stock hands clasped together.

### 6.5 Process

- **Never accept raw AI output as final.** Treat AI as a junior collaborator (wireframes, exploration), apply human editorial judgment for polish.
- **Use reference-driven prompting** — gather 3–5 designs from Awwwards/Mobbin/Dribbble, describe what makes them work (layout, type, color, spacing), and feed that as constraints.
- **Run a "slop audit"** — check against the anti-pattern list above before shipping. Consider integrating a tool like Sailop in CI/CD.
- **Test one-handed, on a phone, on 3G** — not just on a 27" monitor on WiFi.

---

## 7. Key Sources

**Why AI websites look the same:**
- https://medium.com/@dminhk/why-do-ai-generated-websites-all-look-identical-02a68015613d (Nov 2025)
- https://www.aiagentskills.ai/blog/ai-websites-all-look-the-same (Dec 2024)
- https://www.vandelaydesign.com/why-ai-generated-designs-look-the-same/ (Nov 2025)
- https://www.monet.design/blog/posts/ai-design-pro-strategies-avoid-slop (Dec 2025)
- https://rottoways.com/blog/ai-generated-website-looks-generic (May 2026)
- https://axe-web.com/insights/ai-website-design-sameness/ (Dec 2025)
- https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website (Oct 2025)
- https://www.sailop.com/blog/ai-slop-encyclopedia (March 2026)
- https://dev.to/a_shokn/how-to-break-the-ai-generated-ui-curse-your-guide-to-authentic-professional-design-2en (Aug 2025)

**Why Tailwind/sites look generic:**
- Adam Wathan's apology tweet (Aug 2025), quoted throughout
- https://www.sailop.com/blog/why-tailwind-makes-every-site-look-the-same (referenced)

**Award-winning charity / non-profit design:**
- https://www.awwwards.com/awwwards/collections/nonprofit-websites/ (curated collection)
- https://www.webdesignawards.io/winners/2025/nonprofit (2025 winners)
- https://www.cssdesignawards.com/sites/50-best-nonprofit-websites/46705/ (50 best)
- https://charitydigital.org.uk/topics/ten-of-the-best-charity-and-non-profit-websites1-6147 (UK charity benchmarks, July 2025)
- https://www.marketingscoop.com/marketing/9-outstanding-nonprofit-websites-according-to-charity-navigator-insights-and-inspiration-for-2024/ (Charity Navigator 2025 rankings)
- https://www.elevationweb.org/best-nonprofit-websites/ (50 best + 7 key resources 2025)
- https://blueheart.patagonia.com/ (Patagonia Blue Heart — Awwwards)
- https://www.no-fishing.net (Sea Shepherd — Awwwards)
- https://searchingforsyria.org (Google Brand Studio)
- https://www.battersea.org.uk (Battersea)
- https://www.children.org/ (Children International)
- https://prostatecanceruk.org/ (Prostate Cancer UK)
- https://www.mssociety.org.uk/ (MS Society)
- https://www.samaritans.org/ (Samaritans)
- https://rnli.org/ (RNLI)
- https://www.parkinsons.org.uk (Parkinson's UK)

---

*Compiled for the Track Academy (Brent, London) S-tier website project. Use this as a working document — refine as the build progresses and new patterns emerge.*