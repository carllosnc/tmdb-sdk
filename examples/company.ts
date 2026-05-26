import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Production company details
const company = await client.company.getDetails(174);

console.log("=== Company: Warner Bros. Pictures ===");
console.log("Description:", company.description);
console.log("Headquarters:", company.headquarters);
console.log("Country:", company.origin_country);
console.log("Homepage:", company.homepage);
if (company.parent_company) {
  console.log("Parent:", company.parent_company.name);
}

// Alternative names
const altNames = await client.company.getAlternativeNames(174);

console.log(`\nAlternative names: ${altNames.results.length}`);
for (const alt of altNames.results) {
  console.log(`  ${alt.name} (${alt.type})`);
}

// Company logos
const images = await client.company.getImages(174);

console.log(`\nLogos: ${images.logos.length}`);
const logo = images.logos[0];
if (logo) {
  console.log(`  ${logo.file_path} (${logo.width}x${logo.height})`);
}
