import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { PersonClient } from "../src/client/person/index.js";
import { TMDBClient } from "../src/index.js";

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

  test("should fetch person details with mock data", async () => {
    const mockData = {
      adult: false,
      also_known_as: ["Thomas Jeffrey Hanks"],
      biography: "Thomas Jeffrey Hanks is an American actor.",
      birthday: "1956-07-09",
      deathday: null,
      gender: 2,
      homepage: null,
      id: 31,
      imdb_id: "nm0000158",
      known_for_department: "Acting",
      name: "Tom Hanks",
      place_of_birth: "Concord, California, USA",
      popularity: 82.989,
      profile_path: "/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg",
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    const response = await client.getDetails(31);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("person/31", { params: undefined });
    expect(response).toEqual(mockData);
  });

  test("should fetch person details with params", async () => {
    const get = mock(() => Promise.resolve({ data: {} }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    await client.getDetails(31, { language: "fr-FR", append_to_response: ["combined_credits"] });

    expect(get).toHaveBeenCalledWith("person/31", {
      params: { language: "fr-FR", append_to_response: "combined_credits" },
    });
  });

  test("should fetch person changes with mock data", async () => {
    const mockData = {
      changes: [
        {
          key: "biography",
          items: [
            {
              id: "640469b113654500ba4e859a",
              action: "added",
              time: "2023-03-05 10:06:41 UTC",
              iso_639_1: "ca",
              iso_3166_1: "ES",
              value: "New biography text.",
            },
          ],
        },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    const response = await client.getChanges(31);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("person/31/changes", { params: undefined });
    expect(response).toEqual(mockData);
  });

  test("should fetch person changes with params", async () => {
    const get = mock(() => Promise.resolve({ data: { changes: [] } }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    await client.getChanges(31, { start_date: "2023-01-01", end_date: "2023-01-07", page: 1 });

    expect(get).toHaveBeenCalledWith("person/31/changes", {
      params: { start_date: "2023-01-01", end_date: "2023-01-07", page: 1 },
    });
  });

  test("should fetch combined credits with mock data", async () => {
    const mockData = {
      id: 31,
      cast: [
        {
          adult: false,
          backdrop_path: "/path.jpg",
          genre_ids: [18],
          id: 13,
          original_language: "en",
          original_title: "Forrest Gump",
          overview: "A man with a low IQ.",
          popularity: 62.225,
          poster_path: "/poster.jpg",
          release_date: "1994-06-23",
          title: "Forrest Gump",
          video: false,
          vote_average: 8.5,
          vote_count: 24529,
          character: "Forrest Gump",
          credit_id: "52fe4232c3a36847f800b3b9",
          order: 0,
          media_type: "movie",
        },
      ],
      crew: [],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    const response = await client.getCombinedCredits(31);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("person/31/combined_credits", { params: undefined });
    expect(response).toEqual(mockData);
  });

  test("should fetch external ids with mock data", async () => {
    const mockData = {
      id: 31,
      freebase_mid: "/m/0bxtg",
      freebase_id: "/en/tom_hanks",
      imdb_id: "nm0000158",
      tvrage_id: 14293,
      wikidata_id: "Q2263",
      facebook_id: "TomHanks",
      instagram_id: "tomhanks",
      tiktok_id: "tomhanks",
      twitter_id: "tomhanks",
      youtube_id: null,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    const response = await client.getExternalIds(31);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("person/31/external_ids");
    expect(response).toEqual(mockData);
  });

  test("should fetch person images with mock data", async () => {
    const mockData = {
      id: 287,
      profiles: [
        {
          aspect_ratio: 0.666,
          height: 980,
          iso_639_1: null,
          file_path: "/cckcYc2v0yh1tc9QjRelptcOBko.jpg",
          vote_average: 5.288,
          vote_count: 89,
          width: 653,
        },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    const response = await client.getImages(287);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("person/287/images");
    expect(response).toEqual(mockData);
  });

  test("should fetch latest person with mock data", async () => {
    const mockData = {
      adult: false,
      also_known_as: [],
      biography: "",
      birthday: null,
      deathday: null,
      gender: 0,
      homepage: null,
      id: 4064343,
      imdb_id: null,
      known_for_department: "",
      name: "Ángel Cruz",
      place_of_birth: null,
      popularity: 0.0,
      profile_path: null,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    const response = await client.getLatest();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("person/latest");
    expect(response).toEqual(mockData);
  });

  test("should fetch movie credits with mock data", async () => {
    const mockData = {
      id: 31,
      cast: [
        {
          adult: false,
          backdrop_path: "/path.jpg",
          genre_ids: [18],
          id: 13,
          original_language: "en",
          original_title: "Forrest Gump",
          overview: "A man with a low IQ.",
          popularity: 62.225,
          poster_path: "/poster.jpg",
          release_date: "1994-06-23",
          title: "Forrest Gump",
          video: false,
          vote_average: 8.5,
          vote_count: 24529,
          character: "Forrest Gump",
          credit_id: "52fe4232c3a36847f800b3b9",
          order: 0,
        },
      ],
      crew: [],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    const response = await client.getMovieCredits(31);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("person/31/movie_credits", { params: undefined });
    expect(response).toEqual(mockData);
  });

  test("should fetch tv credits with mock data", async () => {
    const mockData = {
      id: 31,
      cast: [
        {
          adult: false,
          backdrop_path: "/path.jpg",
          genre_ids: [18],
          id: 123,
          origin_country: ["US"],
          original_language: "en",
          original_name: "Band of Brothers",
          overview: "A WWII miniseries.",
          popularity: 30.0,
          poster_path: "/poster.jpg",
          first_air_date: "2001-09-09",
          name: "Band of Brothers",
          vote_average: 8.5,
          vote_count: 3000,
          character: "Captain Herbert Sobel",
          credit_id: "52542282760ee3776a0000e1",
          episode_count: 1,
        },
      ],
      crew: [],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    const response = await client.getTvCredits(31);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("person/31/tv_credits", { params: undefined });
    expect(response).toEqual(mockData);
  });

  test("should fetch tagged images with mock data", async () => {
    const mockData = {
      id: 31,
      page: 1,
      results: [
        {
          aspect_ratio: 0.666,
          file_path: "/1wY4psJ5NVEhCuOYROwLH2XExM2.jpg",
          height: 1500,
          id: "5b235d740e0a265b5d0031d9",
          iso_639_1: "en",
          vote_average: 5.456,
          vote_count: 7,
          width: 1000,
          image_type: "poster",
          media: {
            adult: false,
            backdrop_path: "/bdD39MpSVhKjxarTxLSfX6baoMP.jpg",
            id: 857,
            title: "Saving Private Ryan",
            original_language: "en",
            original_title: "Saving Private Ryan",
            overview: "As U.S. troops storm the beaches of Normandy.",
            poster_path: "/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg",
            media_type: "movie",
            genre_ids: [18, 36, 10752],
            popularity: 70.45,
            release_date: "1998-07-24",
            video: false,
            vote_average: 8.208,
            vote_count: 14134,
          },
          media_type: "movie",
        },
      ],
      total_pages: 1,
      total_results: 13,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    const response = await client.getTaggedImages(31);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("person/31/tagged_images", { params: undefined });
    expect(response).toEqual(mockData);
  });

  test("should fetch person translations with mock data", async () => {
    const mockData = {
      id: 31,
      translations: [
        {
          iso_3166_1: "US",
          iso_639_1: "en",
          name: "English",
          english_name: "English",
          data: {
            biography: "Thomas Jeffrey Hanks is an American actor.",
            name: "Tom Hanks",
          },
        },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new PersonClient({ get } as unknown as AxiosInstance);

    const response = await client.getTranslations(31);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("person/31/translations");
    expect(response).toEqual(mockData);
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch person details from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.person.getDetails(31);
      expect(response).toBeDefined();
      expect(response.id).toBe(31);
      expect(response.name).toBeTypeOf("string");
      expect(response.biography).toBeTypeOf("string");
    });

    test("should fetch person changes from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.person.getChanges(31);
      expect(response).toBeDefined();
      expect(response.changes).toBeDefined();
      expect(Array.isArray(response.changes)).toBe(true);
    });

    test("should fetch combined credits from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.person.getCombinedCredits(31);
      expect(response).toBeDefined();
      expect(response.id).toBe(31);
      expect(response.cast).toBeDefined();
      expect(Array.isArray(response.cast)).toBe(true);
    });

    test("should fetch external ids from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.person.getExternalIds(31);
      expect(response).toBeDefined();
      expect(response.id).toBe(31);
      expect(response.imdb_id).toBeTypeOf("string");
    });

    test("should fetch person images from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.person.getImages(31);
      expect(response).toBeDefined();
      expect(response.id).toBe(31);
      expect(response.profiles).toBeDefined();
      expect(Array.isArray(response.profiles)).toBe(true);
    });

    test("should fetch latest person from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.person.getLatest();
      expect(response).toBeDefined();
      expect(response.id).toBeTypeOf("number");
      expect(response.name).toBeTypeOf("string");
    });

    test("should fetch movie credits from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.person.getMovieCredits(31);
      expect(response).toBeDefined();
      expect(response.id).toBe(31);
      expect(response.cast).toBeDefined();
      expect(Array.isArray(response.cast)).toBe(true);
    });

    test("should fetch tv credits from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.person.getTvCredits(31);
      expect(response).toBeDefined();
      expect(response.id).toBe(31);
      expect(response.cast).toBeDefined();
      expect(Array.isArray(response.cast)).toBe(true);
    });

    test("should fetch tagged images from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.person.getTaggedImages(31);
      expect(response).toBeDefined();
      expect(response.id).toBe(31);
      expect(response.results).toBeDefined();
      expect(Array.isArray(response.results)).toBe(true);
    });

    test("should fetch person translations from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.person.getTranslations(31);
      expect(response).toBeDefined();
      expect(response.id).toBe(31);
      expect(response.translations).toBeDefined();
      expect(Array.isArray(response.translations)).toBe(true);
    });
  } else {
    test.skip("live person tests (requires TMDB_TOKEN in env)", () => {});
  }
});
