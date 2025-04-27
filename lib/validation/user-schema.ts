import * as z from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter your name")
    .max(50)
    .transform((val) => val.trim())
    .optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Please enter your phone number").optional(),
  gender: z.string().min(1, "Please select your gender").optional(),
  birthOfDate: z.date().optional(),
  imageUrl: z.string().optional(),
});
