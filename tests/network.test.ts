import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { NetworkClient } from "../src/client/network/index.js";
import { TMDBClient } from "../src/index.js";

describe("TMDBClient - Network Namespace", () => {
  test("should fetch network details with mock data", async () => {
    const mockData = {
      headquarters: "New York City, New York",
      homepage: "https://www.hbo.com",
      id: 49,
      logo_path: "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
      name: "HBO",
      origin_country: "US",
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new NetworkClient({ get } as unknown as HttpClient);

    const response = await client.getDetails(49);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("network/49");
    expect(response).toEqual(mockData);
  });

  test("should fetch network alternative names with mock data", async () => {
    const mockData = {
      id: 49,
      results: [
        { name: "Home Box Office", type: "" },
        { name: "HBO HD", type: "" },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new NetworkClient({ get } as unknown as HttpClient);

    const response = await client.getAlternativeNames(49);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("network/49/alternative_names");
    expect(response).toEqual(mockData);
  });

  test("should fetch network images with mock data", async () => {
    const mockData = {
      id: 49,
      logos: [
        {
          aspect_ratio: 2.425287356321839,
          file_path: "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
          height: 174,
          id: "5a7a67a40e0a26020a000091",
          file_type: ".svg",
          vote_average: 5.318,
          vote_count: 3,
          width: 422,
        },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new NetworkClient({ get } as unknown as HttpClient);

    const response = await client.getImages(49);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("network/49/images");
    expect(response).toEqual(mockData);
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch network details from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.network.getDetails(49);
      expect(response).toBeDefined();
      expect(response.id).toBe(49);
      expect(response.name).toBeTypeOf("string");
      expect(response.headquarters).toBeTypeOf("string");
    });

    test("should fetch network alternative names from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.network.getAlternativeNames(49);
      expect(response).toBeDefined();
      expect(response.id).toBe(49);
      expect(response.results).toBeDefined();
      expect(Array.isArray(response.results)).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
    });

    test("should fetch network images from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.network.getImages(49);
      expect(response).toBeDefined();
      expect(response.id).toBe(49);
      expect(response.logos).toBeDefined();
      expect(Array.isArray(response.logos)).toBe(true);
    });
  } else {
    test.skip("live network tests (requires TMDB_TOKEN in env)", () => {});
  }
});
