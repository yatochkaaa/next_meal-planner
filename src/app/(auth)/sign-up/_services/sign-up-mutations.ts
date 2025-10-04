"use server";

import { executeAction } from "@/lib/executeAction";
import {
  signUpSchema,
  SignUpSchema,
} from "@/app/(auth)/sign-up/_types/signUpSchema";
import { hashPassword } from "@/lib/utils";
import prisma from "@/lib/prisma";

const signUp = async (data: SignUpSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = signUpSchema.parse(data);
      const hashedPassword = await hashPassword(validatedData.password);

      await prisma.user.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          password: hashedPassword,
          role: "USER",
        },
      });
    },
  });
};

export { signUp };
