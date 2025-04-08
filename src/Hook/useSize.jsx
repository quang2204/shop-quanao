import { getSize } from "../Apis/Api";
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

export { useSize, useCreateSize, useUpdateSize, useDeleteSize, useSizes };
