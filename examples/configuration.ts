import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// API system configuration
const config = await client.configuration.getDetails();

console.log("=== API Configuration ===");
console.log("Base URL:", config.images.secure_base_url);
console.log("Poster sizes:", config.images.poster_sizes.join(", "));
console.log("Backdrop sizes:", config.images.backdrop_sizes.join(", "));
console.log("Change keys:", config.change_keys.slice(0, 5).join(", "), "...");

// Image URL builder helper
const image = await client.configuration.getImageBuilder();
const posterUrl = image.getPosterUrl("/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", "w500");
console.log("\nSample poster URL:", posterUrl);

// Supported countries
const countries = await client.configuration.getCountries({ language: "en-US" });
console.log(`\nCountries: ${countries.length}`);
for (const c of countries.slice(0, 5)) {
  console.log(`  ${c.iso_3166_1}: ${c.english_name}`);
}

// Languages
const languages = await client.configuration.getLanguages();
console.log(`\nLanguages: ${languages.length}`);
for (const lang of languages.slice(0, 5)) {
  console.log(`  ${lang.iso_639_1}: ${lang.english_name}`);
}

// Job departments
const jobs = await client.configuration.getJobs();
console.log(`\nDepartments: ${jobs.length}`);
for (const dept of jobs) {
  console.log(`  ${dept.department} (${dept.jobs.length} jobs)`);
}
