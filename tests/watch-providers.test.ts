import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { WatchProvidersClient } from "../src/client/watch-providers/index.js";

describe("TMDBClient - WatchProviders Namespace", () => {
  test("should fetch available regions with mock data", async () => {
    const mockData = {
      results: [
        { iso_3166_1: "US", english_name: "United States", native_name: "United States" },
        { iso_3166_1: "GB", english_name: "United Kingdom", native_name: "United Kingdom" },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new WatchProvidersClient({ get } as unknown as HttpClient);

    const response = await client.getAvailableRegions();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("watch/providers/regions", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass language to available regions endpoint", async () => {
    const get = mock(() => Promise.resolve({ data: { results: [] } }));
    const client = new WatchProvidersClient({ get } as unknown as HttpClient);

    await client.getAvailableRegions({ language: "fr-FR" });

    expect(get).toHaveBeenCalledWith("watch/providers/regions", {
      params: { language: "fr-FR" },
    });
  });

  test("should fetch movie providers with mock data", async () => {
    const mockData = {
      results: [
        { display_priorities: {}, display_priority: 1, logo_path: "/logo.svg", provider_name: "Netflix", provider_id: 8 },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new WatchProvidersClient({ get } as unknown as HttpClient);

    const response = await client.getMovieProviders();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("watch/providers/movie", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass params to movie providers endpoint", async () => {
    const get = mock(() => Promise.resolve({ data: { results: [] } }));
    const client = new WatchProvidersClient({ get } as unknown as HttpClient);

    await client.getMovieProviders({ language: "en-US", watchRegion: "US" });

    expect(get).toHaveBeenCalledWith("watch/providers/movie", {
      params: { language: "en-US", watch_region: "US" },
    });
  });

  test("should fetch TV providers with mock data", async () => {
    const mockData = {
      results: [
        { display_priorities: {}, display_priority: 1, logo_path: "/logo.svg", provider_name: "Hulu", provider_id: 15 },
      ],
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new WatchProvidersClient({ get } as unknown as HttpClient);

    const response = await client.getTvProviders();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("watch/providers/tv", { params: {} });
    expect(response).toEqual(mockData);
  });

  test("should pass params to TV providers endpoint", async () => {
    const get = mock(() => Promise.resolve({ data: { results: [] } }));
    const client = new WatchProvidersClient({ get } as unknown as HttpClient);

    await client.getTvProviders({ language: "en-US", watchRegion: "US" });

    expect(get).toHaveBeenCalledWith("watch/providers/tv", {
      params: { language: "en-US", watch_region: "US" },
    });
  });
});
