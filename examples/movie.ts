import { TMDBClient, type WithMovieAppendToResponse } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Basic movie details
const movie = await client.movie.getDetails(500);

console.log("Title:", movie.title);
console.log("Tagline:", movie.tagline);
console.log("Release Date:", movie.release_date);
console.log("Runtime:", movie.runtime, "mins");
console.log("Genres:", movie.genres?.map((g) => g.name).join(", "));
console.log("Overview:", movie.overview);
console.log("IMDB:", movie.imdb_id);

// Typed response with append_to_response
const full = await client.movie.getDetails(550, {
  append_to_response: ["videos", "images"],
}) as WithMovieAppendToResponse<["videos", "images"]>;

console.log("Videos:", full.videos.results.length);
console.log("Images:", full.images.backdrops.length);
