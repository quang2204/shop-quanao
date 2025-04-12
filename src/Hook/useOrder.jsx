import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  detailOrder,
  getOrderByUserid,
  getOrdersAdmin,
  orderUpdate,
  udateStatusOrder,
} from "../Apis/Api.jsx";
import { useParams } from "react-router-dom";
import useAuth from "./useAuth.jsx";
import { message } from "antd";

const UseDetailOrder = (id) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["order_id", id],
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
    refetch, // Cho phép refetch thủ công khi cần
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

const useOrder = (page) => {
  const { data, isLoading } = useQuery({
    queryKey: ["order", page],
    queryFn: () => getOrdersAdmin(page || 1),
  });
  return { data, isLoading };
};
// const deleteOrder=()=>{
//   const {mutate,isLoading}=useMutation({
//     mutationFn:(id)=>deleteOrder(id),
//   })
// }
const useStatusOrder = (page) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, data }) => udateStatusOrder(id, data),
    onSuccess: () => {
      message.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ["order", page] });
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
const useStatusOrderCline = (id_user) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, data }) => udateStatusOrder(id, data),
    onSuccess: () => {
      message.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ["orderbyuserid", id_user] });
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
const useStatusOrderAdmin= (id) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, data }) => udateStatusOrder(id, data),
    onSuccess: () => {
      message.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ["order_id", id] });
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
const useOrderUpdate = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, data }) => orderUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
export {
  UseDetailOrder,
  useOrder,
  useDetailOrderByUserId,
  useStatusOrder,
  useOrderUpdate,
  useStatusOrderCline,
  useStatusOrderAdmin
};
