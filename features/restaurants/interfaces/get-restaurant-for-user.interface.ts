export interface GetRestaurantForUser {
  data: {
    id: number;
    name: string;
    address: string;
    description: string;
    openingTime: Date;
    closingTime: Date;
    imageUrl: string[];
  };
}
