import { type AxiosInstance } from "axios";
import {
  type MovieListResponse,
  type NowPlayingParams,
  type PopularParams,
  type TopRatedParams,
  type UpcomingParams,
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

export class MovieClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get a list of movies that are currently in theatres.
   * @see https://developer.themoviedb.org/reference/movie-now-playing-list
   */
  async getNowPlaying(params?: NowPlayingParams): Promise<MovieListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.region) queryParams["region"] = params.region;

    const response = await this.axiosInstance.get("movie/now_playing", { params: queryParams });
    return response.data;
  }

  /**
   * Get a list of movies ordered by popularity.
   * @see https://developer.themoviedb.org/reference/movie-popular-list
   */
  async getPopular(params?: PopularParams): Promise<MovieListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.region) queryParams["region"] = params.region;

    const response = await this.axiosInstance.get("movie/popular", { params: queryParams });
    return response.data;
  }

  /**
   * Get a list of movies ordered by rating.
   * @see https://developer.themoviedb.org/reference/movie-top-rated-list
   */
  async getTopRated(params?: TopRatedParams): Promise<MovieListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.region) queryParams["region"] = params.region;

    const response = await this.axiosInstance.get("movie/top_rated", { params: queryParams });
    return response.data;
  }

  /**
   * Get a list of movies that are being released soon.
   * @see https://developer.themoviedb.org/reference/movie-upcoming-list
   */
  async getUpcoming(params?: UpcomingParams): Promise<MovieListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.region) queryParams["region"] = params.region;

    const response = await this.axiosInstance.get("movie/upcoming", { params: queryParams });
    return response.data;
  }

  /**
   * Get the top level details of a movie by ID.
   * @see https://developer.themoviedb.org/reference/movie-details
   */
  async getDetails(id: number, params?: MovieDetailsParams): Promise<MovieDetails> {
    const queryParams: Record<string, any> = {};
    if (params?.append_to_response) queryParams["append_to_response"] = [...new Set(params.append_to_response)].join(",");
    if (params?.language) queryParams["language"] = params.language;

    const response = await this.axiosInstance.get(`movie/${id}`, { params: queryParams });
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
    const queryParams: Record<string, any> = {};
    if (params?.session_id) queryParams["session_id"] = params.session_id;
    if (params?.guest_session_id) queryParams["guest_session_id"] = params.guest_session_id;

    const response = await this.axiosInstance.get(`movie/${id}/account_states`, { params: queryParams });
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
    const queryParams: Record<string, any> = {};
    if (params?.country) queryParams["country"] = params.country;

    const response = await this.axiosInstance.get(`movie/${id}/alternative_titles`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the recent changes for a movie.
   * @see https://developer.themoviedb.org/reference/movie-changes
   */
  async getChanges(id: number, params?: MovieChangesParams): Promise<MovieChangesResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.end_date) queryParams["end_date"] = params.end_date;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.start_date) queryParams["start_date"] = params.start_date;

    const response = await this.axiosInstance.get(`movie/${id}/changes`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the cast and crew for a movie.
   * @see https://developer.themoviedb.org/reference/movie-credits
   */
  async getCredits(id: number, params?: MovieCreditsParams): Promise<MovieCreditsResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;

    const response = await this.axiosInstance.get(`movie/${id}/credits`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the external IDs for a movie (IMDb, Facebook, etc.).
   * @see https://developer.themoviedb.org/reference/movie-external-ids
   */
  async getExternalIds(id: number): Promise<MovieExternalIdsResponse> {
    const response = await this.axiosInstance.get(`movie/${id}/external_ids`);
    return response.data;
  }

  /**
   * Get the images (backdrops, posters, logos) that belong to a movie.
   * @see https://developer.themoviedb.org/reference/movie-images
   */
  async getImages(id: number, params?: MovieImagesParams): Promise<MovieImagesResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.include_image_language) queryParams["include_image_language"] = params.include_image_language;
    if (params?.language) queryParams["language"] = params.language;

    const response = await this.axiosInstance.get(`movie/${id}/images`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the keywords for a movie.
   * @see https://developer.themoviedb.org/reference/movie-keywords
   */
  async getKeywords(id: number): Promise<MovieKeywordsResponse> {
    const response = await this.axiosInstance.get(`movie/${id}/keywords`);
    return response.data;
  }

  /**
   * Get the newest movie ID.
   * @see https://developer.themoviedb.org/reference/movie-latest-id
   */
  async getLatest(): Promise<MovieDetails> {
    const response = await this.axiosInstance.get("movie/latest");
    return response.data;
  }

  /**
   * Get the lists that a movie has been added to.
   * @see https://developer.themoviedb.org/reference/movie-lists
   */
  async getLists(id: number, params?: MovieListsParams): Promise<MovieListsResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get(`movie/${id}/lists`, { params: queryParams });
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
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get(`movie/${id}/recommendations`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the release dates and certifications for a movie.
   * @see https://developer.themoviedb.org/reference/movie-release-dates
   */
  async getReleaseDates(id: number): Promise<MovieReleaseDatesResponse> {
    const response = await this.axiosInstance.get(`movie/${id}/release_dates`);
    return response.data;
  }

  /**
   * Get the user reviews for a movie.
   * @see https://developer.themoviedb.org/reference/movie-reviews
   */
  async getReviews(id: number, params?: MovieReviewsParams): Promise<MovieReviewsResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get(`movie/${id}/reviews`, { params: queryParams });
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
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get(`movie/${id}/similar`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the translations for a movie.
   * @see https://developer.themoviedb.org/reference/movie-translations
   */
  async getTranslations(id: number): Promise<MovieTranslationsResponse> {
    const response = await this.axiosInstance.get(`movie/${id}/translations`);
    return response.data;
  }

  /**
   * Get the videos that have been added to a movie.
   * @see https://developer.themoviedb.org/reference/movie-videos
   */
  async getVideos(id: number, params?: MovieVideosParams): Promise<MovieVideosResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;

    const response = await this.axiosInstance.get(`movie/${id}/videos`, { params: queryParams });
    return response.data;
  }

  /**
   * Get the list of streaming providers for a movie.
   * @see https://developer.themoviedb.org/reference/movie-watch-providers
   */
  async getWatchProviders(id: number): Promise<MovieWatchProvidersResponse> {
    const response = await this.axiosInstance.get(`movie/${id}/watch/providers`);
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
    const queryParams: Record<string, any> = {};
    if (params.session_id) queryParams["session_id"] = params.session_id;
    if (params.guest_session_id) queryParams["guest_session_id"] = params.guest_session_id;

    const response = await this.axiosInstance.post(
      `movie/${id}/rating`,
      request,
      { params: queryParams }
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
    const queryParams: Record<string, any> = {};
    if (params.session_id) queryParams["session_id"] = params.session_id;
    if (params.guest_session_id) queryParams["guest_session_id"] = params.guest_session_id;

    const response = await this.axiosInstance.delete(
      `movie/${id}/rating`,
      { params: queryParams }
    );
    return response.data;
  }
}
