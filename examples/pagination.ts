import { TMDBClient, paginateAll } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// Collect items from all pages using paginateAll
console.log("=== All pages: search 'inception' ===");
const allResults: { title: string; release_date: string }[] = [];
for await (const movie of paginateAll(
  (params) => client.search.searchMovies({ query: "inception", ...params }),
  {} as { page?: number },
)) {
  allResults.push(movie);
}
console.log("Total items across all pages:", allResults.length);
for (const movie of allResults.slice(0, 6)) {
  console.log(`  ${movie.title} (${movie.release_date})`);
}
if (allResults.length > 6) {
  console.log(`  ... and ${allResults.length - 6} more`);
}

// Manual page-by-page pagination (without helper)
console.log("\n=== Manual pagination: popular movies ===");
const page1 = await client.movie.getPopular({ page: 1 });
console.log(`Page 1: ${page1.results.length} movies (total: ${page1.total_results})`);
for (const movie of page1.results.slice(0, 3)) {
  console.log(`  ${movie.title}`);
}

if (page1.total_pages > 1) {
  const page2 = await client.movie.getPopular({ page: 2 });
  console.log(`\nPage 2: ${page2.results.length} movies`);
  for (const movie of page2.results.slice(0, 3)) {
    console.log(`  ${movie.title}`);
  }
}
