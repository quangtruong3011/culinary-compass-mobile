export interface AuthState {
  user: null | {
    id: string;
    roles: string[];
  };
  access_token: string | null;
  refresh_token: string | null;
  is_authenticated: boolean;
  remember_me?: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
  message: string;
  error: string | null;
}
