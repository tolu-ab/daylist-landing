# Daylist — landing page

Marketing site for [Daylist](https://github.com/tolu-ab/daylist): capture the chaos,
delegate the doing, and get your day back for the things that matter.

Three sections: a 3D plush-meadow hero with giant display type and glassmorphic UI,
an interactive demo (ramble a voice note → sorted inbox → delegate → Daylist runs →
approval card → time handed back), and a closing CTA with feature cards.

## Stack

React + TypeScript + Vite + Tailwind CSS 3 + shadcn/ui. The meadow artwork is an
AI-generated 2K render; sky, clouds, and motion are pure CSS/SVG.

## Develop

```bash
npm install
npm run dev     # Vite dev server
npm run build   # production build to dist/
```

The demo is a front-end simulation — nothing persists or leaves the browser.
The real app lives at [app.daylists.co](https://app.daylists.co).

## Repo notes

- `public/art/hero-meadow.png` (the 2K meadow artwork) is not committed here — add it
  before building, or the hero/closing art will 404. It's included in the original
  project export.
- The unused vendored `src/components/ui/*` shadcn boilerplate isn't committed either;
  the site imports none of it. Re-add any component with `npx shadcn@latest add <name>`.
- `package-lock.json` is omitted — `npm install` regenerates it.
