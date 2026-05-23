import { type AxiosInstance } from "axios";
import {
  type ConfigurationDetails,
  type CountryInfo,
  type GetCountriesParams,
  type JobDepartment,
  type LanguageInfo,
  type TimezoneInfo,
} from "../../types/configuration.js";

export class ConfigurationClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Query the API configuration details.
   * @see https://developer.themoviedb.org/reference/configuration-details
   */
  async getDetails(): Promise<ConfigurationDetails> {
    const response = await this.axiosInstance.get("configuration");
    return response.data;
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

    const response = await this.axiosInstance.get(
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
    const response = await this.axiosInstance.get("configuration/jobs");
    return response.data;
  }

  /**
   * Get the list of languages (ISO 639-1 tags) used throughout TMDB.
   * @see https://developer.themoviedb.org/reference/configuration-languages
   */
  async getLanguages(): Promise<LanguageInfo[]> {
    const response = await this.axiosInstance.get("configuration/languages");
    return response.data;
  }

  /**
   * Get a list of the officially supported translations on TMDB.
   * @see https://developer.themoviedb.org/reference/configuration-primary-translations
   */
  async getPrimaryTranslations(): Promise<string[]> {
    const response = await this.axiosInstance.get(
      "configuration/primary_translations"
    );
    return response.data;
  }

  /**
   * Get the list of timezones used throughout TMDB.
   * @see https://developer.themoviedb.org/reference/configuration-timezones
   */
  async getTimezones(): Promise<TimezoneInfo[]> {
    const response = await this.axiosInstance.get("configuration/timezones");
    return response.data;
  }
}
