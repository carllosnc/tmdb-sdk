import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { GenreClient } from "../src/client/genre/index.js";
import { TMDBClient } from "../src/index.js";

describe("TMDBClient - Genre Namespace", () => {
  test("should fetch movie genres with mock data", async () => {
    const mockData = {
      genres: [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new GenreClient({ get } as unknown as HttpClient);

    const response = await client.getMovies();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("genre/movie/list", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass language param to movie genres", async () => {
    const mockData = { genres: [] };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new GenreClient({ get } as unknown as HttpClient);

    await client.getMovies({ language: "de-DE" });

    expect(get).toHaveBeenCalledWith("genre/movie/list", {
      params: { language: "de-DE" },
    });
  });

  test("should fetch TV genres with mock data", async () => {
    const mockData = {
      genres: [
        { id: 10759, name: "Action & Adventure" },
        { id: 16, name: "Animation" },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new GenreClient({ get } as unknown as HttpClient);

    const response = await client.getTvShows();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("genre/tv/list", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass language param to TV genres", async () => {
    const mockData = { genres: [] };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new GenreClient({ get } as unknown as HttpClient);

    await client.getTvShows({ language: "fr-FR" });

    expect(get).toHaveBeenCalledWith("genre/tv/list", {
      params: { language: "fr-FR" },
    });
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch movie genres from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.genre.getMovies();
      expect(response).toBeDefined();
      expect(response.genres).toBeDefined();
      expect(Array.isArray(response.genres)).toBe(true);
      expect(response.genres.length).toBeGreaterThan(0);
      const action = response.genres.find(g => g.id === 28);
      expect(action).toBeDefined();
      expect(action!.name).toBeTypeOf("string");
    });

    test("should fetch movie genres with language param from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.genre.getMovies({ language: "de-DE" });
      expect(response).toBeDefined();
      expect(response.genres.length).toBeGreaterThan(0);
      const action = response.genres.find(g => g.id === 28);
      expect(action).toBeDefined();
      expect(action!.name).toBe("Action");
    });

    test("should fetch TV genres from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.genre.getTvShows();
      expect(response).toBeDefined();
      expect(response.genres).toBeDefined();
      expect(Array.isArray(response.genres)).toBe(true);
      expect(response.genres.length).toBeGreaterThan(0);
      const actionAdventure = response.genres.find(g => g.id === 10759);
      expect(actionAdventure).toBeDefined();
      expect(actionAdventure!.name).toBeTypeOf("string");
    });

    test("should fetch TV genres with language param from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.genre.getTvShows({ language: "de-DE" });
      expect(response).toBeDefined();
      expect(response.genres.length).toBeGreaterThan(0);
    });
  } else {
    test.skip("live genre tests (requires TMDB_TOKEN in env)", () => {});
  }
});
