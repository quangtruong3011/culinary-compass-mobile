import { PaginationOptions } from "@/shared/pagination.interface";

export interface BookingParamByAdmin extends PaginationOptions {
  restaurantId: number;
}