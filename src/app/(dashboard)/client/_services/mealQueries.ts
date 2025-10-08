"use server";

import {
  mealFiltersSchema,
  MealFiltersSchema,
} from "@/app/(dashboard)/client/_types/mealFilterSchema";
import { MealSchema } from "@/app/(dashboard)/client/_types/mealSchema";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { toStringSafe } from "@/lib/utils";
import { Prisma } from "$/generated/prisma";

const getMeals = async (filters: MealFiltersSchema) => {
  const validatedFilters = mealFiltersSchema.parse(filters);

  const session = await auth();

  const { dateTime } = validatedFilters || {};

  const where: Prisma.MealWhereInput = {};

  if (dateTime !== undefined) {
    const startDate = new Date(dateTime);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(dateTime);
    endDate.setHours(23, 59, 59, 999);
    where.dateTime = {
      gte: startDate,
      lte: endDate,
    };
  }

  if (session?.user?.id) {
    where.userId = {
      equals: +session.user.id,
    };
  }

  const data = await prisma.meal.findMany({
    where,
    orderBy: { dateTime: "desc" },
    include: {
      mealFood: {
        include: {
          food: true,
          servingUnit: true,
        },
      },
    },
  });

  return data;
};

const getMeal = async (id: number): Promise<MealSchema | null> => {
  const res = await prisma.meal.findFirst({
    where: { id },
    include: {
      mealFood: true,
    },
  });

  if (!res) return null;

  return {
    action: "update",
    id,
    dateTime: res.dateTime,
    userId: toStringSafe(res.userId),
    mealFoods:
      res.mealFood.map((item) => ({
        foodId: toStringSafe(item.foodId),
        amount: toStringSafe(item.amount),
        servingUnitId: toStringSafe(item.servingUnitId),
      })) ?? [],
  };
};

export { getMeal, getMeals };
