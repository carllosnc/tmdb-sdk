import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { ListV4Client } from "../src/client/list-v4/index.js";

describe("TMDBClient - ListV4 Namespace", () => {
  const mockListDetails = {
    id: 123,
    name: "My List",
    description: "A test list",
    public: true,
    revenue: "",
    runtime: "",
    sort_by: 0,
    iso_639_1: "en",
    iso_3166_1: "US",
    average_vote: 0,
    vote_count: 0,
    backdrop_path: null,
    poster_path: null,
    results: [],
    page: 1,
    total_pages: 1,
    total_results: 0,
  };

  const mockActionResponse = {
    status_code: 1,
    status_message: "Success.",
    results: [{ media_type: "movie" as const, media_id: 42, success: true }],
  };

  test("should get list details", async () => {
    const get = mock(() => Promise.resolve({ data: mockListDetails }));
    const client = new ListV4Client({ get } as unknown as HttpClient);

    const response = await client.getDetails(123);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("/4/list/123", { params: {} });
    expect(response).toEqual(mockListDetails);
  });

  test("should pass params to list details", async () => {
    const get = mock(() => Promise.resolve({ data: mockListDetails }));
    const client = new ListV4Client({ get } as unknown as HttpClient);

    await client.getDetails(123, { language: "en-US", page: 2 });

    expect(get).toHaveBeenCalledWith("/4/list/123", {
      params: { language: "en-US", page: 2 },
    });
  });

  test("should create a list", async () => {
    const mockResponse = { id: 456, status_code: 1, status_message: "Created.", success: true };
    const post = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new ListV4Client({ post } as unknown as HttpClient);

    const response = await client.create({
      name: "My List",
      iso_639_1: "en",
      description: "A cool list",
      public: true,
    });

    expect(post).toHaveBeenCalledWith("/4/list", {
      name: "My List",
      iso_639_1: "en",
      description: "A cool list",
      public: true,
    });
    expect(response).toEqual(mockResponse);
  });

  test("should update a list", async () => {
    const mockResponse = { id: 456, status_code: 1, status_message: "Updated.", success: true };
    const put = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new ListV4Client({ put } as unknown as HttpClient);

    const response = await client.update(456, { name: "Renamed List", public: false });

    expect(put).toHaveBeenCalledWith("/4/list/456", {
      name: "Renamed List",
      public: false,
    });
    expect(response).toEqual(mockResponse);
  });

  test("should delete a list", async () => {
    const mockResponse = { status_code: 1, status_message: "Deleted." };
    const del = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new ListV4Client({ delete: del } as unknown as HttpClient);

    const response = await client.delete(456);

    expect(del).toHaveBeenCalledWith("/4/list/456");
    expect(response).toEqual(mockResponse);
  });

  test("should add items to a list", async () => {
    const post = mock(() => Promise.resolve({ data: mockActionResponse }));
    const client = new ListV4Client({ post } as unknown as HttpClient);

    const response = await client.addItems(123, {
      items: [{ media_type: "movie", media_id: 42 }],
    });

    expect(post).toHaveBeenCalledWith("/4/list/123/items", {
      items: [{ media_type: "movie", media_id: 42 }],
    });
    expect(response).toEqual(mockActionResponse);
  });

  test("should update items on a list", async () => {
    const put = mock(() => Promise.resolve({ data: mockActionResponse }));
    const client = new ListV4Client({ put } as unknown as HttpClient);

    const response = await client.updateItems(123, {
      items: [{ media_type: "movie", media_id: 42, comment: "Great movie" }],
    });

    expect(put).toHaveBeenCalledWith("/4/list/123/items", {
      items: [{ media_type: "movie", media_id: 42, comment: "Great movie" }],
    });
    expect(response).toEqual(mockActionResponse);
  });

  test("should remove items from a list", async () => {
    const del = mock(() => Promise.resolve({ data: mockActionResponse }));
    const client = new ListV4Client({ delete: del } as unknown as HttpClient);

    const response = await client.removeItems(123, {
      items: [{ media_type: "tv", media_id: 99 }],
    });

    expect(del).toHaveBeenCalledWith("/4/list/123/items", {
      data: { items: [{ media_type: "tv", media_id: 99 }] },
    });
    expect(response).toEqual(mockActionResponse);
  });

  test("should clear a list", async () => {
    const mockResponse = { status_code: 1, status_message: "Cleared." };
    const get = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new ListV4Client({ get } as unknown as HttpClient);

    const response = await client.clear(123);

    expect(get).toHaveBeenCalledWith("/4/list/123/clear");
    expect(response).toEqual(mockResponse);
  });

  test("should check item status", async () => {
    const mockResponse = { id: 123, item_present: true, status_code: 1, status_message: "Found." };
    const get = mock(() => Promise.resolve({ data: mockResponse }));
    const client = new ListV4Client({ get } as unknown as HttpClient);

    const response = await client.getItemStatus(123, { media_id: 42, media_type: "movie" });

    expect(get).toHaveBeenCalledWith("/4/list/123/item_status", {
      params: { media_id: 42, media_type: "movie" },
    });
    expect(response).toEqual(mockResponse);
  });
});
