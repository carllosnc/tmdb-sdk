# Changelog

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
