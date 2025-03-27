import { useState } from "react";
import { useProduct, useProducts } from "../Hook/useProduct";
import { Empty, Spin } from "antd";
import { Link } from "react-router-dom";
import { FormatPrice } from "../Format";
import { motion } from "framer-motion";
import { useBanners } from "../Hook/useBanner";
const Home = () => {
  const slide = [
    {
      id: 1,
      image: "src/images/slide-04.jpg",
    },
    {
      id: 2,
      image: "src/images/slide-05.jpg",
    },
    {
      id: 3,
      image: "src/images/slide-06.jpg",
    },
  ];
  const { banners, loading, error } = useBanners();

  const { products, isProducts } = useProduct();
  const [slick, setSlick] = useState(slide);
  const [count, setCount] = useState(0);
  const next = () => {
    if (count < 2) {
      setCount(count + 1);
    }
    if (count === 2) {
      setCount(0);
    }
  };
  const pre = () => {
    if (count > 0) {
      setCount(count - 1);
    }
    if (count === 0) {
      setCount(2);
    }
  };
  if (isProducts ) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <>
    <section className="section-slide">
      <div className="wrap-slick1 rs2-slick1">
        <div className="slick1">
          {banners.length > 0 && (
            <motion.div
              key={banners[count].id}
              className="item-slick1 bg-overlay1"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1 }}
              style={{
                backgroundImage: `url(${banners[count].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "70vh",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            />
          )}
        </div>
        <button
          className="arrow-slick1 prev-slick1 slick-arrow"
          onClick={pre}
          style={{
            borderRadius: "50%",
            padding: "10px",
          }}
        >
          <i className="zmdi zmdi-caret-left" style={{ color: "#fff", fontSize: "50px" }}></i>
        </button>
        <button
          className="arrow-slick1 next-slick1 slick-arrow"
          onClick={next}
          style={{
            borderRadius: "50%",
            padding: "10px",
          }}
        >
          <i className="zmdi zmdi-caret-right" style={{ color: "#fff", fontSize: "50px" }}></i>
        </button>
      </div>
    </section>

      <div className="sec-banner bg0 p-t-80 p-b-50">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src="src/images/banner-01.jpg" alt="IMG-BANNER" />

                <a
                  href="product.html"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Women
                    </span>

                    <span className="block1-info stext-102 trans-04">
                      Spring 2018
                    </span>
                  </div>

                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src="src/images/banner-02.jpg" alt="IMG-BANNER" />

                <a
                  href="product.html"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Men
                    </span>

                    <span className="block1-info stext-102 trans-04">
                      Spring 2018
                    </span>
                  </div>

                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src="src/images/banner-03.jpg" alt="IMG-BANNER" />

                <a
                  href="product.html"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Accessories
                    </span>

                    <span className="block1-info stext-102 trans-04">
                      New Trend
                    </span>
                  </div>

                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg0 p-t-23 p-b-140">
        <div className="container">
          <div className="p-b-10">
            <h3 className="ltext-103 cl5">Product Overview</h3>
          </div>

          <div className="row isotope-grid mt-4">
            {products ? (
              products?.data?.data
                .filter((item) => item.is_active === true)
                .map((item, index) => (
                  <div
                    className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
                    key={item.id}
                  >
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img alt="IMG-PRODUCT" src={item.img_thumb} />
                        <a
                          className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                          href="#"
                        >
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l">
                          <Link
                            className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                            to={`product/${item.id}`}
                          >
                            {item.name}
                          </Link>
                          <span className="stext-107 cl3">
                            {<FormatPrice price={item.variants_min_price} />}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <Empty className="flex items-center justify-center w-full mt-10" />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;