import Axios from "./Axios";
export const getProducts = async () => {
  const res = await Axios.get(`api/products`);
  return res.data;
};
export const getCategory = async () => {
  const res = await Axios.get(`api/categories`);
  return res.data;
};
export const deleteCategory = async (id) => {
  const res = await Axios.delete(`api/categories/${id}`);
  return res.data;
}
export const DetailProduct = async (id) => {
  const res = await Axios.get(`/product/${id}`);
  return res.data.data;
};
export const categoryProduct = async (id) => {
  const res = await Axios.get(`/products/category/${id}`);
  return res.data;
};

export const productsPagination = async (page) => {
  const res = await Axios.get(`/products/${page}`);
  return res.data;
};
export const deleteProduct = async (id) => {
  const res = await Axios.delete(`/products/${id}`);
  return res.data;
};
export const signin = async (data) => {
  const res = await Axios.post(`/login`, data);
  return res.data;
};
export const signup = async (data) => {
  const res = await Axios.post(`/register`, data);
  return res.data;
};
export const getCart = async (userid) => {
  const res = await Axios.get(`/cart/${userid}`);
  return res.data;
};
export const addCart = async (data, userid) => {
  const res = await Axios.post(`/cart/${userid}`, data);
  return res.data.data;
};
export const deleteCart = async (id) => {
  const res = await Axios.delete(`/cart/${id}`);
  return res.data.data;
};
export const deleteAllCart = async (id) => {
  const res = await Axios.delete(`/cart/${id}`);
  return res.data.data;
};
export const updateCart = async (data, id) => {
  const res = await Axios.patch(`/cart/${id}`, data);
  return res.data.data;
};
export const getVouchers = async () => {
  const res = await Axios.get(`/vouchers`);
  return res.data;
};
export const user = async (page) => {
  const res = await Axios.get(`api/users/?page=${page}`);
  return res.data;
};
export const detailUser = async (id) => {
  const res = await Axios.get(`api/users/${id}`);
  return res.data;
};
export const deleteUser = async (id) => {
  const res = await Axios.delete(`api/users/${id}`);
  return res.data;
};
export const addUsers = async (data) => {
  const res = await Axios.post(`api/users`, data);
  return res.data;
}
export const getOrdersAdmin = async () => {
  const res = await Axios.get(`api/orders`);
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
  const res = await Axios.delete(`api/order/${id}`);
  return res.data;
}
export const updatePassword = async (data, id) => {
  const res = await Axios.patch(`/user/pass/${id}`, data);
  return res.data;
};
export const addProduct = async (data) => {
  const res = await Axios.post(`/products`, data);
  return res.data;
};
