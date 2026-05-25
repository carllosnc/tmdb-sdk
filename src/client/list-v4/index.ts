import { type AxiosInstance } from "axios";
import {
  type V4AddItemsRequest,
  type V4ClearListResponse,
  type V4CreateListRequest,
  type V4CreateListResponse,
  type V4DeleteListResponse,
  type V4ItemStatusParams,
  type V4ItemStatusResponse,
  type V4ListActionResponse,
  type V4ListDetails,
  type V4ListDetailsParams,
  type V4RemoveItemsRequest,
  type V4UpdateItemsRequest,
  type V4UpdateListRequest,
} from "../../types/list-v4.js";
import { buildQueryParams } from "../../utils/query.js";

export class ListV4Client {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Retrieve a list by id.
   * @see https://developer.themoviedb.org/v4/reference/list-details
   */
  async getDetails(
    listId: number,
    params?: V4ListDetailsParams
  ): Promise<V4ListDetails> {
    const response = await this.axiosInstance.get(
      `/4/list/${listId}`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }

  /**
   * Create a new list.
   * @see https://developer.themoviedb.org/v4/reference/list-create
   */
  async create(
    request: V4CreateListRequest
  ): Promise<V4CreateListResponse> {
    const response = await this.axiosInstance.post(
      "/4/list",
      request
    );
    return response.data;
  }

  /**
   * Update the details of a list.
   * @see https://developer.themoviedb.org/v4/reference/list-update
   */
  async update(
    listId: number,
    request: V4UpdateListRequest
  ): Promise<V4CreateListResponse> {
    const response = await this.axiosInstance.put(
      `/4/list/${listId}`,
      request
    );
    return response.data;
  }

  /**
   * Delete a list.
   * @see https://developer.themoviedb.org/v4/reference/list-delete
   */
  async delete(
    listId: number
  ): Promise<V4DeleteListResponse> {
    const response = await this.axiosInstance.delete(
      `/4/list/${listId}`
    );
    return response.data;
  }

  /**
   * Add items to a list.
   * @see https://developer.themoviedb.org/v4/reference/list-add-items
   */
  async addItems(
    listId: number,
    request: V4AddItemsRequest
  ): Promise<V4ListActionResponse> {
    const response = await this.axiosInstance.post(
      `/4/list/${listId}/items`,
      request
    );
    return response.data;
  }

  /**
   * Update individual items on a list.
   * @see https://developer.themoviedb.org/v4/reference/list-update-items
   */
  async updateItems(
    listId: number,
    request: V4UpdateItemsRequest
  ): Promise<V4ListActionResponse> {
    const response = await this.axiosInstance.put(
      `/4/list/${listId}/items`,
      request
    );
    return response.data;
  }

  /**
   * Remove items from a list.
   * @see https://developer.themoviedb.org/v4/reference/list-remove-items
   */
  async removeItems(
    listId: number,
    request: V4RemoveItemsRequest
  ): Promise<V4ListActionResponse> {
    const response = await this.axiosInstance.delete(
      `/4/list/${listId}/items`,
      { data: request }
    );
    return response.data;
  }

  /**
   * Clear all items from a list.
   * @see https://developer.themoviedb.org/v4/reference/list-clear
   */
  async clear(
    listId: number
  ): Promise<V4ClearListResponse> {
    const response = await this.axiosInstance.get(
      `/4/list/${listId}/clear`
    );
    return response.data;
  }

  /**
   * Check if an item is on a list.
   * @see https://developer.themoviedb.org/v4/reference/list-item-status
   */
  async getItemStatus(
    listId: number,
    params: V4ItemStatusParams
  ): Promise<V4ItemStatusResponse> {
    const response = await this.axiosInstance.get(
      `/4/list/${listId}/item_status`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }
}
