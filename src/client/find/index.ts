import { type AxiosInstance } from "axios";
import {
  type FindByIdParams,
  type FindByIdResponse,
} from "../../types/find.ts";

export class FindClient {
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Find data by external ID's.
   * @see https://developer.themoviedb.org/reference/find-by-id
   */
  async findById(
    externalId: string,
    params: FindByIdParams
  ): Promise<FindByIdResponse> {
    const queryParams: Record<string, any> = {
      external_source: params.externalSource,
    };
    if (params.language) queryParams["language"] = params.language;

    const response = await this.axiosInstance.get(
      `find/${externalId}`,
      { params: queryParams }
    );
    return response.data;
  }
}
