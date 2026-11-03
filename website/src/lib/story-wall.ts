/**
 * Story cards for the "In their words" wall (campaign page) and the full stories page.
 * Built with textContent only: story text comes from the public, so it is never inserted as HTML.
 */
export type PublicStory = { text: string; label: string; featured?: boolean };

export function storyCard(story: PublicStory, opts: { clamp?: boolean } = {}) {
  const card = document.createElement('figure');
  card.className = [
    'mb-5 break-inside-avoid bg-white p-6 font-body lg:p-7',
    story.featured ? 'border-l-4 border-[var(--color-track-orange)]' : 'border border-[var(--color-grey-100)]',
  ].join(' ');

  const quote = document.createElement('blockquote');
  quote.className = 'text-[1.02rem] leading-[1.65] text-[var(--color-grey-900)]';
  const p = document.createElement('p');
  p.textContent = `“${story.text.trim()}”`;
  quote.append(p);

  const cap = document.createElement('figcaption');
  cap.className = 'mt-4 text-sm font-600 text-[var(--color-track-blue)]';
  cap.textContent = `— ${story.label}`;

  card.append(quote);

  // Long stories are trimmed on the campaign page, with an in-place "Read more".
  if (opts.clamp && story.text.length > 320) {
    p.classList.add('line-clamp-6');
    const more = document.createElement('button');
    more.type = 'button';
    more.className = 'mt-2 text-sm font-600 text-[var(--color-track-blue)] underline decoration-[var(--color-track-orange)] decoration-2 underline-offset-4';
    more.textContent = 'Read more';
    more.addEventListener('click', () => {
      p.classList.remove('line-clamp-6');
      more.remove();
    });
    card.append(more);
  }
  card.append(cap);
  return card;
}

/** "Over 200" style rounding for headline counts, so the number reads naturally. */
export function roughCount(n: number) {
  if (n < 20) return String(n);
  if (n < 100) return `Over ${Math.floor(n / 10) * 10}`;
  if (n < 1000) return `Over ${Math.floor(n / 50) * 50}`;
  return `Over ${(Math.floor(n / 100) * 100).toLocaleString('en-GB')}`;
}
