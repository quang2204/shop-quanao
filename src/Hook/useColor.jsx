import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  getColors,
  deleteColor,
  getColorDetail,
  updateColor,
  createColor,
  getColorsTrashed,
  Colorsrestore,
  Colorsforcedelete,
} from "../Apis/Api";

export const useColors = (page) => {
  const { data: colors, isLoading } = useQuery({
    queryKey: ["colors", page],
    queryFn: () => getColors(page || 1),
  });
  return { colors, isLoading };
};
export const useColorsapiTrashed = () => {
  const { data: colorsTrashed, isLoadingTrashed } = useQuery({
    queryKey: ["colorsTrashed"],
    queryFn: () => getColorsTrashed(),
  });
  return { colorsTrashed, isLoadingTrashed };
};

export const useColorDetail = (id) => {
  const { data: color, isLoading } = useQuery({
    queryKey: ["color", id],
    queryFn: () => getColorDetail(id),
    enabled: !!id,
  });

  return { color, isLoading };
};

export const useAddColor = (setIsModalOpenAdd) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => createColor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      message.success("Add color to success");
      setIsModalOpenAdd(false)
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};

export const useUpdateColor = (setIsModalOpenUpdate) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, data }) => updateColor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      message.success("Color update successful");
      setIsModalOpenUpdate(false)
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};

export const useDeleteColor = (setIsModalOpen) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteColor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      message.success("Color removal successful");
      setIsModalOpen(false)
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};

export const useForceDeleteColor = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => Colorsforcedelete(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["colorsTrashed"] });
      message.success(data.message);
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
export const useRestoreColor = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => Colorsrestore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colorsTrashed"] });
      message.success("Color restoration successful");
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};
