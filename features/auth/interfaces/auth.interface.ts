export interface AuthState {
  user: null | {
    id: string;
    email: string;
    roles: string[];
  };
  access_token: string | null;
  refresh_token: string | null;
  is_authenticated: boolean;
  is_loading: boolean;
  error: string | null;
}

export interface LoginResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface RegisterResponse {
  data: {
    id: string;
    email: string;
    roles: string[];
    access_token: string;
  };
}

export interface GetMeResponse {
  id: string;
  email: string;
  roles: string[];
}

export interface RefreshTokenResponse {
  user: {
    id: string;
    email: string;
    roles: string[];
  };
  access_token: string;
  refresh_token: string;
}
