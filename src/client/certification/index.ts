import { type AxiosInstance } from "axios";
import { type CertificationsResponse } from "../../types/certification.ts";

export class CertificationClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get an up to date list of the officially supported movie certifications on TMDB.
   * @see https://developer.themoviedb.org/reference/certification-movie-list
   */
  async getMovieCertifications(): Promise<CertificationsResponse> {
    const response = await this.axiosInstance.get("certification/movie/list");
    return response.data;
  }

  /**
   * Get an up to date list of the officially supported TV certifications on TMDB.
   * @see https://developer.themoviedb.org/reference/certification-tv-list
   */
  async getTVCertifications(): Promise<CertificationsResponse> {
    const response = await this.axiosInstance.get("certification/tv/list");
    return response.data;
  }
}
