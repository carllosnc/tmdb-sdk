import { type HttpClient } from "../../http/types.js";
import {
  type V4CreateAccessTokenRequest,
  type V4CreateAccessTokenResponse,
  type V4CreateRequestTokenParams,
  type V4CreateRequestTokenResponse,
  type V4LogoutRequest,
  type V4LogoutResponse,
} from "../../types/auth-v4.js";

export class AuthV4Client {
  constructor(private httpClient: HttpClient) {}

  /**
   * Generate a new request token to ask a user to approve.
   * @see https://developer.themoviedb.org/v4/reference/auth-create-request-token
   */
  async createRequestToken(
    params?: V4CreateRequestTokenParams
  ): Promise<V4CreateRequestTokenResponse> {
    const response = await this.httpClient.post(
      "/4/auth/request_token",
      params?.redirect_to ? { redirect_to: params.redirect_to } : undefined
    );
    return response.data;
  }

  /**
   * Finish the user authentication flow and issue an official user access token.
   * @see https://developer.themoviedb.org/v4/reference/auth-create-access-token
   */
  async createAccessToken(
    request: V4CreateAccessTokenRequest
  ): Promise<V4CreateAccessTokenResponse> {
    const response = await this.httpClient.post(
      "/4/auth/access_token",
      request
    );
    return response.data;
  }

  /**
   * Log out of a session by invalidating an access token.
   * @see https://developer.themoviedb.org/v4/reference/auth-logout
   */
  async logout(
    request: V4LogoutRequest
  ): Promise<V4LogoutResponse> {
    const response = await this.httpClient.delete(
      "/4/auth/access_token",
      { data: request }
    );
    return response.data;
  }
}
