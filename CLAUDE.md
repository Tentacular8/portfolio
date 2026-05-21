# Portfolio — Claude Code conventions

## Project overview

An Astro + TypeScript + Tailwind portfolio site for showcasing coding projects.
Deploys to GitHub Pages at `https://Tentacular8.github.io/portfolio`.

## Tech stack and constraints

- **Framework:** Astro
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS — no additional UI libraries unless discussed first
- **Components:** All components should be `.astro` files unless interactivity genuinely requires a framework component (React, Svelte, etc.)
- **Dependencies:** Do not add new dependencies without asking first

## Code style

- Use semantic HTML elements: `<header>`, `<main>`, `<article>`, `<nav>`, `<footer>`, `<section>`
- Prefer composition over configuration
- Keep components small and focused
- Follow the Prettier config already in `.prettierrc`

## Quality bars

- Lighthouse scores: 90+ across performance, accessibility, best practices, and SEO
- WCAG 2.2 AA accessibility:
  - Proper heading hierarchy
  - Alt text on all images
  - Fully keyboard-navigable
  - Minimum 4.5:1 color contrast ratio for text

## Working style

- For non-trivial changes, briefly explain the approach before writing code
- Ask before deleting any files
- If a request is ambiguous, ask one clarifying question rather than guessing

## Design tokens

### Theme strategy
Dark-first. Class-based switching via `.dark` on `<html>`. FOUC prevented by an inline script in `<head>`. Toggle persists to `localStorage`. Default: dark unless system explicitly prefers light.

### Colors

**Backgrounds and surfaces** — same variable names, different values per mode:

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--site-bg` | `#f5f3f0` | `#0f0f0f` | Page background |
| `--site-surface` | `#ffffff` | `#1a1a1a` | Cards, panels |
| `--site-border` | `#e2dfdc` | `#2a2a2a` | Borders, dividers |

**Text hierarchy** — three levels, both modes pass WCAG AA minimum; primary passes AAA:

| Token | Light | Light contrast | Dark | Dark contrast | Usage |
|---|---|---|---|---|---|
| `--site-fg` | `#171717` | ~16.4:1 AAA | `#e8e6e3` | ~15.4:1 AAA | Primary body text |
| `--site-fg-2` | `#4a4542` | ~8.6:1 AA+ | `#b5b2ae` | ~9.1:1 AA+ | Secondary: captions, metadata |
| `--site-fg-3` | `#6b6460` | ~5.3:1 AA | `#8a8782` | ~5.4:1 AA | Tertiary: timestamps, labels |

All ratios measured against each mode's `--site-bg`.

**Accent** — mode-specific colors, visually related (warm family). Never used as background fills, in body text, or headings:

| Token | Value | Contrast | Usage |
|---|---|---|---|
| `--site-accent` (light) | `#b83b0b` (burnt orange) | ~5.15:1 AA on `#f5f3f0` | Links, CTAs, focus rings, `>` prompts |
| `--site-accent` (dark) | `#ef4444` (red-500) | ~5.1:1 AA on `#0f0f0f` | Same |

Target ≤10% of any visible page area for accent color.

### Typography
- **Body / UI**: IBM Plex Sans — weights 400, 500, 600. Self-hosted via `@fontsource/ibm-plex-sans`.
- **Code / mono**: JetBrains Mono — weight 400. Ligatures enabled via `font-feature-settings: "liga" 1, "calt" 1`. Self-hosted via `@fontsource/jetbrains-mono`.
- **Headings**: IBM Plex Sans 600 (SemiBold) — no separate heading font. Scale: h1 `text-4xl`, h2 `text-2xl`, h3 `text-xl`.

### Spacing and shape
- Tailwind default spacing scale.
- Cards and buttons: `rounded-md` (6px). No `rounded-lg`.
- No drop shadows. No gradients.
- Borders: `border-subtle` (uses `--site-border`).

### Semantic utility classes
All defined in `src/styles/global.css` under `@layer utilities`. Mode-switching is handled by the CSS variables — never write `dark:text-red-500 text-orange-700` in components.

- `bg-base`, `bg-surface` — background fills
- `text-secondary` — secondary text (`--site-fg-2`)
- `text-muted` — tertiary text (`--site-fg-3`)
- `text-accent`, `border-accent` — accent color (mode-aware)
- `border-subtle` — border color
- `focus-ring` — focus-visible outline in accent color

### Technical details
- Section labels: `> label` pattern — `>` in `text-accent`, label in `font-mono text-sm text-muted`.
- Footer: monospace build date (`built · YYYY-MM-DD`) in `font-mono text-xs text-muted`.

## Deployment

- **Live URL:** `https://Tentacular8.github.io/portfolio`
- **Platform:** GitHub Pages via GitHub Actions
- **Trigger:** Push to `master` (or manual `workflow_dispatch` in GitHub UI)
- **Workflow:** `.github/workflows/deploy.yml` — uses `withastro/action@v3` to build, then `actions/deploy-pages@v4` to publish
- **Pages source setting:** Repo Settings → Pages → Source → **GitHub Actions** (not "Deploy from a branch")

### Dev vs production URLs
`base: '/portfolio'` is set in `astro.config.mjs`. Both environments serve at the same path:
- Dev: `http://localhost:4321/portfolio/`
- Production: `https://Tentacular8.github.io/portfolio/`

### Base path convention
All internal `href` and asset `src` values use `import.meta.env.BASE_URL.replace(/\/$/, '')` (strips trailing slash), then add an explicit `/`:
```ts
const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // '/portfolio' or ''
// href={`${base}/about`}  →  /portfolio/about
```
Never use bare absolute paths like `href="/about"` — they will 404 in production.

### Hero images
Store in `public/images/` and set `heroImage: "/images/filename.png"` in frontmatter (leading slash). The `[slug].astro` template prepends `base` automatically.
