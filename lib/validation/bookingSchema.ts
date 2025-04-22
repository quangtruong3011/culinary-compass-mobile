import * as z from "zod";

export const bookingSchema = z.object({
    userId: z.number(),
    restaurantId: z.number(),
    name: z.string().min(1, "Please enter your name"),
    phone: z
        .string()
        .min(1, "Please enter a phone number")
        .regex(/^[0-9]+$/, "Phone number can only contain numbers")
        .min(10, "Phone number must be at least 10 digits long")
        .max(10, "Phone number must be at most 12 digits long"),
    email: z
        .string()
        .email("Please enter a valid email address")
        .optional(),
    date: z.date({
        required_error: "Please select a date",
        invalid_type_error: "Invalid date",
    }),
    startTime: z.date({
        required_error: "Please select a start time",
        invalid_type_error: "Invalid start time",
    }),
    endTime: z.date({
        required_error: "Please select an end time",
        invalid_type_error: "Invalid end time",
    }),
    guests: z.number().min(1, "Please select the number of guests"),
});