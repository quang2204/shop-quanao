import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getColors, deleteColor, forceDeleteColor, getColorDetail, updateColor, createColor } from "../Apis/Api";

// 📌 Lấy danh sách màu sắc (có phân trang)
export const useColors = () => {
  const { data: colors, isLoading } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });

  return { colors, isLoading };
};

// 📌 Lấy chi tiết một màu
export const useColorDetail = (id) => {
  const { data: color, isLoading } = useQuery({
    queryKey: ["color", id],
    queryFn: () => getColorDetail(id),
    enabled: !!id,
  });

  return { color, isLoading };
};

// 📌 Thêm màu mới
export const useAddColor = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => createColor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      message.success("Thêm màu sắc thành công");
      navigate("/admin/colors");
    },
    onError: () => {
      message.error("Thêm màu sắc thất bại");
    },
  });

  return { mutate, isLoading };
};

// 📌 Cập nhật màu sắc
export const useUpdateColor = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => updateColor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      message.success("Cập nhật màu sắc thành công");
    },
    onError: () => {
      message.error("Cập nhật màu sắc thất bại");
    },
  });

  return { mutate, isLoading };
};

// 📌 Xóa màu sắc (xóa mềm)
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

// 📌 Xóa vĩnh viễn màu sắc
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
