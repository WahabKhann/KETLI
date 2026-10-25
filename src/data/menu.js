// ============================================================================
// MENU DATA
// ----------------------------------------------------------------------------
// Verified from Kettli's own promo images: the Hi-Tea Platter (from Rs 2,999)
// and what's on it, Karak Chai, and Honey Malai Paratha.
//
// Everything else is PLACEHOLDER — item names and prices are illustrative.
// Replace with the real menu before launch. `price: null` shows an "Ask at
// counter" pill, for real items whose price hasn't been confirmed yet.
// ============================================================================

export const menuSections = {
  'Hi-Tea': {
    items: [{ name: 'Hi-Tea Platter', price: 2999, from: true }],
    note: 'Three tiers: samosa, peri peri wings, pakora, grilled sandwich, Afghani burger, bun kabab, jalebi.',
  },
  Tea: {
    items: [
      { name: 'Karak Chai', price: null },
      { name: 'Kettli Special Chai', price: 250 },
      { name: 'Kashmiri Chai', price: 320 },
      { name: 'Peshawari Qahwa', price: 280 },
    ],
  },
  Coffee: {
    items: [
      { name: 'Kettli Cold Coffee', price: 450 },
      { name: 'Espresso', price: 350 },
    ],
  },
  Parathas: {
    items: [
      { name: 'Honey Malai Paratha', price: null },
      { name: 'Aloo Paratha', price: 350 },
      { name: 'Cheese Paratha', price: 380 },
      { name: 'Keema Paratha', price: 450 },
    ],
  },
  Sehri: {
    items: [
      { name: 'Sehri Platter', price: 650 },
      { name: 'Halwa Puri', price: 500 },
    ],
  },
  Food: {
    items: [
      { name: 'Club Sandwich', price: 750 },
      { name: 'Loaded Fries', price: 550 },
      { name: 'Chicken Malai Boti', price: 850 },
    ],
  },
  Desserts: {
    items: [
      { name: 'Jalebi (250g)', price: 300 },
      { name: 'Kulfi Falooda', price: 400 },
    ],
  },
  Sheesha: {
    items: [
      { name: 'Classic Sheesha', price: 1200 },
      { name: 'Double Apple Sheesha', price: 1300 },
    ],
  },
};

/** DOM id for a menu category — shared by the board and the sticky nav. */
export const menuSectionId = (name) => `menu-${name.toLowerCase().replace(/[^a-z]+/g, '-')}`;

// Board layout: three boxed columns. 'note' places the callout box.
export const menuBoard = [
  ['Tea', 'Coffee', 'Desserts'],
  ['note', 'Parathas', 'Sehri'],
  ['Hi-Tea', 'Food', 'Sheesha'],
];

export const menuNote = {
  title: 'Open till 3 AM',
  body: [
    'Chai, comfort food and a rooftop that stays awake with you.',
    'Order over the phone or on Foodpanda. Prices on the board at the café are always the latest.',
  ],
};

// Black photo boxes under the menu — the "specials" band.
export const specials = [
  {
    id: 'hitea',
    title: 'The Hi-Tea Platter',
    photo: 'hiteaPlatter',
    intro: 'Three tiers built for the whole table, starting at Rs 2,999.',
    items: [
      { name: 'Top tier', text: 'Aloo samosa and peri peri wings — 4 pieces each.' },
      { name: 'Middle tier', text: 'Mix pakora, aloo pakora and grilled sandwiches — 4 pieces each.' },
      { name: 'Bottom tier', text: 'Afghani burgers, bun kabab and fresh jalebi.' },
    ],
  },
  {
    id: 'chai',
    title: 'Your chai cravings, sorted',
    photo: 'karakChai',
    intro: 'Hi-tea is incomplete without crunch — and chai is incomplete without a paratha.',
    items: [
      { name: 'Karak Chai', text: 'Strong, milky and made for long conversations.' },
      { name: 'Honey Malai Paratha', text: 'Flaky, golden and finished with honey and cream.' },
    ],
  },
];
