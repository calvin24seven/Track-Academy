# Track Academy Website

Production website for Track Academy, a Brent-based charity providing athletics, education and mentoring for young people.

## Stack

- Astro 7
- Tailwind CSS 4
- TypeScript
- Cloudflare static assets / Wrangler
- Self-hosted Fredoka and Inter fonts

Node.js 22.12+ is required.

## Local development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

## Project structure

- `src/pages/` — public routes
- `src/components/layout/` — site header and footer
- `src/components/sections/` — reusable page sections
- `src/components/mobile/` — mobile-only conversion UI
- `src/components/ui/` — shared UI primitives
- `src/assets/` — optimised source images handled by Astro
- `src/styles/global.css` — design tokens, fonts, motion and global styles
- `public/` — static files served without processing

## Registration

Track Academy registrations are handled by the organisation's official Upshot form:

`https://app.upshot.org.uk/signup/c1ac4dca/39e743a525f9f4b5/`

Do not replace this with a client-side form unless there is an approved server-side integration that creates the record in Upshot and returns a confirmed success response. The website must never show a successful registration unless Upshot has actually received it.

The previous custom registration wizard was removed because it did not submit data to Upshot and stored sensitive youth information in browser localStorage.

## Newsletter / Sender

Track Academy uses Sender for newsletter signups.

The footer CTA has the selector:

`#newsletter-signup-trigger`

To reconnect the existing Sender popup:

1. In Track Academy's Sender account, open the published signup popup.
2. Copy the account's Universal JavaScript snippet from the form Publishing settings.
3. Add that script before `</head>` in `src/layouts/BaseLayout.astro`.
4. In Sender's popup Behaviour settings, configure the click trigger / element selector as `#newsletter-signup-trigger`.
5. Keep the existing Sender popup's normal time/scroll/exit triggers if Track Academy still wants them.
6. Test desktop and mobile, including frequency/cooldown behaviour and unsubscribe flow.

Until the account-specific Sender script is supplied, the footer CTA falls back to an email request rather than presenting a fake successful signup.

## Privacy and safeguarding

- Privacy policy: `/privacy`
- Safeguarding: `/safeguarding`

The privacy policy reflects the systems currently identified in Track Academy's public website and registration process, including Upshot, Sender, Spond and payment/fundraising providers. Before launch, the client should confirm its actual retention schedule, all processors and any internal systems not visible to the web team.

## SEO

The base layout provides canonical URLs, title/description metadata, Open Graph metadata, social-card metadata and Track Academy organisation structured data.

Static discovery files:

- `/robots.txt`
- `/sitemap.xml`

When adding or removing a public route, update `public/sitemap.xml`.

## Deployment

`wrangler.jsonc` is configured for the Cloudflare static build in `dist/`, with the custom 404 page and automatic trailing-slash handling.

Typical deployment sequence:

```bash
npm install
npm run build
npx wrangler deploy
```

Confirm the production Cloudflare project, domain and permissions before deploying from a new machine or account.

## Pre-handoff / launch checklist

- Build succeeds with no Astro errors.
- Every internal navigation link resolves.
- Upshot registration opens the correct Track Academy form and can be completed end-to-end.
- Privacy and safeguarding copy has client approval.
- Sender Universal JS is installed and newsletter popup/CTA works.
- Donation, social, phone and email links work.
- `robots.txt` and `sitemap.xml` return 200.
- Mobile menu works with keyboard, Escape and focus trapping.
- Test at common mobile widths and desktop widths.
- Run Lighthouse for Performance, Accessibility, Best Practices and SEO.
- Verify redirects from important legacy WordPress URLs before switching the domain.
- Confirm analytics/cookie-consent requirements before enabling non-essential tracking.

## Ownership

Client-facing operational contacts currently used by the site:

- Email: `admin@trackacademy.co.uk`
- Phone: `07956 715052`
- Address: Willesden Sports Centre, Donnington Road, London, NW10 3QX
- Registered charity: 1164222
