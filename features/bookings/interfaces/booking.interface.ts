export interface Booking {
  id: number;
  userId: number;
  people: number;
  timeBooking: string;
  tables: number[];
  timeCreate?: string;
}

export interface CreateBookingDto {
  userId: number;
  people: number;
  timeBooking: string;
  tableIds: number[];
}

export interface UpdateBookingDto {
  people?: number;
  timeBooking?: string;
  tableIds?: number[];
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  filter?: string;
}

export interface PaginationResult<T> {
  results: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}