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
} from "../Apis/Api";

export const useVouchers = (page) => {
  const { data: vouchers, isLoading } = useQuery({
    queryKey: ["vouchers", page],
    queryFn: () => getVouchers(page || 1),
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
      message.success("Thêm voucher thành công");
      navigate("/admin/vouchers");
    },
    onError: () => {
      message.error("Thêm voucher thất bại");
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
      message.success("Cập nhật voucher thành công");
    },
    onError: (error) => {
      console.error("Lỗi cập nhật voucher:", error);
      message.error("Cập nhật voucher thất bại");
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
      message.success("Xóa voucher thành công");
    },
    onError: () => {
      message.error("Xóa voucher thất bại");
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
