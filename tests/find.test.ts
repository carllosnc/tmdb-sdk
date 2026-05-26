import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { FindClient } from "../src/client/find/index.js";
import { TMDBClient } from "../src/index.js";

describe("TMDBClient - Find Namespace", () => {
  test("should find by external ID with mock data", async () => {
    const mockData = {
      movie_results: [
        {
          adult: false,
          backdrop_path: "/44immBwzhDVyjn87b3x3l9mlhAD.jpg",
          id: 934433,
          title: "Scream VI",
          original_language: "en",
          original_title: "Scream VI",
          overview: "Following the latest Ghostface killings...",
          poster_path: "/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg",
          media_type: "movie",
          genre_ids: [27, 9648, 53],
          popularity: 853.917,
          release_date: "2023-03-08",
          video: false,
          vote_average: 7.388,
          vote_count: 708,
        },
      ],
      person_results: [],
      tv_results: [],
      tv_episode_results: [],
      tv_season_results: [],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new FindClient({ get } as unknown as HttpClient);

    const response = await client.findById("tt1234567", {
      externalSource: "imdb_id",
    });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("find/tt1234567", {
      params: { external_source: "imdb_id" },
    });
    expect(response).toEqual(mockData);
  });

  test("should pass language parameter", async () => {
    const mockData = {
      movie_results: [],
      person_results: [],
      tv_results: [],
      tv_episode_results: [],
      tv_season_results: [],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new FindClient({ get } as unknown as HttpClient);

    await client.findById("tt1234567", {
      externalSource: "imdb_id",
      language: "fr-FR",
    });

    expect(get).toHaveBeenCalledWith("find/tt1234567", {
      params: { external_source: "imdb_id", language: "fr-FR" },
    });
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should find by IMDb ID from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.find.findById("tt8579674", {
        externalSource: "imdb_id",
      });
      expect(response).toBeDefined();
      expect(response.movie_results).toBeDefined();
      expect(response.person_results).toBeDefined();
      expect(response.tv_results).toBeDefined();
      expect(response.tv_episode_results).toBeDefined();
      expect(response.tv_season_results).toBeDefined();
    });

    test("should find by IMDb ID with language param from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.find.findById("tt8579674", {
        externalSource: "imdb_id",
        language: "de-DE",
      });
      expect(response).toBeDefined();
      expect(Array.isArray(response.movie_results)).toBe(true);
    });

    test("should find by YouTube ID from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.find.findById("9iUQ0W5FMgM", {
        externalSource: "youtube_id",
      });
      expect(response).toBeDefined();
    });
  } else {
    test.skip("live find tests (requires TMDB_TOKEN in env)", () => {});
  }
});
