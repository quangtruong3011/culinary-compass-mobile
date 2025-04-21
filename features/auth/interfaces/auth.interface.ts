export interface AuthState {
  user: null | {
    id: number;
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
    user: {
      id: number;
      email: string;
      roles: string[];
    };
    access_token: string;
    refresh_token: string;
  };
}

export interface GetMeResponse {
  data: {
    id: number;
    email: string;
    roles: string[];
  };
}

export interface RefreshTokenResponse {
  data: {
    user: {
      id: number;
      email: string;
      roles: string[];
    };
    access_token: string;
    refresh_token: string;
  };
}
