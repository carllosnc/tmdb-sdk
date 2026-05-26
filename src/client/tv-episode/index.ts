import { type HttpClient } from "../../http/types.js";
import type {
  TvEpisodeAccountStates,
  TvEpisodeAccountStatesParams,
  TvEpisodeAppendToResponseResult,
  TvEpisodeAppendToResponseValue,
  TvEpisodeCreditsResponse,
  TvEpisodeCreditsParams,
  TvEpisodeDetails,
  TvEpisodeDetailsParams,
  TvEpisodeExternalIdsResponse,
  TvEpisodeImagesResponse,
  TvEpisodeImagesParams,
  TvEpisodeVideosParams,
  TvSeriesChangesResponse,
  TvSeriesChangesParams,
  TvSeriesTranslationsResponse,
  TvSeriesVideosResponse,
} from "../../types/tv.js";
import {
  type AddRatingRequest,
  type AddRatingParams,
  type DeleteRatingParams,
} from "../../types/movie.js";
import { type TMDBResponse } from "../../types/account.js";
import { buildQueryParams } from "../../utils/query.js";

export class TvEpisodeClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get the details of a TV episode by episode number.
   * @see https://developer.themoviedb.org/reference/tv-episode-details
   */
  async getDetails<T extends readonly TvEpisodeAppendToResponseValue[] = never>(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params?: TvEpisodeDetailsParams & { append_to_response?: T }
  ): Promise<TvEpisodeAppendToResponseResult<T>> {
    const queryParams = buildQueryParams(params);
    if (queryParams.append_to_response) {
      queryParams.append_to_response = [...new Set(params?.append_to_response ?? [])].join(",");
    }

    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the rating, watchlist and favourite status of an account for a TV episode.
   * @see https://developer.themoviedb.org/reference/tv-episode-account-states
   */
  async getAccountStates(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params?: TvEpisodeAccountStatesParams
  ): Promise<TvEpisodeAccountStates> {
    const queryParams = buildQueryParams(params);

    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/account_states`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the recent changes for a TV episode by episode ID.
   * @see https://developer.themoviedb.org/reference/tv-episode-changes-by-id
   */
  async getChangesById(
    episodeId: number,
    params?: TvSeriesChangesParams
  ): Promise<TvSeriesChangesResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.httpClient.get(
      `tv/episode/${episodeId}/changes`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the credits (cast, crew and guest stars) for a TV episode.
   * @see https://developer.themoviedb.org/reference/tv-episode-credits
   */
  async getCredits(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params?: TvEpisodeCreditsParams
  ): Promise<TvEpisodeCreditsResponse> {
    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/credits`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get the external IDs for a TV episode.
   * @see https://developer.themoviedb.org/reference/tv-episode-external-ids
   */
  async getExternalIds(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<TvEpisodeExternalIdsResponse> {
    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/external_ids`
    );
    return response.data;
  }

  /**
   * Get the images that belong to a TV episode.
   * @see https://developer.themoviedb.org/reference/tv-episode-images
   */
  async getImages(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params?: TvEpisodeImagesParams
  ): Promise<TvEpisodeImagesResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/images`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the translations for a TV episode.
   * @see https://developer.themoviedb.org/reference/tv-episode-translations
   */
  async getTranslations(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<TvSeriesTranslationsResponse> {
    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/translations`
    );
    return response.data;
  }

  /**
   * Get the videos that belong to a TV episode.
   * @see https://developer.themoviedb.org/reference/tv-episode-videos
   */
  async getVideos(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params?: TvEpisodeVideosParams
  ): Promise<TvSeriesVideosResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.httpClient.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/videos`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Rate a TV episode and save it to your rated list.
   * @see https://developer.themoviedb.org/reference/tv-episode-add-rating
   */
  async addRating(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params: AddRatingParams,
    request: AddRatingRequest
  ): Promise<TMDBResponse> {
    const response = await this.httpClient.post(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/rating`,
      request,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Delete a user rating for a TV episode.
   * @see https://developer.themoviedb.org/reference/tv-episode-delete-rating
   */
  async deleteRating(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params: DeleteRatingParams
  ): Promise<TMDBResponse> {
    const response = await this.httpClient.delete(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/rating`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }
}
