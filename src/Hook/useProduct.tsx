import {
  UseQueryResult,
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import {
  addProduct,
  categoryProduct,
  getProducts,
  productsPagination,
} from "../Apis/Api";
import Product from "../Interface/Product";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

export const useProduct = (pages: number) => {
  const { data: products, isLoading: isProducts }: UseQueryResult<Product[]> =
    useQuery({
      queryKey: ["products", pages],
      queryFn: () => productsPagination(pages || 1),
    });
  return { products, isProducts };
};
export const useProducts = () => {
  const { data: products, isLoading: isProducts }: UseQueryResult<Product[]> =
    useQuery({
      queryKey: ["products"],
      queryFn: () => getProducts(),
    });
  return { products, isProducts };
};
export const useCategoryProducts = () => {
  const { caterory } = useParams();

  const {
    data: categoryproducts,
    isLoading: iscategoryProducts,
  }: UseQueryResult<Product> = useQuery({
    queryKey: ["product", caterory],
    queryFn: () => categoryProduct(caterory),
    enabled: !!caterory,
  });
  return { categoryproducts, iscategoryProducts };
};
export const useAddProduct = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: object) => addProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      message.success("Thêm sản phẩm thành công");
      navigate("/admin");
    },
    onError: () => {
      message.error("Thêm sản phẩm không thành công");
    },
  });
  return { mutate, isLoading };
};
