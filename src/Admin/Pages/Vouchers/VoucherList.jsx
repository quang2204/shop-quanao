import React, { useState } from "react";
import { Modal, Spin } from "antd";
import { useForm } from "react-hook-form";
import { useDeleteVoucher, useVouchers, useAddVoucher, useUpdateVoucher } from "../../../Hook/useVoucher";
import { Link } from "react-router-dom";

const VoucherList = () => {
  const { vouchers, isLoading } = useVouchers();
  const { mutate: addVoucher } = useAddVoucher();
  const { mutate: deleteVoucher } = useDeleteVoucher();
  const { mutate: updateVoucher } = useUpdateVoucher();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [voucherToUpdate, setVoucherToUpdate] = useState(null);

  const showModal = (id) => {
    setVoucherToUpdate(id);
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

  const { mutate } = useDeleteVoucher();
  const handleOk = () => {
    mutate(voucherToUpdate);
    setIsModalOpen(false);
    setVoucherToUpdate(null);
  };

  const handleOkAdd = () => {
    handleSubmit(onSubmit)();
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
    console.log('Data to be sent:', data); 
    addVoucher(data, {
      onSuccess: () => {
        reset();
        handleOkAdd();
      },
      onError: (error) => {
        console.error('Error adding voucher:', error.response.data); 
      },
    });
  };

  const onUpdate = (data) => {
    updateVoucher({ id: voucherToUpdate.id, ...data }, {
      onSuccess: () => {
        reset();
        handleOkUpdate();
      },
      onError: (error) => {
        console.error('Error updating voucher:', error.response.data); 
      },
    });
  };

  if (isLoading) {
    return <Spin size="large" className="h-[50vh] mt-[100px] flex items-center justify-center w-full" />;
  }

  return (
    <div className="row mx-2">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header border-0 bg-none">
            <div className="row align-items-center gy-3">
              <div className="col-sm">
                <h5 className="card-title mb-0 fw-medium">Voucher List</h5>
              </div>
              <div className="col-sm-auto">
                <button
                  type="button"
                  className="px-3 py-2 rounded-md btn-success"
                  onClick={() => setIsModalOpenAdd(true)}
                >
                  <i className="ri-add-line align-bottom me-1" /> Add Voucher
                </button>
              </div>
            </div>
          </div>
          <div className="card-body pt-0">
            <div className="table-responsive">
              <table className="table table-nowrap align-middle">
                <thead className="text-muted table-light">
                  <tr className="text-uppercase">
                    <th>#</th>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Min Monney</th>
                    <th>Max Monney</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vouchers?.data?.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.code}</td>
                      <td>{item.discount}</td>
                      <td>{item.start_date}</td>
                      <td>{item.end_date}</td>
                      <td>{item.min_money}</td>
                      <td>{item.max_money}</td>
                      <td>
                        <ul className="list-inline hstack gap-2 mb-0">
                          <li className="list-inline-item">
                            <Link
                              to={`/admin/vouchers/${item.id}`}
                              className="text-primary d-inline-block"
                            >
                              <i className="ri-eye-fill fs-16" />
                            </Link>
                          </li>
                          <li className="list-inline-item edit">
                            <div className="text-primary d-inline-block edit-item-btn" onClick={() => handleEdit(item)}>
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


      {/* Modal Add */}
      <Modal open={isModalOpenAdd} onOk={handleOkAdd} onCancel={handleCancelAdd} title="Add Voucher">
  <form id="voucherForm">
    <div className="mb-3">
      <label className="form-label">Voucher Code</label>
      <input type="text" className="form-control" {...register("code", { required: true })} />
      {errors.code && <span className="text-red-500">Code is required.</span>}
    </div>
    <div className="mb-3">
      <label className="form-label">Discount</label>
      <input type="number" className="form-control" {...register("discount", { required: true })} />
      {errors.discount && <span className="text-red-500">Discount is required.</span>}
    </div>
    <div className="mb-3">
      <label className="form-label">Start Date</label>
      <input type="date" className="form-control" {...register("start_date", { required: true })} />
      {errors.start_date && <span className="text-red-500">Start date is required.</span>}
    </div>
    <div className="mb-3">
      <label className="form-label">End Date</label>
      <input type="date" className="form-control" {...register("end_date", { required: true })} />
      {errors.end_date && <span className="text-red-500">End date is required.</span>}
    </div>
    <div className="mb-3">
      <label className="form-label">Min Money</label>
      <input type="number" className="form-control" {...register("min_money", { required: true })} />
      {errors.min_money && <span className="text-red-500">Min Money is required.</span>}
    </div>
    <div className="mb-3">
      <label className="form-label">Max Money</label>
      <input type="number" className="form-control" {...register("max_money", { required: true })} />
      {errors.max_money && <span className="text-red-500">Max Money is required.</span>}
    </div>
    <div className="mb-3">
      <label className="form-label">Quantity</label>
      <input type="number" className="form-control" {...register("quantity", { required: true })} />
      {errors.quantity && <span className="text-red-500">Quantity is required.</span>}
    </div>
  </form>
</Modal>
    </div>
  );
};

export default VoucherList;