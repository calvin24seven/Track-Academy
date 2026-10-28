/**
 * Protect Brent Athletics — all campaign copy and contacts live here.
 * Edit this file to change wording; the page and email builder read from it.
 */

export const campaign = {
  slug: '/protect-brent-athletics',
  hashtag: '#ProtectBrentAthletics',
  headline: 'Tell Brent Council: save athletics in Brent',
  shareText:
    'Brent Council is removing the indoor track at Willesden Sports Centre, used by 400+ young people. Their own Equality Impact Assessment admits girls, disabled young people and ethnically diverse communities will be hit hardest. It takes 2 minutes to act:',
  // Inbox that gets a blind copy of every supporter email so sends can be verified.
  // Create this mailbox first, then fill it in. Leave '' to turn the blind copy off.
  bccInbox: '',
  contactName: 'Patrik Ewe',
  contactEmail: 'patrik@trackacademy.co.uk',
  // Same donation page the main site's Support page uses.
  donateUrl: 'https://whydonate.com/fundraising/trackacademy',
  // Survey opens on this date (YYYY-MM-DD). Add ?survey=1 to the URL to preview it early.
  surveyOpensOn: '2026-11-02',
  petitionTarget: 1000,
};

export const context = [
  'Brent Council has approved removing the indoor track at Willesden Sports Centre.',
  "The council's own Equality Impact Assessment admits this will adversely affect girls, disabled young people and ethnically diverse communities, and that the proposed alternatives are not like-for-like.",
  'We are not asking the council to stop investing. We are asking it to keep the track open until a funded, year-round alternative is agreed in writing.',
];

export const facts = [
  { number: '400+', label: 'young people use the track each year' },
  { number: '259', label: 'young people trained there last January' },
  { number: '60%', label: 'are girls, mostly teenagers' },
  { number: '29%', label: 'have a disability or long-term condition' },
];

export const asks = [
  'Confirmed Saturday provision (the EIA records this as unresolved).',
  'The current or a reduced hire rate guaranteed beyond the transition period.',
  'The winter programming gaps in the EIA action plan closed, with a named lead and a date.',
  'No assumption that the alternative is like-for-like (the EIA’s own wording).',
];

export type Councillor = { name: string; ward: string; party: string; email: string; role?: string };

/** The two Cabinet members the campaign targets. Every supporter email goes to both. */
export const primaryTargets: Councillor[] = [
  {
    name: 'Cllr Jake Rubin',
    ward: 'Roundwood',
    party: 'Labour',
    email: 'Cllr.Jake.Rubin@brent.gov.uk',
    role: "Cabinet Member for Children's Services, Employment & Climate Action",
  },
  {
    name: 'Cllr Liz Dixon',
    ward: 'Dollis Hill',
    party: 'Labour',
    email: 'cllr.liz.dixon@brent.gov.uk',
    role: 'Cabinet Member for Community Safety & Public Health',
  },
];

/**
 * Brent ward councillors, from democracy.brent.gov.uk (checked 28 Oct 2026).
 * Supporters with a Brent postcode also copy in their own ward councillors.
 * Ward names must match postcodes.io `admin_ward` values.
 */
export const wardCouncillors: Record<string, Councillor[]> = (() => {
  const rows: [string, string, string, string][] = [
    ['Alperton', 'Krishna Chauhan', 'Liberal Democrats', 'Cllr.Krishna.Chauhan@brent.gov.uk'],
    ['Alperton', 'Charlie Clinton', 'Liberal Democrats', 'Cllr.Charlie.Clinton@brent.gov.uk'],
    ['Alperton', 'Anton Georgiou', 'Liberal Democrats', 'Cllr.Anton.Georgiou@brent.gov.uk'],
    ['Barnhill', 'Rhoda Ibrahim', 'Labour', 'Cllr.Rhoda.Ibrahim@brent.gov.uk'],
    ['Barnhill', 'Robert Johnson', 'Labour', 'Cllr.Robert.Johnson@brent.gov.uk'],
    ['Brondesbury Park', 'Ryan Hack', 'Labour', 'Cllr.Ryan.Hack@brent.gov.uk'],
    ['Brondesbury Park', 'Tashi Thomas', 'Labour', 'Cllr.Tashi.Thomas@brent.gov.uk'],
    ['Cricklewood & Mapesbury', 'Tariq Dar', 'Labour', 'Cllr.Tariq.Dar@brent.gov.uk'],
    ['Cricklewood & Mapesbury', 'Gwen Grahl', 'Labour', 'Cllr.Gwen.Grahl@brent.gov.uk'],
    ['Dollis Hill', 'Parvez Ahmed', 'Labour', 'cllr.parvez.ahmed@brent.gov.uk'],
    ['Dollis Hill', 'Liz Dixon', 'Labour', 'cllr.liz.dixon@brent.gov.uk'],
    ['Dollis Hill', 'Arshad Mahmood', 'Labour', 'cllr.arshad.mahmood@brent.gov.uk'],
    ['Harlesden & Kensal Green', 'Amandine Alexandre', 'Green Party', 'Cllr.Amandine.Alexandre@brent.gov.uk'],
    ['Harlesden & Kensal Green', 'Tina Amadi', 'Labour', 'Cllr.Tina.Amadi@brent.gov.uk'],
    ['Harlesden & Kensal Green', 'Matt Kelcher', 'Labour', 'cllr.matt.kelcher@brent.gov.uk'],
    ['Kenton', 'Suresh Kansagra', 'Conservative', 'cllr.suresh.kansagra@brent.gov.uk'],
    ['Kenton', 'Sai Karthik Madabhushi', 'Conservative', 'Cllr.Sai.Madabhushi@brent.gov.uk'],
    ['Kenton', 'Anup Patel', 'Conservative', 'Cllr.Anup.Patel@brent.gov.uk'],
    ['Kilburn', 'Suzanne Gallagher', 'Green Party', 'Cllr.Suzanne.Gallagher@brent.gov.uk'],
    ['Kilburn', 'Stephen Malonga', 'Green Party', 'Cllr.Stephen.Malonga@brent.gov.uk'],
    ['Kilburn', 'Paul Ryan', 'Green Party', 'Cllr.Paul.Ryan@brent.gov.uk'],
    ['Kingsbury', 'Jasbinder Bajwa', 'Labour', 'Cllr.Jas.Bajwa@brent.gov.uk'],
    ['Kingsbury', 'Saqib Butt', 'Labour', 'Cllr.Saqib.Butt@brent.gov.uk'],
    ['Northwick Park', 'Keith Perrin', 'Green Party', 'cllr.keith.perrin@brent.gov.uk'],
    ['Northwick Park', 'Nisha Vakani', 'Green Party', 'Cllr.Nisha.Vakani@brent.gov.uk'],
    ['Preston', 'Michael Maurice', 'Conservative', 'cllr.michael.maurice@brent.gov.uk'],
    ['Preston', 'Harshadbhai Patel', 'Conservative', 'Cllr.Harshadbhai.Patel@brent.gov.uk'],
    ['Queens Park', 'Fiona Mulaisho', 'Liberal Democrats', 'Cllr.Fiona.Mulaisho@brent.gov.uk'],
    ['Queens Park', 'Deborah Unger', 'Liberal Democrats', 'Cllr.Deborah.Unger@brent.gov.uk'],
    ['Queens Park', 'Barbara Want', 'Liberal Democrats', 'Cllr.Barbara.Want@brent.gov.uk'],
    ['Queensbury', 'Manoj Mishra', 'Conservative', 'Cllr.Manoj.Mishra@brent.gov.uk'],
    ['Queensbury', 'Kanta Mistry', 'Conservative', 'Cllr.Kanta.Mistry@brent.gov.uk'],
    ['Queensbury', 'Jayanti Patel', 'Conservative', 'Cllr.Jayanti.Patel@brent.gov.uk'],
    ['Roundwood', 'Samiah Anderson', 'Labour', 'Cllr.Samiah.Anderson@brent.gov.uk'],
    ['Roundwood', 'Fleur Donnelly-Jackson', 'Labour', 'Cllr.Fleur.Donnelly-Jackson@brent.gov.uk'],
    ['Roundwood', 'Jake Rubin', 'Labour', 'Cllr.Jake.Rubin@brent.gov.uk'],
    ['Stonebridge', 'Abdi Aden', 'Labour', 'cllr.abdifatah.aden@brent.gov.uk'],
    ['Stonebridge', 'Trevor Blackman', 'Labour', 'Cllr.Trevor.Blackman@brent.gov.uk'],
    ['Stonebridge', 'Promise Knight', 'Labour', 'Cllr.Promise.Knight@brent.gov.uk'],
    ['Sudbury', 'Paul Lorber', 'Liberal Democrats', 'Cllr.Paul.Lorber@brent.gov.uk'],
    ['Sudbury', 'Nirmala Patel', 'Liberal Democrats', 'Cllr.Nirmala.Patel@brent.gov.uk'],
    ['Tokyngton', 'Muhammed Butt', 'Labour', 'cllr.muhammed.butt@brent.gov.uk'],
    ['Tokyngton', 'Shamim Chowdhury', 'Conservative', 'Cllr.Shamim.Chowdhury@brent.gov.uk'],
    ['Welsh Harp', 'Amer Agha', 'Labour', 'cllr.amer.agha@brent.gov.uk'],
    ['Welsh Harp', 'Iftekhar Ahmed', 'Labour', 'Cllr.Iftekhar.Ahmed@brent.gov.uk'],
    ['Welsh Harp', 'Sapna Chadha', 'Conservative', 'Cllr.Sapna.Chadha@brent.gov.uk'],
    ['Wembley Central', 'Daniel Brown', 'Liberal Democrats', 'Cllr.Daniel.Brown1@brent.gov.uk'],
    ['Wembley Central', 'Hetal Jansali', 'Liberal Democrats', 'Cllr.Hetal.Jansali@brent.gov.uk'],
    ['Wembley Central', 'Jigar Shah', 'Liberal Democrats', 'Cllr.Jigar.Shah@brent.gov.uk'],
    ['Wembley Hill', 'Lloyd McLeish', 'Labour', 'Cllr.Lloyd.McLeish@brent.gov.uk'],
    ['Wembley Hill', 'Floyd Dias Do Rosario', 'Conservative', 'Cllr.Floyd.DiasdoRosario@brent.gov.uk'],
    ['Wembley Hill', 'Angela Joyce De Souza', 'Labour', 'Cllr.Angela.JoycedeSouza@brent.gov.uk'],
    ['Wembley Park', 'Iman Ahmadi Moghaddam', 'Green Party', 'Cllr.Iman.Ahmadi-Moghaddam@brent.gov.uk'],
    ['Wembley Park', 'Najib Warsame', 'Green Party', 'Cllr.Najib.Warsame@brent.gov.uk'],
    ['Willesden Green', 'George Burn', 'Labour', 'Cllr.George.Burn@brent.gov.uk'],
    ['Willesden Green', 'Saqlain Choudry', 'Labour', 'Cllr.Saqlain.Choudry@brent.gov.uk'],
    ['Willesden Green', 'Mary Mitchell', 'Green Party', 'Cllr.Mary.Mitchell@brent.gov.uk'],
  ];
  const map: Record<string, Councillor[]> = {};
  for (const [ward, name, party, email] of rows) {
    (map[ward] ||= []).push({ ward, name: `Cllr ${name}`, party, email });
  }
  return map;
})();

export const relationships = [
  { value: 'parent', label: 'Parent or carer of a Track Academy athlete' },
  { value: 'athlete', label: 'Track Academy athlete (18+)' },
  { value: 'alumni', label: 'Former athlete' },
  { value: 'coach_volunteer', label: 'Coach, mentor or volunteer' },
  { value: 'club_member', label: 'Member of another club (e.g. QPH)' },
  { value: 'resident', label: 'Local resident' },
  { value: 'other', label: 'Other supporter' },
] as const;

/** Opening line varies by who is writing, so councillors don't get 400 identical emails. */
export const emailOpeners: Record<string, string> = {
  parent: 'I am writing as a parent whose child trains with Track Academy at Willesden Sports Centre.',
  athlete: 'I am writing as a young athlete who trains with Track Academy at Willesden Sports Centre.',
  alumni: 'I am writing as a former Track Academy athlete who grew up training at Willesden Sports Centre.',
  coach_volunteer: 'I am writing as a coach and volunteer who works with young people at Willesden Sports Centre.',
  club_member: 'I am writing as a member of the local athletics community who uses Willesden Sports Centre.',
  resident: 'I am writing as a local resident and a supporter of Track Academy.',
  other: 'I am writing as a supporter of Track Academy.',
};

export const emailSubjects = [
  'Please protect indoor athletics for Brent’s young people',
  'Keep the Willesden indoor track open until an alternative is agreed',
  'The indoor track at Willesden Sports Centre matters to my family',
  'Please don’t remove the indoor track before a real alternative is in place',
];

export const emailBody = (o: { opener: string; place: string; personal: string; name: string; postcode: string }) =>
  `Dear Councillors,

${o.opener}${o.place ? ` I live in ${o.place}.` : ''}

I am deeply concerned about the removal of the indoor athletics track at Willesden Sports Centre. It is used by hundreds of local young people, many from low-income families, who rely on it for winter training and mentoring.
${o.personal ? `\n${o.personal}\n` : ''}
The council's own Equality Impact Assessment admits this loss will adversely affect girls, disabled young people and ethnically diverse communities, and that the proposed alternatives are not a like-for-like replacement. Even so, Track Academy is being asked to move without adequate support in place.

I am asking you to make sure the indoor track stays available until Brent Council has agreed in writing, with Track Academy and Queen's Park Harriers, a funded year-round alternative for young athletes. That must include Saturday provision and a hire rate guaranteed beyond the transition period.

Please could you let me know what you will do about this.

Yours sincerely,

${o.name || '[Your name]'}
${o.postcode || '[Your postcode]'}`;

export const skillOptions = [
  { value: 'legal', label: 'Legal (public law, equality, planning)' },
  { value: 'media', label: 'Media or journalist contacts' },
  { value: 'campaigning', label: 'Campaigning or organising' },
  { value: 'video', label: 'Video, photo or design' },
  { value: 'donor', label: 'Funding or donor contacts' },
  { value: 'council', label: 'Knows councillors or council officers' },
  { value: 'other', label: 'Something else' },
];
