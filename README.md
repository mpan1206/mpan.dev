**[mpan.dev](https://mpan.dev)**

My personal website — a blog and project showcase built with Astro.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v7 + [React](https://react.dev/) 19 (islands architecture)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4 + [shadcn/ui](https://ui.shadcn.com/) (Base UI)
- **Language**: TypeScript 6
- **Content**: Astro Content Collections (Markdown + frontmatter)

## Prerequisites

- [Node.js](https://nodejs.org/) `>=22.12.0` (run `nvm use` to match [`.nvmrc`](./.nvmrc))
- [pnpm](https://pnpm.io/) `11.12.0`

## Development

```bash
pnpm install          # Install dependencies & git hooks
pnpm run dev          # Start dev server at http://localhost:4321
pnpm run build        # Production build
pnpm run preview      # Preview production build
pnpm run format       # Format files with Prettier
pnpm run format:check # Check formatting without writing
pnpm run lint         # Lint files with ESLint
pnpm run typecheck    # Type checking with Astro
```

To add new shadcn/ui components:

```bash
pnpm dlx shadcn@latest add <component-name>
```

## Contributing

Commits follow [Conventional Commits](https://www.conventionalcommits.org/). Pre-commit hooks automatically run Prettier and ESLint. See [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for details.

<br>

<samp>Source code is licensed under <a href='./LICENSE'>MIT</a>.<br> Website content (articles, text, images) is licensed under <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a></samp>.
