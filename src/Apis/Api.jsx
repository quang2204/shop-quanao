import Axios from "./Axios";
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
export const categoryProduct = async (id) => {
  const res = await Axios.get(`/products/category/${id}`);
  return res.data;
};
export const productVariants = async (id) => {
  const res = await Axios.get(`api/admin/product-variants/${id}`);
  return res.data;
};
export const productGalleries = async (id) => {
  const res = await Axios.get(`/products/gallery/${id}`);
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
  const res = await Axios.post(`/register`, data);
  return res.data;
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
}
export const CartItem = async (data) => {
  const res = await Axios.get(`api/admin/cart-items`, data);
  return res.data;
}
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
export const user = async (page) => {
  const res = await Axios.get(`api/admin/users/?page=${page}`);
  return res.data;
};
export const detailUser = async (id) => {
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
  const res = await Axios.post(`/order`, data);
  return res.data;
};
export const detailOrder = async (id) => {
  const res = await Axios.get(`/order/${id}`);
  return res.data;
};
export const getOrders = async (id) => {
  const res = await Axios.get(`/order/user/${id}`);
  return res.data;
};
export const getOrderbystatus = async (status, userId) => {
  const res = await Axios.get(`/order/status/${status}/${userId}`);
  return res.data;
};
export const updateUser = async (data, id) => {
  const res = await Axios.patch(`/user/${id}`, data);
  return res.data;
};
export const deleteOrder = async (id) => {
  const res = await Axios.delete(`api/admin/order/${id}`);
  return res.data;
};
export const updatePassword = async (data, id) => {
  const res = await Axios.patch(`/user/pass/${id}`, data);
  return res.data;
};
export const addProduct = async (data) => {
  const res = await Axios.post(`/products`, data);
  return res.data;
};
// color
export const getColors = async (page = 1) => {
  const res = await Axios.get(`/api/admin/colors?page=${page}`);
  console.log('đã call được api của color'); 
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

export const getVouchers = async (page = 1) => {
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
//slideslide
export const getBanners = async (page = 1) => {
  const res = await Axios.get(`/api/admin/banners?page=${page}`);
  return res.data;
};

