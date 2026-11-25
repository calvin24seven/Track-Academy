# Editing campaign copy (for Track Academy staff)

All campaign wording lives in two plain text files. You don't need to touch any page design.

| What you want to change | File |
|---|---|
| The representation page (`/protect-brent-athletics/our-representation/`): headline, figures, six points, asks | `src/data/representation.ts` |
| "Decision due this week" line (shown on the page, the homepage and the orange banner) | `src/data/representation.ts` → `decisionLine` |
| Campaign contact name/email, hashtag, switching the campaign on/off | `src/data/campaign.ts` |

## How to make a copy change

1. Open the file on GitHub (repo `Track-Academy`, folder `website/src/data/`) and click the pencil icon.
2. Change only the words **inside the quote marks**. Keep the quote marks, commas and brackets as they are.
   - Use a curly apostrophe `’` (copy it from here) or keep straight ones out of text wrapped in `'…'` quotes. A plain `'` inside `'…'` text breaks the build.
3. Click **Commit changes**. Then ask Calvin (or whoever deploys) to publish. Publishing is: `npm run build` then `npx wrangler deploy` from the `website` folder.

Example — after the decision, change:

```ts
decisionLine: 'Brent Council’s decision is due this week.',
```
to
```ts
decisionLine: 'Brent Council has now made its decision. Here is our response.',
```

## Taking the campaign down

In `src/data/campaign.ts`:

```ts
homepageTakeover: false,   // homepage goes back to the normal Track Academy hero
siteBanner: false,         // removes the orange banner from every page
```

The representation page itself stays live at its address (useful for press links) unless you delete
`src/pages/protect-brent-athletics/our-representation.astro`.

## If something breaks

The deploy will fail rather than publish a broken page, so the live site stays as it was. Undo your
last change on GitHub (History → revert) or send the error to Calvin.
