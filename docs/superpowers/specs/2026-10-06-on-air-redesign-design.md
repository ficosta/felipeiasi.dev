# On Air — redesign of felipeiasi.dev

Date: 2026-10-06 · Branch: `redesign/on-air` · Status: awaiting review

## Goal

Replace the current "AI template" look (purple gradients, glassmorphism, glow,
skill-percentage bars, 8 surprise themes, custom cursor) with a distinctive,
clean and imposing identity that positions Felipe as a **Broadcast Solutions
Architect** for recruiters and engineering leadership.

Success: a recruiter understands in 5 seconds *who* (Broadcast Solutions
Architect, 18+ years), *proof* (CNN Brasil, Bild, Band, Riot…) and *how he
thinks* (each project explained as a system, with a signal-flow diagram).

## Decisions already made

| Topic | Decision |
|---|---|
| Audience | Recruiters / tech leadership for Solution Architect roles |
| Direction | "On Air": dark, broadcast grammar used with restraint |
| Projects | Shown as a multiviewer; each opens a case file with a signal-flow diagram |
| Years | "18+" |
| Language | English everywhere |
| Content source | LinkedIn (6 Oct 2026) overrides stale `site.json` data |
| Themes | Single dark theme. Light, Surprise and ThemeSwitch are removed |

## Visual system

**Tokens** (CSS custom properties in `src/index.css`, exposed to Tailwind v4 via `@theme`):

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0A0A0B` | page background |
| `--color-fg` | `#ECEBE6` | primary text |
| `--color-dim` | `#8A8984` | secondary text, mono labels |
| `--color-line` | `#232325` | 1px rules, multiviewer gutters |
| `--color-panel` | `#141416` | tile / case-file surfaces |
| `--color-tally` | `#FF2D1F` | **only** "live / current": current job, PGM tile, tally dot |

The tally red is never decorative. If something is red, it is current.

**Type** (self-hosted woff2 in `public/fonts/`, no runtime Google Fonts):
- **Archivo** variable (`wdth` 62–125, `wght` 100–900).
  - Display uses `wdth 62–72`, weight 800, uppercase.
  - Body uses `wdth 100`.
- **JetBrains Mono** 400/500 for technical labels: 11px, uppercase, `letter-spacing .08em`.

**Geometry:** square corners everywhere, 1px rules, hero safe-area corner
marks. No `rounded-*`, `backdrop-blur`, shadows, glows or gradients.

**Motion:** framer-motion is kept, used sparingly.
- **Entrances:** a lower third cuts in as a 200 ms horizontal wipe (`clip-path`). Section headers fade.
- **Tiles:** hovering a multiviewer tile plays its muted `video` banner, if one exists.
- **Case file:** opens with a 150 ms cut, with no scale or spring.
- **Reduced motion:** all of the above are disabled under `prefers-reduced-motion`.

## Page structure

1. **TopBar** (sticky)
   - Left: tally dot + `ON AIR — MADRID, ES`.
   - Right: anchors `SYSTEMS · RUNDOWN · STACK · CONTACT`.
2. **Hero**
   - Safe-area corners.
   - Mono labels: `TC 18:00:00:00 · 18+ YEARS LIVE` and the current role/company.
   - Giant `FELIPE / IASI`.
   - Pixel avatar in grayscale, labelled `CAM 1`.
   - `LowerThird`: "Broadcast Solutions Architect" plus the line *"I design the real-time systems behind live sports, news and elections — where the data has to be right the second it airs."*
3. **AiredOn**
   - Strip of monochrome logos: CNN Brasil, Bild, Band, Record, MTV, RedeTV!, Riot.
   - Logos are normalised to white silhouettes (see Assets).
4. **01 / Systems — Multiviewer**
   - Grid: one large PGM tile (featured project) plus 2×2 source tiles.
   - The 6th project goes in a full-width row below.
   - Every tile has a bottom label bar (`SRC n · TITLE` / context).
   - Click opens the `CaseFile`.
5. **02 / Rundown**
   - Career as a table: period · role · company · location. The current row is tally red.
   - Rows expand to show highlights.
6. **03 / Stack**
   - Technologies grouped by architecture layer, with no percentages:
     - Ingest & Data
     - Cloud & Infra
     - Real-time & Broadcast
     - Frontend
     - AI
7. **04 / Credentials**
   - Education, languages and a talks list (EBU, AWS, Axel Springer).
   - Certifications: AWS Solutions Architect Associate and Viz Artist Designer featured; the rest collapsed.
8. **EndSlate**
   - Big `GET IN TOUCH`, email, LinkedIn, GitHub, YouTube, location/availability line.

## Components (new / replaced)

| Component | Replaces | Responsibility |
|---|---|---|
| `TopBar` | header in `App.tsx` | sticky nav and tally |
| `Hero` (rewritten) | `sections/Hero.tsx` | name, CAM 1 avatar, lower third |
| `LowerThird` | — | reusable title + sub bar with wipe-in |
| `AiredOn` | — | logo strip |
| `Multiviewer`, `SourceTile` | `sections/Projects.tsx`, `ProjectCard.tsx` | project grid |
| `CaseFile` | `ProjectModal.tsx` | full-screen case: header, `SignalFlow`, impact, stack, markdown story, links |
| `SignalFlow` | — | SVG diagram rendered from `project.flow` |
| `Rundown` | `sections/Career.tsx` | career table |
| `StackByLayer` | `sections/Skills.tsx` | layered stack |
| `Credentials` | `Education`, `Languages`, `Certs` | combined section |
| `EndSlate` | `sections/Contact.tsx` | closing contact |
| `SectionHead` | — | `NN / LABEL` + display title + right meta |

**Deleted:**
- Components: `CustomCursor`, `AnimatedGradient`, `ThemeSwitch`, `Hero3D`, `VideoThumbnail` (folded into `SourceTile`), `About`.
- Code: `lib/theme.ts` and the surprise-theme CSS.
- Dependencies: `three`, `@react-three/*` and `tailwindcss-animate`, if they end up unused.

`About` content (long summary) moves into the Hero sub-line plus the EndSlate.

## Data model changes (`src/types/site.ts`, `src/data/site.json`)

```ts
type FlowKind = 'source' | 'process' | 'output';
interface FlowNode { id: string; label: string; tech?: string; kind: FlowKind }
interface FlowEdge { from: string; to: string; label?: string }
interface ProjectFlow { nodes: FlowNode[]; edges: FlowEdge[] }

interface Project {
  // existing fields kept; `type` keeps its 4 values
  client?: string;      // tile context label, e.g. "Riot Games"
  featured?: boolean;   // PGM tile (exactly one)
  flow?: ProjectFlow;
}

interface StackLayer { layer: string; items: string[] }
interface Profile {
  // `skills` removed
  headline: string;     // "Broadcast Solutions Architect"
  tagline: string;      // hero lower-third sub line
  years: string;        // "18+"
  stackByLayer: StackLayer[];
}
```

`SignalFlow` layout:
- Nodes are placed in columns by `kind` (sources → processes → outputs), in array order within each column.
- Edges are orthogonal SVG paths.
- Pure layout function `layoutFlow(flow) → {nodes:[{x,y,w,h}], edges:[{d}]}` is unit-tested.
- On narrow screens it renders as a vertical list with arrows.

### Content updates from LinkedIn

- **New current role:** Broadcast Solutions Architect · Team Lead, **Astucemedia**, Jul 2026 – Present, Remote (Spain).
- **Bild dates:**
  - Head of Product and Innovation: Sep 2023 – May 2026.
  - Head of Real Time Broadcast Design: Aug 2021 – Jan 2024.
  - Motion Design Team Lead: Nov 2020 – Jan 2022.
- **Add:** Developer, **dBOTZ**, Dec 2010 – Jan 2015 — systems integration for TV graphics, R&D.
- **Highlights to enrich** (from LinkedIn):
  - CNN Brasil: launch graphics, Vizrt system setup and backup workflows, automated election graphics, finance crawl.
  - Band: 2014 / 2016 Olympics, MasterChef × Twitter integration (1.2M tweets, innovation award).
  - Bild:
    - Ukraine virtual set with Unreal + Aximmetry in one week;
    - coronation and German/US elections live;
    - bridging legacy broadcast with cloud/API systems.
- **Title/meta:** `Felipe Iasi — Broadcast Solutions Architect`. Update `index.html` meta, OG, `theme-color` (`#0A0A0B`), README.

### Draft signal flows (Felipe to verify)

- **CNN Brasil Elections 2026:**
  TSE results API (source) → Ingestion → Validation rules + live fallback → Distribution → TV graphics / Web / Social (outputs). Edge note: "~300 ms fetch-to-screen".
- **Teaserfly:**
  Article CMS (source) → Teaserfly UI (React/TS) → Node API on AWS → OpenAI (copy) + Amazon Rekognition (crops) → Teaser formats → Bild.de / BILDplay / Social.
- **Quem Fica em Pé:**
  Question CMS on PostgreSQL (source) → Game engine (C#: rounds, scoring, prizes) → Vizrt connector (TCP) → Studio wall graphics; Game engine → Teleprompter (outputs).
- **CBLOL Telemetry:**
  10 × Zephyr sensors (source) → Bluetooth reader on NUC under stage (decode, normalise) → TCP stream → Telemetry controller in control room (JSON, monitoring) → UDP → Vizrt / wTVision on air.
- **BlueMarble:**
  NOAA GFS GRIB2 (source) → cfgrib/xarray decode → Derived variables → GDAL reproject (EPSG:3857) → Parallel tile render → S3/MinIO → Leaflet + wind particles.
- **Vizrt Birds:**
  Touchscreen input (source) → VBA physics loop (projectile, collisions) → State machine → Viz Artist render.

Featured (PGM): CNN Brasil Elections 2026.

## Assets

- **CNN Brasil logo:** add `public/logos/cnn-brasil.svg` and `cnn-brasil-red.svg`. Both are from Wikimedia Commons (public domain) and were checked for scripts. They replace the generic CNN mark used for the project and the CNN Brasil job.
- **AiredOn strip:** needs single-colour versions. Logos with baked-in backgrounds (Bild, Band, Record, MTV) render as blobs under a CSS filter. Source clean marks (SVG paths, filled `currentColor`) into `public/logos/`. If no clean mark is found, use a mono text wordmark in that slot rather than a broken logo.
- **Avatar:** keep `assets/avatar.jpg`; CSS grayscale applied in the hero only.

## Responsive

- Breakpoints: 640 / 1024.
- Below 1024:
  - the hero name shrinks with `clamp()`, and the avatar moves above the lower third;
  - the multiviewer becomes 1 column with PGM first;
  - the rundown becomes stacked rows.
- 16px side gutters on mobile; no horizontal scroll.

## Accessibility

- Contrast:
  - `fg` on `bg` is about 16:1.
  - `dim` on `bg` is about 5.6:1, so labels pass AA.
  - Red is never the only signal: current rows also say "NOW".
- `CaseFile` is a real dialog: focus trap, Esc, returns focus to its tile.
- Tiles are buttons with accessible names.
- `SignalFlow` SVG has a `<title>`, and the same flow is rendered as an ordered list for screen readers.

## Out of scope

- Rewriting the long project stories (they render as today, restyled).
- Domain, hosting and deploy changes.
- Blog/writing section.

## Testing

- `npm run build` (tsc + vite) and `npm run lint` clean.
- Add Vitest (dev dependency) with unit tests for:
  - `layoutFlow`: column placement, edge endpoints, unknown node ids throw;
  - a `site.json` shape check (exactly one featured project, every edge references existing nodes).
- Visual check: Playwright screenshots at 1440 and 390 widths, sent to Felipe for review.

## Backlog

- Add **ograf.dev** to Systems (requested 6 Oct 2026).
- Add **storyobjectmodel.dev** to Systems (requested 6 Oct 2026).
- Highlights for the current Astucemedia role (LinkedIn has none yet).
