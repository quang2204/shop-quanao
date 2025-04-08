import { useQuery } from "react-query";
import { CartItem, addCartItem, getCart } from "../Apis/Api";
import useAuth from "./useAuth";

const useCart = () => {
  const { data: auth } = useAuth();
  const user = JSON.parse(localStorage.getItem("auth_token") || "{}");

  const { data, isLoading } = useQuery({
    queryKey: ["cart", auth?.id],
    queryFn: () => getCart(auth.id),
    enabled: !!auth?.id, // Chỉ chạy query nếu auth.id tồn tại
  });

  return { data, isLoading };
};

const useCartItem = () => {
  const { data: cartData, isLoading: isCartLoading } = useCart();
  // Kiểm tra nếu cartData là một mảng và có ít nhất một phần tử
  // const cartId =
  //   Array.isArray(cartData) && cartData.length > 0 ? cartData[0].id : null;
  // console.log(cartData);

  const { data: cartItem, isLoading: isCartItemLoading } = useQuery({
    queryKey: ["cartItem", cartData?.id],
    queryFn: () => CartItem(cartData?.id),
    enabled: !!cartData?.id && !isCartLoading, // Chỉ chạy query nếu cartId tồn tại và cartData không đang loading
  });

  // Trả về trạng thái loading nếu cartData đang loading hoặc cartItem đang loading
  const isLoading = isCartLoading || isCartItemLoading;

  return { cartItem, isLoading };
};

export { useCart, useCartItem };
