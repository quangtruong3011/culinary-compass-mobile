import { Restaurant } from "./restaurant.interface";

export interface GetAllRestaurants {
  data: {
    results: Restaurant[];
    total: number;
    page: string;
    limit: string;
    totalPages: number;
  };
}
