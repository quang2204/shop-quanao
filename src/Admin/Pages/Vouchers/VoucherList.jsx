import React, { useEffect, useState } from "react";
import { Modal, Pagination, Spin, message } from "antd";
import { useForm } from "react-hook-form";
import {
  useDeleteVoucher,
  useVouchers,
  useAddVoucher,
  useUpdateVoucher,
} from "../../../Hook/useVoucher";
import { FormatDate, FormatPrice } from "../../../Format";
import { useLocation, useNavigate } from "react-router-dom";
const VoucherList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page")) || 1;
  const { vouchers, isLoading } = useVouchers(page);
  const { mutate: addVoucher } = useAddVoucher();
  const { mutate: deleteVoucher } = useDeleteVoucher();
  const { mutate: updateVoucher } = useUpdateVoucher();
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState(null);
  const [voucherToUpdate, setVoucherToUpdate] = useState("");
  const [voucherToDetail, setVoucherToDetail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    reset({
      code: voucherToUpdate?.code,
      discount: voucherToUpdate?.discount,
      start_date: voucherToUpdate?.start_date,
      end_date: voucherToUpdate?.end_date,
      min_money: voucherToUpdate?.min_money,
      max_money: voucherToUpdate?.max_money,
      quantity: voucherToUpdate?.quantity,
      is_active: voucherToUpdate?.is_active,
    });
  }, [voucherToUpdate]);
  const showConfirmDelete = (id) => {
    setVoucherToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setVoucherToDelete(null);
  };
  const handleCancelDetail = () => {
    setIsDetail(false);
    setVoucherToDetail("");
  };
  const handleOkDetail = (value) => {
    setIsDetail(true);
    setVoucherToDetail(value);
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
  };

  const handleCancelUpdate = () => {
    setIsModalOpenUpdate(false);
    setVoucherToUpdate(null);
  };

  const handleEdit = (voucher) => {
    setVoucherToUpdate(voucher);
    setIsModalOpenUpdate(true);
  };

  const handleAdd = () => {
    setVoucherToUpdate(null);
    setIsModalOpenAdd(true);
  };
  const onShowSizeChange = (current, pageSize) => {
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
    const datares = {
      code: data?.code,
      discount: data?.discount,
      start_date: data?.start_date,
      end_date: data?.end_date,
      min_money: data?.min_money,
      max_money: data?.max_money,
      quantity: data?.quantity,
      is_active:
        typeof data?.is_active === "boolean"
          ? data.is_active
          : data?.is_active?.toString().toLowerCase() === "true",
    };
    setIsSubmitting(true);
    updateVoucher(
      { id: voucherToUpdate.id, ...datares },
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
            <div className="row align-items-center gy-3 mb-1">
              <div className="col-sm">
                <form>
                  <div className="row g-3">
                    <div className="col-xxl-5 col-sm-5">
                      <div className="search-box">
                        <input
                          type="text"
                          className="form-control search"
                          placeholder="Search for Categories "
                        />
                        <i className="ri-search-line search-icon" />
                      </div>
                    </div>
                  </div>
                  {/*end row*/}
                </form>
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
                    <th>Is_active</th>
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
                      <td>{<FormatPrice price={item.min_money} />}</td>
                      <td>{<FormatPrice price={item.max_money} />}</td>
                      <td
                        className="customer_name"
                        style={{
                          color: item.is_active ? "green" : "red",
                        }}
                      >
                        {item.is_active ? "Active" : "Block"}
                      </td>
                      <td>
                        <ul className="list-inline hstack gap-2 mb-0">
                          <li className="list-inline-item">
                            <div
                              className="text-primary d-inline-block"
                              onClick={() => handleOkDetail(item)}
                            >
                              <i className="ri-eye-fill fs-16" />
                            </div>
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
          <Pagination
            showSizeChanger
            onChange={onShowSizeChange}
            current={vouchers.current_page}
            total={vouchers.total}
            pageSize={vouchers.per_page}
            align="center"
          />
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
          <div className="mb-3">
            <label htmlFor="email-field" className="form-label">
              Is_Active
            </label>
            <select
              id="email-field"
              className="form-select"
              aria-label="Default select example"
              {...register("is_active", { required: true })}
            >
              <option value={true}>Active</option>
              <option value={false}>Block</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* detail */}
      <Modal
        open={isDetail}
        onOk={handleOkDetail}
        onCancel={handleCancelDetail}
        title="Detail Voucher"
      >
        <form id="voucherForm">
          <div className="mb-3">
            <label className="form-label">
              Voucher Code : {voucherToDetail.code}
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Discount : {<FormatPrice price={voucherToDetail.discount} />}
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Start Date : {<FormatDate date={voucherToDetail.start_date} />}{" "}
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              End Date : {<FormatDate date={voucherToDetail.end_date} />}{" "}
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Min Money : {<FormatPrice price={voucherToDetail.max_money} />}
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Max Money : {<FormatPrice price={voucherToDetail.min_money} />}
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Quantity : {voucherToDetail.quantity}
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="email-field" className="form-label">
              Is_Active :{" "}
              {voucherToDetail.is_active === true ? "Active" : "Block"}
            </label>
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
          <div className="mb-3">
            <label htmlFor="email-field" className="form-label">
              Is_Active
            </label>
            <select
              id="email-field"
              className="form-select"
              aria-label="Default select example"
              {...register("is_active", { required: true })}
            >
              <option value={true}>Active</option>
              <option value={false}>Block</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VoucherList;
