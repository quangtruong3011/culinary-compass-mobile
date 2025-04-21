import { CurrentRestaurantState } from "./current-restaurant-state.interface";

export interface CreateOrEditRestaurantFormProps {
  onSubmit: (data: CreateOrEditRestaurantDto) => void;
  isLoading: boolean;
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
  // id: number;
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  // latitude: number;
  // longitude: number;
  phone: string;
  email?: string;
  website?: string;
  description: string;
  openingTime: Date;
  closingTime: Date;
  images: string[];
}

export interface RestaurantState {
  restaurants: any;
  currentRestaurant: CurrentRestaurantState;
  is_loading: boolean;
  error: string | null;
}

export { GetAllRestaurantsForUser } from "./get-all-restaurant-for-user.interface";
export { GetAllRestaurantsForAdmin } from "./get-all-restaurant-for-admin.interface";
export { GetRestaurantForUser } from "./get-restaurant-for-user.interface";
