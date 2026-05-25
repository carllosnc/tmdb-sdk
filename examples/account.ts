import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Get account details
const account = await client.account.getDetails();

console.log("=== Account ===");
console.log("Username:", account.username);
console.log("Name:", account.name);
console.log("Country:", account.iso_3166_1);
console.log("Language:", account.iso_639_1);

// Favorite movies (first page)
const favorites = await client.account.getFavoriteMovies({
  accountId: account.id,
  language: "en-US",
  page: 1,
  sortBy: "created_at.desc",
});

console.log(`\n=== Favorite Movies (${favorites.total_results} total) ===`);
for (const movie of favorites.results.slice(0, 5)) {
  console.log(`  ${movie.title} (${movie.release_date})`);
}

// Watchlist
const watchlist = await client.account.getWatchlistMovies({
  accountId: account.id,
  page: 1,
});

console.log(`\n=== Watchlist Movies (${watchlist.total_results} total) ===`);
for (const movie of watchlist.results.slice(0, 5)) {
  console.log(`  ${movie.title}`);
}
