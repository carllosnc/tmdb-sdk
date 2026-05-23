import { type AxiosInstance } from "axios";
import {
  type MovieListResponse,
  type NowPlayingParams,
  type PopularParams,
  type TopRatedParams,
  type UpcomingParams,
} from "../../types/movie.ts";

export class MovieClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get a list of movies that are currently in theatres.
   * @see https://developer.themoviedb.org/reference/movie-now-playing-list
   */
  async getNowPlaying(params?: NowPlayingParams): Promise<MovieListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.region) queryParams["region"] = params.region;

    const response = await this.axiosInstance.get("movie/now_playing", { params: queryParams });
    return response.data;
  }

  /**
   * Get a list of movies ordered by popularity.
   * @see https://developer.themoviedb.org/reference/movie-popular-list
   */
  async getPopular(params?: PopularParams): Promise<MovieListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.region) queryParams["region"] = params.region;

    const response = await this.axiosInstance.get("movie/popular", { params: queryParams });
    return response.data;
  }

  /**
   * Get a list of movies ordered by rating.
   * @see https://developer.themoviedb.org/reference/movie-top-rated-list
   */
  async getTopRated(params?: TopRatedParams): Promise<MovieListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.region) queryParams["region"] = params.region;

    const response = await this.axiosInstance.get("movie/top_rated", { params: queryParams });
    return response.data;
  }

  /**
   * Get a list of movies that are being released soon.
   * @see https://developer.themoviedb.org/reference/movie-upcoming-list
   */
  async getUpcoming(params?: UpcomingParams): Promise<MovieListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.region) queryParams["region"] = params.region;

    const response = await this.axiosInstance.get("movie/upcoming", { params: queryParams });
    return response.data;
  }
}
