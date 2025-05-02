import { PaginatedResponse } from "@/shared/api-response";
import { Booking } from "./booking.interface";

export interface GetAllBookingForUser extends PaginatedResponse<Booking> {}
