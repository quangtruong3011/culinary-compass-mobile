import { TableStatus } from "../types/table-status.type";

export interface Table {
  id: number;
  name: string;
  restaurantId: number;
  numberOfSeats: number;
  status: TableStatus;
}
