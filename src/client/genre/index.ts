import { type AxiosInstance } from "axios";
import {
  type GenreListResponse,
  type GetGenreListParams,
} from "../../types/genre.ts";

export class GenreClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get the list of official genres for movies.
   * @see https://developer.themoviedb.org/reference/genre-movie-list
   */
  async getMovies(params?: GetGenreListParams): Promise<GenreListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;

    const response = await this.axiosInstance.get("genre/movie/list", {
      params: queryParams,
    });
    return response.data;
  }

  /**
   * Get the list of official genres for TV shows.
   * @see https://developer.themoviedb.org/reference/genre-tv-list
   */
  async getTvShows(params?: GetGenreListParams): Promise<GenreListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;

    const response = await this.axiosInstance.get("genre/tv/list", {
      params: queryParams,
    });
    return response.data;
  }
}
