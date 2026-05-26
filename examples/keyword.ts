/**
 * Look up a keyword and browse movies tagged with it.
 *
 * Keywords are user-contributed tags attached to movies.  Each keyword
 * has a numeric ID that can be used as a filter in discover or search.
 */
import { TMDBClient } from "../src/index.js";
import { header, field, sub, list } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

const KEYWORD_ID = 180547; // "mind-bending"

// --- Keyword metadata ------------------------------------------------------
const keyword = await client.keyword.getDetails(KEYWORD_ID);

let output = header(`Keyword: "${keyword.name}"`);
output += `\n${field("ID", keyword.id)}`;

// --- Movies with this keyword ----------------------------------------------
const movies = await client.keyword.getMovies(KEYWORD_ID, {
  language: "en-US",
  page: 1,
});

output += sub(`${movies.total_results} movies tagged`);
output += `\n${list(movies.results, (m) => `${m.title} (${m.release_date}) \u2b50 ${m.vote_average}`, 5)}`;

console.log(output);
