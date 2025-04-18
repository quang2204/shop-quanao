import { useQuery } from "react-query";
import { CartItem, addCartItem, getCart } from "../Apis/Api";
import useAuth from "./useAuth";

const useCart = () => {
  const { data: auth } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["cart", auth?.id],
    queryFn: () => getCart(auth.id),
    enabled: !!auth?.id, // Chỉ chạy query nếu auth.id tồn tại
  });

  return { data, isLoading };
};

const useCartItem = () => {
  const { data: cartData, isLoading: isCartLoading } = useCart();
  const { data: cartItem, isLoading: isCartItemLoading } = useQuery({
    queryKey: ["cartItem", cartData?.id],
    queryFn: () => CartItem(cartData?.id),
    enabled: !!cartData?.id && !isCartLoading, 
  });

  const isLoading = isCartLoading || isCartItemLoading;

  return { cartItem, isLoading };
};

export { useCart, useCartItem };
