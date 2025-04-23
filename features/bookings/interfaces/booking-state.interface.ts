import { Booking } from "./booking.interface";

export interface BookingState {
  bookings: Booking[];
  currentBooking: Partial<Booking> | null;
  isLoading: boolean;
  error: string | null;
}
