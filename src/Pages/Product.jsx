import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useCategory } from "../Hook/useCategory.jsx";
import { Empty, Spin } from "antd";
import { useCategoryProducts, useProduct } from "../Hook/useProduct.jsx";
import { FormatPrice } from "../Format.jsx";
import Emptys from "../Admin/Ui/Emty.jsx";
const Product = () => {
  const navigate = useNavigate();
  const { caterory, pages } = useParams();
  const param = pages ? pages : 1;
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id");
  const price = searchParams.get("price");
  const sort = searchParams.get("sort_price");
  const search = searchParams.get("search");
  const { category, isCategory } = useCategory();
  const { isProducts, products } = useProduct(param, {
    price: price,
    category_id: categoryId,
    sort: sort,
    search: search,
  });
  const { categoryproducts, iscategoryProducts } = useCategoryProducts();
  const data = products?.data;

  const [filter, setFilter] = useState(false);
  const page = Array.from(
    { length: products?.data.last_page },
    (_, i) => i + 1
  );

  // const { search } = useLocation();
  // const searchParam = new URLSearchParams(search);

  // const makeSortLink = (sortValue) => {
  //   const updatedParams = new URLSearchParams(searchParams.toString());
  //   updatedParams.set("sort", sortValue);
  //   return `/product?${updatedParams.toString()}`;
  // };

  if (isCategory || isProducts) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  const clickfilter = () => {
    setFilter(!filter);
  };
  console.log(categoryId);
  return (
    <div className="bg0 m-t-23 p-b-100">
      <div className="container " style={{ marginTop: "100px" }}>
        <div className="flex-w flex-sb-m p-b-52">
          <div className="flex-w flex-l-m filter-tope-group m-tb-10">
            <button
              className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                categoryId ? "" : "how-active1 "
              }`}
              onClick={() => navigate("/product")}
            >
              All Products
            </button>
            {category &&
              category.data.map((item, index) => (
                <Link to={`/product?category_id=${item.id}`} key={index}>
                  <button
                    className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                      categoryId == item.id && "how-active1"
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
                    <Link
                      className="filter-link stext-106 trans-04"
                      to="?sort_price=1"
                    >
                      Price: Low to High
                    </Link>
                  </li>

                  <li className="p-b-6">
                    <Link
                      className="filter-link stext-106 trans-04"
                      to="?sort_price"
                    >
                      Price: High to Low
                    </Link>
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
                    <Link
                      className="filter-link stext-106 trans-04"
                      to="/product?price=10000-200000"
                    >
                      10.000 đ - 200.000 đ
                    </Link>
                  </li>
                  <li className="p-b-6">
                    <Link
                      className="filter-link stext-106 trans-04"
                      to="/product?price=100.000-200.000"
                    >
                      100.000 đ - 200.000 đ
                    </Link>
                  </li>
                  <li className="p-b-6">
                    <Link
                      className="filter-link stext-106 trans-04"
                      to="/product?price=200.000-300.000"
                    >
                      200.000 đ - 300.000 đ
                    </Link>
                  </li>
                  <li className="p-b-6">
                    <Link
                      className="filter-link stext-106 trans-04"
                      to="/product?price=300000-400000"
                    >
                      300.000 đ - 400.000 đ
                    </Link>
                  </li>

                  <li className="p-b-6">
                    <Link
                      className="filter-link stext-106 trans-04"
                      to="/product?price=400000-500000"
                    >
                      400.000 đ - 500.000 đ
                    </Link>
                  </li>

                  <li className="p-b-6">
                    <Link
                      className="filter-link stext-106 trans-04"
                      to="/product?price=500000-999999999"
                    >
                      500.000 đ +
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row isotope-grid">
          {data.data.length > 0 ? (
            data.data.map((item, index) => (
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
                      <span className="stext-107 cl3">
                        {<FormatPrice price={item.variants_min_price_sale} />}
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
