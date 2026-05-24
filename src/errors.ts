import { AxiosError } from "axios";

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

function parseTMDBErrorBody(error: AxiosError): TMDBErrorBody | null {
  const data = error.response?.data;
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

function createTMDBError(error: AxiosError): TMDBError {
  const status = error.response?.status ?? 0;
  const url = error.config?.url ?? null;
  const body = parseTMDBErrorBody(error);
  const tmdbStatusCode = body?.status_code ?? null;
  const tmdbStatusMessage = body?.status_message ?? null;

  const message = tmdbStatusMessage
    ? `TMDB API error (${status}): ${tmdbStatusMessage}`
    : error.message;

  switch (status) {
    case 400:
    case 422:
      return new TMDBValidationError(message, status, tmdbStatusCode, tmdbStatusMessage, url);
    case 401:
      return new TMDBUnauthorizedError(message, tmdbStatusCode, tmdbStatusMessage, url);
    case 403:
      return new TMDBForbiddenError(message, tmdbStatusCode, tmdbStatusMessage, url);
    case 404:
      return new TMDBNotFoundError(message, tmdbStatusCode, tmdbStatusMessage, url);
    case 429:
      return new TMDBRateLimitError(message, tmdbStatusCode, tmdbStatusMessage, url);
    default:
      if (status >= 400 && status < 500) {
        return new TMDBClientError(message, status, tmdbStatusCode, tmdbStatusMessage, url);
      }
      if (status >= 500) {
        return new TMDBServerError(message, status, tmdbStatusCode, tmdbStatusMessage, url);
      }
      return new TMDBError(message, status, tmdbStatusCode, tmdbStatusMessage, url);
  }
}

export function createErrorInterceptor() {
  return (error: Error): never => {
    if (error instanceof AxiosError && error.response) {
      throw createTMDBError(error);
    }
    throw error;
  };
}
