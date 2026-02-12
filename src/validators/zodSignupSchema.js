import { z } from 'zod';

export const zodSignupSchema = z.object({
    email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .refine(
        (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        { message: "Invalid email format" }
    )
    .transform((email) => email.toLowerCase()),
    username: z.string().min(5),
    password: z.string().min(5)
});