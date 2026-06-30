# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An Astro 7 + React 19 application with Tailwind CSS v4, shadcn/ui (Radix UI Nova style), and TypeScript 6. Uses pnpm as the package manager. Requires Node >=22.23.0 (see `.nvmrc`).

## Quick Start

```bash
pnpm install           # Install dependencies (Node >=22.23.0 required)
pnpm run dev           # Start dev server (auto-background in AI agents)
```

When running inside an AI coding agent (Claude Code, Cursor, Windsurf, etc.), Astro 7 automatically starts the dev server as a detached background process. The server's URL, port, and PID are recorded in `.astro/dev.json`. A health endpoint at `/_astro/status` returns `{"ok": true}` when the server is ready.

## Commands

```bash
pnpm run dev          # Start dev server (auto-background in AI agents)
pnpm run dev:bg       # Force background dev server
pnpm run dev:status   # Check background server URL, PID, uptime
pnpm run dev:logs     # View/stream background server logs
pnpm run dev:stop     # Stop background dev server
pnpm run build        # Production build (astro build)
pnpm run preview      # Preview production build (astro preview)
pnpm run lint         # ESLint on all files
pnpm run format       # Prettier format on all files
pnpm run format:check # Check formatting without writing (CI parity)
pnpm run typecheck    # Type checking (astro check)
pnpm run astro        # Astro CLI passthrough
```

To add new shadcn/ui components:

```bash
pnpm dlx shadcn@latest add <component-name>
```

## AI Agent Workflow (Astro 7)

Astro 7 detects AI coding agents automatically and runs `astro dev` as a detached background process. This prevents the dev server from blocking the agent's terminal.

### Key behaviors

- **Auto-detection**: When Claude Code (or Cursor, Windsurf, etc.) is detected, `astro dev` automatically becomes `astro dev --background`.
- **Lock file**: `.astro/dev.json` records the server's URL, port, and PID. Prevents duplicate servers for the same project.
- **Health check**: Poll `http://localhost:4321/_astro/status` → `{"ok": true}` before interacting with the server.
- **Opt-out**: Set `ASTRO_DEV_BACKGROUND=0` to force foreground mode if needed.

### Workflow

```bash
pnpm run dev           # Start in background (auto-detected)
pnpm run dev:status    # Check URL / PID / uptime
pnpm run dev:logs -f   # Stream server logs (like tail -f)
pnpm run dev:stop      # Graceful shutdown (SIGTERM → SIGKILL after 5s)
```

### When to restart

- After changing `astro.config.mjs`, content schemas, or integrations
- After adding new fonts or modifying the OG image pipeline
- `pnpm run dev:stop && pnpm run dev` (or `astro dev --background --force`)

## Git Conventions

### Git Hooks (husky)

- **pre-commit**: Runs `lint-staged` — ESLint + Prettier on `.js/.mjs/.ts/.tsx`; Prettier-only on `.astro/.css/.json/.md/.mdx/.yml/.yaml`. Commit is blocked if checks fail.
- **commit-msg**: Runs `commitlint` with `@commitlint/config-conventional`. Enforces [Conventional Commits](https://www.conventionalcommits.org/) format.

### Commit Message Format

All commits MUST use: `type: description`

Common types: `feat` `fix` `docs` `style` `refactor` `perf` `test` `chore` `ci` `build`

Examples:

- `feat: add user authentication`
- `fix: resolve button alignment issue`
- `chore: update dependencies`

## Code Architecture

### Routing

- **`src/pages/`** — Astro file-based routing. Each `.astro` file maps to a route. Dynamic endpoints: `og.png.ts` (OG image generation via satori), `robots.txt.ts`, `rss.xml.ts`.
- **`src/fetch.ts`** — Advanced Routing entrypoint (Astro 7). Uses Hono middleware for custom response headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`), logging, and future extensibility (auth, rate-limiting, i18n). Wires `astro/hono` `middleware()` + `pages()` into a Hono app.
- **`src/layouts/`** — `Layout.astro` (base: head, FOUC script, NProgress, footer year) wraps all pages; `PostLayout.astro` extends it for blog posts (ToC, pagination, JSON-LD structured data, share buttons).

### Components

- **`src/components/ui/`** — shadcn/ui React components (Radix UI primitives). Imported as `@/components/ui/<name>`.
- React interactive components use Astro's `client:load` (or other client directives) when rendered in `.astro` pages.

### Content (Astro Content Collections)

- **`src/content/posts/`** — Blog posts as Markdown/MDX with frontmatter (`title`, `description`, `publishDate`, `tags`, `image`, `featured`).
- **`src/content/projects/`** — Project pages as Markdown/MDX with frontmatter (`title`, `description`, `publishDate`, `tags`, `image`, `githubUrl`, `featured`, `status`, `language`, `license`).
- Content fetched via `getCollection()` and rendered via `render()` from `astro:content`.
- Dynamic routes (`[slug].astro`) use `getStaticPaths()` to map content entries to pages.

### Styling

- **`src/styles/global.css`** — Tailwind CSS v4 entry point. Imports `tailwindcss` (v4 `@import`), `tw-animate-css`, `shadcn/tailwind.css`, and `@fontsource-variable/geist`. Loads `@tailwindcss/typography` via `@plugin`. CSS variables (oklch) for theming with `.dark` class support. Also contains DocSearch modal theme, NProgress bar styles, scroll-driven navbar-border animation, and slide-enter animation system.
- Path alias `@/` maps to `./src/*` (configured in `tsconfig.json`).

### Utilities & Types

- **`src/lib/utils.ts`** — `cn()` helper combining `clsx` and `tailwind-merge` for conditional class merging. Also use `cva` from `class-variance-authority` for component variants.
- **`src/utils/withBase.ts`** — `getAssetPath()` (prefix with configured base), `stripBase()`/`stripLocale()` for path manipulation.
- **`src/utils/readingTime.ts`** — Estimates reading time from word count (Chinese-aware).
- **`src/utils/share-url.ts`** — Generates share URLs for Twitter, Weibo, and QQ.
- **`src/types/config.ts`** — Typed config interfaces (`SiteConfig`, `SocialLink`, `NavLink`, `PlatformName`, etc.) + `defineConfig()` helper. Used by `src/config.ts` for type-safe site configuration.
- Font: Geist Variable (`@fontsource-variable/geist`) as sans-serif default.
- Icon libraries: **Lucide React** (general icons) and **react-icons/si** (brand icons like GitHub, X).

### Key Config Files

| File               | Purpose                                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `astro.config.mjs` | Astro config: React, MDX, Sitemap integrations; Tailwind Vite plugin; astro-expressive-code (Shiki); route caching + prefetch (Astro 7) |
| `tsconfig.json`    | TypeScript strict, path alias `@/*`                                                                                                     |
| `eslint.config.js` | ESLint flat config: recommended JS/TS + React Hooks + React Refresh                                                                     |
| `.prettierrc`      | Prettier with Astro + Tailwind CSS plugins                                                                                              |
| `components.json`  | shadcn/ui configuration (component registry, aliases)                                                                                   |
| `.mcp.json`        | MCP server configs: shadcn (component tools), astro-docs (documentation)                                                                |
| `src/config.ts`    | Typed site config: site metadata, nav links, social links, share links                                                                  |

### CI/CD

- **`.github/workflows/ci.yml`** — Runs on PRs: `lint` → `format:check` → `typecheck` → `build`. Must pass to merge.
- **`.github/renovate.json`** — Automated dependency updates via Renovate, grouped by ecosystem (astro, tailwind, typescript-eslint, git-tools). Major updates require dashboard approval.

### Adding New Pages

1. Create a `.astro` file in `src/pages/` (or `.md` in `src/content/<collection>/` for content-driven pages)
2. Use `src/layouts/Layout.astro` as the layout wrapper (`import Layout from "../../layouts/Layout.astro"`)
3. For content-driven pages: use `getStaticPaths()` + `getCollection()` to map content to routes, then `render()` to render Markdown
4. Import interactive React components with `client:*` directives

### Gotchas

- **Dark mode FOUC prevention**: `Layout.astro` uses inline `<script is:inline>` to apply `.dark` class before first paint. Theme preference persists in `localStorage`.
- **lint-staged tiers**: Only `.js/.mjs/.ts/.tsx` get ESLint. Everything else (`.astro/.css/.json/.md/.mdx/.yml/.yaml`) gets only Prettier. Don't expect lint rules to catch `.astro` issues — they won't.
- **`shadcn/tailwind.css`**: Imported in `global.css` via `@import`; resolves via node_modules (no path alias required).
- **`@tailwindcss/typography`**: Loaded via `@plugin` in `global.css` (Tailwind v4 style). The `prose` classes in blog/project content come from this plugin. Configured per instance (e.g., `prose prose-lg dark:prose-invert prose-a:text-primary`).
- **Theme system is split**: FOUC prevention uses inline `<script is:inline>` in `Layout.astro`, while `src/scripts/theme.ts` handles view-transition persistence, event delegation for toggle buttons (`[data-theme-toggle]`), and Android `theme-color` sync. Both must stay in sync.
- **Asset paths**: Use `getAssetPath()` from `@/utils/withBase` (not raw `/path` strings) for favicons, manifests, and other static assets — it respects the configured base path.
- **Content Layer API**: Uses the `glob` loader in `src/content.config.ts` to define collections. New collections need a schema (Zod via `astro/zod`) added there, not inferred from file structure alone.
- **Advanced Routing (Hono)**: `src/fetch.ts` wraps all responses in a Hono middleware chain. Security headers are injected globally — if you add a new route and don't see them, check that the middlewares (`middleware()` → `pages()`) are still wired correctly. The Hono app replaces the default Astro server entrypoint.
- **OG Image pipeline**: `src/pages/og.png.ts` generates OG images at request time using `satori` (JSX → SVG) + `@resvg/resvg-js` (SVG → PNG). Adding new fonts or layout changes requires restarting the dev server to pick up the satori rendering changes.
- **Route caching (Astro 7)**: Posts (`/posts/[...path]`) and projects (`/projects/[...path]`) are cached with `maxAge: 300, swr: 60`. After publishing a new post or updating content, the cache may serve stale content for up to 5 minutes locally unless you restart the dev server.
- **Astro 7 prefetch**: `prefetchAll: true` with `defaultStrategy: 'viewport'` means all visible links are prefetched on hover/viewport — useful for navigation speed, but keep in mind during layout debugging (prefetch can mask slow-page artifacts).
- **JSX whitespace (Astro 7 Rust compiler)**: Newlines between inline elements no longer create visible spaces (JSX convention). When an icon component sits next to text on a different template line, use `{' '}` to preserve the space. Example: `<ChevronLeft />{' '}上一篇` instead of `<ChevronLeft />` + newline + `上一篇`.
