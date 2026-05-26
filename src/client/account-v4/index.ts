import { type HttpClient } from "../../http/types.js";
import {
  type V4AccountFavoriteMoviesResponse,
  type V4AccountFavoriteTvShowsResponse,
  type V4AccountListsParams,
  type V4AccountListsResponse,
  type V4AccountMediaParams,
  type V4AccountRatedMoviesResponse,
  type V4AccountRatedTvShowsResponse,
  type V4AccountWatchlistMoviesResponse,
  type V4AccountWatchlistTvShowsResponse,
} from "../../types/account-v4.js";
import { buildQueryParams } from "../../utils/query.js";

export class AccountV4Client {
  constructor(private httpClient: HttpClient) {}

  private basePath(accountObjectId: string): string {
    return `/4/account/${accountObjectId}`;
  }

  /**
   * Get the custom lists that a user has created.
   * @see https://developer.themoviedb.org/v4/reference/account-lists
   */
  async getLists(
    accountObjectId: string,
    params?: V4AccountListsParams
  ): Promise<V4AccountListsResponse> {
    const response = await this.httpClient.get(
      `${this.basePath(accountObjectId)}/lists`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get a user's list of favourite movies.
   * @see https://developer.themoviedb.org/v4/reference/account-favorite-movies
   */
  async getFavoriteMovies(
    accountObjectId: string,
    params?: V4AccountMediaParams
  ): Promise<V4AccountFavoriteMoviesResponse> {
    const response = await this.httpClient.get(
      `${this.basePath(accountObjectId)}/movie/favorites`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get a user's list of favourite TV shows.
   * @see https://developer.themoviedb.org/v4/reference/account-favorite-tv
   */
  async getFavoriteTvShows(
    accountObjectId: string,
    params?: V4AccountMediaParams
  ): Promise<V4AccountFavoriteTvShowsResponse> {
    const response = await this.httpClient.get(
      `${this.basePath(accountObjectId)}/tv/favorites`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get a user's rated movies.
   * @see https://developer.themoviedb.org/v4/reference/account-rated-movies
   */
  async getRatedMovies(
    accountObjectId: string,
    params?: V4AccountMediaParams
  ): Promise<V4AccountRatedMoviesResponse> {
    const response = await this.httpClient.get(
      `${this.basePath(accountObjectId)}/movie/rated`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get a user's rated TV shows.
   * @see https://developer.themoviedb.org/v4/reference/account-rated-tv
   */
  async getRatedTvShows(
    accountObjectId: string,
    params?: V4AccountMediaParams
  ): Promise<V4AccountRatedTvShowsResponse> {
    const response = await this.httpClient.get(
      `${this.basePath(accountObjectId)}/tv/rated`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get a user's movie watchlist.
   * @see https://developer.themoviedb.org/v4/reference/account-movie-watchlist
   */
  async getWatchlistMovies(
    accountObjectId: string,
    params?: V4AccountMediaParams
  ): Promise<V4AccountWatchlistMoviesResponse> {
    const response = await this.httpClient.get(
      `${this.basePath(accountObjectId)}/movie/watchlist`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get a user's TV watchlist.
   * @see https://developer.themoviedb.org/v4/reference/account-tv-watchlist
   */
  async getWatchlistTvShows(
    accountObjectId: string,
    params?: V4AccountMediaParams
  ): Promise<V4AccountWatchlistTvShowsResponse> {
    const response = await this.httpClient.get(
      `${this.basePath(accountObjectId)}/tv/watchlist`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }
}
