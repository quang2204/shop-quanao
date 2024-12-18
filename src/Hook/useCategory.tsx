
import { UseQueryResult, useQuery } from "react-query";
import { getCategory } from "../Apis/Api";
import Category from "../Interface/Category";

 const useCategory = () => {
  const { data: category, isLoading: isCategory }:UseQueryResult<Category[]> = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
  return { category, isCategory };
};

export default useCategory;
