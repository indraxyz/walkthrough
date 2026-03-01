import { z } from "zod";

export const walkthroughFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type WalkthroughFormData = z.infer<typeof walkthroughFormSchema>;
