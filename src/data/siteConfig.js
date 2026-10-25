// Central brand/config data. Update contact details, links and nav here —
// components read from this file rather than hardcoding values.

export const siteConfig = {
  name: 'Kettli',
  tagline: 'Good food. Better tea.',
  city: 'Islamabad',
  description:
    "Kettli is a cozy late-night restaurant and café in Islamabad — a place for food, tea and conversations that run long.",

  phone: '+92 311 3414743',
  phoneHref: 'tel:+923113414743',
  whatsappUrl: 'https://wa.me/923113414743',
  hostEventUrl:
    'https://wa.me/923113414743?text=' +
    encodeURIComponent("Hi Kettli, I'd like to host an event with you."),

  instagramHandle: '@_kettli',
  instagramUrl: 'https://www.instagram.com/_kettli/',

  foodpandaUrl:
    'https://www.foodpanda.pk/food-ordering?c=pk&s=s&vc=say8&adj_t=1naixy2v_1nsybtos&adj_campaign=google_reserve_place_order_action_CH-SEO_&adj_deep_link=foodpanda%3A%2F%2F%3Fc%3Dpk%26s%3Ds%26vc%3Dsay8&adj_fallback=https://foodpanda.pk/restaurant/say8/kettli-f-10',

  rating: 3.8,
  reviewCount: 94,
  priceRange: 'Rs 1,000–2,000 per person',

  // Kettli F-10/4 pin, from its Google Maps listing.
  coordinates: { lat: 33.6912297, lng: 73.0110345 },
};

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Events', to: '/events' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Locations', to: '/locations' },
  { label: 'Contact', to: '/contact' },
];

export const footerLinks = {
  navigation: navLinks,
};
