<p align="center">
  <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="TMDB" width="200"/>
</p>

# TMDB SDK

[![CI](https://github.com/carllosnc/tmdb-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/carllosnc/tmdb-sdk/actions/workflows/ci.yml) ![npm](https://img.shields.io/npm/v/%40carlosnc%2Ftmdb-sdk) ![Bun](https://img.shields.io/badge/Bun-1.3.13-blue?logo=bun)

A lightweight, fully-typed TypeScript client for the [TMDB API v3](https://developer.themoviedb.org/). 21 namespaces, 242 tests, zero runtime dependencies beyond `axios`.

```bash
bun add @carlosnc/tmdb-sdk
```

## Authentication

```typescript
import { TMDBClient } from "@carlosnc/tmdb-sdk";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN, // recommended
});

// or with an API key
const client2 = new TMDBClient({
  apiKey: process.env.TMDB_KEY,
});
```

Get credentials from your [TMDB API settings](https://www.themoviedb.org/settings/api).

## Quick Start

```typescript
const client = new TMDBClient({ accessToken: process.env.TMDB_TOKEN });

// System config
const config = await client.configuration.getDetails();

// Account
const account = await client.account.getDetails();

// Movie details
const movie = await client.movie.getDetails(550);

// TV series with season
const season = await client.tv.getSeasonDetails(1399, 1);

// Search
const results = await client.search.getMovies({ query: "Matrix" });

// Watch providers
const regions = await client.watchProviders.getAvailableRegions();
```

## Movie Example

```typescript
const client = new TMDBClient({ accessToken: process.env.TMDB_TOKEN });

const movie = await client.movie.getDetails(550);

console.log("Title:", movie.title);
console.log("Tagline:", movie.tagline);
console.log("Release Date:", movie.release_date);
console.log("Runtime:", movie.runtime, "mins");
console.log("Genres:", movie.genres?.map((g) => g.name).join(", "));
console.log("Overview:", movie.overview);
```

## Namespaces

| Client | Key Methods |
|---|---|
| `client.account` | favorites, watchlist, ratings, lists |
| `client.authentication` | sessions, request tokens, guest sessions, key validation |
| `client.certification` | movie and TV certifications |
| `client.changes` | movie, TV, and person change log |
| `client.collection` | collection details, images, translations |
| `client.company` | company details, alternative names, images |
| `client.configuration` | API and image configuration |
| `client.discover` | movie and TV discovery with filters |
| `client.find` | find by external IDs |
| `client.genre` | movie and TV genre lists |
| `client.guestSession` | guest session rated movies/TV/episodes |
| `client.keyword` | keyword details and movies |
| `client.list` | create, read, update, delete lists |
| `client.movie` | details, credits, images, videos, ratings, watch providers, recommendations, similar, and more |
| `client.network` | network details and alternative names |
| `client.person` | details, credits, external IDs, images, tagged images, changes |
| `client.review` | review details |
| `client.search` | multi, movie, TV, person, collection, company, keyword |
| `client.trending` | trending movies, TV, people (day/week) |
| `client.tv` | series, season, and episode details, credits, images, videos, ratings, watch providers, episode groups, and more |
| `client.watchProviders` | available regions, movie providers, TV providers |

## Development

```bash
# Install dependencies
bun install

# Run tests (mocked by default; set TMDB_TOKEN for live API tests)
bun test

# Type-check
bun run typecheck

# Run examples (requires TMDB_TOKEN in .env or --env-file)
bun --env-file=.env run examples/movie.ts
```

## Project Structure

```
src/
├── client.ts            # TMDBClient — wires all sub-clients
├── index.ts             # Barrel exports
├── client/              # One directory per namespace
│   ├── account/
│   ├── authentication/
│   ├── certification/
│   ├── changes/
│   ├── collection/
│   ├── company/
│   ├── configuration/
│   ├── discover/
│   ├── find/
│   ├── genre/
│   ├── guest-session/
│   ├── keyword/
│   ├── list/
│   ├── movie/
│   ├── network/
│   ├── person/
│   ├── review/
│   ├── search/
│   ├── trending/
│   ├── tv/
│   └── watch-providers/
└── types/               # TypeScript interfaces for every endpoint
```

## Resources

- [TMDB API Reference — Getting Started](https://developer.themoviedb.org/reference/getting-started)
- [TMDB API Docs — Getting Started](https://developer.themoviedb.org/docs/getting-started)

---

Carlos Costa @ 2026
