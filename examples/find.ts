import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Find by IMDb ID
const found = await client.find.findById("tt0133093", {
  externalSource: "imdb_id",
  language: "en-US",
});

console.log("=== Find by IMDb ID (tt0133093) ===");

const movie = found.movie_results[0];
if (movie) {
  console.log("Movie:", movie.title, `(${movie.release_date})`);
  console.log("Overview:", movie.overview);
}

const person = found.person_results[0];
if (person) {
  console.log("\nPerson:", person.name, `— ${person.known_for_department}`);
}
