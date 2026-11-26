a# react-ts-starter

Reference frontend starter: React 19, TypeScript (strict), Vite. Demo domain: support tickets.

## Requirements

- Node.js 22+
- npm 10+

## Setup

```bash
npm install
cp .env.example .env.local   # PowerShell: Copy-Item .env.example .env.local
npm run dev                  # http://localhost:5173
```

## Environment variables

| Variable            | Required | Example                        | Purpose              |
| ------------------- | -------- | ------------------------------ | -------------------- |
| `VITE_APP_NAME`     | no       | `Tickets`                      | Shown in the UI      |
| `VITE_API_BASE_URL` | yes      | `http://localhost:8000/api/v1` | Backend API base URL |

All variables are validated at startup in `src/config/env.ts`. Only that file reads `import.meta.env`.
Every `VITE_` variable is bundled into the browser, so never put secrets here.

## Scripts

| Script                 | What it does                         |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Dev server with hot reload           |
| `npm run build`        | Type-check, then production build    |
| `npm run preview`      | Serve the production build locally   |
| `npm run typecheck`    | TypeScript check only                |
| `npm run lint`         | ESLint                               |
| `npm run format`       | Format all files with Prettier       |
| `npm run format:check` | Fail if any file is not formatted    |

## Project structure

```
src/
  app/        App shell, providers, router
  config/     Validated environment config
  features/   One folder per business domain (e.g. tickets/)
  shared/     Reusable ui/, lib/, hooks/ with no business logic
```

Rules:

- A feature can import from `shared/` and `config/`. `shared/` never imports from a feature.
- Features don't import each other's internals.
- Import with the `@/` alias (`@/config/env`), not long relative paths.

## Conventions

- Commits follow Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.
- One branch per piece of work, merged into `main` with `--no-ff`.
- Formatting: Prettier. Linting: ESLint, with formatting rules turned off via `eslint-config-prettier`.
- Line endings: LF, enforced by `.gitattributes` and `.editorconfig`.

## Decisions

See [docs/adr](docs/adr).

## Troubleshooting

| Problem                                         | Fix                                                            |
| ----------------------------------------------- | -------------------------------------------------------------- |
| `Invalid environment variables` on startup      | Create `.env.local` from `.env.example` and fill in the values |
| `Cannot find module '@/...'`                    | The alias must be in both `tsconfig.app.json` and `vite.config.ts` |
| `EJSONPARSE` from npm                           | `package.json` has a syntax error, often a trailing comma      |
| `format:check` fails                            | Run `npm run format`                                           |

## Known limitations

- No routing, data fetching, auth or tests yet. These are added step by step.