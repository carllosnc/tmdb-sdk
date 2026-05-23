import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { CollectionClient } from "../src/client/collection/index.js";
import { TMDBClient } from "../src/index.js";

describe("TMDBClient - Collection Namespace", () => {
  test("should fetch collection details with mock data", async () => {
    const mockData = {
      id: 10,
      name: "Star Wars Collection",
      overview: "An epic space-opera theatrical film series.",
      poster_path: "/22dj38IckjzEEUZwN1tPU5VJ1qq.jpg",
      backdrop_path: "/4z9ijhgEthfRHShoOvMaBlpciXS.jpg",
      parts: [
        {
          adult: false,
          backdrop_path: "/2w4xG178RpB4MDAIfTkqAuSJzec.jpg",
          id: 11,
          name: "Star Wars",
          original_name: "Star Wars",
          overview: "Princess Leia is captured...",
          poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
          media_type: "movie",
          original_language: "en",
          genre_ids: [12, 28, 878],
          popularity: 15.8557,
          release_date: "1977-05-25",
          video: false,
          vote_average: 8.205,
          vote_count: 21522,
        },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new CollectionClient({ get } as unknown as AxiosInstance);

    const response = await client.getDetails(10);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("collection/10", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass language parameter", async () => {
    const mockData = {
      id: 10,
      name: "Star Wars Collection",
      overview: "",
      parts: [],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new CollectionClient({ get } as unknown as AxiosInstance);

    const response = await client.getDetails(10, { language: "fr-FR" });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("collection/10", {
      params: { language: "fr-FR" },
    });
    expect(response).toEqual(mockData);
  });

  test("should fetch collection images with mock data", async () => {
    const mockData = {
      id: 10,
      backdrops: [
        {
          aspect_ratio: 1.778,
          height: 1080,
          iso_639_1: null,
          file_path: "/d8duYyyC9J5T825Hg7grmaabfxQ.jpg",
          vote_average: 5.464,
          vote_count: 30,
          width: 1920,
        },
      ],
      posters: [
        {
          aspect_ratio: 0.667,
          height: 3000,
          iso_639_1: "en",
          file_path: "/r8Ph5MYXL04Qzu4QBbq2KjqwtkQ.jpg",
          vote_average: 5.516,
          vote_count: 14,
          width: 2000,
        },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new CollectionClient({ get } as unknown as AxiosInstance);

    const response = await client.getImages(10);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("collection/10/images", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass language and include_image_language to images endpoint", async () => {
    const mockData = { id: 10, backdrops: [], posters: [] };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new CollectionClient({ get } as unknown as AxiosInstance);

    const response = await client.getImages(10, {
      language: "en-US",
      includeImageLanguage: "en,null",
    });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("collection/10/images", {
      params: { language: "en-US", include_image_language: "en,null" },
    });
    expect(response).toEqual(mockData);
  });

  test("should fetch collection translations with mock data", async () => {
    const mockData = {
      id: 10,
      translations: [
        {
          iso_3166_1: "DE",
          iso_639_1: "de",
          name: "Deutsch",
          english_name: "German",
          data: { title: "Star Wars Filmreihe", overview: "", homepage: "" },
        },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new CollectionClient({ get } as unknown as AxiosInstance);

    const response = await client.getTranslations(10);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("collection/10/translations");
    expect(response).toEqual(mockData);
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch collection details from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.collection.getDetails(10);
      expect(response).toBeDefined();
      expect(response.id).toBe(10);
      expect(response.name).toBeTypeOf("string");
      expect(response.overview).toBeTypeOf("string");
      expect(response.parts).toBeDefined();
      expect(Array.isArray(response.parts)).toBe(true);
      expect(response.parts.length).toBeGreaterThan(0);
    });

    test("should fetch collection details with language param from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.collection.getDetails(10, {
        language: "fr-FR",
      });
      expect(response).toBeDefined();
      expect(response.id).toBe(10);
      expect(response.parts).toBeDefined();
      expect(Array.isArray(response.parts)).toBe(true);
    });

    test("should fetch collection images from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.collection.getImages(10);
      expect(response).toBeDefined();
      expect(response.id).toBe(10);
      expect(response.backdrops).toBeDefined();
      expect(Array.isArray(response.backdrops)).toBe(true);
      expect(response.posters).toBeDefined();
      expect(Array.isArray(response.posters)).toBe(true);
    });

    test("should fetch collection images with language param from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.collection.getImages(10, {
        language: "en-US",
        includeImageLanguage: "en,null",
      });
      expect(response).toBeDefined();
      expect(response.id).toBe(10);
      expect(response.backdrops).toBeDefined();
      expect(Array.isArray(response.backdrops)).toBe(true);
    });

    test("should fetch collection translations from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.collection.getTranslations(10);
      expect(response).toBeDefined();
      expect(response.id).toBe(10);
      expect(response.translations).toBeDefined();
      expect(Array.isArray(response.translations)).toBe(true);
      expect(response.translations.length).toBeGreaterThan(0);
      const en = response.translations.find(t => t.iso_639_1 === "en");
      expect(en).toBeDefined();
      expect(en!.data.title).toBeTypeOf("string");
    });
  } else {
    test.skip("live collection tests (requires TMDB_TOKEN in env)", () => {});
  }
});
