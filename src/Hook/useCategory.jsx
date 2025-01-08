import {  useQuery } from "react-query";
import { getCategory } from "../Apis/Api";
const useCategory = () => {
  const { data: category, isLoading: isCategory } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
  return { category, isCategory };
};

export default useCategory;
