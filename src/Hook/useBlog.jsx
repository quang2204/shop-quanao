import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  blogDelete,
  AddBlog,
  getBlogDetail,
  getBlogs,
  updateBlog,
  getBlogsAdmin,
  getBlogDetailAdmin,
  harddeleteBlog,
  forceDeleteBlog,
  restoreBlog,
} from "../Apis/Api";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

const useBlogs = (filters = {}) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getBlogs(filters),
    queryKey: ["blogs", filters],
  });
  return { data, isLoading };
};
export const harddeleteBlogs = () => {
  const { data: blogs, isLoading: isBlogs } = useQuery({
    queryKey: ["harddeleteblog"],
    queryFn: () => harddeleteBlog(),
  });
  return { blogs, isBlogs };
};
const useBlogsAdmin = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => getBlogsAdmin(),
    queryKey: ["blogs"],
  });
  return { data, isLoading };
};
const useBlogDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryFn: () => getBlogDetail(id),
    queryKey: ["blogs", id],
  });
  return { data, isLoading };
};
const useBlogDetailAdmin = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryFn: () => getBlogDetailAdmin(id),
    queryKey: ["blogsadmin", id],
  });
  return { data, isLoading };
};
const useDeletBlog = (setIsModalOpen) => {
  const queryCline = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => blogDelete(id),
    onSuccess: () => {
      message.success("Deleted successfully");
      queryCline.invalidateQueries({ queryKey: ["blogs"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
const useAddBlog = () => {
  const queryCline = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => AddBlog(data),
    onSuccess: () => {
      message.success("More success");
      queryCline.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/admin/blogs");
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
const useupdateBlog = () => {
  const queryCline = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, data }) => updateBlog(id, data),
    onSuccess: () => {
      message.success("Edited successfully");
      queryCline.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/admin/blogs");
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
export const useforceDeleteBlog = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => forceDeleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["harddeleteblog"] });
      message.success("Xóa blog thành công");
      onSuccessCallback?.();
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};
export const userestoreBlog = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => restoreBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["harddeleteblog"] });
      message.success("Khôi phục blog thành công");
      onSuccessCallback?.();
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};
export {
  useBlogs,
  useBlogDetail,
  useDeletBlog,
  useAddBlog,
  useupdateBlog,
  useBlogsAdmin,
  useBlogDetailAdmin,
};
