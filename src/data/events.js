// ============================================================================
// EVENTS
// ----------------------------------------------------------------------------
// The kinds of nights below are drawn from Kettli's own photos (live acoustic
// sets on the rooftop, the Hi-Tea Platter). Exact days and times have NOT
// been confirmed — `when` stays general until the owner supplies a schedule.
// `photo` is a key from src/data/media.js.
// ============================================================================

export const events = [
  {
    id: 'acoustic-nights',
    title: 'Live Acoustic Nights',
    when: 'Dates announced on Instagram',
    where: 'Rooftop stage, Kettli F-10/4',
    description:
      'Guitar, vocals and the city lights behind the stage. Grab a table early, order a chai, and stay for the whole set.',
    photo: 'liveAcoustic',
  },
  {
    id: 'hi-tea-evenings',
    title: 'Hi-Tea Evenings',
    when: 'Every evening',
    where: 'Kettli F-10/4',
    description:
      'The three-tier Hi-Tea Platter with a round of karak chai — made for birthdays, catch-ups and big tables.',
    photo: 'hiteaPlatter',
  },
  {
    id: 'rooftop-gatherings',
    title: 'Rooftop Gatherings',
    when: 'Seasonal — follow for dates',
    where: 'Under the string lights',
    description:
      'Special nights on the roof for sehri, festivals and the moments worth staying up for.',
    photo: 'stringLights',
  },
];

export const hostingOptions = [
  'Birthdays & surprise dinners',
  'Live music & open mics',
  'Hi-Tea for groups',
  'Team dinners & meetups',
  'Sehri & iftar gatherings',
  'Private rooftop bookings',
];
