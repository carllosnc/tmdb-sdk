import { type AxiosInstance } from "axios";
import type { TvEpisodeGroupDetails } from "../../types/tv.js";

export class TvEpisodeGroupClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get the details of a TV episode group by ID.
   * @see https://developer.themoviedb.org/reference/tv-episode-group-details
   */
  async getDetails(id: string): Promise<TvEpisodeGroupDetails> {
    const response = await this.axiosInstance.get(`tv/episode_group/${id}`);
    return response.data;
  }
}
