# Protect Brent Athletics: campaign strategy and build

Prepared 28 Oct 2026 for Track Academy (Patrik, CEO, Chair), alongside the comms plan of the same date.

## 1. Honest framing: what "winning" means

Nobody can promise a 90% chance of keeping the track. The council has made its decision and is moving to implementation. What we *can* do is stack every lever we have so that, for the council, giving us a written mitigation deal is cheaper than refusing. Most campaigns like this are won because one hard lever (legal, financial or electoral) is backed by enough public pressure that councillors want a way out.

Define the win in tiers so the team can tell whether it is working:

| Tier | Outcome | Realistic? |
|---|---|---|
| **A** | Track kept (or works paused) until a written, funded, year-round alternative is agreed | The campaign's stated ask. Achievable if legal and political pressure land together |
| **B** | Written alternative with Saturday provision and a guaranteed hire rate, agreed before we move | Most likely good outcome |
| **C** | Notice period extended (e.g. to end of winter season) while B is negotiated | Floor. Should be secured within 2 weeks |
| Loss | Move out on 2 weeks' notice with nothing in writing | What happens if we only run comms |

Ask for A in public. Be ready to accept B in private. Get C quickly.

## 2. What I changed from the plan, and why

The plan is good: clear ask, sensible tone, careful survey language. These changes make it stronger.

**1. Host on our site, not Sender.net.** Sender can't tell us *who* acted, *from which ward*, or *which partner sent them*. The new page at `/protect-the-track` records every action in Supabase. That gives you a live count for the press and a ward-by-ward breakdown for councillors.

**2. Email each supporter's own ward councillors, not just the two Cabinet members.** Councillors respond to their own residents. The page looks up the supporter's postcode and automatically copies in their ward councillors. The two Cabinet members still receive every email.
- **Willesden Sports Centre (NW10 3QX) is in Roundwood ward, Cllr Rubin's own ward.** He is both the Cabinet target *and* the ward councillor for the site. Use that.
- Cllr Dixon represents Dollis Hill.

**3. Collect our own petition signatures; don't rely on 38 Degrees alone.** Brent's petition scheme ([guidance](https://democracy.brent.gov.uk/documents/s148390/02t%20Appendix%2020%20-%20Brent%20petition%20guidance.pdf)) says:
- **51+ valid signatures** → notified to the chair of scrutiny and the strategic director.
- **200+ valid signatures** → the organiser can request a **debate at Full Council** (5 days' notice).
- E-petitions need name, postcode and email. **Our form collects exactly that.** 38 Degrees doesn't give you that list in a form the council will accept.
- ⚠️ **Catch:** the guidance excludes petitions on issues "currently the subject of a formal council complaint". Track Academy has one open. Options:
  - (a) A parent group, not Track Academy, organises the formal petition, and the complaint covers process while the petition covers the decision.
  - (b) Ask committee@brent.gov.uk in writing *now* whether the exclusion applies.
  - (c) Submit once the complaint is answered.

  Either way, collect the signatures in a council-ready format from day one. If you want 38 Degrees for reach, link to our page from it rather than running two counts.

**4. Make the survey hit the money, not just the mood.** "X% would consider cancelling" is easy to dismiss. "£X a year of existing membership income is linked to families who would consider leaving" talks to the council's own business case. The survey now also asks membership type, the number of members in the household and rough monthly spend, and the dashboard turns that into an annual figure. It also asks whether parents use the gym or café while their child trains, which is footfall the council's model probably doesn't count.
- The wording is softened from "revoking in protest" to "would you consider cancelling", in line with the plan's own "asking, not inciting" principle.
- The survey is anonymous (first half of postcode only) and goes live automatically on 2 Nov.

**5. Work with every party.** Since May 2026 Brent has Green, Lib Dem and Conservative councillors as well as a Labour majority. Opposition councillors can table Full Council questions and motions and push for scrutiny. Charity rules (Charity Commission CC9) require us to stay non-party, so ask *all* councillors for the same thing. Opposition members are just more likely to act.

**6. Treat the legal route as the main lever, not a backstop.** The council's own Equality Impact Assessment admits adverse impact on protected groups and says mitigation is unresolved. That is the core of a Public Sector Equality Duty (Equality Act 2010 s149) challenge.
- **Judicial review must be brought promptly and within 3 months of the decision.** Find the decision date today.
- Get a public-law solicitor (pro bono via LawWorks, Public Law Project, a local law centre, or the skills form on the page) to review a pre-action protocol letter. A credible pre-action letter often does more than 1,000 signatures.
- This needs proper legal advice. It is not something to rely on this plan for.

## 3. The plan: two tracks running together

### Track 1: Inside (the actual negotiation)
Owner: CEO and Chair.
- **Write a one-page "offer" to the council.** Make it easy to say yes. For example: keep the track to end of March, a funded Saturday slot elsewhere, a fixed hire rate for 2 years, named officer leads. Councils move faster when handed a solution than when handed only criticism.
- Request an urgent meeting with Cllr Rubin as **ward member for the site**, separately from his Cabinet role.
- Ask opposition and ward councillors to submit a **member enquiry** and a **Full Council question** on Saturday provision and the EIA gaps.
- Ask the scrutiny chair to add the EIA mitigation to the committee's work programme.
- Get the **pre-action letter** reviewed and ready. Hold it as leverage. Send it if the complaint response is a refusal.
- England Athletics and Sport England: ask for *written* letters to the council (not only press quotes) on the loss of the only indoor athletics facility of its kind locally.

### Track 2: Outside (making the cost visible)
Owner: comms.
- Supporter email → `/protect-the-track` (sign → email councillors → share).
- Each partner gets its own link (`?ref=qph`, `?ref=ea`, `?ref=advocacy`), so you can see who actually delivered.
- Press: the "glossy gym email doesn't mention the track" angle is strong. Add a live number ("1,200 residents have written to councillors in 5 days") and one family story (consent and DSL check required).
- **WhatsApp beats Instagram for parents.** Ask every coach to post the link in their parent groups, with the ref code `?ref=coach-<name>`.
- One short video: athletes training indoors, then the empty track. No child names, consent cleared.

## 4. Revised timeline

| Date | Inside | Outside |
|---|---|---|
| **Wed 28 Oct** | Find the decision date (JR clock). Email committee@brent.gov.uk about the petition exclusion. Contact a public-law solicitor. | Wire up Supabase and deploy the page. Make partner ref links. Swap the hero for an indoor photo. |
| **Thu 29 Oct** | Request a meeting with Cllr Rubin as ward member. | Supporter email out. Coaches post in parent WhatsApp groups. Open meeting at 6pm: show the page on screen and get people to act *in the room*. |
| **Fri 30 Oct** | Send the one-page offer to Eugene Minogue and Ruth du Plessis. | Press letter with the live numbers. Social post. Partner pack with ref links. |
| **Sun 1 Nov** | Chase the complaint response. | Check the dashboard: which refs are working? Push the slow ones. |
| **Mon 2 Nov** | Brief opposition and ward councillors with signatures from their wards. | Survey opens automatically. Email it to families. |
| **Tue 3 Nov** | Follow up councillors with no reply (dashboard shows them). Board update. | Second push to non-actioned supporters. |
| **By ~6 Nov** | Decide whether to request a Full Council debate (200+ signatures) and/or send the pre-action letter. | |
| **Mon 9 Nov** | Survey closes. Send results to officers, councillors, EA and Sport England. | Press story on the survey ("consider", "suggest"). |
| Next Full Council | Petition debate or public question. Bring families to the gallery. | Press at the meeting. |

## 5. The page flow: sign → email → share

**Why this order:** signing is the easiest step, so nearly everyone does it, and it gives us name, email and postcode even if they stop there. Emailing a councillor has more impact but more people drop out. Asking straight after a "yes", with everything already filled in, gets the most people to do it.

1. **Sign** (30 seconds). Name, email, postcode, who they are, council consent.
2. **Email councillors** (1 minute). Pre-filled from step 1: "From [name] · [ward]", the councillors shown by name (Cabinet members plus their own ward councillors), and the email already written. They add one line and press send. The page then asks "Did it send?", which is how emails get counted.
3. **Share** (10 seconds). WhatsApp first.

Then, further down the page: story, skills (pre-filled with their name and email) and the survey (deliberately not pre-filled, because it's anonymous).

The page remembers details on the supporter's device. A return visit opens on the next step they haven't done, and "Clear my details" removes them.

**Reminder email (do this ~24 hours after each big push):** in Sender, email the people who signed and opted in to updates (dashboard export "Opted-in supporters"). Subject: "One more minute for the track?". Link: `https://trackacademy.co.uk/protect-the-track?ref=reminder#email`. On the same device, the email step opens already filled in.

**What to watch:** on the dashboard, compare emails sent with signatures. That share is the number to improve. If it's low, make the email step easier; don't change the order.

## 6. Tracking responses (the dashboard)

`/protect-the-track/dashboard`. Sign in by email link; admins only.

- **Totals:** signatures, Brent signatures, emails sent, shares, opt-ins, stories waiting, offers, survey responses.
- **Daily chart:** whether the campaign is gaining or losing pace.
- **By partner/channel:** which partner links and coaches actually brought people in.
- **By ward:** signatures per ward, with the councillor names beside them. Send each councillor their own number ("47 of your residents have signed").
- **Councillor and stakeholder log:** every reply, meeting and call, with stance (champion → opposed) and a next step with a due date. Overdue items show in red.
- **Stories:** waiting for approval. Anything about an under-18 is flagged for a DSL check.
- **Offers of help:** with status tracking.
- **Survey:** live split, annual £ estimate and suggested careful wording (shown only after 30+ responses).
- **CSV exports:** petition in council format, opted-in supporters for Sender, survey, log.

**How "emails sent" is counted:** supporters click "Yes, I sent it" after their email app opens. To verify against real sends, create a campaign inbox (e.g. protect@trackacademy.co.uk) and set `bccInbox` in `src/data/campaign.ts`. Every email then blind-copies that inbox. The page tells people how their data is used. Add a line about the blind copy if you turn it on.

## 7. Safeguarding and data

- Stories about under-18s need a parent/carer consent tick before they can be submitted, and the DSL must approve them before they show on the page.
- Names are first name only. Press contact always goes through Track Academy.
- The petition requires explicit consent to share name and postcode with the council. Campaign updates are a separate opt-in.
- The survey is anonymous: no name, no email, first half of postcode only.
- **Update `/privacy`** to cover the campaign (Supabase as processor, postcodes.io lookup, 6-month deletion).

## 8. Setup checklist (for Calvin)

1. ✅ Supabase project `ddgchywxajftqdukcjbv` (eu-west-1) connected.
2. ✅ Migration applied, security checks run, public access rules tested.
3. ✅ Admins added to `campaign_admins`: calvin@partneredgrowth.com, patrik@trackacademy.co.uk.
4. ⬜ Invite the same admins in Supabase → Authentication → Users → **Invite user**. Sign-in links are only sent to existing users.
5. ⬜ Authentication → URL configuration: set Site URL to `https://trackacademy.co.uk`, and add `https://trackacademy.co.uk/protect-the-track/dashboard/` and `http://localhost:4321/protect-the-track/dashboard/` to the redirect URLs.
6. ⬜ Add these two values to the Cloudflare build env, then redeploy. (Local `.env` is done.)
   - `PUBLIC_SUPABASE_URL=https://ddgchywxajftqdukcjbv.supabase.co`
   - `PUBLIC_SUPABASE_ANON_KEY=sb_publishable_FPIt9s1iy96nbU6p5JNHUw_S5xo1G9R` (publishable key, safe to be public)
7. Optional: create the campaign inbox and set `bccInbox`.
8. ✅ Hero swapped to the Willesden indoor track photo.
9. Add a site-wide banner or nav link to `/protect-the-track` for the campaign period.
10. Before launch, test on a phone: email (mailto and Gmail), petition, story, skills, survey (`?survey=1`).
11. If spam appears, add Cloudflare Turnstile to the forms. There is a basic bot trap already.

## 9. What to say and not say

Keep the plan's discipline. "Consider", "suggest", "the council's own assessment says". Never "will cancel", "proves", "destroy". Don't attack named officers. (Brent's petition rules also reject petitions that name officers.) Stay non-party.
