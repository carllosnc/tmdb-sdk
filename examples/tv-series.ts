import { TMDBClient } from "../src/index.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

// TV series details (return type: TvSeriesDetails)
const series = await client.tv.getDetails(1399);

console.log("=== TV Series: Game of Thrones ===");
console.log("Name:", series.name);
console.log("Status:", series.status);
console.log("Seasons:", series.number_of_seasons);
console.log("Episodes:", series.number_of_episodes);
console.log("Genres:", series.genres?.map((g) => g.name).join(", "));

// TV series with append_to_response — use `as const` for precise inference
// Return type auto-resolves to: TvSeriesDetails & { videos: TvSeriesVideosResponse; credits: TvCreditsResponse }
const full = await client.tv.getDetails(1399, {
  append_to_response: ["videos", "credits"] as const,
});

console.log("\nTrailers:", full.videos.results.length);
console.log("Cast size:", full.credits.cast.length);

// Season details (return type: TvSeasonDetails)
const season = await client.tvSeason.getDetails(1399, 1);

console.log(`\n=== Season ${season.season_number}: ${season.name} ===`);
console.log("Episodes:", season.episodes.length);
console.log("First episode:", season.episodes[0]?.name);
