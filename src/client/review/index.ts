import { type AxiosInstance } from "axios";
import { type ReviewDetails } from "../../types/review.js";

export class ReviewClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Retrieve the details of a movie or TV show review.
   * @see https://developer.themoviedb.org/reference/review-details
   */
  async getDetails(reviewId: string): Promise<ReviewDetails> {
    const response = await this.axiosInstance.get(`review/${reviewId}`);
    return response.data;
  }
}
