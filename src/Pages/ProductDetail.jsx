import { useEffect, useState } from "react";
import {
  useDetailProduct,
  useProductGalleries,
  useProductVariants,
} from "../Hook/useDetailProduct.jsx";
import { Image, message, Select, Spin, Tabs } from "antd";
import { Link } from "react-router-dom";
import { FormatDate, FormatDateTime, FormatPrice } from "../Format.jsx";
import useQuantity from "../Hook/useQuantity.jsx";
import { useMutation, useQueryClient } from "react-query";
import { addCartItem } from "../Apis/Api.jsx";
import { useCart } from "../Hook/useCart.jsx";
import { getCommentProduct } from "./useComent.jsx";
import StarRating from "../Ui/StarRating.jsx";
const ProductDetail = () => {
  const queryCline = useQueryClient();
  const { detailProduct, isDetailProduct } = useDetailProduct();
  const { isProductVariants, productVariant } = useProductVariants();
  const { productGallerie, isproductGalleries } = useProductGalleries();
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [star, setStar] = useState([]);
  const [filterStart, setfilterStart] = useState();
  const { data, isLoading } = getCommentProduct(filterStart);
  const [idVariants, setidVariants] = useState();
  const checkuser = localStorage.getItem("auth_token") || null;
  const {
    decreaseNumber,
    increaseNumber,
    numberDirectly,
    inputValue,
    handleBlur,
  } = useQuantity();
  useEffect(() => {
    setStar(
      data?.comments
        ?.filter((item) => item.is_active == 1)
        .map((item) => item.star)
    );
  }, []);
  const [indexImg, setindexImg] = useState(0);
  const { data: cart, isLoading: isCart } = useCart();

  const { mutate } = useMutation({
    mutationFn: (data) => addCartItem(data),
    onSuccess: () => {
      queryCline.invalidateQueries(["cartItem"]);
      message.success("Success");
    },
    onError: (error) => {
      message.error(error.response);
    },
  });
  const addToCart = () => {
    if (checkuser === null) {
      message.error("Login to add to cart");
    } else if (color == undefined) {
      message.error("Add product color");
    } else if (size == undefined) {
      message.error("Add product size");
    } else if (inputValue > idVariants.quantity) {
      message.error(`Quantity left only ${idVariants.quantity}`);
    } else {
      const data = {
        quantity: Number(inputValue),
        product_variant_id: idVariants.id,
        cart_id: cart.id,
      };
      mutate(data);
    }
  };
  useEffect(() => {
    const checkid = productVariant?.variants?.filter(
      (item) =>
        item.size_id === size && item.color_id === color && item.quantity >= 0
    );

    if (checkid?.length > 0) {
      setidVariants(checkid[0]);
    } else {
      setidVariants(null);
    }
  }, [size, color, productVariant]);

  const handleSize = (size) => {
    setSize(size);
  };
  const handleColor = (color) => {
    setColor(color);
  };

  const totalStar = data?.comments
    ?.filter((item) => item.is_active == 1)
    .reduce((acc, cur) => acc + cur.star, 0);
  const starPercentage =
    totalStar / data?.comments?.filter((item) => item.is_active == 1).length ||
    0;
  const roundNumber = Math.round(starPercentage) || 0;
  if (isDetailProduct || isProductVariants || isproductGalleries || isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  const pre = () => {
    if (indexImg == 0) {
      setindexImg(productGallerie.length - 1);
    } else {
      setindexImg(indexImg - 1);
    }
  };
  const next = () => {
    if (productGallerie && indexImg == productGallerie?.length - 1) {
      setindexImg(0);
    } else {
      setindexImg(indexImg + 1);
    }
  };
  return (
    <div>
      <div className="container mt-28 ">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <Link className="stext-109 cl8 hov-cl1 trans-04" to="/">
            Home
            <i aria-hidden="true" className="fa fa-angle-right m-l-9 m-r-10" />
          </Link>
          <span className="stext-109 cl4">
            {" "}
            {productVariant?.variants[0]?.product?.name}
          </span>
        </div>
      </div>
      <section className="sec-product-detail bg0 p-t-65 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-7 p-b-30">
              <div className="p-l-25 p-r-30 p-lr-0-lg">
                <div className="wrap-slick3 flex-sb flex-w">
                  <div className="wrap-slick3-dots">
                    <ul className="slick3-dots" role="tablist">
                      {productGallerie?.map((item, index) => (
                        <li
                          className=""
                          key={item.id}
                          onMouseOver={() => setindexImg(index)}
                        >
                          <Image src={item.image} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="wrap-slick3-arrows flex-sb-m flex-w tt">
                    <button
                      className="arrow-slick3 prev-slick3 slick-arrow"
                      onClick={pre}
                    >
                      <i className="fa fa-angle-left" />
                    </button>
                    <button
                      className="arrow-slick3 next-slick3 slick-arrow"
                      onClick={next}
                    >
                      <i className="fa fa-angle-right" />
                    </button>
                  </div>
                  <div className="slick3 gallery-lb slick-initialized slick-slider slick-dotted">
                    <div className="slick-list draggable">
                      <div className="slick-track">
                        <div
                          className="item-slick3 slick-slide slick-current slick-active"
                          style={
                            {
                              // width: 513,
                            }
                          }
                        >
                          <div className="wrap-pic-w pos-relative">
                            <Image
                              src={productGallerie[indexImg].image}
                              alt="IMG-PRODUCT"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-5 p-b-30">
              <div className="p-r-50 p-t-5 p-lr-0-lg">
                <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                  {productVariant?.variants[0]?.product?.name}
                </h4>
                <div className="flex gap-2">
                  <div className="flex gap-2 items-center border-r-2 ">
                    <span className="text-[18px]">{starPercentage}</span>
                    <span className="cl11 pr-2">
                      <StarRating rating={roundNumber} />
                    </span>
                  </div>
                  <div className="flex gap-2 items-center border-r-2 ">
                    <span className="text-[18px]">{data?.comments.length}</span>
                    <span className="pr-2 text-[#767676]">Evaluate</span>
                  </div>
                  <div className="flex gap-2 items-center border-r-2 ">
                    <span className="text-[18px]">
                      {productVariant?.total_sold}
                    </span>
                    <span className="pr-2 text-[#767676]">Sold</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-3xl text-red-500">
                    {
                      <FormatPrice
                        price={
                          idVariants?.price_sale ??
                          productVariant?.variants[0]?.price_sale
                        }
                      />
                    }
                  </span>
                  <span className="text-2xl cl4 text-decoration-line-through">
                    {
                      <FormatPrice
                        price={
                          idVariants?.price ??
                          productVariant?.variants[0]?.price
                        }
                      />
                    }
                  </span>
                </div>
                <div className="p-t-33">
                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-203 flex-c-m respon6">Size</div>
                    <div className="size-204 respon6-next">
                      <div className="rs1-select2 bg0">
                        <Select
                          showSearch
                          placeholder="Select a size"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={Array.from(
                            new Map(
                              productVariant?.variants

                                ?.flatMap((variant) => variant.size) // Lấy tất cả size từ các biến thể
                                ?.map((item) => [
                                  item?.id,
                                  { value: item?.id, label: item.name },
                                ]) // Tạo key-value cho Map
                            ).values() // Lấy các giá trị duy nhất
                          )}
                          onChange={handleSize}
                          className="w-[135px]"
                        />

                        <div className="dropDownSelect2" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-203 flex-c-m respon6">Color</div>
                    <div className="size-204 respon6-next">
                      <div className="rs1-select2  bg0">
                        <Select
                          showSearch
                          placeholder="Select a person"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={Array.from(
                            new Map(
                              productVariant?.variants

                                ?.flatMap((variant) => variant.color || []) // đề phòng variant.color là undefined
                                ?.filter((item) => item?.id && item?.name) // loại bỏ item không hợp lệ
                                .map((item) => [
                                  String(item.id),
                                  { value: item.id, label: item.name },
                                ])
                            ).values()
                          )}
                          onChange={handleColor}
                          className="w-[135px]"
                        />

                        <div className="dropDownSelect2" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-204 flex-w flex-m respon6-next">
                      <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                        <div
                          className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                          onClick={decreaseNumber}
                        >
                          <i className="fs-16 zmdi zmdi-minus" />
                        </div>

                        <input
                          className="mtext-104 cl3 txt-center num-product"
                          type="number"
                          onChange={(e) => numberDirectly(e.target.value)}
                          value={inputValue}
                          onBlur={handleBlur}
                        />
                        <div
                          className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                          onClick={increaseNumber}
                        >
                          <i className="fs-16 zmdi zmdi-plus" />
                        </div>
                      </div>
                      <div>
                        {idVariants?.quantity ??
                          productVariant?.variants.reduce(
                            (acc, item) => acc + item.quantity,
                            0
                          )}
                        <span>Products available</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-w flex-r-m p-b-10">
                  <div className="size-204 flex-c-m respon6"></div>
                  <div className="size-204 respon6-next">
                    <div className="rs1-select2 bg0">
                      <button
                        className="flex-c-m stext-101 cl0 size-101 bg1 bor1 -ml-[20px] hov-btn1 trans-04 "
                        onClick={addToCart}
                        disabled={isCart}
                      >
                        {isCart && <Spin size="small" className="mr-2" />} Add
                        to cart
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                  <div className="flex-m bor9 p-r-10 m-r-11">
                    <a
                      className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                      data-tooltip="Add to Wishlist"
                      href="#"
                    >
                      <i className="zmdi zmdi-favorite" />
                    </a>
                  </div>
                  <a
                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                    data-tooltip="Facebook"
                    href="#"
                  >
                    <i className="fa fa-facebook" />
                  </a>
                  <a
                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                    data-tooltip="Twitter"
                    href="#"
                  >
                    <i className="fa fa-twitter" />
                  </a>
                  <a
                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                    data-tooltip="Google Plus"
                    href="#"
                  >
                    <i className="fa fa-google-plus" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bor10 m-t-50 p-t-20 p-b-40 p-l-25 p-r-25">
            <div className="tab01">
              <Tabs
                defaultActiveKey="1"
                className="custom-tab"
                centered
                items={[
                  {
                    label: "Product details",
                    key: "1",
                    children: `${detailProduct[0]?.description}`,
                  },
                  {
                    label: "Product Reviews",
                    key: "2",
                    children:
                      data?.comments?.length > 0 ? (
                        <div>
                          <div className="flex items-center gap-4">
                            <div className="mb-7">
                              <div className="text-red-500">
                                <span className="text-[1.875rem] pr-1">
                                  {starPercentage}
                                </span>
                                <span className="text-[1.125rem] ">/ 5</span>
                              </div>
                              <div className="cl11">
                                <StarRating rating={roundNumber} />
                              </div>
                            </div>
                            <div className="product-rating-overview__filters">
                              <div
                                className="product-rating-overview__filter product-rating-overview__filter--active"
                                onClick={() => setfilterStart()}
                              >
                                Tất cả
                              </div>
                              {star?.map((item) => (
                                <div
                                  className="product-rating-overview__filter"
                                  onClick={() => setfilterStart(item)}
                                >
                                  {item} Sao
                                </div>
                              ))}
                            </div>
                          </div>
                          {data?.comments
                            ?.filter((item) => item.is_active == 1)
                            ?.map((item) => (
                              <div
                                className="flex-w flex-t p-b-20"
                                key={item.id}
                              >
                                <div className="wrap-pic-s size-108 bor0 of-hidden m-r-18 m-t-6">
                                  <img
                                    src={item.user.avatar}
                                    width={30}
                                    alt="AVATAR"
                                  />
                                </div>

                                <div className="size-207">
                                  <div className="flex-w flex-sb-m">
                                    <span className="mtext-107 cl2 p-r-20 pb-2">
                                      {item.user.name} <br />
                                      <span className="!text-[#0000008A] cl2 p-r-20 flex gap-1">
                                        {<FormatDate date={item.created_at} />}
                                        {
                                          <FormatDateTime
                                            dateString={item.created_at}
                                          />
                                        }
                                      </span>
                                    </span>

                                    <span className="fs-18 cl11">
                                      <StarRating rating={item.star} />
                                    </span>
                                  </div>
                                  <p className="stext-101 cl6">
                                    {item.content}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        "No comments"
                      ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      {/* <section className="sec-relate-product bg0 p-t-45 p-b-105">
    <div className="container">
      <div className="p-b-45">
        <h3 className="ltext-106 cl5 txt-center">
          Related Products
        </h3>
      </div>
      <div className="wrap-slick2">
        <div className="slick2">
          <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
            <div className="block2">
              <div className="block2-pic hov-img0">
                <img
                  alt="IMG-PRODUCT"
                  src="src/images/product-01.jpg"
                />
                <a
                  className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                  href="#"
                >
                  Quick View
                </a>
              </div>
              <div className="block2-txt flex-w flex-t p-t-14">
                <div className="block2-txt-child1 flex-col-l">
                  <a
                    className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    href="product-detail.html"
                  >
                    Esprit Ruffle Shirt
                  </a>
                  <span className="stext-105 cl3">
                    {' '}$16.64{' '}
                  </span>
                </div>
                <div className="block2-txt-child2 flex-r p-t-3">
                  <a
                    className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    href="#"
                  >
                    <img
                      alt="ICON"
                      className="icon-heart1 dis-block trans-04"
                      src="src/images/icons/icon-heart"
                    />
                    <img
                      alt="ICON"
                      className="icon-heart2 dis-block trans-04 ab-t-l"
                      src="src/images/icons/icon-heart-02.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
            <div className="block2">
              <div className="block2-pic hov-img0">
                <img
                  alt="IMG-PRODUCT"
                  src="src/images/product-02.jpg"
                />
                <a
                  className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                  href="#"
                >
                  Quick View
                </a>
              </div>
              <div className="block2-txt flex-w flex-t p-t-14">
                <div className="block2-txt-child1 flex-col-l">
                  <a
                    className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    href="product-detail.html"
                  >
                    Herschel supply
                  </a>
                  <span className="stext-105 cl3">
                    {' '}$35.31{' '}
                  </span>
                </div>
                <div className="block2-txt-child2 flex-r p-t-3">
                  <a
                    className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    href="#"
                  >
                    <img
                      alt="ICON"
                      className="icon-heart1 dis-block trans-04"
                      src="src/images/icons/icon-heart"
                    />
                    <img
                      alt="ICON"
                      className="icon-heart2 dis-block trans-04 ab-t-l"
                      src="src/images/icons/icon-heart-02.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
            <div className="block2">
              <div className="block2-pic hov-img0">
                <img
                  alt="IMG-PRODUCT"
                  src="src/images/product-03.jpg"
                />
                <a
                  className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                  href="#"
                >
                  Quick View
                </a>
              </div>
              <div className="block2-txt flex-w flex-t p-t-14">
                <div className="block2-txt-child1 flex-col-l">
                  <a
                    className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    href="product-detail.html"
                  >
                    Only Check Trouser
                  </a>
                  <span className="stext-105 cl3">
                    {' '}$25.50{' '}
                  </span>
                </div>
                <div className="block2-txt-child2 flex-r p-t-3">
                  <a
                    className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    href="#"
                  >
                    <img
                      alt="ICON"
                      className="icon-heart1 dis-block trans-04"
                      src="src/images/icons/icon-heart"
                    />
                    <img
                      alt="ICON"
                      className="icon-heart2 dis-block trans-04 ab-t-l"
                      src="src/images/icons/icon-heart-02.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
            <div className="block2">
              <div className="block2-pic hov-img0">
                <img
                  alt="IMG-PRODUCT"
                  src="src/images/product-04.jpg"
                />
                <a
                  className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                  href="#"
                >
                  Quick View
                </a>
              </div>
              <div className="block2-txt flex-w flex-t p-t-14">
                <div className="block2-txt-child1 flex-col-l">
                  <a
                    className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    href="product-detail.html"
                  >
                    Classic Trench Coat
                  </a>
                  <span className="stext-105 cl3">
                    {' '}$75.00{' '}
                  </span>
                </div>
                <div className="block2-txt-child2 flex-r p-t-3">
                  <a
                    className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    href="#"
                  >
                    <img
                      alt="ICON"
                      className="icon-heart1 dis-block trans-04"
                      src="src/images/icons/icon-heart"
                    />
                    <img
                      alt="ICON"
                      className="icon-heart2 dis-block trans-04 ab-t-l"
                      src="src/images/icons/icon-heart-02.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
            <div className="block2">
              <div className="block2-pic hov-img0">
                <img
                  alt="IMG-PRODUCT"
                  src="src/images/product-05.jpg"
                />
                <a
                  className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                  href="#"
                >
                  Quick View
                </a>
              </div>
              <div className="block2-txt flex-w flex-t p-t-14">
                <div className="block2-txt-child1 flex-col-l">
                  <a
                    className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    href="product-detail.html"
                  >
                    Front Pocket Jumper
                  </a>
                  <span className="stext-105 cl3">
                    {' '}$34.75{' '}
                  </span>
                </div>
                <div className="block2-txt-child2 flex-r p-t-3">
                  <a
                    className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    href="#"
                  >
                    <img
                      alt="ICON"
                      className="icon-heart1 dis-block trans-04"
                      src="src/images/icons/icon-heart"
                    />
                    <img
                      alt="ICON"
                      className="icon-heart2 dis-block trans-04 ab-t-l"
                      src="src/images/icons/icon-heart-02.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
            <div className="block2">
              <div className="block2-pic hov-img0">
                <img
                  alt="IMG-PRODUCT"
                  src="src/images/product-06.jpg"
                />
                <a
                  className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                  href="#"
                >
                  Quick View
                </a>
              </div>
              <div className="block2-txt flex-w flex-t p-t-14">
                <div className="block2-txt-child1 flex-col-l">
                  <a
                    className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    href="product-detail.html"
                  >
                    Vintage Inspired Classic
                  </a>
                  <span className="stext-105 cl3">
                    {' '}$93.20{' '}
                  </span>
                </div>
                <div className="block2-txt-child2 flex-r p-t-3">
                  <a
                    className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    href="#"
                  >
                    <img
                      alt="ICON"
                      className="icon-heart1 dis-block trans-04"
                      src="src/images/icons/icon-heart"
                    />
                    <img
                      alt="ICON"
                      className="icon-heart2 dis-block trans-04 ab-t-l"
                      src="src/images/icons/icon-heart-02.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
            <div className="block2">
              <div className="block2-pic hov-img0">
                <img
                  alt="IMG-PRODUCT"
                  src="src/images/product-07.jpg"
                />
                <a
                  className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                  href="#"
                >
                  Quick View
                </a>
              </div>
              <div className="block2-txt flex-w flex-t p-t-14">
                <div className="block2-txt-child1 flex-col-l">
                  <a
                    className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    href="product-detail.html"
                  >
                    Shirt in Stretch Cotton
                  </a>
                  <span className="stext-105 cl3">
                    {' '}$52.66{' '}
                  </span>
                </div>
                <div className="block2-txt-child2 flex-r p-t-3">
                  <a
                    className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    href="#"
                  >
                    <img
                      alt="ICON"
                      className="icon-heart1 dis-block trans-04"
                      src="src/images/icons/icon-heart"
                    />
                    <img
                      alt="ICON"
                      className="icon-heart2 dis-block trans-04 ab-t-l"
                      src="src/images/icons/icon-heart-02.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
            <div className="block2">
              <div className="block2-pic hov-img0">
                <img
                  alt="IMG-PRODUCT"
                  src="src/images/product-08.jpg"
                />
                <a
                  className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                  href="#"
                >
                  Quick View
                </a>
              </div>
              <div className="block2-txt flex-w flex-t p-t-14">
                <div className="block2-txt-child1 flex-col-l">
                  <a
                    className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    href="product-detail.html"
                  >
                    Pieces Metallic Printed
                  </a>
                  <span className="stext-105 cl3">
                    {' '}$18.96{' '}
                  </span>
                </div>
                <div className="block2-txt-child2 flex-r p-t-3">
                  <a
                    className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    href="#"
                  >
                    <img
                      alt="ICON"
                      className="icon-heart1 dis-block trans-04"
                      src="src/images/icons/icon-heart"
                    />
                    <img
                      alt="ICON"
                      className="icon-heart2 dis-block trans-04 ab-t-l"
                      src="src/images/icons/icon-heart-02.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}
    </div>
  );
};

export default ProductDetail;
