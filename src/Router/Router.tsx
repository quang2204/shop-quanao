import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import AppLayout from "../Ui/AppLayoutWeb";
import About from "../Pages/About";
import Product from "../Pages/Product";
import ProductDetail from "../Pages/ProductDetail";
import ShopingCart from "../Pages/ShopingCart";
import Contact from "../Pages/Contact";
import Blog from "../Pages/Blog";
import Error from "../Ui/Error";
import ScrollToTop from "../Hook/ScrollToTop";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import Tab from "../Pages/Test";
import Pay from "../Pages/Pay.tsx";
import Bill from "../Pages/Bill.tsx";
import Order from "../Pages/Order.tsx";
import BlogDetail from "../Pages/blog-detail.tsx";
import Portfolio from "../Pages/Portfolio.tsx";
import UpdatePassWord from "../Pages/UpdatePassWord.tsx";
import LayoutAdmin from "../Admin/Ui/Layout.tsx";
import Products from "../Admin/Pages/Products/Products.tsx";
import Detail from "../Admin/Pages/Products/Detail.tsx";
import AddProduct from "../Admin/Pages/Products/AddProduct.tsx";
import Test from "../Pages/Test";
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
          <Route path="tabs" element={<Tab />} />
          <Route path="pay" element={<Pay />} />
          <Route path="blog/:id" element={<Contact />} />
          <Route path="bill/:id" element={<Bill />} />
          <Route path="order" element={<Order />} />
          <Route path="order/:status" element={<Order />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="test" element={<Test />} />
          <Route path="verify/password" element={<UpdatePassWord />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Products />}></Route>
          <Route path="addproduct" element={<AddProduct />}></Route>
          <Route path="detailproduct/:id" element={<Detail />}></Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Router;
