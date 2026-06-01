/**
 * Demonstrate fetching movie details with and without append_to_response.
 *
 * - `getDetails(id)` returns a plain MovieDetails object.
 * - `getDetails(id, { append_to_response })` merges extra endpoints into
 *   a single response — fewer HTTP round-trips, same data.
 *   Use `as const` on the array so TypeScript infers the exact shape.
 */
import { TMDBClient } from "../src/index.js";
import { header, field, sub, count } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// --- Basic movie details ---------------------------------------------------
// Every namespace method returns a fully-typed response inferred from the
// endpoint.  No manual type annotation needed.
const movie = await client.movie.getDetails(500);

let output = header("Movie (id: 500)");
output += `\n${field("Title", movie.title)}`;
output += `\n${field("Tagline", movie.tagline)}`;
output += `\n${field("Released", movie.release_date)}`;
output += `\n${field("Runtime", `${movie.runtime} mins`)}`;
output += `\n${field("Rating", `${movie.vote_average}/10`)}`;
output += `\n${field("Genres", movie.genres?.map((g) => g.name).join(", "))}`;
output += `\n${field("IMDb", movie.imdb_id)}`;

// --- Append-to-response ----------------------------------------------------
// Merge videos, images, and credits into one call for efficiency.
// The return type automatically widens to include those nested responses.
const full = await client.movie.getDetails(550, {
  appendToResponse: ["videos", "images", "credits"] as const,
});

output += header("Movie + append_to_response (id: 550, Fight Club)");
output += `\n${count("Trailers", full.videos.results.length)}`;
output += `\n${count("Backdrops", full.images.backdrops.length)}`;
output += `\n${count("Cast members", full.credits.cast.length)}`;

output += sub("Top cast");
output += `\n${full.credits.cast.slice(0, 5).map((c) => `  ${c.character} — ${c.name}`).join("\n")}`;

console.log(output);
