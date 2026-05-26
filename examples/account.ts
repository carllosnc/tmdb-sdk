/**
 * Access the authenticated user's account data.
 *
 * Requires a valid access token (API-key-only clients will get a 401).
 *
 * Endpoints shown:
 *   - getDetails()           — your TMDB profile
 *   - getFavoriteMovies()    — movies you marked as favorite
 *   - getWatchlistMovies()   — movies saved to watchlist
 */
import { TMDBClient } from "../src/index.js";
import { header, field, sub, list } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// --- Account profile -------------------------------------------------------
const account = await client.account.getDetails();

let output = header("Account");
output += `\n${field("Username", account.username)}`;
output += `\n${field("Name", account.name)}`;
output += `\n${field("Country", account.iso_3166_1)}`;
output += `\n${field("Language", account.iso_639_1)}`;

// --- Favorite movies -------------------------------------------------------
const favorites = await client.account.getFavoriteMovies({
  accountId: account.id,
  language: "en-US",
  page: 1,
  sortBy: "created_at.desc",
});

output += header(`Favorites (${favorites.total_results} total)`);
output += `\n${list(favorites.results, (m) => `${m.title} (${m.release_date})`, 5)}`;

// --- Watchlist -------------------------------------------------------------
const watchlist = await client.account.getWatchlistMovies({
  accountId: account.id,
  page: 1,
});

output += header(`Watchlist (${watchlist.total_results} total)`);
output += `\n${list(watchlist.results, (m) => m.title, 5)}`;

console.log(output);
