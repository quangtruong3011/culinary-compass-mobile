export interface GetAllRestaurantsForAdmin {
  data: {
    results: Restaurant[];
    total: number;
    page: string;
    limit: string;
    totalPages: number;
  };
}

interface Restaurant {
  id: number;
  name: string;
  address: string;
  openingTime: string;
  closingTime: string;
  imageUrl: string;
}
