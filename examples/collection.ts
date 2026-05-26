import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// The Lord of The Rings collection
const collection = await client.collection.getDetails(119);

console.log("=== Collection: The Lord of the Rings ===");
console.log("Overview:", collection.overview);
console.log("Parts:", collection.parts.length);
for (const part of collection.parts) {
  console.log(`  ${part.name} (${part.release_date}) ⭐ ${part.vote_average}`);
}

// Collection images
const images = await client.collection.getImages(119, { language: "en" });

console.log(`\nBackdrops: ${images.backdrops.length}, Posters: ${images.posters.length}`);
const img = images.backdrops[0];
if (img) {
  console.log(`Sample backdrop: ${img.file_path} (${img.width}x${img.height})`);
}

// Available translations
const translations = await client.collection.getTranslations(119);

console.log(`\nTranslations: ${translations.translations.length} languages`);
for (const t of translations.translations.slice(0, 5)) {
  console.log(`  ${t.english_name} (${t.iso_639_1})`);
}
