import React from "react";
import { Spin } from "antd";
import { useBlogs } from "../../../Hook/useBlog";
import { Link } from "react-router-dom";

const BlogList = () => {
  const { blogs, isLoading } = useBlogs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="row mx-2">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header border-0 bg-none">
            <div className="row align-items-center gy-3">
              <div className="col-sm">
                <h5 className="card-title mb-0 fw-medium">Blog List</h5>
              </div>
            </div>
          </div>
          <div className="card-body pt-0">
            <div className="table-responsive">
              <table className="table table-nowrap align-middle">
                <thead className="text-muted table-light">
                  <tr className="text-uppercase">
                    <th>#</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Content</th>
                    <th>Views</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs?.data?.length > 0 ? (
                    blogs.data.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.title || "No Title"}</td>
                        <td>
                          {item.img_avt ? (
                            <img src={item.img_avt} alt={item.title} width={50} height={50} />
                          ) : (
                            "No Image"
                          )}
                        </td>
                        <td>{item.content?.substring(0, 50) || "No Content"}...</td>
                        <td>{item.view || 0}</td>
                        <td>{item.category_blog_id || "N/A"}</td>
                        <td>{item.user_id || "Unknown"}</td>
                        <td>
                          <ul className="list-inline hstack gap-2 mb-0">
                            <li className="list-inline-item">
                              <Link to={`/admin/blogs/${item.id}`} className="text-primary d-inline-block">
                                <i className="ri-eye-fill fs-16" />
                              </Link>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        Không có data...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
