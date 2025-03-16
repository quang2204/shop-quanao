import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Spin } from "antd";
import { useColors, useAddColor, useDeleteColor, useUpdateColor } from "../../../Hook/useColor";
import { useForm } from "react-hook-form";

const ColorList = () => {
  const { colors, isLoading } = useColors();
  const { mutate: addColor } = useAddColor();
  const { mutate: deleteColor } = useDeleteColor();
  const { mutate: updateColor } = useUpdateColor();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [colorToUpdate, setColorToUpdate] = useState(null);
  const [colorToDetail, setColorToDetail] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };
  const handleCancelUpdate = () => {
    setIsModalOpenUpdate(false);
  };
  const handleCancelDetail = () => {
    setIsModalOpenDetail(false);
  };
  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };
  const handleOkUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    addColor(data, {
      onSuccess: () => {
        reset();
        handleOkAdd();
      },
    });
  };

  const onUpdate = (data) => {
    updateColor({ id: colorToUpdate.id, ...data }, {
      onSuccess: () => {
        reset();
        handleOkUpdate();
      },
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'đây chỉ là xóa mềm , bạn có muốn xóa color này?',
      onOk: () => {
        deleteColor(id);
      },
    });
  };

  const handleEdit = (color) => {
    setColorToUpdate(color);
    setIsModalOpenUpdate(true);
  };

  const handleDetail = (color) => {
    setColorToDetail(color);
    setIsModalOpenDetail(true);
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
            <div className="row align-items-center gy-3">
              <div className="col-sm">
                <h5 className="card-title mb-0 fw-medium">Order History</h5>
              </div>
              <div className="col-sm-auto">
                <div className="d-flex gap-1 flex-wrap">
                  <button
                    type="button"
                    className="px-3 py-2 rounded-md btn-success add-btn"
                    onClick={() => setIsModalOpenAdd(true)}
                  >
                    <i className="ri-add-line align-bottom me-1" />
                    Add Color
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body pt-0">
            <div>
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
                    {colors?.data?.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className="id">
                          <p className="fw-medium">{item.name}</p>
                        </td>
                        <td className="customer_name" style={{ color: item.is_active ? "green" : "red" }}>
                          {item.is_active ? "Active" : "Block"}
                        </td>
                        <td>
                          <ul className="list-inline hstack gap-2 mb-0">
                            <li className="list-inline-item">
                              <div className="text-primary d-inline-block" onClick={() => handleDetail(item)}>
                                <i className="ri-eye-fill fs-16" />
                              </div>
                            </li>
                            <li className="list-inline-item edit">
                              <div className="text-primary d-inline-block edit-item-btn" onClick={() => handleEdit(item)}>
                                <i className="ri-pencil-fill fs-16" />
                              </div>
                            </li>
                            <li className="list-inline-item">
                              <div className="text-danger d-inline-block remove-item-btn" onClick={() => handleDelete(item.id)}>
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
      </div>
      {/* Modal Add */}
      <Modal open={isModalOpenAdd} onOk={handleSubmit(onSubmit)} onCancel={handleCancelAdd} title="Add Color">
        <form>
          <div className="mb-3">
            <label htmlFor="color-name" className="form-label">Color Name</label>
            <input type="text" id="color-name" className="form-control" placeholder="Enter color name" {...register("name", { required: true })} />
            <div className="text-red-500 mt-1">{errors.name && "Please enter a color name."}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="color-status" className="form-label">Is Active</label>
            <select id="color-status" className="form-select" {...register("is_active", { required: true })}>
              <option value={true}>Active</option>
              <option value={false}>Block</option>
            </select>
          </div>
        </form>
      </Modal>
      {/* Modal Update */}
      <Modal open={isModalOpenUpdate} onOk={handleSubmit(onUpdate)} onCancel={handleCancelUpdate} title="Update Color">
        <form>
          <div className="mb-3">
            <label htmlFor="update-color-name" className="form-label">Color Name</label>
            <input type="text" id="update-color-name" className="form-control" placeholder="Enter color name" defaultValue={colorToUpdate?.name} {...register("name", { required: true })} />
            <div className="text-red-500 mt-1">{errors.name && "Please enter a color name."}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="update-color-status" className="form-label">Is Active</label>
            <select id="update-color-status" className="form-select" defaultValue={colorToUpdate?.is_active} {...register("is_active", { required: true })}>
              <option value={true}>Active</option>
              <option value={false}>Block</option>
            </select>
          </div>
        </form>
      </Modal>
      {/* Modal Detail */}
      <Modal open={isModalOpenDetail} onCancel={handleCancelDetail} title="Color Detail" footer={null}>
        {colorToDetail ? (
          <div>
            <p><strong>Name:</strong> {colorToDetail.name}</p>
            <p><strong>Status:</strong> {colorToDetail.is_active ? "Active" : "Block"}</p>
          </div>
        ) : (
          <Spin size="large" className="h-[50vh] mt-[100px] flex items-center justify-center w-full" />
        )}
      </Modal>
    </div>
  );
};

export default ColorList;