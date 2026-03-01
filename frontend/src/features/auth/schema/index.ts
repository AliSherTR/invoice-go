import z from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address.")
    .min(1, { error: "Email is required" }),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name must be under 50 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Must include at least one uppercase letter.")
      .regex(/[0-9]/, "Must include at least one number.")
      .regex(/[^a-zA-Z0-9]/, "Must include at least one special character."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupValues = z.infer<typeof signupSchema>;
