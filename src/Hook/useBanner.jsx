import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../Apis/Api";
import { message } from "antd";
import { useEffect, useState } from "react";
export const useBanners = (page = 1) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      const data = await getBanners(page);
      setBanners(data.data);
      setLoading(false);
    };

    fetchBanners();
  }, [page]);

  return { banners, loading };
};
const useBanner = (page = 1) => {
  const {
    data: banner,
    isLoading: isBanner,
    error,
  } = useQuery(["banner", page], () => getBanners(page), {
    onError: () => {
      message.error("Failed to fetch banners");
    },
  });
  return { banner, isBanner, error };
};

const useCreateBanner = (setIsModalOpenAdd) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (newBanner) => createBanner(newBanner),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      message.success("Banner added successfully");
      setIsModalOpenAdd(false);
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};

const useUpdateBanner = (setIsModalOpenEdit) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, updatedBanner }) => updateBanner(id, updatedBanner),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      message.success("Banner updated successfully");
      setIsModalOpenEdit(false);
    },
    onError: () => {
      message.error("Failed to update banner");
    },
  });
  return { mutate, isLoading };
};

const useDeleteBanner = (setIsModalOpen) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      message.success("Banner deleted successfully");
      setIsModalOpen(false);
    },
    onError: () => {
      message.error("Failed to delete banner");
    },
  });
  return { mutate, isLoading };
};

export { useBanner, useCreateBanner, useUpdateBanner, useDeleteBanner };
