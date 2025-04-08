import { message } from "antd";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteUser } from "../Apis/Api";

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] }),
        message.success("User deleted successfully");
    },
    onError: () => {
      message.error("User not deleted");
    },
  });
  return { mutate, isLoading };
};

export { useDeleteUser };
