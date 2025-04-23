import { Booking } from "./booking.interface";

export interface GetAllBookingForUser {
  data: {
    results: Booking[];
    total: number;
    page: string;
    limit: string;
    totalPages: number;
  };
}
