export async function* paginateAll<TItem, TParams extends { page?: number }>(
  fetch: (params: TParams) => Promise<{
    page: number;
    results: TItem[];
    total_pages: number;
    total_results: number;
  }>,
  initialParams: TParams,
): AsyncGenerator<TItem, void, undefined> {
  let page = initialParams.page ?? 1;
  let totalPages: number | null = null;

  while (totalPages === null || page <= totalPages) {
    const response = await fetch({ ...initialParams, page } as TParams);
    if (totalPages === null) {
      totalPages = response.total_pages;
    }
    yield* response.results;
    page++;
  }
}
