import React, { useState } from "react";
import { useBanner, useDeleteBanner, useCreateBanner, useUpdateBanner } from "../../../Hook/useBanner";
import { Link } from "react-router-dom";
import { Modal, Spin } from "antd";
import { useForm } from "react-hook-form";

const Banners = () => {
  const { banner, isBanner } = useBanner();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);

  const { mutate: createBanner } = useCreateBanner();
  const { mutate: updateBanner } = useUpdateBanner();
  const { mutate: deleteBanner } = useDeleteBanner();

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

  const handleOk = () => {
    deleteBanner(idDelete);
    setIsModalOpen(false);
    setIdDelete("");
  };

  const onSubmit = (data) => {
    createBanner(data, {
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

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
    setCurrentBanner(null);
  };

  const onEditSubmit = (data) => {
    updateBanner(
      { id: currentBanner.id, updatedBanner: data },
      {
        onSuccess: () => {
          handleCancelEdit();
        },
      }
    );
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
                    <th>Name</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="list form-check-all">
                  {banner?.data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td style={{ color: item.is_active ? "green" : "red" }}>
                        {item.is_active ? "Active" : "Block"}
                      </td>
                      <td>
                        <ul className="list-inline hstack gap-2 mb-0">
                          <li className="list-inline-item">
                            <Link
                              to={`/admin/banners/${item.id}`}
                              className="text-primary d-inline-block"
                            >
                              <i className="ri-eye-fill fs-16" />
                            </Link>
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
          </div>
        </div>
      </div>

      {/* Modal Delete */}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h4>Are you sure?</h4>
        <p>Do you want to delete this banner?</p>
      </Modal>

      {/* Modal Add */}
      <Modal
        open={isModalOpenAdd}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancelAdd}
        title="Add Banner"
      >
        <form>
          <div className="mb-3">
            <label className="form-label">Banner Name</label>
            <input
              type="text"
              className="form-control"
              {...register("title", { required: true })}
            />
            {errors.title && <p className="text-danger">Title is required</p>}
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
            <label className="form-label">Banner Name</label>
            <input
              type="text"
              className="form-control"
              defaultValue={currentBanner?.title}
              {...register("title", { required: true })}
            />
            {errors.title && <p className="text-danger">Title is required</p>}
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
    </div>
  );
};

export default Banners;