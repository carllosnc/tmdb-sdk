/**
 * Test authentication endpoints: key validation, request tokens, guest logins.
 *
 * This example uses an API key (not a Bearer token) because the
 * validateKey and createRequestToken endpoints require it.
 *
 * Authentication flow overview:
 *   1. Validate that the API key is active.
 *   2. Create a temporary request token (first step of user-auth).
 *   3. Create a guest session (read-only, no login required).
 */
import { TMDBClient } from "../src/index.js";
import { header, field } from "./helpers.js";

const client = new TMDBClient({
  apiKey: process.env.TMDB_KEY!,
});

// --- API key validation ----------------------------------------------------
const validation = await client.authentication.validateKey();

let output = header("API Key Validation");
output += `\n${field("Valid", validation.success)}`;

// --- Request token ---------------------------------------------------------
// The request token must be authorized by the user via a browser redirect
// before it can be exchanged for a session ID.  This step just creates it.
const token = await client.authentication.createRequestToken();

output += header("Request Token");
output += `\n${field("Token", token.request_token)}`;
output += `\n${field("Expires", token.expires_at)}`;

// --- Guest session ---------------------------------------------------------
// Guest sessions are read-only and let users rate items without a TMDB account.
const guest = await client.authentication.createGuestSession();

output += header("Guest Session");
output += `\n${field("Session ID", guest.guest_session_id)}`;
output += `\n${field("Expires", guest.expires_at)}`;

console.log(output);
