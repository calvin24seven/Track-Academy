/**
 * Latest attendee reporting figures supplied by Track Academy.
 * Keep these shared across public pages so current audience figures stay aligned.
 */
export const latestReportedYoungPeople = 519;

export const latestReportedDemographics = [
  { number: 64, label: 'from low-income families' },
  { number: 29, label: 'with a disability or long-term health condition' },
  { number: 58, label: 'girls' },
  { number: 90, label: 'from Black, Asian, mixed and other minoritised ethnic backgrounds' },
] as const;

export const latestAnnualReport = {
  year: 2024,
  href: '/pdfs/annual-report-2024.pdf',
};
