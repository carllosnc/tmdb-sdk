# CLAUDE.md

Guidelines for Claude Code working on `@carlosnc/tmdb-sdk`.

## Project Overview

`@carlosnc/tmdb-sdk` is a lightweight, fully-typed TypeScript client for The Movie Database (TMDB) API v3/v4 with zero runtime dependencies.

## Package Manager & Tooling

Always use **Bun**:
- `bun test` — Run all unit and integration tests
- `bun run typecheck` — Run TypeScript type checking
- `bun run build` — Build distribution with `tsc -p tsconfig.build.json`
- `bun run check` — Run typecheck and tests in a single command
- `bun run docs` — Generate TypeDoc documentation
- `bun <file.ts>` — Run any TypeScript file directly

Fall back to `node`/`npm`/`npx` only if bun is unavailable.

## Architecture & Code Conventions

1. **Facade Pattern**: `TMDBClient` (`src/client.ts`) composes independent sub-clients (`src/client/<namespace>/index.ts`).
2. **Zero Dependencies**: Uses native `fetch` via `FetchAdapter` (`src/http/fetch-adapter.ts`). Sub-clients accept `HttpClient` via constructor.
3. **Types**: Self-contained per domain in `src/types/<namespace>.ts`. Export only plain interfaces, no enums.
4. **TypeScript**: `verbatimModuleSyntax: true` is enabled. Always use `import type` for type-only imports.
5. **JSDoc Style**: Every client method must include a 1-sentence description and an `@see` tag linking to official TMDB docs. Do not include redundant `@param` or `@returns` tags.
6. **Query Parameters**: Accept options in camelCase in SDK interfaces; internal query builder maps them to TMDB's snake_case.

## Testing Guidelines

- Test framework: `bun:test`.
- Unit tests use mock `HttpClient` and should never make network calls.
- Live tests are conditionally executed only when `process.env.TMDB_TOKEN` is present.
- When adding a new namespace or method, add corresponding unit tests in `tests/<namespace>.test.ts`.

## Release Workflow

1. Determine bump (`patch`, `minor`, `major`).
2. Update `CHANGELOG.md` following existing format (`## [X.Y.Z] - YYYY-MM-DD`).
3. Update version in `package.json`.
4. Verify: `bun run check && bun run build`.
5. Commit and tag: `git add package.json CHANGELOG.md && git commit -m "chore(release): vX.Y.Z" && git tag vX.Y.Z`.
