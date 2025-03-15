import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { DetailProduct,productVariants } from "../Apis/Api";
const useDetailProduct = () => {
  const { id } = useParams();

  const { data: detailProduct, isLoading: isDetailProduct } = useQuery({
    queryKey: ["product", id],
    queryFn: () => DetailProduct(id),
    enabled: !!id,
  });

  return { detailProduct, isDetailProduct };
};
const useProductVariants = () => {
  const { id } = useParams();

  const { data: productVariant, isLoading: isProductVariants } = useQuery({
    queryKey: ["productVariants", id],
    queryFn: () => productVariants(id),
    enabled: !!id,
  });
  return { productVariant, isProductVariants };
};
export  {useDetailProduct,useProductVariants};
