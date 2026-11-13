/**
 * Consultation phase: Brent Council's decision on the indoor running tube at Willesden Sports Centre.
 * Source: council letter of 12 Nov 2026 and brent.gov.uk "Proposed improvements at Willesden Sports Centre".
 * All page copy and the email wording live here so the team can edit them in one place.
 */

export const consultation = {
  slug: '/protect-brent-athletics',
  to: 'leisure@brent.gov.uk',
  decisionMaker: 'Rachel Crossley',
  decisionMakerRole: 'Corporate Director, Service Reform and Strategy',
  // 5pm UK time, Friday 20 November 2026 (GMT, so UTC+0).
  deadlineISO: '2026-11-20T17:00:00Z',
  deadlineLabel: '5pm, Friday 20 November',
  decisionLabel: '25 November',
  councilPage:
    'https://www.brent.gov.uk/parks-leisure-and-healthy-living/sports-clubs-and-activities/sports-centres/willesden-sports-centre/proposed-improvements-at-willesden-sports-centre',
};

export type Option = { value: string; label: string };

export const respondentOptions: Option[] = [
  { value: 'athlete', label: 'I train there' },
  { value: 'parent', label: 'My child trains there' },
  { value: 'coach', label: 'I coach or volunteer' },
  { value: 'club', label: 'I’m responding for a club' },
  { value: 'school', label: 'I’m responding for a school' },
  { value: 'centre_member', label: 'I use the centre' },
  { value: 'resident', label: 'I live locally' },
  { value: 'other', label: 'Other' },
];

export const usedOptions: Option[] = [
  { value: 'this_year', label: 'Yes, this year' },
  { value: 'before', label: 'Yes, in the past' },
  { value: 'not_yet', label: 'Not yet' },
];

export const frequencyOptions: Option[] = [
  { value: 'weekly', label: 'Weekly or more' },
  { value: 'monthly', label: 'A few times a month' },
  { value: 'occasionally', label: 'Now and then' },
];

export const dayOptions: Option[] = [
  { value: 'weekday_evenings', label: 'Weekday evenings' },
  { value: 'saturday', label: 'Saturdays' },
  { value: 'sunday', label: 'Sundays' },
  { value: 'school_hours', label: 'School hours' },
];

export const wouldUseOptions: Option[] = [
  { value: 'definitely', label: 'Definitely' },
  { value: 'probably', label: 'Probably' },
  { value: 'not_sure', label: 'Not sure' },
];

export const payOptions: Option[] = [
  { value: 'up_to_3', label: 'Up to £3' },
  { value: '3_to_5', label: '£3–£5' },
  { value: '5_to_8', label: '£5–£8' },
  { value: '8_plus', label: '£8+' },
  { value: 'prefer_not', label: 'Prefer not to say' },
];

export const subjects = [
  'Willesden Sports Centre: please keep the indoor running track for athletics',
  'Representation on the Willesden Sports Centre proposals: indoor track',
  'Keep indoor athletics at Willesden Sports Centre',
];

const find = (opts: Option[], v?: string) => opts.find((o) => o.value === v)?.label ?? '';
const list = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

export type Answers = {
  name: string;
  postcode: string;
  ward?: string | null;
  respondent: string;
  organisation?: string;
  role?: string;
  used?: string;
  frequency?: string;
  days: string[];
  wouldUse?: string;
  pay?: string;
  orgHours?: string;
  orgYoungPeople?: string;
  ownWords?: string;
};

const dayPhrase: Record<string, string> = {
  weekday_evenings: 'weekday evenings',
  saturday: 'Saturdays',
  sunday: 'Sundays',
  school_hours: 'during the school day',
};

/** Builds the email. Every sentence is optional and only appears if the person gave that answer. */
export function buildEmail(a: Answers) {
  const isOrg = a.respondent === 'club' || a.respondent === 'school';
  const org = (a.organisation || '').trim();
  const p: string[] = [];

  p.push(
    'I am writing in response to your invitation to make representations on the proposed reconfiguration of Willesden Sports Centre, ahead of your decision by 25 November.',
  );

  // Who
  const where = a.ward ? `${a.ward} ward (${a.postcode})` : a.postcode;
  const who: Record<string, string> = {
    athlete: 'I am an athlete who trains at Willesden Sports Centre',
    parent: 'I am the parent of a young athlete who trains at Willesden Sports Centre',
    coach: 'I coach and volunteer with young athletes at Willesden Sports Centre',
    centre_member: 'I use Willesden Sports Centre',
    resident: 'I live locally',
    club: `I am writing on behalf of ${org || 'our club'}${a.role ? `, where I am ${a.role}` : ''}`,
    school: `I am writing on behalf of ${org || 'our school'}${a.role ? `, where I am ${a.role}` : ''}`,
  };
  p.push(`${who[a.respondent] ?? 'I support athletics at Willesden Sports Centre'}${where && !isOrg ? `, and I live in ${where}` : ''}.`);

  // Use
  const days = a.days.map((d) => dayPhrase[d]).filter(Boolean);
  const isParent = a.respondent === 'parent';
  // Who the use is about: the organisation, the parent's child, or the writer.
  const [subj, has, would] = isOrg ? ['We', 'have', 'we'] : isParent ? ['My child', 'has', 'my child'] : ['I', 'have', 'I'];
  if (a.used === 'this_year' || a.used === 'before') {
    const when = a.used === 'this_year' ? 'this year' : 'in the past';
    const freq = { weekly: 'weekly or more', monthly: 'a few times a month', occasionally: 'from time to time' }[a.frequency ?? ''];
    p.push(`${subj} ${has} used the indoor running track ${when}${freq ? `, ${freq} during the winter` : ''}${days.length ? `, mainly ${list(days)}` : ''}.`);
  } else if (a.used === 'not_yet') {
    p.push(`${subj} ${has} not used the indoor track yet, but ${would} would if it is kept for athletics.`);
  }

  // Future use and willingness to pay
  if (isOrg) {
    const hours = Number(a.orgHours), young = Number(a.orgYoungPeople);
    if (hours > 0) {
      p.push(
        `If the track is retained, ${org || 'we'} would expect to book around ${hours} hour${hours === 1 ? '' : 's'} a week${young > 0 ? ` for about ${young} young people` : ''}${days.length ? `, ${list(days)}` : ''}, at the published hire rate.`,
      );
    }
  } else if (a.wouldUse === 'definitely' || a.wouldUse === 'probably') {
    const pay = { up_to_3: 'up to £3', '3_to_5': '£3 to £5', '5_to_8': '£5 to £8', '8_plus': 'more than £8' }[a.pay ?? ''];
    p.push(
      `If it is kept, ${would} would ${a.wouldUse === 'definitely' ? 'definitely' : 'probably'} use it${days.length && a.used === 'not_yet' ? ` on ${list(days)}` : ''}${pay ? `, and I would pay ${pay} a session` : ''}.`,
    );
  }

  // The case (council's own words; factual)
  p.push(
    'The equality impact assessment recognises adverse impacts on existing users, including girls, disabled young people and ethnically diverse communities, and says the alternative spaces are not like-for-like replacements. The figure of about 6.5 hours a week of formal bookings does not capture the informal and weather-dependent use that the council itself acknowledges, or the demand that would follow if the track were properly available.',
  );

  if (a.ownWords && a.ownWords.trim()) p.push(a.ownWords.trim());

  p.push('I ask you to retain the indoor running tube for athletics.');

  const sign = [a.name || '[Your name]', isOrg && a.role ? `${a.role}, ${org}` : isOrg ? org : '', a.postcode].filter(Boolean).join('\n');
  const body = `Dear Ms Crossley,\n\n${p.join('\n\n')}\n\nYours sincerely,\n\n${sign}`;
  return body;
}
