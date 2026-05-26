import { type HttpClient } from "../../http/types.js";
import {
  type GetMovieChangesParams,
  type GetPersonChangesParams,
  type GetTVChangesParams,
  type ChangedMoviesResponse,
  type ChangedPeopleResponse,
  type TVChangesResponse,
} from "../../types/changes.js";

export class ChangesClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get a list of all movie IDs that have been changed in the past 24 hours.
   * You can query up to 14 days at a time using start_date and end_date. 100 items per page.
   * @see https://developer.themoviedb.org/reference/changes-movie-list
   */
  async getMovieList(
    params?: GetMovieChangesParams
  ): Promise<ChangedMoviesResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.startDate) queryParams["start_date"] = params.startDate;
    if (params?.endDate) queryParams["end_date"] = params.endDate;
    if (params?.page) queryParams["page"] = params.page;

    const response = await this.httpClient.get("movie/changes", {
      params: queryParams,
    });
    return response.data;
  }

  /**
   * Get a list of all person IDs that have been changed in the past 24 hours.
   * You can query up to 14 days at a time using start_date and end_date. 100 items per page.
   * @see https://developer.themoviedb.org/reference/changes-people-list
   */
  async getPersonList(
    params?: GetPersonChangesParams
  ): Promise<ChangedPeopleResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.startDate) queryParams["start_date"] = params.startDate;
    if (params?.endDate) queryParams["end_date"] = params.endDate;
    if (params?.page) queryParams["page"] = params.page;

    const response = await this.httpClient.get("person/changes", {
      params: queryParams,
    });
    return response.data;
  }

  /**
   * Get a list of all TV IDs that have been changed in the past 24 hours.
   * You can query up to 14 days at a time using start_date and end_date. 100 items per page.
   * @see https://developer.themoviedb.org/reference/changes-tv-list
   */
  async getTVList(
    params?: GetTVChangesParams
  ): Promise<TVChangesResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.startDate) queryParams["start_date"] = params.startDate;
    if (params?.endDate) queryParams["end_date"] = params.endDate;
    if (params?.page) queryParams["page"] = params.page;

    const response = await this.httpClient.get("tv/changes", {
      params: queryParams,
    });
    return response.data;
  }
}
