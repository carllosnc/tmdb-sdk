import { type AxiosInstance } from "axios";
import {
  type ListDetails,
  type ListDetailsParams,
  type CreateListRequest,
  type CreateListParams,
  type CreateListResponse,
  type AddMovieParams,
  type AddMovieRequest,
  type RemoveMovieParams,
  type RemoveMovieRequest,
  type CheckItemStatusParams,
  type CheckItemStatusResponse,
  type ClearListParams,
  type DeleteListParams,
  type ListStatusResponse,
} from "../../types/list.ts";

export class ListClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Get list details by ID.
   * @see https://developer.themoviedb.org/reference/list-details
   */
  async getDetails(params: ListDetailsParams): Promise<ListDetails> {
    const queryParams: Record<string, any> = {};
    if (params.language) queryParams["language"] = params.language;
    if (params.page) queryParams["page"] = params.page;

    const response = await this.axiosInstance.get(`list/${params.listId}`, { params: queryParams });
    return response.data;
  }

  /**
   * Create a new list.
   * @see https://developer.themoviedb.org/reference/list-create
   */
  async create(
    params: CreateListParams,
    request: CreateListRequest
  ): Promise<CreateListResponse> {
    const response = await this.axiosInstance.post(
      "list",
      request,
      { params: { session_id: params.sessionId } }
    );
    return response.data;
  }

  /**
   * Add a movie to a list.
   * @see https://developer.themoviedb.org/reference/list-add-movie
   */
  async addMovie(
    params: AddMovieParams,
    request: AddMovieRequest
  ): Promise<ListStatusResponse> {
    const response = await this.axiosInstance.post(
      `list/${params.listId}/add_item`,
      request,
      { params: { session_id: params.sessionId } }
    );
    return response.data;
  }

  /**
   * Remove a movie from a list.
   * @see https://developer.themoviedb.org/reference/list-remove-movie
   */
  async removeMovie(
    params: RemoveMovieParams,
    request: RemoveMovieRequest
  ): Promise<ListStatusResponse> {
    const response = await this.axiosInstance.post(
      `list/${params.listId}/remove_item`,
      request,
      { params: { session_id: params.sessionId } }
    );
    return response.data;
  }

  /**
   * Check if an item has already been added to the list.
   * @see https://developer.themoviedb.org/reference/list-check-item-status
   */
  async checkItemStatus(params: CheckItemStatusParams): Promise<CheckItemStatusResponse> {
    const queryParams: Record<string, any> = {};
    if (params.language) queryParams["language"] = params.language;
    if (params.movieId) queryParams["movie_id"] = params.movieId;

    const response = await this.axiosInstance.get(
      `list/${params.listId}/item_status`,
      { params: queryParams }
    );
    return response.data;
  }

  /**
   * Clear all items from a list.
   * @see https://developer.themoviedb.org/reference/list-clear
   */
  async clear(params: ClearListParams): Promise<ListStatusResponse> {
    const response = await this.axiosInstance.post(
      `list/${params.listId}/clear`,
      null,
      {
        params: {
          session_id: params.sessionId,
          confirm: params.confirm,
        },
      }
    );
    return response.data;
  }

  /**
   * Delete a list.
   * @see https://developer.themoviedb.org/reference/list-delete
   */
  async delete(params: DeleteListParams): Promise<ListStatusResponse> {
    const response = await this.axiosInstance.delete(
      `list/${params.listId}`,
      { params: { session_id: params.sessionId } }
    );
    return response.data;
  }
}
