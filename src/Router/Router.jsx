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
import LayoutAdmin from "../Admin/Ui/Layout.jsx";
import Products from "../Admin/Pages/Products/Products.jsx";
import AddProduct from "../Admin/Pages/Products/AddProduct.jsx";
import Detail_Product from "../Admin/Pages/Products/Detail.jsx";
import Customers from "../Admin/Pages/User/Customers.jsx";
import TwoStep from "../Admin/Pages/User/TwoStep.jsx";
import Order_Detail from "../Admin/Pages/Orders/Order_Detail.jsx";
import Logout from "../Pages/Logout.jsx";
import Profile from "../Admin/Pages/Profile.jsx";
import FullScreenButton from "../Admin/Ui/FullScreen.jsx";

import Login from "../Admin/Pages/Login.jsx";
import ResetPassword from "../Admin/Pages/Reset.jsx";
import SignIn from "../Admin/Pages/SignIn.jsx";
import Orders from "../Admin/Pages/Orders/Orders.jsx";
import Dashboards from "../Admin/Dashboards.jsx";
import PrivateRouter from "./PrivateRouter.jsx";
import Categories from "../Admin/Pages/Categories/Categories.jsx";
import Categories_Detail from "../Admin/Pages/Categories/Categories_Detail.jsx";

const Router = () => {
  ScrollToTop();
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="product" element={<Product />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="product/category/:caterory" element={<Product />} />
          <Route path="product/pages/:pages" element={<Product />} />
          <Route path="cart" element={<ShopingCart />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="pay" element={<Pay />} />
          <Route path="blog/:id" element={<Contact />} />
          <Route path="bill/:id" element={<Bill />} />
          <Route path="order" element={<Order />} />
          <Route path="order/:status" element={<Order />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="verify/password" element={<UpdatePassWord />} />
        </Route>
        //Admin
        <Route path="/admin" element={<PrivateRouter>
          <LayoutAdmin />
        </PrivateRouter> }>
          <Route index element={<Dashboards />}/>
          <Route path="products" element={<Products />}/>
          <Route path="addproduct" element={<AddProduct />}/>
          <Route path="categories" element={<Categories />}/>
          <Route path="detailproduct" element={<Detail_Product />}/>
          <Route path="detailproduct/:id" element={<Detail_Product />}/>
          <Route path="signin" element={<SignIn />}/>
          <Route path="customers" element={<Customers />}/>
          <Route path="customers/:id" element={<Customers />}/>
          <Route path="order" element={<Orders />}/>
          <Route path="order_detail/:id" element={<Order_Detail />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="login" element={<Login />}/>
          <Route path="reset" element={<ResetPassword />}/>
          <Route path="categories/:id" element={<Categories_Detail />}/>
          <Route path="test" element={<FullScreenButton />}/>
        </Route>
        <Route path="twostep" element={<TwoStep />}/>
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Router;
