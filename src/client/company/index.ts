import { type AxiosInstance } from "axios";
import {
  type CompanyAlternativeNamesResponse,
  type CompanyDetails,
  type CompanyImagesResponse,
} from "../../types/company.ts";

export class CompanyClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get the company details by ID.
   * @see https://developer.themoviedb.org/reference/company-details
   */
  async getDetails(companyId: number): Promise<CompanyDetails> {
    const response = await this.axiosInstance.get(`company/${companyId}`);
    return response.data;
  }

  /**
   * Get the alternative names for a company.
   * @see https://developer.themoviedb.org/reference/company-alternative-names
   */
  async getAlternativeNames(
    companyId: number
  ): Promise<CompanyAlternativeNamesResponse> {
    const response = await this.axiosInstance.get(
      `company/${companyId}/alternative_names`
    );
    return response.data;
  }

  /**
   * Get the logos for a company.
   * @see https://developer.themoviedb.org/reference/company-images
   */
  async getImages(companyId: number): Promise<CompanyImagesResponse> {
    const response = await this.axiosInstance.get(
      `company/${companyId}/images`
    );
    return response.data;
  }
}
