export class PaginationResult<T> {
  results!: T;
  total!: number;
  page!: number;
  limit!: number;
  totalPages!: number;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  filter?: string;
}