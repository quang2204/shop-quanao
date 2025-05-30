import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  getVouchers,
  deleteVoucher,
  forceDeleteVoucher,
  getVoucherDetail,
  updateVoucher,
  createVoucher,
  getVouchers_User,
} from "../Apis/Api";
import useAuth from "./useAuth";

export const useVouchers = (page) => {
  const { data: vouchers, isLoading } = useQuery({
    queryKey: ["vouchers", page],
    queryFn: () => getVouchers(page || 1),
  });

  return { vouchers, isLoading };
};
export const useVouchers_User = () => {
  const { data } = useAuth();
  const { data: vouchers, isLoading } = useQuery({
    queryKey: ["vouchers_user", data?.id],
    queryFn: () => getVouchers_User(data?.id),
  });

  return { vouchers, isLoading };
};
export const useVoucherDetail = (id) => {
  const { data: voucher, isLoading } = useQuery({
    queryKey: ["voucher", id],
    queryFn: () => getVoucherDetail(id),
    enabled: !!id,
  });

  return { voucher, isLoading };
};

export const useAddVoucher = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => createVoucher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      message.success("Voucher added successfully");
      navigate("/admin/vouchers");
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};

export const useUpdateVoucher = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, ...data }) => updateVoucher(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      message.success("Voucher update successful");
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};

export const useDeleteVoucher = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteVoucher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      message.success("Voucher deleted successfully");
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};

export const useForceDeleteVoucher = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => forceDeleteVoucher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      message.success("Xóa vĩnh viễn voucher thành công");
    },
    onError: () => {
      message.error("Xóa vĩnh viễn voucher thất bại");
    },
  });

  return { mutate, isLoading };
};
