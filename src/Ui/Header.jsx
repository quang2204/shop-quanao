import { Link, NavLink } from "react-router-dom";
import { useCart, useCartItem } from "../Hook/useCart";
import { useState } from "react";
import logo from "../images/icons/logo-02.png";
import logo1 from "../images/icons/logo-01.png";
import useQuantity from "../Hook/useQuantity";
const Header = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [show, setShow] = useState(false);
  // const { data } = useCart();
  const {cartItem} =useCartItem();
  const quantity = cartItem?.data?.map((a) => a.quantity);
  const sum = quantity?.reduce((acc, curr) => acc + curr, 0);
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
              <div className="wrap-icon-header flex-w flex-r-m items-center">
                <div className="icon-header-item text-white hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                  <i className="zmdi zmdi-search"></i>
                </div>
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
                <Link to={""} className="stext-102 cl2 hov-cl1 trans-04">
                  Đăng xuất
                </Link>
              </li>
            </ul>
            <div className="sidebar-gallery w-full p-tb-30">
              <div className="flex-w flex-sb p-t-36 gallery-lb">
                {/* item gallery sidebar */}
                <div className="wrap-item-gallery m-b-10">
                  <Link
                    className="item-gallery bg-img1"
                    to={""}
                    data-lightbox="gallery"
                    style={{
                      backgroundImage:
                        'url("http://quang2204.000.pe/view/images/gallery-01.jpg")',
                    }}
                  />
                </div>
                {/* item gallery sidebar */}
                <div className="wrap-item-gallery m-b-10">
                  <Link
                    className="item-gallery bg-img1"
                    to={""}
                    data-lightbox="gallery"
                    style={{
                      backgroundImage:
                        'url("http://quang2204.000.pe/view/images/gallery-02.jpg")',
                    }}
                  />
                </div>
                {/* item gallery sidebar */}
                <div className="wrap-item-gallery m-b-10">
                  <Link
                    className="item-gallery bg-img1"
                    to={""}
                    data-lightbox="gallery"
                    style={{
                      backgroundImage:
                        'url("http://quang2204.000.pe/view/images/gallery-03.jpg")',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="sidebar-gallery w-full">
              <span className="mtext-101 cl5">About</span>
              <p className="stext-108 cl6 p-t-27">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur maximus vulputate hendrerit. Praesent faucibus erat
                vitae rutrum gravida
              </p>
            </div>
            <span className="mtext-101 cl5">@ Lương Thành Quang</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
