import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

const movie = await client.movie.getDetails(550);

console.log("Title:", movie.title);
console.log("Tagline:", movie.tagline);
console.log("Release Date:", movie.release_date);
console.log("Runtime:", movie.runtime, "mins");
console.log("Genres:", movie.genres?.map((g) => g.name).join(", "));
console.log("Overview:", movie.overview);
console.log(movie.genres)
console.log(movie.imdb_id)
