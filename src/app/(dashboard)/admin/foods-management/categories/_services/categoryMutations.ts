"use server";

import prisma from "@/lib/prisma";
import { executeAction } from "../../../../../../lib/executeAction";
import { CategorySchema } from "../_types/categorySchema";

const deleteCategoty = async (id: number) => {
  await executeAction({
    actionFn: () => prisma.category.delete({ where: { id } }),
  });
};

const createCategory = async (data: CategorySchema) => {
  await executeAction({
    actionFn: () =>
      prisma.category.create({
        data: {
          name: data.name,
        },
      }),
  });
};

const updateCategory = async (data: CategorySchema) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        prisma.category.update({
          where: {
            id: data.id,
          },
          data: {
            name: data.name,
          },
        }),
    });
  }
};

export { deleteCategoty, createCategory, updateCategory };
