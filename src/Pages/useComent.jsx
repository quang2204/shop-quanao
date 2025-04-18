import { useMutation, useQuery } from "react-query";
import { addComents, getCommentIdProduct } from "../Apis/Api";
import { message } from "antd";
import { useParams } from "react-router-dom";

const addComent = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => addComents(data),
    onSuccess: () => {
      message.success("Comment thành công");
    },
    onError: () => {
      message.error("Comment thất bại");
    },
  });
  return { mutate, isLoading };
};
const getCommentProduct = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["commentproduct", id],
    queryFn:()=>getCommentIdProduct(id)
  });
  return {data, isLoading }
};
export { addComent ,getCommentProduct};
