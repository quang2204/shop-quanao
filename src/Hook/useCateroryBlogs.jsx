import { useQuery, useMutation, useQueryClient } from "react-query";
import { message } from "antd";
import {
  forceDeleteColor,
  detailCateroryBlog,
  addCateroryBlog,
  updateCateroryBlog,
  deleteCateroryBlog,
  getCateroryBlogAdmin,
} from "../Apis/Api";

export const useCateroryBlog = (page) => {
  const { data: cateroryblog, isLoading } = useQuery({
    queryKey: ["cateroryblog", page],
    queryFn: () => getCateroryBlogAdmin(page || 1),
  });
  return { cateroryblog, isLoading };
};

export const useCateroryBlogDetail = (id) => {
  const { data: cateroryBlog, isLoading } = useQuery({
    queryKey: ["cateroryblog", id],
    queryFn: () => detailCateroryBlog(id),
    enabled: !!id,
  });

  return { cateroryBlog, isLoading };
};

export const useAddcateroryBlog = (setIsModalOpenAdd) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => addCateroryBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cateroryblog"] });
      message.success("Add CatoryBlog successfully");
      setIsModalOpenAdd(false)
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};

export const useUpdateCateroryBlog = (setIsModalOpenUpdate) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, data }) => updateCateroryBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cateroryblog"] });
      message.success("CateroryBlog update successful");
      setIsModalOpenUpdate(false)
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};

export const useDeleteCateroryBlog = (setIsModalOpen) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteCateroryBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cateroryblog"] });
      message.success("Deleted cateroryBlog successfully");
      setIsModalOpen(false)
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};

export const useForceDeleteColor = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => forceDeleteColor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      message.success("Xóa vĩnh viễn màu sắc thành công");
    },
    onError: () => {
      message.error("Xóa vĩnh viễn màu sắc thất bại");
    },
  });

  return { mutate, isLoading };
};
