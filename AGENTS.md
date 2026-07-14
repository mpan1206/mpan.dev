# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

Starter template: **Astro + React + TypeScript + shadcn/ui + Tailwind CSS v4**.

Default Astro output is a static site (no adapter configured in `astro.config.mjs`).

## Stack

| Layer           | Choice                                                                              |
| --------------- | ----------------------------------------------------------------------------------- |
| Framework       | Astro 7 (`astro` ^7), file-based routing in `src/pages/`                            |
| UI islands      | React 19 via `@astrojs/react`                                                       |
| Components      | shadcn/ui style `base-nova`; primitives from `@base-ui/react` (not Radix)           |
| Styling         | Tailwind CSS v4 via `@tailwindcss/vite` (not PostCSS)                               |
| Icons           | `lucide-react`                                                                      |
| Font            | Inter Variable (`@fontsource-variable/inter`)                                       |
| Language        | TypeScript strict (`extends: astro/tsconfigs/strict`), path alias `@/*` → `./src/*` |
| Package manager | **pnpm** only (`packageManager` pinned in `package.json`)                           |
| Node            | `engines.node` `>=22.12.0`; `.nvmrc` pins `22.23.1` (CI uses this)                  |

## Commands

```bash
pnpm install       # install deps
pnpm dev           # dev server
pnpm build         # production build → dist/
pnpm preview       # preview production build
pnpm lint          # ESLint (flat config; **/*.{ts,tsx} only)
pnpm format        # Prettier write (astro + tailwindcss plugins)
pnpm format:check  # Prettier check
pnpm typecheck     # astro check (.astro + .ts/.tsx)
```

CI (`.github/workflows/ci.yml`) runs: `lint` → `format:check` → `typecheck` → `build` with `pnpm install --frozen-lockfile`.

Add shadcn/ui components (prefer CLI over hand-rolling equivalents):

```bash
npx shadcn@latest add <component>
```

Config: `components.json` (style `base-nova`, CSS variables, aliases under `@/`).

## Layout

```
src/
├── pages/              # Routes (.astro → URLs); e.g. index.astro → /
├── layouts/            # Layout shells (main.astro imports global CSS)
├── components/
│   └── ui/             # shadcn/ui (currently button; prefer CLI add)
├── lib/
│   └── utils.ts        # cn() — clsx + tailwind-merge
└── styles/
    └── global.css      # Tailwind imports, @theme inline, :root / .dark tokens
public/                 # Static assets (favicon, etc.)
```

`components.json` also defines `@/hooks` → `src/hooks`; that directory does not exist yet — create it when adding hooks.

## Patterns

### Astro + React

- Prefer **Astro** for pages, layouts, and static structure.
- Use **React** for interactive UI; hydrate from `.astro` with a client directive (e.g. `client:load`).
- Import UI from `@/components/ui/...` and shared helpers from `@/lib/...`.

```astro
---
import Layout from '@/layouts/main.astro'
import { Button } from '@/components/ui/button'
---

<Layout>
  <Button client:load>Click</Button>
</Layout>
```

### Components & class names

- Variants: `class-variance-authority` (`cva`); merge with `cn()` from `@/lib/utils`.
- Prefer semantic theme tokens: `bg-background`, `text-foreground`, `bg-primary`, `border-border`, etc.
- Theme tokens live in `src/styles/global.css` (`:root` / `.dark`, mapped in `@theme inline`).
- Icons: `import { IconName } from 'lucide-react'`.

### Tooling conventions

- Prettier: no semicolons, single quotes, trailing commas `es5`, print width 100.
- ESLint covers `**/*.{ts,tsx}` only; ignores `dist` and `.astro`. `.astro` files are Prettier-only (no ESLint ruleset yet).
- Husky + lint-staged on commit: `*.{ts,tsx}` → eslint --fix + prettier; `*.astro` / json / md / css → prettier.
- Use **pnpm**, not npm/yarn, for installs and scripts.

## Agent rules

1. **Match existing style** — Read nearby files before editing; keep naming, imports, and formatting consistent.
2. **Minimal diffs** — Change only what the task needs; no drive-by refactors or unrelated file churn.
3. **Do not commit secrets** — No API keys, tokens, or `.env` contents (`.env*` is gitignored).
4. **Prefer CLI for shadcn** — `npx shadcn@latest add <name>`; avoid inventing a parallel UI kit.
5. **Do not hand-edit lockfile** — Change deps via `pnpm add` / `pnpm remove`.
6. **Verify before claiming done** — At minimum run what CI runs for your change: `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, and `pnpm build` when relevant.
7. **Astro client directives** — Interactive React components used from `.astro` need an appropriate `client:*` directive.
8. **Path alias** — Use `@/` for `src/` imports; avoid deep relative paths when the alias works.

## Out of scope (unless asked)

- Rewriting the design system away from shadcn / base-nova / `@base-ui/react`
- Switching package managers or Node major without reason
- Adding backend, auth, DB, or an Astro adapter / SSR without an explicit request

## Related docs

- `README.md` — quick start for adding/using shadcn components
- `components.json` — shadcn generator config
- `.github/workflows/ci.yml` — required checks on PRs
  )
