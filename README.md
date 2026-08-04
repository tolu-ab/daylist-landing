# Daylist — landing page

Marketing site for [Daylist](https://github.com/tolu-ab/daylist): capture the chaos,
delegate the doing, and get your day back for the things that matter.

Three sections: a 3D plush-meadow hero with giant display type and glassmorphic UI,
an interactive demo (ramble a voice note → sorted inbox → delegate → Daylist runs →
approval card → time handed back), and a closing section where a scroll-revealed
isometric diorama shows the helper at work across inbox, apps, memory, and messages.
The footer is a wide meadow scene: Daelist at his desk, back turned, working while
people play and picnic around him.

## Stack

React + TypeScript + Vite + Tailwind CSS 3 + shadcn/ui. The artwork is AI-generated
2K renders (`public/art/hero-meadow.png`, `public/art/diorama.png`,
`public/art/footer-meadow.png` — too large for the git push API, not committed);
sky, clouds, and motion are pure CSS/SVG.

## Develop

```bash
npm install
npm run dev     # Vite dev server
npm run build   # production build to dist/
```

The demo is a front-end simulation — nothing persists or leaves the browser.
The real app lives at [app.daylists.co](https://app.daylists.co).
