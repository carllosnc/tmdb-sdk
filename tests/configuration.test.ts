import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { ConfigurationClient } from "../src/client/configuration/index.js";
import { TMDBClient } from "../src/index.js";

describe("TMDBClient - Configuration Namespace", () => {
  test("should fetch configuration details with mock data", async () => {
    const mockData = {
      images: {
        base_url: "http://image.tmdb.org/t/p/",
        secure_base_url: "https://image.tmdb.org/t/p/",
        backdrop_sizes: ["w300", "w780", "w1280", "original"],
        logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
        poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
        profile_sizes: ["w45", "w185", "h632", "original"],
        still_sizes: ["w92", "w185", "w300", "original"],
      },
      change_keys: ["adult", "air_date", "also_known_as"],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ConfigurationClient({ get } as unknown as HttpClient);

    const response = await client.getDetails();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("configuration");
    expect(response).toEqual(mockData);
  });

  test("should fetch countries with mock data", async () => {
    const mockData = [
      { iso_3166_1: "US", english_name: "United States of America", native_name: "United States" },
      { iso_3166_1: "GB", english_name: "United Kingdom", native_name: "United Kingdom" },
    ];

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ConfigurationClient({ get } as unknown as HttpClient);

    const response = await client.getCountries();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("configuration/countries", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass language to countries endpoint", async () => {
    const mockData: Array<Record<string, string>> = [];

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ConfigurationClient({ get } as unknown as HttpClient);

    await client.getCountries({ language: "fr-FR" });

    expect(get).toHaveBeenCalledWith("configuration/countries", {
      params: { language: "fr-FR" },
    });
  });

  test("should fetch jobs with mock data", async () => {
    const mockData = [
      { department: "Production", jobs: ["Producer", "Executive Producer"] },
      { department: "Directing", jobs: ["Director", "Assistant Director"] },
    ];

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ConfigurationClient({ get } as unknown as HttpClient);

    const response = await client.getJobs();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("configuration/jobs");
    expect(response).toEqual(mockData);
  });

  test("should fetch languages with mock data", async () => {
    const mockData = [
      { iso_639_1: "en", english_name: "English", name: "English" },
      { iso_639_1: "fr", english_name: "French", name: "Français" },
    ];

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ConfigurationClient({ get } as unknown as HttpClient);

    const response = await client.getLanguages();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("configuration/languages");
    expect(response).toEqual(mockData);
  });

  test("should fetch primary translations with mock data", async () => {
    const mockData = ["en-US", "fr-FR", "de-DE"];

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ConfigurationClient({ get } as unknown as HttpClient);

    const response = await client.getPrimaryTranslations();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("configuration/primary_translations");
    expect(response).toEqual(mockData);
  });

  test("should fetch timezones with mock data", async () => {
    const mockData = [
      { iso_3166_1: "US", zones: ["America/New_York", "America/Chicago"] },
      { iso_3166_1: "GB", zones: ["Europe/London"] },
    ];

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new ConfigurationClient({ get } as unknown as HttpClient);

    const response = await client.getTimezones();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("configuration/timezones");
    expect(response).toEqual(mockData);
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch configuration details from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.configuration.getDetails();
      expect(response).toBeDefined();
      expect(response.images).toBeDefined();
      expect(response.images.base_url).toBeTypeOf("string");
      expect(response.images.secure_base_url).toBeTypeOf("string");
      expect(response.images.backdrop_sizes).toBeDefined();
      expect(Array.isArray(response.images.backdrop_sizes)).toBe(true);
      expect(response.change_keys).toBeDefined();
      expect(Array.isArray(response.change_keys)).toBe(true);
    });

    test("should fetch countries from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.configuration.getCountries();
      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
      expect(response.length).toBeGreaterThan(0);
      const us = response.find(c => c.iso_3166_1 === "US");
      expect(us).toBeDefined();
      expect(us!.english_name).toBeTypeOf("string");
    });

    test("should fetch countries with language param from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.configuration.getCountries({ language: "fr-FR" });
      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
      expect(response.length).toBeGreaterThan(0);
      const fr = response.find(c => c.iso_3166_1 === "FR");
      expect(fr).toBeDefined();
      expect(fr!.native_name).toBe("France");
    });

    test("should fetch jobs from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.configuration.getJobs();
      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
      expect(response.length).toBeGreaterThan(0);
      expect(response[0]!.department).toBeTypeOf("string");
      expect(response[0]!.jobs).toBeDefined();
      expect(Array.isArray(response[0]!.jobs)).toBe(true);
    });

    test("should fetch languages from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.configuration.getLanguages();
      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
      expect(response.length).toBeGreaterThan(0);
      const en = response.find(l => l.iso_639_1 === "en");
      expect(en).toBeDefined();
      expect(en!.english_name).toBe("English");
    });

    test("should fetch primary translations from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.configuration.getPrimaryTranslations();
      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
      expect(response.length).toBeGreaterThan(0);
      expect(response).toContain("en-US");
    });

    test("should fetch timezones from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.configuration.getTimezones();
      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
      expect(response.length).toBeGreaterThan(0);
      const us = response.find(t => t.iso_3166_1 === "US");
      expect(us).toBeDefined();
      expect(us!.zones).toContain("America/New_York");
    });
  } else {
    test.skip("live configuration tests (requires TMDB_TOKEN in env)", () => {});
  }
});
