export interface CreateSvelteKitHandlerOptions {
  token: string;
}

/**
 * Creates a SvelteKit request handler that proxies requests to the TMDB API.
 *
 * SvelteKit route usage:
 * ```ts
 * // src/routes/api/tmdb/[...path]/+server.ts
 * import { createSvelteKitHandler } from "@carlosnc/tmdb-sdk/sveltekit";
 * import { TMDB_TOKEN } from "$env/static/private";
 *
 * const tmdb = createSvelteKitHandler({ token: TMDB_TOKEN });
 *
 * export const GET  = tmdb;
 * export const POST = tmdb;
 * // ...
 * ```
 *
 * @param options.token - TMDB API read access token (v4 Bearer token).
 * @returns A SvelteKit-compatible request handler.
 */
export function createSvelteKitHandler(options: CreateSvelteKitHandlerOptions) {
  const { token } = options;

  return async (event: {
    request: Request;
    params: Record<string, string | undefined>;
    url: URL;
    setHeaders: (headers: Record<string, string>) => void;
  }): Promise<Response> => {
    const { request, params, url, setHeaders } = event;
    const path = params.path;

    if (!path) {
      return new Response(JSON.stringify({ error: "Missing path parameter — use a catch-all route like `[...path]`" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const targetUrl = new URL(`https://api.themoviedb.org/3/${path}`);

    // Forward all incoming query parameters
    for (const [key, value] of url.searchParams) {
      targetUrl.searchParams.set(key, value);
    }

    // Build outgoing headers
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${token}`);

    const contentType = request.headers.get("Content-Type");
    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    const method = request.method;

    const fetchInit: RequestInit = { method, headers };

    if (method !== "GET" && method !== "HEAD") {
      fetchInit.body = await request.text();
    }

    const tmdbResponse = await fetch(targetUrl.toString(), fetchInit);

    // For GET requests, surface TMDB's cache-control to SvelteKit
    if (method === "GET") {
      const cacheControl = tmdbResponse.headers.get("cache-control") ?? "public, max-age=3600";
      setHeaders({ "cache-control": cacheControl });
    }

    const data = await tmdbResponse.json();

    return new Response(JSON.stringify(data), {
      status: tmdbResponse.status,
      headers: { "Content-Type": "application/json" },
    });
  };
}
