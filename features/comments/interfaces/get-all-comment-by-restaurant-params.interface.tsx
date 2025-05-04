import { PaginationOptions } from "@/shared/pagination.interface";

export interface GetAllCommentForRestaurantParams extends PaginationOptions {
  restaurantId?: number;
}
