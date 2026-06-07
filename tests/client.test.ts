import { describe, expect, mock, test } from "bun:test";
import { TMDBClient } from "../src/index.js";
import { type HttpClient } from "../src/http/types.js";

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

  test("should expose http client publicly", () => {
    const client = new TMDBClient({ accessToken: "fake-token" });
    expect(client.http).toBeDefined();
    expect(typeof client.http.get).toBe("function");
    expect(typeof client.http.post).toBe("function");
    expect(typeof client.http.put).toBe("function");
    expect(typeof client.http.delete).toBe("function");
  });

  test("should accept a custom http client", () => {
    const mockHttp = {
      get: mock(() => Promise.resolve({ data: {}, status: 200, statusText: "OK", headers: {} })),
      post: mock(() => Promise.resolve({ data: {}, status: 200, statusText: "OK", headers: {} })),
      put: mock(() => Promise.resolve({ data: {}, status: 200, statusText: "OK", headers: {} })),
      delete: mock(() => Promise.resolve({ data: {}, status: 200, statusText: "OK", headers: {} })),
    } as unknown as HttpClient;
    const client = new TMDBClient({ httpClient: mockHttp });
    expect(client.http).toBe(mockHttp);
  });

  test("should skip credential check when custom http client is provided", () => {
    expect(() => new TMDBClient({ httpClient: {} as unknown as HttpClient })).not.toThrow();
  });

  test("should pass httpClient to sub-clients", () => {
    const client = new TMDBClient({ accessToken: "fake" });
    expect(client.movie).toBeDefined();
    expect(client.tv).toBeDefined();
    expect(client.account).toBeDefined();
  });

  test("should append defaultLanguage to API requests", async () => {
    const originalFetch = global.fetch;
    const mockFetch = mock((url: string | URL | Request) =>
      Promise.resolve(new Response(JSON.stringify({}), { status: 200, statusText: "OK" })),
    );
    global.fetch = mockFetch as unknown as typeof global.fetch;

    try {
      const client = new TMDBClient({ accessToken: "fake-token", defaultLanguage: "pt-BR" });
      await client.http.get("/movie/550");

      expect(mockFetch.mock.calls[0]).toBeDefined();
      const callUrl = mockFetch.mock.calls[0]![0] as string;
      expect(callUrl).toContain("language=pt-BR");
    } finally {
      global.fetch = originalFetch;
    }
  });

  test("should allow explicit language to override defaultLanguage", async () => {
    const originalFetch = global.fetch;
    const mockFetch = mock((url: string | URL | Request) =>
      Promise.resolve(new Response(JSON.stringify({}), { status: 200, statusText: "OK" })),
    );
    global.fetch = mockFetch as unknown as typeof global.fetch;

    try {
      const client = new TMDBClient({ accessToken: "fake-token", defaultLanguage: "pt-BR" });
      await client.http.get("/movie/550", { params: { language: "es-ES" } });

      expect(mockFetch.mock.calls[0]).toBeDefined();
      const callUrl = mockFetch.mock.calls[0]![0] as string;
      expect(callUrl).toContain("language=es-ES");
      expect(callUrl).not.toContain("language=pt-BR");
    } finally {
      global.fetch = originalFetch;
    }
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
