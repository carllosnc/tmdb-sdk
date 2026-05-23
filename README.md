# TMDB SDK

[![CI](https://github.com/carllosnc/tmdb-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/carllosnc/tmdb-sdk/actions/workflows/ci.yml)

A lightweight, fully-typed TypeScript client for the [TMDB API v3](https://developer.themoviedb.org/). 21 namespaces, 242 tests, zero runtime dependencies beyond `axios`.

```bash
bun add tmdb-sdk
```

## Authentication

```typescript
import { TMDBClient } from "tmdb-sdk";

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
const config = await client.getConfiguration();

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
bun run tsc

# Run the demo
bun run index.ts
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

Built with [Bun](https://bun.sh).
