import { useQuery, useMutation, useQueryClient } from "react-query";
import { message } from "antd";
import {
  getComments,
  getCommentDetail,
  getChildComments,
  deleteComment,
} from "../Apis/Api";

export const useComments = (page) => {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", page],
    queryFn: () => getComments(page),
  });
  return { comments, isLoading };
};

export const useCommentDetail = (id) => {
  const { data: comment, isLoading } = useQuery({
    queryKey: ["comment", id],
    queryFn: () => getCommentDetail(id),
    enabled: !!id,
  });
  return { comment, isLoading };
};

export const useChildComments = (id) => {
  const { data: childComments, isLoading } = useQuery({
    queryKey: ["childComments", id],
    queryFn: () => getChildComments(id),
    enabled: !!id,
  });
  return { childComments, isLoading };
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      message.success("Xóa bình luận thành công");
    },
    onError: () => {
      message.error("Xóa bình luận thất bại");
    },
  });

  return { mutate, isLoading };
};