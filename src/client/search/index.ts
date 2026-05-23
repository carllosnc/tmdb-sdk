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

export class SearchClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Search for collections by their original, translated and alternative names.
   * @see https://developer.themoviedb.org/reference/search-collection
   */
  async searchCollections(
    params: SearchCollectionParams
  ): Promise<SearchCollectionResponse> {
    const queryParams: Record<string, any> = { query: params.query };
    if (params.includeAdult !== undefined) queryParams["include_adult"] = params.includeAdult;
    if (params.language) queryParams["language"] = params.language;
    if (params.page) queryParams["page"] = params.page;
    if (params.region) queryParams["region"] = params.region;

    const response = await this.axiosInstance.get("search/collection", {
      params: queryParams,
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
    const queryParams: Record<string, any> = { query: params.query };
    if (params.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get("search/company", {
      params: queryParams,
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
    const queryParams: Record<string, any> = { query: params.query };
    if (params.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get("search/keyword", {
      params: queryParams,
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
    const queryParams: Record<string, any> = { query: params.query };
    if (params.includeAdult !== undefined) queryParams["include_adult"] = params.includeAdult;
    if (params.language) queryParams["language"] = params.language;
    if (params.primaryReleaseYear) queryParams["primary_release_year"] = params.primaryReleaseYear;
    if (params.page) queryParams["page"] = params.page;
    if (params.region) queryParams["region"] = params.region;
    if (params.year) queryParams["year"] = params.year;

    const response = await this.axiosInstance.get("search/movie", {
      params: queryParams,
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
    const queryParams: Record<string, any> = { query: params.query };
    if (params.includeAdult !== undefined) queryParams["include_adult"] = params.includeAdult;
    if (params.language) queryParams["language"] = params.language;
    if (params.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get("search/multi", {
      params: queryParams,
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
    const queryParams: Record<string, any> = { query: params.query };
    if (params.includeAdult !== undefined) queryParams["include_adult"] = params.includeAdult;
    if (params.language) queryParams["language"] = params.language;
    if (params.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get("search/person", {
      params: queryParams,
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
    const queryParams: Record<string, any> = { query: params.query };
    if (params.firstAirDateYear) queryParams["first_air_date_year"] = params.firstAirDateYear;
    if (params.includeAdult !== undefined) queryParams["include_adult"] = params.includeAdult;
    if (params.language) queryParams["language"] = params.language;
    if (params.page) queryParams["page"] = params.page;
    if (params.year) queryParams["year"] = params.year;

    const response = await this.axiosInstance.get("search/tv", {
      params: queryParams,
    });
    return response.data;
  }
}
