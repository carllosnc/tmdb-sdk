# GitHub Copilot Instructions for @carlosnc/tmdb-sdk

This repository provides `@carlosnc/tmdb-sdk`, a lightweight, fully-typed TypeScript client for The Movie Database (TMDB) API with zero external runtime dependencies.

## Key Development Rules

- **Package Manager**: Use `bun` (`bun test`, `bun run build`, `bun run typecheck`, `bun run check`).
- **Zero Runtime Dependencies**: The SDK relies strictly on native web standards (`fetch`, `Headers`, `Request`, `Response`) via `FetchAdapter`. Do not add runtime npm dependencies.
- **Module Structure**:
  - `src/client/<namespace>/index.ts`: Sub-client classes receiving `HttpClient` via constructor.
  - `src/types/<namespace>.ts`: Self-contained plain TypeScript interfaces (no enums).
  - `src/client.ts`: Facade composing all sub-clients.
  - `src/index.ts`: Public barrel exports.
- **TypeScript & Style**:
  - `verbatimModuleSyntax: true` requires `import type` for types.
  - Parameters use `camelCase` in public interfaces.
  - JSDoc methods should include one concise sentence and an `@see <TMDB doc URL>` tag.
- **Testing**:
  - Built with `bun:test`.
  - Mocks should be used for unit testing `HttpClient` methods.
  - Integration tests hitting the live TMDB API are guarded by `process.env.TMDB_TOKEN`.
