import React, { useState } from "react";
import {
  useSize,
  useCreateSize,
  useUpdateSize,
  useDeleteSize,
} from "../../../Hook/useSize";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Spin, Pagination, message, Button } from "antd";
import { useForm } from "react-hook-form";

const Sizes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page")) || 1; // Quản lý trang hiện tại
  const { size, isSize } = useSize(page); // Lấy dữ liệu size từ hook
  const { mutate: createSize, isLoading: isAdd } = useCreateSize();
  const { mutate: updateSize, isLoading: isUpdate } = useUpdateSize();
  const { mutate: deleteSize, isLoading: isDelete } = useDeleteSize();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [currentSizeDetail, setCurrentSizeDetail] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [idDelete, setIdDelete] = useState("");
  const onShowSizeChange = (current) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", current);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const showModal = (id) => {
    setIdDelete(id); // Lưu ID của size cần xóa
    setIsModalOpen(true); // Hiển thị modal xóa
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
    reset();
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
    setCurrentSize(null);
    reset();
  };

  const handleOk = () => {
    deleteSize(idDelete, {
      onSuccess: () => {
        setIsModalOpen(false); // Đóng modal
        setIdDelete(""); // Xóa ID đã chọn
      },
      onError: (error) => {
        message.error("Failed to delete size!"); // Hiển thị thông báo lỗi
        console.error("Delete error:", error);
      },
    });
  };

  const onSubmit = (data) => {
    createSize(data, {
      onSuccess: () => {
        reset();
        handleCancelAdd();
      },
    });
  };

  const onEditSubmit = (data) => {
    updateSize(
      { id: currentSize.id, updatedSize: data },
      {
        onSuccess: () => {
          handleCancelEdit();
        },
      }
    );
  };

  const showEditModal = (size) => {
    setCurrentSize(size);
    setIsModalOpenEdit(true);
  };

  const showDetailModal = (size) => {
    setCurrentSizeDetail(size);
    setIsModalOpenDetail(true);
  };

  if (isSize) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full"
      />
    );
  }

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card" id="orderList">
          <div className="card-header border-0 bg-none">
            <div className="row align-items-center gy-3">
              <div className="col-sm"></div>
              <div className="col-sm-auto">
                <button
                  type="button"
                  className="text-white text-[0.9rem] bg-[#03A9F4] px-4 py-2 rounded-md mb-3"
                  onClick={() => setIsModalOpenAdd(true)}
                >
                  <i className="ri-add-line align-bottom me-1" />
                  Add Size
                </button>
              </div>
            </div>
          </div>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="list form-check-all">
                  {size?.data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
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
                            <div
                              className="text-primary d-inline-block edit-item-btn"
                              onClick={() => showEditModal(item)}
                            >
                              <i className="ri-pencil-fill fs-16" />
                            </div>
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
              onChange={onShowSizeChange}
              current={size.current_page}
              total={size.total}
              pageSize={size.per_page}
              align="center"
            />
          </div>
        </div>
      </div>

      {/* Modal Delete */}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Delete Size"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={isDelete}
          >
            {isDelete && <Spin size="small" className="mr-2" />}
            OK
          </Button>,
        ]}
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
      <Modal
        open={isModalOpenAdd}
        title="Add Size"
        footer={[
          <Button key="back" onClick={handleCancelAdd}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={isAdd}
          >
            {isAdd && <Spin size="small" className="mr-2" />}
            OK
          </Button>,
        ]}
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
      </Modal>

      {/* Modal Edit */}
      <Modal
        open={isModalOpenEdit}
        title="Edit Size"
        footer={[
          <Button key="back" onClick={handleCancelEdit}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit(onEditSubmit)}
            disabled={isUpdate}
          >
            {isUpdate && <Spin size="small" className="mr-2" />}
            OK
          </Button>,
        ]}
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
      </Modal>

      {/* Modal Detail */}
      <Modal
        open={isModalOpenDetail}
        onCancel={() => setIsModalOpenDetail(false)}
        footer={null}
        title="Size Details"
      >
        {currentSizeDetail && (
          <div>
            <div className="mb-3">
              <label className="form-label">Size Name</label>
              <p>{currentSizeDetail.name}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Sizes;
