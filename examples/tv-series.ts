/**
 * Dive into TV series data: series metadata, append_to_response for
 * embedded videos and credits, and season-level detail.
 *
 * This example uses Game of Thrones (id: 1399) as its subject.
 *
 * Endpoints:
 *   - client.tv.getDetails()        — series-level info
 *   - client.tv.getDetails() with append_to_response
 *   - client.tvSeason.getDetails()  — single season breakdown
 *
 * Note: tvSeason, tvEpisode, and tvEpisodeGroup are separate client
 * properties on the TMDBClient facade, organised by domain.
 */
import { TMDBClient } from "../src/index.js";
import { header, field, sub, list } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

const SERIES_ID = 1399; // Game of Thrones

// --- Series details --------------------------------------------------------
const series = await client.tv.getDetails(SERIES_ID);

let output = header(`TV Series: ${series.name}`);
output += `\n${field("Status", series.status)}`;
output += `\n${field("Seasons", series.number_of_seasons)}`;
output += `\n${field("Episodes", series.number_of_episodes)}`;
output += `\n${field("Genres", series.genres?.map((g) => g.name).join(", "))}`;

// --- Append-to-response: videos + credits ----------------------------------
const full = await client.tv.getDetails(SERIES_ID, {
  append_to_response: ["videos", "credits"] as const,
});

output += header("Appended data");
output += `\n${field("Trailers", full.videos.results.length)}`;
output += `\n${field("Cast size", full.credits.cast.length)}`;

output += sub("Top cast");
output += `\n${list(full.credits.cast.slice(0, 5), (c) => `${c.character} \u2014 ${c.name}`)}`;

// --- Season detail ---------------------------------------------------------
const season = await client.tvSeason.getDetails(SERIES_ID, 1);

output += header(`Season ${season.season_number}: ${season.name}`);
output += `\n${field("Episodes", season.episodes.length)}`;

const first = season.episodes[0];
if (first) {
  output += `\n${field("First episode", `${first.episode_number}. ${first.name}`)}`;
}

console.log(output);
