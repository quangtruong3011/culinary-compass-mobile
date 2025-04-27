import { PaginatedResponse } from "@/shared/api-response";
import { Restaurant } from "./restaurant.interface";

export interface GetAllRestaurants extends PaginatedResponse<Restaurant> {}
