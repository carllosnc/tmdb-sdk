/**
 * Query streaming availability: which services offer movies and TV shows
 * in each region.
 *
 * Typical workflow:
 *   1. Get supported regions via getAvailableRegions().
 *   2. Pick a region (e.g. "US") and query which providers are available.
 *
 * The provider IDs returned here can be passed to movie / TV detail
 * endpoints to get per-title streaming links.
 *
 * Endpoints:
 *   - getAvailableRegions() — countries where TMDB tracks providers
 *   - getMovieProviders()   — streaming services for movies in a region
 *   - getTvProviders()      — streaming services for TV in a region
 */
import { TMDBClient } from "../src/index.js";
import { header, field, sub, list } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// --- Available regions -----------------------------------------------------
const regions = await client.watchProviders.getAvailableRegions();

let output = header(`Watch Provider Regions (${regions.results.length})`);
output += `\n${list(regions.results, (r) => `${r.iso_3166_1}: ${r.english_name}`, 10)}`;

// --- Movie providers in the US --------------------------------------------
const movieProviders = await client.watchProviders.getMovieProviders({
  watchRegion: "US",
});

output += header(`Movie Providers (US) \u2014 ${movieProviders.results.length}`);
output += `\n${list(movieProviders.results, (p) => `${p.provider_name} (priority ${p.display_priority})`, 10)}`;

// --- TV providers in the US ------------------------------------------------
const tvProviders = await client.watchProviders.getTvProviders({
  watchRegion: "US",
});

output += header(`TV Providers (US) \u2014 ${tvProviders.results.length}`);
output += `\n${list(tvProviders.results, (p) => p.provider_name, 10)}`;

console.log(output);
