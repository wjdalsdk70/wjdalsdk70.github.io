# Repository Guidelines

## Project Structure & Module Organization

This repository is a Next.js App Router blog. Route files live in `app/`, including `app/page.tsx`, `app/posts/[slug]/page.tsx`, `app/sitemap.ts`, and `app/robots.ts`. Shared UI components are in `components/`; keep reusable layout and widgets there instead of duplicating JSX in routes. Blog parsing and data helpers live in `lib/`, with shared TypeScript declarations in `types/`.

Markdown posts are stored under `content/posts/<category>/`, for example `content/posts/BE/2026-01-23-aws-cognito.md`. Public static files such as PDFs and verification HTML belong in `public/`; local source assets are in `assets/`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local Next.js dev server on `http://localhost:3001`.
- `npm run build`: create a production build and catch type or compile errors.
- `npm run lint`: run Next.js ESLint rules, including Core Web Vitals and TypeScript checks.

There is no `npm start` script in this repo; use the dev server for local work and the build command for production validation.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Keep `strict` TypeScript compatibility; avoid `any` unless an external API boundary requires it. Prefer the `@/*` path alias for root imports when it improves readability.

Follow the existing style: two-space indentation in JSON, semicolons in TypeScript where already used, and Tailwind utility classes for styling. Component files use PascalCase, such as `PostCard.tsx`; route folders use lowercase URL names. Markdown post filenames should be slug-friendly, preferably date-prefixed.

## Testing Guidelines

No dedicated test framework is currently configured. Before submitting changes, run:

```bash
npm run lint
npm run build
```

For UI changes, manually check the affected pages at `http://localhost:3001`, including mobile-width behavior when touching layout, sidebar, or typography. For content changes, verify front matter includes `title`, `description`, `date`, `categories`, and `tags`.

## Commit & Pull Request Guidelines

Recent history uses concise Conventional Commit prefixes, for example `fix: 배포 에러 해결` and `feat: Cognito 게시글 추가`. Continue using `feat:`, `fix:`, `docs:`, or `chore:` with a short Korean or English summary.

Pull requests should describe the change, list validation commands run, and include screenshots for visual changes. Link related issues when applicable and call out any content, SEO, or routing impact.

## Agent-Specific Instructions

Keep edits scoped to the requested files and preserve existing user changes. Do not reintroduce port `5000`; local development is standardized on port `3001`.
