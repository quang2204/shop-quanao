import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addCategory,
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
const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, data }) => updateCategory(id, data), // Ensure we receive both id and data in an object
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      message.success("Cập nhật danh mục thành công");
    },
    onError: () => {
      message.error("Cập nhật danh mục thất bại");
    },
  });
  return { mutate, isLoading };
};

const useAddCategory = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => addCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      message.success("Thêm danh mục thành công");
    },
    onError: () => {
      message.error("Thêm sản phẩm thất bại");
    },
  });
  return { mutate, isLoading };
};
const useDeleteCategory = (id) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      message.success("Xóa danh muc thành công");
    },
    onError: () => {
      message.error("Xóa sản phẩm thất bại");
    },
  });
  return { mutate, isLoading };
};
export { useCategory, useDeleteCategory, useUpdateCategory, useAddCategory };
