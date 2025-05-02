import { Table } from "@/features/tables/interfaces/table.interface";
import { BookingStatus } from "../types/booking-status.type";

export interface Booking {
  id: number;
  userId?: number;
  restaurantId?: number;
  name: string;
  phone: string;
  email?: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  guests: number;
  status: BookingStatus;
  tables?: Table[];
}
