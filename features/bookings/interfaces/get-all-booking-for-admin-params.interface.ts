import { PaginationOptions } from "@/shared/pagination.interface";

export interface GetAllBookingForAdminParams extends PaginationOptions {
  restaurantId?: number;
}
