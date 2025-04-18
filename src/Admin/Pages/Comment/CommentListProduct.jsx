import React, { useState } from "react";
import { Modal, Pagination, Spin } from "antd";
import { useComments } from "../../../Hook/useComment";
import { Link } from "react-router-dom";

const CommentListProduct = () => {
  const [page, setPage] = useState(1);

  const { comments, isLoading } = useComments(page);

  const onShowSizeChange = (current) => {
    setPage(current);
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
    <div className="row mx-2">
      <div className="col-lg-12">
        <div className="card" id="commentList">
          <div className="card-header border-0 bg-none">
            <div className="row align-items-center gy-3 mb-8">
              <div className="col-sm">
                <h5 className="mb-0">Comment List Product</h5>
              </div>
            </div>
          </div>

          <div className="card-body pt-0">
            <div>
              <div className="table-responsive table-card mb-1">
                <table
                  className="table table-nowrap align-middle"
                  id="commentTable"
                >
                  <thead className="text-muted table-light">
                    <tr className="text-uppercase">
                      <th>#</th>
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>Description</th>
                      <th>Views</th>
                      <th>Count</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all">
                    {comments?.products?.data?.length > 0 ? (
                      comments.products.data.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={
                                item.img_thumb ||
                                "https://via.placeholder.com/50"
                              }
                              alt={item.name || "No Image"}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td>
                            {item.name
                              ? item.name.length > 30
                                ? `${item.name.slice(0, 30)}...`
                                : item.name
                              : "No Name"}
                          </td>

                          <td>
                            {item.description
                              ? item.description.length > 50
                                ? `${item.description.slice(0, 50)}...`
                                : item.description
                              : "No Description"}
                          </td>
                          <td>{item.view || 0}</td>
                          <td>{item.comments_count || 0}</td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li className="list-inline-item">
                                <Link
                                  to={`/admin/comment-list/${item.id}`}
                                  className="text-primary d-inline-block"
                                >
                                  <i className="ri-eye-fill fs-16" />
                                </Link>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          không có sản phẩm nào có bình luận
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination
                showSizeChanger
                onChange={onShowSizeChange}
                current={comments?.products?.current_page || 1}
                total={comments?.products?.total || 0}
                pageSize={comments?.products?.per_page || 10}
                align="center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentListProduct;
