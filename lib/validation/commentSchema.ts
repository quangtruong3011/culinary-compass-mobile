import { z } from "zod";


export const commentSchema = z.object({
    restaurantId: z.number(),
    content: z.string().min(1, "Please enter your comment"),
});