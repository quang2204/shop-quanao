import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateUser } from '../Apis/Api';
import { message } from 'antd';

const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const users = JSON.parse(localStorage.getItem("user") || "null");

    const { mutate, isLoading: isLoadingUser } = useMutation({
        mutationFn: (data: object) => updateUser(data, users._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", users._id] });
            message.success("Thành công");
        }
    })
    return { mutate, isLoadingUser };
};

export default useUpdateUser;