/**
 * Explore a movie collection — the set of films that belong to the same
 * franchise (e.g. The Lord of the Rings, Star Wars).
 *
 * Endpoints:
 *   - getDetails()      — description + list of parts
 *   - getImages()       — backdrops and posters for the collection
 *   - getTranslations() — available language localisations
 */
import { TMDBClient } from "../src/index.js";
import { header, field, sub, list } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

const COLLECTION_ID = 119; // The Lord of the Rings

// --- Collection details ----------------------------------------------------
const collection = await client.collection.getDetails(COLLECTION_ID);

let output = header(`Collection: ${collection.name}`);
output += `\n${field("Overview", collection.overview)}`;
output += `\n${field("Parts", collection.parts.length)}`;

output += sub("Movies");
output += `\n${list(collection.parts, (p) => `${p.name} (${p.release_date})`)}`;

// --- Images -----------------------------------------------------------------
const images = await client.collection.getImages(COLLECTION_ID, { language: "en" });

output += header("Images");
output += `\n${field("Backdrops", images.backdrops.length)}`;
output += `\n${field("Posters", images.posters.length)}`;

const img = images.backdrops[0];
if (img) {
  output += `\n${field("Sample backdrop", `${img.file_path} (${img.width}\u00d7${img.height})`)}`;
}

// --- Translations -----------------------------------------------------------
const translations = await client.collection.getTranslations(COLLECTION_ID);

output += header(`Translations (${translations.translations.length})`);
output += `\n${list(translations.translations, (t) => `${t.english_name} (${t.iso_639_1})`, 5)}`;

console.log(output);
