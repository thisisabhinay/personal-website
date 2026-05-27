# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start dev server (localhost:4321)
yarn build        # Type-check and build for production (astro check && astro build)
yarn preview      # Preview the production build locally
yarn check        # Run Biome linter/formatter with auto-fix (biome check --apply-unsafe .)
```

Node version is pinned to 20.12.1 via Volta (`.node-version`).

## Architecture

**Framework:** Astro 4 with Tailwind CSS, MDX, and `astro-icon`.

**Routing:** File-based routing under `src/pages/`. Dynamic routes (`[slug].astro`) are used for blog posts, portfolio items, and side projects.

**Content collections** (defined in `src/content/config.ts`, schemas in `src/schema/`):
- `blog` — MDX posts with frontmatter: `title`, `excerpt`, `category`, `author`, `tags`, `publishDate`, optional `draft` and `image`
- `portfolio` — MDX case studies with frontmatter: `title`, `description`, `author`, `company`, `tags`, `publishDate`, optional `draft`, `pinned`, and `image`
- `sideProjects` — MDX entries with frontmatter: `title`, `description`, `author`, `domains`, `tags`, `publishDate`, `status` (enum: Planning/Backlog/On hold/Live/In progress), optional `draft`, `pinned`, and `image`

Items with `draft: true` are excluded from all collection queries. Items with `pinned: true` surface in featured/grid components. Collections are queried via helpers in `src/utils/`.

**Layouts:** `src/layouts/main.astro` wraps every page (includes `<Header>`, `<Footer>`, and `<SquareLines>` decorative background). `src/layouts/post.astro` wraps individual content pages.

**Static data:** JSON files in `src/data/` supply clients, work experiences, nav menu items, and testimonials — these are imported directly into components rather than using content collections.

**Dark mode:** Implemented via Tailwind's `class` strategy. On load, `src/layouts/main.astro` reads `localStorage.dark_mode` and adds the `dark` class to `<html>` before render to prevent flash. The toggle logic (sun/moon animation) lives in `src/assets/js/main.js`.

**Icons:** SVG files in `src/icons/` are served via the `astro-icon` integration (`<Icon name="..." />`).

**Linting/formatting:** Biome (`biome.json`) handles both. The `check` script runs with `--apply-unsafe` so it auto-fixes most issues.
