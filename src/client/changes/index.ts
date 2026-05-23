import { type AxiosInstance } from "axios";
import {
  type GetMovieChangesParams,
  type GetPersonChangesParams,
  type GetTVChangesParams,
  type MovieChangesResponse,
  type PersonChangesResponse,
  type TVChangesResponse,
} from "../../types/changes.ts";

export class ChangesClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get a list of all movie IDs that have been changed in the past 24 hours.
   * You can query up to 14 days at a time using start_date and end_date. 100 items per page.
   * @see https://developer.themoviedb.org/reference/changes-movie-list
   */
  async getMovieList(
    params?: GetMovieChangesParams
  ): Promise<MovieChangesResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.startDate) queryParams["start_date"] = params.startDate;
    if (params?.endDate) queryParams["end_date"] = params.endDate;
    if (params?.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get("movie/changes", {
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
  ): Promise<PersonChangesResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.startDate) queryParams["start_date"] = params.startDate;
    if (params?.endDate) queryParams["end_date"] = params.endDate;
    if (params?.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get("person/changes", {
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

    const response = await this.axiosInstance.get("tv/changes", {
      params: queryParams,
    });
    return response.data;
  }
}
