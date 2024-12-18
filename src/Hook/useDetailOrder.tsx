import React from "react";
import { useQuery } from "react-query";

import { detailOrder } from "../Apis/Api.tsx";
import {  useParams } from "react-router-dom";

const UseDetailOrder = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => detailOrder(id),
  });
  return { data, isLoading };
};

export default UseDetailOrder;
