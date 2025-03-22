import React, { useState } from "react";
import { Modal, Spin, message } from "antd";
import { useForm } from "react-hook-form";
import {
  useDeleteVoucher,
  useVouchers,
  useAddVoucher,
  useUpdateVoucher,
} from "../../../Hook/useVoucher";
import { Link } from "react-router-dom";

const VoucherList = () => {
  const { vouchers, isLoading } = useVouchers();
  const { mutate: addVoucher } = useAddVoucher();
  const { mutate: deleteVoucher } = useDeleteVoucher();
  const { mutate: updateVoucher } = useUpdateVoucher();

  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState(null);
  const [voucherToUpdate, setVoucherToUpdate] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showConfirmDelete = (id) => {
    setVoucherToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setVoucherToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (voucherToDelete && !isDeleting) {
      setIsDeleting(true);
      deleteVoucher(voucherToDelete, {
        onSuccess: () => {
          if (isConfirmDeleteOpen) {
            handleCancelDelete();
          }
          setIsDeleting(false);
        },
        onError: () => {
          handleCancelDelete();
          setIsDeleting(false);
        },
      });
    }
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
    reset();
  };

  const handleCancelUpdate = () => {
    setIsModalOpenUpdate(false);
    setVoucherToUpdate(null);
    reset();
  };

  const handleEdit = (voucher) => {
    setVoucherToUpdate(voucher);
    reset(voucher);
    setIsModalOpenUpdate(true);
  };

  const handleAdd = () => {
    setVoucherToUpdate(null);
    reset();
    setIsModalOpenAdd(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setIsSubmitting(true);
    addVoucher(data, {
      onSuccess: () => {
        reset();
        handleCancelAdd();
        setIsSubmitting(false);
      },
      onError: (error) => {
        console.error("Error adding voucher:", error.response.data);
        setIsSubmitting(false);
      },
    });
  };

  const onUpdate = (data) => {
    setIsSubmitting(true);
    updateVoucher(
      { id: voucherToUpdate.id, ...data },
      {
        onSuccess: () => {
          reset();
          handleCancelUpdate();
          setIsSubmitting(false);
        },
        onError: (error) => {
          console.error("Error updating voucher:", error.response.data);
          setIsSubmitting(false);
        },
      }
    );
  };

  const handleOkAdd = () => {
    if (!isSubmitting) {
      handleSubmit(onSubmit)();
    }
  };

  const handleOkUpdate = () => {
    if (!isSubmitting) {
      handleSubmit(onUpdate)();
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
                    <th>Min Money</th>
                    <th>Max Money</th>
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
                          <li className="list-inline-item">
                            <div
                              className="text-primary d-inline-block edit-item-btn"
                              onClick={() => handleEdit(item)}
                            >
                              <i className="ri-pencil-fill fs-16" />
                            </div>
                          </li>
                          <li className="list-inline-item">
                            <div
                              className="text-danger d-inline-block remove-item-btn"
                              onClick={() => showConfirmDelete(item.id)}
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
      <Modal
        title="Xác nhận xóa voucher"
        open={isConfirmDeleteOpen}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Xóa"
        cancelText="Hủy"
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
        onOk={handleOkAdd}
        onCancel={handleCancelAdd}
        title="Add Voucher"
      >
        <form id="voucherForm">
          <div className="mb-3">
            <label className="form-label">Voucher Code</label>
            <input
              type="text"
              className="form-control"
              {...register("code", { required: true })}
            />
            {errors.code && (
              <span className="text-red-500">Code is required.</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Discount</label>
            <input
              type="number"
              className="form-control"
              {...register("discount", { required: true })}
            />
            {errors.discount && (
              <span className="text-red-500">Discount is required.</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              {...register("start_date", { required: true })}
            />
            {errors.start_date && (
              <span className="text-red-500">Start date is required.</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              {...register("end_date", { required: true })}
            />
            {errors.end_date && (
              <span className="text-red-500">End date is required.</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Min Money</label>
            <input
              type="number"
              className="form-control"
              {...register("min_money", { required: true })}
            />
            {errors.min_money && (
              <span className="text-red-500">Min Money is required.</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Max Money</label>
            <input
              type="number"
              className="form-control"
              {...register("max_money", { required: true })}
            />
            {errors.max_money && (
              <span className="text-red-500">Max Money is required.</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              {...register("quantity", { required: true })}
            />
            {errors.quantity && (
              <span className="text-red-500">Quantity is required.</span>
            )}
          </div>
        </form>
      </Modal>

      {/* Modal Update */}
      <Modal
        open={isModalOpenUpdate}
        onOk={handleOkUpdate}
        onCancel={handleCancelUpdate}
        title="Update Voucher"
      >
        <form id="voucherFormUpdate">
          <div className="mb-3">
            <label className="form-label">Voucher Code</label>
            <input
              type="text"
              className="form-control"
              defaultValue={voucherToUpdate?.code}
              {...register("code", { required: true })}
            />
            {errors.code && (
              <span className="text-red-500">Code is required.</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Discount</label>
            <input
              type="number"
              className="form-control"
              defaultValue={voucherToUpdate?.discount}
              {...register("discount", { required: true })}
            />
            {errors.discount && (
              <span className="text-red-500">Discount is required.</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              defaultValue={voucherToUpdate?.start_date}
              {...register("start_date", { required: true })}
            />
            {errors.start_date && (
              <span className="text-red-500">Start date is required.</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              defaultValue={voucherToUpdate?.end_date}
              {...register("end_date", { required: true })}
            />
            {errors.end_date && (
              <span className="text-red-500">End date is required.</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Min Money</label>
            <input
              type="number"
              className="form-control"
              defaultValue={voucherToUpdate?.min_money}
              {...register("min_money", { required: true })}
            />
            {errors.min_money && (
              <span className="text-red-500">Min Money is required.</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Max Money</label>
            <input
              type="number"
              className="form-control"
              defaultValue={voucherToUpdate?.max_money}
              {...register("max_money", { required: true })}
            />
            {errors.max_money && (
              <span className="text-red-500">Max Money is required.</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              defaultValue={voucherToUpdate?.quantity}
              {...register("quantity", { required: true })}
            />
            {errors.quantity && (
              <span className="text-red-500">Quantity is required.</span>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VoucherList;
