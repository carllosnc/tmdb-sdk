import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { MovieClient } from "../src/client/movie/index.ts";
import { TMDBClient } from "../src/index.ts";

const mockResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/test.jpg",
      genre_ids: [28, 12],
      id: 1,
      original_language: "en",
      original_title: "Test Movie",
      overview: "A test movie.",
      popularity: 100,
      poster_path: "/poster.jpg",
      release_date: "2024-01-01",
      title: "Test Movie",
      video: false,
      vote_average: 7.5,
      vote_count: 100,
    },
  ],
  total_pages: 10,
  total_results: 200,
};

describe("TMDBClient - Movie Namespace", () => {
  test("should fetch now playing with query params", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: { ...mockResponse, dates: { maximum: "2024-02-01", minimum: "2024-01-01" } },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getNowPlaying({ language: "en-US", page: 2, region: "US" });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("movie/now_playing", {
      params: { language: "en-US", page: 2, region: "US" },
    });
    expect(response.page).toBe(1);
    expect(response.dates).toBeDefined();
    expect(response.dates!.maximum).toBe("2024-02-01");
  });

  test("should fetch now playing with no params", async () => {
    const get = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    await client.getNowPlaying();

    expect(get).toHaveBeenCalledWith("movie/now_playing", { params: {} });
  });

  test("should fetch popular movies with query params", async () => {
    const get = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getPopular({ language: "en-US", page: 1 });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("movie/popular", {
      params: { language: "en-US", page: 1 },
    });
    expect(response.results).toHaveLength(1);
    expect(response.results[0].title).toBe("Test Movie");
  });

  test("should fetch popular with no params", async () => {
    const get = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    await client.getPopular();

    expect(get).toHaveBeenCalledWith("movie/popular", { params: {} });
  });

  test("should fetch top rated movies with query params", async () => {
    const get = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getTopRated({ language: "en-US", page: 1 });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("movie/top_rated", {
      params: { language: "en-US", page: 1 },
    });
    expect(response.total_pages).toBe(10);
  });

  test("should fetch top rated with no params", async () => {
    const get = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    await client.getTopRated();

    expect(get).toHaveBeenCalledWith("movie/top_rated", { params: {} });
  });

  test("should fetch upcoming movies with query params", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: { ...mockResponse, dates: { maximum: "2024-03-01", minimum: "2024-02-15" } },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getUpcoming({ language: "en-US", page: 1, region: "US" });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("movie/upcoming", {
      params: { language: "en-US", page: 1, region: "US" },
    });
    expect(response.dates).toBeDefined();
    expect(response.dates!.minimum).toBe("2024-02-15");
  });

  test("should fetch upcoming with no params", async () => {
    const get = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    await client.getUpcoming();

    expect(get).toHaveBeenCalledWith("movie/upcoming", { params: {} });
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch now playing from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.movie.getNowPlaying({ language: "en-US" });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
    });

    test("should fetch popular movies from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.movie.getPopular({ language: "en-US" });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
    });

    test("should fetch top rated from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.movie.getTopRated({ language: "en-US" });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
    });

    test("should fetch upcoming from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.movie.getUpcoming({ language: "en-US" });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
    });
  } else {
    test.skip("live movie tests (requires TMDB_TOKEN in env)", () => {});
  }
});
