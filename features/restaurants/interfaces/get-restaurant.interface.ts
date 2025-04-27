import { SingleResponse } from "@/shared/api-response";
import { Restaurant } from "./restaurant.interface";

export interface GetRestaurantDto extends SingleResponse<Restaurant> {}
