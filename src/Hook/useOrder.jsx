import React from "react";
import { useMutation, useQuery } from "react-query";

import { detailOrder, getOrderByUserid, getOrdersAdmin } from "../Apis/Api.jsx";
import { useParams } from "react-router-dom";
import useAuth from "./useAuth.jsx";

const UseDetailOrder = (id) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["order", id],
    queryFn: () => detailOrder(id),
    enabled: !!id,
    staleTime: 0, // Đảm bảo luôn fetch dữ liệu mới
    cacheTime: 0, // Không cache dữ liệu
  });

  return { 
    data, 
    isLoading, 
    isError, 
    error,
    refetch // Cho phép refetch thủ công khi cần
  };
};
const useDetailOrderByUserId = () => {
  const { data: auth } = useAuth();

  const userId = auth?.id;

  const { data, isLoading } = useQuery({
    queryKey: ["orderbyuserid", userId],
    queryFn: () => (userId ? getOrderByUserid(userId) : Promise.resolve(null)),
    enabled: Boolean(userId),
  });

  return { data, isLoading };
};

const useOrder = () => {
  const { data, isLoading } = useQuery({
    queryKey: "order",
    queryFn: () => getOrdersAdmin(),
  });
  return { data, isLoading };
};
// const deleteOrder=()=>{
//   const {mutate,isLoading}=useMutation({
//     mutationFn:(id)=>deleteOrder(id),
//   })
// }
export { UseDetailOrder, useOrder, useDetailOrderByUserId };
