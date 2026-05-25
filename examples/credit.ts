import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Fetch credit details by credit ID
const credit = await client.credit.getDetails("6024a814c0ae36003d59cc3c");

console.log("=== Credit Details ===");
console.log("Credit type:", credit.credit_type);
console.log("Department:", credit.department);
console.log("Job:", credit.job);
console.log("Person:", credit.person.name);
console.log("Media:", credit.media.name, `(${credit.media.media_type})`);
console.log("Character:", credit.media.character);
