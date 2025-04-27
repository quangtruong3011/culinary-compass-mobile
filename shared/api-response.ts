export interface PaginatedResponse<T> {
  status?: string;
  message?: string;
  data: {
    results: T[];
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export interface SingleResponse<T> {
  status?: string;
  message?: string;
  data: T;
}
