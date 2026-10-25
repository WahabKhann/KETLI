# Kettli — Website Concept

A premium restaurant/café website concept for **Kettli** (Islamabad), built as
a proposal for the restaurant owner. React + Vite + Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## What's real vs. placeholder

**Real** (from Kettli's Google listing and Kettli's own photos):

- F-10/4 address, phone, rating (3.8 / 94 reviews), Instagram, Foodpanda link —
  `src/data/siteConfig.js`, `src/data/locations.js`.
- All photography — originals in `src/assets/images/`, resized WebP copies in
  `public/images/kettli/`, mapped to named slots in `src/data/media.js`.
- The Hi-Tea Platter (from Rs 2,999) and its contents, Karak Chai and Honey
  Malai Paratha — `src/data/menu.js`.

**Placeholder** (replace before launch):

- Most menu items and prices — `src/data/menu.js` (`price: null` shows "—").
- Event schedules — `src/data/events.js` keeps `when` general until confirmed.
- Blog posts — `src/data/blog.js` is sample writing for the layout.
- Review excerpts — `src/data/reviews.js` paraphrases review themes; swap in
  approved verbatim quotes.

## Changing photos

Drop a new image into `public/images/kettli/` and point the matching entry in
`src/data/media.js` at it. Every page reads photos from that one file.

## Project structure

```
src/
├── components/
│   ├── layout/     Navbar, MobileMenu, Footer
│   ├── ui/         Button, Container, PageHeader, CinematicMedia, RevealOnScroll
│   ├── home/       Hero
│   ├── menu/       MenuBoard (the boxed, monospace menu)
│   ├── sections/   VisitSection (map), PhotoStrip, Specials, EventsBand,
│   │               BlogTeaser, Reviews, CtaBand — shared across pages
│   └── blog/       PostCard
├── pages/          Home, Menu, Events, Blog, BlogPost, About, Locations,
│                   Contact, NotFound
├── data/           All editable content — menu, events, blog, media, config
├── lib/            formatDate.js
└── hooks/          useScrollPosition, usePageMeta
```

## Design system

Black and Kettli gold, with depth. Tokens live as CSS variables in
`src/index.css` and are exposed to Tailwind in `tailwind.config.js`:

| Token (CSS / Tailwind)            | Value     | Use                                   |
| --------------------------------- | --------- | ------------------------------------- |
| `--bg` / `night`                  | `#0D0D0C` | nav, dark bands, footer               |
| `--surface-1`, `-2` / `surface-*` | `#141413`, `#1B1B19` | card gradient              |
| `--border` / `line`               | gold, low opacity | hairlines                     |
| `--text` / `fg`                   | `#FFFFFF` | text on dark                          |
| `--text-muted` / `fg-muted`       | `#B9B4A8` | secondary text on dark (≥ 8.3:1)      |
| `--accent` / `accent`             | `#FFD300` | gold: bands, accents, buttons         |
| `--accent-deep` / `accent-deep`   | `#F5B800` | gold gradient end                     |
| `--accent-ink` / `accent-ink`     | `#0D0D0C` | text on gold buttons                  |
| `--ink` / `ink`                   | `#1A1A18` | text on gold (≥ 9.7:1)                |
| `--ink-muted` / `ink-muted`       | `#3D3300` | secondary text on gold (≥ 7:1)        |

Also: radius (`rounded-card`, `rounded-media`), shadows (`shadow-card`,
`shadow-lift`, `shadow-glow`) and a type scale (`text-display`, `text-h1`…
`text-h5`, `text-lead`, `text-body`, `text-caption`).

- **Gold bands**: use `surface-gold` (radial gradient + faint grain), not a flat fill.
- **Cards**: the shared `.card` class (gradient surface, inner highlight, layered shadow).
- **Buttons** (`Button.jsx` → `.btn-*`): `primary`/`secondary` on black,
  `dark`/`ghost` on gold. Solid buttons glow on hover; outline buttons get a
  glass fill; all press down on click.
- **Motion**: `useTilt` (menu cards), `useParallax` (hero, page headers),
  `RevealOnScroll` (fade + rise), the coverflow `PhotoStrip`. All of it turns
  off under `prefers-reduced-motion`.
- **Fonts**: headings use `Kugile` → `Bricolage Grotesque` (Google Fonts) as a
  stand-in until the licensed Kugile `.woff2` files are added — see the
  commented `@font-face` at the top of `src/index.css`. Body: Manrope.

## Map

`KettliMap.jsx` uses Leaflet with OpenStreetMap tiles (no API key), darkened
with a CSS filter. The pin position is `coordinates` in `src/data/siteConfig.js`.
The mouse wheel zooms the map directly. OSM's tile servers are fine for a
small site; for heavy traffic, switch to a paid tile provider.

## Deploying

This is a single-page app: configure the host to serve `index.html` for every
route (e.g. a Netlify `_redirects` rule or Vercel rewrite), otherwise
refreshing `/menu` or `/blog/...` returns a 404.
# KETLI
