import { type AxiosInstance } from "axios";
import {
  type AccountDetails,
  type GetAccountDetailsParams,
  type AddFavoriteRequest,
  type AddFavoriteParams,
  type AddWatchlistRequest,
  type AddWatchlistParams,
  type TMDBResponse,
  type FavoriteMovie,
  type FavoriteTV,
  type PaginatedResponse,
  type GetFavoritesParams,
  type AccountList,
  type GetListsParams,
  type RatedMovie,
  type RatedTV,
  type GetRatedParams,
  type RatedEpisode,
  type GetWatchlistParams,
} from "../../types/account.ts";

export class AccountClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get account details.
   * Omit accountId for the authenticated account when session_id is provided.
   * @see https://developer.themoviedb.org/reference/account-details
   */
  async getDetails(params?: GetAccountDetailsParams): Promise<AccountDetails> {
    const queryParams: Record<string, any> = {};
    if (params?.sessionId) {
      queryParams["session_id"] = params.sessionId;
    }

    const path = params?.accountId ? `account/${params.accountId}` : "account";
    const response = await this.axiosInstance.get(path, { params: queryParams });
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
    const queryParams: Record<string, any> = {};
    if (params.sessionId) {
      queryParams["session_id"] = params.sessionId;
    }

    const response = await this.axiosInstance.post(
      `account/${params.accountId}/favorite`,
      request,
      { params: queryParams }
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
    const queryParams: Record<string, any> = {};
    if (params.sessionId) {
      queryParams["session_id"] = params.sessionId;
    }

    const response = await this.axiosInstance.post(
      `account/${params.accountId}/watchlist`,
      request,
      { params: queryParams }
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
    const queryParams: Record<string, any> = {};
    if (params.sessionId) queryParams["session_id"] = params.sessionId;
    if (params.language) queryParams["language"] = params.language;
    if (params.page) queryParams["page"] = params.page;
    if (params.sortBy) queryParams["sort_by"] = params.sortBy;

    const response = await this.axiosInstance.get(
      `account/${params.accountId}/favorite/movies`,
      { params: queryParams }
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
    const queryParams: Record<string, any> = {};
    if (params.sessionId) queryParams["session_id"] = params.sessionId;
    if (params.language) queryParams["language"] = params.language;
    if (params.page) queryParams["page"] = params.page;
    if (params.sortBy) queryParams["sort_by"] = params.sortBy;

    const response = await this.axiosInstance.get(
      `account/${params.accountId}/favorite/tv`,
      { params: queryParams }
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
    const queryParams: Record<string, any> = {};
    if (params.sessionId) queryParams["session_id"] = params.sessionId;
    if (params.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get(
      `account/${params.accountId}/lists`,
      { params: queryParams }
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
    const queryParams: Record<string, any> = {};
    if (params.sessionId) queryParams["session_id"] = params.sessionId;
    if (params.language) queryParams["language"] = params.language;
    if (params.page) queryParams["page"] = params.page;
    if (params.sortBy) queryParams["sort_by"] = params.sortBy;

    const response = await this.axiosInstance.get(
      `account/${params.accountId}/rated/movies`,
      { params: queryParams }
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
    const queryParams: Record<string, any> = {};
    if (params.sessionId) queryParams["session_id"] = params.sessionId;
    if (params.language) queryParams["language"] = params.language;
    if (params.page) queryParams["page"] = params.page;
    if (params.sortBy) queryParams["sort_by"] = params.sortBy;

    const response = await this.axiosInstance.get(
      `account/${params.accountId}/rated/tv`,
      { params: queryParams }
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
    const queryParams: Record<string, any> = {};
    if (params.sessionId) queryParams["session_id"] = params.sessionId;
    if (params.language) queryParams["language"] = params.language;
    if (params.page) queryParams["page"] = params.page;
    if (params.sortBy) queryParams["sort_by"] = params.sortBy;

    const response = await this.axiosInstance.get(
      `account/${params.accountId}/rated/tv/episodes`,
      { params: queryParams }
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
    const queryParams: Record<string, any> = {};
    if (params.sessionId) queryParams["session_id"] = params.sessionId;
    if (params.language) queryParams["language"] = params.language;
    if (params.page) queryParams["page"] = params.page;
    if (params.sortBy) queryParams["sort_by"] = params.sortBy;

    const response = await this.axiosInstance.get(
      `account/${params.accountId}/watchlist/movies`,
      { params: queryParams }
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
    const queryParams: Record<string, any> = {};
    if (params.sessionId) queryParams["session_id"] = params.sessionId;
    if (params.language) queryParams["language"] = params.language;
    if (params.page) queryParams["page"] = params.page;
    if (params.sortBy) queryParams["sort_by"] = params.sortBy;

    const response = await this.axiosInstance.get(
      `account/${params.accountId}/watchlist/tv`,
      { params: queryParams }
    );
    return response.data;
  }
}
