import { useMutation } from "react-query";
import Axios from "./Axios";
import useAuth from "../Hook/useAuth";
export const getProducts = async (page) => {
  const res = await Axios.get(`api/admin/products?page=${page}`);
  return res.data;
};
export const getCategory = async () => {
  const res = await Axios.get(`api/admin/categories`);
  return res.data;
};
export const deleteCategory = async (id) => {
  const res = await Axios.delete(`api/admin/categories/${id}`);
  return res.data;
};

export const DetailProduct = async (id) => {
  const res = await Axios.get(`api/admin/products/${id}`);
  return res.data;
};
export const productGalleries = async (id) => {
  const res = await Axios.get(`api/admin/admin/product-galleries/${id}`);
  return res.data;
};
export const addProductGallerie = async (id,data) => {
  const res = await Axios.post(`api/admin/galleries/${id}`,data);
  return res.data;
};

export const categoryProduct = async (id) => {
  const res = await Axios.get(`/products/category/${id}`);
  return res.data;
};
export const productVariant = async () => {
  try {
    const res = await Axios.get("/api/admin/product-variants");
    return res.data;
  } catch (error) {
    console.error("Error fetching product variants:", error);
    throw new Error("Failed to fetch product variants");
  }
};
export const productVariants = async (id) => {
  const res = await Axios.get(`api/admin/product-variants/${id}`);
  return res.data;
};

export const productsPagination = async (page) => {
  const res = await Axios.get(`/products/${page}`);
  return res.data;
};
export const deleteProduct = async (id) => {
  const res = await Axios.delete(`api/admin/products/${id}`);
  return res.data;
};
export const signin = async (data) => {
  const res = await Axios.post(`/api/login`, data);
  return res.data;
};
export const signup = async (data) => {
  const res = await Axios.post(`api/register`, data);
  return res.data;
};
// export const logout=async ()=>{
//   const res = await Axios.post(`api/logout`, {
//     headers: {
//       Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token")).split("|")[1]}`,
//     },
//   });
//   return res.data.user;
// }

export const logout = async () => {
  const authToken = localStorage.getItem("auth_token");
  if (!authToken) {
    throw new Error("No auth token found");
  }

  const token = JSON.parse(authToken).split("|")[1];
  const res = await Axios.post("/api/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.user;
};

export const getUserToken = async () => {
  const res = await Axios.get(`api/user_token`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token")).split("|")[1]}`,
    },
  });
  return res.data.user;
};
export const getCart = async (userid) => {
  const res = await Axios.get(`api/admin/carts/${userid}`);
  return res.data;
};
export const addCart = async (data, userid) => {
  const res = await Axios.post(`/cart/${userid}`, data);
  return res.data.data;
};
export const addCartItem = async (data) => {
  const res = await Axios.post(`api/admin/cart-items`, data);
  return res.data;
};
export const CartItem = async (id) => {
  const res = await Axios.get(`api/admin/cart-items/${id}`);
  return res.data;
};
export const deleteCart = async (id) => {
  const res = await Axios.delete(`api/admin/cart-items/${id}`);
  return res.data.data;
};
export const deleteAllCart = async (id) => {
  const res = await Axios.delete(`/cart/${id}`);
  return res.data.data;
};
export const updateCartItem = async (data, id) => {
  const res = await Axios.patch(`api/admin/cart-items/${id}`, data);
  return res.data;
};
export const updateCart = async (data, id) => {
  const res = await Axios.patch(`/cart/${id}`, data);
  return res.data.data;
};

export const getVouchers = async () => {
  const res = await Axios.get(`api/admin/vouchers`);
  return res.data;
};

export const user = async (page) => {
  const res = await Axios.get(`api/admin/users/?page=${page}`);
  return res.data;
};
export const detailUser = async () => {
  const { data } = useAuth();
  const res = await Axios.get(`api/admin/users/${data.id}`);
  return res.data;
};
export const detailUserId = async (id) => {
  const res = await Axios.get(`api/admin/users/${id}`);
  return res.data;
};
export const deleteUser = async (id) => {
  const res = await Axios.delete(`api/admin/users/${id}`);
  return res.data;
};
export const addUsers = async (data) => {
  const res = await Axios.post(`api/admin/users`, data);
  return res.data;
};

export const getOrdersAdmin = async () => {
  const res = await Axios.get(`api/admin/orders`);
  return res.data;
};
export const addOrder = async (data) => {
  const res = await Axios.post(`api/admin/orders`, data);
  return res.data;
};
export const detailOrder = async (id) => {
  const res = await Axios.get(`api/admin/order-details/${id}`);
  return res.data;
};
export const getOrders = async (id) => {
  const res = await Axios.get(`api/admin/orders/${id}`);
  return res.data;
};
export const addOrderDetail = async (data) => {
  const res = await Axios.post("api/admin/order-details", data);
  return res.data;
};
export const getOrderbystatus = async (status, userId) => {
  const res = await Axios.get(`/order/status/${status}/${userId}`);
  return res.data;
};
export const getOrderByUserid = async ( userId) => {
  const res = await Axios.get(`api/admin/orders/byuser/${userId}`);
  return res.data;
};
export const updateUser = async (data, id) => {
  console.log(id);
  const res = await Axios.put(`api/admin/users/${id}`, data);
  return res.data;
};
export const deleteOrder = async (id) => {
  const res = await Axios.delete(`api/admin/users/${id}`);
  return res.data;
};
export const updatePassword = async (data, id) => {
  const res = await Axios.patch(`/user/pass/${id}`, data);
  return res.data;
};
export const addProduct = async (data) => {
  const res = await Axios.post(`api/admin/products`, data);
  return res.data;
};


// color
export const getColors = async (page = 1) => {
  const res = await Axios.get(`/api/admin/colors?page=${page}`);
  return res.data;
};

export const getColorDetail = async (id) => {
  const res = await Axios.get(`/api/admin/colors/${id}`);
  return res.data;
};

export const createColor = async (data) => {
  const res = await Axios.post(`/api/admin/colors`, data);
  return res.data;
};

export const updateColor = async (id, data) => {
  const res = await Axios.put(`/api/admin/colors/${id}`, data);
  return res.data;
};
export const deleteColor = async (id) => {
  const res = await Axios.delete(`/api/admin/colors/${id}`);
  return res.data;
};

export const forceDeleteColor = async (id) => {
  const res = await Axios.delete(`/api/admin/colors/force-delete/${id}`);
  return res.data;
};
//voucher

export const getVouchersAdmin = async (page = 1) => {
  const res = await Axios.get(`/api/admin/vouchers?page=${page}`);
  return res.data;
};

export const getVoucherDetail = async (id) => {
  const res = await Axios.get(`/api/admin/vouchers/${id}`);
  return res.data;
};

export const createVoucher = async (data) => {
  const res = await Axios.post(`/api/admin/vouchers`, data);
  return res.data;
};

export const updateVoucher = async (id, data) => {
  const res = await Axios.put(`/api/admin/vouchers/${id}`, data);
  return res.data;
};

export const deleteVoucher = async (id) => {
  const res = await Axios.delete(`/api/admin/vouchers/${id}`);
  return res.data;
};

export const forceDeleteVoucher = async (id) => {
  const res = await Axios.delete(`/api/admin/vouchers/force-delete/${id}`);
  return res.data;
};
//size
export const getSize = async () => {
  const res = await Axios.get(`/api/admin/sizes?page=${page}`);
  return res.data;
};
//slideslide
export const getBanners = async (page = 1) => {
  const res = await Axios.get(`/api/admin/banners?page=${page}`);
  return res.data;
};

//banners 
export const getBannerDetail = async (id) => {
  const res = await Axios.get(`/api/admin/banners/${id}`);
  return res.data;
};

export const createBanner = async (formData) => {
  const res = await Axios.post(`/api/admin/banners`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateBanner = async (id, formData) => {
  const res = await Axios.put(`/api/admin/banners/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status !== 200) {
    throw new Error("Failed to update banner");
  }
  // Xử lý thành công
  console.log("Banner updated successfully:", res.data);
  // Trả về dữ liệu đã cập nhật
  return res.data;
};

export const deleteBanner = async (id) => {
  await Axios.delete(`/api/admin/banners/${id}`);
};
//sizes 
export const getSizes = async (page = 1) => {
  const res = await Axios.get(`/api/admin/sizes?page=${page}`);
  return res.data;
};
export const createSize = async (data) => {
  const res = await Axios.post(`/api/admin/sizes`, data);
  return res.data;
};
export const updateSize = async (id, data) => {
  const res = await Axios.put(`/api/admin/sizes/${id}`, data);
  return res.data;
};
export const deleteSize = async (id) => {
  const res = await Axios.delete(`/api/admin/sizes/${id}`);
  return res.data;
};
export const useLoginGoogle = () => {
  const loginWithGoogle = () => {
    // Chuyển hướng người dùng đến URL xác thực của Google
    window.location.href = `http://127.0.0.1:8000/auth/google`;
  };

  return { loginWithGoogle };
};
