import { type HttpClient } from "../../http/types.js";
import {
  type MovieListResponse,
  type NowPlayingParams,
  type PopularParams,
  type TopRatedParams,
  type UpcomingParams,
  type MovieAppendToResponseResult,
  type MovieAppendToResponseValue,
  type MovieDetails,
  type MovieDetailsParams,
  type MovieAccountStates,
  type MovieAccountStatesParams,
  type MovieAlternativeTitlesResponse,
  type MovieAlternativeTitlesParams,
  type MovieChangesResponse,
  type MovieChangesParams,
  type MovieCreditsResponse,
  type MovieCreditsParams,
  type MovieExternalIdsResponse,
  type MovieImagesResponse,
  type MovieImagesParams,
  type MovieKeywordsResponse,
  type MovieListsResponse,
  type MovieListsParams,
  type MovieRecommendationsParams,
  type MovieReleaseDatesResponse,
  type MovieSimilarParams,
  type MovieReviewsResponse,
  type MovieReviewsParams,
  type MovieTranslationsResponse,
  type MovieVideosResponse,
  type MovieVideosParams,
  type MovieWatchProvidersResponse,
  type AddRatingRequest,
  type AddRatingParams,
  type DeleteRatingParams,
} from "../../types/movie.js";
import { type TMDBResponse } from "../../types/account.js";
import { buildQueryParams } from "../../utils/query.js";

export class MovieClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get a list of movies that are currently in theatres.
   * @see https://developer.themoviedb.org/reference/movie-now-playing-list
   */
  async getNowPlaying(params?: NowPlayingParams): Promise<MovieListResponse> {
    const response = await this.httpClient.get("movie/now_playing", { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get a list of movies ordered by popularity.
   * @see https://developer.themoviedb.org/reference/movie-popular-list
   */
  async getPopular(params?: PopularParams): Promise<MovieListResponse> {
    const response = await this.httpClient.get("movie/popular", { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get a list of movies ordered by rating.
   * @see https://developer.themoviedb.org/reference/movie-top-rated-list
   */
  async getTopRated(params?: TopRatedParams): Promise<MovieListResponse> {
    const response = await this.httpClient.get("movie/top_rated", { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get a list of movies that are being released soon.
   * @see https://developer.themoviedb.org/reference/movie-upcoming-list
   */
  async getUpcoming(params?: UpcomingParams): Promise<MovieListResponse> {
    const response = await this.httpClient.get("movie/upcoming", { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the top level details of a movie by ID.
   * @see https://developer.themoviedb.org/reference/movie-details
   */
  async getDetails<T extends readonly MovieAppendToResponseValue[] = never>(
    id: number,
    params?: MovieDetailsParams & { append_to_response?: T }
  ): Promise<MovieAppendToResponseResult<T>> {
    const queryParams = buildQueryParams(params);
    if (queryParams.append_to_response) {
      queryParams.append_to_response = [...new Set(params?.append_to_response ?? [])].join(",");
    }

    const response = await this.httpClient.get(`movie/${id}`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the rating, watchlist and favourite status of an account.
   * @see https://developer.themoviedb.org/reference/movie-account-states
   */
  async getAccountStates(
    id: number,
    params?: MovieAccountStatesParams
  ): Promise<MovieAccountStates> {
    const response = await this.httpClient.get(`movie/${id}/account_states`, { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the alternative titles for a movie.
   * @see https://developer.themoviedb.org/reference/movie-alternative-titles
   */
  async getAlternativeTitles(
    id: number,
    params?: MovieAlternativeTitlesParams
  ): Promise<MovieAlternativeTitlesResponse> {
    const response = await this.httpClient.get(`movie/${id}/alternative_titles`, { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the recent changes for a movie.
   * @see https://developer.themoviedb.org/reference/movie-changes
   */
  async getChanges(id: number, params?: MovieChangesParams): Promise<MovieChangesResponse> {
    const response = await this.httpClient.get(`movie/${id}/changes`, { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the cast and crew for a movie.
   * @see https://developer.themoviedb.org/reference/movie-credits
   */
  async getCredits(id: number, params?: MovieCreditsParams): Promise<MovieCreditsResponse> {
    const response = await this.httpClient.get(`movie/${id}/credits`, { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the external IDs for a movie (IMDb, Facebook, etc.).
   * @see https://developer.themoviedb.org/reference/movie-external-ids
   */
  async getExternalIds(id: number): Promise<MovieExternalIdsResponse> {
    const response = await this.httpClient.get(`movie/${id}/external_ids`);
    return response.data;
  }

  /**
   * Get the images (backdrops, posters, logos) that belong to a movie.
   * @see https://developer.themoviedb.org/reference/movie-images
   */
  async getImages(id: number, params?: MovieImagesParams): Promise<MovieImagesResponse> {
    const response = await this.httpClient.get(`movie/${id}/images`, { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the keywords for a movie.
   * @see https://developer.themoviedb.org/reference/movie-keywords
   */
  async getKeywords(id: number): Promise<MovieKeywordsResponse> {
    const response = await this.httpClient.get(`movie/${id}/keywords`);
    return response.data;
  }

  /**
   * Get the newest movie ID.
   * @see https://developer.themoviedb.org/reference/movie-latest-id
   */
  async getLatest(): Promise<MovieDetails> {
    const response = await this.httpClient.get("movie/latest");
    return response.data;
  }

  /**
   * Get the lists that a movie has been added to.
   * @see https://developer.themoviedb.org/reference/movie-lists
   */
  async getLists(id: number, params?: MovieListsParams): Promise<MovieListsResponse> {
    const response = await this.httpClient.get(`movie/${id}/lists`, { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the recommended movies for a movie.
   * @see https://developer.themoviedb.org/reference/movie-recommendations
   */
  async getRecommendations(
    id: number,
    params?: MovieRecommendationsParams
  ): Promise<MovieListResponse> {
    const response = await this.httpClient.get(`movie/${id}/recommendations`, { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the release dates and certifications for a movie.
   * @see https://developer.themoviedb.org/reference/movie-release-dates
   */
  async getReleaseDates(id: number): Promise<MovieReleaseDatesResponse> {
    const response = await this.httpClient.get(`movie/${id}/release_dates`);
    return response.data;
  }

  /**
   * Get the user reviews for a movie.
   * @see https://developer.themoviedb.org/reference/movie-reviews
   */
  async getReviews(id: number, params?: MovieReviewsParams): Promise<MovieReviewsResponse> {
    const response = await this.httpClient.get(`movie/${id}/reviews`, { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the similar movies based on genres and keywords.
   * @see https://developer.themoviedb.org/reference/movie-similar
   */
  async getSimilar(
    id: number,
    params?: MovieSimilarParams
  ): Promise<MovieListResponse> {
    const response = await this.httpClient.get(`movie/${id}/similar`, { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the translations for a movie.
   * @see https://developer.themoviedb.org/reference/movie-translations
   */
  async getTranslations(id: number): Promise<MovieTranslationsResponse> {
    const response = await this.httpClient.get(`movie/${id}/translations`);
    return response.data;
  }

  /**
   * Get the videos that have been added to a movie.
   * @see https://developer.themoviedb.org/reference/movie-videos
   */
  async getVideos(id: number, params?: MovieVideosParams): Promise<MovieVideosResponse> {
    const response = await this.httpClient.get(`movie/${id}/videos`, { params: buildQueryParams(params) });
    return response.data;
  }

  /**
   * Get the list of streaming providers for a movie.
   * @see https://developer.themoviedb.org/reference/movie-watch-providers
   */
  async getWatchProviders(id: number): Promise<MovieWatchProvidersResponse> {
    const response = await this.httpClient.get(`movie/${id}/watch/providers`);
    return response.data;
  }

  /**
   * Rate a movie and save it to your rated list.
   * @see https://developer.themoviedb.org/reference/movie-add-rating
   */
  async addRating(
    id: number,
    params: AddRatingParams,
    request: AddRatingRequest
  ): Promise<TMDBResponse> {
    const response = await this.httpClient.post(
      `movie/${id}/rating`,
      request,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Delete a user rating for a movie.
   * @see https://developer.themoviedb.org/reference/movie-delete-rating
   */
  async deleteRating(
    id: number,
    params: DeleteRatingParams
  ): Promise<TMDBResponse> {
    const response = await this.httpClient.delete(
      `movie/${id}/rating`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }
}
