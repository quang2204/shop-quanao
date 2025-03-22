import React from "react";
import { useMutation, useQuery } from "react-query";

import { detailOrder, getOrdersAdmin } from "../Apis/Api.jsx";
import { useParams } from "react-router-dom";

const UseDetailOrder = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => detailOrder(id),
    enabled:!!id
  });
  return { data, isLoading };
};
const useOrder = () => {
  const { data, isLoading } = useQuery({
    queryKey: "order",
    queryFn: () => getOrdersAdmin(),
  })
  return { data, isLoading }
}
// const deleteOrder=()=>{
//   const {mutate,isLoading}=useMutation({
//     mutationFn:(id)=>deleteOrder(id),
//   })
// }
export  {UseDetailOrder,useOrder};
