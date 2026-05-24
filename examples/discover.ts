import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Discover top-rated action/adventure movies from 2024
const movies = await client.discover.getMovies({
  primaryReleaseYear: 2024,
  sortBy: "vote_average.desc",
  voteCountGte: 100,
  withGenres: "28,12",
  language: "en-US",
  page: 1,
});

console.log("=== Discover Movies (2024, Action + Adventure) ===");
console.log("Total results:", movies.total_results);
for (const movie of movies.results.slice(0, 5)) {
  console.log(`  ${movie.title} — ${movie.release_date} ⭐ ${movie.vote_average}`);
}

// Discover popular scripted TV shows
const tv = await client.discover.getTvShows({
  sortBy: "popularity.desc",
  withType: "Scripted",
  voteCountGte: 50,
  page: 1,
});

console.log("\n=== Discover TV (Popular Scripted) ===");
console.log("Total results:", tv.total_results);
for (const show of tv.results.slice(0, 5)) {
  console.log(`  ${show.name} — ${show.first_air_date} ⭐ ${show.vote_average}`);
}
