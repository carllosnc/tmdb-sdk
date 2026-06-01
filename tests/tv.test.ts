import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { TvClient } from "../src/client/tv/index.js";
import { TMDBClient } from "../src/index.js";

const emptyResponse = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0,
};

function createClient() {
  const get = mock(() => Promise.resolve({ data: emptyResponse }));
  return { get, client: new TvClient({ get } as unknown as HttpClient) };
}

describe("TMDBClient - TV Namespace", () => {
  test("should fetch airing today with no params", async () => {
    const { get, client } = createClient();
    await client.getAiringToday();

    expect(get).toHaveBeenCalledWith("tv/airing_today", { params: {} });
  });

  test("should fetch airing today with all params", async () => {
    const { get, client } = createClient();
    await client.getAiringToday({ language: "en-US", page: 2, timezone: "America/New_York" });

    expect(get).toHaveBeenCalledWith("tv/airing_today", {
      params: { language: "en-US", page: 2, timezone: "America/New_York" },
    });
  });

  test("should fetch on the air with no params", async () => {
    const { get, client } = createClient();
    await client.getOnTheAir();

    expect(get).toHaveBeenCalledWith("tv/on_the_air", { params: {} });
  });

  test("should fetch on the air with all params", async () => {
    const { get, client } = createClient();
    await client.getOnTheAir({ language: "fr-FR", page: 1, timezone: "Europe/Paris" });

    expect(get).toHaveBeenCalledWith("tv/on_the_air", {
      params: { language: "fr-FR", page: 1, timezone: "Europe/Paris" },
    });
  });

  test("should fetch popular with no params", async () => {
    const { get, client } = createClient();
    await client.getPopular();

    expect(get).toHaveBeenCalledWith("tv/popular", { params: {} });
  });

  test("should fetch popular with params", async () => {
    const { get, client } = createClient();
    await client.getPopular({ language: "en-US", page: 3 });

    expect(get).toHaveBeenCalledWith("tv/popular", {
      params: { language: "en-US", page: 3 },
    });
  });

  test("should fetch top rated with no params", async () => {
    const { get, client } = createClient();
    await client.getTopRated();

    expect(get).toHaveBeenCalledWith("tv/top_rated", { params: {} });
  });

  test("should fetch top rated with params", async () => {
    const { get, client } = createClient();
    await client.getTopRated({ language: "de-DE", page: 1 });

    expect(get).toHaveBeenCalledWith("tv/top_rated", {
      params: { language: "de-DE", page: 1 },
    });
  });

  test("should fetch series details with append_to_response", async () => {
    const get = mock(() => Promise.resolve({ data: { id: 1399 } }));
    const client = new TvClient({ get } as unknown as HttpClient);

    await client.getDetails(1399, { appendToResponse: ["credits", "videos"] });

    expect(get).toHaveBeenCalledWith("tv/1399", {
      params: { append_to_response: "credits,videos" },
    });
  });

  test("should fetch season details with append_to_response", async () => {
    const get = mock(() => Promise.resolve({ data: { id: 1399 } }));
    const client = new TvClient({ get } as unknown as HttpClient);

    await client.getSeasonDetails(1399, 1, { appendToResponse: ["credits", "videos"] });

    expect(get).toHaveBeenCalledWith("tv/1399/season/1", {
      params: { append_to_response: "credits,videos" },
    });
  });

  test("should fetch episode details with append_to_response", async () => {
    const get = mock(() => Promise.resolve({ data: { id: 1399 } }));
    const client = new TvClient({ get } as unknown as HttpClient);

    await client.getEpisodeDetails(1399, 1, 1, { appendToResponse: ["credits", "videos"] });

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/episode/1", {
      params: { append_to_response: "credits,videos" },
    });
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch airing today from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.tv.getAiringToday();
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
    });

    test("should fetch on the air from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.tv.getOnTheAir({ language: "en-US" });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
    });

    test("should fetch popular TV from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.tv.getPopular();
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0]!.name).toBeTypeOf("string");
    });

    test("should fetch top rated TV from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.tv.getTopRated();
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0]!.name).toBeTypeOf("string");
    });
  } else {
    test.skip("live TV tests (requires TMDB_TOKEN in env)", () => {});
  }
});
