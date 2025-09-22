"use server";

import prisma from "@/lib/prisma";

const getCategories = async () => {
  return prisma.category.findMany();
};

export { getCategories };
