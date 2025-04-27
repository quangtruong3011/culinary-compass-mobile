import { SingleResponse } from "@/shared/api-response";
import { Booking } from "./booking.interface";

export interface GetBookingDto extends SingleResponse<Booking> {}