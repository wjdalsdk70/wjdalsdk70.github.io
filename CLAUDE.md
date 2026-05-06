# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server at http://localhost:3001
npm run build      # static export to ./out (required before deploying)
npm run lint       # ESLint
```

No test suite is configured.

## Architecture

This is a **Next.js 15 static-export portfolio + blog** deployed to GitHub Pages via `.github/workflows/nextjs.yml`. `next.config.js` sets `output: 'export'` and conditionally sets `basePath`/`assetPrefix` only when running under GitHub Actions for non-root repos.

### Site configuration

All author info, nav links, URLs, and social handles live in `siteConfig.ts`. This is the single source of truth — change it there, not in individual components.

### Layout

`app/layout.tsx` → `ClientLayout` (client component) → `ThemeProvider` → `PortfolioShell` (sticky header + nav drawn from `siteConfig.nav`).

The site has two visual modes:
- **Portfolio pages** (`/`, `/about`) use a full-width layout with a top header (`ClientLayout.tsx`).
- **Blog pages** (`/archives`, `/posts/[slug]`, `/categories`, `/tags`) originally used a sidebar (`Sidebar.tsx`), but the layout is now unified under `ClientLayout`.

### Content pipeline

Blog posts are Markdown files under `content/posts/`. Subdirectory names (`AX`, `BE`, `DevOps`, `FE`) become the post's category if no `categories` front matter is set. `lib/posts.ts` reads them at build time using `gray-matter` and `fs`.

**Filename convention:** `YYYY-MM-DD-post-slug.md` — the date and slug are parsed from the filename and used as fallbacks when front matter is absent.

**Front matter schema:**
```yaml
---
title: Post title
description: Short description
date: 2024-01-01
categories: [Category]
tags: [Tag1, Tag2]
author: Name
---
```

Duplicate slugs across subdirectories log a warning and use the first match — avoid naming two files identically.

### Routing

| Route | Source |
|---|---|
| `/` | `app/page.tsx` — portfolio home (intro, projects, experience, contact) |
| `/about` | `app/about/` — resume/about page with PDF viewer |
| `/archives` | `app/archives/` — chronological post list |
| `/posts/[slug]` | `app/posts/[slug]/` — individual post rendered via `react-markdown` + `remark-gfm` |
| `/categories/[category]` | filtered by directory name or front matter |
| `/tags/[tag]` | filtered by front matter tags |

`app/sitemap.ts` and `app/robots.ts` generate SEO files dynamically from `siteConfig.siteUrl`.

### Static assets

- `assets/` — images imported via TypeScript (processed by Next.js, typed in `types/images.d.ts`)
- `public/` — served as-is (`about.pdf`, `portfolio.pdf`, Google verification HTML)
- The avatar is imported from `assets/avatar.png` and referenced through `siteConfig.avatar`

### Styling

Tailwind CSS + custom CSS variables in `app/globals.css` for theming (`--background`, `--foreground`, `--accent`, `--border`, `--text-muted`, etc.). Dark mode is toggled via `ThemeProvider` which stores the preference in `localStorage` and sets a `dark` class on `<html>`.
