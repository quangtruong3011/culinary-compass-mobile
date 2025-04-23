import { PaginationOptions } from "@/shared/pagination.interface";

export interface TablePaginationParams extends PaginationOptions {
  restaurantId: number;
  // sortBy?: string;
  // sortOrder?: "asc" | "desc";
}
