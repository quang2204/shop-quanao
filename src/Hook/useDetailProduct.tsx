import { UseQueryResult, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { DetailProduct } from "../Apis/Api";
import Product from "../Interface/Product";

const useDetailProduct = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: detailProduct,
    isLoading: isDetailProduct, 
  }: UseQueryResult<Product> = useQuery({
    queryKey: ["product", id],
    queryFn: () => DetailProduct(id), 
    enabled: !!id, 
  });

  return { detailProduct, isDetailProduct };
};

export default useDetailProduct;
