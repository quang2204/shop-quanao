import React, { useState } from "react";
import { useBlogs, useBlogsAdmin, useDeletBlog } from "../../../Hook/useBlog";
import { Empty, Image, Modal, Pagination, Spin } from "antd";
import { div } from "framer-motion/client";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { data, isLoading } = useBlogsAdmin();
  console.log(data);
  const { mutate, isLoading: isDelete } = useDeletBlog();
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const showDetailModal = (banner) => {
    setCurrentDetail(banner);
    setIsModalOpenDetail(true);
  };
  const showModal = (id) => {
    setIdDelete(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIdDelete("");
  };
  const handleOk = () => {
    mutate(idDelete);
    setIsModalOpen(false);
    setIdDelete("");
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
        <div className="card" id="orderList">
          <div className="card-header border-0 bg-none">
            <div className="row align-items-center gy-3 mb-3">
              <div className="col-sm"></div>
              <div className="col-sm-auto">
                <Link
                  to={"/admin/addblog"}
                  className="text-white text-[0.9rem] bg-[#03A9F4] px-4 py-2 rounded-md mb-3"
                >
                  <i className="ri-add-line align-bottom me-1" />
                  Add Blog
                </Link>
              </div>
            </div>
          </div>
          {data?.data.length > 0 ? (
            <div>
              <div className="card-body pt-0">
                <div className="table-responsive table-card mb-1">
                  <table
                    className="table table-nowrap align-middle"
                    id="orderTable"
                  >
                    <thead className="text-muted table-light">
                      <tr className="text-uppercase">
                        <th>#</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Active</th>
                        <th>Category_blog</th>
                        <th>View</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {data?.data.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.title}</td>
                          <td>
                            <Image src={item.img_avt} width={100} />
                          </td>
                          <td>
                            <span
                              className={`badge ${item.is_active === true ? "text-green-500" : "text-red-500"} text-uppercase`}
                            >
                              {item.is_active === true ? "Active" : "Block"}
                            </span>
                          </td>
                          <td>{item.category_blog.name}</td>
                          <td>{item.view}</td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li className="list-inline-item">
                                <div
                                  className="text-primary d-inline-block edit-item-btn"
                                  onClick={() => showDetailModal(item)}
                                >
                                  <i className="ri-eye-fill fs-16" />
                                </div>
                              </li>
                              <li className="list-inline-item edit">
                                <Link
                                  to={`/admin/updateblog/${item.id}`}
                                  className="text-primary d-inline-block edit-item-btn"
                                >
                                  <i className="ri-pencil-fill fs-16" />
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <div
                                  className="text-danger d-inline-block remove-item-btn"
                                  onClick={() => showModal(item.id)} // Gọi showModal với ID của size
                                >
                                  <i className="ri-delete-bin-5-fill fs-16"></i>
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

              <div className="d-flex justify-center mb-4">
                <Pagination
                  showSizeChanger
                  //   onChange={onShowSizeChange}
                  current={data.current_page}
                  total={data.total}
                  pageSize={data.per_page}
                  align="center"
                />
              </div>
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </div>

      {/* Modal Delete */}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Delete Size"
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

      {/* Modal Add */}
      {/* <Modal
        open={isModalOpenAdd}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancelAdd}
        title="Add Size"
      >
        <form>
          <div className="mb-3">
            <label className="form-label">Size Name</label>
            <input
              type="text"
              className="form-control"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-danger">Name is required</p>}
          </div>
        </form>
      </Modal> */}

      {/* Modal Edit */}
      {/* <Modal
        open={isModalOpenEdit}
        onOk={handleSubmit(onEditSubmit)}
        onCancel={handleCancelEdit}
        title="Edit Size"
      >
        <form>
          <div className="mb-3">
            <label className="form-label">Size Name</label>
            <input
              type="text"
              className="form-control"
              defaultValue={currentSize?.name}
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-danger">Name is required</p>}
          </div>
        </form>
      </Modal> */}

      {/* Modal Detail */}
      <Modal
        open={isModalOpenDetail}
        onCancel={() => setIsModalOpenDetail(false)}
        footer={null}
        title="Size Details"
      >
        <div>
          <div className="mb-3">
            <label className="form-label">Size Name</label>
            <p>{currentDetail?.title}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <Image src={currentDetail?.img_avt} />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <p>{currentDetail?.content}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Category_blog</label>
            <p>{currentDetail?.category_blog.name}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Is_active</label>
            <p>{currentDetail?.is_active === true ? "Active" : "Block"}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Blogs;
