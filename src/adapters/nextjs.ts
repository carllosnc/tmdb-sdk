export interface CreateNextJsHandlerOptions {
  token: string;
}

export function createNextJsHandler(options: CreateNextJsHandlerOptions) {
  const { token } = options;

  return async (
    request: Request,
    context: {
      params: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>;
    },
  ): Promise<Response> => {
    const params = context.params instanceof Promise ? await context.params : context.params;
    const pathSegments = params.path;

    if (!pathSegments || (Array.isArray(pathSegments) && pathSegments.length === 0)) {
      return new Response(
        JSON.stringify({ error: "Missing path parameter — use a catch-all route like `[...path]`" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const path = Array.isArray(pathSegments) ? pathSegments.join("/") : pathSegments;

    const targetUrl = new URL(`https://api.themoviedb.org/3/${path}`);

    // Forward all incoming query parameters
    const incomingUrl = new URL(request.url);
    for (const [key, value] of incomingUrl.searchParams) {
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

    const data = await tmdbResponse.json();

    const responseHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (method === "GET") {
      responseHeaders["cache-control"] =
        tmdbResponse.headers.get("cache-control") ?? "public, max-age=3600";
    }

    return new Response(JSON.stringify(data), {
      status: tmdbResponse.status,
      headers: responseHeaders,
    });
  };
}
