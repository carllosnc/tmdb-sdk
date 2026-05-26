import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { CompanyClient } from "../src/client/company/index.js";
import { TMDBClient } from "../src/index.js";

describe("TMDBClient - Company Namespace", () => {
  test("should fetch company details with mock data", async () => {
    const mockData = {
      description: "",
      headquarters: "San Francisco, California",
      homepage: "https://www.lucasfilm.com",
      id: 1,
      logo_path: "/o86DbpburjxrqAzEDhXZcyE8pDb.png",
      name: "Lucasfilm Ltd.",
      origin_country: "US",
      parent_company: null,
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new CompanyClient({ get } as unknown as HttpClient);

    const response = await client.getDetails(1);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("company/1");
    expect(response).toEqual(mockData);
  });

  test("should fetch company alternative names with mock data", async () => {
    const mockData = {
      id: 1,
      results: [
        { name: "루카스필름", type: "" },
        { name: "Lucasfilm", type: "" },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new CompanyClient({ get } as unknown as HttpClient);

    const response = await client.getAlternativeNames(1);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("company/1/alternative_names");
    expect(response).toEqual(mockData);
  });

  test("should fetch company images with mock data", async () => {
    const mockData = {
      id: 1,
      logos: [
        {
          aspect_ratio: 2.97979797979798,
          file_path: "/o86DbpburjxrqAzEDhXZcyE8pDb.png",
          height: 99,
          id: "5aa080d6c3a3683fea00011e",
          file_type: ".svg",
          vote_average: 5.384,
          vote_count: 2,
          width: 295,
        },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new CompanyClient({ get } as unknown as HttpClient);

    const response = await client.getImages(1);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("company/1/images");
    expect(response).toEqual(mockData);
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch company details from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.company.getDetails(1);
      expect(response).toBeDefined();
      expect(response.id).toBe(1);
      expect(response.name).toBeTypeOf("string");
      expect(response.description).toBeTypeOf("string");
      expect(response.logo_path).toBeTypeOf("string");
    });

    test("should fetch company alternative names from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.company.getAlternativeNames(1);
      expect(response).toBeDefined();
      expect(response.id).toBe(1);
      expect(response.results).toBeDefined();
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
    });

    test("should fetch company images from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.company.getImages(1);
      expect(response).toBeDefined();
      expect(response.id).toBe(1);
      expect(response.logos).toBeDefined();
      expect(Array.isArray(response.logos)).toBe(true);
    });
  } else {
    test.skip("live company tests (requires TMDB_TOKEN in env)", () => {});
  }
});
