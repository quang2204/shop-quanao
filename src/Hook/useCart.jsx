import { useQuery } from "react-query";
import { CartItem, addCartItem, getCart } from "../Apis/Api";
const useCart = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Kiểm tra nếu không có user._id thì không gọi API
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(user.id),
    enabled: !!user.id, // Chỉ chạy query nếu user._id tồn tại
  });

  return { data, isLoading };
};
const useCartItem = () => {
  const { data: cartItem, isLoading: isCartItem } = useQuery({
    queryKey: ["cartItem"],
    queryFn: () => CartItem(),
  });
  return { cartItem, isCartItem };
};
export { useCart, useCartItem };
