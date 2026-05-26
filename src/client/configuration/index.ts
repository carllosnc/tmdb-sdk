import { type HttpClient } from "../../http/types.js";
import {
  type ConfigurationDetails,
  type CountryInfo,
  type GetCountriesParams,
  type JobDepartment,
  type LanguageInfo,
  type TimezoneInfo,
} from "../../types/configuration.js";
import { ImageUrlBuilder } from "../../utils/image.js";

export class ConfigurationClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Query the API configuration details.
   * @see https://developer.themoviedb.org/reference/configuration-details
   */
  async getDetails(): Promise<ConfigurationDetails> {
    const response = await this.httpClient.get("configuration");
    return response.data;
  }

  /**
   * Get an ImageUrlBuilder pre-configured with the current API configuration.
   * @see https://developer.themoviedb.org/reference/configuration-details
   */
  async getImageBuilder(): Promise<ImageUrlBuilder> {
    const config = await this.getDetails();
    return ImageUrlBuilder.fromConfiguration(config.images);
  }

  /**
   * Get the list of countries (ISO 3166-1 tags) used throughout TMDB.
   * @see https://developer.themoviedb.org/reference/configuration-countries
   */
  async getCountries(
    params?: GetCountriesParams
  ): Promise<CountryInfo[]> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;

    const response = await this.httpClient.get(
      "configuration/countries",
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the list of the jobs and departments we use on TMDB.
   * @see https://developer.themoviedb.org/reference/configuration-jobs
   */
  async getJobs(): Promise<JobDepartment[]> {
    const response = await this.httpClient.get("configuration/jobs");
    return response.data;
  }

  /**
   * Get the list of languages (ISO 639-1 tags) used throughout TMDB.
   * @see https://developer.themoviedb.org/reference/configuration-languages
   */
  async getLanguages(): Promise<LanguageInfo[]> {
    const response = await this.httpClient.get("configuration/languages");
    return response.data;
  }

  /**
   * Get a list of the officially supported translations on TMDB.
   * @see https://developer.themoviedb.org/reference/configuration-primary-translations
   */
  async getPrimaryTranslations(): Promise<string[]> {
    const response = await this.httpClient.get(
      "configuration/primary_translations"
    );
    return response.data;
  }

  /**
   * Get the list of timezones used throughout TMDB.
   * @see https://developer.themoviedb.org/reference/configuration-timezones
   */
  async getTimezones(): Promise<TimezoneInfo[]> {
    const response = await this.httpClient.get("configuration/timezones");
    return response.data;
  }
}
