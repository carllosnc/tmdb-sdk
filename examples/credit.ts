/**
 * Look up a single credit by its TMDB credit ID.
 *
 * Credits represent a person's involvement in a specific media title
 * (actor, director, writer, etc.).  The credit ID appears in the
 * `credit_id` field of cast / crew entries returned by movie or TV endpoints.
 */
import { TMDBClient } from "../src/index.js";
import { header, field } from "./helpers.js";

const client = new TMDBClient({
  accessToken: process.env.TMDB_TOKEN!,
});

const credit = await client.credit.getDetails("6024a814c0ae36003d59cc3c");

let output = header("Credit Details");
output += `\n${field("Type", credit.credit_type)}`;
output += `\n${field("Department", credit.department)}`;
output += `\n${field("Job", credit.job)}`;
output += `\n${field("Person", credit.person.name)}`;
output += `\n${field("Media", `${credit.media.name} (${credit.media.media_type})`)}`;
output += `\n${field("Character", credit.media.character)}`;

console.log(output);
