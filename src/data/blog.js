// ============================================================================
// BLOG POSTS — SAMPLE CONTENT
// ----------------------------------------------------------------------------
// These posts demonstrate the blog layout. They describe only what Kettli's
// own photos show, but they were not written by Kettli — replace or approve
// them before launch. `photo` is a key from src/data/media.js.
// ============================================================================

export const posts = [
  {
    slug: 'inside-the-hi-tea-platter',
    category: 'Food',
    title: 'Inside the Hi-Tea Platter: three tiers, one table',
    date: '2026-09-28',
    author: 'Kettli Team',
    photo: 'hiteaLabelled',
    excerpt:
      'Samosas and wings on top, pakora and sandwiches in the middle, burgers, bun kabab and jalebi at the base — here is how the platter comes together.',
    body: [
      'Hi-tea is a Pakistani institution: the late-afternoon spread that somehow always turns into dinner. The Kettli Hi-Tea Platter takes that idea and stacks it three tiers high.',
      'The top tier is the crunch — aloo samosa and peri peri wings. The middle tier brings mix pakora, aloo pakora and grilled sandwiches. The base holds the heavy hitters: Afghani burgers, bun kabab and a handful of fresh jalebi to finish.',
      'It starts at Rs 2,999 and is built to be shared, ideally with a round of karak chai. Bring the whole group.',
    ],
  },
  {
    slug: 'live-music-on-the-roof',
    category: 'Live music',
    title: 'Live music on the roof',
    date: '2026-09-10',
    author: 'Kettli Team',
    photo: 'liveStageCrowd',
    excerpt:
      'An acoustic duo, a full rooftop and Islamabad glowing in the background. A look at what our live nights feel like.',
    body: [
      'There is something about live music on a rooftop. The sound carries a little further, the conversations get a little quieter, and nobody is in a hurry to leave.',
      'Our acoustic nights put a small stage under the KETTLI sign, with guitar and vocals and the city lights behind. Tables fill up early, so arrive with time to order.',
      'We announce every night on Instagram first — follow @_kettli so you do not miss the next one.',
    ],
  },
  {
    slug: 'why-chai-tastes-better-after-midnight',
    category: 'Late nights',
    title: 'Why chai tastes better after midnight',
    date: '2026-08-22',
    author: 'Kettli Team',
    photo: 'stringLights',
    excerpt:
      'A small theory about karak chai, honey malai paratha and the conversations that only happen late.',
    body: [
      'Ask anyone in Islamabad and they will tell you: the best chai is the one you have at 1 AM with people you did not plan to see.',
      'Maybe it is the cooler air on the roof, maybe it is the string lights, or maybe it is that a honey malai paratha simply makes more sense after midnight.',
      'Whatever the reason, the kettle stays on until around 3 AM. Pull up a chair.',
    ],
  },
];

export const blogCategories = ['All', ...new Set(posts.map((post) => post.category))];

/** Rough reading time at ~200 words a minute, e.g. "2 min read". */
export function readingTime(post) {
  const words = post.body.join(' ').split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) || null;
}

/** The posts either side of `slug`, for previous/next links. */
export function getAdjacentPosts(slug) {
  const index = posts.findIndex((post) => post.slug === slug);
  return { newer: posts[index - 1] || null, older: posts[index + 1] || null };
}
