import {
  useforceDeleteProduct,
  userestoreProduct,
} from "../../../Hook/useProduct.jsx";
import { Empty, Image, Modal, Spin } from "antd";
import { FormatDate, FormatPrice } from "../../../Format.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { harddeleteBlogs, useforceDeleteBlog, userestoreBlog } from "../../../Hook/useBlog.jsx";
const HarddeleteBlog = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const { blogs, isBlogs } = harddeleteBlogs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const { mutate, isLoading } = useforceDeleteBlog(() => {
    // setOpen(false);
    setId("");
  });
  const { mutate: mutaRestore, isLoading: isRestore } = userestoreBlog(
    () => {
      // setOpen(false);
      setId("");
    }
  );
  const showModal = (id) => {
    setIdDelete(id);
    setIsModalOpen(true);
  };
  const showRestore = (id) => {
    setIdDelete(id);
    setIsModalOpendelete(true);
  };
  const handleCancelRestore = () => {
    setIsModalOpendelete(false);
  };
  const handleOkRestore = () => {
    mutaRestore(idDelete);
    setIsModalOpendelete(false);
  };
  const handleCancel = () => {
    setIsModal(false);
  };
  const handleOk = () => {
    mutate(idDelete);
    setIsModalOpen(false);
  };

  if (isBlogs) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <div className="row">
      <div className="col-lg-12">
        {blogs?.data.length > 0 ? (
          <div className="card" id="orderList">
            <div className="card-body pt-0">
              <div>
                <div className="table-responsive table-card mb-1 mt-3">
                  <table
                    className="table table-nowrap align-middle"
                    id="orderTable"
                  >
                    <thead className="text-muted table-light bg-white">
                      <tr className="text-uppercase ">
                        <th>#</th>
                        <th>Name</th>
                        <th>Blog Date</th>
                        <th>Category_blog</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {blogs?.data.map((item, index) => (
                        <tr key={index}>
                          <td className="id">
                            <div className="fw-medium">{index + 1}</div>
                          </td>
                          <td className="customer_name">
                            <div
                              className="fw-medium "
                            >
                              {item.title.length > 30
                                ? item.title.slice(0, 30) + "..."
                                : item.title}
                            </div>
                          </td>

                          <td className="datetext-center">
                            {<FormatDate date={item.created_at} />}
                          </td>
                          <td>{item.category_blog.name}</td>
                          <td>
                            <Image
                              width={80}
                              src={item.img_avt}
                              alt="product"
                            />
                          </td>
                          <td className="status">
                            <span
                              className={`badge ${item.is_active === true ? "text-green-500" : "text-red-500"} text-uppercase`}
                            >
                              {item.is_active === true ? "Active" : "Block"}
                            </span>
                          </td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li className="list-inline-item">
                                <div
                                  className="text-danger d-inline-block remove-item-btn"
                                  onClick={() => showModal(item.id)}
                                >
                                  <i className="ri-delete-bin-5-fill fs-16"></i>
                                </div>
                              </li>
                              <li className="list-inline-item cursor-pointer">
                                <div
                                  className="text-danger d-inline-block remove-item-btn"
                                  onClick={() => showRestore(item.id)}
                                >
                                  <img
                                    src="https://media-public.canva.com/RAeJ8/MAEy_-RAeJ8/1/tl.png"
                                    alt="restore"
                                    width={30}
                                  />
                                </div>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="noresult" style={{ display: "none" }}>
                    <div className="text-center">
                      <lord-icon
                        src="https://cdn.lordicon.com/msoeawqm.json"
                        trigger="loop"
                        colors="primary:#405189,secondary:#0ab39c"
                        style={{ width: 75, height: 75 }}
                      />
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted">
                        We've searched more than 150+ Orders We did not find any
                        orders for you search.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Empty />
        )}

        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}

          // className="modal fade zoomIn"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-none">
              <div className="modal-body">
                <div className="mt-2 text-center ">
                  <div className="flex justify-center">
                    <img
                      src="https://media-public.canva.com/de2y0/MAFqwzde2y0/1/tl.png"
                      alt=""
                      width={100}
                    />
                  </div>
                  <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                    <h4>Are you sure ?</h4>
                    <p className="text-muted mx-4 mb-0">
                      Are you sure you want to remove this record ?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={isModalOpendelete}
          onOk={handleOkRestore}
          onCancel={handleCancelRestore}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-none">
              <div className="modal-body">
                <div className="mt-2 text-center ">
                  <div className="flex justify-center">
                    <img
                      src="https://media-public.canva.com/de2y0/MAFqwzde2y0/1/tl.png"
                      alt=""
                      width={100}
                    />
                  </div>
                  <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                    <h4>Are you sure ?</h4>
                    <p className="text-muted mx-4 mb-0">
                      Are you sure you want to restore this record?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      {/*end col*/}
    </div>
  );
};

export default HarddeleteBlog;
