---
name: project-architecture
description: Architecture overview, module organization, patterns, and conventions for the tmdb-sdk project.
---

# TMDB SDK Architecture

Use this skill when understanding, extending, or refactoring the SDK codebase.

## 1. High-Level Architecture

**Pattern**: Facade with composition of independent namespace sub-clients.

```
TMDBClient (src/client.ts)
  ├── axios instance (shared, carries auth config)
  ├── account       -> AccountClient       (src/client/account/)
  ├── authentication -> AuthenticationClient (src/client/authentication/)
  ├── certification -> CertificationClient   (src/client/certification/)
  ├── changes       -> ChangesClient         (src/client/changes/)
  ├── collection    -> CollectionClient       (src/client/collection/)
  ├── company       -> CompanyClient          (src/client/company/)
  └── configuration -> ConfigurationClient   (src/client/configuration/)
```

- Each sub-client receives the shared `AxiosInstance` via constructor injection.
- No sub-client depends on another. Each is fully independent.
- Types are self-contained per domain in `src/types/`.

## 2. Module Layout

```
src/
├── index.ts            # Barrel — re-exports everything consumers need
├── client.ts           # TMDBClient class + TMDBClientConfig interface
├── client/<namespace>/ # One folder per API domain, each has index.ts
└── types/              # One .ts file per domain, matching client/<namespace>/
```

## 3. Adding a New Namespace

Create 3 files following existing patterns:

1. **`src/types/<namespace>.ts`** — Define request/response interfaces.
2. **`src/client/<namespace>/index.ts`** — Create `<Namespace>Client` class:
   - Constructor takes `AxiosInstance`, stores as private field.
   - Each method maps 1:1 to a TMDB endpoint.
   - Build URL, pass optional params, return `response.data` with typed signature.
3. **`src/client.ts`** — Add public property in `TMDBClient` constructor.
4. **`src/index.ts`** — Re-export the new types and client class.
5. **`tests/<namespace>.test.ts`** — Add tests (see §6).

## 4. Authentication

Handled centrally in `TMDBClient` constructor:

```ts
// Bearer token (preferred)
Authorization: Bearer <access_token>

// API key fallback
api_key=<api_key>  // query param
```

- `TMDBClientConfig` accepts `{ accessToken?, apiKey? }`.
- Token wins if both provided.
- Error thrown if neither provided.

## 5. TypeScript Conventions

- `noEmit: true` — Bun runs `.ts` directly, no build step.
- `verbatimModuleSyntax: true` — Use `import type` for type-only imports.
- `strict: true` throughout.
- Type files export plain interfaces, no enums.
- `PaginatedResponse<T>` generic in `src/types/account.ts` for paginated endpoints.

## 6. Testing Conventions

**Framework**: Bun's built-in test runner (`bun:test`).
**Command**: `bun test` (no config needed).

**Two modes per test file**:

1. **Mocked tests** (always run): Construct namespace client directly with `mock()` of axios methods. Assert correct URL/params/response shape.
2. **Live tests** (conditional): Guarded by `process.env.TMDB_TOKEN`. Use `test.skip()` when token unavailable.

**Pattern for mocked client construction:**

```ts
const mockGet = mock((url: string) => Promise.resolve({ data: {...} }));
const client = new SomeClient({ get: mockGet } as unknown as AxiosInstance);
```

## 7. Development Workflow

- **Runtime**: Bun (`bun run index.ts`, `bun test`, `bunx <pkg>`).
- **No build step**: Run TypeScript directly.
- **CI**: GitHub Actions with `oven-sh/setup-bun@v2`, runs `bun install --frozen-lockfile && bun test`.
- **Dependencies**: Only `axios` at runtime. No linters/formatters in devDeps.

## 8. Key File Reference

| File | Purpose |
|------|---------|
| `index.ts` (root) | Demo/entry script, not library entry |
| `src/index.ts` | Public API barrel |
| `src/client.ts` | Facade: creates axios, composes sub-clients |
| `src/client/*/index.ts` | Namespace client classes |
| `src/types/*.ts` | TypeScript interfaces per domain |
| `tests/*.test.ts` | Mocked + live integration tests |

## 9. Existing Skills

- `tmdb-api` — TMDB API-specific knowledge (endpoints, auth, image URLs, append_to_response).
- `use-bun` — Prefer bun/bunx for all commands.
