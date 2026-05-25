export interface V4CreateRequestTokenResponse {
  success: boolean;
  request_token: string;
  status_code: number;
  status_message: string;
}

export interface V4CreateRequestTokenParams {
  redirect_to?: string;
}

export interface V4CreateAccessTokenRequest {
  request_token: string;
}

export interface V4CreateAccessTokenResponse {
  access_token: string;
  account_id: string;
  status_code: number;
  status_message: string;
}

export interface V4LogoutRequest {
  access_token: string;
}

export interface V4LogoutResponse {
  status_code: number;
  status_message: string;
}
