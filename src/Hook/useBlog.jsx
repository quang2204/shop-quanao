import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  blogDelete,
  AddBlog,
  getBlogDetail,
  getBlogs,
  updateBlog,
  getBlogsAdmin,
  getBlogDetailAdmin,
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
const useBlogsAdmin = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => getBlogsAdmin(),
    queryKey: ["blogs", ],
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
const useDeletBlog = () => {
  const queryCline = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => blogDelete(id),
    onSuccess: () => {
      message.success("Xóa thành công");
      queryCline.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      message.error("Xóa thất bại");
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
      message.success("Thêm thành công");
      queryCline.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/admin/blogs");
    },
    onError: () => {
      message.error("Thêm thất bại");
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
      message.success("Sửa thành công");
      queryCline.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/admin/blogs");
    },
    onError: () => {
      message.error("Sửa thất bại");
    },
  });
  return { mutate, isLoading };
};
export { useBlogs, useBlogDetail, useDeletBlog, useAddBlog, useupdateBlog,useBlogsAdmin ,useBlogDetailAdmin};
