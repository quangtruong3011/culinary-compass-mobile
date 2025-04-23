import { RestaurantImage } from "./restaurant-image.interface";

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  openingTime: Date;
  closingTime: Date;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  imageUrl: string;
  images?: RestaurantImage[];
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
