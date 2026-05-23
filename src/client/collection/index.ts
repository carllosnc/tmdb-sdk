import { type AxiosInstance } from "axios";
import {
  type CollectionDetails,
  type CollectionImagesResponse,
  type CollectionTranslationsResponse,
  type GetCollectionDetailsParams,
  type GetCollectionImagesParams,
} from "../../types/collection.js";

export class CollectionClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get collection details by ID.
   * @see https://developer.themoviedb.org/reference/collection-details
   */
  async getDetails(
    collectionId: number,
    params?: GetCollectionDetailsParams
  ): Promise<CollectionDetails> {
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;

    const response = await this.axiosInstance.get(
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
    const queryParams: Record<string, any> = {};
    if (params?.language) queryParams["language"] = params.language;
    if (params?.includeImageLanguage) queryParams["include_image_language"] = params.includeImageLanguage;

    const response = await this.axiosInstance.get(
      `collection/${collectionId}/images`,
      { params: queryParams }
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
    const response = await this.axiosInstance.get(
      `collection/${collectionId}/translations`
    );
    return response.data;
  }
}
