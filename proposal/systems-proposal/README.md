# Proposal — Track Academy Systems & Data Autonomy

A companion proposal to the website rebuild, focused on the 12 operational issues uncovered in conversation with the receptionist at Willesden Sports Centre.

## Files
- `index.html` — self-contained proposal page (HTML + CSS + JS embedded)
- `README.md` — this file

## To view locally
Open `index.html` in a browser.

## To deploy
Upload the entire `systems-proposal/` folder to any static host alongside the main `proposal/` folder.

## Structure (13 sections)
1. **Cover** — Track Academy logo, hero, prepared for Patrik Ewe
2. **The 12 issues** — every problem the receptionist raised, categorised (Data, Registration, Billing, Communications, Sign-in)
3. **Why Upshot alone isn't enough** — not a criticism of Upshot, but an explanation of why a specialised impact-measurement tool can't also be a registration platform, billing system, sign-in tool, and comms engine
4. **The solution: own your system** — six integrated modules on one database
5. **Registration reimagined** — child-first form, sibling autofill, mobile-first, clearly separated parent/child sections
6. **QR code sign-in** — one scan, tick the kids attending, done. Offline-first to handle bad WiFi. 4G dongle backup option
7. **Automated billing & payments** — Stripe for £26/quarter/child. UC verification flow. Payment status tied to QR sign-in
8. **Communications that land** — SMS campaign to collect missing emails, welcome email sequence, triggered emails throughout the parent journey
9. **The trial session flow** — short trial form → attend free → automated follow-up → registration → payment. A pipeline, not admin work
10. **The data advantage** — comparison table: what staff need to know vs what Upshot can query vs what your own database can query
11. **Technical architecture** — Supabase, Astro, Stripe, Resend, Twilio, Upshot sync, offline PWA, staff dashboard
12. **Roadmap** — 5 phases: 1A (website + registration), 1B (SMS + emails), 2 (QR sign-in), 3 (billing), 4 (trial funnel), 5 (portals)
13. **Investment** — £800 one-off + £300/month retainer. Infrastructure £0–£55/month

## Relationship to the main proposal
The main `proposal/index.html` (13 sections, website rebuild focus) is **Phase 1A** of this systems proposal. The systems proposal extends the scope to cover Phases 1B–5 — the operational workflows that save staff 5–10 hours per week.

Both proposals are aligned on:
- £800 Phase 1A website rebuild
- £300/month retainer for ongoing build
- Free Cloudflare hosting (saves £160/year)
- 6-month agreement with reassess
- 50% up-front on the £800

## The 12 issues addressed

| # | Issue | Solved by |
|---|---|---|
| 1 | Emails optional in Upshot → no emails | Phase 1B: SMS campaign + own consent tracking |
| 2 | Migration lost emails | Phase 1B: SMS campaign recovers them |
| 3 | Manual customer-by-customer email collection | Phase 1B: automated SMS + landing page |
| 4 | Form unclear — parents enter their names | Phase 1A: child-first registration wizard |
| 5 | Can't query consent status in Upshot | Phase 1A: your own database, full SQL |
| 6 | Form too long (20+ steps × 3 kids) | Phase 1A: 5-step wizard with sibling autofill |
| 7 | No own database | Phase 1A: Supabase, fully owned |
| 8 | Manual 6-field paper sign-in per child | Phase 2: QR code sign-in, one scan |
| 9 | No welcome email | Phase 1B: automated email sequence |
| 10 | Manual billing, UC chasing | Phase 3: Stripe + UC verification flow |
| 11 | Trial session is admin task | Phase 4: automated trial → registration funnel |
| 12 | Bad WiFi at sports centre | Phase 2: offline-first PWA + 4G dongle backup |

## Key differentiator
**"Your database, your queries, your rules."** This proposal moves Track Academy from a position of data dependency (all data in Upshot, limited query ability) to data autonomy (all data in your own Supabase database, full SQL access, Upshot fed from your system). The website proposal gives Track Academy a public face. The systems proposal gives Track Academy control of its operations.
