import { type AxiosInstance } from "axios";
import {
  type SearchCollectionParams,
  type SearchCollectionResponse,
  type SearchCompanyParams,
  type SearchCompanyResponse,
  type SearchKeywordParams,
  type SearchKeywordResponse,
  type SearchMovieParams,
  type SearchMovieResponse,
  type SearchMultiParams,
  type SearchMultiResponse,
  type SearchPersonParams,
  type SearchPersonResponse,
  type SearchTvParams,
  type SearchTvResponse,
} from "../../types/search.js";
import { buildQueryParams } from "../../utils/query.js";

export class SearchClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Search for collections by their original, translated and alternative names.
   * @see https://developer.themoviedb.org/reference/search-collection
   */
  async searchCollections(
    params: SearchCollectionParams
  ): Promise<SearchCollectionResponse> {
    const response = await this.axiosInstance.get("search/collection", {
      params: buildQueryParams(params),
    });
    return response.data;
  }

  /**
   * Search for companies by their original and alternative names.
   * @see https://developer.themoviedb.org/reference/search-company
   */
  async searchCompanies(
    params: SearchCompanyParams
  ): Promise<SearchCompanyResponse> {
    const response = await this.axiosInstance.get("search/company", {
      params: buildQueryParams(params),
    });
    return response.data;
  }

  /**
   * Search for keywords by their name.
   * @see https://developer.themoviedb.org/reference/search-keyword
   */
  async searchKeywords(
    params: SearchKeywordParams
  ): Promise<SearchKeywordResponse> {
    const response = await this.axiosInstance.get("search/keyword", {
      params: buildQueryParams(params),
    });
    return response.data;
  }

  /**
   * Search for movies by their original, translated and alternative titles.
   * @see https://developer.themoviedb.org/reference/search-movie
   */
  async searchMovies(
    params: SearchMovieParams
  ): Promise<SearchMovieResponse> {
    const response = await this.axiosInstance.get("search/movie", {
      params: buildQueryParams(params),
    });
    return response.data;
  }

  /**
   * Search for movies, TV shows and people in a single request.
   * @see https://developer.themoviedb.org/reference/search-multi
   */
  async searchMulti(
    params: SearchMultiParams
  ): Promise<SearchMultiResponse> {
    const response = await this.axiosInstance.get("search/multi", {
      params: buildQueryParams(params),
    });
    return response.data;
  }

  /**
   * Search for people by their name and also known as names.
   * @see https://developer.themoviedb.org/reference/search-person
   */
  async searchPeople(
    params: SearchPersonParams
  ): Promise<SearchPersonResponse> {
    const response = await this.axiosInstance.get("search/person", {
      params: buildQueryParams(params),
    });
    return response.data;
  }

  /**
   * Search for TV shows by their original, translated and also known as names.
   * @see https://developer.themoviedb.org/reference/search-tv
   */
  async searchTvShows(
    params: SearchTvParams
  ): Promise<SearchTvResponse> {
    const response = await this.axiosInstance.get("search/tv", {
      params: buildQueryParams(params),
    });
    return response.data;
  }
}
