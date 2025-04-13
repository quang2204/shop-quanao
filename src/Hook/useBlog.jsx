import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  getBlogsAdmin,
  getBlogDetail,
  createBlog,
  updateBlog,
  deleteBlog,
  forceDeleteBlog,
} from "../Apis/Api";

export const useBlogs = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogsAdmin,
  });

  return { blogs, isLoading };
};

export const useBlogDetail = (id) => {
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogDetail(id),
    enabled: !!id,
  });

  return { blog, isLoading };
};

export const useAddBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      message.success("Thêm bài viết thành công");
      navigate("/admin/blogs");
    },
    onError: () => {
      message.error("Thêm bài viết thất bại");
    },
  });

  return { mutate, isLoading };
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, ...data }) => updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      message.success("Cập nhật bài viết thành công");
    },
    onError: () => {
      message.error("Cập nhật bài viết thất bại");
    },
  });

  return { mutate, isLoading };
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      message.success("Xóa bài viết thành công");
    },
    onError: () => {
      message.error("Xóa bài viết thất bại");
    },
  });

  return { mutate, isLoading };
};

export const useForceDeleteBlog = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: forceDeleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      message.success("Xóa vĩnh viễn bài viết thành công");
    },
    onError: () => {
      message.error("Xóa vĩnh viễn bài viết thất bại");
    },
  });

  return { mutate, isLoading };
};
