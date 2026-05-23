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
    expect(response.results[0]!.title).toBe("Test Movie");
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

  test("should fetch details with params", async () => {
    const get = mock(() => Promise.resolve({ data: { id: 550, title: "Fight Club" } }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getDetails(550, { language: "en-US" });

    expect(get).toHaveBeenCalledWith("movie/550", {
      params: { language: "en-US" },
    });
    expect(response.id).toBe(550);
    expect(response.title).toBe("Fight Club");
  });

  test("should fetch details with append_to_response", async () => {
    const get = mock(() => Promise.resolve({ data: { id: 550 } }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    await client.getDetails(550, { append_to_response: "videos,images" });

    expect(get).toHaveBeenCalledWith("movie/550", {
      params: { append_to_response: "videos,images" },
    });
  });

  test("should fetch details without params", async () => {
    const get = mock(() => Promise.resolve({ data: { id: 550 } }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    await client.getDetails(550);

    expect(get).toHaveBeenCalledWith("movie/550", { params: {} });
  });

  test("should fetch account states", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: { id: 550, favorite: true, rated: { value: 9 }, watchlist: false },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getAccountStates(550, { session_id: "test-session" });

    expect(get).toHaveBeenCalledWith("movie/550/account_states", {
      params: { session_id: "test-session" },
    });
    expect(response.favorite).toBe(true);
    expect(response.rated).toEqual({ value: 9 });
  });

  test("should fetch account states with guest session", async () => {
    const get = mock(() => Promise.resolve({ data: { id: 550, favorite: false, rated: null, watchlist: false } }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    await client.getAccountStates(550, { guest_session_id: "guest-123" });

    expect(get).toHaveBeenCalledWith("movie/550/account_states", {
      params: { guest_session_id: "guest-123" },
    });
  });

  test("should fetch alternative titles", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: { id: 550, titles: [{ iso_3166_1: "RS", title: "Borilački klub", type: "" }] },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getAlternativeTitles(550, { country: "RS" });

    expect(get).toHaveBeenCalledWith("movie/550/alternative_titles", {
      params: { country: "RS" },
    });
    expect(response.titles).toHaveLength(1);
  });

  test("should fetch alternative titles without params", async () => {
    const get = mock(() => Promise.resolve({ data: { id: 550, titles: [] } }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    await client.getAlternativeTitles(550);

    expect(get).toHaveBeenCalledWith("movie/550/alternative_titles", { params: {} });
  });

  test("should fetch changes", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: { changes: [{ key: "images", items: [] }] },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getChanges(550, { page: 1 });

    expect(get).toHaveBeenCalledWith("movie/550/changes", {
      params: { page: 1 },
    });
    expect(response.changes).toHaveLength(1);
  });

  test("should fetch changes with date range", async () => {
    const get = mock(() => Promise.resolve({ data: { changes: [] } }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    await client.getChanges(550, { start_date: "2024-01-01", end_date: "2024-01-31" });

    expect(get).toHaveBeenCalledWith("movie/550/changes", {
      params: { start_date: "2024-01-01", end_date: "2024-01-31" },
    });
  });

  test("should fetch credits", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: {
          id: 550,
          cast: [{ id: 819, name: "Edward Norton", character: "The Narrator", order: 0 }],
          crew: [{ id: 376, name: "Arnon Milchan", department: "Production", job: "Executive Producer" }],
        },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getCredits(550, { language: "en-US" });

    expect(get).toHaveBeenCalledWith("movie/550/credits", {
      params: { language: "en-US" },
    });
    expect(response.cast).toHaveLength(1);
    expect(response.cast[0]!.name).toBe("Edward Norton");
    expect(response.crew[0]!.department).toBe("Production");
  });

  test("should fetch external IDs", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: { id: 550, imdb_id: "tt0137523", facebook_id: "FightClub" },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getExternalIds(550);

    expect(get).toHaveBeenCalledWith("movie/550/external_ids");
    expect(response.imdb_id).toBe("tt0137523");
  });

  test("should fetch images", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: {
          id: 550,
          backdrops: [{ file_path: "/test.jpg", width: 1920, height: 1080 }],
          logos: [],
          posters: [],
        },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getImages(550, { language: "en" });

    expect(get).toHaveBeenCalledWith("movie/550/images", {
      params: { language: "en" },
    });
    expect(response.backdrops).toHaveLength(1);
  });

  test("should fetch images with include_image_language", async () => {
    const get = mock(() => Promise.resolve({ data: { id: 550, backdrops: [], logos: [], posters: [] } }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    await client.getImages(550, { include_image_language: "en-US,null" });

    expect(get).toHaveBeenCalledWith("movie/550/images", {
      params: { include_image_language: "en-US,null" },
    });
  });

  test("should fetch keywords", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: { id: 550, keywords: [{ id: 818, name: "based on novel or book" }] },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getKeywords(550);

    expect(get).toHaveBeenCalledWith("movie/550/keywords");
    expect(response.keywords).toHaveLength(1);
  });

  test("should fetch latest", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: { id: 1119232, title: "König Charles III", adult: false },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getLatest();

    expect(get).toHaveBeenCalledWith("movie/latest");
    expect(response.id).toBe(1119232);
  });

  test("should fetch lists", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: {
          id: 550,
          page: 1,
          results: [{ id: 8248696, name: "My Movies", list_type: "movie" }],
          total_pages: 1,
          total_results: 1,
        },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getLists(550, { language: "en-US", page: 1 });

    expect(get).toHaveBeenCalledWith("movie/550/lists", {
      params: { language: "en-US", page: 1 },
    });
    expect(response.results).toHaveLength(1);
  });

  test("should fetch recommendations", async () => {
    const get = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getRecommendations(550, { page: 1 });

    expect(get).toHaveBeenCalledWith("movie/550/recommendations", {
      params: { page: 1 },
    });
    expect(response.results).toHaveLength(1);
  });

  test("should fetch release dates", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: {
          id: 550,
          results: [
            {
              iso_3166_1: "US",
              release_dates: [{ certification: "R", type: 3, release_date: "1999-10-15T00:00:00.000Z" }],
            },
          ],
        },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getReleaseDates(550);

    expect(get).toHaveBeenCalledWith("movie/550/release_dates");
    expect(response.results).toHaveLength(1);
    expect(response.results[0]!.iso_3166_1).toBe("US");
  });

  test("should fetch reviews", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: {
          id: 550,
          page: 1,
          results: [{ author: "Goddard", content: "Pretty awesome movie.", id: "abc123" }],
          total_pages: 1,
          total_results: 1,
        },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getReviews(550, { language: "en-US" });

    expect(get).toHaveBeenCalledWith("movie/550/reviews", {
      params: { language: "en-US" },
    });
    expect(response.results[0]!.author).toBe("Goddard");
  });

  test("should fetch similar movies", async () => {
    const get = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getSimilar(550, { language: "en-US" });

    expect(get).toHaveBeenCalledWith("movie/550/similar", {
      params: { language: "en-US" },
    });
    expect(response.results).toHaveLength(1);
  });

  test("should fetch translations", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: {
          id: 550,
          translations: [
            {
              iso_3166_1: "DE",
              iso_639_1: "de",
              name: "Deutsch",
              english_name: "German",
              data: { homepage: "", overview: "", runtime: 139, tagline: "", title: "" },
            },
          ],
        },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getTranslations(550);

    expect(get).toHaveBeenCalledWith("movie/550/translations");
    expect(response.translations).toHaveLength(1);
  });

  test("should fetch videos", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: {
          id: 550,
          results: [{ name: "Trailer", key: "abc123", site: "YouTube", type: "Trailer" }],
        },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getVideos(550, { language: "en-US" });

    expect(get).toHaveBeenCalledWith("movie/550/videos", {
      params: { language: "en-US" },
    });
    expect(response.results[0]!.site).toBe("YouTube");
  });

  test("should fetch watch providers", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: {
          id: 550,
          results: {
            US: {
              link: "https://www.themoviedb.org/movie/550-fight-club/watch?locale=US",
              flatrate: [{ provider_id: 119, provider_name: "Amazon Prime Video" }],
            },
          },
        },
      })
    );
    const client = new MovieClient({ get } as unknown as AxiosInstance);

    const response = await client.getWatchProviders(550);

    expect(get).toHaveBeenCalledWith("movie/550/watch/providers");
    expect(response.results.US).toBeDefined();
    expect(response.results.US!.flatrate![0]!.provider_name).toBe("Amazon Prime Video");
  });

  test("should add rating", async () => {
    const post = mock(() =>
      Promise.resolve({
        data: { status_code: 1, status_message: "Success." },
      })
    );
    const client = new MovieClient({ post } as unknown as AxiosInstance);

    const response = await client.addRating(550, { session_id: "test-session" }, { value: 8.5 });

    expect(post).toHaveBeenCalledWith(
      "movie/550/rating",
      { value: 8.5 },
      { params: { session_id: "test-session" } }
    );
    expect(response.status_code).toBe(1);
  });

  test("should add rating with guest session", async () => {
    const post = mock(() => Promise.resolve({ data: { status_code: 1, status_message: "Success." } }));
    const client = new MovieClient({ post } as unknown as AxiosInstance);

    await client.addRating(550, { guest_session_id: "guest-123" }, { value: 7.0 });

    expect(post).toHaveBeenCalledWith(
      "movie/550/rating",
      { value: 7.0 },
      { params: { guest_session_id: "guest-123" } }
    );
  });

  test("should delete rating", async () => {
    const del = mock(() =>
      Promise.resolve({
        data: { status_code: 13, status_message: "The item/record was deleted successfully." },
      })
    );
    const client = new MovieClient({ delete: del } as unknown as AxiosInstance);

    const response = await client.deleteRating(550, { session_id: "test-session" });

    expect(del).toHaveBeenCalledWith("movie/550/rating", {
      params: { session_id: "test-session" },
    });
    expect(response.status_code).toBe(13);
  });

  test("should delete rating with guest session", async () => {
    const del = mock(() => Promise.resolve({ data: { status_code: 13, status_message: "Success." } }));
    const client = new MovieClient({ delete: del } as unknown as AxiosInstance);

    await client.deleteRating(550, { guest_session_id: "guest-123" });

    expect(del).toHaveBeenCalledWith("movie/550/rating", {
      params: { guest_session_id: "guest-123" },
    });
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
