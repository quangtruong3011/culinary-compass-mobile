import * as z from "zod";

export const tableSchema = z.object({
  id: z.number().optional(),
  // restaurantId: z.number(),
  name: z.string().min(1, "Please enter a table name"),
  numberOfSeats: z.number().min(1, "Please enter a valid capacity"),
});
