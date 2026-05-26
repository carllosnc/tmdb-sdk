import { type HttpClient } from "../../http/types.js";
import type { TvEpisodeGroupDetails } from "../../types/tv.js";

export class TvEpisodeGroupClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get the details of a TV episode group by ID.
   * @see https://developer.themoviedb.org/reference/tv-episode-group-details
   */
  async getDetails(id: string): Promise<TvEpisodeGroupDetails> {
    const response = await this.httpClient.get(`tv/episode_group/${id}`);
    return response.data;
  }
}
