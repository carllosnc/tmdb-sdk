import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { DiscoverClient } from "../src/client/discover/index.js";
import { TMDBClient } from "../src/index.js";

describe("TMDBClient - Discover Namespace", () => {
  test("should fetch movie discover with mock data", async () => {
    const mockData = {
      page: 1,
      results: [
        {
          adult: false,
          backdrop_path: "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
          genre_ids: [28, 12, 878],
          id: 640146,
          original_language: "en",
          original_title: "Ant-Man and the Wasp: Quantumania",
          overview: "Super-Hero partners Scott Lang and Hope van Dyne...",
          popularity: 9272.643,
          poster_path: "/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg",
          release_date: "2023-02-15",
          title: "Ant-Man and the Wasp: Quantumania",
          video: false,
          vote_average: 6.5,
          vote_count: 1856,
        },
      ],
      total_pages: 38020,
      total_results: 760385,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new DiscoverClient({ get } as unknown as HttpClient);

    const response = await client.getMovies();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("discover/movie", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass params to movie discover", async () => {
    const mockData = { page: 1, results: [], total_pages: 0, total_results: 0 };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new DiscoverClient({ get } as unknown as HttpClient);

    await client.getMovies({
      language: "fr-FR",
      sortBy: "vote_average.desc",
      withGenres: "28,12",
      page: 2,
    });

    expect(get).toHaveBeenCalledWith("discover/movie", {
      params: {
        language: "fr-FR",
        sort_by: "vote_average.desc",
        with_genres: "28,12",
        page: 2,
      },
    });
  });

  test("should fetch TV discover with mock data", async () => {
    const mockData = {
      page: 1,
      results: [
        {
          backdrop_path: "/mAJ84W6I8I272Da87qplS2Dp9ST.jpg",
          first_air_date: "2023-01-23",
          genre_ids: [9648, 18],
          id: 202250,
          name: "Dirty Linen",
          origin_country: ["PH"],
          original_language: "tl",
          original_name: "Dirty Linen",
          overview: "To exact vengeance...",
          popularity: 2684.061,
          poster_path: "/ujlkQtHAVShWyWTloGU2Vh5Jbo9.jpg",
          vote_average: 5,
          vote_count: 13,
        },
      ],
      total_pages: 7414,
      total_results: 148265,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new DiscoverClient({ get } as unknown as HttpClient);

    const response = await client.getTvShows();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("discover/tv", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass params to TV discover", async () => {
    const mockData = { page: 1, results: [], total_pages: 0, total_results: 0 };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new DiscoverClient({ get } as unknown as HttpClient);

    await client.getTvShows({
      language: "en-US",
      sortBy: "popularity.desc",
      withGenres: "18,35",
      firstAirDateGte: "2023-01-01",
    });

    expect(get).toHaveBeenCalledWith("discover/tv", {
      params: {
        language: "en-US",
        sort_by: "popularity.desc",
        with_genres: "18,35",
        "first_air_date.gte": "2023-01-01",
      },
    });
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch movie discover from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.discover.getMovies();
      expect(response).toBeDefined();
      expect(response.page).toBe(1);
      expect(response.results).toBeDefined();
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0]!.title).toBeTypeOf("string");
    });

    test("should fetch movie discover with params from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.discover.getMovies({
        language: "fr-FR",
        sortBy: "vote_average.desc",
        withGenres: "28",
        page: 1,
      });
      expect(response).toBeDefined();
      expect(response.results).toBeDefined();
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0]!.genre_ids).toContain(28);
    });

    test("should fetch TV discover from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.discover.getTvShows();
      expect(response).toBeDefined();
      expect(response.page).toBe(1);
      expect(response.results).toBeDefined();
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0]!.name).toBeTypeOf("string");
    });

    test("should fetch TV discover with params from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.discover.getTvShows({
        language: "en-US",
        sortBy: "popularity.desc",
        withGenres: "18,35",
      });
      expect(response).toBeDefined();
      expect(response.results).toBeDefined();
      expect(response.results.length).toBeGreaterThan(0);
    });
  } else {
    test.skip("live discover tests (requires TMDB_TOKEN in env)", () => {});
  }
});
