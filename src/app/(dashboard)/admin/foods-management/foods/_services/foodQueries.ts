"use server";
import { Prisma } from "$/generated/prisma";
import {
  foodFilterSchema,
  FoodFilterSchema,
} from "@/app/(dashboard)/admin/foods-management/foods/_types/foodFilterSchema";
import prisma from "@/lib/prisma";
import { PaginatedResult } from "@/lib/types/paginatedResult";
import { FoodSchema } from "@/app/(dashboard)/admin/foods-management/foods/_types/foodSchema";
import { toStringSafe } from "@/lib/utils";

type FoodWithServingUnits = Prisma.FoodGetPayload<{
  include: {
    foodServingUnits: true;
  };
}>;

const getFoods = async (
  filters: FoodFilterSchema,
): Promise<PaginatedResult<FoodWithServingUnits>> => {
  const validatedFilters = foodFilterSchema.parse(filters);
  const {
    searchTerm,
    caloriesRange: [minCaloriesStr, maxCaloriesStr],
    proteinRange: [minProteinStr, maxProteinStr],
    categoryId,
    sortBy = "name",
    sortOrder,
    page,
    pageSize,
  } = validatedFilters;

  const where: Prisma.FoodWhereInput = {};
  // Name
  if (searchTerm) {
    where.name = {
      contains: searchTerm,
    };
  }
  // Calories
  const numericMinCalories =
    minCaloriesStr === "" ? undefined : Number(minCaloriesStr);
  const numericMaxCalories =
    maxCaloriesStr === "" ? undefined : Number(maxCaloriesStr);

  if (numericMinCalories !== undefined || numericMaxCalories !== undefined) {
    where.calories = {};
    if (numericMinCalories !== undefined)
      where.calories.gte = numericMinCalories;
    if (numericMaxCalories !== undefined)
      where.calories.lte = numericMaxCalories;
  }
  // Protein
  const numericMinProtein =
    minProteinStr === "" ? undefined : Number(minProteinStr);
  const numericMaxProtein =
    maxProteinStr === "" ? undefined : Number(maxProteinStr);

  if (numericMinProtein !== undefined || numericMaxProtein !== undefined) {
    where.protein = {};
    if (numericMinProtein !== undefined) where.protein.gte = numericMinProtein;
    if (numericMaxProtein !== undefined) where.protein.lte = numericMaxProtein;
  }
  // Category
  const numericCategoryId = categoryId ? Number(categoryId) : undefined;

  if (numericCategoryId !== undefined && numericCategoryId !== 0) {
    where.category = {
      id: numericCategoryId,
    };
  }

  const skip = (page - 1) * pageSize;

  const [total, data] = await Promise.all([
    prisma.food.count({ where }),
    prisma.food.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: pageSize,
      include: {
        foodServingUnits: true,
      },
    }),
  ]);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};

const getFood = async (id: number): Promise<FoodSchema | null> => {
  const res = await prisma.food.findFirst({
    where: {
      id,
    },
    include: {
      foodServingUnits: true,
    },
  });

  if (!res) return null;

  return {
    action: "update",
    id,
    name: res.name,
    calories: toStringSafe(res.calories),
    carbohydrates: toStringSafe(res.carbohydrates),
    fat: toStringSafe(res.fat),
    fiber: toStringSafe(res.fiber),
    protein: toStringSafe(res.protein),
    sugar: toStringSafe(res.sugar),
    categoryId: toStringSafe(res.categoryId),
    foodServingUnits: res.foodServingUnits.map((item) => ({
      foodServingUnitId: toStringSafe(item.servingUnitId),
      grams: toStringSafe(item.grams),
    })),
  };
};

export { getFoods, getFood };
