import { useQuery } from "react-query";
import { getCart } from "../Apis/Api";
const useCart = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Kiểm tra nếu không có user._id thì không gọi API
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(user._id),
    enabled: !!user._id, // Chỉ chạy query nếu user._id tồn tại
  });

  return { data, isLoading };
};

export default useCart;
