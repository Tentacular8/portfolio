# Portfolio — Claude Code conventions

## Project overview

An Astro + TypeScript + Tailwind portfolio site for showcasing coding projects.
Deploys to GitHub Pages at `https://USERNAME.github.io/portfolio`.

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
All colors are CSS custom properties on `:root` (light) and `.dark` (dark), consumed via semantic utilities defined in `global.css`.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--site-bg` | `#f5f3f0` | `#0f0f0f` | Page background |
| `--site-surface` | `#ffffff` | `#1a1a1a` | Cards, panels |
| `--site-border` | `#e2dfdc` | `#2a2a2a` | Borders, dividers |
| `--site-fg` | `#1c1917` | `#e8e6e3` | Body text |
| `--site-muted` | `#78716c` | `#8a8782` | Secondary text, labels |
| `--site-accent` | `#b91c1c` | `#ef4444` | Links, CTAs, focus rings, `>` prompts |

**Accent usage rule:** Red accent appears on links, the active nav state, focus rings, terminal-prompt `>` characters, and key CTAs only. Never as a background fill, never in body text or headings. Target ≤10% of any visible page area.

Both accent values pass WCAG AA (4.5:1) against their respective backgrounds.

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
Defined in `src/styles/global.css` under `@layer utilities`:
- `bg-base`, `bg-surface` — background fills
- `text-muted`, `text-accent` — text colors
- `border-subtle` — border color
- `ring-accent` — focus ring color

### Technical details
- Section labels: `> label` pattern — `>` in `text-accent`, label in `font-mono text-sm text-muted`.
- Footer: monospace build date (`built · YYYY-MM-DD`) in `font-mono text-xs text-muted`.

## Deployment

GitHub Pages via GitHub Actions on push to `main`. Details to be added in Phase 3.
