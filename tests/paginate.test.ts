import { describe, expect, mock, test } from "bun:test";
import { paginateAll } from "../src/utils/paginate.js";

const makeResponse = (
  page: number,
  totalPages: number,
  prefix: string,
) => ({
  page,
  results: Array.from({ length: 3 }, (_, i) => ({
    id: i + 1 + (page - 1) * 3,
    name: `${prefix} ${i + 1 + (page - 1) * 3}`,
  })),
  total_pages: totalPages,
  total_results: totalPages * 3,
});

describe("paginateAll", () => {
  test("should yield all items from a single page", async () => {
    const fetch = mock(() => Promise.resolve(makeResponse(1, 1, "item")));

    const results: { id: number; name: string }[] = [];
    for await (const item of paginateAll(fetch, { page: 1 })) {
      results.push(item);
    }

    expect(results).toHaveLength(3);
    expect(results[0]!.name).toBe("item 1");
    expect(results[2]!.name).toBe("item 3");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("should yield all items across multiple pages", async () => {
    let callCount = 0;
    const fetch = mock((params: { page?: number }) => {
      callCount++;
      return Promise.resolve(makeResponse(params.page ?? 1, 3, "item"));
    });

    const results: { id: number; name: string }[] = [];
    for await (const item of paginateAll(fetch, {})) {
      results.push(item);
    }

    expect(results).toHaveLength(9);
    expect(results[0]!.name).toBe("item 1");
    expect(results[8]!.name).toBe("item 9");
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  test("should start from the given page number", async () => {
    let callCount = 0;
    const fetch = mock((params: { page?: number }) => {
      callCount++;
      return Promise.resolve(makeResponse(params.page ?? 1, 4, "item"));
    });

    const results: { id: number; name: string }[] = [];
    for await (const item of paginateAll(fetch, { page: 2 })) {
      results.push(item);
    }

    expect(results).toHaveLength(9);
    expect(results[0]!.name).toBe("item 4");
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  test("should yield nothing when no results", async () => {
    const fetch = mock(() =>
      Promise.resolve({
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      }),
    );

    const results: { id: number; name: string }[] = [];
    for await (const item of paginateAll(fetch, {})) {
      results.push(item);
    }

    expect(results).toHaveLength(0);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("should pass extra params to the fetch function", async () => {
    const fetch = mock((params: { query: string; page?: number }) =>
      Promise.resolve(makeResponse(params.page ?? 1, 1, params.query)),
    );

    const results: { id: number; name: string }[] = [];
    for await (const item of paginateAll(fetch, { query: "Matrix", page: 1 })) {
      results.push(item);
    }

    expect(results).toHaveLength(3);
    expect(results[0]!.name).toBe("Matrix 1");
    expect(fetch).toHaveBeenCalledWith({ query: "Matrix", page: 1 });
  });
});
