// Every photo slot on the site, in one place. To swap a picture, drop the
// file into public/images/kettli/ and change its `src` here — no component
// code needs to change.
//
// The originals live in src/assets/images; these are resized WebP copies.
// width/height are the files' real pixel sizes (used to reserve space);
// srcSet adds an 800px copy so phones download less.

const dir = '/images/kettli';

export const photos = {
  rooftopSign: {
    src: `${dir}/rooftop-sign.webp`,
    srcSet: `${dir}/rooftop-sign-800.webp 800w, ${dir}/rooftop-sign.webp 1170w`,
    width: 1170,
    height: 1560,
    alt: 'Kettli rooftop at night, string lights over a full terrace above the lit KETTLI sign',
  },
  rooftopMural: {
    src: `${dir}/rooftop-mural.webp`,
    srcSet: `${dir}/rooftop-mural-800.webp 800w, ${dir}/rooftop-mural.webp 1170w`,
    width: 1170,
    height: 1559,
    alt: 'Friends at a rooftop table above the illuminated Bob Marley mural',
  },
  muralNight: {
    src: `${dir}/mural-night.webp`,
    width: 465,
    height: 648,
    alt: 'The KETTLI marquee sign above the Bob Marley mural after dark',
  },
  barCounter: {
    src: `${dir}/bar-counter.webp`,
    width: 483,
    height: 648,
    alt: 'Mocktails on the counter under the BAR sign and woven lanterns',
  },
  pizzaMocktail: {
    src: `${dir}/pizza-mocktail.webp`,
    width: 478,
    height: 746,
    alt: 'Pizza on a wooden board with a mocktail, beside a painted wall',
  },
  liveAcoustic: {
    src: `${dir}/live-acoustic.webp`,
    srcSet: `${dir}/live-acoustic-800.webp 800w, ${dir}/live-acoustic.webp 1170w`,
    width: 1170,
    height: 1560,
    alt: 'Guests watching an acoustic duo play under the KETTLI sign',
  },
  liveStageCrowd: {
    src: `${dir}/live-stage-crowd.webp`,
    srcSet: `${dir}/live-stage-crowd-800.webp 800w, ${dir}/live-stage-crowd.webp 1170w`,
    width: 1170,
    height: 1560,
    alt: 'A full rooftop crowd at a live acoustic set at Kettli',
  },
  eventAudience: {
    src: `${dir}/event-audience.webp`,
    srcSet: `${dir}/event-audience-800.webp 800w, ${dir}/event-audience.webp 1170w`,
    width: 1170,
    height: 1560,
    alt: 'Guests seated on the rooftop enjoying a live performance',
  },
  stringLights: {
    src: `${dir}/string-lights.webp`,
    srcSet: `${dir}/string-lights-800.webp 800w, ${dir}/string-lights.webp 1170w`,
    width: 1170,
    height: 1560,
    alt: 'Families relaxing under string lights on the Kettli rooftop',
  },
  rooftopCrowd: {
    src: `${dir}/rooftop-crowd.webp`,
    srcSet: `${dir}/rooftop-crowd-800.webp 800w, ${dir}/rooftop-crowd.webp 1170w`,
    width: 1170,
    height: 1560,
    alt: 'A packed rooftop event at Kettli with the city lights behind',
  },
  hiteaPlatter: {
    src: `${dir}/hitea-platter.webp`,
    srcSet: `${dir}/hitea-platter-800.webp 800w, ${dir}/hitea-platter.webp 1170w`,
    width: 1170,
    height: 1463,
    alt: 'The three-tier Kettli Hi-Tea Platter',
  },
  hiteaLabelled: {
    src: `${dir}/hitea-platter-labelled.webp`,
    srcSet: `${dir}/hitea-platter-labelled-800.webp 800w, ${dir}/hitea-platter-labelled.webp 1170w`,
    width: 1170,
    height: 1463,
    alt: 'Hi-Tea Platter tiers labelled: samosa, wings, pakora, sandwiches, burgers, bun kabab and jalebi',
  },
  hiteaCrunch: {
    src: `${dir}/hitea-crunch.webp`,
    srcSet: `${dir}/hitea-crunch-800.webp 800w, ${dir}/hitea-crunch.webp 1170w`,
    width: 1170,
    height: 1463,
    alt: 'Close-up of pakora and aloo samosa from the Hi-Tea Platter',
  },
  karakChai: {
    src: `${dir}/karak-chai-paratha.webp`,
    srcSet: `${dir}/karak-chai-paratha-800.webp 800w, ${dir}/karak-chai-paratha.webp 1170w`,
    width: 1170,
    height: 1463,
    alt: 'Mugs of karak chai with a honey malai paratha and the Hi-Tea Platter',
  },
};

// The four-up strip under the visit section on the homepage.
export const photoStrip = [
  photos.barCounter,
  photos.muralNight,
  photos.pizzaMocktail,
  photos.rooftopMural,
];

// The events page gallery.
export const eventGallery = [
  photos.liveStageCrowd,
  photos.liveAcoustic,
  photos.eventAudience,
  photos.rooftopCrowd,
  photos.stringLights,
  photos.rooftopMural,
];
