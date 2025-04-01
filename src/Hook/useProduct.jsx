import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  addProduct,
  // addProductGalleries,
  categoryProduct,
  deleteProduct,
  getProducts,
  productsPagination,
} from "../Apis/Api";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { use } from "react";

export const useProduct = (pages) => {
  const { data: products, isLoading: isProducts } = useQuery({
    queryKey: ["products", pages],
    queryFn: () => getProducts(pages || 1),
  });
  return { products, isProducts };
};
export const useProducts = () => {
  const { data: products, isLoading: isProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  return { products, isProducts };
};
export const useCategoryProducts = () => {
  const { caterory } = useParams();

  const { data: categoryproducts, isLoading: iscategoryProducts } = useQuery({
    queryKey: ["product", caterory],
    queryFn: () => categoryProduct(caterory),
    enabled: !!caterory,
  });
  return { categoryproducts, iscategoryProducts };
};
export const useDeleteProduct = (onSuccessCallback) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      message.success("Xóa sản phẩm thành công");
      onSuccessCallback?.();
    },
    onError: () => {
      message.error("Xóa sản phẩm không thành công");
    },
  });

  return { mutate, isLoading };
};
