import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Available regions for watch providers
const regions = await client.watchProviders.getAvailableRegions();

console.log(`=== Watch Provider Regions (${regions.results.length} total) ===`);
for (const region of regions.results.slice(0, 10)) {
  console.log(`  ${region.iso_3166_1}: ${region.english_name}`);
}

// Movie streaming providers in the US
const movieProviders = await client.watchProviders.getMovieProviders({
  watchRegion: "US",
});

console.log(`\n=== Movie Providers (US) ===`);
for (const provider of movieProviders.results.slice(0, 10)) {
  console.log(`  ${provider.provider_name} (priority: ${provider.display_priority})`);
}

// TV streaming providers in the US
const tvProviders = await client.watchProviders.getTvProviders({
  watchRegion: "US",
});

console.log(`\n=== TV Providers (US) ===`);
for (const provider of tvProviders.results.slice(0, 10)) {
  console.log(`  ${provider.provider_name}`);
}
