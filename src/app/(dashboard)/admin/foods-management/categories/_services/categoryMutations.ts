"use server";

import prisma from "@/lib/prisma";
import { executeAction } from "./executeAction";

const deleteCategoty = async (id: number) => {
  await executeAction({
    actionFn: () => prisma.category.delete({ where: { id } }),
  });
};

export { deleteCategoty };
