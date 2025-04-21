export interface GetAllTableResponse {
  data: {
    results: Table[];
    total: number;
    page: string;
    limit: string;
    totalPages: number;
  };
}

interface Table {
  id: number;
  name: string;
  restaurantId: number;
  numberOfSeats: number;
  isAvailable: boolean;
}
