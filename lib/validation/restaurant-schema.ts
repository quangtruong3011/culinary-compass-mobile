import * as z from "zod";

export const restaurantSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter a restaurant name")
    .transform((val) => val.trim()),
  address: z
    .string()
    .min(1, "Please enter an address")
    .transform((val) => val.trim()),
  province: z.string().min(1, "Please select a province"),
  district: z.string().min(1, "Please select a district"),
  ward: z.string().min(1, "Please select a ward"),
  phone: z
    .string()
    .min(1, "Please enter a phone number")
    .regex(/^[0-9]+$/, "Phone number can only contain numbers")
    .transform((val) => val.trim())
    .refine((val) => val.length >= 10 && val.length <= 12, {
      message: "Phone number must be between 10 and 12 digits",
    }),
  email: z
    .string()
    .email("Please enter a valid email address")
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Please enter a valid URL (e.g., http://example.com)")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .min(1, "Please enter a description")
    .transform((val) => val.trim()),
  openingTime: z.date({
    required_error: "Please select an opening time",
    invalid_type_error: "Invalid opening time",
  }),
  closingTime: z.date({
    required_error: "Please select a closing time",
    invalid_type_error: "Invalid closing time",
  }),
  images: z
    .array(
      z.object({
        id: z.coerce.number().optional(),
        publicId: z.string().optional(),
        imageUrl: z.string().url("Please enter a valid image URL"),
        isMain: z.boolean().optional(),
      })
    )
    .min(1, "Please upload at least one image")
    .max(6, "You can upload a maximum of 6 images"),
  deletedImages: z
    .array(
      z.object({
        id: z.coerce.number().optional(),
        publicId: z.string().optional(),
        imageUrl: z.string().url("Please enter a valid image URL"),
        isMain: z.boolean().optional(),
      })
    )
    .optional()
    .default([]),
});
