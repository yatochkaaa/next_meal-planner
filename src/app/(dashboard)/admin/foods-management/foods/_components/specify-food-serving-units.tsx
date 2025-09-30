import { useFieldArray, useFormContext } from "react-hook-form";
import { CirclePlus, Trash2, Utensils } from "lucide-react";
import { FoodSchema } from "@/app/(dashboard)/admin/foods-management/foods/_types/foodSchema";
import { useServingUnits } from "@/app/(dashboard)/admin/foods-management/serving-units/_services/useQueries";
import { Button } from "@/components/ui/button";
import { ControlledSelect } from "@/components/ui/controlled-select";
import { ServingUnitFormDialog } from "@/app/(dashboard)/admin/foods-management/serving-units/_components/serving-unit-form-dialog";
import { ControlledInput } from "@/components/ui/controlled-input";

const SpecifyFoodServingUnits = () => {
  const { control } = useFormContext<FoodSchema>();
  const { append, fields, remove } = useFieldArray({
    control,
    name: "foodServingUnits",
  });
  const servingUnitsQuery = useServingUnits();

  return (
    <div className="flex flex-col gap-4 rounded-md border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Serving Units</h3>
        <Button
          size="sm"
          type="button"
          variant="outline"
          className="flex items-center gap-1"
          onClick={() => {
            append({ foodServingUnitId: "", grams: "0" });
          }}
        >
          <CirclePlus /> Add Serving Unit
        </Button>
      </div>
      {fields.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center rounded-md border border-dashed py-6 text-center">
          <Utensils className="mb-2 size-10 opacity-50" />
          <p>No serving units added yet</p>
          <p className="text-sm">Add serving units to help users measure</p>
        </div>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-[1fr_1fr_auto] items-end gap-3"
            >
              <div className="col-span-1 flex items-end">
                <ControlledSelect<FoodSchema>
                  label="Food Serving Unit"
                  name={`foodServingUnits.${index}.foodServingUnitId`}
                  options={servingUnitsQuery.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  placeholder="Select unit..."
                />
                <ServingUnitFormDialog smallTrigger />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name={`foodServingUnits.${index}.grams`}
                  label="Grams per Unit"
                  type="number"
                  placeholder="0"
                />
              </div>

              <Button
                size="icon"
                variant="outline"
                type="button"
                onClick={() => {
                  remove(index);
                }}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { SpecifyFoodServingUnits };
