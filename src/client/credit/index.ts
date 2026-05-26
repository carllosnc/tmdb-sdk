import { type HttpClient } from "../../http/types.js";
import { type CreditDetails } from "../../types/credit.js";

export class CreditClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get a movie or TV credit details by ID.
   * @see https://developer.themoviedb.org/reference/credit-details
   */
  async getDetails(creditId: string): Promise<CreditDetails> {
    const response = await this.httpClient.get(`credit/${creditId}`);
    return response.data;
  }
}
