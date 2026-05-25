import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  apiKey: process.env.TMDB_KEY!,
});

// Validate API key
const validation = await client.authentication.validateKey();

console.log("=== Authentication ===");
console.log("API key valid:", validation.success);

// Create a request token (step 1 of user auth)
const token = await client.authentication.createRequestToken();

console.log("Request token:", token.request_token);
console.log("Expires at:", token.expires_at);

// Create a guest session (no login required)
const guest = await client.authentication.createGuestSession();

console.log("\nGuest session:", guest.guest_session_id);
console.log("Expires at:", guest.expires_at);
