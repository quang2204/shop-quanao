import React, { useEffect, useState } from "react";
import img1 from "../../velzon/assets/images/products/img-8.png";
import img2 from "../../velzon/assets/images/products/img-7.png";
import img3 from "../../velzon/assets/images/products/img-3.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Link, useParams } from "react-router-dom";
import {
  useDetailProduct,
  useProductGalleries,
  useProductVariants,
} from "../../../Hook/useDetailProduct";
import { Select, Spin } from "antd";
import { FormatDate, FormatPrice } from "../../../Format";
const Detail_Product = () => {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [idVariants, setidVariants] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const { detailProduct, isDetailProduct } = useDetailProduct();
  const { isProductVariants, productVariant } = useProductVariants();
  const { productGallerie, isproductGalleries } = useProductGalleries();

  useEffect(() => {
    const checkid = productVariant?.filter(
      (item) =>
        item.size_id === size && item.color_id === color && item.quantity > 0
    );
    console.log(checkid);
    if (checkid?.length > 0) {
      setidVariants(checkid[0]);
    } else {
      setidVariants(null);
    }
  }, [size, color, productVariant]);
  // console.log(productVariant);
  if (isDetailProduct || isProductVariants || isproductGalleries) {
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
        <div className="card" style={{ boxShadow: "none" }}>
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
                    {productGallerie.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={img.image}
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
                    {productGallerie.map((img, index) => (
                      <SwiperSlide key={index} className="thumbnail-slide">
                        <img
                          src={img.image}
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
                      <h4>
                        {detailProduct[0]?.name.slice(0, 70) + "..."}
                      </h4>
                      <div className="hstack gap-3 flex-wrap">
                        {/* <div>
                          <a href="#" className="text-primary d-block">
                            Tommy Hilfiger
                          </a>
                        </div> */}
                        <div className="text-muted mt-2">
                          Category :
                          <span className="text-body fw-medium">
                            {detailProduct[0]?.category.name}
                          </span>
                        </div>
                        <div className="text-muted mt-2">
                          Published :
                          <span className="text-body fw-medium">
                            {FormatDate({ date: detailProduct[0]?.created_at })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div>
                        <Link
                          to={`/admin/uppdateproduct/${detailProduct[0]?.id}`}
                          className="btn btn-light"
                        >
                          <i className="ri-pencil-fill align-bottom" />
                        </Link>
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
                              <FormatPrice
                                price={
                                  idVariants?.price ??
                                  productVariant?.[0]?.price
                                }
                              />
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
                              {/* {detailProduct.variants.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                              )} */}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
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
                    <div className="col-lg-3 col-sm-6">
                      <div className="p-2 border border-dashed rounded">
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm me-2">
                            <div className="avatar-title rounded bg-transparent text-success fs-24">
                              <i className="ri-file-copy-2-fill" />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <p className="text-muted mb-1">Quantity : </p>
                            <h5 className="mb-0">
                              {idVariants?.quantity ??
                                productVariant.reduce(
                                  (acc, item) => acc + item.quantity,
                                  0
                                )}
                              <span> sản phẩm</span>
                            </h5>
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
                        <div className="d-flex flex-wrap gap-2 ">
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
                                productVariant
                                  ?.flatMap((variant) => variant.size) // Lấy tất cả size từ các biến thể
                                  ?.map((item) => [
                                    item?.id,
                                    { value: item?.id, label: item.name },
                                  ]) // Tạo key-value cho Map
                              ).values() // Lấy các giá trị duy nhất
                            )}
                            onChange={(value) => setSize(value)}
                            className="w-[135px] mt-2"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col */}
                    <div className="col-xl-6">
                      <div className=" mt-4">
                        <h5 className="fs-14">Colors :</h5>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                          <Select
                            showSearch
                            placeholder="Select a color"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            options={Array.from(
                              new Map(
                                productVariant
                                  ?.flatMap((variant) => variant.color) // Lấy tất cả size từ các biến thể
                                  ?.map((item) => [
                                    item?.id,
                                    { value: item?.id, label: item.name },
                                  ]) // Tạo key-value cho Map
                              ).values() // Lấy các giá trị duy nhất
                            )}
                            onChange={(value) => setColor(value)}
                            className="w-[135px]"
                          />
                        </div>
                      </div>
                    </div>
                    {/* end col */}
                  </div>

                  <div className="product-content mt-5">
                    <h5 className="text-[17px] mb-3 font-medium">
                      Product Description :
                    </h5>
                    <div
                      className="tab-content border p-4 rounded-md"
                      id="nav-tabContent"
                    >
                      <div className="tab-pane fade active show">
                        <div>
                          <h5 className="font-size-16 mb-3">
                            {detailProduct[0]?.name}
                          </h5>
                          <p>{detailProduct[0].description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail_Product;
