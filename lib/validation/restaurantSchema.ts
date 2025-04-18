import * as z from "zod";

export const restaurantSchema = z.object({
  name: z.string().min(1, "Please enter a restaurant name"),
  address: z.string().min(1, "Please enter an address"),
  province: z.string().min(1, "Please select a province"),
  district: z.string().min(1, "Please select a district"),
  ward: z.string().min(1, "Please select a ward"),
  website: z
    .union([
      z.string().url("Please enter a valid URL(e.g., http://example.com)"),
      z.literal(""),
    ])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  phone: z
    .string()
    .min(1, "Please enter a phone number")
    .regex(/^[0-9]+$/, "Phone number can only contain numbers")
    .min(10, "Phone number must be at least 10 digits long")
    .max(12, "Phone number must be at most 12 digits long"),
  openingTime: z.date({
    required_error: "Please select an opening time",
    invalid_type_error: "Invalid opening time",
  }),
  closingTime: z.date({
    required_error: "Please select a closing time",
    invalid_type_error: "Invalid closing time",
  }),
  // description: z.string().min(1, "Please enter a description"),
  images: z.array(z.string()).optional(),
});
