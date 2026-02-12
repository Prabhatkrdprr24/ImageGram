import { z } from 'zod';

export const zodSigninSchema = z.object({
    email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .refine(
        (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        { message: "Invalid email format" }
    ),
    password: z.string().min(5, {message: "Password must be at least 5 characters long"})
})