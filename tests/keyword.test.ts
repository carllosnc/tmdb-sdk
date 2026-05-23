import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { KeywordClient } from "../src/client/keyword/index.ts";
import { TMDBClient } from "../src/index.ts";

describe("TMDBClient - Keyword Namespace", () => {
  test("should fetch keyword details with mock data", async () => {
    const mockData = { id: 1701, name: "hero" };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new KeywordClient({ get } as unknown as AxiosInstance);

    const response = await client.getDetails(1701);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("keyword/1701");
    expect(response).toEqual(mockData);
  });

  test("should fetch keyword movies with mock data", async () => {
    const mockData = {
      id: 1701,
      page: 1,
      results: [
        {
          adult: false,
          backdrop_path: "/3CxUndGhUcZdt1Zggjdb2HkLLQX.jpg",
          genre_ids: [28, 12, 878],
          id: 640146,
          original_language: "en",
          original_title: "Ant-Man and the Wasp: Quantumania",
          overview: "Superhero duo explores quantum realm...",
          popularity: 9200.005,
          poster_path: "/nA5otwVxAfpBP4PVgeuBk3qHcLY.jpg",
          release_date: "2023-02-15",
          title: "Ant-Man and the Wasp: Quantumania",
          video: false,
          vote_average: 6.5,
          vote_count: 2079,
        },
      ],
      total_pages: 11,
      total_results: 211,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new KeywordClient({ get } as unknown as AxiosInstance);

    const response = await client.getMovies(1701);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("keyword/1701/movies", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass params to keyword movies", async () => {
    const mockData = {
      id: 1701,
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new KeywordClient({ get } as unknown as AxiosInstance);

    await client.getMovies(1701, {
      includeAdult: true,
      language: "de-DE",
      page: 2,
    });

    expect(get).toHaveBeenCalledWith("keyword/1701/movies", {
      params: { include_adult: true, language: "de-DE", page: 2 },
    });
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch keyword details from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.keyword.getDetails(1701);
      expect(response).toBeDefined();
      expect(response.id).toBe(1701);
      expect(response.name).toBe("hero");
    });

    test("should fetch keyword movies from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.keyword.getMovies(1701);
      expect(response).toBeDefined();
      expect(response.id).toBe(1701);
      expect(response.results).toBeDefined();
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
    });

    test("should fetch keyword movies with language param from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.keyword.getMovies(1701, {
        language: "de-DE",
      });
      expect(response).toBeDefined();
      expect(response.results.length).toBeGreaterThan(0);
    });
  } else {
    test.skip("live keyword tests (requires TMDB_TOKEN in env)", () => {});
  }
});
