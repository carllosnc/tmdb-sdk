/**
 * Fetch a single review by its TMDB review ID.
 *
 * Review IDs appear in movie / TV detail responses and can be used
 * to retrieve the full review text, author info, and rating.
 */
import { TMDBClient } from "../src/index.js";
import { header, field } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

const review = await client.review.getDetails("5488c29bc3a3682f3a00049f");

let output = header("Review");
output += `\n${field("Author", review.author)}`;
output += `\n${field("Rating", review.author_details.rating !== null ? `${review.author_details.rating}/10` : "N/A")}`;
output += `\n${field("Media", `${review.media_title} (${review.media_type})`)}`;
output += `\n${field("Created", review.created_at)}`;
output += `\n\n  ${review.content.slice(0, 400)}\u2026`;

console.log(output);
