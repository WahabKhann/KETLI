# Kettli Website — UX Audit and Implementation Direction

Last updated: 6 September 2026

## September production-readiness pass

The latest review incorporated the supplied Kettli logo and resolved the following customer-facing issues:

- Replaced the cool white/gray surface palette with layered butter, saffron, and warm-yellow surfaces derived from the logo.
- Replaced Bodoni Moda and Plus Jakarta Sans with Cormorant Garamond and Manrope for a warmer editorial hierarchy and clearer interface text.
- Added the real Kettli logo to navigation, mobile navigation, footer, and favicon.
- Replaced icon-based media placeholders across menu, events, stories, About, and social gallery components with optimized photographic WebP assets.
- Rebuilt the Instagram gallery as a responsive editorial mosaic.
- Fixed conflicting `relative`/`absolute` media positioning that could push hero content below the first viewport.
- Removed opacity-dependent entrance states so essential content remains visible even when animation timing is delayed.
- Replaced the simulated contact-form success state with a transparent WhatsApp handoff that lets visitors review their message before sending.
- Removed unverified branches from the public Locations page.
- Removed fabricated sample events from public routes while retaining them as unpublished development fixtures.
- Added a real favicon, theme color, hero preload, and Open Graph image.

Generated food and lifestyle photography is representative concept media, not documentary photography of the restaurant. Replace it with approved Kettli originals when available.

## Brand refinement — yellow, orange, and black

The visual system now follows the supplied Kettli mark more directly:

- Saffron yellow is the dominant customer-facing surface color.
- Soft butter yellow provides readable card and content surfaces.
- Orange is used gently at gradient edges and for tonal depth.
- Charcoal black anchors navigation, hero media, featured-menu storytelling, and the footer.
- Kugile is the requested heading family with a generic sans-serif fallback; Manrope remains the body and interface face.

Kugile is a commercial font. A licensed webfont file must be supplied before deployment if visitors are expected to see it consistently. The code uses `Kugile, sans-serif` now and does not bundle an unlicensed demo file.

## Objective

Evolve the current React concept into a cinematic, premium late-night restaurant experience inspired by the storytelling rhythm of Basha Istanbul, without copying its identity or presenting unverified Kettli content as fact.

## Benchmark findings

The Basha Istanbul homepage uses a direct hospitality funnel:

1. An immediate cuisine and location proposition.
2. Strong hero media with a clear ordering action.
3. A short authenticity story.
4. A visual presentation of signature dishes.
5. Supporting experience and editorial content.
6. Repeated conversion opportunities for ordering or booking.

Kettli should adopt that narrative clarity while differentiating itself through a nocturnal Islamabad café identity: chai, comfort food, warm light, close tables, and conversations that continue late into the night.

## Current-state audit

### What already works

- React, Vite, and Tailwind provide a clean maintainable base.
- Shared buttons, containers, headings, metadata, navigation, and cards are already componentized.
- Keyboard focus styling and reduced-motion CSS are present.
- Business configuration and editable content are separated from components.
- The yellow, charcoal, and cream palette is a strong starting point.

### Main experience gaps

- All key media slots are placeholder gradients, so the site cannot currently communicate atmosphere or appetite.
- The homepage is a sequence of similarly weighted sections and grids; it lacks a strong visual crescendo.
- Motion is limited to a generic IntersectionObserver fade-and-rise treatment.
- There is no WebGL, GSAP, or cinematic media foundation yet.
- Menu, event, review, and three branch records are explicitly unverified placeholders.
- The contact form simulates success without sending data.
- The current review section foregrounds negative summaries, which is useful internally but weak as landing-page marketing.
- Four location cards are shown even though only F-10/4 is verified.

## Creative direction

- Mood: warm, intimate, tactile, nocturnal, social.
- Visual language: deep charcoal, warm cream, tea brown, restrained Kettli yellow, brass-like highlights, subtle grain.
- Typography: expressive editorial display type paired with a precise modern sans-serif.
- Photography: close crops, real texture, shallow depth of field, hands and human moments rather than staged portraits.
- Motion: slow media drift, masked reveals, staggered typography, and restrained pointer response.

## Homepage information architecture

1. Full-viewport cinematic hero with an opening-hours signal and two primary actions.
2. Oversized brand statement introducing the late-night Kettli proposition.
3. Editorial signature-menu showcase with one dominant item and supporting selections.
4. Full-bleed experience section focused on people and atmosphere.
5. A concise location section centered on the verified F-10/4 branch.
6. Selected real social proof once approved review quotes are available.
7. Instagram/editorial gallery.
8. Final order, call, and directions conversion section.

## Motion and WebGL rules

- Three.js renders through its own `requestAnimationFrame` loop.
- GSAP targets explicit properties such as `mesh.rotation`, `mesh.position`, `mesh.scale`, uniforms, or `material.opacity`; it never targets a Three.js object directly.
- React effects clean up timelines, ScrollTriggers, observers, textures, materials, geometries, renderers, and event listeners.
- `prefers-reduced-motion` receives a stable, non-animated composition.
- Device pixel ratio is capped and WebGL pauses while the document is hidden.
- Motion uses tactile easing such as `power2.out` and `power3.inOut`.

## Finalized brand color direction

The interface now uses flat, deliberate brand surfaces instead of blending yellow, orange, and white across sections.

- `#FAD643` — primary yellow surface.
- `#FDC921` — brighter yellow for alternating sections and emphasis.
- `#EDC531` — deeper yellow for secondary surfaces and selected states.
- `#FFD300` — primary background across light page and content sections.
- `#F5B800` — contrasting brand yellow for menu cards and location cards.
- White — high-contrast typography within shared black page headers and the homepage hero.
- `#FFB300` — consistent hover accent for buttons, links, navigation, filters, and media controls.
- Near-black charcoal — navigation, footer, typography, and high-contrast editorial sections.

Orange is not used as a large competing background. White has been removed as a primary section color. Gradients are reserved for dark overlays on media where they are required for readable text, rather than used as decorative section backgrounds.

## Media plan

The repository now includes generated concept artwork for the first implementation milestone. These images are not documentary photographs of Kettli and must be replaced with approved restaurant photography before production launch.

Priority production footage:

- Chai pouring and visible steam.
- Paratha or grill preparation.
- Food arriving at a table.
- Friends sharing tea in warm low light.
- Interior wide shot after dark.
- Exterior/signage arrival shot.

Initial stock-video candidates for stakeholder review:

- Pexels — “Pouring a cup of tea in a cafe” by Nathan J Hilton: https://www.pexels.com/video/pouring-a-cup-of-tea-in-a-cafe-17512963/
- Coverr — “Pouring Chai tea into cups”: https://coverr.co/videos/pouring-chai-tea-into-cups-1yql1faost

The selected source file should be downloaded and archived with its creator, source URL, and license record before it is added to production. The current hero uses concept artwork until that selection is approved.

Delivery targets:

- 5–10 second seamless loops.
- Local WebM and MP4 sources.
- Separate desktop and mobile crops where practical.
- A compressed poster for every video.
- No audio autoplay.
- Lazy loading and viewport-aware playback below the fold.

## Implementation phases

### Phase 1 — in progress

- Introduce GSAP and Three.js.
- Add a reusable cinematic media component.
- Build a lightweight atmospheric WebGL hero layer.
- Redesign navigation and homepage hierarchy.
- Replace key placeholders with concept artwork.
- Establish lifecycle-safe motion utilities.

### Phase 2

- Redesign Menu, About, and Locations using the new system.
- Replace the menu grid with a stronger browse/filter experience.
- Show only verified locations.
- Add approved media and real menu data.

### Phase 3

- Redesign Events, Contact, detail pages, and footer.
- Connect a real enquiry endpoint or remove the simulated form submission.
- Add real review quotations and structured data.

### Phase 4

- Cross-browser and device QA.
- WebGL fallback testing.
- Video compression and Core Web Vitals optimization.
- Accessibility and reduced-motion audit.
- Final content verification.

## Production blockers

- Approved Kettli logo files and brand guidelines.
- Rights-cleared Kettli photography/video or approved licensed stock selections.
- Verified menu items and prices.
- Confirmation of branches beyond F-10/4.
- Verbatim review quotes approved for publication.
- Real events/editorial content.
- Destination for contact form submissions.
