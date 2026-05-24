import { type AxiosInstance } from "axios";
import {
  type DiscoverMovieResponse,
  type DiscoverMoviesParams,
  type DiscoverTvParams,
  type DiscoverTvResponse,
} from "../../types/discover.js";
import { buildQueryParams } from "../../utils/query.js";

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
