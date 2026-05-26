import { type HttpClient } from "../../http/types.js";
import {
  type FindByIdParams,
  type FindByIdResponse,
} from "../../types/find.js";
import { buildQueryParams } from "../../utils/query.js";

export class FindClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Find data by external ID's.
   * @see https://developer.themoviedb.org/reference/find-by-id
   */
  async findById(
    externalId: string,
    params: FindByIdParams
  ): Promise<FindByIdResponse> {
    const response = await this.httpClient.get(
      `find/${externalId}`,
      { params: buildQueryParams(params) }
    );
    return response.data;
  }
}
