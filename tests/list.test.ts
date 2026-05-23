import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { ListClient } from "../src/client/list/index.js";
import { TMDBClient } from "../src/index.js";

describe("TMDBClient - List Namespace", () => {
  test("should fetch list details with query params", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: {
          created_by: "travisbell",
          description: "A test list",
          favorite_count: 0,
          id: "1",
          items: [],
          item_count: 0,
          iso_639_1: "en",
          name: "Test List",
          poster_path: null,
        },
      })
    );
    const client = new ListClient({ get } as unknown as AxiosInstance);

    const response = await client.getDetails({
      listId: 1,
      language: "en-US",
      page: 1,
    });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("list/1", {
      params: { language: "en-US", page: 1 },
    });
    expect(response.name).toBe("Test List");
    expect(response.id).toBe("1");
  });

  test("should fetch list details with list id only", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: {
          created_by: "travisbell",
          description: "",
          favorite_count: 0,
          id: "1",
          items: [],
          item_count: 0,
          iso_639_1: "en",
          name: "Test List",
          poster_path: null,
        },
      })
    );
    const client = new ListClient({ get } as unknown as AxiosInstance);

    await client.getDetails({ listId: 1 });

    expect(get).toHaveBeenCalledWith("list/1", { params: {} });
  });

  test("should create a list", async () => {
    const post = mock(() =>
      Promise.resolve({
        data: {
          status_message: "The item/record was created successfully.",
          success: true,
          status_code: 1,
          list_id: 5861,
        },
      })
    );
    const client = new ListClient({ post } as unknown as AxiosInstance);

    const response = await client.create(
      { sessionId: "test-session" },
      { name: "My List", description: "A list", language: "en" }
    );

    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith(
      "list",
      { name: "My List", description: "A list", language: "en" },
      { params: { session_id: "test-session" } }
    );
    expect(response.list_id).toBe(5861);
    expect(response.success).toBe(true);
  });

  test("should add a movie to a list", async () => {
    const post = mock(() =>
      Promise.resolve({
        data: {
          status_code: 12,
          status_message: "The item/record was updated successfully.",
        },
      })
    );
    const client = new ListClient({ post } as unknown as AxiosInstance);

    const response = await client.addMovie(
      { listId: 1, sessionId: "test-session" },
      { media_id: 18 }
    );

    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith(
      "list/1/add_item",
      { media_id: 18 },
      { params: { session_id: "test-session" } }
    );
    expect(response.status_code).toBe(12);
  });

  test("should remove a movie from a list", async () => {
    const post = mock(() =>
      Promise.resolve({
        data: {
          status_code: 13,
          status_message: "The item/record was deleted successfully.",
        },
      })
    );
    const client = new ListClient({ post } as unknown as AxiosInstance);

    const response = await client.removeMovie(
      { listId: 1, sessionId: "test-session" },
      { media_id: 18 }
    );

    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith(
      "list/1/remove_item",
      { media_id: 18 },
      { params: { session_id: "test-session" } }
    );
    expect(response.status_code).toBe(13);
  });

  test("should check item status", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: { id: 1, item_present: true },
      })
    );
    const client = new ListClient({ get } as unknown as AxiosInstance);

    const response = await client.checkItemStatus({
      listId: 1,
      movieId: 18,
    });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("list/1/item_status", {
      params: { movie_id: 18 },
    });
    expect(response.item_present).toBe(true);
  });

  test("should clear a list", async () => {
    const post = mock(() =>
      Promise.resolve({
        data: {
          status_code: 12,
          status_message: "The item/record was updated successfully.",
        },
      })
    );
    const client = new ListClient({ post } as unknown as AxiosInstance);

    const response = await client.clear({
      listId: 1,
      sessionId: "test-session",
      confirm: true,
    });

    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith(
      "list/1/clear",
      null,
      {
        params: {
          session_id: "test-session",
          confirm: true,
        },
      }
    );
    expect(response.status_code).toBe(12);
  });

  test("should delete a list", async () => {
    const mockDelete = mock(() =>
      Promise.resolve({
        data: {
          status_code: 12,
          status_message: "The item/record was updated successfully.",
        },
      })
    );
    const client = new ListClient({ delete: mockDelete } as unknown as AxiosInstance);

    const response = await client.delete({
      listId: 1,
      sessionId: "test-session",
    });

    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith("list/1", {
      params: { session_id: "test-session" },
    });
    expect(response.status_code).toBe(12);
  });

  test("should check item status with all optional params", async () => {
    const get = mock(() =>
      Promise.resolve({
        data: { id: 1, item_present: false },
      })
    );
    const client = new ListClient({ get } as unknown as AxiosInstance);

    const response = await client.checkItemStatus({
      listId: 1,
      language: "en-US",
      movieId: 18,
    });

    expect(get).toHaveBeenCalledWith("list/1/item_status", {
      params: { language: "en-US", movie_id: 18 },
    });
    expect(response.item_present).toBe(false);
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch list details from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.list.getDetails({ listId: 1 });
      expect(response).toBeDefined();
      expect(response.id).toBeDefined();
      expect(response.name).toBeTypeOf("string");
      expect(Array.isArray(response.items)).toBe(true);
    });
  } else {
    test.skip("live list tests (requires TMDB_TOKEN in env)", () => {});
  }
});
