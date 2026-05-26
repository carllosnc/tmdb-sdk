export interface TMDBErrorBody {
  success?: boolean;
  status_code: number;
  status_message: string;
}

export class TMDBError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public tmdbStatusCode: number | null,
    public tmdbStatusMessage: string | null,
    public url: string | null,
  ) {
    super(message);
    this.name = "TMDBError";
  }

  get status(): number {
    return this.statusCode;
  }
}

export class TMDBClientError extends TMDBError {
  constructor(
    message: string,
    statusCode: number,
    tmdbStatusCode: number | null,
    tmdbStatusMessage: string | null,
    url: string | null,
  ) {
    super(message, statusCode, tmdbStatusCode, tmdbStatusMessage, url);
    this.name = "TMDBClientError";
  }
}

export class TMDBUnauthorizedError extends TMDBClientError {
  constructor(
    message: string,
    tmdbStatusCode: number | null,
    tmdbStatusMessage: string | null,
    url: string | null,
  ) {
    super(message, 401, tmdbStatusCode, tmdbStatusMessage, url);
    this.name = "TMDBUnauthorizedError";
  }
}

export class TMDBForbiddenError extends TMDBClientError {
  constructor(
    message: string,
    tmdbStatusCode: number | null,
    tmdbStatusMessage: string | null,
    url: string | null,
  ) {
    super(message, 403, tmdbStatusCode, tmdbStatusMessage, url);
    this.name = "TMDBForbiddenError";
  }
}

export class TMDBNotFoundError extends TMDBClientError {
  constructor(
    message: string,
    tmdbStatusCode: number | null,
    tmdbStatusMessage: string | null,
    url: string | null,
  ) {
    super(message, 404, tmdbStatusCode, tmdbStatusMessage, url);
    this.name = "TMDBNotFoundError";
  }
}

export class TMDBValidationError extends TMDBClientError {
  constructor(
    message: string,
    statusCode: number,
    tmdbStatusCode: number | null,
    tmdbStatusMessage: string | null,
    url: string | null,
  ) {
    super(message, statusCode, tmdbStatusCode, tmdbStatusMessage, url);
    this.name = "TMDBValidationError";
  }
}

export class TMDBRateLimitError extends TMDBClientError {
  constructor(
    message: string,
    tmdbStatusCode: number | null,
    tmdbStatusMessage: string | null,
    url: string | null,
  ) {
    super(message, 429, tmdbStatusCode, tmdbStatusMessage, url);
    this.name = "TMDBRateLimitError";
  }
}

export class TMDBServerError extends TMDBError {
  constructor(
    message: string,
    statusCode: number,
    tmdbStatusCode: number | null,
    tmdbStatusMessage: string | null,
    url: string | null,
  ) {
    super(message, statusCode, tmdbStatusCode, tmdbStatusMessage, url);
    this.name = "TMDBServerError";
  }
}

export interface TMDBErrorInfo {
  status: number;
  body: TMDBErrorBody | null;
  url: string | null;
  message: string;
}

export function parseTMDBErrorBody(data: unknown): TMDBErrorBody | null {
  if (
    data &&
    typeof data === "object" &&
    "status_code" in data &&
    "status_message" in data
  ) {
    return data as TMDBErrorBody;
  }
  return null;
}

export function createTMDBError(info: TMDBErrorInfo): TMDBError {
  const { status, body, url, message } = info;
  const tmdbStatusCode = body?.status_code ?? null;
  const tmdbStatusMessage = body?.status_message ?? null;

  const errorMessage = tmdbStatusMessage
    ? `TMDB API error (${status}): ${tmdbStatusMessage}`
    : message;

  switch (status) {
    case 400:
    case 422:
      return new TMDBValidationError(errorMessage, status, tmdbStatusCode, tmdbStatusMessage, url);
    case 401:
      return new TMDBUnauthorizedError(errorMessage, tmdbStatusCode, tmdbStatusMessage, url);
    case 403:
      return new TMDBForbiddenError(errorMessage, tmdbStatusCode, tmdbStatusMessage, url);
    case 404:
      return new TMDBNotFoundError(errorMessage, tmdbStatusCode, tmdbStatusMessage, url);
    case 429:
      return new TMDBRateLimitError(errorMessage, tmdbStatusCode, tmdbStatusMessage, url);
    default:
      if (status >= 400 && status < 500) {
        return new TMDBClientError(errorMessage, status, tmdbStatusCode, tmdbStatusMessage, url);
      }
      if (status >= 500) {
        return new TMDBServerError(errorMessage, status, tmdbStatusCode, tmdbStatusMessage, url);
      }
      return new TMDBError(errorMessage, status, tmdbStatusCode, tmdbStatusMessage, url);
  }
}


