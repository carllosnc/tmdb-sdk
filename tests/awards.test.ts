import { afterEach, describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { AwardsClient } from "../src/client/awards/index.js";
import { MovieClient } from "../src/client/movie/index.js";
import { TvClient } from "../src/client/tv/index.js";

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
});

describe("AwardsClient", () => {
  test("getByImdbId returns null when imdbId is empty", async () => {
    const client = new AwardsClient("fake-key");
    const result = await client.getByImdbId("");
    expect(result).toBeNull();
  });

  test("getByImdbId returns null when OMDb returns error", async () => {
    const mockFetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ Response: "False", Error: "Movie not found!" }),
      })
    );
    global.fetch = mockFetch as unknown as typeof global.fetch;

    const client = new AwardsClient("fake-key");
    const result = await client.getByImdbId("tt0000000");
    expect(result).toBeNull();
  });

  test("getByImdbId parses awards string correctly", async () => {
    const mockFetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            Title: "The Godfather",
            Year: "1972",
            Awards: "Won 3 Oscars. Another 25 wins & 30 nominations.",
            Ratings: [
              { Source: "Internet Movie Database", Value: "9.2/10" },
              { Source: "Rotten Tomatoes", Value: "97%" },
              { Source: "Metacritic", Value: "100/100" },
            ],
            Metascore: "100",
            imdbRating: "9.2",
            imdbVotes: "2,200,000",
            Response: "True",
          }),
      })
    );
    global.fetch = mockFetch as unknown as typeof global.fetch;

    const client = new AwardsClient("fake-key");
    const result = await client.getByImdbId("tt0068646");

    expect(result).not.toBeNull();
    expect(result!.summary).toBe("Won 3 Oscars. Another 25 wins & 30 nominations.");
    expect(result!.wins).toBe(28);
    expect(result!.nominations).toBe(30);
    expect(result!.imdbRating).toBe(9.2);
    expect(result!.imdbVotes).toBe(2200000);
    expect(result!.metascore).toBe(100);
    expect(result!.ratings).toHaveLength(3);
    expect(result!.ratings[0]!.source).toBe("Internet Movie Database");
    expect(result!.ratings[0]!.value).toBe("9.2/10");
  });

  test("getByImdbId returns nulls for N/A values", async () => {
    const mockFetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            Title: "Unknown",
            Year: "2000",
            Awards: "N/A",
            Ratings: [],
            Metascore: "N/A",
            imdbRating: "N/A",
            imdbVotes: "N/A",
            Response: "True",
          }),
      })
    );
    global.fetch = mockFetch as unknown as typeof global.fetch;

    const client = new AwardsClient("fake-key");
    const result = await client.getByImdbId("tt9999999");

    expect(result).not.toBeNull();
    expect(result!.summary).toBe("N/A");
    expect(result!.wins).toBe(0);
    expect(result!.nominations).toBe(0);
    expect(result!.imdbRating).toBeNull();
    expect(result!.imdbVotes).toBeNull();
    expect(result!.metascore).toBeNull();
    expect(result!.ratings).toHaveLength(0);
  });
});

describe("MovieClient - Awards Integration", () => {
  test("getDetails without includeAwards does not fetch awards", async () => {
    const get = mock(() =>
      Promise.resolve({ data: { id: 550, title: "Fight Club", imdb_id: "tt0137523" } })
    );
    const client = new MovieClient({ get } as unknown as HttpClient);

    const response = await client.getDetails(550);
    expect(response.id).toBe(550);
    expect(response.title).toBe("Fight Club");
    expect((response as any).awards).toBeUndefined();
  });

  test("getDetails with includeAwards but no omdbApiKey skips silently", async () => {
    const get = mock(() =>
      Promise.resolve({ data: { id: 550, title: "Fight Club", imdb_id: "tt0137523" } })
    );
    const client = new MovieClient({ get } as unknown as HttpClient);

    const response = await client.getDetails(550, { includeAwards: true });
    expect(response.id).toBe(550);
    expect((response as any).awards).toBeUndefined();
  });

  test("getDetails with includeAwards fetches and merges awards", async () => {
    const mockGet = mock((url: string) => {
      if (url === "movie/550") {
        return Promise.resolve({ data: { id: 550, title: "Fight Club", imdb_id: "tt0137523" } });
      }
      return Promise.reject(new Error(`unexpected url: ${url}`));
    });
    const omdbFetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            Title: "Fight Club",
            Year: "1999",
            Awards: "Nominated for 1 Oscar. Another 11 wins & 38 nominations.",
            Ratings: [
              { Source: "Internet Movie Database", Value: "8.8/10" },
              { Source: "Rotten Tomatoes", Value: "80%" },
            ],
            Metascore: "66",
            imdbRating: "8.8",
            imdbVotes: "2,500,000",
            Response: "True",
          }),
      })
    );
    global.fetch = omdbFetch as unknown as typeof global.fetch;

    const client = new MovieClient({ get: mockGet } as unknown as HttpClient, "omdb-key");
    const response = await client.getDetails(550, { includeAwards: true });

    expect(response.id).toBe(550);
    expect(response.title).toBe("Fight Club");
    expect(response.awards).toBeDefined();
    expect(response.awards!.summary).toBe("Nominated for 1 Oscar. Another 11 wins & 38 nominations.");
    expect(response.awards!.wins).toBe(11);
    expect(response.awards!.nominations).toBe(38);
    expect(response.awards!.imdbRating).toBe(8.8);
    expect(response.awards!.ratings).toHaveLength(2);
  });

  test("getDetails with includeAwards and appendToResponse works together", async () => {
    const mockGet = mock((url: string) => {
      if (url === "movie/550") {
        return Promise.resolve({
          data: {
            id: 550,
            title: "Fight Club",
            imdb_id: "tt0137523",
            credits: { cast: [{ id: 819, name: "Edward Norton", character: "The Narrator", order: 0 }] },
          },
        });
      }
      return Promise.reject(new Error(`unexpected url: ${url}`));
    });
    const omdbFetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            Title: "Fight Club", Year: "1999",
            Awards: "Nominated for 1 Oscar.", Ratings: [],
            Metascore: "66", imdbRating: "8.8", imdbVotes: "100,000",
            Response: "True",
          }),
      })
    );
    global.fetch = omdbFetch as unknown as typeof global.fetch;

    const client = new MovieClient({ get: mockGet } as unknown as HttpClient, "omdb-key");
    const response = await client.getDetails(550, {
      includeAwards: true,
      appendToResponse: ["credits"],
    });

    expect(mockGet).toHaveBeenCalledWith("movie/550", {
      params: { append_to_response: "credits" },
    });
    expect(response.credits).toBeDefined();
    expect(response.credits!.cast).toHaveLength(1);
    expect(response.awards).toBeDefined();
    expect(response.awards!.summary).toBe("Nominated for 1 Oscar.");
  });
});

describe("TvClient - Awards Integration", () => {
  test("getDetails without includeAwards does not fetch awards", async () => {
    const get = mock(() =>
      Promise.resolve({ data: { id: 1668, name: "Friends", imdb_id: "tt0108778" } })
    );
    const client = new TvClient({ get } as unknown as HttpClient);

    const response = await client.getDetails(1668);
    expect(response.name).toBe("Friends");
    expect((response as any).awards).toBeUndefined();
  });

  test("getDetails with includeAwards fetches external_ids then OMDb", async () => {
    const mockGet = mock((url: string) => {
      if (url === "tv/1668") {
        return Promise.resolve({
          data: { id: 1668, name: "Friends" },
        });
      }
      if (url === "tv/1668/external_ids") {
        return Promise.resolve({
          data: { imdb_id: "tt0108778" },
        });
      }
      return Promise.reject(new Error(`unexpected url: ${url}`));
    });
    const omdbFetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            Title: "Friends", Year: "1994",
            Awards: "Won 6 Primetime Emmys. Another 68 wins & 156 nominations.",
            Ratings: [
              { Source: "Internet Movie Database", Value: "8.9/10" },
            ],
            Metascore: "N/A",
            imdbRating: "8.9",
            imdbVotes: "1,200,000",
            Response: "True",
          }),
      })
    );
    global.fetch = omdbFetch as unknown as typeof global.fetch;

    const client = new TvClient({ get: mockGet } as unknown as HttpClient, "omdb-key");
    const response = await client.getDetails(1668, { includeAwards: true });

    expect(response.id).toBe(1668);
    expect(response.name).toBe("Friends");
    expect(response.awards).toBeDefined();
    expect(response.awards!.summary).toBe("Won 6 Primetime Emmys. Another 68 wins & 156 nominations.");
    expect(response.awards!.wins).toBe(74);
    expect(response.awards!.nominations).toBe(156);
    expect(response.awards!.imdbRating).toBe(8.9);
  });

  test("getDetails with includeAwards but no OMDb key skips silently", async () => {
    const get = mock(() =>
      Promise.resolve({ data: { id: 1668, name: "Friends" } })
    );
    const client = new TvClient({ get } as unknown as HttpClient);

    const response = await client.getDetails(1668, { includeAwards: true });
    expect(response.name).toBe("Friends");
    expect((response as any).awards).toBeUndefined();
  });
});
