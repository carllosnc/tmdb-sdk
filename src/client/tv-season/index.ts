import { type HttpClient } from "../../http/types.js";
import type {
  TvSeasonAccountStates,
  TvSeasonAccountStatesParams,
  TvSeasonAppendToResponseResult,
  TvSeasonAppendToResponseValue,
  TvSeasonDetails,
  TvSeasonDetailsParams,
  TvSeasonExternalIdsResponse,
  TvSeasonImagesResponse,
  TvSeasonImagesParams,
  TvSeasonVideosParams,
  TvAggregateCreditsResponse,
  TvAggregateCreditsParams,
  TvSeriesChangesResponse,
  TvSeriesChangesParams,
  TvCreditsResponse,
  TvCreditsParams,
  TvSeriesVideosResponse,
  TvSeriesTranslationsResponse,
  TvSeriesWatchProvidersResponse,
} from "../../types/tv.js";
import { buildQueryParams } from "../../utils/query.js";

export class TvSeasonClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get the details of a TV season by season number.
   * @see https://developer.themoviedb.org/reference/tv-season-details
   */
  async getDetails<T extends readonly TvSeasonAppendToResponseValue[] = never>(
    seriesId: number,
    seasonNumber: number,
    params?: TvSeasonDetailsParams & { appendToResponse?: T }
  ): Promise<TvSeasonAppendToResponseResult<T>> {
    const queryParams = buildQueryParams(params);
    if (queryParams.append_to_response) {
      queryParams.append_to_response = [...new Set(params?.appendToResponse ?? [])].join(",");
    }

    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the rating, watchlist and favourite status of an account for a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-account-states
   */
  async getAccountStates(
    seriesId: number,
    seasonNumber: number,
    params?: TvSeasonAccountStatesParams
  ): Promise<TvSeasonAccountStates> {
    const queryParams = buildQueryParams(params);

    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/account_states`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the aggregate credits (cast and crew) for a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-aggregate-credits
   */
  async getAggregateCredits(
    seriesId: number,
    seasonNumber: number,
    params?: TvAggregateCreditsParams
  ): Promise<TvAggregateCreditsResponse> {
    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/aggregate_credits`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get the recent changes for a TV season by season ID.
   * @see https://developer.themoviedb.org/reference/tv-season-changes-by-id
   */
  async getChangesById(
    seasonId: number,
    params?: TvSeriesChangesParams
  ): Promise<TvSeriesChangesResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.httpClient.get(
      `tv/season/${seasonId}/changes`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the credits (cast and crew) for a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-credits
   */
  async getCredits(
    seriesId: number,
    seasonNumber: number,
    params?: TvCreditsParams
  ): Promise<TvCreditsResponse> {
    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/credits`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get the external IDs for a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-external-ids
   */
  async getExternalIds(
    seriesId: number,
    seasonNumber: number
  ): Promise<TvSeasonExternalIdsResponse> {
    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/external_ids`
    );
    return response.data;
  }

  /**
   * Get the images that belong to a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-images
   */
  async getImages(
    seriesId: number,
    seasonNumber: number,
    params?: TvSeasonImagesParams
  ): Promise<TvSeasonImagesResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/images`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the translations for a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-translations
   */
  async getTranslations(
    seriesId: number,
    seasonNumber: number
  ): Promise<TvSeriesTranslationsResponse> {
    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/translations`
    );
    return response.data;
  }

  /**
   * Get the videos that belong to a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-videos
   */
  async getVideos(
    seriesId: number,
    seasonNumber: number,
    params?: TvSeasonVideosParams
  ): Promise<TvSeriesVideosResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/videos`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the list of streaming providers for a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-watch-providers
   */
  async getWatchProviders(
    seriesId: number,
    seasonNumber: number
  ): Promise<TvSeriesWatchProvidersResponse> {
    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/watch/providers`
    );
    return response.data;
  }
}
