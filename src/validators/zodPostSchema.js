import { z } from 'zod';

export const zodPostSchema = z.object({
    caption: z.string().min(3, {message: "Minum 3 characters required for caption"})
});