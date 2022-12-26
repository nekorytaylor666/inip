import { z } from "zod";

export const orderValidationSchema = z.object({
    fullname: z.string({ required_error: "Fullname is required" }),
    city: z.string().min(1, { message: "Email is required" }),
    street: z.string().min(1, { message: "Street is required" }),
    entrance: z.string().optional(),
    floor: z.string().optional(),
    apartment: z.string().optional(),
    phone: z.string().min(1, { message: "Phone is required" }),
    comment: z
        .string()
        .max(140, {
            message: "Comment is too long, keep it withing 140 characters",
        })
        .optional(),
});

export type Order = z.infer<typeof orderValidationSchema>;

// extracting the type
