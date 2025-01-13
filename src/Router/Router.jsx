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
import Detail from "../Admin/Pages/Products/Detail.jsx";
import Advance_ui_animation from "../Admin/velzon/advance_ui_animation.jsx";

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
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Products />}></Route>
          <Route path="addproduct" element={<AddProduct />}></Route>
          <Route path="animation" element={<Advance_ui_animation />}></Route>
          <Route path="detailproduct/:id" element={<Detail />}></Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Router;
