import { type HttpClient } from "../../http/types.js";
import {
  type NetworkDetails,
  type NetworkAlternativeNamesResponse,
  type NetworkImagesResponse,
} from "../../types/network.js";

export class NetworkClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get the details of a TV network by ID.
   * @see https://developer.themoviedb.org/reference/network-details
   */
  async getDetails(networkId: number): Promise<NetworkDetails> {
    const response = await this.httpClient.get(`network/${networkId}`);
    return response.data;
  }

  /**
   * Get the alternative names of a network.
   * @see https://developer.themoviedb.org/reference/network-alternative-names
   */
  async getAlternativeNames(networkId: number): Promise<NetworkAlternativeNamesResponse> {
    const response = await this.httpClient.get(`network/${networkId}/alternative_names`);
    return response.data;
  }

  /**
   * Get the TV network logos by ID.
   * @see https://developer.themoviedb.org/reference/network-images
   */
  async getImages(networkId: number): Promise<NetworkImagesResponse> {
    const response = await this.httpClient.get(`network/${networkId}/images`);
    return response.data;
  }
}
