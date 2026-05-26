import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { AuthenticationClient } from "../src/client/authentication/index.js";
import { TMDBClient } from "../src/index.js";

describe("TMDBClient - Authentication Namespace", () => {
  test("should validate API key", async () => {
    const validateKeyResponse = {
      success: true,
      status_code: 1,
      status_message: "Success.",
    };
    const get = mock(() => Promise.resolve({ data: validateKeyResponse }));
    const client = new AuthenticationClient({ get } as unknown as HttpClient);

    const response = await client.validateKey();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("authentication");
    expect(response).toEqual(validateKeyResponse);
    expect(response.success).toBe(true);
    expect(response.status_code).toBe(1);
    expect(response.status_message).toBe("Success.");
  });

  test("should create a guest session", async () => {
    const guestSession = {
      success: true,
      guest_session_id: "1ce82ec1223641636ad4a60b07de3581",
      expires_at: "2016-08-27 16:26:40 UTC",
    };
    const get = mock(() => Promise.resolve({ data: guestSession }));
    const client = new AuthenticationClient({ get } as unknown as HttpClient);

    const response = await client.createGuestSession();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("authentication/guest_session/new");
    expect(response).toEqual(guestSession);
    expect(response.success).toBe(true);
    expect(response.guest_session_id).toBeTypeOf("string");
    expect(response.expires_at).toBeTypeOf("string");
  });

  test("should create a request token", async () => {
    const requestToken = {
      success: true,
      expires_at: "2016-08-26 17:04:39 UTC",
      request_token: "ff5c7eeb5a8870efe3cd7fc5c282cffd26800ecd",
    };
    const get = mock(() => Promise.resolve({ data: requestToken }));
    const client = new AuthenticationClient({ get } as unknown as HttpClient);

    const response = await client.createRequestToken();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("authentication/token/new");
    expect(response).toEqual(requestToken);
    expect(response.success).toBe(true);
    expect(response.request_token).toBeTypeOf("string");
    expect(response.expires_at).toBeTypeOf("string");
  });

  test("should create a session", async () => {
    const session = {
      success: true,
      session_id: "79191836ddaa0da3df76a5ffef6f07ad6ab0c641",
    };
    const request = { request_token: "6bc047b88f669d1fb86574f06381005d93d3517a" };
    const post = mock(() => Promise.resolve({ data: session }));
    const client = new AuthenticationClient({
      post,
    } as unknown as HttpClient);

    const response = await client.createSession(request);

    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith("authentication/session/new", request);
    expect(response).toEqual(session);
    expect(response.success).toBe(true);
    expect(response.session_id).toBeTypeOf("string");
  });

  test("should create a session from a v4 access token", async () => {
    const session = {
      success: true,
      session_id: "2629f70fb498edc263a0adb99118ac41f0053e8c",
    };
    const request = {
      access_token:
        "eyK0eXAiOiJAV1QiLCJhbGciOiUIUzI1NiJ9.eyJhdWQiOiI0Ozc2YzA1ZTg4YTY1Yzk0MjFjZDI1NmBiYzRiNGE0NyIsInN1YiI6IjRiYzg4OTJhMDE3YTNjMGY5MjAwMDAwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bn660W0Vi-_AI5HvwIEqtc2s5mAXDknBnTrUREZYH7A",
    };
    const post = mock(() => Promise.resolve({ data: session }));
    const client = new AuthenticationClient({
      post,
    } as unknown as HttpClient);

    const response = await client.createSessionFromV4Token(request);

    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith(
      "authentication/session/convert/4",
      request
    );
    expect(response).toEqual(session);
    expect(response.success).toBe(true);
    expect(response.session_id).toBeTypeOf("string");
  });

  test("should validate a request token with login", async () => {
    const validatedToken = {
      success: true,
      expires_at: "2018-07-24 04:10:26 UTC",
      request_token: "1531f1a558c8357ce8990cf887ff196e8f5402ec",
    };
    const request = {
      username: "johnny_appleseed",
      password: "test123",
      request_token: "1531f1a558c8357ce8990cf887ff196e8f5402ec",
    };
    const post = mock(() => Promise.resolve({ data: validatedToken }));
    const client = new AuthenticationClient({
      post,
    } as unknown as HttpClient);

    const response = await client.validateRequestTokenWithLogin(request);

    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith(
      "authentication/token/validate_with_login",
      request
    );
    expect(response).toEqual(validatedToken);
    expect(response.success).toBe(true);
    expect(response.request_token).toBeTypeOf("string");
    expect(response.expires_at).toBeTypeOf("string");
  });

  test("should delete a session", async () => {
    const result = { success: true };
    const request = { session_id: "2629f70fb498edc263a0adb99118ac41f0053e8c" };
    const del = mock(() => Promise.resolve({ data: result }));
    const client = new AuthenticationClient({
      delete: del,
    } as unknown as HttpClient);

    const response = await client.deleteSession(request);

    expect(del).toHaveBeenCalledTimes(1);
    expect(del).toHaveBeenCalledWith("authentication/session", {
      data: request,
    });
    expect(response).toEqual(result);
    expect(response.success).toBe(true);
  });

  const token = process.env.TMDB_TOKEN;
  const tmdbUsername = process.env.TMDB_USERNAME;
  const tmdbPassword = process.env.TMDB_PASSWORD;
  const validatedRequestToken = process.env.TMDB_VALIDATED_REQUEST_TOKEN;
  const v4AccessToken = process.env.TMDB_V4_ACCESS_TOKEN;
  const sessionId = process.env.TMDB_SESSION_ID;

  if (token) {
    test("should validate API key from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.authentication.validateKey();

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      if (response.status_code !== undefined) {
        expect(response.status_code).toBe(1);
      }
      if (response.status_message !== undefined) {
        expect(response.status_message).toBeTypeOf("string");
      }
    });

    test("should create a guest session from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.authentication.createGuestSession();

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.guest_session_id).toBeTypeOf("string");
      expect(response.guest_session_id.length).toBeGreaterThan(0);
      expect(response.expires_at).toBeTypeOf("string");
    });

    test("should create a request token from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.authentication.createRequestToken();

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.request_token).toBeTypeOf("string");
      expect(response.request_token.length).toBeGreaterThan(0);
      expect(response.expires_at).toBeTypeOf("string");
    });

    if (validatedRequestToken) {
      test("should create a session from live TMDB API", async () => {
        const client = new TMDBClient({ accessToken: token });
        const response = await client.authentication.createSession({
          request_token: validatedRequestToken,
        });

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        expect(response.session_id).toBeTypeOf("string");
        expect(response.session_id.length).toBeGreaterThan(0);
      });
    }

    if (tmdbUsername && tmdbPassword) {
      test("should validate request token with login via live TMDB API", async () => {
        const client = new TMDBClient({ accessToken: token });
        const { request_token } = await client.authentication.createRequestToken();
        const response = await client.authentication.validateRequestTokenWithLogin({
          username: tmdbUsername,
          password: tmdbPassword,
          request_token,
        });

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        expect(response.request_token).toBeTypeOf("string");
        expect(response.request_token.length).toBeGreaterThan(0);
        expect(response.expires_at).toBeTypeOf("string");
      });
    }

    if (sessionId) {
      test("should delete a session via live TMDB API", async () => {
        const client = new TMDBClient({ accessToken: token });
        const response = await client.authentication.deleteSession({
          session_id: sessionId,
        });

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
      });
    }

    if (v4AccessToken) {
      test("should create a session from v4 access token via live TMDB API", async () => {
        const client = new TMDBClient({ accessToken: token });
        const response = await client.authentication.createSessionFromV4Token({
          access_token: v4AccessToken,
        });

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        expect(response.session_id).toBeTypeOf("string");
        expect(response.session_id.length).toBeGreaterThan(0);
      });
    }
  } else {
    test.skip("live authentication tests (requires TMDB_TOKEN in env)", () => {});
  }
});
