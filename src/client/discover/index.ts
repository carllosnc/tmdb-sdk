import { type AxiosInstance } from "axios";
import {
  type DiscoverMovieResponse,
  type DiscoverMoviesParams,
  type DiscoverTvParams,
  type DiscoverTvResponse,
} from "../../types/discover.ts";

function toSnakeCase(key: string): string {
  return key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
}

function buildQueryParams(
  params?: Record<string, any>
): Record<string, any> {
  const queryParams: Record<string, any> = {};
  if (!params) return queryParams;

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      queryParams[toSnakeCase(key)] = value;
    }
  }
  return queryParams;
}

export class DiscoverClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Find movies using over 30 filters and sort options.
   * @see https://developer.themoviedb.org/reference/discover-movie
   */
  async getMovies(
    params?: DiscoverMoviesParams
  ): Promise<DiscoverMovieResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get("discover/movie", {
      params: queryParams,
    });
    return response.data;
  }

  /**
   * Find TV shows using over 30 filters and sort options.
   * @see https://developer.themoviedb.org/reference/discover-tv
   */
  async getTvShows(
    params?: DiscoverTvParams
  ): Promise<DiscoverTvResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get("discover/tv", {
      params: queryParams,
    });
    return response.data;
  }
}
