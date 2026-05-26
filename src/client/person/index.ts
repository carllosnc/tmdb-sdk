import { type AxiosInstance } from "axios";
import {
  type PopularPersonResponse,
  type PopularPersonParams,
  type PersonAppendToResponseResult,
  type PersonAppendToResponseValue,
  type PersonDetails,
  type PersonDetailsParams,
  type PersonChangesResponse,
  type PersonChangesParams,
  type CombinedCreditsResponse,
  type CombinedCreditsParams,
  type PersonExternalIds,
  type PersonImagesResponse,
  type PersonMovieCreditsResponse,
  type PersonMovieCreditsParams,
  type PersonTvCreditsResponse,
  type PersonTvCreditsParams,
  type PersonTaggedImagesResponse,
  type PersonTaggedImagesParams,
  type PersonTranslationsResponse,
} from "../../types/person.js";

export class PersonClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get a list of people ordered by popularity.
   * @see https://developer.themoviedb.org/reference/person-popular-list
   */
  async getPopular(params?: PopularPersonParams): Promise<PopularPersonResponse> {
    const response = await this.axiosInstance.get("person/popular", { params });
    return response.data;
  }

  /**
   * Query the top level details of a person.
   * @see https://developer.themoviedb.org/reference/person-details
   */
  async getDetails<T extends readonly PersonAppendToResponseValue[] = never>(
    personId: number,
    params?: PersonDetailsParams & { append_to_response?: T }
  ): Promise<PersonAppendToResponseResult<T>> {
    const queryParams: Record<string, any> = {};
    if (params?.append_to_response) queryParams["append_to_response"] = [...new Set(params.append_to_response)].join(",");
    if (params?.language) queryParams["language"] = params.language;

    const response = await this.axiosInstance.get(`person/${personId}`, {
      params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
    });
    return response.data;
  }

  /**
   * Get the recent changes for a person.
   * @see https://developer.themoviedb.org/reference/person-changes
   */
  async getChanges(personId: number, params?: PersonChangesParams): Promise<PersonChangesResponse> {
    const response = await this.axiosInstance.get(`person/${personId}/changes`, { params });
    return response.data;
  }

  /**
   * Get the combined movie and TV credits that belong to a person.
   * @see https://developer.themoviedb.org/reference/person-combined-credits
   */
  async getCombinedCredits(personId: number, params?: CombinedCreditsParams): Promise<CombinedCreditsResponse> {
    const response = await this.axiosInstance.get(`person/${personId}/combined_credits`, { params });
    return response.data;
  }

  /**
   * Get the external ID's that belong to a person.
   * @see https://developer.themoviedb.org/reference/person-external-ids
   */
  async getExternalIds(personId: number): Promise<PersonExternalIds> {
    const response = await this.axiosInstance.get(`person/${personId}/external_ids`);
    return response.data;
  }

  /**
   * Get the profile images that belong to a person.
   * @see https://developer.themoviedb.org/reference/person-images
   */
  async getImages(personId: number): Promise<PersonImagesResponse> {
    const response = await this.axiosInstance.get(`person/${personId}/images`);
    return response.data;
  }

  /**
   * Get the newest created person.
   * @see https://developer.themoviedb.org/reference/person-latest-id
   */
  async getLatest(): Promise<PersonDetails> {
    const response = await this.axiosInstance.get("person/latest");
    return response.data;
  }

  /**
   * Get the movie credits for a person.
   * @see https://developer.themoviedb.org/reference/person-movie-credits
   */
  async getMovieCredits(personId: number, params?: PersonMovieCreditsParams): Promise<PersonMovieCreditsResponse> {
    const response = await this.axiosInstance.get(`person/${personId}/movie_credits`, { params });
    return response.data;
  }

  /**
   * Get the TV credits that belong to a person.
   * @see https://developer.themoviedb.org/reference/person-tv-credits
   */
  async getTvCredits(personId: number, params?: PersonTvCreditsParams): Promise<PersonTvCreditsResponse> {
    const response = await this.axiosInstance.get(`person/${personId}/tv_credits`, { params });
    return response.data;
  }

  /**
   * Get the tagged images for a person.
   * @see https://developer.themoviedb.org/reference/person-tagged-images
   */
  async getTaggedImages(personId: number, params?: PersonTaggedImagesParams): Promise<PersonTaggedImagesResponse> {
    const response = await this.axiosInstance.get(`person/${personId}/tagged_images`, { params });
    return response.data;
  }

  /**
   * Get the translations that belong to a person.
   * @see https://developer.themoviedb.org/reference/translations
   */
  async getTranslations(personId: number): Promise<PersonTranslationsResponse> {
    const response = await this.axiosInstance.get(`person/${personId}/translations`);
    return response.data;
  }
}
