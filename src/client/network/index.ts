import { type AxiosInstance } from "axios";
import {
  type NetworkDetails,
  type NetworkAlternativeNamesResponse,
  type NetworkImagesResponse,
} from "../../types/network.ts";

export class NetworkClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get the details of a TV network by ID.
   * @see https://developer.themoviedb.org/reference/network-details
   */
  async getDetails(networkId: number): Promise<NetworkDetails> {
    const response = await this.axiosInstance.get(`network/${networkId}`);
    return response.data;
  }

  /**
   * Get the alternative names of a network.
   * @see https://developer.themoviedb.org/reference/alternative-names-copy
   */
  async getAlternativeNames(networkId: number): Promise<NetworkAlternativeNamesResponse> {
    const response = await this.axiosInstance.get(`network/${networkId}/alternative_names`);
    return response.data;
  }

  /**
   * Get the TV network logos by ID.
   * @see https://developer.themoviedb.org/reference/alternative-names-copy
   */
  async getImages(networkId: number): Promise<NetworkImagesResponse> {
    const response = await this.axiosInstance.get(`network/${networkId}/images`);
    return response.data;
  }
}
