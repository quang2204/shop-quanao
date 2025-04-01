import { useQuery } from "react-query";
import { getSize } from "../Apis/Api";

export const useSizes = () => {
  const { data: sizes, isLoading:isLoadingSize } = useQuery({
    queryKey: ["sizes"],
    queryFn: getSize,
  });
  return { sizes, isLoadingSize };
};
