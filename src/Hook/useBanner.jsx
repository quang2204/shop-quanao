import { useMutation, useQuery, useQueryClient } from "react-query";
import { getBanners, createBanner, updateBanner, deleteBanner } from "../Apis/Api";
import { message } from "antd";

const useBanner = () => {
  const { data: banner, isLoading: isBanner, error } = useQuery({
    queryKey: ["banner"],
    queryFn: () => getBanners(),
    onError: () => {
      message.error("Failed to fetch banners");
    },
  });
  return { banner, isBanner, error };
};

const useCreateBanner = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (newBanner) => createBanner(newBanner),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      message.success("Banner added successfully");
    },
    onError: () => {
      message.error("Failed to add banner");
    },
  });
  return { mutate, isLoading };
};

const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, updatedBanner }) => updateBanner(id, updatedBanner),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      message.success("Banner updated successfully");
    },
    onError: () => {
      message.error("Failed to update banner");
    },
  });
  return { mutate, isLoading };
};

const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      message.success("Banner deleted successfully");
    },
    onError: () => {
      message.error("Failed to delete banner");
    },
  });
  return { mutate, isLoading };
};

export { useBanner, useCreateBanner, useUpdateBanner, useDeleteBanner };