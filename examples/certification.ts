/**
 * List content certifications by country for movies and TV.
 *
 * Useful for building filters or displaying age ratings in a UI.
 *
 * Endpoints:
 *   - getMovieCertifications() — MPAA / national rating systems
 *   - getTVCertifications()    — TV rating systems
 */
import { TMDBClient } from "../src/index.js";
import { header, sub } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// --- Movie certifications --------------------------------------------------
const movies = await client.certification.getMovieCertifications();

let output = header("Movie Certifications");
for (const [country, certs] of Object.entries(movies.certifications).slice(0, 4)) {
  output += sub(country);
  for (const c of certs) {
    output += `\n  ${c.certification} — ${c.meaning}`;
  }
}

// --- TV certifications -----------------------------------------------------
const tv = await client.certification.getTVCertifications();

output += header("TV Certifications");
for (const [country, certs] of Object.entries(tv.certifications).slice(0, 4)) {
  output += sub(country);
  for (const c of certs) {
    output += `\n  ${c.certification} — ${c.meaning}`;
  }
}

console.log(output);
