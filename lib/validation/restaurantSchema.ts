import * as z from "zod";

export const restaurantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  phone: z.string().min(1, "Phone is required"),
  opening_time: z.date().optional(),
  closing_time: z.date().optional(),
});

export type CreateOrEditRestaurantFormData = z.infer<typeof restaurantSchema>;