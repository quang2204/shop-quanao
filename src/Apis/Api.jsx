import { useMutation } from "react-query";
import Axios from "./Axios";
import useAuth from "../Hook/useAuth";
export const getProducts = async (page, filters = {}) => {
  const params = new URLSearchParams();
  params.append("page", page);
  // Add filters if they exist
  if (filters.price) params.append("price", filters.price);
  if (filters.category_id) params.append("category_id", filters.category_id);
  if (filters.sort) params.append("sort_price", filters.sort);
  if (filters.search) params.append("search", filters.search);
  const res = await Axios.get(`api/admin/products?${params.toString()}`);
  return res.data;
};
export const getCategory = async (page) => {
  const res = await Axios.get(`api/admin/categories?page=${page}`);
  return res.data;
};
export const categoryTrashed = async () => {
  const res = await Axios.get(`api/categories/trashed`);
  return res.data;
};
export const categoryRestore = async (id) => {
  const res = await Axios.put(`api/categories/restore/${id}`);
  return res.data;
};
export const categoryForcedelete = async (id) => {
  const res = await Axios.delete(`api/categories/force-delete/${id}`);
  return res.data;
};
export const deleteCategory = async (id) => {
  const res = await Axios.delete(`api/admin/categories/${id}`);
  return res.data;
};
export const updateCategory = async (id, data) => {
  const res = await Axios.put(`api/admin/categories/${id}`, data);
  return res.data;
};

export const addCategory = async (data) => {
  const res = await Axios.post(`api/admin/categories`, data);
  return res.data;
};
export const DetailProduct = async (id) => {
  const res = await Axios.get(`api/admin/products/${id}`);
  return res.data;
};
export const forceDeleteProduct = async (id) => {
  const res = await Axios.delete(`api/products/force-delete/${id}`);
  return res.data;
};
export const restoreProduct = async (id) => {
  const res = await Axios.put(`api/products/restore/${id}`);
  return res.data;
};
export const productGalleries = async (id) => {
  const res = await Axios.get(`api/admin/admin/product-galleries/${id}`);
  return res.data;
};
export const addProductGallerie = async (id, data) => {
  const res = await Axios.post(`api/admin/galleries/${id}`, data);
  return res.data;
};
export const addProductVariants = async (id, data) => {
  const res = await Axios.post(`api/admin/product-variants/${id}`, data);
  return res.data;
};
export const updateProductGallerie = async (id, data) => {
  const res = await Axios.put(`api/admin/admin/product-galleries/${id}`, data);
  return res.data;
};
export const updateProduct = async (id, data) => {
  const res = await Axios.put(`api/admin/products/${id}`, data);
  return res.data;
};
export const updateProductVariants = async (id, data) => {
  const res = await Axios.put(`api/admin/product-variants/${id}`, data);
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
    // headers: {
    //   Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token")).split("|")[1]}`,
    // },
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
export const deleteAllCartitem = async (id) => {
  const res = await Axios.delete(`api/admin/cart-items/cart/${id}`);
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

export const getVouchers = async (page) => {
  const res = await Axios.get(`api/admin/vouchers?page=${page}`);
  return res.data;
};
export const getVouchers_User = async (id) => {
  const res = await Axios.get(`api/admin/users/${id}/vouchers`);
  return res.data;
};
export const user = async (page, filter = {}) => {
  const param = new URLSearchParams();
  param.append("page", page);
  if (filter.search) param.append("email", filter.search);
  if (filter.role !== undefined && filter.role !== "")
    param.append("role", filter.role);
  const res = await Axios.get(`api/admin/users?${param.toString()}`);
  return res.data;
};
export const detailUser = async () => {
  const { data: user } = useAuth();
  const res = await Axios.get(`api/admin/users/${user.id}`);
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
export const updateUsers = async (id, data) => {
  const res = await Axios.put(`api/admin/users/${id}`, data);
  return res.data;
};
export const getOrdersAdmin = async (page, filters = {}) => {
  const params = new URLSearchParams({
    page,
    ...(filters.search && { keyword: filters.search }),
    ...(filters.statusOrder && { status: filters.statusOrder }),
    ...(filters.paymen && { payment_method: filters.paymen }),
  });
  const res = await Axios.get(`/api/admin/orders/?${params.toString()}`);
  return res.data;
};

export const addOrder = async (data) => {
  const res = await Axios.post(`api/admin/orders`, data);
  return res.data;
};
export const udateStatusOrder = async (id, data) => {
  const res = await Axios.post(`api/admin/orders/status/${id}`, {
    status: data,
  });
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
export const getOrderByUserid = async (userId, filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  const res = await Axios.get(
    `api/admin/orders/byuser/${userId}?${params.toString()}`
  );
  return res.data;
};
export const updateUser = async (data, id) => {
  const res = await Axios.put(`api/admin/users/${id}`, data);
  return res.data;
};
export const deleteOrder = async (id) => {
  const res = await Axios.delete(`api/admin/users/${id}`);
  return res.data;
};
export const addProduct = async (data) => {
  const res = await Axios.post(`api/admin/products`, data);
  return res.data;
};
export const harddeleteProduct = async () => {
  const res = await Axios.get(`api/products/trashed`);
  return res.data;
};
// blog
export const harddeleteBlog = async () => {
  const res = await Axios.get(`api/blogs/trashed`);
  return res.data;
};
export const forceDeleteBlog = async (id) => {
  const res = await Axios.delete(`api/blogs/force-delete/${id}`);
  return res.data;
};
export const restoreBlog = async (id) => {
  const res = await Axios.put(`api/blogs/restore/${id}`);
  return res.data;
};
// color
export const getColors = async (page) => {
  const res = await Axios.get(`/api/admin/colors?page=${page}`);
  return res.data;
};
export const getColorsTrashed = async () => {
  const res = await Axios.get(`api/colors/trashed`);
  return res.data;
};
export const Colorsforcedelete = async (id) => {
  const res = await Axios.delete(`api/colors/force-delete/${id}`);
  return res.data;
};
export const Colorsrestore = async (id) => {
  const res = await Axios.put(`api/colors/restore/${id}`);
  return res.data;
};
//
export const getSizesTrashed = async () => {
  const res = await Axios.get(`api/sizes/trashed`);
  return res.data;
};
export const Sizesforcedelete = async (id) => {
  const res = await Axios.delete(`api/sizes/force-delete/${id}`);
  return res.data;
};
export const Sizesrestore = async (id) => {
  const res = await Axios.put(`api/sizes/restore/${id}`);
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
  const res = await Axios.post(`/api/admin/banners`, formData);
  return res.data;
};

export const updateBanner = async (id, formData) => {
  const res = await Axios.put(`/api/admin/banners/${id}`, formData);
  if (res.status !== 200) {
    throw new Error("Failed to update banner");
  }

  return res.data;
};

export const deleteBanner = async (id) => {
  await Axios.delete(`/api/admin/banners/${id}`);
};
//sizes
export const getSize = async () => {
  const res = await Axios.get(`api/admin/sizes`);
  return res.data;
};
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
export const orderMomo = async (data) => {
  const res = await Axios.post(`api/momo/create-payment`, data);
  return res.data;
};
export const orderUpdate = async (id, data) => {
  const res = await Axios.put(`api/admin/orders/${id}`, data);
  return res.data;
};
export const dashboard = async (startDate, endDate, additionalParams = {}) => {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append("from_date", startDate);
    if (endDate) params.append("to_date", endDate);

    const res = await Axios.get(`api/admin/dashboard?${params.toString()}`);
    return res.data;
  } catch (error) {
    // Xử lý lỗi tốt hơn
    console.error("Error fetching dashboard data:", error);
    throw error; // Ném lỗi để component có thể bắt và xử lý
  }
};
export const emailPassword = async (data) => {
  const res = await Axios.post("api/forgot", data);
  return res.data;
};
export const verifytoken = async (data) => {
  const res = await Axios.post("api/verify-token", data);
  return res.data;
};
export const resetpassword = async (data) => {
  const res = await Axios.post("api/reset-password", data);
  return res.data;
};

//comment
// Lấy danh sách bình luận
export const getComments = async (page = 1) => {
  const res = await Axios.get(`/api/comments?page=${page}`);
  return res.data;
};

// Lấy chi tiết bình luận
export const getCommentDetail = async (id) => {
  const res = await Axios.get(`/api/comments/${id}`);
  return res.data;
};

// Lấy danh sách bình luận con
export const getChildComments = async (id) => {
  try {
    const response = await Axios.get(`/api/comments/${id}/children`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { childComments: [] };
    }
    throw error;
  }
};

// Xóa bình luận
export const deleteComment = async (id) => {
  const res = await Axios.delete(`/api/comments/${id}`);
  return res.data;
};
export const updatePassword = async (data) => {
  const res = await Axios.post("api/change-password", data);
  return res.data;
};
export const getHome = async () => {
  const res = await Axios.get("api");
  return res.data;
};
export const getBlogs = async (filters = {}) => {
  const params = new URLSearchParams();
  // Add filters if they exist
  if (filters.category_id) params.append("category_id", filters.category_id);
  if (filters.page) params.append("sort_price", filters.sort);
  if (filters.search) params.append("search", filters.search);
  const res = await Axios.get(`api/blogs?${params.toString()}`);
  return res.data;
};
export const getBlogsAdmin = async () => {
  const res = await Axios.get(`api/admin/blogs`);
  return res.data;
};
export const getBlogDetail = async (id) => {
  const res = await Axios.get(`api/blogs/${id}`);
  return res.data;
};
export const getCaterotyBlog = async () => {
  const res = await Axios.get(`api/admin/category-blogs`);
  return res.data;
};
export const getBlogDetailAdmin = async (id) => {
  const res = await Axios.get(`api/admin/blogs/${id}`);
  return res.data;
};
export const blogDelete = async (id) => {
  const res = await Axios.delete(`api/admin/blogs/${id}`);
  return res.data;
};
export const getCommentIdProduct = async (id, filterStart) => {
  let url = `api/products/${id}/comments`;

  if (filterStart) {
    url += `?stars=${filterStart}`;
  }

  const res = await Axios.get(url);
  return res.data;
};
export const getCateroryBlog = async () => {
  const res = await Axios.get(`api/admin/category-blogs`);
  return res.data;
};
export const getCateroryBlogAdmin = async (page) => {
  const res = await Axios.get(`api/paginate?page=${page}`);
  return res.data;
};
export const addCateroryBlog = async (data) => {
  const res = await Axios.post(`api/admin/category-blogs`, data);
  return res.data;
};
export const detailCateroryBlog = async (id) => {
  const res = await Axios.post(`api/admin/category-blogs/${id}`);
  return res.data;
};
export const deleteCateroryBlog = async (id) => {
  const res = await Axios.delete(`api/admin/category-blogs/${id}`);
  return res.data;
};
export const updateCateroryBlog = async (id, data) => {
  const res = await Axios.put(`api/admin/category-blogs/${id}`, data);
  return res.data;
};
export const AddBlog = async (data) => {
  const res = await Axios.post(`api/admin/blogs`, data);
  return res.data;
};
export const updateBlog = async (id, data) => {
  const res = await Axios.put(`api/admin/blogs/${id}`, data);
  return res.data;
};
export const addComents = async (data) => {
  const res = await Axios.post(`api/comments/store`, data);
  return res.data;
};
