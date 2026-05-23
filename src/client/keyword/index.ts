import { type AxiosInstance } from "axios";
import {
  type KeywordDetails,
  type KeywordMoviesParams,
  type KeywordMoviesResponse,
} from "../../types/keyword.ts";

export class KeywordClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get keyword details by ID.
   * @see https://developer.themoviedb.org/reference/keyword-details
   */
  async getDetails(keywordId: number): Promise<KeywordDetails> {
    const response = await this.axiosInstance.get(`keyword/${keywordId}`);
    return response.data;
  }

  /**
   * Get movies associated with a keyword.
   * @deprecated Use discover/movie with with_keywords instead.
   * @see https://developer.themoviedb.org/reference/keyword-movies
   */
  async getMovies(
    keywordId: number,
    params?: KeywordMoviesParams
  ): Promise<KeywordMoviesResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.includeAdult) queryParams["include_adult"] = params.includeAdult;
    if (params?.language) queryParams["language"] = params.language;
    if (params?.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get(
      `keyword/${keywordId}/movies`,
      { params: queryParams }
    );
    return response.data;
  }
}
