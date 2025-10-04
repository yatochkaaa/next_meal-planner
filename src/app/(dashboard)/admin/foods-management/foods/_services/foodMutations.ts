"use server";
import {
  FoodSchema,
  foodSchema,
} from "@/app/(dashboard)/admin/foods-management/foods/_types/foodSchema";
import prisma from "@/lib/prisma";
import { executeAction } from "@/lib/executeAction";
import { toNumberSafe } from "@/lib/utils";

const createFood = async (data: FoodSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = foodSchema.parse(data);

      const food = await prisma.food.create({
        data: {
          name: validatedData.name,
          calories: toNumberSafe(validatedData.calories),
          carbohydrates: toNumberSafe(validatedData.carbohydrates),
          fat: toNumberSafe(validatedData.fat),
          fiber: toNumberSafe(validatedData.fiber),
          sugar: toNumberSafe(validatedData.sugar),
          protein: toNumberSafe(validatedData.protein),
          categoryId: toNumberSafe(validatedData.categoryId) || null,
        },
      });

      await Promise.all(
        validatedData.foodServingUnits.map(async (unit) => {
          await prisma.foodServingUnit.create({
            data: {
              foodId: food.id,
              servingUnitId: toNumberSafe(unit.foodServingUnitId),
              grams: toNumberSafe(unit.grams),
            },
          });
        }),
      );
    },
  });
};

const updateFood = async (data: FoodSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = foodSchema.parse(data);
      if (validatedData.action === "update") {
        await prisma.food.update({
          where: { id: validatedData.id },
          data: {
            name: validatedData.name,
            calories: toNumberSafe(validatedData.calories),
            carbohydrates: toNumberSafe(validatedData.carbohydrates),
            fat: toNumberSafe(validatedData.fat),
            fiber: toNumberSafe(validatedData.fiber),
            sugar: toNumberSafe(validatedData.sugar),
            protein: toNumberSafe(validatedData.protein),
            categoryId: toNumberSafe(validatedData.categoryId) || null,
          },
        });

        await prisma.foodServingUnit.deleteMany({
          where: { foodId: validatedData.id },
        });

        await Promise.all(
          validatedData.foodServingUnits.map(async (unit) => {
            await prisma.foodServingUnit.create({
              data: {
                foodId: validatedData.id,
                servingUnitId: toNumberSafe(unit.foodServingUnitId),
                grams: toNumberSafe(unit.grams),
              },
            });
          }),
        );
      }
    },
  });
};

const deleteFood = async (id: number) => {
  await executeAction({
    actionFn: async () => {
      await prisma.foodServingUnit.deleteMany({
        where: { foodId: id },
      });

      await prisma.food.delete({ where: { id } });
    },
  });
};

export { createFood, deleteFood, updateFood };
