import { Sizesforcedelete, Sizesrestore, getSize, getSizesTrashed } from "../Apis/Api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSizes, createSize, updateSize, deleteSize } from "../Apis/Api";
import { message } from "antd";
const useSizes = () => {
  const { data: sizes, isLoading: isLoadingSize } = useQuery({
    queryKey: ["sizes"],
    queryFn: getSize,
  });
  return { sizes, isLoadingSize };
};

const useSize = (currentPage) => {
  const {
    data: size,
    isLoading: isSize,
    error,
  } = useQuery({
    queryKey: ["size", currentPage],
    queryFn: () => getSizes(currentPage),
    onError: () => {
      message.error("Failed to fetch sizes");
    },
  });
  return { size, isSize, error };
};
 export const useSizeTrashed = () => {
  const {
    data: size,
    isLoading: isSize,
    error,
  } = useQuery({
    queryKey: ["sizeTrashed"],
    queryFn: () => getSizesTrashed(),
    onError: () => {
      message.error("Failed to fetch sizes");
    },
  });
  return { size, isSize, error };
};
const useCreateSize = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (newSize) => createSize(newSize),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["size"] });
      message.success("Size added successfully");
    },
    onError: () => {
      message.error("Failed to add size");
    },
  });
  return { mutate, isLoading };
};

const useUpdateSize = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, updatedSize }) => updateSize(id, updatedSize),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["size"] });
      message.success("Size updated successfully");
    },
    onError: () => {
      message.error("Failed to update size");
    },
  });
  return { mutate, isLoading };
};

const useDeleteSize = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteSize(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["size"] });
      message.success("Size deleted successfully");
    },
    onError: () => {
      message.error("Failed to delete size");
    },
  });
  return { mutate, isLoading };
};
export const useForceDeleteSize = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => Sizesforcedelete(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sizeTrashed"] });
      message.success(data.message);
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
export const useRestoreDeleteSize = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => Sizesrestore(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sizeTrashed"] });
      message.success(data.message);
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
export { useSize, useCreateSize, useUpdateSize, useDeleteSize, useSizes };
