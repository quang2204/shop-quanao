import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import AppLayout from "../Ui/AppLayoutWeb.jsx";
import About from "../Pages/About.jsx";
import Product from "../Pages/Product.jsx";
import ProductDetail from "../Pages/ProductDetail.jsx";
import ShopingCart from "../Pages/ShopingCart.jsx";
import Contact from "../Pages/Contact.jsx";
import Blog from "../Pages/Blog.jsx";
import Error from "../Ui/Error.jsx";
import ScrollToTop from "../Hook/ScrollToTop.jsx";
import Signin from "../Pages/Signin.jsx";
import Signup from "../Pages/Signup.jsx";
import Pay from "../Pages/Pay.jsx";
import Bill from "../Pages/Bill.jsx";
import Order from "../Pages/Order.jsx";
import BlogDetail from "../Pages/blog-detail.jsx";
import Portfolio from "../Pages/Portfolio.jsx";
import UpdatePassWord from "../Pages/UpdatePassWord.jsx";
import Logout from "../Pages/Logout.jsx";
import LoginCallback from "../Pages/LoginCallback.jsx";
import AuthSuccess from "../Pages/AuthSuccess.jsx";
import "../../node_modules/nprogress/nprogress.css";

// Admin Imports
import LayoutAdmin from "../Admin/Ui/Layout.jsx";
import Dashboards from "../Admin/Dashboards.jsx";
import PrivateRouter from "./PrivateRouter.jsx";
import Products from "../Admin/Pages/Products/Products.jsx";
import AddProduct from "../Admin/Pages/Products/AddProduct.jsx";
import Detail_Product from "../Admin/Pages/Products/Detail.jsx";
import Customers from "../Admin/Pages/User/Customers.jsx";
import TwoStep from "../Admin/Pages/User/TwoStep.jsx";
import Order_Detail from "../Admin/Pages/Orders/Order_Detail.jsx";
import Profile from "../Admin/Pages/Profile.jsx";
import Login from "../Admin/Pages/Login.jsx";
import SignIn from "../Admin/Pages/SignIn.jsx";
import Orders from "../Admin/Pages/Orders/Orders.jsx";
import Categories from "../Admin/Pages/Categories/Categories.jsx";
import Categories_Detail from "../Admin/Pages/Categories/Categories_Detail.jsx";
import ColorList from "../Admin/Pages/Colors/ColorList.jsx";
import VoucherList from "../Admin/Pages/Vouchers/VoucherList.jsx";
import FullScreenButton from "../Admin/Ui/FullScreen.jsx";
import Banner from "../Admin/Pages/Banners/Banners.jsx";
import Sizes from "../Admin/Pages/Sizes/Sizes.jsx";
import UpdateProduct from "../Admin/Pages/Products/UpdateProduct.jsx";
import Email_Password from "../Pages/Email_Password.jsx";
import ConfirmResetEmail from "../Pages/ConfirmResetEmail.jsx";

import ResetPassword from "../Pages/ResetPassword.jsx";
import CommentListProduct from "../Admin/Pages/Comment/CommentListProduct.jsx";
import CommentList from "../Admin/Pages/Comment/CommentList.jsx";


import Blogs from "../Admin/Pages/Blogs/Blogs.jsx";
import AddBlog from "../Admin/Pages/Blogs/AddBlog.jsx";
import UpdateBlog from "../Admin/Pages/Blogs/UpdateBlog.jsx";

const Router = () => {
  ScrollToTop();
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="product" element={<Product />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="product/category/:category" element={<Product />} />
        <Route path="product/pages/:pages" element={<Product />} />
        <Route path="cart" element={<ShopingCart />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="auth-success" element={<AuthSuccess />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="pay" element={<Pay />} />
        <Route path="bill/:id" element={<Bill />} />
        <Route path="order" element={<Order />} />
        <Route path="order/:status" element={<Order />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="emailpassword" element={<Email_Password />} />
        <Route path="confirmemail" element={<ConfirmResetEmail />} />
        <Route path="verify/password" element={<UpdatePassWord />} />
        <Route path="twostep" element={<TwoStep />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <PrivateRouter>
            <LayoutAdmin />
          </PrivateRouter>
        }
      >
        <Route index element={<Dashboards />} />
        <Route path="products" element={<Products />} />
        <Route path="uppdateproduct/:id" element={<UpdateProduct />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:id" element={<Categories_Detail />} />
        <Route path="banners" element={<Banner />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="addblog" element={<AddBlog />} />
        <Route path="updateblog/:id" element={<UpdateBlog />} />
        <Route path="sizes" element={<Sizes />} />
        <Route path="product_detail/:id" element={<Detail_Product />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:id" element={<Customers />} />
        <Route path="order" element={<Orders />} />
        <Route path="order_detail/:id" element={<Order_Detail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="colors" element={<ColorList />} />
        <Route path="vouchers" element={<VoucherList />} />
        <Route path="comments" element={<CommentListProduct />} />
        <Route path="comment-list/:id" element={<CommentList />} />
        <Route path="fullscreen" element={<FullScreenButton />} />
        <Route path="login/callback" element={<LoginCallback />} />
      </Route>

      {/* Other Routes */}
      <Route path="logout" element={<Logout />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Router;
