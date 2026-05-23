export interface GuestSession {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export interface RequestToken {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface CreateSessionRequest {
  request_token: string;
}

export interface Session {
  success: boolean;
  session_id: string;
}

export interface CreateSessionFromV4TokenRequest {
  access_token: string;
}

export interface ValidateRequestTokenWithLoginRequest {
  username: string;
  password: string;
  request_token: string;
}

export interface DeleteSessionRequest {
  session_id: string;
}

export interface SuccessResponse {
  success: boolean;
}
