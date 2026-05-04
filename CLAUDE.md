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

## Design tokens (TBD)

<!-- To be defined — colors, typography scale, spacing, etc. -->

## Deployment

GitHub Pages via GitHub Actions on push to `main`. Details to be added in Phase 3.
