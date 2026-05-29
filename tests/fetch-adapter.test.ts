import { describe, expect, test } from "bun:test";
import { FetchAdapter } from "../src/http/fetch-adapter.js";
import { TMDBError } from "../src/errors.js";

describe("FetchAdapter - Security", () => {
  test("should redact api_key from URL in error objects", async () => {
    // We intentionally use an invalid API key to trigger an error
    const adapter = new FetchAdapter({
      baseURL: "https://api.themoviedb.org/3/",
      params: { api_key: "super_secret_key" },
    });

    try {
      await adapter.get("/configuration");
      // Should not reach here because of invalid API key
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(TMDBError);
      const tmdbError = error as TMDBError;
      
      // Verify that the URL is present in the error
      expect(tmdbError.url).toBeTruthy();
      
      // Verify that the API key value is redacted
      expect(tmdbError.url).not.toContain("super_secret_key");
      expect(tmdbError.url).toContain("api_key=***");
    }
  });

  test("should redact session_id and guest_session_id from URL in error objects", async () => {
    const adapter = new FetchAdapter({
      baseURL: "https://api.themoviedb.org/3/",
      params: { 
        api_key: "secret_key",
        session_id: "secret_session",
        guest_session_id: "secret_guest_session"
      },
    });

    try {
      await adapter.get("/account");
      expect(true).toBe(false);
    } catch (error) {
      const tmdbError = error as TMDBError;
      expect(tmdbError.url).not.toContain("secret_key");
      expect(tmdbError.url).not.toContain("secret_session");
      expect(tmdbError.url).not.toContain("secret_guest_session");
      
      expect(tmdbError.url).toContain("api_key=***");
      expect(tmdbError.url).toContain("session_id=***");
      expect(tmdbError.url).toContain("guest_session_id=***");
    }
  });
});
