import { useEffect, useState } from "react";
import { useProduct, useProducts } from "../Hook/useProduct";
import { Empty, Spin } from "antd";
import { Link } from "react-router-dom";
import { FormatPrice } from "../Format";
import { useProductVariant } from "../Hook/useDetailProduct";
import { motion } from "framer-motion";
import { useBanners } from "../Hook/useBanner";
import ChatApp from "../Ui/Chatbot";
import getHomes from "../Hook/useHome";
const Home = () => {
  // const { banners, loading, error } = useBanners();
  // const { products, isProducts } = useProduct();
  const { data, isLoading } = getHomes();
  console.log(data);
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
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [data]);
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
      <section className="section-slide mt-[5rem]">
        <div className="wrap-slick1 rs2-slick1">
          <div className="slick1">
            {data.banners.length > 0 && (
              <motion.div
                key={data.banners[count].id}
                className="item-slick1 bg-overlay1"
                transition={{ duration: 1 }}
                style={{
                  backgroundImage: `url(${data.banners[count].image})`,
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
            <i
              className="zmdi zmdi-caret-left"
              style={{ color: "#fff", fontSize: "50px" }}
            ></i>
          </button>
          <button
            className="arrow-slick1 next-slick1 slick-arrow"
            onClick={next}
            style={{
              borderRadius: "50%",
              padding: "10px",
            }}
          >
            <i
              className="zmdi zmdi-caret-right"
              style={{ color: "#fff", fontSize: "50px" }}
            ></i>
          </button>
        </div>
      </section>
      <section className="bg0 p-t-23">
        <div className="container mt-10">
          <div className="p-b-10">
            <h3 className="ltext-102 cl5">Sản phẩm bán chạy</h3>
          </div>

          <div className="row isotope-grid mt-4">
            {data.bestSellingProducts ? (
              data.bestSellingProducts
                ?.filter((item) => item.is_active === true)
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
                            {
                              <FormatPrice
                                price={item.variants_min_price}
                              />
                            }
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
      <section className="bg0 p-t-23 pb-10">
        <div className="container mt-">
          <div className="p-b-10">
            <h3 className="ltext-102 cl5">Sản phẩm mới</h3>
          </div>

          <div className="row isotope-grid mt-4">
            {data.newProducts ? (
              data.newProducts
                ?.filter((item) => item.is_active === true)
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
                            {
                              <FormatPrice
                                price={item.variants_min_price}
                              />
                            }
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
      {/* <ChatApp/> */}
    </>
  );
};

export default Home;
