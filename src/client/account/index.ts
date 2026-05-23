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
   * Get the public details of an account.
   * If a session ID is provided, it retrieves details of the authenticated account.
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
   * Add a movie or TV show to your watchlist.
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
   * Get a list of favorite movies for the account.
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
   * Get a list of favorite TV shows for the account.
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
   * Get a list of custom lists created by the account.
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
   * Get a list of rated movies for the account.
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
   * Get a list of rated TV shows for the account.
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
   * Get a list of rated TV episodes for the account.
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
   * Get a list of movies in the account's watchlist.
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
   * Get a list of TV shows in the account's watchlist.
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
