import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Modal } from "antd";
import Axios from "../../../Apis/Axios";
import { getChildComments } from "../../../Apis/Api";

const CommentList = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [childComments, setChildComments] = useState([]);
  const [isChildModalOpen, setIsChildModalOpen] = useState(false);

  const handleShowChildComments = async (commentId) => {
    const { childComments } = await getChildComments(commentId);
    setChildComments(childComments || []);
    setIsChildModalOpen(true);
  };

  const handleChildModalClose = () => {
    setIsChildModalOpen(false);
    setChildComments([]);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await Axios.get(`/api/products/${id}/comments`);
        setProduct(res.data.product);
        setComments(res.data.comments || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  const showModal = (commentId) => {
    setIdDelete(commentId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIdDelete("");
  };
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  
  const showModalDetail = (comment) => {
    setSelectedComment(comment);
    setIsDetailModalOpen(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setSelectedComment(null);
  };
  const handleDeleteChildComment = (childCommentId) => {
    setIdDelete(childCommentId); // Đặt ID của comment con cần xóa
    setIsModalOpen(true); // Hiển thị modal xác nhận xóa
  };
  const handleOk = async () => {
    try {
      await Axios.delete(`/api/comments/delete`, { data: { id: idDelete } });
      // Xóa comment con khỏi danh sách
      setChildComments((prev) => prev.filter((child) => child.id !== idDelete));
      setIsModalOpen(false);
      setIdDelete("");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
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
              <div className="product-info bg-light p-3 rounded mb-4 d-flex align-items-center">
                <img
                  src={product?.img_thumb || "https://via.placeholder.com/100"}
                  alt={product?.name || "No Image"}
                  className="rounded me-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <h5 className="mb-2 fw-bold text-primary">
                    Comments for Product: {product?.name}
                  </h5>
                  <p className="text-muted mb-1">
                    <strong>Description:</strong> {product?.description}
                  </p>
                  <p className="text-muted mb-0">
                    <strong>Views:</strong> {product?.view}
                  </p>
                </div>
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
                      <th>User</th>
                      <th>Content</th>
                      <th>Children Count</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all">
                    {comments.length > 0 ? (
                      comments.map((comment, index) => (
                        <tr key={comment.id}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={comment.user?.avatar}
                                alt="avatar"
                                className="rounded-circle me-2"
                                style={{ width: "40px", height: "40px" }}
                              />
                              <span>{comment.user?.name || "Anonymous"}</span>
                            </div>
                          </td>
                          <td>
                            {comment.content.length > 50
                              ? `${comment.content.slice(0, 50)}...`
                              : comment.content}
                          </td>
                          <td>{comment.children_count || 0}</td>
                          <td>
                            {new Date(comment.created_at).toLocaleString()}
                          </td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li className="list-inline-item">
                                <div
                                  className="text-primary d-inline-block"
                                  onClick={() => showModalDetail(comment)}
                                >
                                  <i className="ri-eye-fill fs-16" />
                                </div>
                              </li>
                              <li className="list-inline-item">
                                <div
                                  className="text-danger d-inline-block"
                                  onClick={() => showModal(comment.id)}
                                >
                                  <i className="ri-delete-bin-5-fill fs-16"></i>
                                </div>
                              </li>
                              <li className="list-inline-item">
                                <div
                                  className="text-info d-inline-block"
                                  onClick={() =>
                                    handleShowChildComments(comment.id)
                                  }
                                >
                                  <i className="ri-chat-3-line fs-16"></i>{" "}
                                  {/* Icon for child comments */}
                                </div>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No comments available.
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
      {/* show comment con  */}
      <Modal
  open={isChildModalOpen}
  onCancel={handleChildModalClose}
  footer={null}
  title="Child Comments"
>
  {childComments.length > 0 ? (
    <div>
      {childComments.map((child) => (
        <div className="child-comment">
  <div className="info">
    <strong>{child.user?.name || "Anonymous"}:</strong>
    <p className="mb-1">{child.content}</p>
    <div className="timestamp">
      Created At: {new Date(child.created_at).toLocaleString()}
    </div>
  </div>
  <button onClick={() => handleDeleteChildComment(child.id)}>
    Delete
  </button>
</div>

      ))}
    </div>
  ) : (
    <p>No child comments available.</p>
  )}
</Modal>

      {/* Modal delete */}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="text-center">
          <h4>Are you sure?</h4>
          <p>Do you really want to delete this comment?</p>
        </div>
      </Modal>

      {/* Modal detail */}
      <Modal
        open={isDetailModalOpen}
        onCancel={handleDetailModalClose}
        footer={null}
        title="Comment Details"
      >
        {selectedComment && (
          <div>
            <div className="d-flex align-items-center mb-3">
              <img
                src={
                  selectedComment.user?.avatar ||
                  "https://via.placeholder.com/100"
                }
                alt={selectedComment.user?.name || "No Avatar"}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                className="rounded-circle me-3"
              />
              <div>
                <h5 className="mb-2 fw-bold">
                  {selectedComment.user?.name || "Anonymous"}
                </h5>
                <p className="text-muted mb-1">
                  <strong>Email:</strong>{" "}
                  {selectedComment.user?.email || "No Email"}
                </p>
                <p className="text-muted mb-1">
                  <strong>Role:</strong>{" "}
                  {selectedComment.user?.role || "No Role"}
                </p>
              </div>
            </div>
            <p className="text-muted mb-1">
              <strong>Content:</strong>{" "}
              {selectedComment.content || "No Content"}
            </p>
            <p className="text-muted mb-1">
              <strong>Children Count:</strong>{" "}
              {selectedComment.children_count || 0}
            </p>
            <p className="text-muted mb-1">
              <strong>Created At:</strong>{" "}
              {new Date(selectedComment.created_at).toLocaleString()}
            </p>
            <p className="text-muted mb-0">
              <strong>Updated At:</strong>{" "}
              {new Date(selectedComment.updated_at).toLocaleString()}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CommentList;
