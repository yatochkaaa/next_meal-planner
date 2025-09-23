"use server";

import prisma from "@/lib/prisma";
import { executeAction } from "../../../../../../lib/executeAction";

const deleteCategoty = async (id: number) => {
  await executeAction({
    actionFn: () => prisma.category.delete({ where: { id } }),
  });
};

export { deleteCategoty };
