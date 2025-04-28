import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart, useCartItem } from "../Hook/useCart";
import { useState } from "react";
import logo from "../images/icons/logo-02.png";
import logo1 from "../images/icons/logo-01.png";
import useQuantity from "../Hook/useQuantity";
import { useMutation } from "react-query";
import { logout } from "../Apis/Api";
import { Spin, message } from "antd";
const Header = () => {
  // const user = JSON.parse(localStorage.getItem("auth_token") || "null");
  const user = localStorage.getItem("auth_token");
  const [show, setShow] = useState(false);
  // const { data } = useCart();
  const { cartItem } = useCartItem();
  const quantity = cartItem?.map((a) => a.quantity);
  const navigate = useNavigate();
  const sum = quantity?.reduce((acc, curr) => acc + curr, 0);
  const { mutate, isLoading } = useMutation(logout, {
    onSuccess: () => {
      message.success("Đăng xuất thành công");
      localStorage.removeItem("auth_token");
      navigate("signin");
      setShow(false);
    },
    onError: () => {
      message.error("Đăng xuất thất bại");
    },
  });
  const onChangeSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/product?search=${e.target.value}`);
    }
  };
  if (isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <>
      <header>
        <div className="container-menu-desktop ">
          <div className="wrap-menu-desktop top-0 ">
            <nav className="limiter-menu-desktop container">
              <Link to="/" className="logo">
                <img src={logo} alt="IMG-LOGO" />
              </Link>
              <div className="menu-desktop">
                <ul className="main-menu">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? "activeweb" : ""
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="product"
                      className={({ isActive }) =>
                        isActive ? "activeweb" : ""
                      }
                    >
                      Shop
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "activeweb" : ""
                      }
                      to="/blog"
                    >
                      Blog
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/about">About</NavLink>
                  </li>

                  <li>
                    <NavLink to="/contact">Contact</NavLink>
                  </li>
                </ul>
              </div>
              <div className="wrap-icon-header flex-w flex-r-m items-center gap-2">
                <>
                  <div className="search">
                    <input
                      type="text"
                      name="text"
                      className="search-input"
                      required
                      placeholder="Type to search..."
                      onKeyDown={(e) => onChangeSearch(e)}
                    />
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ionicon"
                        viewBox="0 0 512 512"
                      >
                        <title>Search</title>
                        <path
                          d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                          fill="none"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeWidth="32"
                        />
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          strokeWidth="32"
                          d="M338.29 338.29L448 448"
                        />
                      </svg>
                    </div>
                  </div>
                </>

                {user ? (
                  <>
                    <NavLink to="/cart">
                      <div
                        className="icon-header-item text-white hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                        data-notify={sum}
                      >
                        <i className="zmdi zmdi-shopping-cart"></i>
                      </div>
                    </NavLink>
                    <div onClick={() => setShow(true)}>
                      <i className="fa fa-bars hov-cl1 trans-04 p-l-22 p-r-11 text-white text-2xl"></i>
                    </div>
                  </>
                ) : (
                  <div className="flex-c-m h-full  gap-2">
                    <Link
                      to={"/signin"}
                      className="flex-c-m stext-104 cl0 size-104 bg1 bor2 hov-btn2 p-lr-15 trans-04 "
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to={"signup"}
                      className="flex-c-m stext-104 cl0 size-104  bor2 hov-btn2 p-lr-15 trans-04 m-r-10"
                      style={{ border: "3px solid #717fe0" }}
                    >
                      Đăng ký
                    </Link>
                    {/* */}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
        <div className="wrap-header-mobile fixed w-full top-0 h-[84px] z-50">
          <div className="logo-mobile">
            <Link to="/">
              <img src={logo1} alt="IMG-LOGO" />
            </Link>
          </div>
          <div className="wrap-icon-header flex-w flex-r-m m-r-15">
            <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
              <i className="zmdi zmdi-search"></i>
            </div>
            <div
              className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
              data-notify="2"
            >
              <i className="zmdi zmdi-shopping-cart"></i>
            </div>

            <a
              href="#"
              className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
              data-notify="0"
            >
              <i className="zmdi zmdi-favorite-outline"></i>
            </a>
          </div>
          <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </div>
        </div>
        <div className="menu-mobile">
          <ul className="topbar-mobile">
            <li>
              <div className="left-top-bar">
                Free shipping for standard order over $100
              </div>
            </li>

            <li>
              <div className="right-top-bar flex-w h-full">
                <a href="#" className="flex-c-m p-lr-10 trans-04">
                  Help & FAQs
                </a>

                <a href="#" className="flex-c-m p-lr-10 trans-04">
                  My Account
                </a>

                <a href="#" className="flex-c-m p-lr-10 trans-04">
                  EN
                </a>

                <a href="#" className="flex-c-m p-lr-10 trans-04">
                  USD
                </a>
              </div>
            </li>
          </ul>

          <ul className="main-menu-m">
            <li>
              <a href="index.html">Home</a>
              <ul className="sub-menu-m">
                <li>
                  <a href="index.html">Homepage 1</a>
                </li>
                <li>
                  <a href="home-02.html">Homepage 2</a>
                </li>
                <li>
                  <a href="home-03.html">Homepage 3</a>
                </li>
              </ul>
              <span className="arrow-main-menu-m">
                <i className="fa fa-angle-right"></i>
              </span>
            </li>

            <li>
              <a href="product.html">Shop</a>
            </li>

            <li>
              <a
                href="shoping-cart.html"
                className="label1 rs1"
                data-label1="hot"
              >
                Features
              </a>
            </li>

            <li>
              <a href="blog.html">Blog</a>
            </li>

            <li>
              <a href="about.html">About</a>
            </li>

            <li>
              <a href="contact.html">Contact</a>
            </li>
          </ul>
        </div>
        <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
          <div className="container-search-header">
            <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
              <img src="src/images/icons/icon-close2.png" alt="CLOSE" />
            </button>

            <form className="wrap-search-header flex-w p-l-15">
              <button className="flex-c-m trans-04">
                <i className="zmdi zmdi-search"></i>
              </button>
              <input
                className="plh3"
                type="text"
                name="search"
                placeholder="Search..."
              />
            </form>
          </div>
        </div>
      </header>
      <aside className={`wrap-sidebar ${show && "show-sidebar"} `}>
        <div className="s-full js-hide-sidebar" />
        <div className="sidebar flex-col-l p-t-22 p-b-25">
          <div className="flex-r w-full p-b-30 p-r-27">
            <div
              className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 "
              onClick={() => setShow(false)}
            >
              <i className="zmdi zmdi-close" />
            </div>
          </div>
          <div
            className="sidebar-content flex-w w-full p-lr-65 js-pscroll ps ps--active-y"
            style={{ position: "relative", overflow: "hidden" }}
          >
            <ul className="sidebar-link w-full">
              <li className="p-b-13">
                <Link
                  to={"portfolio"}
                  onClick={() => setShow(false)}
                  className="stext-102 cl2 hov-cl1 trans-04"
                >
                  Portfolio
                </Link>
              </li>
              <li className="p-b-13">
                <Link
                  to={"/order"}
                  onClick={() => setShow(false)}
                  className="stext-102 cl2 hov-cl1 trans-04"
                >
                  Order
                </Link>
              </li>
              <li className="p-b-13">
                <div
                  className="stext-102 cl2 hov-cl1 trans-04 cursor-pointer"
                  onClick={() => mutate()}
                >
                  Đăng xuất
                </div>
              </li>
            </ul>
            <span className="mtext-101 cl5">@ Lương Thành Quang</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
