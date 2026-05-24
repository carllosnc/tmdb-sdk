import { type AxiosInstance } from "axios";
import {
  type AccountDetails,
  type AddFavoriteParams,
  type AddFavoriteRequest,
  type AddWatchlistParams,
  type AddWatchlistRequest,
  type FavoriteMovie,
  type FavoriteTV,
  type GetAccountDetailsParams,
  type GetFavoritesParams,
  type GetListsParams,
  type GetRatedParams,
  type GetWatchlistParams,
  type PaginatedResponse,
  type RatedEpisode,
  type RatedMovie,
  type RatedTV,
  type TMDBResponse,
  type AccountList,
} from "../../types/account.js";
import { buildQueryParams } from "../../utils/query.js";

export class AccountClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get account details.
   * Omit accountId for the authenticated account when session_id is provided.
   * @see https://developer.themoviedb.org/reference/account-details
   */
  async getDetails(params?: GetAccountDetailsParams): Promise<AccountDetails> {
    const { accountId, ...query } = params ?? {};
    const path = accountId ? `account/${accountId}` : "account";
    const response = await this.axiosInstance.get(path, { params: buildQueryParams(query) });
    return response.data;
  }

  /**
   * Mark a movie or TV show as a favorite.
   * @see https://developer.themoviedb.org/reference/account-add-favorite
   */
  async addFavorite(
    params: AddFavoriteParams,
    request: AddFavoriteRequest
  ): Promise<TMDBResponse> {
    const { accountId, ...query } = params;
    const response = await this.axiosInstance.post(
      `account/${accountId}/favorite`,
      request,
      { params: buildQueryParams(query) }
    );
    return response.data;
  }

  /**
   * Add a movie or TV show to the watchlist.
   * @see https://developer.themoviedb.org/reference/account-add-to-watchlist
   */
  async addToWatchlist(
    params: AddWatchlistParams,
    request: AddWatchlistRequest
  ): Promise<TMDBResponse> {
    const { accountId, ...query } = params;
    const response = await this.axiosInstance.post(
      `account/${accountId}/watchlist`,
      request,
      { params: buildQueryParams(query) }
    );
    return response.data;
  }

  /**
   * Get favorite movies for an account.
   * @see https://developer.themoviedb.org/reference/account-get-favorites
   */
  async getFavoriteMovies(
    params: GetFavoritesParams
  ): Promise<PaginatedResponse<FavoriteMovie>> {
    const { accountId, ...query } = params;
    const response = await this.axiosInstance.get(
      `account/${accountId}/favorite/movies`,
      { params: buildQueryParams(query) }
    );
    return response.data;
  }

  /**
   * Get favorite TV shows for an account.
   * @see https://developer.themoviedb.org/reference/account-favorite-tv
   */
  async getFavoriteTV(
    params: GetFavoritesParams
  ): Promise<PaginatedResponse<FavoriteTV>> {
    const { accountId, ...query } = params;
    const response = await this.axiosInstance.get(
      `account/${accountId}/favorite/tv`,
      { params: buildQueryParams(query) }
    );
    return response.data;
  }

  /**
   * Get custom lists for an account.
   * @see https://developer.themoviedb.org/reference/account-lists
   */
  async getLists(
    params: GetListsParams
  ): Promise<PaginatedResponse<AccountList>> {
    const { accountId, ...query } = params;
    const response = await this.axiosInstance.get(
      `account/${accountId}/lists`,
      { params: buildQueryParams(query) }
    );
    return response.data;
  }

  /**
   * Get rated movies for an account.
   * @see https://developer.themoviedb.org/reference/account-rated-movies
   */
  async getRatedMovies(
    params: GetRatedParams
  ): Promise<PaginatedResponse<RatedMovie>> {
    const { accountId, ...query } = params;
    const response = await this.axiosInstance.get(
      `account/${accountId}/rated/movies`,
      { params: buildQueryParams(query) }
    );
    return response.data;
  }

  /**
   * Get rated TV shows for an account.
   * @see https://developer.themoviedb.org/reference/account-rated-tv
   */
  async getRatedTV(
    params: GetRatedParams
  ): Promise<PaginatedResponse<RatedTV>> {
    const { accountId, ...query } = params;
    const response = await this.axiosInstance.get(
      `account/${accountId}/rated/tv`,
      { params: buildQueryParams(query) }
    );
    return response.data;
  }

  /**
   * Get rated TV episodes for an account.
   * @see https://developer.themoviedb.org/reference/account-rated-tv-episodes
   */
  async getRatedTVEpisodes(
    params: GetRatedParams
  ): Promise<PaginatedResponse<RatedEpisode>> {
    const { accountId, ...query } = params;
    const response = await this.axiosInstance.get(
      `account/${accountId}/rated/tv/episodes`,
      { params: buildQueryParams(query) }
    );
    return response.data;
  }

  /**
   * Get watchlist movies for an account.
   * @see https://developer.themoviedb.org/reference/account-watchlist-movies
   */
  async getWatchlistMovies(
    params: GetWatchlistParams
  ): Promise<PaginatedResponse<FavoriteMovie>> {
    const { accountId, ...query } = params;
    const response = await this.axiosInstance.get(
      `account/${accountId}/watchlist/movies`,
      { params: buildQueryParams(query) }
    );
    return response.data;
  }

  /**
   * Get watchlist TV shows for an account.
   * @see https://developer.themoviedb.org/reference/account-watchlist-tv
   */
  async getWatchlistTV(
    params: GetWatchlistParams
  ): Promise<PaginatedResponse<FavoriteTV>> {
    const { accountId, ...query } = params;
    const response = await this.axiosInstance.get(
      `account/${accountId}/watchlist/tv`,
      { params: buildQueryParams(query) }
    );
    return response.data;
  }
}
