import { type HttpClient } from "../../http/types.js";
import { type CertificationsResponse } from "../../types/certification.js";

export class CertificationClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get an up to date list of the officially supported movie certifications on TMDB.
   * @see https://developer.themoviedb.org/reference/certification-movie-list
   */
  async getMovieCertifications(): Promise<CertificationsResponse> {
    const response = await this.httpClient.get("certification/movie/list");
    return response.data;
  }

  /**
   * Get an up to date list of the officially supported TV certifications on TMDB.
   * @see https://developer.themoviedb.org/reference/certification-tv-list
   */
  async getTVCertifications(): Promise<CertificationsResponse> {
    const response = await this.httpClient.get("certification/tv/list");
    return response.data;
  }
}
