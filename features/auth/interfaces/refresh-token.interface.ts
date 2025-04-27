import { User } from "@/features/users/interfaces/user.interface";
import { SingleResponse } from "@/shared/api-response";

export interface RefreshTokenRequest {
  refresh_token: string;
}

interface RefreshTokenData {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenResponse
  extends SingleResponse<RefreshTokenData> {}
