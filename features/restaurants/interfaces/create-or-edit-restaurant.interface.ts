import { RestaurantImage } from "./restaurant-image.interface";

export interface CreateOrEditRestaurantDto {
  // id?: number;
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
  images: RestaurantImage[];
  deletedImages?: RestaurantImage[];
}


