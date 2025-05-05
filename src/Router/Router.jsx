import "../../node_modules/nprogress/nprogress.css";
import { Suspense, lazy } from "react";
import { Spin } from "antd";
import { Route, Routes } from "react-router-dom";
// Public Pages
const Home = lazy(() => import("../Pages/Home.jsx"));
const About = lazy(() => import("../Pages/About.jsx"));
const Product = lazy(() => import("../Pages/Product.jsx"));
const ProductDetail = lazy(() => import("../Pages/ProductDetail.jsx"));
const ShopingCart = lazy(() => import("../Pages/ShopingCart.jsx"));
const Contact = lazy(() => import("../Pages/Contact.jsx"));
const Blog = lazy(() => import("../Pages/Blog.jsx"));
const BlogDetail = lazy(() => import("../Pages/blog-detail.jsx"));
const Signin = lazy(() => import("../Pages/Signin.jsx"));
const Signup = lazy(() => import("../Pages/Signup.jsx"));
const Pay = lazy(() => import("../Pages/Pay.jsx"));
const Bill = lazy(() => import("../Pages/Bill.jsx"));
const Order = lazy(() => import("../Pages/Order.jsx"));
const Portfolio = lazy(() => import("../Pages/Portfolio.jsx"));
const UpdatePassWord = lazy(() => import("../Pages/UpdatePassWord.jsx"));
const Logout = lazy(() => import("../Pages/Logout.jsx"));
const LoginCallback = lazy(() => import("../Pages/LoginCallback.jsx"));
const AuthSuccess = lazy(() => import("../Pages/AuthSuccess.jsx"));
const Email_Password = lazy(() => import("../Pages/Email_Password.jsx"));
const ConfirmResetEmail = lazy(() => import("../Pages/ConfirmResetEmail.jsx"));

// Admin Pages
const LayoutAdmin = lazy(() => import("../Admin/Ui/Layout.jsx"));
const Dashboards = lazy(() => import("../Admin/Dashboards.jsx"));
const Products = lazy(() => import("../Admin/Pages/Products/Products.jsx"));
const AddProduct = lazy(() => import("../Admin/Pages/Products/AddProduct.jsx"));
const Detail_Product = lazy(() => import("../Admin/Pages/Products/Detail.jsx"));
const UpdateProduct = lazy(
  () => import("../Admin/Pages/Products/UpdateProduct.jsx")
);
const Harddelete = lazy(() => import("../Admin/Pages/Products/Harddelete.jsx"));

const Customers = lazy(() => import("../Admin/Pages/User/Customers.jsx"));
const TwoStep = lazy(() => import("../Admin/Pages/User/TwoStep.jsx"));

const Orders = lazy(() => import("../Admin/Pages/Orders/Orders.jsx"));
const Order_Detail = lazy(
  () => import("../Admin/Pages/Orders/Order_Detail.jsx")
);

const Profile = lazy(() => import("../Admin/Pages/Profile.jsx"));

const Categories = lazy(
  () => import("../Admin/Pages/Categories/Categories.jsx")
);
const HarddeleteCategories = lazy(
  () => import("../Admin/Pages/Categories/HarddeleteCategories.jsx")
);

const ColorList = lazy(() => import("../Admin/Pages/Colors/ColorList.jsx"));
const ColorTrashed = lazy(
  () => import("../Admin/Pages/Colors/ColorTrashed.jsx")
);

const VoucherList = lazy(
  () => import("../Admin/Pages/Vouchers/VoucherList.jsx")
);

const Banner = lazy(() => import("../Admin/Pages/Banners/Banners.jsx"));

const Sizes = lazy(() => import("../Admin/Pages/Sizes/Sizes.jsx"));
const SizeTrashed = lazy(() => import("../Admin/Pages/Sizes/SizeTrashed.jsx"));

const CommentListProduct = lazy(
  () => import("../Admin/Pages/Comment/CommentListProduct.jsx")
);
const CommentList = lazy(
  () => import("../Admin/Pages/Comment/CommentList.jsx")
);

const Blogs = lazy(() => import("../Admin/Pages/Blogs/Blogs.jsx"));
const AddBlog = lazy(() => import("../Admin/Pages/Blogs/AddBlog.jsx"));
const UpdateBlog = lazy(() => import("../Admin/Pages/Blogs/UpdateBlog.jsx"));
const HarddeleteBlog = lazy(
  () => import("../Admin/Pages/Blogs/Harddelete.jsx")
);

const Categoryblogs = lazy(
  () => import("../Admin/Pages/Category_blogs/Categoryblogs.jsx")
);

// Layouts and UI
const AppLayout = lazy(() => import("../Ui/AppLayoutWeb.jsx"));
const Error = lazy(() => import("../Ui/Error.jsx"));
const ScrollToTop = lazy(() => import("../Hook/ScrollToTop.jsx"));
const PrivateRouter = lazy(() => import("./PrivateRouter.jsx"));
const FullScreenButton = lazy(() => import("../Admin/Ui/FullScreen.jsx"));

const Router = () => {
  // ScrollToTop();
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
        />
      }
    >
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
          <Route path="hard-delete-product" element={<Harddelete />} />
          <Route path="hard-delete-blog" element={<HarddeleteBlog />} />
          <Route
            path="hard-delete-caterory"
            element={<HarddeleteCategories />}
          />
          <Route path="hard-delete-color" element={<ColorTrashed />} />
          <Route path="hard-delete-size" element={<SizeTrashed />} />
          <Route path="uppdateproduct/:id" element={<UpdateProduct />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="banners" element={<Banner />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="addblog" element={<AddBlog />} />
          <Route path="updateblog/:id" element={<UpdateBlog />} />
          <Route path="sizes" element={<Sizes />} />
          <Route path="product_detail/:id" element={<Detail_Product />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<Customers />} />
          <Route path="order" element={<Orders />} />
          <Route path="order_detail/:id" element={<Order_Detail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="colors" element={<ColorList />} />
          <Route path="vouchers" element={<VoucherList />} />
          <Route path="comments" element={<CommentListProduct />} />
          <Route path="comment-list/:id" element={<CommentList />} />
          <Route path="categoryblogs" element={<Categoryblogs />} />
          <Route path="fullscreen" element={<FullScreenButton />} />
          <Route path="login/callback" element={<LoginCallback />} />
        </Route>

        {/* Other Routes */}
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
