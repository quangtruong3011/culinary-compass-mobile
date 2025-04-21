export interface GetTableResponse {
  data: {
    id: number;
    name: string;
    restaurantId: number;
    numberOfSeats: number;
    isAvailable: boolean;
  };
}
