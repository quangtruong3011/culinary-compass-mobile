import { SingleResponse } from "@/shared/api-response";
import { User } from "./user.interface";

export interface GetUserDto extends SingleResponse<User> {}
