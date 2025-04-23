import { PaginationOptions } from "@/shared/pagination.interface";

export interface BookingParam extends PaginationOptions {
  userId: number;
}