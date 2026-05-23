import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { GuestSessionClient } from "../src/client/guest-session/index.ts";
import { TMDBClient } from "../src/index.ts";

describe("TMDBClient - GuestSession Namespace", () => {
  const guestSessionId = "mock-session-id";

  test("should fetch rated movies with mock data", async () => {
    const mockData = {
      page: 1,
      results: [
        {
          adult: false,
          backdrop_path: "/ikR2qy9xJCHX7M8i5rcvuNfdYXs.jpg",
          genre_ids: [18, 80],
          id: 16,
          original_language: "en",
          original_title: "Dancer in the Dark",
          overview: "Selma, a Czech immigrant...",
          popularity: 14.684,
          poster_path: "/8Wdd3fQfbbQeoSfWpHrDfaFNhBU.jpg",
          release_date: "2000-06-30",
          title: "Dancer in the Dark",
          video: false,
          vote_average: 7.885,
          vote_count: 1549,
          rating: 8.5,
        },
      ],
      total_pages: 1,
      total_results: 1,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new GuestSessionClient({ get } as unknown as AxiosInstance);

    const response = await client.getRatedMovies(guestSessionId);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith(
      `guest_session/${guestSessionId}/rated/movies`,
      { params: {} }
    );
    expect(response).toEqual(mockData);
  });

  test("should pass params to rated movies", async () => {
    const mockData = { page: 1, results: [], total_pages: 0, total_results: 0 };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new GuestSessionClient({ get } as unknown as AxiosInstance);

    await client.getRatedMovies(guestSessionId, {
      language: "fr-FR",
      page: 2,
      sortBy: "created_at.desc",
    });

    expect(get).toHaveBeenCalledWith(
      `guest_session/${guestSessionId}/rated/movies`,
      {
        params: { language: "fr-FR", page: 2, sort_by: "created_at.desc" },
      }
    );
  });

  test("should fetch rated TV shows with mock data", async () => {
    const mockData = {
      page: 1,
      results: [
        {
          adult: false,
          backdrop_path: "/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg",
          genre_ids: [10765, 18, 10759],
          id: 1399,
          origin_country: ["US"],
          original_language: "en",
          original_name: "Game of Thrones",
          overview: "Seven noble families fight for control...",
          popularity: 404.299,
          poster_path: "/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg",
          first_air_date: "2011-04-17",
          name: "Game of Thrones",
          vote_average: 8.436,
          vote_count: 21025,
          rating: 8.5,
        },
      ],
      total_pages: 1,
      total_results: 1,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new GuestSessionClient({ get } as unknown as AxiosInstance);

    const response = await client.getRatedTvShows(guestSessionId);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith(
      `guest_session/${guestSessionId}/rated/tv`,
      { params: {} }
    );
    expect(response).toEqual(mockData);
  });

  test("should fetch rated TV episodes with mock data", async () => {
    const mockData = {
      page: 1,
      results: [
        {
          air_date: "2011-04-17",
          episode_number: 1,
          id: 63056,
          name: "Winter Is Coming",
          overview: "Jon Arryn, the Hand of the King, is dead...",
          production_code: "101",
          runtime: 62,
          season_number: 1,
          show_id: 1399,
          still_path: "/9hGF3WUkBf7cSjMg0cdMDHJkByd.jpg",
          vote_average: 7.843,
          vote_count: 286,
          rating: 8.5,
        },
      ],
      total_pages: 1,
      total_results: 1,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new GuestSessionClient({ get } as unknown as AxiosInstance);

    const response = await client.getRatedTvEpisodes(guestSessionId);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith(
      `guest_session/${guestSessionId}/rated/tv/episodes`,
      { params: {} }
    );
    expect(response).toEqual(mockData);
  });

  test("should pass params to rated TV episodes", async () => {
    const mockData = { page: 1, results: [], total_pages: 0, total_results: 0 };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new GuestSessionClient({ get } as unknown as AxiosInstance);

    await client.getRatedTvEpisodes(guestSessionId, {
      sortBy: "created_at.asc",
    });

    expect(get).toHaveBeenCalledWith(
      `guest_session/${guestSessionId}/rated/tv/episodes`,
      { params: { sort_by: "created_at.asc" } }
    );
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should create guest session and fetch rated movies from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const session =
        await client.authentication.createGuestSession();
      expect(session).toBeDefined();
      expect(session.guest_session_id).toBeTypeOf("string");

      try {
        const response = await client.guestSession.getRatedMovies(
          session.guest_session_id
        );
        expect(response).toBeDefined();
        expect(Array.isArray(response.results)).toBe(true);
      } catch (err: any) {
        // Fresh guest session has no ratings, API returns 404
        expect(err.status).toBe(404);
      }
    });

    test("should create guest session and fetch rated TV from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const session =
        await client.authentication.createGuestSession();

      try {
        const response = await client.guestSession.getRatedTvShows(
          session.guest_session_id
        );
        expect(response).toBeDefined();
        expect(Array.isArray(response.results)).toBe(true);
      } catch (err: any) {
        expect(err.status).toBe(404);
      }
    });

    test("should create guest session and fetch rated TV episodes from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const session =
        await client.authentication.createGuestSession();

      try {
        const response = await client.guestSession.getRatedTvEpisodes(
          session.guest_session_id
        );
        expect(response).toBeDefined();
        expect(Array.isArray(response.results)).toBe(true);
      } catch (err: any) {
        expect(err.status).toBe(404);
      }
    });
  } else {
    test.skip("live guest session tests (requires TMDB_TOKEN in env)", () => {});
  }
});
