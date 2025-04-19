export interface CreateOrEditRestaurantFormProps {
  onSubmit: (data: CreateOrEditRestaurantDto) => void;
  isLoading: boolean;
}

export interface FindAllRestaurantsForAdminResponse {
  data: {
    results: Restaurant[];
    total: number;
    page: string;
    limit: string;
    totalPages: number;
  };
}

export interface Provinces {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  phone_code: number;
  districts: Districts[];
}

export interface Districts {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
  wards: Wards[];
}

export interface Wards {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
}

export interface Restaurant {
  id: number | null;
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  // latitude: number;
  // longitude: number;
  phone: string;
  // email: string;
  website: string | null;
  // description: string;
  openingTime: string;
  closingTime: string;
}

export interface CreateOrEditRestaurantDto {
  id: number | null;
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  // latitude: number;
  // longitude: number;
  phone: string;
  // email: string;
  website: string | null;
  // description: string;
  openingTime: string;
  closingTime: string;
  images: string[];
}

export interface RestaurantState {
  restaurants: Restaurant[];
  currentRestaurant: Restaurant | null;
  is_loading: boolean;
  error: string | null;
}
