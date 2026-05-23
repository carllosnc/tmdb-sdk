import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { SearchClient } from "../src/client/search/index.js";
import { TMDBClient } from "../src/index.js";

const get = mock(() =>
  Promise.resolve({
    data: {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    },
  })
);

function createClient() {
  return new SearchClient({ get } as unknown as AxiosInstance);
}

describe("TMDBClient - Search Namespace", () => {
  test("should search collections with query", async () => {
    const client = createClient();
    const response = await client.searchCollections({ query: "star wars" });

    expect(get).toHaveBeenCalledWith("search/collection", {
      params: { query: "star wars" },
    });
    expect(response.page).toBe(1);
  });

  test("should search collections with all params", async () => {
    const client = createClient();
    await client.searchCollections({
      query: "star wars",
      includeAdult: true,
      language: "en-US",
      page: 2,
      region: "US",
    });

    expect(get).toHaveBeenCalledWith("search/collection", {
      params: {
        query: "star wars",
        include_adult: true,
        language: "en-US",
        page: 2,
        region: "US",
      },
    });
  });

  test("should search companies with query", async () => {
    const client = createClient();
    await client.searchCompanies({ query: "marvel" });

    expect(get).toHaveBeenCalledWith("search/company", {
      params: { query: "marvel" },
    });
  });

  test("should search companies with page param", async () => {
    const client = createClient();
    await client.searchCompanies({ query: "marvel", page: 2 });

    expect(get).toHaveBeenCalledWith("search/company", {
      params: { query: "marvel", page: 2 },
    });
  });

  test("should search keywords with query", async () => {
    const client = createClient();
    await client.searchKeywords({ query: "alien" });

    expect(get).toHaveBeenCalledWith("search/keyword", {
      params: { query: "alien" },
    });
  });

  test("should search keywords with page param", async () => {
    const client = createClient();
    await client.searchKeywords({ query: "alien", page: 3 });

    expect(get).toHaveBeenCalledWith("search/keyword", {
      params: { query: "alien", page: 3 },
    });
  });

  test("should search movies with query", async () => {
    const client = createClient();
    await client.searchMovies({ query: "fight club" });

    expect(get).toHaveBeenCalledWith("search/movie", {
      params: { query: "fight club" },
    });
  });

  test("should search movies with all params", async () => {
    const client = createClient();
    await client.searchMovies({
      query: "fight club",
      includeAdult: false,
      language: "en-US",
      primaryReleaseYear: "1999",
      page: 1,
      region: "US",
      year: "1999",
    });

    expect(get).toHaveBeenCalledWith("search/movie", {
      params: {
        query: "fight club",
        include_adult: false,
        language: "en-US",
        primary_release_year: "1999",
        page: 1,
        region: "US",
        year: "1999",
      },
    });
  });

  test("should search multi with query", async () => {
    const client = createClient();
    await client.searchMulti({ query: "star" });

    expect(get).toHaveBeenCalledWith("search/multi", {
      params: { query: "star" },
    });
  });

  test("should search multi with all params", async () => {
    const client = createClient();
    await client.searchMulti({
      query: "star",
      includeAdult: true,
      language: "en-US",
      page: 2,
    });

    expect(get).toHaveBeenCalledWith("search/multi", {
      params: {
        query: "star",
        include_adult: true,
        language: "en-US",
        page: 2,
      },
    });
  });

  test("should search people with query", async () => {
    const client = createClient();
    await client.searchPeople({ query: "brad pitt" });

    expect(get).toHaveBeenCalledWith("search/person", {
      params: { query: "brad pitt" },
    });
  });

  test("should search people with all params", async () => {
    const client = createClient();
    await client.searchPeople({
      query: "brad pitt",
      includeAdult: false,
      language: "en-US",
      page: 1,
    });

    expect(get).toHaveBeenCalledWith("search/person", {
      params: {
        query: "brad pitt",
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });
  });

  test("should search TV shows with query", async () => {
    const client = createClient();
    await client.searchTvShows({ query: "breaking bad" });

    expect(get).toHaveBeenCalledWith("search/tv", {
      params: { query: "breaking bad" },
    });
  });

  test("should search TV shows with all params", async () => {
    const client = createClient();
    await client.searchTvShows({
      query: "breaking bad",
      firstAirDateYear: 2008,
      includeAdult: false,
      language: "en-US",
      page: 1,
      year: 2008,
    });

    expect(get).toHaveBeenCalledWith("search/tv", {
      params: {
        query: "breaking bad",
        first_air_date_year: 2008,
        include_adult: false,
        language: "en-US",
        page: 1,
        year: 2008,
      },
    });
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should search movies from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.search.searchMovies({ query: "fight club" });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0]!.title).toBeTypeOf("string");
    });

    test("should search TV shows from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.search.searchTvShows({ query: "breaking bad" });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0]!.name).toBeTypeOf("string");
    });

    test("should search people from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.search.searchPeople({ query: "brad pitt" });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0]!.name).toBeTypeOf("string");
    });

    test("should search collections from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.search.searchCollections({ query: "star wars" });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
    });

    test("should search companies from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.search.searchCompanies({ query: "marvel" });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0]!.name).toBeTypeOf("string");
    });

    test("should search keywords from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.search.searchKeywords({ query: "alien" });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
    });

    test("should search multi from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.search.searchMulti({ query: "star" });
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      for (const result of response.results) {
        expect(["movie", "tv", "person"]).toContain(result.media_type);
      }
    });
  } else {
    test.skip("live search tests (requires TMDB_TOKEN in env)", () => {});
  }
});
