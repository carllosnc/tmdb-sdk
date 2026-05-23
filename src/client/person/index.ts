import { type AxiosInstance } from "axios";
import {
  type PopularPersonResponse,
  type PopularPersonParams,
} from "../../types/person.ts";

export class PersonClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get a list of people ordered by popularity.
   * @see https://developer.themoviedb.org/reference/person-popular-list
   */
  async getPopular(params?: PopularPersonParams): Promise<PopularPersonResponse> {
    const response = await this.axiosInstance.get("person/popular", { params });
    return response.data;
  }
}
