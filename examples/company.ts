/**
 * Look up production company metadata — useful for credits, corporate
 * research, or displaying studio logos.
 *
 * Endpoints:
 *   - getDetails()          — name, HQ, parent company
 *   - getAlternativeNames() — translated / alternate legal names
 *   - getImages()           — company logo files
 */
import { TMDBClient } from "../src/index.js";
import { header, field, sub, list, count } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

const COMPANY_ID = 174; // Warner Bros. Pictures

// --- Company details -------------------------------------------------------
const company = await client.company.getDetails(COMPANY_ID);

let output = header(`Company: ${company.name}`);
output += `\n${field("Description", company.description)}`;
output += `\n${field("Headquarters", company.headquarters)}`;
output += `\n${field("Country", company.origin_country)}`;
output += `\n${field("Homepage", company.homepage)}`;
if (company.parent_company) {
  output += `\n${field("Parent", company.parent_company.name)}`;
}

// --- Alternative names -----------------------------------------------------
const altNames = await client.company.getAlternativeNames(COMPANY_ID);

output += sub("Alternative names");
output += `\n${list(altNames.results, (a) => `${a.name} (${a.type})`)}`;

// --- Logos -----------------------------------------------------------------
const images = await client.company.getImages(COMPANY_ID);

output += header("Logos");
output += `\n${count("Total", images.logos.length)}`;
const logo = images.logos[0];
if (logo) {
  output += `\n${field("Sample", `${logo.file_path} (${logo.width}\u00d7${logo.height})`)}`;
}

console.log(output);
