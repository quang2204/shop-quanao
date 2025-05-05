import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useBlogs } from "../Hook/useBlog";
import { Empty, Spin } from "antd";
import { FormatPrice } from "../Format";
import { useState } from "react";
const Blog = () => {
  const [searchParam] = useSearchParams();
  const [searchValue,setSearchValue]=useState()
  const search = searchParam.get("search");
  const category_id = searchParam.get("category_id");
  const page = searchParam.get("page");
  const navigate=useNavigate()
  const { data, isLoading } = useBlogs({
    search,
    category_id,
    page,
  });
  const markLink = (key, value) => {
    const param = new URLSearchParams(searchParam.toString());
    param.set(key, value);
    return `/blog?${param.toString()}`;
  };
  const handClick = () => {
    const param = new URLSearchParams(searchParam.toString());

    if (searchValue) {
      param.set('search', searchValue);
    } else {
      param.delete('search');
    }
    navigate(`/blog?${param.toString()}`);
  };
  if (isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full"
      />
    );
  }

  return (
    <div>
      <section
        className="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{
          backgroundImage: "url('src/images/bg-02.jpg')",
        }}
      >
        <h2 className="ltext-105 cl0 txt-center">Blog</h2>
      </section>
      <section className="bg0 p-t-62 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
                {data?.blogs?.data.length>0? data?.blogs?.data.map((item) => (
                  <div className="p-b-63" key={item.id}>
                    <Link
                      className="hov-img0 how-pos5-parent"
                      to={`${item.id}`}
                    >
                      <img alt="IMG-BLOG" src={item.img_avt} />
                      <div className="flex-col-c-m size-123 bg9 how-pos5">
                        <span className="ltext-107 cl2 txt-center">
                          {item.created_at.split("T")[0].split("-")[2]}
                        </span>
                        <span className="stext-109 cl3 txt-center">
                          {item.created_at.split("T")[0].split("-")[1]} -
                          {item.created_at.split("T")[0].split("-")[0]}
                        </span>
                      </div>
                    </Link>
                    <div className="p-t-32">
                      <h4 className="p-b-15">
                        <a
                          className="ltext-108 cl2 hov-cl1 trans-04"
                          href="blog-detail.html"
                        >
                          {item.title}
                        </a>
                      </h4>
                      <p className="stext-117 cl6">{item.content}</p>
                      <div className="flex-w flex-sb-m p-t-18">
                        <span className="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10">
                          <span>
                            <span className="cl4">By</span> {item.user.name}
                            <span className="cl12 m-l-4 m-r-6">|</span>
                          </span>
                          <span>{item.category_blog.name}</span>
                        </span>
                        <Link
                          className="stext-101 cl2 hov-cl1 trans-04 m-tb-10"
                          to={`${item.id}`}
                        >
                          Continue Reading
                          <i className="fa fa-long-arrow-right m-l-9" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )):<Empty className="mt-20"/>}
                <div className="flex-l-m flex-w w-full p-t-10 m-lr--7">
                  <a
                    className="flex-c-m how-pagination1 trans-04 m-all-7 active-pagination1"
                    href="#"
                  >
                    1
                  </a>
                  <a
                    className="flex-c-m how-pagination1 trans-04 m-all-7"
                    href="#"
                  >
                    2
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-3 p-b-80">
              <div className="side-menu">
                <div className="bor17 of-hidden pos-relative">
                  <input
                    className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55"
                    name="search"
                    placeholder="Search"
                    type="text"
                    onChange={(e)=>setSearchValue(e.target.value)}
                  />
                  <button className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04" onClick={handClick} >
                    <i className="zmdi zmdi-search" />
                  </button>
                </div>
                <div className="p-t-55">
                  <h4 className="mtext-112 cl2 p-b-33">Categories</h4>
                  <ul>
                    {data.categoryBlog.map((item) => (
                      <li className="bor18" key={item.id}>
                        <Link
                          className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                          to={markLink('category_id',item.id)}
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
                      <li className="flex-w flex-t p-b-30 mt-4" key={item.id}>
                        <Link
                          className="wrao-pic-w size-214 hov-ovelay1 m-r-20"
                          to={`/product/${item.id}`}
                        >
                          <img alt="PRODUCT" src={item.img_thumb} />
                        </Link>
                        <div className="size-215 flex-col-t p-t-8">
                          <Link
                            className="stext-116 cl8 hov-cl1 trans-04"
                            to={`/product/${item.id}`}
                          >
                            {item.name}
                          </Link>
                          <span className="stext-116 cl6 p-t-20">
                            {<FormatPrice price={item.variants_min_price} />}
                          </span>
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
    </div>
  );
};

export default Blog;
