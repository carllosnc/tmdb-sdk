import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { ReviewClient } from "../src/client/review/index.ts";
import { TMDBClient } from "../src/index.ts";

describe("TMDBClient - Review Namespace", () => {
  test("should fetch review details with mock data", async () => {
    const mockData = {
      id: "640b2aeecaaca20079decdcc",
      author: "Ricardo Oliveira",
      author_details: {
        name: "Ricardo Oliveira",
        username: "RSOliveira",
        avatar_path: "/23Cl7rhsknc7IIAcZZAGKzovjTu.jpg",
        rating: 9.0,
      },
      content: "The Last of Us is a post-apocalyptic TV series.",
      created_at: "2023-03-10T13:04:46.674Z",
      iso_639_1: "en",
      media_id: 100088,
      media_title: "The Last of Us",
      media_type: "tv",
      updated_at: "2023-03-10T13:04:46.734Z",
      url: "https://www.themoviedb.org/review/640b2aeecaaca20079decdcc",
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ReviewClient({ get } as unknown as AxiosInstance);

    const response = await client.getDetails("640b2aeecaaca20079decdcc");

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("review/640b2aeecaaca20079decdcc");
    expect(response).toEqual(mockData);
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch review details from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.review.getDetails("640b2aeecaaca20079decdcc");
      expect(response).toBeDefined();
      expect(response.id).toBe("640b2aeecaaca20079decdcc");
      expect(response.author).toBeTypeOf("string");
      expect(response.content).toBeTypeOf("string");
      expect(response.author_details).toBeDefined();
    });
  } else {
    test.skip("live review tests (requires TMDB_TOKEN in env)", () => {});
  }
});
