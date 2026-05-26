/**
 * See what's trending on TMDB across movies, TV, and people.
 *
 * The `timeWindow` parameter accepts "day" or "week".
 * Trending is a great way to surface currently popular content without
 * needing search queries or discovery filters.
 *
 * Endpoints:
 *   - getMovies()   — trending movies
 *   - getTvShows()  — trending TV shows
 *   - getPeople()   — trending people
 */
import { TMDBClient } from "../src/index.js";
import { header, sub, list } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// --- Trending movies (this week) -------------------------------------------
const movies = await client.trending.getMovies({ timeWindow: "week" });

let output = header("Trending Movies (this week)");
output += `\n${list(movies.results, (m) => `${m.title} \u2b50 ${m.vote_average}`, 5)}`;

// --- Trending TV (today) ---------------------------------------------------
const tv = await client.trending.getTvShows({ timeWindow: "day" });

output += header("Trending TV (today)");
output += `\n${list(tv.results, (s) => `${s.name} \u2b50 ${s.vote_average}`, 5)}`;

// --- Trending people (this week) -------------------------------------------
const people = await client.trending.getPeople({ timeWindow: "week" });

output += header("Trending People (this week)");
output += `\n${list(people.results, (p) => `${p.name} \u2014 ${p.known_for_department}`, 5)}`;

console.log(output);
