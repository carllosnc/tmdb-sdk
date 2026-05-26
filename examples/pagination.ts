/**
 * Demonstrate the two pagination strategies available:
 *
 * 1. Auto-pagination with paginateAll() — collects items from every page
 *    using an async generator.  Handles rate limits gracefully.
 * 2. Manual page-by-page — gives fine-grained control over each page.
 *
 * paginateAll() accepts a callback that receives `{ page }` and must return
 * a paginated response with `.results` and `.total_pages`.
 */
import { TMDBClient, paginateAll } from "../src/index.js";
import { header, field, sub, list } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// --- Auto-pagination: all results for "inception" ---------------------------
const allResults: { title: string; release_date: string }[] = [];
for await (const movie of paginateAll(
  (params) => client.search.searchMovies({ query: "inception", ...params }),
  {} as { page?: number },
)) {
  allResults.push(movie);
}

let output = header('Auto-pagination: search "inception"');
output += `\n${field("Total across pages", allResults.length)}`;
output += sub("First 6");
output += `\n${list(allResults, (m) => `${m.title} (${m.release_date})`, 6)}`;
if (allResults.length > 6) {
  output += `\n  … and ${allResults.length - 6} more`;
}

// --- Manual pagination: popular movies page by page -------------------------
output += header("Manual: popular movies");

const page1 = await client.movie.getPopular({ page: 1 });
output += sub("Page 1");
output += `\n${field("Movies on page", page1.results.length)}`;
output += `\n${field("Total available", page1.total_results)}`;
output += `\n${list(page1.results, (m) => m.title, 3)}`;

if (page1.total_pages > 1) {
  const page2 = await client.movie.getPopular({ page: 2 });
  output += sub("Page 2");
  output += `\n${list(page2.results, (m) => m.title, 3)}`;
}

console.log(output);
