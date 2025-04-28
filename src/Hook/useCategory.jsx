import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addCategory,
  categoryForcedelete,
  categoryRestore,
  categoryTrashed,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../Apis/Api";
import { message } from "antd";
const useCategory = (page) => {
  const { data: category, isLoading: isCategory } = useQuery({
    queryKey: ["category", page],
    queryFn: () => getCategory(page || 1),
  });
  return { category, isCategory };
};
const useCategoryTrashed = () => {
  const { data: category, isLoading: isCategory } = useQuery({
    queryKey: ["categoryTrashed"],
    queryFn: () => categoryTrashed(),
  });
  return { category, isCategory };
};
const useUpdateCategory = (setIsModalOpenUpdate) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, data }) => updateCategory(id, data), // Ensure we receive both id and data in an object
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      message.success("Catalog updated successfully");
      setIsModalOpenUpdate(false)
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
const useRestoreCategory = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => categoryRestore(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categoryTrashed"] });
      message.success(data.message);
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
const useForcedeleteCategory = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => categoryForcedelete(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categoryTrashed"] });
      message.success(data.message);
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
const useAddCategory = (setIsModalOpenAdd) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => addCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      message.success("Category added successfully");
      setIsModalOpenAdd(false);
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
const useDeleteCategory = (setIsModalOpen) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      message.success("Delete category successfully");
      setIsModalOpen(false);
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
export {
  useCategory,
  useDeleteCategory,
  useUpdateCategory,
  useAddCategory,
  useCategoryTrashed,
  useRestoreCategory,
  useForcedeleteCategory,
};
