// Review/rating data for Kettli F-10/4.
//
// rating and reviewCount are verified from the supplied Google Business
// listing. The excerpts below are paraphrased summaries of the review
// THEMES supplied in the project brief — not verbatim quotes, since no
// exact review text was provided. When real review text is available,
// replace `text` with the verbatim quote and add a `reviewer` field.

export const reviewSummary = {
  rating: 3.8,
  outOf: 5,
  reviewCount: 94,
  source: 'Google',
};

export const reviews = [
  {
    id: 1,
    sentiment: 'positive',
    tag: 'Atmosphere',
    text: 'Praised as a super cozy spot — a comfortable place to bring friends or a partner.',
  },
  {
    id: 2,
    sentiment: 'positive',
    tag: 'Tea',
    text: "Specifically called out for its tea, described as a highlight of the visit.",
  },
  {
    id: 3,
    sentiment: 'negative',
    tag: 'Wait times',
    text: 'Some visitors have reported longer-than-expected waits, especially at peak hours.',
  },
  {
    id: 4,
    sentiment: 'negative',
    tag: 'Food quality',
    text: 'A few reviews mention food arriving cold or falling short on quality and pricing.',
  },
];
