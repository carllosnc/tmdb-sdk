/**
 * Demonstrate the three most common search modes:
 *
 * 1. searchMovies()   — narrow search within movies only
 * 2. searchMulti()    — search across movies, TV, and people at once
 * 3. searchPeople()   — find actors, directors, writers
 *
 * Each returns a PaginatedResponse typed to the relevant result shape.
 * Multi-search results use a discriminated union on `media_type`.
 */
import { TMDBClient } from "../src/index.js";
import { header, field, sub, list } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// --- Movie search ----------------------------------------------------------
const movieResults = await client.search.searchMovies({
  query: "inception",
  language: "en-US",
  page: 1,
});

let output = header('Search movies: "inception"');
output += `\n${field("Total results", movieResults.total_results)}`;
output += `\n${list(movieResults.results, (m) => `${m.title} (${m.release_date}) \u2b50 ${m.vote_average}`)}`;

// --- Multi search ----------------------------------------------------------
const multiResults = await client.search.searchMulti({
  query: "batman",
  includeAdult: false,
});

output += header('Multi search: "batman" (first 8)');
output += `\n${field("Total results", multiResults.total_results)}`;
output += sub("Results");
for (const item of multiResults.results.slice(0, 8)) {
  const label = item.media_type === "movie"
    ? `[Movie]  ${item.title}`
    : item.media_type === "tv"
      ? `[TV]     ${item.name}`
      : `[Person] ${item.name}`;
  output += `\n  ${label}`;
}

// --- People search ---------------------------------------------------------
const peopleResults = await client.search.searchPeople({
  query: "Tom Hanks",
});

output += header('Search people: "Tom Hanks"');
output += `\n${list(peopleResults.results, (p) => `${p.name} \u2014 ${p.known_for_department}`)}`;

console.log(output);
