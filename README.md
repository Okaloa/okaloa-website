# Okaloa Website

The official website for **Okaloa**

- **Live site:** [okaloa-website.vercel.app](https://okaloa-website.vercel.app)
- **CMS (Sanity Studio):** [okaloa.sanity.studio](https://okaloa.sanity.studio)
- **Vercel project:** [vercel.com/okaloa/okaloa-website](https://vercel.com/okaloa/okaloa-website)

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | [Astro](https://astro.build) v7 | Single-page scrollable site, SSR via Vercel adapter |
| **Styling** | Vanilla CSS | Design tokens in `global.css`, scoped styles per component |
| **CMS** | [Sanity.io](https://www.sanity.io) v6 | Headless CMS; content edited in Sanity Studio |
| **Hosting** | [Vercel](https://vercel.com) | Auto-deploys on push to `main`; SSR enabled |
| **Sanity Studio** | Deployed to `sanity.studio` | Separate deploy step required (see below) |
| **Node.js** | `>=22.12.0` | Required for both the website and the Studio |

---

## Repository Structure

```
okaloa-website/
│
├── src/                        # Astro source files
│   ├── components/
│   │   └── SectionBlock.astro  # Reusable section wrapper (title + rich text)
│   ├── layouts/
│   │   └── Layout.astro        # Base HTML layout: nav, footer, global scripts
│   ├── pages/
│   │   └── index.astro         # Main (and only) page; fetches all Sanity content
│   ├── styles/
│   │   └── global.css          # Design tokens, typography, utility classes
│   └── utils/
│       └── sanity.ts           # Sanity client setup + portableTextToHtml renderer
│
├── studio/                     # Sanity Studio (separate app)
│   ├── schemaTypes/
│   │   ├── homepage.ts         # All homepage section fields (titles, content, events)
│   │   ├── richText.ts         # Shared rich text block definition
│   │   ├── sectionContent.ts   # Wrapper type for section content blocks
│   │   ├── event.ts            # Event item schema
│   │   ├── imageBlock.ts       # Inline image block for rich text
│   │   ├── quote.ts            # Pull-quote block
│   │   ├── separator.ts        # Horizontal line separator block
│   │   ├── linkAnnotation.ts           # Hyperlink annotation
│   │   ├── textColorAnnotation.ts      # Text colour annotation
│   │   ├── fontSizeAnnotation.ts       # Font size annotation
│   │   ├── fontFamilyAnnotation.ts     # Font family annotation
│   │   ├── textAlignmentAnnotation.ts  # Text alignment annotation
│   │   ├── lineSpacingAnnotation.ts    # Line spacing annotation
│   │   └── index.ts            # Registers all schema types
│   ├── sanity.config.ts        # Studio config (project ID, dataset, structure)
│   └── sanity.cli.ts           # CLI config
│
├── public/                     # Static assets (images, favicon)
├── astro.config.mjs            # Astro config (Vercel adapter)
├── package.json                # Root scripts and dependencies
├── .env.local                  # Local environment variables (not committed)
├── AGENTS.md                   # AI agent instructions
└── GEMINI.md                   # Project changelog / AI context file
```

---

## Page Sections

The homepage is a single scrollable page. Sections render in this order:

| # | Section ID | Editable title in Sanity? | In nav? |
|---|---|---|---|
| 1 | `#hero` | Title via `heroHeadline` field | — |
| 2 | `#types-of-risk` | Yes — `typesOfRiskTitle` | No |
| 3 | `#de-risking` | Yes — `deriskingTitle` | Yes |
| 4 | `#how-we-engage` | Yes — `engageTitle` | Yes |
| 5 | `#is-this-for-you` | Yes — `whenTitle` | Yes |
| 6 | `#its-working` | Yes — `workingTitle` | Yes |
| 7 | `#about` | Yes — `aboutTitle` | Yes |
| 8 | `#events` | Fixed to "Upcoming Events" | Yes |

If a title field is left blank in Sanity, the hardcoded default is used automatically.

---

## Environment Variables

Create a `.env.local` file in the project root (never commit this):

```env
VERCEL_OIDC_TOKEN=*****
```

- `VERCEL_OIDC_TOKEN` Is added when logging in to vercel and following the setup

---

## Setting Up on a New Machine

### Prerequisites

- [Node.js](https://nodejs.org) `>=22.12.0` (use [nvm](https://github.com/nvm-sh/nvm) to manage versions)
- [Vercel CLI](https://vercel.com/docs/cli): `npm install -g vercel`
- [Sanity CLI](https://www.sanity.io/docs/cli): `npm install -g sanity` (optional — can use `npx`)
- Access to the [Sanity project](https://www.sanity.io/manage/project/b7wqv3yo) and the [Vercel team](https://vercel.com/okaloa)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Okaloa/okaloa-website.git
cd okaloa-website

# 2. Install website dependencies
npm install

# 3. Install Sanity Studio dependencies
cd studio && npm install && cd ..

# 4. Create your local environment file

# 5. Log in to Vercel (first time only)
vercel login

# 6. Link to the Vercel project (first time only)
vercel link
```

---

## Local Development

### Website (Astro)

The dev server runs at **http://localhost:4321** and hot-reloads on file changes.

```bash
# Start in foreground (recommended for active development)
npm run dev

# Start in background (useful when also running Studio)
npx astro dev --background

# Check background server status / logs
npx astro dev status
npx astro dev logs

# Stop background server
npx astro dev stop
```

### Sanity Studio

The Studio runs at **http://localhost:3333** and connects to the live `production` dataset.

```bash
cd studio
npm run dev
```

> **Note:** Changes saved in Sanity Studio write directly to the production dataset. There is currently no staging dataset. Test carefully before publishing.

### Running Both Simultaneously

Open two terminal tabs:

```bash
# Tab 1 — Astro website
npm run dev

# Tab 2 — Sanity Studio
cd studio && npm run dev
```

---

## Building for Production

```bash
# Build the Astro site locally (outputs to ./dist/)
npm run build

# Preview the production build locally
npm run preview
```

---

## Deploying

### Deploy Everything (website + Studio)

```bash
npm run deploy
```

This runs `deploy:website` and `deploy:studio` in sequence.

### Deploy Website Only (Vercel)

```bash
npm run deploy:website
# or directly:
npx vercel --prod
```

Vercel also **auto-deploys** on every push to the `main` branch via the GitHub integration.

### Deploy Sanity Studio Only

The Studio is a separate app hosted on `sanity.studio`. It must be redeployed manually whenever schema changes are made.

```bash
npm run deploy:studio
# or directly from the studio folder:
cd studio && npx sanity deploy
```

---

## Content Editing (Sanity CMS)

All website content is managed through **[okaloa.sanity.studio](https://okaloa.sanity.studio)**.

### What can be edited

- **Section titles** — every section heading can be customised; leaving it blank falls back to the default
- **Section content** — rich text blocks with support for:
  - Bold, italic, underline
  - Headings (H2–H4)
  - Bullet and numbered lists
  - Hyperlinks (`mailto:` and web URLs)
  - Images (with optional caption)
  - Pull quotes
  - Horizontal separators
  - Text colour, font family, font size, text alignment, line spacing
- **Upcoming Events** — add/edit/remove events with title, date, description, and registration link
- **Footer tagline** — the text block under the logo in the footer

### Schema changes

When you add or modify fields in `studio/schemaTypes/`:
1. Update the Sanity schema file(s) in `studio/schemaTypes/`
2. Update the GROQ query in `src/pages/index.astro` to fetch the new fields
3. Redeploy the Studio: `npm run deploy:studio`
4. Redeploy the website: `npm run deploy:website`

---

## Key Files Reference

| File | Purpose |
|---|---|
| [`src/pages/index.astro`](src/pages/index.astro) | Main page — GROQ query, section assembly |
| [`src/layouts/Layout.astro`](src/layouts/Layout.astro) | Nav, footer, global scripts |
| [`src/components/SectionBlock.astro`](src/components/SectionBlock.astro) | Reusable section with title + rich text |
| [`src/utils/sanity.ts`](src/utils/sanity.ts) | Sanity client + PortableText-to-HTML renderer |
| [`src/styles/global.css`](src/styles/global.css) | Design tokens, typography, layout utilities |
| [`studio/schemaTypes/homepage.ts`](studio/schemaTypes/homepage.ts) | All CMS-editable homepage fields |
| [`astro.config.mjs`](astro.config.mjs) | Astro + Vercel adapter configuration |

---

## Useful Links

- [Astro docs](https://docs.astro.build)
- [Sanity docs](https://www.sanity.io/docs)
- [Sanity project dashboard](https://www.sanity.io/manage/project/b7wqv3yo)
- [Vercel project dashboard](https://vercel.com/okaloa/okaloa-website)
- [Sanity Studio (live)](https://okaloa.sanity.studio)
- [Live website](https://okaloa-website.vercel.app)
