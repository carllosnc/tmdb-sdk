/**
 * Look up TMDB entities using external IDs (IMDb, TVDB, Wikidata, etc.).
 *
 * Useful when you already know the ID from another service and need to
 * bridge to TMDB's internal ID for further API calls.
 *
 * The `externalSource` parameter accepts: imdb_id, tvdb_id, facebook_id,
 * instagram_id, tiktok_id, twitter_id, wikidata_id, youtube_id.
 */
import { TMDBClient } from "../src/index.js";
import { header, field } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Search for "The Matrix" by its IMDb ID
const found = await client.find.findById("tt0133093", {
  externalSource: "imdb_id",
  language: "en-US",
});

let output = header('Find: IMDb ID "tt0133093"');

const movie = found.movie_results[0];
if (movie) {
  output += `\n${field("Movie", `${movie.title} (${movie.release_date})`)}`;
  output += `\n${field("Overview", movie.overview)}`;
}

const person = found.person_results[0];
if (person) {
  output += `\n${field("Person", `${person.name} \u2014 ${person.known_for_department}`)}`;
}

if (!movie && !person) {
  output += "\n  No results found.";
}

console.log(output);
