import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategoty,
  updateCategory,
} from "@/app/(dashboard)/admin/foods-management/categories/_services/categoryMutations";
import { toast } from "sonner";
import { CategorySchema } from "@/app/(dashboard)/admin/foods-management/categories/_types/categorySchema";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteCategoty(id);
    },
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CategorySchema) => await createCategory(data),
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CategorySchema) => await updateCategory(data),
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export { useDeleteCategory, useCreateCategory, useUpdateCategory };
