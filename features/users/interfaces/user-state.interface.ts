import { User } from "./user.interface";

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
