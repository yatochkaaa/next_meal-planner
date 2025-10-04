import { passwordSchema, requiredStringSchema } from "@/lib/zodSchemas";
import { z } from "zod/v3";

const signUpSchema = z
  .object({
    name: requiredStringSchema,
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

const signUpDefaultValues: SignUpSchema = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export { signUpDefaultValues, signUpSchema, type SignUpSchema };