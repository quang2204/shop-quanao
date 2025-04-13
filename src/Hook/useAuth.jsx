import React from "react";
import { useQuery } from "react-query";
import { getUserToken } from "../Apis/Api";

const useAuth = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserToken(),
  });
  return { data, isLoading };
};

export default useAuth;
