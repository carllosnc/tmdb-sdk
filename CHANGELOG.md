# Changelog

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
