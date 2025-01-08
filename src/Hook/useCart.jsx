import { useQuery } from "react-query";
import { getCart } from "../Apis/Api";
const useCart = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(user._id),
  });
  return { data, isLoading };
};

export default useCart;
