import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { AccountV4Client } from "../src/client/account-v4/index.js";

describe("TMDBClient - AccountV4 Namespace", () => {
  const mockPaginated = { page: 1, results: [], total_pages: 0, total_results: 0 };

  test("should fetch lists", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    const response = await client.getLists("abc123");

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("/4/account/abc123/lists", { params: {} });
    expect(response).toEqual(mockPaginated);
  });

  test("should pass page to lists endpoint", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    await client.getLists("abc123", { page: 2 });

    expect(get).toHaveBeenCalledWith("/4/account/abc123/lists", { params: { page: 2 } });
  });

  test("should fetch favorite movies", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    const response = await client.getFavoriteMovies("abc123");

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("/4/account/abc123/movie/favorites", { params: {} });
    expect(response).toEqual(mockPaginated);
  });

  test("should pass params to favorite movies endpoint", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    await client.getFavoriteMovies("abc123", { language: "en-US", page: 1, sortBy: "created_at.desc" });

    expect(get).toHaveBeenCalledWith("/4/account/abc123/movie/favorites", {
      params: { language: "en-US", page: 1, sort_by: "created_at.desc" },
    });
  });

  test("should fetch favorite TV shows", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    const response = await client.getFavoriteTvShows("abc123");

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("/4/account/abc123/tv/favorites", { params: {} });
    expect(response).toEqual(mockPaginated);
  });

  test("should pass params to favorite TV shows endpoint", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    await client.getFavoriteTvShows("abc123", { language: "fr-FR", page: 2, sortBy: "created_at.asc" });

    expect(get).toHaveBeenCalledWith("/4/account/abc123/tv/favorites", {
      params: { language: "fr-FR", page: 2, sort_by: "created_at.asc" },
    });
  });

  test("should fetch rated movies", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    const response = await client.getRatedMovies("abc123");

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("/4/account/abc123/movie/rated", { params: {} });
    expect(response).toEqual(mockPaginated);
  });

  test("should pass params to rated movies endpoint", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    await client.getRatedMovies("abc123", { page: 3 });

    expect(get).toHaveBeenCalledWith("/4/account/abc123/movie/rated", {
      params: { page: 3 },
    });
  });

  test("should fetch rated TV shows", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    const response = await client.getRatedTvShows("abc123");

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("/4/account/abc123/tv/rated", { params: {} });
    expect(response).toEqual(mockPaginated);
  });

  test("should pass params to rated TV shows endpoint", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    await client.getRatedTvShows("abc123", { language: "de-DE" });

    expect(get).toHaveBeenCalledWith("/4/account/abc123/tv/rated", {
      params: { language: "de-DE" },
    });
  });

  test("should fetch watchlist movies", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    const response = await client.getWatchlistMovies("abc123");

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("/4/account/abc123/movie/watchlist", { params: {} });
    expect(response).toEqual(mockPaginated);
  });

  test("should pass params to watchlist movies endpoint", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    await client.getWatchlistMovies("abc123", { sortBy: "created_at.desc" });

    expect(get).toHaveBeenCalledWith("/4/account/abc123/movie/watchlist", {
      params: { sort_by: "created_at.desc" },
    });
  });

  test("should fetch watchlist TV shows", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    const response = await client.getWatchlistTvShows("abc123");

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("/4/account/abc123/tv/watchlist", { params: {} });
    expect(response).toEqual(mockPaginated);
  });

  test("should pass all params to watchlist TV shows endpoint", async () => {
    const get = mock(() => Promise.resolve({ data: mockPaginated }));
    const client = new AccountV4Client({ get } as unknown as HttpClient);

    await client.getWatchlistTvShows("abc123", { language: "en-US", page: 1, sortBy: "created_at.asc" });

    expect(get).toHaveBeenCalledWith("/4/account/abc123/tv/watchlist", {
      params: { language: "en-US", page: 1, sort_by: "created_at.asc" },
    });
  });
});
