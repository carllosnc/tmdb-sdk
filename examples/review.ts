import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Fetch a review by its ID
const review = await client.review.getDetails("5488c29bc3a3682f3a00049f");

console.log("=== Review ===");
console.log("Author:", review.author);
console.log("Rating:", review.author_details.rating, "/ 10");
console.log("Media:", review.media_title, `(${review.media_type})`);
console.log("Created:", review.created_at);
console.log("\nContent:");
console.log(review.content.slice(0, 400) + "...");
