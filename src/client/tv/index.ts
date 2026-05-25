import { type AxiosInstance } from "axios";
import {
  type TvAiringTodayParams,
  type TvListResponse,
  type TvOnTheAirParams,
  type TvPopularParams,
  type TvTopRatedParams,
  type TvSeriesDetails,
  type TvSeriesDetailsParams,
  type TvSeriesAccountStates,
  type TvSeriesAccountStatesParams,
  type TvAggregateCreditsResponse,
  type TvAggregateCreditsParams,
  type TvSeriesAlternativeTitlesResponse,
  type TvSeriesAlternativeTitlesParams,
  type TvSeriesChangesResponse,
  type TvSeriesChangesParams,
  type TvContentRatingsResponse,
  type TvCreditsResponse,
  type TvCreditsParams,
  type TvEpisodeGroupsResponse,
  type TvSeriesExternalIdsResponse,
  type TvSeriesImagesResponse,
  type TvSeriesImagesParams,
  type TvSeriesKeywordsResponse,
  type TvSeriesListsResponse,
  type TvSeriesListsParams,
  type TvSeriesRecommendationsParams,
  type TvSeriesReviewsResponse,
  type TvSeriesReviewsParams,
  type TvScreenedTheatricallyResponse,
  type TvSeriesSimilarParams,
  type TvSeriesTranslationsResponse,
  type TvSeriesVideosResponse,
  type TvSeriesVideosParams,
  type TvSeriesWatchProvidersResponse,
} from "../../types/tv.js";
import {
  type TvSeasonAccountStates,
  type TvSeasonAccountStatesParams,
  type TvSeasonDetails,
  type TvSeasonDetailsParams,
  type TvSeasonExternalIdsResponse,
  type TvSeasonImagesResponse,
  type TvSeasonImagesParams,
  type TvSeasonVideosParams,
  type TvEpisodeDetails,
  type TvEpisodeDetailsParams,
  type TvEpisodeAccountStates,
  type TvEpisodeAccountStatesParams,
  type TvEpisodeCreditsResponse,
  type TvEpisodeCreditsParams,
  type TvEpisodeExternalIdsResponse,
  type TvEpisodeImagesResponse,
  type TvEpisodeImagesParams,
  type TvEpisodeVideosParams,
  type TvEpisodeGroupDetails,
} from "../../types/tv.js";
import {
  type AddRatingRequest,
  type AddRatingParams,
  type DeleteRatingParams,
} from "../../types/movie.js";
import { type TMDBResponse } from "../../types/account.js";
import { buildQueryParams } from "../../utils/query.js";

export class TvClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get a list of TV shows airing today.
   * @see https://developer.themoviedb.org/reference/tv-series-airing-today-list
   */
  async getAiringToday(params?: TvAiringTodayParams): Promise<TvListResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get("tv/airing_today", { params: queryParams });
    return response.data;
  }

  /**
   * Get a list of TV shows that air in the next 7 days.
   * @see https://developer.themoviedb.org/reference/tv-series-on-the-air-list
   */
  async getOnTheAir(params?: TvOnTheAirParams): Promise<TvListResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get("tv/on_the_air", { params: queryParams });
    return response.data;
  }

  /**
   * Get a list of TV shows ordered by popularity.
   * @see https://developer.themoviedb.org/reference/tv-series-popular-list
   */
  async getPopular(params?: TvPopularParams): Promise<TvListResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get("tv/popular", { params: queryParams });
    return response.data;
  }

  /**
   * Get a list of TV shows ordered by rating.
   * @see https://developer.themoviedb.org/reference/tv-series-top-rated-list
   */
  async getTopRated(params?: TvTopRatedParams): Promise<TvListResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get("tv/top_rated", { params: queryParams });
    return response.data;
  }

  /**
   * Get the details of a TV show by ID.
   * @see https://developer.themoviedb.org/reference/tv-series-details
   */
  async getDetails(id: number, params?: TvSeriesDetailsParams): Promise<TvSeriesDetails> {
    const queryParams = buildQueryParams(params);
    if (queryParams.append_to_response) {
      queryParams.append_to_response = [...new Set(params?.append_to_response ?? [])].join(",");
    }

    const response = await this.axiosInstance.get(`tv/${id}`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the rating, watchlist and favourite status of an account for a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-account-states
   */
  async getAccountStates(
    id: number,
    params?: TvSeriesAccountStatesParams
  ): Promise<TvSeriesAccountStates> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(`tv/${id}/account_states`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the aggregate credits (cast and crew) that have been added to a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-aggregate-credits
   */
  async getAggregateCredits(
    id: number,
    params?: TvAggregateCreditsParams
  ): Promise<TvAggregateCreditsResponse> {
    const response = await this.axiosInstance.get(`tv/${id}/aggregate_credits`, { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the alternative titles that have been added to a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-alternative-titles
   */
  async getAlternativeTitles(
    id: number,
    params?: TvSeriesAlternativeTitlesParams
  ): Promise<TvSeriesAlternativeTitlesResponse> {
    const response = await this.axiosInstance.get(`tv/${id}/alternative_titles`, { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the recent changes for a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-changes
   */
  async getChanges(id: number, params?: TvSeriesChangesParams): Promise<TvSeriesChangesResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(`tv/${id}/changes`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the content ratings that have been added to a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-content-ratings
   */
  async getContentRatings(id: number): Promise<TvContentRatingsResponse> {
    const response = await this.axiosInstance.get(`tv/${id}/content_ratings`);
    return response.data;
  }

  /**
   * Get the credits (cast and crew) for a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-credits
   */
  async getCredits(id: number, params?: TvCreditsParams): Promise<TvCreditsResponse> {
    const response = await this.axiosInstance.get(`tv/${id}/credits`, { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the episode groups that have been added to a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-episode-groups
   */
  async getEpisodeGroups(id: number): Promise<TvEpisodeGroupsResponse> {
    const response = await this.axiosInstance.get(`tv/${id}/episode_groups`);
    return response.data;
  }

  /**
   * Get a list of external IDs that have been added to a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-external-ids
   */
  async getExternalIds(id: number): Promise<TvSeriesExternalIdsResponse> {
    const response = await this.axiosInstance.get(`tv/${id}/external_ids`);
    return response.data;
  }

  /**
   * Get the images that belong to a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-images
   */
  async getImages(id: number, params?: TvSeriesImagesParams): Promise<TvSeriesImagesResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(`tv/${id}/images`, { params: queryParams });
    return response.data;
  }

  /**
   * Get a list of keywords that have been added to a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-keywords
   */
  async getKeywords(id: number): Promise<TvSeriesKeywordsResponse> {
    const response = await this.axiosInstance.get(`tv/${id}/keywords`);
    return response.data;
  }

  /**
   * Get the newest TV show ID.
   * @see https://developer.themoviedb.org/reference/tv-series-latest
   */
  async getLatest(): Promise<TvSeriesDetails> {
    const response = await this.axiosInstance.get("tv/latest");
    return response.data;
  }

  /**
   * Get the lists that a TV show has been added to.
   * @see https://developer.themoviedb.org/reference/tv-series-lists
   */
  async getLists(id: number, params?: TvSeriesListsParams): Promise<TvSeriesListsResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(`tv/${id}/lists`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the recommended TV shows for a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-recommendations
   */
  async getRecommendations(
    id: number,
    params?: TvSeriesRecommendationsParams
  ): Promise<TvListResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(`tv/${id}/recommendations`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the reviews for a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-reviews
   */
  async getReviews(id: number, params?: TvSeriesReviewsParams): Promise<TvSeriesReviewsResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(`tv/${id}/reviews`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the seasons and episodes that have screened theatrically.
   * @see https://developer.themoviedb.org/reference/tv-series-screened-theatrically
   */
  async getScreenedTheatrically(id: number): Promise<TvScreenedTheatricallyResponse> {
    const response = await this.axiosInstance.get(`tv/${id}/screened_theatrically`);
    return response.data;
  }

  /**
   * Get the similar TV shows based on genres and keywords.
   * @see https://developer.themoviedb.org/reference/tv-series-similar
   */
  async getSimilar(
    id: number,
    params?: TvSeriesSimilarParams
  ): Promise<TvListResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(`tv/${id}/similar`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the translations that have been added to a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-translations
   */
  async getTranslations(id: number): Promise<TvSeriesTranslationsResponse> {
    const response = await this.axiosInstance.get(`tv/${id}/translations`);
    return response.data;
  }

  /**
   * Get the videos that belong to a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-videos
   */
  async getVideos(id: number, params?: TvSeriesVideosParams): Promise<TvSeriesVideosResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(`tv/${id}/videos`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the list of streaming providers for a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-watch-providers
   */
  async getWatchProviders(id: number): Promise<TvSeriesWatchProvidersResponse> {
    const response = await this.axiosInstance.get(`tv/${id}/watch/providers`);
    return response.data;
  }

  /**
   * Rate a TV show and save it to your rated list.
   * @see https://developer.themoviedb.org/reference/tv-series-add-rating
   */
  async addRating(
    id: number,
    params: AddRatingParams,
    request: AddRatingRequest
  ): Promise<TMDBResponse> {
    const response = await this.axiosInstance.post(
      `tv/${id}/rating`,
      request,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Delete a user rating for a TV show.
   * @see https://developer.themoviedb.org/reference/tv-series-delete-rating
   */
  async deleteRating(
    id: number,
    params: DeleteRatingParams
  ): Promise<TMDBResponse> {
    const response = await this.axiosInstance.delete(
      `tv/${id}/rating`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get the details of a TV season by season number.
   * @see https://developer.themoviedb.org/reference/tv-season-details
   */
  async getSeasonDetails(
    seriesId: number,
    seasonNumber: number,
    params?: TvSeasonDetailsParams
  ): Promise<TvSeasonDetails> {
    const queryParams = buildQueryParams(params);
    if (queryParams.append_to_response) {
      queryParams.append_to_response = [...new Set(params?.append_to_response ?? [])].join(",");
    }

    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the rating, watchlist and favourite status of an account for a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-account-states
   */
  async getSeasonAccountStates(
    seriesId: number,
    seasonNumber: number,
    params?: TvSeasonAccountStatesParams
  ): Promise<TvSeasonAccountStates> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/account_states`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the aggregate credits (cast and crew) for a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-aggregate-credits
   */
  async getSeasonAggregateCredits(
    seriesId: number,
    seasonNumber: number,
    params?: TvAggregateCreditsParams
  ): Promise<TvAggregateCreditsResponse> {
    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/aggregate_credits`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get the recent changes for a TV season by season ID.
   * @see https://developer.themoviedb.org/reference/tv-season-changes-by-id
   */
  async getSeasonChangesById(
    seasonId: number,
    params?: TvSeriesChangesParams
  ): Promise<TvSeriesChangesResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(
      `tv/season/${seasonId}/changes`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the credits (cast and crew) for a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-credits
   */
  async getSeasonCredits(
    seriesId: number,
    seasonNumber: number,
    params?: TvCreditsParams
  ): Promise<TvCreditsResponse> {
    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/credits`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get the external IDs for a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-external-ids
   */
  async getSeasonExternalIds(
    seriesId: number,
    seasonNumber: number
  ): Promise<TvSeasonExternalIdsResponse> {
    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/external_ids`
    );
    return response.data;
  }

  /**
   * Get the images that belong to a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-images
   */
  async getSeasonImages(
    seriesId: number,
    seasonNumber: number,
    params?: TvSeasonImagesParams
  ): Promise<TvSeasonImagesResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/images`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the translations for a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-translations
   */
  async getSeasonTranslations(
    seriesId: number,
    seasonNumber: number
  ): Promise<TvSeriesTranslationsResponse> {
    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/translations`
    );
    return response.data;
  }

  /**
   * Get the videos that belong to a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-videos
   */
  async getSeasonVideos(
    seriesId: number,
    seasonNumber: number,
    params?: TvSeasonVideosParams
  ): Promise<TvSeriesVideosResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/videos`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the list of streaming providers for a TV season.
   * @see https://developer.themoviedb.org/reference/tv-season-watch-providers
   */
  async getSeasonWatchProviders(
    seriesId: number,
    seasonNumber: number
  ): Promise<TvSeriesWatchProvidersResponse> {
    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/watch/providers`
    );
    return response.data;
  }

  /**
   * Get the details of a TV episode by episode number.
   * @see https://developer.themoviedb.org/reference/tv-episode-details
   */
  async getEpisodeDetails(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params?: TvEpisodeDetailsParams
  ): Promise<TvEpisodeDetails> {
    const queryParams = buildQueryParams(params);
    if (queryParams.append_to_response) {
      queryParams.append_to_response = [...new Set(params?.append_to_response ?? [])].join(",");
    }

    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the rating, watchlist and favourite status of an account for a TV episode.
   * @see https://developer.themoviedb.org/reference/tv-episode-account-states
   */
  async getEpisodeAccountStates(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params?: TvEpisodeAccountStatesParams
  ): Promise<TvEpisodeAccountStates> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/account_states`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the recent changes for a TV episode by episode ID.
   * @see https://developer.themoviedb.org/reference/tv-episode-changes-by-id
   */
  async getEpisodeChangesById(
    episodeId: number,
    params?: TvSeriesChangesParams
  ): Promise<TvSeriesChangesResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(
      `tv/episode/${episodeId}/changes`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the credits (cast, crew and guest stars) for a TV episode.
   * @see https://developer.themoviedb.org/reference/tv-episode-credits
   */
  async getEpisodeCredits(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params?: TvEpisodeCreditsParams
  ): Promise<TvEpisodeCreditsResponse> {
    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/credits`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get the external IDs for a TV episode.
   * @see https://developer.themoviedb.org/reference/tv-episode-external-ids
   */
  async getEpisodeExternalIds(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<TvEpisodeExternalIdsResponse> {
    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/external_ids`
    );
    return response.data;
  }

  /**
   * Get the images that belong to a TV episode.
   * @see https://developer.themoviedb.org/reference/tv-episode-images
   */
  async getEpisodeImages(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params?: TvEpisodeImagesParams
  ): Promise<TvEpisodeImagesResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/images`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the translations for a TV episode.
   * @see https://developer.themoviedb.org/reference/tv-episode-translations
   */
  async getEpisodeTranslations(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<TvSeriesTranslationsResponse> {
    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/translations`
    );
    return response.data;
  }

  /**
   * Get the videos that belong to a TV episode.
   * @see https://developer.themoviedb.org/reference/tv-episode-videos
   */
  async getEpisodeVideos(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params?: TvEpisodeVideosParams
  ): Promise<TvSeriesVideosResponse> {
    const queryParams = buildQueryParams(params);

    const response = await this.axiosInstance.get(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/videos`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Rate a TV episode and save it to your rated list.
   * @see https://developer.themoviedb.org/reference/tv-episode-add-rating
   */
  async addEpisodeRating(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params: AddRatingParams,
    request: AddRatingRequest
  ): Promise<TMDBResponse> {
    const response = await this.axiosInstance.post(
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
  async deleteEpisodeRating(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params: DeleteRatingParams
  ): Promise<TMDBResponse> {
    const response = await this.axiosInstance.delete(
      `tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/rating`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get the details of a TV episode group by ID.
   * @see https://developer.themoviedb.org/reference/tv-episode-group-details
   */
  async getEpisodeGroupDetails(id: string): Promise<TvEpisodeGroupDetails> {
    const response = await this.axiosInstance.get(`tv/episode_group/${id}`);
    return response.data;
  }
}
