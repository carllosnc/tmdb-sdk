import { type HttpClient } from "../../http/types.js";
import {
  type CreateSessionFromV4TokenRequest,
  type CreateSessionRequest,
  type DeleteSessionRequest,
  type GuestSession,
  type RequestToken,
  type Session,
  type SuccessResponse,
  type ValidateKeyResponse,
  type ValidateRequestTokenWithLoginRequest,
} from "../../types/authentication.js";

export class AuthenticationClient {
  constructor(private httpClient: HttpClient) {}

  /**
   * Validate the API key or access token.
   * @see https://developer.themoviedb.org/reference/authentication-validate-key
   */
  async validateKey(): Promise<ValidateKeyResponse> {
    const response = await this.httpClient.get("authentication");
    return response.data;
  }

  /**
   * Create a guest session.
   * Guest sessions expire after 60 minutes of inactivity.
   * @see https://developer.themoviedb.org/reference/authentication-create-guest-session
   */
  async createGuestSession(): Promise<GuestSession> {
    const response = await this.httpClient.get(
      "authentication/guest_session/new"
    );
    return response.data;
  }

  /**
   * Create a request token.
   * Step 1 of user login; use the token to authorize access on TMDB before creating a session.
   * @see https://developer.themoviedb.org/reference/authentication-create-request-token
   */
  async createRequestToken(): Promise<RequestToken> {
    const response = await this.httpClient.get("authentication/token/new");
    return response.data;
  }

  /**
   * Validate a request token with username and password.
   * Step 2 of user login; prefer browser authorization when possible.
   * @see https://developer.themoviedb.org/reference/authentication-create-session-from-login
   */
  async validateRequestTokenWithLogin(
    request: ValidateRequestTokenWithLoginRequest
  ): Promise<RequestToken> {
    const response = await this.httpClient.post(
      "authentication/token/validate_with_login",
      request
    );
    return response.data;
  }

  /**
   * Create a session.
   * Step 3 of user login; requires a request token validated on TMDB.
   * @see https://developer.themoviedb.org/reference/authentication-create-session
   */
  async createSession(request: CreateSessionRequest): Promise<Session> {
    const response = await this.httpClient.post(
      "authentication/session/new",
      request
    );
    return response.data;
  }

  /**
   * Create a session from a v4 access token.
   * Requires a user-authenticated v4 token; a read-only API token will not work.
   * @see https://developer.themoviedb.org/reference/authentication-create-session-from-v4-token
   */
  async createSessionFromV4Token(
    request: CreateSessionFromV4TokenRequest
  ): Promise<Session> {
    const response = await this.httpClient.post(
      "authentication/session/convert/4",
      request
    );
    return response.data;
  }

  /**
   * Delete a session.
   * @see https://developer.themoviedb.org/reference/authentication-delete-session
   */
  async deleteSession(request: DeleteSessionRequest): Promise<SuccessResponse> {
    const response = await this.httpClient.delete("authentication/session", {
      data: request,
    });
    return response.data;
  }
}
