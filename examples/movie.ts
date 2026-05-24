import { TMDBClient } from "../src/index.js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env");

let token = process.env.TMDB_TOKEN;

if (!token) {
  try {
    const env = readFileSync(envPath, "utf-8");
    const match = env.match(/^TMDB_TOKEN=(.+)$/m);
    if (match) token = match[1];
  } catch {}
}

if (!token) {
  console.error("Error: TMDB_TOKEN environment variable is not set.");
  console.error("");
  console.error("  Create a .env file at the project root:");
  console.error('  echo "TMDB_TOKEN=your_token" > .env');
  console.error("");
  console.error("  Or run with env-file flag:");
  console.error("  bun --env-file=.env run examples/movie.ts");
  process.exit(1);
}

const client = new TMDBClient({ accessToken: token });

const movie = await client.movie.getDetails(550);

console.log("Title:", movie.title);
console.log("Tagline:", movie.tagline);
console.log("Release Date:", movie.release_date);
console.log("Runtime:", movie.runtime, "mins");
console.log("Genres:", movie.genres?.map((g) => g.name).join(", "));
console.log("Overview:", movie.overview);
