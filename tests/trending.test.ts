import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { TrendingClient } from "../src/client/trending/index.ts";
import { TMDBClient } from "../src/index.ts";

const emptyResponse = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0,
};

function createClient(get: ReturnType<typeof mock>) {
  return new TrendingClient({ get } as unknown as AxiosInstance);
}

describe("TMDBClient - Trending Namespace", () => {
  test("should get trending all with default time window", async () => {
    const get = mock(() => Promise.resolve({ data: emptyResponse }));
    const client = createClient(get);

    await client.getAll();

    expect(get).toHaveBeenCalledWith("trending/all/day", { params: {} });
  });

  test("should get trending all with week time window", async () => {
    const get = mock(() => Promise.resolve({ data: emptyResponse }));
    const client = createClient(get);

    await client.getAll({ timeWindow: "week" });

    expect(get).toHaveBeenCalledWith("trending/all/week", { params: {} });
  });

  test("should get trending all with language", async () => {
    const get = mock(() => Promise.resolve({ data: emptyResponse }));
    const client = createClient(get);

    await client.getAll({ language: "fr-FR" });

    expect(get).toHaveBeenCalledWith("trending/all/day", {
      params: { language: "fr-FR" },
    });
  });

  test("should get trending movies with default time window", async () => {
    const get = mock(() => Promise.resolve({ data: emptyResponse }));
    const client = createClient(get);

    await client.getMovies();

    expect(get).toHaveBeenCalledWith("trending/movie/day", { params: {} });
  });

  test("should get trending movies with week time window", async () => {
    const get = mock(() => Promise.resolve({ data: emptyResponse }));
    const client = createClient(get);

    await client.getMovies({ timeWindow: "week" });

    expect(get).toHaveBeenCalledWith("trending/movie/week", { params: {} });
  });

  test("should get trending movies with language", async () => {
    const get = mock(() => Promise.resolve({ data: emptyResponse }));
    const client = createClient(get);

    await client.getMovies({ language: "en-US" });

    expect(get).toHaveBeenCalledWith("trending/movie/day", {
      params: { language: "en-US" },
    });
  });

  test("should get trending people with default time window", async () => {
    const get = mock(() => Promise.resolve({ data: emptyResponse }));
    const client = createClient(get);

    await client.getPeople();

    expect(get).toHaveBeenCalledWith("trending/person/day", { params: {} });
  });

  test("should get trending people with week time window", async () => {
    const get = mock(() => Promise.resolve({ data: emptyResponse }));
    const client = createClient(get);

    await client.getPeople({ timeWindow: "week" });

    expect(get).toHaveBeenCalledWith("trending/person/week", { params: {} });
  });

  test("should get trending people with language", async () => {
    const get = mock(() => Promise.resolve({ data: emptyResponse }));
    const client = createClient(get);

    await client.getPeople({ language: "de-DE" });

    expect(get).toHaveBeenCalledWith("trending/person/day", {
      params: { language: "de-DE" },
    });
  });

  test("should get trending TV with default time window", async () => {
    const get = mock(() => Promise.resolve({ data: emptyResponse }));
    const client = createClient(get);

    await client.getTvShows();

    expect(get).toHaveBeenCalledWith("trending/tv/day", { params: {} });
  });

  test("should get trending TV with week time window", async () => {
    const get = mock(() => Promise.resolve({ data: emptyResponse }));
    const client = createClient(get);

    await client.getTvShows({ timeWindow: "week" });

    expect(get).toHaveBeenCalledWith("trending/tv/week", { params: {} });
  });

  test("should get trending TV with language", async () => {
    const get = mock(() => Promise.resolve({ data: emptyResponse }));
    const client = createClient(get);

    await client.getTvShows({ language: "en-US" });

    expect(get).toHaveBeenCalledWith("trending/tv/day", {
      params: { language: "en-US" },
    });
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should get trending all from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.trending.getAll();
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      for (const result of response.results) {
        expect(["movie", "tv", "person"]).toContain(result.media_type);
      }
    });

    test("should get trending all with week window from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.trending.getAll({ timeWindow: "week" });
      expect(response).toBeDefined();
      expect(response.results.length).toBeGreaterThan(0);
    });

    test("should get trending movies from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.trending.getMovies();
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0]!.title).toBeTypeOf("string");
    });

    test("should get trending movies with week window from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.trending.getMovies({ timeWindow: "week" });
      expect(response).toBeDefined();
      expect(response.results.length).toBeGreaterThan(0);
    });

    test("should get trending people from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.trending.getPeople();
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0]!.name).toBeTypeOf("string");
    });

    test("should get trending TV from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.trending.getTvShows();
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0]!.name).toBeTypeOf("string");
    });
  } else {
    test.skip("live trending tests (requires TMDB_TOKEN in env)", () => {});
  }
});
