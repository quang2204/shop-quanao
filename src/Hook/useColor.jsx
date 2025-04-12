import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  getColors,
  deleteColor,
  forceDeleteColor,
  getColorDetail,
  updateColor,
  createColor,
} from "../Apis/Api";

export const useColors = (page) => {
  const { data: colors, isLoading } = useQuery({
    queryKey: ["colors", page],
    queryFn: () => getColors(page || 1),
  });
  return { colors, isLoading };
};

export const useColorDetail = (id) => {
  const { data: color, isLoading } = useQuery({
    queryKey: ["color", id],
    queryFn: () => getColorDetail(id),
    enabled: !!id,
  });

  return { color, isLoading };
};

export const useAddColor = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => createColor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      message.success("Thêm màu sắc thành công");
    },
    onError: () => {
      message.error("Thêm màu sắc thất bại");
    },
  });

  return { mutate, isLoading };
};

export const useUpdateColor = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, data }) => updateColor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      message.success("Cập nhật màu sắc thành công");
    },
    onError: (error) => {
      console.error("Error updating color:", error); // Thêm dòng này để kiểm tra lỗi
      message.error("Cập nhật màu sắc thất bại");
    },
  });

  return { mutate, isLoading };
};

export const useDeleteColor = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteColor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      message.success("Xóa màu sắc thành công");
    },
    onError: () => {
      message.error("Xóa màu sắc thất bại");
    },
  });

  return { mutate, isLoading };
};

export const useForceDeleteColor = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => forceDeleteColor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      message.success("Xóa vĩnh viễn màu sắc thành công");
    },
    onError: () => {
      message.error("Xóa vĩnh viễn màu sắc thất bại");
    },
  });

  return { mutate, isLoading };
};
