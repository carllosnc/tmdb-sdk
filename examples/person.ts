/**
 * Explore people: currently popular performers and detailed profiles with
 * filmography.
 *
 * Endpoints:
 *   - getPopular()         — trending people right now
 *   - getDetails()         — bio, birthday, birthplace
 *   - append_to_response   — merge combined_credits & external_ids
 *
 * The `as const` assertion on append_to_response lets TypeScript resolve
 * the exact returned shape instead of a generic PersonDetails.
 */
import { TMDBClient } from "../src/index.js";
import { header, field, sub, list } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// --- Popular people --------------------------------------------------------
const popular = await client.person.getPopular({ language: "en-US", page: 1 });

let output = header("Popular People");
output += `\n${field("Total", popular.total_results)}`;
output += sub("Top 5");
output += `\n${list(popular.results, (p) => `${p.name} — ${p.known_for_department}`, 5)}`;

// --- Person details + combined credits via append_to_response --------------
const PERSON_ID = 6193; // Keanu Reeves
const person = await client.person.getDetails(PERSON_ID, {
  appendToResponse: ["combined_credits", "external_ids"] as const,
});

output += header(`Person: ${person.name}`);
output += `\n${field("Born", `${person.birthday ?? "Unknown"} in ${person.place_of_birth ?? "Unknown"}`)}`;
output += `\n${field("Known for", person.known_for_department)}`;
output += `\n${field("IMDb", person.external_ids.imdb_id)}`;
output += `\n${field("Biography", `${person.biography.slice(0, 240)}\u2026`)}`;

// Sort combined credits by popularity descending, show top roles
const topCast = person.combined_credits.cast
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 6);

output += sub("Top roles by popularity");
output += `\n${list(topCast, (r) => {
  const title = r.title ?? r.name;
  return `${title} as ${r.character} (${r.media_type})`;
})}`;

console.log(output);
