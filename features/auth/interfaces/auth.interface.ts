import { User } from "@/features/users/interfaces/user.interface";
import { SingleResponse } from "@/shared/api-response";

export interface AuthState {
  user: User | null;
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
