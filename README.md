# TMDB - SDK

A lightweight TypeScript client for the [TMDB API v3](https://developer.themoviedb.org/). It wraps common endpoints with typed requests and responses, organized by namespace (`account`, `authentication`).

## Installation

```bash
bun install
```

## Authentication

Create a client with either a **v3/v4 read access token** (recommended) or an **API key**:

```typescript
import { TMDBClient } from "./src/index.ts";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN,
});

// or
const clientWithKey = new TMDBClient({
  apiKey: process.env.TMDB_KEY,
});
```

Get credentials from your [TMDB API settings](https://www.themoviedb.org/settings/api).

## Usage

```typescript
import { TMDBClient } from "./src/index.ts";

const client = new TMDBClient({ accessToken: process.env.TMDB_TOKEN });

// Validate credentials
const keyCheck = await client.authentication.validateKey();
console.log(keyCheck.success); // true

// System configuration (image base URLs, sizes, etc.)
const config = await client.getConfiguration();
console.log(config.images.base_url);

// Account (requires a user access token)
const account = await client.account.getDetails();
console.log(account.username);

// Guest session (no user login required)
const guest = await client.authentication.createGuestSession();
console.log(guest.guest_session_id);
```

## Development

```bash
# Run the demo script
bun run index.ts

# Run tests (mocked by default; set TMDB_TOKEN for live API tests)
bun test
```

## Project structure

- `src/client/account` — favorites, watchlists, ratings, lists
- `src/client/authentication` — sessions, request tokens, guest sessions, key validation
- `src/types` — TypeScript types for API responses

Built with [Bun](https://bun.com).
