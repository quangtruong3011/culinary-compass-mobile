import { CreateOrEditRestaurantFormData } from "@/lib/validation/restaurantSchema";

export interface CreateOrEditRestaurantFormProps {
  onSubmit: (data: CreateOrEditRestaurantFormData) => void;
  isLoading: boolean;
}

