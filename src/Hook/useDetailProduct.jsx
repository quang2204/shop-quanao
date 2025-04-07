import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  DetailProduct,
  productGalleries,
  productVariant,
  productVariants,
} from "../Apis/Api";
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
    queryFn: () => productVariants(id ),
    // enabled: !!id,
  });
  return { productVariant, isProductVariants };
};
const useProductVariant = () => {
  const { data: productVariant, isLoading: isproductVariant } = useQuery({
    queryKey: ["productVariants"],
    queryFn: () => productVariant(),
  });
  return { productVariant, isproductVariant };
};
const useProductGalleries = () => {
  const { id } = useParams();
  const { data: productGallerie, isLoading: isproductGalleries } = useQuery({
    queryKey: ["productGalleries"],
    queryFn: () => productGalleries(id),
  });
  return { productGallerie, isproductGalleries };
};
export {
  useDetailProduct,
  useProductVariants,
  useProductVariant,
  useProductGalleries,
};
