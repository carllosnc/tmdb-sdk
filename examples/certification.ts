import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Movie certifications by country
const movies = await client.certification.getMovieCertifications();

console.log("=== Movie Certifications ===");
for (const [country, certs] of Object.entries(movies.certifications).slice(0, 5)) {
  console.log(`\n${country}:`);
  for (const c of certs) {
    console.log(`  ${c.certification} — ${c.meaning}`);
  }
}

// TV certifications
const tv = await client.certification.getTVCertifications();

console.log("\n\n=== TV Certifications ===");
for (const [country, certs] of Object.entries(tv.certifications).slice(0, 5)) {
  console.log(`\n${country}:`);
  for (const c of certs) {
    console.log(`  ${c.certification} — ${c.meaning}`);
  }
}
