/**
 * Fetch the list of movie and TV genres recognised by TMDB.
 *
 * Genre IDs from these lists are used as filters in discover, search, and
 * media detail endpoints (e.g. `withGenres: "28,12"`).
 */
import { TMDBClient } from "../src/index.js";
import { header, list } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// --- Movie genres ----------------------------------------------------------
const movieGenres = await client.genre.getMovies({ language: "en-US" });

let output = header("Movie Genres");
output += `\n${list(movieGenres.genres, (g) => `${g.id}: ${g.name}`)}`;

// --- TV genres -------------------------------------------------------------
const tvGenres = await client.genre.getTvShows({ language: "en-US" });

output += header("TV Genres");
output += `\n${list(tvGenres.genres, (g) => `${g.id}: ${g.name}`)}`;

console.log(output);
