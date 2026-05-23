import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { PersonClient } from "../src/client/person/index.ts";
import { TMDBClient } from "../src/index.ts";

describe("TMDBClient - Person Namespace", () => {
  test("should fetch popular people with mock data", async () => {
    const mockData = {
      page: 1,
      results: [
        {
          adult: false,
          gender: 1,
          id: 224513,
          known_for: [
            {
              adult: false,
              backdrop_path: "/ilRyazdMJwN05exqhwK4tMKBYZs.jpg",
              genre_ids: [878, 18],
              id: 335984,
              media_type: "movie",
              original_language: "en",
              original_title: "Blade Runner 2049",
              overview: "A new blade runner unearths a long-buried secret.",
              poster_path: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
              release_date: "2017-10-04",
              title: "Blade Runner 2049",
              video: false,
              vote_average: 7.5,
              vote_count: 11771,
            },
          ],
          known_for_department: "Acting",
          name: "Ana de Armas",
          popularity: 343.33,
          profile_path: "/3vxvsmYLTf4jnr163SUlBIw51ee.jpg",
        },
      ],
      total_pages: 500,
      total_results: 10000,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    const response = await client.getPopular();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("person/popular", { params: undefined });
    expect(response).toEqual(mockData);
  });

  test("should fetch popular people with params", async () => {
    const get = mock(() => Promise.resolve({ data: {} }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    await client.getPopular({ language: "fr-FR", page: 2 });

    expect(get).toHaveBeenCalledWith("person/popular", {
      params: { language: "fr-FR", page: 2 },
    });
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch popular people from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.person.getPopular();
      expect(response).toBeDefined();
      expect(response.page).toBeTypeOf("number");
      expect(response.results).toBeDefined();
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0].name).toBeTypeOf("string");
      expect(response.results[0].known_for).toBeDefined();
    });
  } else {
    test.skip("live person tests (requires TMDB_TOKEN in env)", () => {});
  }
});
