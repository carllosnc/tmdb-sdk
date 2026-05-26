import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Popular people right now
const popular = await client.person.getPopular({ language: "en-US", page: 1 });

console.log("=== Popular People ===");
console.log("Total results:", popular.total_results);
for (const person of popular.results.slice(0, 5)) {
  console.log(`  ${person.name} — ${person.known_for_department} (⭐ ${person.popularity})`);
}

// Person details with combined credits via append_to_response
const person = await client.person.getDetails(6193, {
  append_to_response: ["combined_credits", "external_ids"] as const,
});

console.log(`\n=== Person: ${person.name} ===`);
console.log("Born:", person.birthday, "in", person.place_of_birth);
console.log("Biography:", person.biography.slice(0, 200) + "...");
console.log("IMDb:", person.external_ids.imdb_id);
console.log("Known for:", person.known_for_department);

const topCast = person.combined_credits.cast
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 5);

console.log("\nTop 5 roles by popularity:");
for (const role of topCast) {
  const title = role.title ?? role.name;
  console.log(`  ${title} as ${role.character} (${role.media_type})`);
}
