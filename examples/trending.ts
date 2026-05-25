import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Trending movies this week
const movies = await client.trending.getMovies({
  timeWindow: "week",
});

console.log("=== Trending Movies (this week) ===");
for (const movie of movies.results.slice(0, 5)) {
  console.log(`  ${movie.title} ⭐ ${movie.vote_average}`);
}

// Trending TV today
const tv = await client.trending.getTvShows({
  timeWindow: "day",
});

console.log("\n=== Trending TV (today) ===");
for (const show of tv.results.slice(0, 5)) {
  console.log(`  ${show.name} ⭐ ${show.vote_average}`);
}

// Trending people
const people = await client.trending.getPeople({
  timeWindow: "week",
});

console.log("\n=== Trending People (this week) ===");
for (const person of people.results.slice(0, 5)) {
  console.log(`  ${person.name} — known for ${person.known_for_department}`);
}
