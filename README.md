<div align="center">
  <img src="public/apple-touch-icon.png" alt="Felipe Iasi" width="120" height="120" style="border-radius: 50%;" />

  # Felipe Iasi

  **Broadcast Solutions Architect**

  [![Portfolio](https://img.shields.io/badge/Portfolio-felipeiasi.dev-0A0A0B?style=flat-square)](https://felipeiasi.dev)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-felipe--iasi-0077B5?style=flat-square)](https://www.linkedin.com/in/felipe-iasi)
  [![GitHub](https://img.shields.io/badge/GitHub-ficosta-181717?style=flat-square)](https://github.com/ficosta)
</div>

## About

Personal site of a Broadcast Solutions Architect with 18+ years in live sports, news and digital production. Projects are presented as systems: each case file opens with a signal-flow diagram of the architecture.

## Design: "On Air"

Single dark theme built on broadcast grammar, used with restraint:

- Lower thirds, safe-area marks, timecode labels and a multiviewer for projects
- Tally red (`--color-tally`) means only one thing: live / current
- Archivo (condensed for display) + JetBrains Mono for technical labels, self-hosted
- Square corners, 1px rules, no gradients or glass

## Tech Stack

- React 19 + TypeScript (strict)
- Vite
- Tailwind CSS v4 (tokens in `src/index.css`)
- Framer Motion (sparingly; respects `prefers-reduced-motion`)
- Vitest

## Installation

```bash
git clone https://github.com/ficosta/felipe-portfolio.git
cd felipe-portfolio
npm install
npm run dev
```

## Build

```bash
npm test
npm run lint
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/       # TopBar, LowerThird, SourceTile, CaseFile, SignalFlow…
├── sections/         # Hero, AiredOn, Systems, Rundown, Stack, Credentials, EndSlate
├── lib/              # content loader, flow layout (layoutFlow)
├── types/            # TypeScript types
└── data/             # Content (site.json)
public/logos/         # single-colour broadcaster marks for the dark theme
```

## Editing content

Everything lives in `src/data/site.json`. A project's diagram comes from its `flow`:

```json
"flow": {
  "nodes": [{ "id": "tse", "label": "TSE results API", "tech": "Official feed", "kind": "source" }],
  "edges": [{ "from": "tse", "to": "ingest", "label": "~300 ms" }]
}
```

`kind` is `source`, `process` or `output`; processes are laid out left to right in array order. `npm test` checks that every edge points at an existing node and that exactly one project is `featured` (the PGM tile).

## License

Open source - available for reference

---

© 2026 Felipe Iasi | Built with React & Tailwind CSS
