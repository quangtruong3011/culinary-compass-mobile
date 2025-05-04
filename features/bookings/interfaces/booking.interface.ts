import { Table } from "@/features/tables/interfaces/table.interface";
import { BookingStatus } from "../types/booking-status.type";

export interface Booking {
  isCommented: boolean;
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
  note?: string;
  isCommented: boolean;
  tables?: Table[];
}
