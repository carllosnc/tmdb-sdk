import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { ChangesClient } from "../src/client/changes/index.ts";
import { TMDBClient } from "../src/index.ts";

describe("TMDBClient - Changes Namespace", () => {
  test("should fetch movie changes with mock data", async () => {
    const mockData = {
      results: [
        { id: 1120293, adult: false },
        { id: 3686, adult: false },
      ],
      page: 1,
      total_pages: 57,
      total_results: 5700,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ChangesClient({ get } as unknown as AxiosInstance);

    const response = await client.getMovieList();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("movie/changes", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass query parameters to movie changes endpoint", async () => {
    const mockData = {
      results: [{ id: 1120293, adult: false }],
      page: 2,
      total_pages: 28,
      total_results: 2800,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ChangesClient({ get } as unknown as AxiosInstance);

    const response = await client.getMovieList({
      startDate: "2026-05-01",
      endDate: "2026-05-14",
      page: 2,
    });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("movie/changes", {
      params: { start_date: "2026-05-01", end_date: "2026-05-14", page: 2 },
    });
    expect(response).toEqual(mockData);
  });

  test("should fetch person changes with mock data", async () => {
    const mockData = {
      results: [
        { id: 4037513, adult: false },
        { id: 2280390, adult: false },
      ],
      page: 1,
      total_pages: 53,
      total_results: 5292,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ChangesClient({ get } as unknown as AxiosInstance);

    const response = await client.getPersonList();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("person/changes", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass query parameters to person changes endpoint", async () => {
    const mockData = {
      results: [{ id: 4037513, adult: false }],
      page: 2,
      total_pages: 26,
      total_results: 2600,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ChangesClient({ get } as unknown as AxiosInstance);

    const response = await client.getPersonList({
      startDate: "2026-05-01",
      endDate: "2026-05-14",
      page: 2,
    });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("person/changes", {
      params: { start_date: "2026-05-01", end_date: "2026-05-14", page: 2 },
    });
    expect(response).toEqual(mockData);
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch movie changes from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.changes.getMovieList();
      expect(response).toBeDefined();
      expect(response.results).toBeDefined();
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.page).toBeTypeOf("number");
      expect(response.total_pages).toBeTypeOf("number");
      expect(response.total_results).toBeTypeOf("number");
      if (response.results.length > 0) {
        expect(response.results[0]!.id).toBeTypeOf("number");
      }
    });

    test("should fetch movie changes with date range from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.changes.getMovieList({
        startDate: "2026-05-01",
        endDate: "2026-05-14",
        page: 1,
      });
      expect(response).toBeDefined();
      expect(response.results).toBeDefined();
      expect(response.page).toBe(1);
    });

    test("should fetch person changes from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.changes.getPersonList();
      expect(response).toBeDefined();
      expect(response.results).toBeDefined();
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.page).toBeTypeOf("number");
      expect(response.total_pages).toBeTypeOf("number");
      expect(response.total_results).toBeTypeOf("number");
      if (response.results.length > 0) {
        expect(response.results[0]!.id).toBeTypeOf("number");
      }
    });

    test("should fetch person changes with date range from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.changes.getPersonList({
        startDate: "2026-05-01",
        endDate: "2026-05-14",
        page: 1,
      });
      expect(response).toBeDefined();
      expect(response.results).toBeDefined();
      expect(response.page).toBe(1);
    });

    test("should fetch TV changes from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.changes.getTVList();
      expect(response).toBeDefined();
      expect(response.results).toBeDefined();
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.page).toBeTypeOf("number");
      expect(response.total_pages).toBeTypeOf("number");
      expect(response.total_results).toBeTypeOf("number");
      if (response.results.length > 0) {
        expect(response.results[0]!.id).toBeTypeOf("number");
      }
    });

    test("should fetch TV changes with date range from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.changes.getTVList({
        startDate: "2026-05-01",
        endDate: "2026-05-14",
        page: 1,
      });
      expect(response).toBeDefined();
      expect(response.results).toBeDefined();
      expect(response.page).toBe(1);
    });
  } else {
    test.skip("live changes tests (requires TMDB_TOKEN in env)", () => {});
  }

  test("should fetch TV changes with mock data", async () => {
    const mockData = {
      results: [
        { id: 225591, adult: false },
        { id: 220819, adult: false },
      ],
      page: 1,
      total_pages: 18,
      total_results: 1763,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ChangesClient({ get } as unknown as AxiosInstance);

    const response = await client.getTVList();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("tv/changes", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass query parameters to TV changes endpoint", async () => {
    const mockData = {
      results: [{ id: 225591, adult: false }],
      page: 2,
      total_pages: 9,
      total_results: 900,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ChangesClient({ get } as unknown as AxiosInstance);

    const response = await client.getTVList({
      startDate: "2026-05-01",
      endDate: "2026-05-14",
      page: 2,
    });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("tv/changes", {
      params: { start_date: "2026-05-01", end_date: "2026-05-14", page: 2 },
    });
    expect(response).toEqual(mockData);
  });
});
