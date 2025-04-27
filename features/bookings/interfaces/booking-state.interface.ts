import { Booking } from "./booking.interface";

export interface BookingState {
  bookings: Booking[] | null;
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
}
