import { TMDBClient } from "./src/index.ts";

const token = process.env.TMDB_TOKEN;
const key = process.env.TMDB_KEY;

if (!token && !key) {
  console.error("Error: Please set TMDB_TOKEN or TMDB_KEY in your .env file.");
  process.exit(1);
}

const client = token
  ? new TMDBClient({ accessToken: token })
  : new TMDBClient({ apiKey: key });

try {
  console.log("Fetching TMDB API configuration...");
  const config = await client.configuration.getDetails();
  console.log("\nSuccess! TMDB configuration loaded:");
  console.log("Base Image URL:", config.images?.base_url);
  console.log("Secure Image URL:", config.images?.secure_base_url);
  console.log("Available Poster Sizes:", config.images?.poster_sizes?.join(", "));

  if (token) {
    console.log("\nFetching TMDB account details...");
    const account = await client.account.getDetails();
    console.log("Success! Account details loaded:");
    console.log("Account ID:", account.id);
    console.log("Username:", account.username);
    console.log("Name:", account.name);
    console.log("Include Adult Content:", account.include_adult);
  }
} catch (error) {
  console.error("Failed to fetch data:", error);
}