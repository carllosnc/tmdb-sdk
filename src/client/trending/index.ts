import { type HttpClient } from "../../http/types.js";
import {
  type TrendingAllResponse,
  type TrendingMoviesResponse,
  type TrendingPeopleResponse,
  type TrendingParams,
  type TrendingTvResponse,
} from "../../types/trending.js";

export class TrendingClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get the trending movies, TV shows and people.
   * @see https://developer.themoviedb.org/reference/trending-all
   */
  async getAll(params?: TrendingParams): Promise<TrendingAllResponse> {
    const queryParams: Record<string, any> = {};
    const timeWindow = params?.timeWindow ?? "day";
    if (params?.language) queryParams["language"] = params.language;

    const response = await this.httpClient.get(`trending/all/${timeWindow}`, {
      params: queryParams,
    });
    return response.data;
  }

  /**
   * Get the trending movies on TMDB.
   * @see https://developer.themoviedb.org/reference/trending-movies
   */
  async getMovies(params?: TrendingParams): Promise<TrendingMoviesResponse> {
    const queryParams: Record<string, any> = {};
    const timeWindow = params?.timeWindow ?? "day";
    if (params?.language) queryParams["language"] = params.language;

    const response = await this.httpClient.get(`trending/movie/${timeWindow}`, {
      params: queryParams,
    });
    return response.data;
  }

  /**
   * Get the trending people on TMDB.
   * @see https://developer.themoviedb.org/reference/trending-people
   */
  async getPeople(params?: TrendingParams): Promise<TrendingPeopleResponse> {
    const queryParams: Record<string, any> = {};
    const timeWindow = params?.timeWindow ?? "day";
    if (params?.language) queryParams["language"] = params.language;

    const response = await this.httpClient.get(`trending/person/${timeWindow}`, {
      params: queryParams,
    });
    return response.data;
  }

  /**
   * Get the trending TV shows on TMDB.
   * @see https://developer.themoviedb.org/reference/trending-tv
   */
  async getTvShows(params?: TrendingParams): Promise<TrendingTvResponse> {
    const queryParams: Record<string, any> = {};
    const timeWindow = params?.timeWindow ?? "day";
    if (params?.language) queryParams["language"] = params.language;

    const response = await this.httpClient.get(`trending/tv/${timeWindow}`, {
      params: queryParams,
    });
    return response.data;
  }
}
