import { type HttpClient } from "../../http/types.js";
import { type ReviewDetails } from "../../types/review.js";

export class ReviewClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve the details of a movie or TV show review.
   * @see https://developer.themoviedb.org/reference/review-details
   */
  async getDetails(reviewId: string): Promise<ReviewDetails> {
    const response = await this.httpClient.get(`review/${reviewId}`);
    return response.data;
  }
}
