import { type HttpClient } from "../../http/types.js";
import {
  type GuestSessionRatedMoviesParams,
  type GuestSessionRatedMoviesResponse,
  type GuestSessionRatedTvEpisodesParams,
  type GuestSessionRatedTvEpisodesResponse,
  type GuestSessionRatedTvParams,
  type GuestSessionRatedTvResponse,
} from "../../types/guest-session.js";

export class GuestSessionClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get the rated movies for a guest session.
   * @see https://developer.themoviedb.org/reference/guest-session-rated-movies
   */
  async getRatedMovies(
    guestSessionId: string,
    params?: GuestSessionRatedMoviesParams
  ): Promise<GuestSessionRatedMoviesResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.sortBy) queryParams["sort_by"] = params.sortBy;

    const response = await this.httpClient.get(
      `guest_session/${guestSessionId}/rated/movies`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the rated TV shows for a guest session.
   * @see https://developer.themoviedb.org/reference/guest-session-rated-tv
   */
  async getRatedTvShows(
    guestSessionId: string,
    params?: GuestSessionRatedTvParams
  ): Promise<GuestSessionRatedTvResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.sortBy) queryParams["sort_by"] = params.sortBy;

    const response = await this.httpClient.get(
      `guest_session/${guestSessionId}/rated/tv`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the rated TV episodes for a guest session.
   * @see https://developer.themoviedb.org/reference/guest-session-rated-tv-episodes
   */
  async getRatedTvEpisodes(
    guestSessionId: string,
    params?: GuestSessionRatedTvEpisodesParams
  ): Promise<GuestSessionRatedTvEpisodesResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.sortBy) queryParams["sort_by"] = params.sortBy;

    const response = await this.httpClient.get(
      `guest_session/${guestSessionId}/rated/tv/episodes`,
      { params: queryParams }
    );
    return response.data;
  }
}
