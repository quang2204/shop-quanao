import { useState } from "react";
import useDetailProduct from "../Hook/useDetailProduct.jsx";
import { Image, message, Select, Spin, Tabs } from "antd";
import { Link } from "react-router-dom";
import { FormatPrice } from "../Format.jsx";
import useQuantity from "../Hook/useQuantity.jsx";
import { useMutation, useQueryClient } from "react-query";
import { addCart } from "../Apis/Api.jsx";
const ProductDetail = () => {
  const queryCline = useQueryClient();
  const { detailProduct, isDetailProduct } = useDetailProduct();
  const {
    decreaseNumber,
    increaseNumber,
    numberDirectly,
    inputValue,
    handleBlur,
  } = useQuantity();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [indexImg, setindexImg] = useState(0);
  const { mutate } = useMutation({
    mutationFn: (data) => addCart(data, user._id),
    onSuccess: () => {
      queryCline.invalidateQueries(["cart"]);
      message.success("Thành công");
    },
    onError: (error) => {
      message.error(error.response);
    },
  });
  const addToCart = () => {
    const data = {
      quantity: Number(inputValue),
      productid: detailProduct?._id,
    };
    mutate(data);
  };

  if (isDetailProduct) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  const pre = () => {
    if (indexImg == 0) {
      setindexImg(detailProduct.variant.length - 1);
    } else {
      setindexImg(indexImg - 1);
    }
  };
  const next = () => {
    if (detailProduct && indexImg == detailProduct?.variant.length - 1) {
      setindexImg(0);
    } else {
      setindexImg(indexImg + 1);
    }
  };
  const handleColor = (e) => {
    detailProduct?.variant.filter((item) => {
      if (item._id == e) {
        setindexImg(detailProduct.variant.indexOf(item));
      }
    });
  };
  return (
    <div>
      <div className="container mt-28 ">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <Link className="stext-109 cl8 hov-cl1 trans-04" to="/">
            Home
            <i aria-hidden="true" className="fa fa-angle-right m-l-9 m-r-10" />
          </Link>
          <Link className="stext-109 cl8 hov-cl1 trans-04" to="">
            {detailProduct?.caterori?.name}
            <i aria-hidden="true" className="fa fa-angle-right m-l-9 m-r-10" />
          </Link>
          <span className="stext-109 cl4"> {detailProduct?.name}</span>
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
                      {detailProduct?.variants.map((item, index) => (
                        <li
                          className=""
                          key={item._id}
                          onMouseOver={() => setindexImg(index)}
                        >
                          <Image src={item.imageUrl} />
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
                          style={{
                            width: 513,
                          }}
                        >
                          <div className="wrap-pic-w pos-relative">
                            <Image
                              src={detailProduct?.variants[indexImg].imageUrl}
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
                  {detailProduct?.name}
                </h4>
                <span className="mtext-106 cl2">
                  {<FormatPrice price={detailProduct.price} />}
                </span>
                <p className="stext-102 cl3 p-t-23">
                  {detailProduct?.description}
                </p>
                <div className="p-t-33">
                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-203 flex-c-m respon6">Size</div>
                    <div className="size-204 respon6-next">
                      <div className="rs1-select2 bg0">
                        <Select
                          showSearch
                          placeholder="Select a person"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={detailProduct?.variants.map((item) => ({
                            value: item._id,
                            label: item.size,
                          }))}
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
                          onChange={(e) => handleColor(e)}
                          options={detailProduct?.variants.map((item) => ({
                            value: item._id,
                            label: item.color,
                          }))}
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
                      <button
                        className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 "
                        onClick={addToCart}
                      >
                        Add to cart
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
          <div className="bor10 m-t-50 p-t-20 p-b-40 p-l-15 p-r-15">
            <div className="tab01">
              <Tabs
                defaultActiveKey="1"
                className="custom-tab"
                centered
                items={[
                  {
                    label: "Chi tiết sản phẩm",
                    key: "1",
                    children: `${detailProduct?.description}`,
                  },
                  {
                    label: "Đánh giá",
                    key: "2",
                    children: <p>Content of Tab Pane 2</p>,
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
          <span className="stext-107 cl6 p-lr-25"> SKU: JAK-01 </span>
          <span className="stext-107 cl6 p-lr-25">
            Categories : {detailProduct?.caterori.name}
          </span>
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
