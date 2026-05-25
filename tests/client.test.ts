import { describe, expect, mock, test } from "bun:test";
import axios from "axios";
import { TMDBClient } from "../src/index.js";

describe("TMDBClient - Core Client", () => {
  test("should instantiate successfully with token", () => {
    const client = new TMDBClient({ accessToken: "fake-token" });
    expect(client).toBeDefined();
  });

  test("should instantiate successfully with api key", () => {
    const client = new TMDBClient({ apiKey: "fake-key" });
    expect(client).toBeDefined();
  });

  test("should throw error if no credentials provided", () => {
    expect(() => new TMDBClient({})).toThrow();
  });

  test("should expose http publicly", () => {
    const client = new TMDBClient({ accessToken: "fake-token" });
    expect(client.http).toBeDefined();
    expect(client.http.defaults.baseURL).toBe("https://api.themoviedb.org/3/");
  });

  test("should set auth header from token", () => {
    const client = new TMDBClient({ accessToken: "my-token" });
    expect(client.http.defaults.headers["Authorization"]).toBe("Bearer my-token");
  });

  test("should set api_key param from apiKey", () => {
    const client = new TMDBClient({ apiKey: "my-key" });
    expect(client.http.defaults.params?.api_key).toBe("my-key");
  });

  test("should accept a custom axios instance", () => {
    const custom = axios.create({ baseURL: "https://mock.tmdb.dev/3/", timeout: 100 });
    const client = new TMDBClient({ axiosInstance: custom });
    expect(client.http).toBe(custom);
    expect(client.http.defaults.timeout).toBe(100);
    expect(client.http.defaults.baseURL).toBe("https://mock.tmdb.dev/3/");
  });

  test("should skip credential check when custom instance is provided", () => {
    const custom = axios.create();
    expect(() => new TMDBClient({ axiosInstance: custom })).not.toThrow();
  });

  test("should apply error interceptor to custom instance", () => {
    const custom = axios.create();
    new TMDBClient({ axiosInstance: custom });
    expect((custom.interceptors.response as any).handlers.length).toBe(1);
  });

  test("should apply retry interceptor when retry is true", () => {
    const custom = axios.create();
    const client = new TMDBClient({ axiosInstance: custom, retry: true });
    expect(client.http).toBe(custom);
  });

  test("should allow configuring timeout via exposed http", () => {
    const client = new TMDBClient({ accessToken: "fake" });
    client.http.defaults.timeout = 5000;
    expect(client.http.defaults.timeout).toBe(5000);
  });

  test("should add custom interceptor via exposed http", () => {
    const client = new TMDBClient({ accessToken: "fake" });
    const interceptor = mock((config: any) => config);
    client.http.interceptors.request.use(interceptor);
    expect((client.http.interceptors.request as any).handlers.length).toBe(1);
  });

  // Live integration test if environment variables are set
  const token = process.env.TMDB_TOKEN;
  const key = process.env.TMDB_KEY;

  if (token || key) {
    test("should fetch configuration from live TMDB API", async () => {
      const client = token
        ? new TMDBClient({ accessToken: token })
        : new TMDBClient({ apiKey: key });

      const config = await client.configuration.getDetails();
      expect(config).toBeDefined();
      expect(config.images).toBeDefined();
      expect(config.images.base_url).toBeDefined();
      expect(config.images.secure_base_url).toBeDefined();
    });
  } else {
    test.skip("live configuration fetch (requires TMDB_TOKEN or TMDB_KEY in env)", () => {});
  }
});
