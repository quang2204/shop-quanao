import React, { useState } from "react";
import { useBanner, useDeleteBanner, useCreateBanner, useUpdateBanner } from "../../../Hook/useBanner";
import { Link } from "react-router-dom";
import { Modal, Spin, Pagination, message } from "antd";
import { useForm } from "react-hook-form";

const Banners = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { banner, isBanner } = useBanner(currentPage);
  const { mutate: createBanner } = useCreateBanner();
  const { mutate: updateBanner } = useUpdateBanner();
  const { mutate: deleteBanner } = useDeleteBanner();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [currentBannerDetail, setCurrentBannerDetail] = useState(null);
  const [currentBanner, setCurrentBanner] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const showModal = (id) => {
    setIdDelete(id);
    setIsModalOpen(true);
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
    setCurrentBanner(null);
    reset();
  };

  const handleOk = () => {
    deleteBanner(idDelete, {
      onSuccess: () => {
        setIsModalOpen(false); // Đóng modal
        setIdDelete(""); // Xóa ID đã chọn
        message.success("Banner deleted successfully!"); // Hiển thị thông báo thành công
      },
      onError: (error) => {
        message.error("Failed to delete banner!"); // Hiển thị thông báo lỗi
        console.error("Delete error:", error);
      },
    });
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]); // Lấy file từ input
    formData.append("is_active", data.is_active);

    createBanner(formData, {
      onSuccess: () => {
        reset();
        handleCancelAdd();
      },
    });
  };

  const showEditModal = (banner) => {
    setCurrentBanner(banner);
    setIsModalOpenEdit(true);
  };


  const onEditSubmit = (data) => {
    const formData = new FormData();
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]); // Lấy file từ input nếu có
    }
    formData.append("is_active", data.is_active);

    updateBanner(
      { id: currentBanner.id, updatedBanner: formData },
      {
        onSuccess: () => {
          handleCancelEdit();
        },
      }
    );
  };
    const showDetailModal = (banner) => {
    setCurrentBannerDetail(banner);
    setIsModalOpenDetail(true);
  };

  if (isBanner) {
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
            <div className="row align-items-center gy-3">
              <div className="col-sm">
                <h5 className="card-title mb-0 fw-medium">Banner Management</h5>
              </div>
              <div className="col-sm-auto">
                <button
                  type="button"
                  className="px-3 py-2 rounded-md btn-success add-btn"
                  onClick={() => setIsModalOpenAdd(true)}
                >
                  <i className="ri-add-line align-bottom me-1" />
                  Add Banner
                </button>
              </div>
            </div>
          </div>
          <div className="card-body pt-0">
            <div className="table-responsive table-card mb-1">
              <table className="table table-nowrap align-middle" id="orderTable">
                <thead className="text-muted table-light">
                  <tr className="text-uppercase">
                    <th>#</th>
                    <th>Image</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="list form-check-all">
                  {banner?.data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{(currentPage - 1) * banner.per_page + index + 1}</td>
                      <td>
                        <img
                          src={item.image}
                          alt="Banner"
                          className="img-fluid"
                          style={{ maxHeight: "100px" }}
                        />
                      </td>
                      <td style={{ color: item.is_active ? "green" : "red" }}>
                        {item.is_active ? "Active" : "Block"}
                      </td>
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
                              onClick={() => showModal(item.id)}
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
            </div>
            <Pagination
              current={currentPage}
              onChange={(page) => setCurrentPage(page)}
              total={banner?.total}
              pageSize={banner?.per_page}
            />
          </div>
        </div>
      </div>

      {/* Modal Add */}
      <Modal
        open={isModalOpenAdd}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancelAdd}
        title="Add Banner"
      >
        <form>
          <div className="mb-3">
            <label className="form-label">Upload Banner Image</label>
            <input
              type="file"
              className="form-control"
              {...register("image", { required: true })}
            />
            {errors.image && <p className="text-danger">Image is required</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Active</label>
            <select
              className="form-select"
              {...register("is_active", { required: true })}
            >
              <option value={true}>Active</option>
              <option value={false}>Block</option>
            </select>
            {errors.is_active && (
              <p className="text-danger">Active status is required</p>
            )}
          </div>
        </form>
      </Modal>

      {/* Modal Edit */}
      <Modal
        open={isModalOpenEdit}
        onOk={handleSubmit(onEditSubmit)}
        onCancel={handleCancelEdit}
        title="Edit Banner"
      >
        <form>
          <div className="mb-3">
            <label className="form-label">Current Banner Image</label>
            <img
              src={currentBanner?.image}
              alt="Current Banner"
              className="img-fluid mb-3"
              style={{ maxHeight: "200px" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Upload New Banner Image</label>
            <input
              type="file"
              className="form-control"
              {...register("image")}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Active</label>
            <select
              className="form-select"
              defaultValue={currentBanner?.is_active}
              {...register("is_active", { required: true })}
            >
              <option value={true}>Active</option>
              <option value={false}>Block</option>
            </select>
            {errors.is_active && (
              <p className="text-danger">Active status is required</p>
            )}
          </div>
        </form>
      </Modal>
            <Modal
        open={isModalOpenDetail}
        onCancel={() => setIsModalOpenDetail(false)}
        footer={null}
        title="Banner Details"
      >
        {currentBannerDetail && (
          <div>
            <div className="mb-3">
              <label className="form-label">Banner Image</label>
              <img
                src={currentBannerDetail.image}
                alt="Banner"
                className="img-fluid mb-3"
                style={{ maxHeight: "200px" }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Active Status</label>
              <p style={{ color: currentBannerDetail.is_active ? "green" : "red" }}>
                {currentBannerDetail.is_active ? "Active" : "Block"}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Delete */}
      <Modal
        open={isModalOpen}
        onOk={handleOk} // Gọi hàm handleOk khi nhấn "OK"
        onCancel={handleCancel} // Đóng modal khi nhấn "Cancel"
        title="Delete Banner"
      >
        <h4>Are you sure?</h4>
        <p>Do you want to delete this banner permanently?</p>
      </Modal>
    </div>
  );
};

export default Banners;
