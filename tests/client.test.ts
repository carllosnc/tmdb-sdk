import { describe, expect, test } from "bun:test";
import { TMDBClient } from "../src/index.js";

describe("TMDBClient - Core Client", () => {
  test("should instantiate successfully with token", () => {
    const client = new TMDBClient({ accessToken: "fake-token" });
    expect(client).toBeDefined();
  });

  test("should instantiate successfully with api key", () => {
    const client = new TMDBClient({ apiKey: "fake-key" });
    expect(client).toBeDefined();
  });

  test("should throw error if no credentials provided", () => {
    expect(() => new TMDBClient({})).toThrow();
  });

  // Live integration test if environment variables are set
  const token = process.env.TMDB_TOKEN;
  const key = process.env.TMDB_KEY;

  if (token || key) {
    test("should fetch configuration from live TMDB API", async () => {
      const client = token
        ? new TMDBClient({ accessToken: token })
        : new TMDBClient({ apiKey: key });

      const config = await client.getConfiguration();
      expect(config).toBeDefined();
      expect(config.images).toBeDefined();
      expect(config.images.base_url).toBeDefined();
      expect(config.images.secure_base_url).toBeDefined();
    });
  } else {
    test.skip("live configuration fetch (requires TMDB_TOKEN or TMDB_KEY in env)", () => {});
  }
});
