import { Link } from "react-router-dom";
import { useBlogDetail } from "../Hook/useBlog";
import { Spin } from "antd";
import { FormatDate, FormatPrice } from "../Format";

const BlogDetail = () => {
  const { data, isLoading } = useBlogDetail();
  console.log(data);
  if (isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full"
      />
    );
  }
  return (
    <>
      <div className="container mt-24">
        <div className="bread-crumb flex-w  p-t-30 p-lr-0-lg">
          <Link to={"/"} className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i
              className="fa fa-angle-right m-l-9 m-r-10"
              aria-hidden="true"
            ></i>
          </Link>

          <Link to="/blog" className="stext-109 cl8 hov-cl1 trans-04">
            Blog
            <i
              className="fa fa-angle-right m-l-9 m-r-10"
              aria-hidden="true"
            ></i>
          </Link>

          <span className="stext-109 cl4">{data.blog.title}</span>
        </div>
      </div>

      <section className="bg0 p-t-52 p-b-20">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
                <div className="wrap-pic-w how-pos5-parent">
                  <img src={data.blog.img_avt} alt="IMG-BLOG" />

                  <div className="flex-col-c-m size-123 bg9 how-pos5">
                    <span className="ltext-107 cl2 txt-center">
                      {data.blog.created_at.split("T")[0].split("-")[2]}
                    </span>

                    <span className="stext-109 cl3 txt-center">
                      {data.blog.created_at.split("T")[0].split("-")[1]}-
                      {data.blog.created_at.split("T")[0].split("-")[0]}
                    </span>
                  </div>
                </div>

                <div className="p-t-32">
                  <span className="flex-w flex-m stext-111 cl2 p-b-19">
                    <span>
                      <span className="cl4">By</span> {data.blog.user.name}
                      <span className="cl12 m-l-4 m-r-6">|</span>
                    </span>

                    <span>
                      {<FormatDate date={data.blog.created_at} />}
                      <span className="cl12 m-l-4 m-r-6">|</span>
                    </span>

                    <span>
                      {data.blog.category_blog.name}
                      <span className="cl12 m-l-4 m-r-6">|</span>
                    </span>
                  </span>

                  <h4 className="ltext-109 cl2 p-b-28">{data.blog.title}</h4>

                  <p className="stext-117 cl6 p-b-26">{data.blog.content}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-lg-3 p-b-80">
              <div className="side-menu">
                <div className="bor17 of-hidden pos-relative">
                  <input
                    className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55"
                    type="text"
                    name="search"
                    placeholder="Search"
                  />

                  <button className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04">
                    <i className="zmdi zmdi-search"></i>
                  </button>
                </div>

                <div className="p-t-55">
                  <h4 className="mtext-112 cl2 p-b-23">Categories</h4>

                  <ul>
                    {data.categoryBlog.map((item) => (
                      <li className="bor18">
                        <Link
                          to="#"
                          className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-t-65">
                  <h4 className="mtext-112 cl2 p-b-33">Featured Products</h4>

                  <ul>
                    {data.bestSellingProducts.map((item) => (
                      <li className="flex-w flex-t p-b-30" key={item.id}>
                        <Link
                          to={`/product/${item.id}`}
                          className="wrao-pic-w size-214 hov-ovelay1 m-r-20"
                        >
                          <img src={item.img_thumb} alt="PRODUCT" />
                        </Link>

                        <div className="size-215 flex-col-t p-t-8">
                          <Link
                            to={`/product/${item.id}`}
                            className="stext-116 cl8 hov-cl1 trans-04"
                          >
                           {item.name}
                          </Link>

                          <span className="stext-116 cl6 p-t-20"> {<FormatPrice price={item.variants_min_price} />} </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
