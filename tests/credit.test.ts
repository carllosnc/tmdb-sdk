import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { CreditClient } from "../src/client/credit/index.js";
import { TMDBClient } from "../src/index.js";

describe("TMDBClient - Credit Namespace", () => {
  test("should fetch credit details with mock data", async () => {
    const mockData = {
      credit_type: "cast",
      department: "Acting",
      job: "Actor",
      media: {
        adult: false,
        backdrop_path: "/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
        id: 100088,
        name: "The Last of Us",
        original_language: "en",
        original_name: "The Last of Us",
        overview: "Twenty years after a fungal outbreak...",
        poster_path: "/igwIPNClQpGVzb61QlGqcpT5zUy.jpg",
        media_type: "tv",
        genre_ids: [18],
        popularity: 898.378,
        first_air_date: "2023-01-15",
        vote_average: 8.749,
        vote_count: 3341,
        origin_country: ["US"],
        character: "Joel Miller",
      },
      media_type: "tv",
      id: "6024a814c0ae36003d59cc3c",
      person: {
        adult: false,
        id: 1253360,
        name: "Pedro Pascal",
        original_name: "Pedro Pascal",
        media_type: "person",
        popularity: 106.095,
        gender: 2,
        known_for_department: "Acting",
        profile_path: "/dBOrm29cr7NUrjiDQMTtrTyDpfy.jpg",
      },
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new CreditClient({ get } as unknown as HttpClient);

    const response = await client.getDetails("6024a814c0ae36003d59cc3c");

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("credit/6024a814c0ae36003d59cc3c");
    expect(response).toEqual(mockData);
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch credit details from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.credit.getDetails("6024a814c0ae36003d59cc3c");
      expect(response).toBeDefined();
      expect(response.id).toBe("6024a814c0ae36003d59cc3c");
      expect(response.credit_type).toBeTypeOf("string");
      expect(response.media).toBeDefined();
      expect(response.person).toBeDefined();
      expect(response.person.name).toBeTypeOf("string");
    });
  } else {
    test.skip("live credit tests (requires TMDB_TOKEN in env)", () => {});
  }
});
