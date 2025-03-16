import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useCategory} from "../Hook/useCategory.jsx";
import { Empty, Spin } from "antd";
import { useCategoryProducts, useProduct } from "../Hook/useProduct.jsx";
import { FormatPrice } from "../Format.jsx";
const Product = () => {
  const navigate = useNavigate();
  const { caterory, pages } = useParams();
  const param = pages ? pages : 1;
  const { category, isCategory } = useCategory();
  const { products, isProducts } = useProduct(param);
  const { categoryproducts, iscategoryProducts } = useCategoryProducts();
  const data = caterory ? categoryproducts : products?.data;
  const isLoading = caterory ? iscategoryProducts : isProducts;
  const [filter, setFilter] = useState(false);
  const page = Array.from({ length: products?.toatalPages }, (_, i) => i + 1);
  if (isCategory || isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  
  console.log(category.data);
  const clickfilter = () => {
    setFilter(!filter);
  };

  return (
    <div className="bg0 m-t-23 p-b-100">
      <div className="container " style={{ marginTop: "100px" }}>
        <div className="flex-w flex-sb-m p-b-52">
          <div className="flex-w flex-l-m filter-tope-group m-tb-10">
            <button
              className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                caterory ? "" : "how-active1 "
              }`}
              onClick={() => navigate("/product")}
            >
              All Products
            </button>
            {category &&
              category.data.map((item, index) => (
                <Link to={`/product/category/${item.id}`} key={index}>
                  <button
                    className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                      caterory == item.id && "how-active1"
                    }`}
                  >
                    {item.name}
                  </button>
                </Link>
              ))}
          </div>
          <div className="flex-w flex-c-m m-tb-10">
            <div
              className={`flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter ${
                filter && "show-search"
              } `}
              onClick={clickfilter}
            >
              <i
                className={`${
                  filter
                    ? " icon-close-filter zmdi-close"
                    : "icon-filter zmdi-filter-list "
                }  cl2 m-r-6 fs-15 trans-04 zmdi `}
              />
              Filter
            </div>
          </div>

          <div
            className={` ${
              filter ? "show " : " notshow hidden"
            } panel-filter  w-full p-t-10`}
          >
            <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
              <div className="filter-col1 p-r-15 p-b-27">
                <div className="mtext-102 cl2 p-b-15">Sort By</div>
                <ul>
                  <li className="p-b-6">
                    <a className="filter-link stext-106 trans-04" href="#">
                      Default
                    </a>
                  </li>
                  <li className="p-b-6">
                    <a className="filter-link stext-106 trans-04" href="#">
                      Popularity
                    </a>
                  </li>
                  <li className="p-b-6">
                    <a className="filter-link stext-106 trans-04" href="#">
                      Average rating
                    </a>
                  </li>
                  <li className="p-b-6">
                    <a
                      className="filter-link stext-106 trans-04 filter-link-active"
                      href="#"
                    >
                      Newness
                    </a>
                  </li>
                  <li className="p-b-6">
                    <a className="filter-link stext-106 trans-04" href="#">
                      Price: Low to High
                    </a>
                  </li>
                  <li className="p-b-6">
                    <a className="filter-link stext-106 trans-04" href="#">
                      Price: High to Low
                    </a>
                  </li>
                </ul>
              </div>
              <div className="filter-col2 p-r-15 p-b-27">
                <div className="mtext-102 cl2 p-b-15">Price</div>
                <ul>
                  <li className="p-b-6">
                    <a
                      className="filter-link stext-106 trans-04 filter-link-active"
                      href="#"
                    >
                      All
                    </a>
                  </li>
                  <li className="p-b-6">
                    <a className="filter-link stext-106 trans-04" href="#">
                      $0.00 - $50.00
                    </a>
                  </li>
                  <li className="p-b-6">
                    <a className="filter-link stext-106 trans-04" href="#">
                      $50.00 - $100.00
                    </a>
                  </li>
                  <li className="p-b-6">
                    <a className="filter-link stext-106 trans-04" href="#">
                      $100.00 - $150.00
                    </a>
                  </li>
                  <li className="p-b-6">
                    <a className="filter-link stext-106 trans-04" href="#">
                      $150.00 - $200.00
                    </a>
                  </li>
                  <li className="p-b-6">
                    <a className="filter-link stext-106 trans-04" href="#">
                      $200.00+
                    </a>
                  </li>
                </ul>
              </div>
              <div className="filter-col3 p-r-15 p-b-27">
                <div className="mtext-102 cl2 p-b-15">Color</div>
                <ul>
                  <li className="p-b-6">
                    <span
                      className="fs-15 lh-12 m-r-6"
                      style={{
                        color: "#222",
                      }}
                    >
                      <i className="zmdi zmdi-circle" />
                    </span>
                    <a className="filter-link stext-106 trans-04" href="#">
                      Black
                    </a>
                  </li>
                  <li className="p-b-6">
                    <span
                      className="fs-15 lh-12 m-r-6"
                      style={{
                        color: "#4272d7",
                      }}
                    >
                      <i className="zmdi zmdi-circle" />
                    </span>
                    <a
                      className="filter-link stext-106 trans-04 filter-link-active"
                      href="#"
                    >
                      Blue
                    </a>
                  </li>
                  <li className="p-b-6">
                    <span
                      className="fs-15 lh-12 m-r-6"
                      style={{
                        color: "#b3b3b3",
                      }}
                    >
                      <i className="zmdi zmdi-circle" />
                    </span>
                    <a className="filter-link stext-106 trans-04" href="#">
                      Grey
                    </a>
                  </li>
                  <li className="p-b-6">
                    <span
                      className="fs-15 lh-12 m-r-6"
                      style={{
                        color: "#00ad5f",
                      }}
                    >
                      <i className="zmdi zmdi-circle" />
                    </span>
                    <a className="filter-link stext-106 trans-04" href="#">
                      Green
                    </a>
                  </li>
                  <li className="p-b-6">
                    <span
                      className="fs-15 lh-12 m-r-6"
                      style={{
                        color: "#fa4251",
                      }}
                    >
                      <i className="zmdi zmdi-circle" />
                    </span>
                    <a className="filter-link stext-106 trans-04" href="#">
                      Red
                    </a>
                  </li>
                  <li className="p-b-6">
                    <span
                      className="fs-15 lh-12 m-r-6"
                      style={{
                        color: "#aaa",
                      }}
                    >
                      <i className="zmdi zmdi-circle-o" />
                    </span>
                    <a className="filter-link stext-106 trans-04" href="#">
                      White
                    </a>
                  </li>
                </ul>
              </div>
              <div className="filter-col4 p-b-27">
                <div className="mtext-102 cl2 p-b-15">Tags</div>
                <div className="flex-w p-t-4 m-r--5">
                  <a
                    className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    href="#"
                  >
                    Fashion
                  </a>
                  <a
                    className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    href="#"
                  >
                    Lifestyle
                  </a>
                  <a
                    className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    href="#"
                  >
                    Denim
                  </a>
                  <a
                    className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    href="#"
                  >
                    Streetstyle
                  </a>
                  <a
                    className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    href="#"
                  >
                    Crafts
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row isotope-grid">
          {data ? (
            data.map((item, index) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
                key={index}
              >
                <div className="block2">
                  <div className="block2-pic hov-img0">
                    <img alt="IMG-PRODUCT" src={item.img_thumb} />
                    <a
                      className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 "
                      href="#"
                    >
                      Quick View
                    </a>
                  </div>
                  <div className="block2-txt flex-w flex-t p-t-14">
                    <div className="block2-txt-child1 flex-col-l">
                      <Link
                        className="stext-107 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                        to={`/product/${item.id}`}
                      >
                        {item.name}
                      </Link>
                      <span className="stext-105 cl3">
                        {<FormatPrice price={item.price} />}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full">
              <Empty />
            </div>
          )}
        </div>
        <div className="flex-c-m flex-w w-full p-t-30">
          {page.map((page) => (
            <Link
              to={`/product/pages/${page}`}
              key={page}
              className={`flex-c-m how-pagination1 trans-04 m-all-7 ${
                pages == page && "active-pagination1"
              }`}
            >
              {page}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
