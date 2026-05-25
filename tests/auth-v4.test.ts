import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { AuthV4Client } from "../src/client/auth-v4/index.js";

describe("TMDBClient - AuthV4 Namespace", () => {
  test("should create request token with no params", async () => {
    const mockResponse = {
      success: true,
      request_token: "abc123",
      status_code: 1,
      status_message: "Success.",
    };
    const post = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new AuthV4Client({ post } as unknown as AxiosInstance);

    const response = await client.createRequestToken();

    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith("/4/auth/request_token", undefined);
    expect(response).toEqual(mockResponse);
  });

  test("should create request token with redirect_to", async () => {
    const mockResponse = {
      success: true,
      request_token: "abc123",
      status_code: 1,
      status_message: "Success.",
    };
    const post = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new AuthV4Client({ post } as unknown as AxiosInstance);

    const response = await client.createRequestToken({ redirect_to: "https://example.com/callback" });

    expect(post).toHaveBeenCalledWith("/4/auth/request_token", {
      redirect_to: "https://example.com/callback",
    });
    expect(response).toEqual(mockResponse);
  });

  test("should create access token", async () => {
    const mockResponse = {
      access_token: "new-access-token",
      account_id: "acct_123",
      status_code: 1,
      status_message: "Success.",
    };
    const post = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new AuthV4Client({ post } as unknown as AxiosInstance);

    const response = await client.createAccessToken({ request_token: "req-token-456" });

    expect(post).toHaveBeenCalledWith("/4/auth/access_token", {
      request_token: "req-token-456",
    });
    expect(response).toEqual(mockResponse);
  });

  test("should logout with access token", async () => {
    const mockResponse = {
      status_code: 1,
      status_message: "Success.",
    };
    const del = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new AuthV4Client({ delete: del } as unknown as AxiosInstance);

    const response = await client.logout({ access_token: "token-to-invalidate" });

    expect(del).toHaveBeenCalledWith("/4/auth/access_token", {
      data: { access_token: "token-to-invalidate" },
    });
    expect(response).toEqual(mockResponse);
  });
});
