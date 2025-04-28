import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  addProduct,
  // addProductGalleries,
  categoryProduct,
  deleteProduct,
  forceDeleteProduct,
  getProducts,
  harddeleteProduct,
  productsPagination,
  restoreProduct,
} from "../Apis/Api";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { use } from "react";

export const useProduct = (page, filters = {}) => {
  const { data: products, isLoading: isProducts } = useQuery({
    queryKey: ["products", page, filters],
    queryFn: () => getProducts(page || 1, filters),
  });
  return { products, isProducts };
};
export const harddeleteProducts = () => {
  const { data: products, isLoading: isProducts } = useQuery({
    queryKey: ["harddeleteproducts"],
    queryFn: () => harddeleteProduct(),
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
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      message.success("Product deleted successfully");
      onSuccessCallback?.();
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};
export const useforceDeleteProduct = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => forceDeleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["harddeleteproducts"] });
      message.success("Product deleted successfully");
      onSuccessCallback?.();
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};
export const userestoreProduct = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => restoreProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["harddeleteproducts"] });
      message.success("Product restore successful");
      onSuccessCallback?.();
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};
