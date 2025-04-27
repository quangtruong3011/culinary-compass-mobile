import { Booking } from "./booking.interface";

export interface GetAllBookingForAdmin {
  data: {
    results: Booking[];
    total: number;
    page: string;
    limit: string;
    totalPages: number;
  };
}
