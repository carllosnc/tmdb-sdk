import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Keyword details
const keyword = await client.keyword.getDetails(180547);

console.log("=== Keyword ===");
console.log("ID:", keyword.id);
console.log("Name:", keyword.name);

// Movies tagged with this keyword
const movies = await client.keyword.getMovies(180547, {
  language: "en-US",
  page: 1,
});

console.log(`\nMovies with keyword "${keyword.name}": ${movies.total_results} total`);
for (const movie of movies.results.slice(0, 5)) {
  console.log(`  ${movie.title} (${movie.release_date}) ⭐ ${movie.vote_average}`);
}
