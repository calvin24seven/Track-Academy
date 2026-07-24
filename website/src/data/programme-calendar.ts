export type ClubFixture = {
  date: string;
  title: string;
  competition: string;
  venue: string;
  ages: string;
  entry: string;
  status: 'selected-squad' | 'self-entry';
  source: string;
};

export type HolidayProgramme = {
  startDate: string;
  endDate: string;
  title: string;
  venue: string;
  ages: string;
  bookingUrl: string;
  bookingLabel: string;
};

export type TrackEvent = {
  startDate: string;
  endDate?: string;
  title: string;
  type: 'open-meet' | 'community' | 'schools';
  venue: string;
  audience: string;
  details: string;
  actionUrl: string;
  actionLabel: string;
};

// This is the public Track Academy calendar. Staff update this file (or its future CMS
// equivalent); the website automatically hides completed items in the visitor's browser.
// Do not add every open meeting here: Power of 10 remains the authoritative live finder.
export const calendarLinks = {
  powerOf10: 'https://www.thepowerof10.info/fixtures/fixtureslookup.aspx',
  spond: 'https://spond.com/invite/DGRNR',
  competingMembership: 'mailto:admin@trackacademy.co.uk?subject=Competing%20club%20membership%20enquiry',
};

export const calendarLastReviewed = '2026-07-24';

export const clubFixtures: ClubFixture[] = [
  {
    date: '2026-07-26',
    title: 'MYAL Fixture 4',
    competition: 'Middlesex Youth Athletics League',
    venue: 'Parliament Hill Track',
    ages: 'U12–U16',
    entry: 'Selected squad — details and selections are shared in Spond.',
    status: 'selected-squad',
    source: 'Track Academy fixture calendar',
  },
];

// Add confirmed school-holiday offers here only once the registration route, dates,
// venue and age range are approved. An empty calendar is intentional and truthful.
export const holidayProgrammes: HolidayProgramme[] = [];

// Only confirmed public events belong here. Completed events are automatically
// hidden in the browser, so the page never presents last season's dates as current.
export const trackEvents: TrackEvent[] = [];
