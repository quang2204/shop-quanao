import axios from "axios";
import Axios from "./Axios";
// const Api = "https://be-nodejs-three.vercel.app/api";
export const getProducts = async () => {
  const res = await Axios.get(`/products`);
  return res.data;
};
export const getCategory = async () => {
  const res = await Axios.get(`/categorys`);
  return res.data;
};
export const DetailProduct = async (id: string) => {
  const res = await Axios.get(`/product/${id}`);
  return res.data.data;
};
export const categoryProduct = async (id: string) => {
  const res = await Axios.get(`/products/category/${id}`);
  return res.data;
};
export const productsPagination = async (page: number) => {
  const res = await Axios.get(`/products/${page}`);
  return res.data;
};
export const signin = async (data: object) => {
  const res = await Axios.post(`/login`, data);
  return res.data;
};
export const signup = async (data: object) => {
  const res = await Axios.post(`/register`, data);
  return res.data;
};
export const getCart = async (userid: string) => {
  const res = await Axios.get(`/cart/${userid}`);
  return res.data;
};
export const addCart = async (data: object, userid: number) => {
  const res = await Axios.post(`/cart/${userid}`, data);
  return res.data.data;
};
export const deleteCart = async (id: string) => {
  const res = await Axios.delete(`/cart/${id}`);
  return res.data.data;
};
export const deleteAllCart = async (id: string) => {
  const res = await Axios.delete(`/cart/${id}`);
  return res.data.data;
};
export const updateCart = async (data: object, id: number) => {
  const res = await Axios.patch(`/cart/${id}`, data);
  return res.data.data;
};
export const getVouchers = async () => {
  const res = await Axios.get(`/vouchers`);
  return res.data;
};
export const detailUser = async (id: string) => {
  const res = await Axios.get(`/user/${id}`);
  return res.data;
};
export const addOrder = async (data: object) => {
  const res = await Axios.post(`/order`, data);
  return res.data;
};
export const detailOrder = async (id: string) => {
  const res = await Axios.get(`/order/${id}`);
  return res.data;
};
export const getOrders = async (id: string) => {
  const res = await Axios.get(`/order/user/${id}`);
  return res.data;
};
export const getOrderbystatus = async (status: string, userId: string) => {
  const res = await Axios.get(`/order/status/${status}/${userId}`);
  return res.data;
};
export const updateUser = async (data: object, id: string) => {
  const res = await Axios.patch(`/user/${id}`, data);
  return res.data;
};
export const updatePassword = async (data: object, id: string) => {
  const res = await Axios.patch(`/user/pass/${id}`, data);
  return res.data;
};
export const addProduct = async (data: object) => {
  const res = await Axios.post(`/products`, data);
  return res.data;
};
