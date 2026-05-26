import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Basic movie details (return type: MovieDetails)
const movie = await client.movie.getDetails(500);

console.log("Title:", movie.title);
console.log("Tagline:", movie.tagline);
console.log("Release Date:", movie.release_date);
console.log("Runtime:", movie.runtime, "mins");
console.log("Genres:", movie.genres?.map((g) => g.name).join(", "));
console.log("Overview:", movie.overview);
console.log("IMDB:", movie.imdb_id);

// Typed response with append_to_response — use `as const` for precise inference
// Return type auto-resolves to: MovieDetails & { videos: MovieVideosResponse; images: MovieImagesResponse }
const full = await client.movie.getDetails(550, {
  append_to_response: ["videos", "images", "credits"] as const,
});

console.log("Videos:", full.videos.results.length);
console.log("Images:", full.images.backdrops.length);
console.log("Credits:", full.credits.cast)

