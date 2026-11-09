---
name: project-architecture
description: Architecture overview, module organization, patterns, and conventions for the tmdb-sdk project.
---

# TMDB SDK Architecture

Use this skill when understanding, extending, or refactoring the SDK codebase.

## 1. High-Level Architecture

**Pattern**: Facade with composition of independent namespace sub-clients using zero runtime dependencies and a pluggable HTTP adapter.

```
TMDBClient (src/client.ts)
  ├── httpClient (shared HttpClient, FetchAdapter by default)
  ├── account            -> AccountClient           (src/client/account/)
  ├── accountV4          -> AccountV4Client         (src/client/account-v4/)
  ├── authV4             -> AuthV4Client            (src/client/auth-v4/)
  ├── authentication     -> AuthenticationClient    (src/client/authentication/)
  ├── awards             -> AwardsClient            (src/client/awards/)
  ├── certification      -> CertificationClient     (src/client/certification/)
  ├── changes            -> ChangesClient           (src/client/changes/)
  ├── collection         -> CollectionClient        (src/client/collection/)
  ├── company            -> CompanyClient           (src/client/company/)
  ├── configuration      -> ConfigurationClient     (src/client/configuration/)
  ├── credit             -> CreditClient            (src/client/credit/)
  ├── discover           -> DiscoverClient          (src/client/discover/)
  ├── find               -> FindClient              (src/client/find/)
  ├── genre              -> GenreClient             (src/client/genre/)
  ├── guestSession       -> GuestSessionClient      (src/client/guest-session/)
  ├── keyword            -> KeywordClient           (src/client/keyword/)
  ├── list               -> ListClient              (src/client/list/)
  ├── listV4             -> ListV4Client            (src/client/list-v4/)
  ├── movie              -> MovieClient             (src/client/movie/)
  ├── network            -> NetworkClient           (src/client/network/)
  ├── person             -> PersonClient            (src/client/person/)
  ├── review             -> ReviewClient            (src/client/review/)
  ├── search             -> SearchClient            (src/client/search/)
  ├── trending           -> TrendingClient          (src/client/trending/)
  ├── tv                 -> TvClient                (src/client/tv/)
  ├── tvEpisode          -> TvEpisodeClient         (src/client/tv-episode/)
  ├── tvEpisodeGroup     -> TvEpisodeGroupClient    (src/client/tv-episode-group/)
  ├── tvSeason           -> TvSeasonClient          (src/client/tv-season/)
  └── watchProviders     -> WatchProvidersClient    (src/client/watch-providers/)
```

- Each sub-client receives the shared `HttpClient` via constructor injection.
- Zero runtime dependencies: uses native `fetch` via `FetchAdapter`.
- Custom HTTP clients can be injected via `TMDBClientConfig.httpClient`.
- Types are self-contained per domain in `src/types/`.

## 2. Module Layout

```
src/
├── index.ts            # Barrel — re-exports everything consumers need
├── client.ts           # TMDBClient class + TMDBClientConfig interface
├── errors.ts           # TMDBError hierarchy (unauthorized, not found, rate limit, validation, etc.)
├── http/               # FetchAdapter and HttpClient interface
├── adapters/           # Framework adapters (SvelteKit, Next.js App Router)
├── client/<namespace>/ # One folder per API domain, each with index.ts
├── types/              # One .ts file per domain, matching client/<namespace>/
└── utils/              # Query building, pagination helpers, retries
```

## 3. Adding a New Namespace

Create files following existing patterns:

1. **`src/types/<namespace>.ts`** — Define request/response interfaces.
2. **`src/client/<namespace>/index.ts`** — Create `<Namespace>Client` class:
   - Constructor takes `HttpClient`, stores as private field.
   - Each method maps 1:1 to a TMDB endpoint.
   - Build URL, pass optional params, return typed response.
3. **`src/client.ts`** — Add public property in `TMDBClient` constructor.
4. **`src/index.ts`** — Re-export the new types and client class.
5. **`tests/<namespace>.test.ts`** — Add tests (see §6).

### Comment Conventions for Client Functions

Every client method must include a JSDoc block with:
- A brief description of what the endpoint returns.
- An `@see` tag linking to the official TMDB developer docs.

```ts
/**
 * Get the top level details of a movie by ID.
 * @see https://developer.themoviedb.org/reference/movie-details
 */
async getDetails(id: number): Promise<MovieDetails> { ... }
```

Do not add `@param` or `@returns` tags — the TypeScript types serve that purpose. Keep descriptions concise (1 sentence).

## 4. Configuration & Authentication

Handled centrally in `TMDBClient` constructor (`TMDBClientConfig`):

```ts
export interface TMDBClientConfig {
  accessToken?: string;
  apiKey?: string;
  retry?: boolean | RetryConfig;
  httpClient?: HttpClient;
  omdbApiKey?: string;
  defaultLanguage?: string;
}
```

- **Bearer token (preferred)**: `Authorization: Bearer <access_token>`.
- **API key fallback**: `api_key=<api_key>` as query parameter.
- Token wins if both are provided. Error thrown if neither is provided.
- `defaultLanguage`: Automatically appended to every request unless overridden per call.
- `retry`: Configurable exponential backoff on 429 / 5xx errors.
- `omdbApiKey`: Optional integration to enrich movie/TV details with IMDb/Rotten Tomatoes/Metacritic awards.

## 5. TypeScript Conventions

- `noEmit: true` in tsconfig.json — Bun runs `.ts` directly.
- `verbatimModuleSyntax: true` — Use `import type` for type-only imports.
- `strict: true` throughout.
- Type files export plain interfaces, no enums.
- Use camelCase for SDK params, converted to snake_case via internal query builder.

## 6. Testing Conventions

**Framework**: Bun's built-in test runner (`bun:test`).
**Command**: `bun test`.

**Two modes per test file**:
1. **Mocked tests** (always run): Construct namespace client directly with mock `HttpClient` methods (`mock(() => Promise.resolve(...))`).
2. **Live tests** (conditional): Guarded by `const token = process.env.TMDB_TOKEN; if (token) { ... }`.

## 7. Development Workflow

- **Runtime**: Bun (`bun test`, `bun run build`, `bun run typecheck`, `bun run check`).
- **Dependencies**: Zero runtime dependencies. Dev dependencies are `typescript`, `typedoc`, `@types/bun`.
- **CI**: GitHub Actions with `oven-sh/setup-bun@v2`, running typecheck and tests.

## 8. Existing Skills & Guidelines

- `tmdb-api` — TMDB API-specific knowledge (endpoints, auth, image URLs, append_to_response).
- `.agents/AGENTS.md`, `CLAUDE.md`, `.cursorrules` — Agent guides across diverse tools.
