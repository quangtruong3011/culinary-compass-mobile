export interface Table {
    id: number;
    name: string;
    restaurantId: number;
    capacity: number;
    isAvailable?: boolean;
  }
  
  export interface CreateTableDto {
    name: string;
    restaurantId: number;
    capacity: number;
    isAvailable?: boolean;
  }
  
  export interface UpdateTableDto {
    name?: string;
    restaurantId?: number;
    capacity?: number;
    isAvailable?: boolean;
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