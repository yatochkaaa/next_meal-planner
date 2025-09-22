import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoty } from "@/app/(dashboard)/admin/foods-management/categories/_services/categoryMutations";
import { toast } from "sonner";

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

export { useDeleteCategory };
