import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Search movies
const movieResults = await client.search.searchMovies({
  query: "inception",
  language: "en-US",
  page: 1,
});

console.log("=== Search Movies: inception ===");
console.log("Total results:", movieResults.total_results);
for (const movie of movieResults.results) {
  console.log(`  ${movie.title} (${movie.release_date}) ⭐ ${movie.vote_average}`);
}

// Multi-search (movies + TV + people)
const multiResults = await client.search.searchMulti({
  query: "batman",
  includeAdult: false,
});

console.log("\n=== Multi Search: batman ===");
console.log("Total results:", multiResults.total_results);
for (const item of multiResults.results.slice(0, 5)) {
  switch (item.media_type) {
    case "movie":
      console.log(`  [Movie]  ${item.title}`);
      break;
    case "tv":
      console.log(`  [TV]     ${item.name}`);
      break;
    case "person":
      console.log(`  [Person] ${item.name}`);
      break;
  }
}

// Search people
const peopleResults = await client.search.searchPeople({
  query: "Tom Hanks",
});

console.log("\n=== Search People: Tom Hanks ===");
for (const person of peopleResults.results) {
  console.log(`  ${person.name} — known for ${person.known_for_department}`);
}
