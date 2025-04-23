import { Restaurant } from "./restaurant.interface";

export interface RestaurantState {
  restaurants: Restaurant[] | null;
  currentRestaurant: Partial<Restaurant> | null;
  is_loading: boolean;
  error: string | null;
}
