import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { AccountClient } from "../src/client/account/index.ts";
import { TMDBClient } from "../src/index.ts";

describe("TMDBClient - Account Namespace", () => {
  test("should fetch watchlist movies with query params", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: { page: 1, results: [], total_pages: 0, total_results: 0 },
      })
    );
    const client = new AccountClient({ get } as unknown as AxiosInstance);

    const response = await client.getWatchlistMovies({
      accountId: 42,
      sessionId: "test-session",
      language: "en-US",
      page: 2,
      sortBy: "created_at.desc",
    });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("account/42/watchlist/movies", {
      params: {
        session_id: "test-session",
        language: "en-US",
        page: 2,
        sort_by: "created_at.desc",
      },
    });
    expect(response.page).toBe(1);
    expect(response.results).toEqual([]);
  });

  test("should fetch watchlist movies with account id only", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: { page: 1, results: [], total_pages: 0, total_results: 0 },
      })
    );
    const client = new AccountClient({ get } as unknown as AxiosInstance);

    await client.getWatchlistMovies({ accountId: 7 });

    expect(get).toHaveBeenCalledWith("account/7/watchlist/movies", { params: {} });
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch account details from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const account = await client.account.getDetails();
      expect(account).toBeDefined();
      expect(account.id).toBeTypeOf("number");
      expect(account.username).toBeTypeOf("string");
    });

    test("should add and remove a favorite from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const account = await client.account.getDetails();
      const accountId = account.id;

      const addResponse = await client.account.addFavorite(
        { accountId },
        { media_type: "movie", media_id: 11, favorite: true }
      );
      expect(addResponse).toBeDefined();
      expect(addResponse.success).toBe(true);

      const removeResponse = await client.account.addFavorite(
        { accountId },
        { media_type: "movie", media_id: 11, favorite: false }
      );
      expect(removeResponse).toBeDefined();
      expect(removeResponse.success).toBe(true);
    });

    test("should add and remove a watchlist item from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const account = await client.account.getDetails();
      const accountId = account.id;

      const addResponse = await client.account.addToWatchlist(
        { accountId },
        { media_type: "movie", media_id: 11, watchlist: true }
      );
      expect(addResponse).toBeDefined();
      expect(addResponse.success).toBe(true);

      const removeResponse = await client.account.addToWatchlist(
        { accountId },
        { media_type: "movie", media_id: 11, watchlist: false }
      );
      expect(removeResponse).toBeDefined();
      expect(removeResponse.success).toBe(true);
    });

    test("should fetch favorite movies from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const account = await client.account.getDetails();
      const accountId = account.id;

      const response = await client.account.getFavoriteMovies({ accountId });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.total_pages).toBeTypeOf("number");
      expect(response.total_results).toBeTypeOf("number");
    });

    test("should fetch watchlist movies from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const account = await client.account.getDetails();
      const accountId = account.id;

      const response = await client.account.getWatchlistMovies({
        accountId,
        language: "en-US",
        page: 1,
        sortBy: "created_at.asc",
      });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.total_pages).toBeTypeOf("number");
      expect(response.total_results).toBeTypeOf("number");
    });

    test("should fetch favorite TV shows from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const account = await client.account.getDetails();
      const accountId = account.id;

      const response = await client.account.getFavoriteTV({ accountId });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.total_pages).toBeTypeOf("number");
      expect(response.total_results).toBeTypeOf("number");
    });

    test("should fetch custom lists from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const account = await client.account.getDetails();
      const accountId = account.id;

      const response = await client.account.getLists({ accountId });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.total_pages).toBeTypeOf("number");
      expect(response.total_results).toBeTypeOf("number");
    });

    test("should fetch rated movies from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const account = await client.account.getDetails();
      const accountId = account.id;

      const response = await client.account.getRatedMovies({ accountId });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.total_pages).toBeTypeOf("number");
      expect(response.total_results).toBeTypeOf("number");
    });

    test("should fetch rated TV shows from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const account = await client.account.getDetails();
      const accountId = account.id;

      const response = await client.account.getRatedTV({ accountId });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.total_pages).toBeTypeOf("number");
      expect(response.total_results).toBeTypeOf("number");
    });

    test("should fetch rated TV episodes from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const account = await client.account.getDetails();
      const accountId = account.id;

      const response = await client.account.getRatedTVEpisodes({ accountId });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.total_pages).toBeTypeOf("number");
      expect(response.total_results).toBeTypeOf("number");
    });
  } else {
    test.skip("live account tests (requires TMDB_TOKEN in env)", () => {});
  }
});
