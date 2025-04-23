import { PaginationOptions } from "@/shared/pagination.interface";
import { Booking } from "./booking.interface";

export interface GetAllBooking extends PaginationOptions{
  data: {
    results: Booking[];
    total: number;
    page: string;
    limit: string;
    totalPages: number;
  };
}
