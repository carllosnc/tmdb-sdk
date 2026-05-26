import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Movie genres
const movieGenres = await client.genre.getMovies({ language: "en-US" });

console.log("=== Movie Genres ===");
for (const genre of movieGenres.genres) {
  console.log(`  ${genre.id}: ${genre.name}`);
}

// TV genres
const tvGenres = await client.genre.getTvShows({ language: "en-US" });

console.log("\n=== TV Genres ===");
for (const genre of tvGenres.genres) {
  console.log(`  ${genre.id}: ${genre.name}`);
}
