# Changelog

## [0.13.2] - 2026-06-09

### Added
- `includeImageLanguage?` param to `TvEpisodeDetailsParams` — allows filtering episode images by language when using `append_to_response=images`
- Optional `images?`, `credits?`, `videos?` properties on `TvEpisodeDetails` interface — common appended resources are now directly accessible on the base type

### Fixed
- `TvEpisodeClient.getDetails()` now destructures `appendToResponse` before calling `buildQueryParams`, matching the movie client pattern and preventing duplicate key conversion

## [0.13.1] - 2026-06-07

### Fixed
- TypeScript strict mode errors in `defaultLanguage` test assertions (non-null assertion for mock call array)

## [0.13.0] - 2026-06-07

### Added
- `defaultLanguage` option on `TMDBClientConfig` — set a global default language that is automatically appended to every API request
- Explicit `language` param on any method call now overrides the global default
- 2 test cases for defaultLanguage append and explicit override behavior

## [0.12.0] - 2026-06-04

### Added
- `createSvelteKitHandler()` — SvelteKit request handler adapter that proxies requests to the TMDB API via a catch-all route, forwarding query params and preserving cache-control headers
- `createNextJsHandler()` — Next.js App Router request handler adapter that proxies requests to the TMDB API via a catch-all route, forwarding query params and preserving cache-control headers
- Subpath exports: `@carlosnc/tmdb-sdk/sveltekit` and `@carlosnc/tmdb-sdk/nextjs` for importing the adapters

## [0.11.0] - 2026-06-03

### Added
- `AwardsClient` — standalone client that fetches award data from the OMDb API via `getByImdbId()`, returning structured win/nomination counts, ratings (IMDb, Rotten Tomatoes, Metacritic), and the raw award summary
- `includeAwards` option on `MovieClient.getDetails()` and `TvClient.getDetails()` — when `true` and an OMDb API key is configured, award data is automatically fetched and merged into the response under an `awards` field
- `omdbApiKey` option on `TMDBClientConfig` — accepts an OMDb API key; when provided, it's passed to both the `MovieClient` and `TvClient` for optional award enrichment
- Type exports: `AwardsInfo`, `OmdbRating`, `AwardsClient`, `MovieDetailsWithAwards`, `TvSeriesDetailsWithAwards`
- 11 test cases for awards parsing, movie awards integration, and TV awards integration

### Changed
- `MovieClient` and `TvClient` constructors now accept an optional `omdbApiKey` parameter

## [0.10.1] - 2026-05-31

### Fixed
- Examples (`movie.ts`, `person.ts`, `tv-series.ts`) now use `appendToResponse` (camelCase) instead of `append_to_response` (snake_case), fixing typecheck errors introduced by v0.10.0 param standardization
- Removed stale `includeAdult` test cases from `trending.test.ts` that referenced a param removed from `TrendingParams` in v0.10.0

## [0.10.0] - 2026-05-31

### Fixed
- Discover method date-range params (`primaryReleaseDateGte`, `firstAirDateLte`, etc.) now correctly serialize with dot notation (`.gte`/`.lte`) instead of underscore, fixing TMDB API silently ignoring them

### Changed
- All param interface fields standardized to camelCase: `sessionId`, `guestSessionId`, `appendToResponse`, `includeImageLanguage`, `includeVideoLanguage`, `startDate`, `endDate` — users no longer need to mix snake_case keys in some param objects

### Removed
- `includeAdult` from `TrendingParams` — TMDB trending endpoints don't accept it
- `includeAdult` and `page` from `FindByIdParams` — TMDB find endpoint doesn't accept them
- `region` from `SearchTvParams`, `SearchPersonParams`, `SearchMultiParams` — TMDB search endpoints don't accept these

## [0.9.3] - 2026-05-30

### Fixed
- `TrendingClient` methods (`getAll`, `getMovies`, `getPeople`, `getTvShows`) now pass `page` and `includeAdult` params to the API instead of always returning page 1
- Refactored to use shared `buildQueryParams` utility for consistent param serialization

## [0.9.2] - 2026-05-29

### Added
- `SECURITY.md` policy file detailing vulnerability reporting process
- Tests for URL redaction in error objects

### Changed
- `FetchAdapter` now redacts `api_key`, `session_id`, and `guest_session_id` from the URL string attached to `TMDBError` objects to prevent accidental secret leakage in logs.
- `README.md` now recommends using `accessToken` over `apiKey` for enhanced security.
## [0.9.1] - 2026-05-26

### Fixed
- Added `bun.lock` that was missing from previous commit

## [0.9.0] - 2026-05-26

### Added
- `HttpClient` interface — swap the HTTP backend by implementing `get`/`post`/`put`/`delete`
- `FetchAdapter` — built-in adapter using native `fetch()` (no axios dependency)
- `TMDBClientConfig.httpClient` option — inject a custom adapter (auth/retry on you)
- Custom HTTP adapters documentation in README

### Changed
- Removed `axios` dependency — SDK is now zero-dependency at runtime
- All namespace clients accept `HttpClient` instead of `AxiosInstance`

## [0.8.0] - 2026-05-25

### Added
- `paginateAll` async generator utility — auto-fetch all pages from any paginated endpoint without manual loops
- Pagination example (`examples/pagination.ts`) demonstrating both `paginateAll` and manual page iteration
- Test suite for `paginateAll` (5 tests)

### Changed
- README: added npm downloads badge, updated description (removed test count, "lightweight" → "complete")

## [0.7.0] - 2026-05-25

### Added
- `tvSeason` namespace — `TvSeasonClient` for TV season endpoints (details, account states, aggregate credits, changes, credits, external IDs, images, translations, videos, watch providers)
- `tvEpisode` namespace — `TvEpisodeClient` for TV episode endpoints (details, account states, changes, credits, external IDs, images, translations, videos, add/delete rating)
- `tvEpisodeGroup` namespace — `TvEpisodeGroupClient.getDetails()` for `/3/tv/episode_group/{id}`
- `*AppendToResponseResult<T>` conditional types — `getDetails()` now auto-resolves return type to include only the requested append fields when `as const` is used
- Test suites for all 3 new namespace clients (387 tests across 30 files)

### Changed
- `With*AppendToResponse` types now accept `readonly` arrays to support `as const` tuple inference

### Fixed
- `getDetails()` return type no longer requires manual `as` casting with `append_to_response`

## [0.6.1] - 2026-05-25

### Fixed
- CI matrix reduced to Linux-only (ubuntu-latest)
- TypeScript errors in collection and person test mock data
- README namespace table malformed column separator

## [0.6.0] - 2026-05-25

### Added
- `credit` namespace — `CreditClient.getDetails()` for `/3/credit/{credit_id}`
- Account, authentication, credit, trending, and TV series examples
- Typedoc configuration + `bun run docs` script
- GitHub Pages workflow for API docs deployment
- Publish-release agent skill

### Changed
- README: updated namespace count (21 → 25) and test count (242 → 306)
- `TvClient.getSeasonChanges` → `getSeasonChangesById` (correct URL)
- `TvClient.getEpisodeChanges` → `getEpisodeChangesById` (correct URL)

## [0.5.0] - 2026-05-24

### Added
- `TMDBClient.http` — Axios instance is now public for post-construction configuration (timeout, proxy, custom interceptors)
- `TMDBClientConfig.axiosInstance` — accept a custom Axios instance (useful for testing mocks, proxy setup)
- v3 vs v4 API comparison link in README Resources section

### Changed
- Refined TMDB logo sizing in README header

## [0.4.0] - 2026-05-24

### Added
- **TMDB API v4 support** — three new client namespaces:
  - `accountV4` — get/create lists, favorites, rated, watchlist (7 endpoints)
  - `authV4` — create request token, create access token, logout (3 endpoints)
  - `listV4` — CRUD lists and manage items (9 endpoints)
- New type files: `account-v4.ts`, `auth-v4.ts`, `list-v4.ts`
- New test suites: 32 v4 tests across 3 files

### Changed
- `ImageUrlBuilder` utility with typed size constants and per-type convenience methods (`backdrop()`, `logo()`, `poster()`, `profile()`, `still()`)
- `ConfigurationClient` now has `getImageBuilder()` for a pre-configured builder

## [0.3.0] - 2026-05-24

### Added
- Retry interceptor with exponential backoff (configurable via `TMDBClientConfig.retry`)
- Shared `buildQueryParams` utility with camelCase-to-snake_case conversion
- `page` and `includeAdult` params to `TrendingParams`
- `append_to_response` support to `CollectionClient.getDetails`
- `includeAdult` and `page` params to `FindByIdParams`
- `region` param to `SearchMultiParams`, `SearchPersonParams`, `SearchTvParams`
- Watch providers test suite (6 tests)

### Changed
- All client modules refactored to use shared `buildQueryParams` utility
- `WatchProvidersListParams.watch_region` renamed to `watchRegion` (camelCase)
- `append_to_response` handling: replaced non-null assertions with safe optional chaining

### Fixed
- Network client JSDoc `@see` URLs (were pointing to `alternative-names-copy`)
- `tsconfig.build.json` missing `bun` types causing `setTimeout` resolution error

## [0.2.0] - 2026-05-24

### Added
- `append_to_response` now accepts typed arrays instead of raw strings
- `WithMovieAppendToResponse`, `WithPersonAppendToResponse`, `WithTvAppendToResponse` utility types for typed response intersection
- Discover and search examples (`examples/discover.ts`, `examples/search.ts`)
- `append_to_response` dedup tests and TV append tests
- Resources section in README with TMDB API links

### Changed
- `append_to_response` params: `string` → typed union arrays (`MovieAppendToResponseValue[]`, etc.)
- Runtime dedup via `[...new Set(array)]` on `append_to_response` values
- Client methods now convert arrays to comma-separated strings for the API

## [0.1.1] - 2026-05-24

### Added
- Typed literal unions for `append_to_response` across all 5 detail endpoints (movie, tv, tv-season, tv-episode, person)
- CHANGELOG.md

### Changed
- Package scope from `tmdb-sdk` → `@carlosnc/tmdb-sdk`
- `client.getConfiguration()` → `client.configuration.getDetails()`
- README: updated install/import commands, added movie example

### Removed
- Root `index.ts` playground script
- Redundant `getConfiguration()` convenience proxy from `TMDBClient`

### Fixed
- npm scope corrected to match `carlosnc` npm user

## [0.1.0] - 2026-05-23

### Added
- **21 API namespaces**: account, authentication, certification, changes, collection, company, configuration, discover, find, genre, guest-session, keyword, list, movie, network, person, review, search, trending, tv, watch-providers
- **242 tests** (mocked + live integration)
- Full TypeScript types for all request/response shapes
- Axios-based HTTP client with Bearer token and API key auth
- Build pipeline (`tsc`), CI (GitHub Actions)
- README with quick start, namespace table, and project structure
- LICENSE (MIT)
