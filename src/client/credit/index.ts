import { type AxiosInstance } from "axios";
import { type CreditDetails } from "../../types/credit.js";

export class CreditClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get a movie or TV credit details by ID.
   * @see https://developer.themoviedb.org/reference/credit-details
   */
  async getDetails(creditId: string): Promise<CreditDetails> {
    const response = await this.axiosInstance.get(`credit/${creditId}`);
    return response.data;
  }
}
