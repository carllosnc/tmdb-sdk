import { type HttpClient } from "../../http/types.js";
import {
  type CollectionDetails,
  type CollectionImagesResponse,
  type CollectionTranslationsResponse,
  type GetCollectionDetailsParams,
  type GetCollectionImagesParams,
} from "../../types/collection.js";
import { buildQueryParams } from "../../utils/query.js";

export class CollectionClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get collection details by ID.
   * @see https://developer.themoviedb.org/reference/collection-details
   */
  async getDetails(
    collectionId: number,
    params?: GetCollectionDetailsParams
  ): Promise<CollectionDetails> {
    const queryParams = buildQueryParams(params);
    if (queryParams.append_to_response) {
      queryParams.append_to_response = [...new Set(params!.append_to_response!)].join(",");
    }

    const response = await this.httpClient.get(
      `collection/${collectionId}`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Get the images (backdrops and posters) that belong to a collection.
   * @see https://developer.themoviedb.org/reference/collection-images
   */
  async getImages(
    collectionId: number,
    params?: GetCollectionImagesParams
  ): Promise<CollectionImagesResponse> {
    const response = await this.httpClient.get(
      `collection/${collectionId}/images`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Get the translations that belong to a collection.
   * @see https://developer.themoviedb.org/reference/collection-translations
   */
  async getTranslations(
    collectionId: number
  ): Promise<CollectionTranslationsResponse> {
    const response = await this.httpClient.get(
      `collection/${collectionId}/translations`
    );
    return response.data;
  }
}
