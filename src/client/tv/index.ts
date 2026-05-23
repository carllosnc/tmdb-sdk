import { type AxiosInstance } from "axios";
import {
  type TvAiringTodayParams,
  type TvListResponse,
  type TvOnTheAirParams,
  type TvPopularParams,
  type TvTopRatedParams,
} from "../../types/tv.ts";

export class TvClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get a list of TV shows airing today.
   * @see https://developer.themoviedb.org/reference/tv-series-airing-today-list
   */
  async getAiringToday(params?: TvAiringTodayParams): Promise<TvListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.timezone) queryParams["timezone"] = params.timezone;

    const response = await this.axiosInstance.get("tv/airing_today", { params: queryParams });
    return response.data;
  }

  /**
   * Get a list of TV shows that air in the next 7 days.
   * @see https://developer.themoviedb.org/reference/tv-series-on-the-air-list
   */
  async getOnTheAir(params?: TvOnTheAirParams): Promise<TvListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;
    if (params?.timezone) queryParams["timezone"] = params.timezone;

    const response = await this.axiosInstance.get("tv/on_the_air", { params: queryParams });
    return response.data;
  }

  /**
   * Get a list of TV shows ordered by popularity.
   * @see https://developer.themoviedb.org/reference/tv-series-popular-list
   */
  async getPopular(params?: TvPopularParams): Promise<TvListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get("tv/popular", { params: queryParams });
    return response.data;
  }

  /**
   * Get a list of TV shows ordered by rating.
   * @see https://developer.themoviedb.org/reference/tv-series-top-rated-list
   */
  async getTopRated(params?: TvTopRatedParams): Promise<TvListResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get("tv/top_rated", { params: queryParams });
    return response.data;
  }
}
