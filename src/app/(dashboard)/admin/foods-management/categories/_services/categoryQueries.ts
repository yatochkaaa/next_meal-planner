"use server";

import prisma from "@/lib/prisma";
import { CategorySchema } from "@/app/(dashboard)/admin/foods-management/categories/_types/categorySchema";

const getCategories = async () => {
  return prisma.category.findMany();
};

const getCategory = async (id: number): Promise<CategorySchema> => {
  const res = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  return {
    action: "update",
    name: res?.name ?? "",
    id,
  };
};

export { getCategories, getCategory };
