import React, { useState } from "react";
import img1 from "../../velzon/assets/images/products/img-8.png";
import img2 from "../../velzon/assets/images/products/img-7.png";
import img3 from "../../velzon/assets/images/products/img-3.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useParams } from "react-router-dom";
import useDetailProduct from "../../../Hook/useDetailProduct";
import { Spin } from "antd";
import { FormatDate, FormatPrice } from "../../../Format";
const Detail_Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { detailProduct, isDetailProduct } = useDetailProduct();
  console.log(detailProduct);
  if (isDetailProduct) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  const images = [img1, img2, img3];
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="row gx-lg-5">
              <div className="col-xl-4 col-md-8 mx-auto">
                <div className="product-img-slider sticky-side-div ">
                  {/* Main Product Slider */}
                  <Swiper
                    modules={[Navigation, Thumbs]}
                    navigation={{
                      prevEl: ".custom-prev",
                      nextEl: ".custom-next",
                    }}
                    loop
                    thumbs={{ swiper: thumbsSwiper }}
                    className="product-thumbnail-slider p-2 rounded bg-light relative"
                  >
                    {detailProduct?.albumImg.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={img}
                          alt="Product"
                          className="img-fluid d-block w-full"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="  ">
                    <button className="custom-prev absolute top-[40%] text-[1.6rem] left-1 z-50">
                      <FaChevronLeft />
                    </button>
                    <button className="custom-next absolute top-[40%] right-1 text-[1.6rem] z-50">
                      <FaChevronRight />
                    </button>
                  </div>

                  {/* Thumbnail Navigation */}
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView={4}
                    spaceBetween={10}
                    watchSlidesProgress
                    className="product-nav-slider mt-2"
                  >
                    {detailProduct?.albumImg.map((img, index) => (
                      <SwiperSlide key={index} className="thumbnail-slide">
                        <img
                          src={img}
                          alt="Thumbnail"
                          className="img-fluid d-block cursor-pointer"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              {/* end col */}
              <div className="col-xl-8">
                <div className="mt-xl-0 mt-5">
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <h4>{detailProduct.name}</h4>
                      <div className="hstack gap-3 flex-wrap">
                        {/* <div>
                          <a href="#" className="text-primary d-block">
                            Tommy Hilfiger
                          </a>
                        </div> */}
                        <div className="text-muted">
                          Seller :{" "}
                          <span className="text-body fw-medium">
                            Zoetic Fashion
                          </span>
                        </div>
                        <div className="vr" />
                        <div className="text-muted">
                          Published :{" "}
                          <span className="text-body fw-medium">
                            {FormatDate({ date: detailProduct.createdAt })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div>
                        <a
                          href="apps-ecommerce-add-product.html"
                          className="btn btn-light"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit"
                        >
                          <i className="ri-pencil-fill align-bottom" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-2 align-items-center mt-3">
                    <div className="text-muted fs-16">
                      <span className="mdi mdi-star text-warning" />
                      <span className="mdi mdi-star text-warning" />
                      <span className="mdi mdi-star text-warning" />
                      <span className="mdi mdi-star text-warning" />
                      <span className="mdi mdi-star text-warning" />
                    </div>
                    <div className="text-muted">( 5.50k Customer Review )</div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-3 col-sm-6">
                      <div className="p-2 border border-dashed rounded">
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm me-2">
                            <div className="avatar-title rounded bg-transparent text-success fs-24">
                              <i className="ri-money-dollar-circle-fill" />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <p className="text-muted mb-1">Price :</p>
                            <h5 className="mb-0">
                              {<FormatPrice price={detailProduct.price} />}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end col */}
                    <div className="col-lg-3 col-sm-6">
                      <div className="p-2 border border-dashed rounded">
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm me-2">
                            <div className="avatar-title rounded bg-transparent text-success fs-24">
                              <i className="ri-file-copy-2-fill" />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <p className="text-muted mb-1">No. of Orders :</p>
                            <h5 className="mb-0">
                              {detailProduct.variants.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                              )}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end col */}
                    {/* end col */}
                    <div className="col-lg-3 col-sm-6">
                      <div className="p-2 border border-dashed rounded">
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm me-2">
                            <div className="avatar-title rounded bg-transparent text-success fs-24">
                              <i className="ri-inbox-archive-fill" />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <p className="text-muted mb-1">Total Revenue :</p>
                            <h5 className="mb-0">$60,645</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end col */}
                  </div>
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="mt-4">
                        <h5 className="fs-14">Sizes :</h5>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                          {detailProduct.variants.map((item, index) => (
                            <div>
                              <input
                                type="radio"
                                className="btn-check"
                                name="productsize-radio"
                                id="productsize-radio1"
                                disabled=""
                              />
                              <label className=" btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center bg-[#E2E5ED]">
                                {item.size}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* end col */}
                    <div className="col-xl-6">
                      <div className=" mt-4">
                        <h5 className="fs-14">Colors :</h5>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                          {detailProduct.variants.map((item, index) => (
                            <div>
                              <button
                                type="button"
                                className=" avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-primary"
                                disabled=""
                              >
                                <div
                                  className={`bg-[${item.color}] w-5 h-5 rounded-full`}
                                ></div>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* end col */}
                  </div>
                  {/* end row */}
                  <div className="mt-4 text-muted">
                    <h5 className="fs-14">Description :</h5>
                    <p>{detailProduct.description}</p>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mt-3">
                        <h5 className="fs-14">Features :</h5>
                        <ul className="list-unstyled">
                          <li className="py-1">
                            <i className="mdi mdi-circle-medium me-1 text-muted align-middle" />{" "}
                            Full Sleeve
                          </li>
                          <li className="py-1">
                            <i className="mdi mdi-circle-medium me-1 text-muted align-middle" />{" "}
                            Cotton
                          </li>
                          <li className="py-1">
                            <i className="mdi mdi-circle-medium me-1 text-muted align-middle" />{" "}
                            All Sizes available
                          </li>
                          <li className="py-1">
                            <i className="mdi mdi-circle-medium me-1 text-muted align-middle" />{" "}
                            4 Different Color
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mt-3">
                        <h5 className="fs-14">Services :</h5>
                        <ul className="list-unstyled product-desc-list">
                          <li className="py-1">10 Days Replacement</li>
                          <li className="py-1">Cash on Delivery available</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="product-content mt-5">
                    <h5 className="fs-14 mb-3">Product Description :</h5>
                    <nav>
                      <ul
                        className="nav nav-tabs nav-tabs-custom nav-success"
                        id="nav-tab"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="nav-speci-tab"
                            data-bs-toggle="tab"
                            href="#nav-speci"
                            role="tab"
                            aria-controls="nav-speci"
                            aria-selected="true"
                          >
                            Specification
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="nav-detail-tab"
                            data-bs-toggle="tab"
                            href="#nav-detail"
                            role="tab"
                            aria-controls="nav-detail"
                            aria-selected="false"
                          >
                            Details
                          </a>
                        </li>
                      </ul>
                    </nav>
                    <div
                      className="tab-content border border-top-0 p-4"
                      id="nav-tabContent"
                    >
                      <div
                        className="tab-pane fade show active"
                        id="nav-speci"
                        role="tabpanel"
                        aria-labelledby="nav-speci-tab"
                      >
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <tbody>
                              <tr>
                                <th scope="row" style={{ width: 200 }}>
                                  Category
                                </th>
                                <td>{detailProduct.caterori.name}</td>
                              </tr>
                              <tr>
                                <th scope="row">Brand</th>
                                <td>Tommy Hilfiger</td>
                              </tr>
                              <tr>
                                <th scope="row">Color</th>
                                <td>Blue</td>
                              </tr>
                              <tr>
                                <th scope="row">Material</th>
                                <td>Cotton</td>
                              </tr>
                              <tr>
                                <th scope="row">Weight</th>
                                <td>140 Gram</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-detail"
                        role="tabpanel"
                        aria-labelledby="nav-detail-tab"
                      >
                        <div>
                          <h5 className="font-size-16 mb-3">
                            Tommy Hilfiger Sweatshirt for Men (Pink)
                          </h5>
                          <p>
                            Tommy Hilfiger men striped pink sweatshirt. Crafted
                            with cotton. Material composition is 100% organic
                            cotton. This is one of the world’s leading designer
                            lifestyle brands and is internationally recognized
                            for celebrating the essence of classic American cool
                            style, featuring preppy with a twist designs.
                          </p>
                          <div>
                            <p className="mb-2">
                              <i className="mdi mdi-circle-medium me-1 text-muted align-middle" />{" "}
                              Machine Wash
                            </p>
                            <p className="mb-2">
                              <i className="mdi mdi-circle-medium me-1 text-muted align-middle" />{" "}
                              Fit Type: Regular
                            </p>
                            <p className="mb-2">
                              <i className="mdi mdi-circle-medium me-1 text-muted align-middle" />{" "}
                              100% Cotton
                            </p>
                            <p className="mb-0">
                              <i className="mdi mdi-circle-medium me-1 text-muted align-middle" />{" "}
                              Long sleeve
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* product-content */}
                  <div className="mt-5">
                    <div>
                      <h5 className="fs-14 mb-3">Ratings &amp; Reviews</h5>
                    </div>
                    <div className="row gy-4 gx-0">
                      <div className="col-lg-4">
                        <div>
                          <div className="pb-3">
                            <div className="bg-light px-3 py-2 rounded-2 mb-2">
                              <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                  <div className="fs-16 align-middle text-warning">
                                    <i className="ri-star-fill" />
                                    <i className="ri-star-fill" />
                                    <i className="ri-star-fill" />
                                    <i className="ri-star-fill" />
                                    <i className="ri-star-half-fill" />
                                  </div>
                                </div>
                                <div className="flex-shrink-0">
                                  <h6 className="mb-0">4.5 out of 5</h6>
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-muted">
                                Total <span className="fw-medium">5.50k</span>{" "}
                                reviews
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="row align-items-center g-2">
                              <div className="col-auto">
                                <div className="p-2">
                                  <h6 className="mb-0">5 star</h6>
                                </div>
                              </div>
                              <div className="col">
                                <div className="p-2">
                                  <div className="h-full progress animated-progress progress-sm">
                                    <div
                                      className="progress-bar bg-success"
                                      role="progressbar"
                                      style={{ width: "50.16%" }}
                                      aria-valuenow="50.16"
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="p-2">
                                  <h6 className="mb-0 text-muted">2758</h6>
                                </div>
                              </div>
                            </div>
                            {/* end row */}
                            <div className="row align-items-center g-2">
                              <div className="col-auto">
                                <div className="p-2">
                                  <h6 className="mb-0">4 star</h6>
                                </div>
                              </div>
                              <div className="col">
                                <div className="p-2">
                                  <div className="progress animated-progress progress-sm">
                                    <div
                                      className="progress-bar bg-success"
                                      role="progressbar"
                                      style={{ width: "19.32%" }}
                                      aria-valuenow="19.32"
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="p-2">
                                  <h6 className="mb-0 text-muted">1063</h6>
                                </div>
                              </div>
                            </div>
                            {/* end row */}
                            <div className="row align-items-center g-2">
                              <div className="col-auto">
                                <div className="p-2">
                                  <h6 className="mb-0">3 star</h6>
                                </div>
                              </div>
                              <div className="col">
                                <div className="p-2">
                                  <div className="progress animated-progress progress-sm">
                                    <div
                                      className="progress-bar bg-success"
                                      role="progressbar"
                                      style={{ width: "18.12%" }}
                                      aria-valuenow="18.12"
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="p-2">
                                  <h6 className="mb-0 text-muted">997</h6>
                                </div>
                              </div>
                            </div>
                            {/* end row */}
                            <div className="row align-items-center g-2">
                              <div className="col-auto">
                                <div className="p-2">
                                  <h6 className="mb-0">2 star</h6>
                                </div>
                              </div>
                              <div className="col">
                                <div className="p-2">
                                  <div className="progress animated-progress progress-sm">
                                    <div
                                      className="progress-bar bg-warning"
                                      role="progressbar"
                                      style={{ width: "7.42%" }}
                                      aria-valuenow="7.42"
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="p-2">
                                  <h6 className="mb-0 text-muted">408</h6>
                                </div>
                              </div>
                            </div>
                            {/* end row */}
                            <div className="row align-items-center g-2">
                              <div className="col-auto">
                                <div className="p-2">
                                  <h6 className="mb-0">1 star</h6>
                                </div>
                              </div>
                              <div className="col">
                                <div className="p-2">
                                  <div className="progress animated-progress progress-sm">
                                    <div
                                      className="progress-bar bg-danger"
                                      role="progressbar"
                                      style={{ width: "4.98%" }}
                                      aria-valuenow="4.98"
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="p-2">
                                  <h6 className="mb-0 text-muted">274</h6>
                                </div>
                              </div>
                            </div>
                            {/* end row */}
                          </div>
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-lg-8">
                        <div className="ps-lg-4">
                          <div className="d-flex flex-wrap align-items-start gap-3">
                            <h5 className="fs-14">Reviews: </h5>
                          </div>
                          <div
                            className="me-lg-n3 pe-lg-4"
                            data-simplebar=""
                            style={{ maxHeight: 225 }}
                          >
                            <ul className="list-unstyled mb-0">
                              <li className="py-2">
                                <div className="border border-dashed rounded p-3">
                                  <div className="d-flex align-items-start mb-3">
                                    <div className="hstack gap-3">
                                      <div className="badge rounded-pill bg-success mb-0">
                                        <i className="mdi mdi-star" /> 4.2
                                      </div>
                                      <div className="vr" />
                                      <div className="flex-grow-1">
                                        <p className="text-muted mb-0">
                                          {" "}
                                          Superb sweatshirt. I loved it. It is
                                          for winter.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-grow-1 gap-2 mb-3">
                                    <a href="#" className="d-block">
                                      <img
                                        src={img1}
                                        alt=""
                                        className="avatar-sm rounded object-fit-cover"
                                      />
                                    </a>
                                    <a href="#" className="d-block">
                                      <img
                                        src="assets/images/small/img-11.jpg"
                                        alt=""
                                        className="avatar-sm rounded object-fit-cover"
                                      />
                                    </a>
                                    <a href="#" className="d-block">
                                      <img
                                        src="assets/images/small/img-10.jpg"
                                        alt=""
                                        className="avatar-sm rounded object-fit-cover"
                                      />
                                    </a>
                                  </div>
                                  <div className="d-flex align-items-end">
                                    <div className="flex-grow-1">
                                      <h5 className="fs-14 mb-0">Henry</h5>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <p className="text-muted fs-13 mb-0">
                                        12 Jul, 21
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="py-2">
                                <div className="border border-dashed rounded p-3">
                                  <div className="d-flex align-items-start mb-3">
                                    <div className="hstack gap-3">
                                      <div className="badge rounded-pill bg-success mb-0">
                                        <i className="mdi mdi-star" /> 4.0
                                      </div>
                                      <div className="vr" />
                                      <div className="flex-grow-1">
                                        <p className="text-muted mb-0">
                                          {" "}
                                          Great at this price, Product quality
                                          and look is awesome.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-end">
                                    <div className="flex-grow-1">
                                      <h5 className="fs-14 mb-0">Nancy</h5>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <p className="text-muted fs-13 mb-0">
                                        06 Jul, 21
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="py-2">
                                <div className="border border-dashed rounded p-3">
                                  <div className="d-flex align-items-start mb-3">
                                    <div className="hstack gap-3">
                                      <div className="badge rounded-pill bg-success mb-0">
                                        <i className="mdi mdi-star" /> 4.2
                                      </div>
                                      <div className="vr" />
                                      <div className="flex-grow-1">
                                        <p className="text-muted mb-0">
                                          Good product. I am so happy.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-end">
                                    <div className="flex-grow-1">
                                      <h5 className="fs-14 mb-0">Joseph</h5>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <p className="text-muted fs-13 mb-0">
                                        06 Jul, 21
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="py-2">
                                <div className="border border-dashed rounded p-3">
                                  <div className="d-flex align-items-start mb-3">
                                    <div className="hstack gap-3">
                                      <div className="badge rounded-pill bg-success mb-0">
                                        <i className="mdi mdi-star" /> 4.1
                                      </div>
                                      <div className="vr" />
                                      <div className="flex-grow-1">
                                        <p className="text-muted mb-0">
                                          Nice Product, Good Quality.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-end">
                                    <div className="flex-grow-1">
                                      <h5 className="fs-14 mb-0">Jimmy</h5>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <p className="text-muted fs-13 mb-0">
                                        24 Jun, 21
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* end col */}
                    </div>
                    {/* end Ratings & Reviews */}
                  </div>
                  {/* end card body */}
                </div>
              </div>
              {/* end col */}
            </div>
            {/* end row */}
          </div>
          {/* end card body */}
        </div>
        {/* end card */}
      </div>
      {/* end col */}
    </div>
  );
};

export default Detail_Product;
