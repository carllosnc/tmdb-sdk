/**
 * Use TMDB's discover engine to find movies and TV shows by filters.
 *
 * The discover endpoints are the most flexible way to surface content:
 * sort by vote average, release year, genre, language, etc.
 *
 * Endpoints:
 *   - getMovies()   — filter and sort movies
 *   - getTvShows()  — filter and sort TV shows
 */
import { TMDBClient } from "../src/index.js";
import { header, field, sub, list } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// --- Top-rated action / adventure movies of 2024 ---------------------------
const movies = await client.discover.getMovies({
  primaryReleaseYear: 2024,
  sortBy: "vote_average.desc",
  voteCountGte: 100,
  withGenres: "28,12",
  language: "en-US",
  page: 1,
});

let output = header("Discover: Top Action/Adventure (2024)");
output += `\n${field("Total results", movies.total_results)}`;
output += sub("Top 5");
output += `\n${list(movies.results, (m) => `${m.title} — ${m.release_date} \u2b50 ${m.vote_average}`, 5)}`;

// --- Popular scripted TV shows ---------------------------------------------
const tv = await client.discover.getTvShows({
  sortBy: "popularity.desc",
  withType: "Scripted",
  voteCountGte: 50,
  page: 1,
});

output += header("Discover: Popular Scripted TV");
output += `\n${field("Total results", tv.total_results)}`;
output += sub("Top 5");
output += `\n${list(tv.results, (s) => `${s.name} — ${s.first_air_date} \u2b50 ${s.vote_average}`, 5)}`;

console.log(output);
