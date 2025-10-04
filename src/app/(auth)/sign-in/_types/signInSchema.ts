import z from "zod/v3";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignInSchema = z.infer<typeof signInSchema>;

const signInDefaultValues: SignInSchema = {
  email: "",
  password: "",
};

export { type SignInSchema, signInDefaultValues, signInSchema };
