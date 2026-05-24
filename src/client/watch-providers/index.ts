import { type AxiosInstance } from "axios";
import {
  type WatchProvidersRegionsParams,
  type WatchProviderRegionResponse,
  type WatchProvidersListParams,
  type WatchProvidersResponse,
} from "../../types/watch-providers.js";
import { buildQueryParams } from "../../utils/query.js";

export class WatchProvidersClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get the list of the countries we have watch provider (OTT/streaming) data for.
   * @see https://developer.themoviedb.org/reference/watch-providers-available-regions
   */
  async getAvailableRegions(params?: WatchProvidersRegionsParams): Promise<WatchProviderRegionResponse> {
    const response = await this.axiosInstance.get("watch/providers/regions", { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the list of streaming providers we have for movies.
   * @see https://developer.themoviedb.org/reference/watch-providers-movie-list
   */
  async getMovieProviders(params?: WatchProvidersListParams): Promise<WatchProvidersResponse> {
    const response = await this.axiosInstance.get("watch/providers/movie", { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the list of streaming providers we have for TV shows.
   * @see https://developer.themoviedb.org/reference/watch-providers-tv-list
   */
  async getTvProviders(params?: WatchProvidersListParams): Promise<WatchProvidersResponse> {
    const response = await this.axiosInstance.get("watch/providers/tv", { params: buildQueryParams(params) });
    return response.data;
  }
}
