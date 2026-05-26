/**
 * Retrieve TMDB system configuration — essential for building image URLs
 * and understanding what data the API tracks.
 *
 * Endpoints:
 *   - getDetails()          — image base URLs, supported sizes, change keys
 *   - getImageBuilder()     — helper that builds image URLs with size validation
 *   - getCountries()        — countries TMDB recognises
 *   - getLanguages()        — languages TMDB supports
 *   - getJobs()             — crew job titles grouped by department
 */
import { TMDBClient } from "../src/index.js";
import { header, field, sub, list, count } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// --- System config ---------------------------------------------------------
const config = await client.configuration.getDetails();

let output = header("API Configuration");
output += `\n${field("Secure base URL", config.images.secure_base_url)}`;
output += `\n${field("Poster sizes", config.images.poster_sizes.join(", "))}`;
output += `\n${field("Backdrop sizes", config.images.backdrop_sizes.join(", "))}`;
output += `\n${field("Change keys", `${config.change_keys.slice(0, 5).join(", ")} …`)}`;

// --- Image URL builder -----------------------------------------------------
// The ImageUrlBuilder validates sizes at runtime and constructs full URLs.
const image = await client.configuration.getImageBuilder();
const posterUrl = image.getPosterUrl("/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", "w500");

output += header("Image URL Builder");
output += `\n${field("Poster URL", posterUrl)}`;

// --- Countries -------------------------------------------------------------
const countries = await client.configuration.getCountries({ language: "en-US" });

output += header(`Countries (${countries.length})`);
output += `\n${list(countries, (c) => `${c.iso_3166_1}: ${c.english_name}`, 5)}`;

// --- Languages -------------------------------------------------------------
const languages = await client.configuration.getLanguages();

output += header(`Languages (${languages.length})`);
output += `\n${list(languages, (l) => `${l.iso_639_1}: ${l.english_name}`, 5)}`;

// --- Jobs ------------------------------------------------------------------
const jobs = await client.configuration.getJobs();

output += header(`Departments (${jobs.length})`);
for (const dept of jobs) {
  output += `\n${count(`  ${dept.department}`, dept.jobs.length)}`;
}

console.log(output);
