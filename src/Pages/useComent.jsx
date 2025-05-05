import { useMutation, useQuery } from "react-query";
import { addComents, getCommentIdProduct } from "../Apis/Api";
import { message } from "antd";
import { useParams } from "react-router-dom";

const addComent = (setIsModalOpen) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => addComents(data),
    onSuccess: () => {
      message.success("Comment successful");
      setIsModalOpen(false);
    },
    onError: () => {
      message.error("Comment failed");
    },
  });
  return { mutate, isLoading };
};
const getCommentProduct = (filterStart) => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["commentproduct", id, filterStart],
    queryFn: () => getCommentIdProduct(id, filterStart),
  });
  return { data, isLoading };
};
export { addComent, getCommentProduct };
