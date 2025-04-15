import React, { useState } from "react";
import { useQuery } from "react-query";
import { user } from "../../../Apis/Api";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal, Pagination, Spin } from "antd";
import { FormatDate } from "../../../Format";
import { useDeleteUser } from "../../../Hook/useUser";
import { useForm } from "react-hook-form";
const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const page = parseInt(searchParams.get("page")) || 1;
  // const page =
  //   pathname.split("/")[3] === undefined ? 1 : pathname.split("/")[3];
  const onShowSizeChange = (current, pageSize) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", current);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  const showModal = (id) => {
    setIdDelete(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [block, useBlock] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["customers", page],
    queryFn: () => user(page),
  });
  const { mutate } = useDeleteUser();
  const handleOk = () => {
    mutate(idDelete);
    setIsModalOpen(false);
    setIdDelete("");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  if (isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }

  return (
    <div className="row px-4">
      <div className="col-lg-12">
        <div className="card" id="customerList">
          <div className="card-header border-bottom-dashed bg-none">
            <div className="row g-4 align-items-center">
              <div className="col-sm">
                <div>
                  <h5 className="card-title mb-0">Customer List</h5>
                </div>
              </div>
              <div className="col-sm-auto">
                <div className="d-flex flex-wrap align-items-start gap-2">
                  <button className="btn btn-soft-danger" id="remove-actions">
                    <i className="ri-delete-bin-2-line" />
                  </button>
                  <button
                    type="button"
                    className=" px-3 py-2 rounded-md btn-success add-btn"
                    onClick={() => useBlock(true)}
                  >
                    <i className="ri-add-line align-bottom me-1" /> Add Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body border-bottom-dashed border-bottom">
            <form>
              <div className="row g-3">
                <div className="col-xl-6">
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control search"
                      placeholder="Search for customer, email, phone, status or something..."
                    />
                    <i className="ri-search-line search-icon" />
                  </div>
                </div>
                {/*end col*/}
                <div className="col-xl-6">
                  <div className="row g-3">
                    {/*end col*/}
                    <div className="col-sm-4">
                      <div>
                        <select
                          className="form-control"
                          data-plugin="choices"
                          data-choices=""
                          data-choices-search-false=""
                          name="choices-single-default"
                          id="idStatus"
                        >
                          <option value="">Status</option>
                          <option value="all" selected="">
                            All
                          </option>
                          <option value="Active">Active</option>
                          <option value="Block">Block</option>
                        </select>
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-sm-4">
                      <div>
                        <button
                          type="button"
                          className="py-2 bg-[#5671cc] text-white rounded-md btn-primary w-100"
                        >
                          <i className="ri-equalizer-fill me-2 align-bottom" />
                          Filters
                        </button>
                      </div>
                    </div>
                    {/*end col*/}
                  </div>
                </div>
              </div>
              {/*end row*/}
            </form>
          </div>
          <div className="card-body">
            <div>
              <div className="table-responsive table-card mb-1">
                <table className="table align-middle" id="customerTable">
                  <thead className="table-light text-muted">
                    <tr>
                      <th scope="col" style={{ width: 50 }}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkAll"
                          />
                        </div>
                      </th>
                      <th className="sort">Customer</th>
                      <th className="sort">Email</th>
                      <th className="sort">Phone</th>
                      <th className="sort">Joining Date</th>
                      <th className="sort">Status</th>
                      <th className="sort">Role</th>
                      <th className="sort">Action</th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all">
                    {data?.data?.map((item) => (
                      <tr key={item._id}>
                        <th scope="row">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                          </div>
                        </th>
                        <td className="id" style={{ display: "none" }}>
                          <Link to="#" className="fw-medium link-primary">
                            #VZ2101
                          </Link>
                        </td>
                        <td className="customer_name"> {item.name}</td>
                        <td className="email">{item.email}</td>
                        <td className="phone">{item.phone}</td>
                        <td className="date">
                          {FormatDate({ date: item.created_at })}
                        </td>
                        <td className="status">
                          <span
                            className={`badge ${item.is_active === true ? "bg-success-subtle text-success" : "bg-red-500 "}   text-uppercase`}
                          >
                            {item.is_active === true ? "Active" : "Block"}
                          </span>
                        </td>
                        <td className="role">
                          <span
                            className={`text-sm text-uppercase`}
                          >
                            {item.role==0?"User":"Admin"}
                          </span>
                        </td>
                        <td>
                          <ul className="list-inline hstack gap-2 mb-0">
                            <li className="list-inline-item edit">
                              <div
                                className="text-primary d-inline-block edit-item-btn"
                              >
                                <i className="ri-pencil-fill fs-16" />
                              </div>
                            </li>
                            <li
                              className="list-inline-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="Remove"
                            >
                              <button
                                className="text-danger d-inline-block remove-item-btn"
                                onClick={() => showModal(item.id)}
                              >
                                <i className="ri-delete-bin-5-fill fs-16" />
                              </button>
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
                      colors="primary:#121331,secondary:#08a88a"
                      style={{ width: 75, height: 75 }}
                    />
                    <h5 className="mt-2">Sorry! No Result Found</h5>
                    <p className="text-muted mb-0">
                      We've searched more than 150+ customer We did not find any
                      customer for you search.
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-center mb-4">
            <Pagination
              showSizeChanger
              onChange={onShowSizeChange}
              current={data.current_page}
              total={data.total}
              pageSize={data.per_page}
              align="center"
            />
          </div>
            </div>

            <div
              className={`modal fade  ${block ? "block opacity-100" : ""} `}
              style={{ background: "rgba(0, 0, 0, 0.5)" }}
            >
              <div
                className="modal-dialog modal-dialog-centered "
                style={{ transform: "none" }}
              >
                <div className="modal-content">
                  <div className="modal-header bg-light p-3">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Add Customer
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => useBlock(false)}
                    />
                  </div>
                  <form
                    className="tablelist-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="modal-body">
                      <div className="mb-3">
                        <label
                          htmlFor="customername-field"
                          className="form-label"
                        >
                          Customer Name
                        </label>
                        <input
                          type="text"
                          id="customername-field"
                          className="form-control"
                          placeholder="Enter name"
                          {...register("name", { required: true })}
                        />
                        <div className="text-red-500 mt-1">
                          {errors.name && "Please enter a customer name."}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email-field" className="form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          id="email-field"
                          className="form-control"
                          placeholder="Enter email"
                          {...register("email", {
                            required: "Please enter a email.",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                              message: "Please enter a valid email.",
                            },
                          })}
                        />
                        <div className="text-red-500 mt-1">
                          {errors.email && errors.email.message}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone-field" className="form-label">
                          Phone
                        </label>
                        <input
                          type="text"
                          id="phone-field"
                          className="form-control"
                          placeholder="Enter phone no."
                          {...register("phone", {
                            required: "Please enter a phone.",
                            pattern: {
                              value: /^[0-9]{10}$/i,
                              message: "Please enter a valid phone.",
                            },
                          })}
                        />
                        <div className="text-red-500 mt-1">
                          {errors.phone && errors.phone.message}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="date-field" className="form-label">
                          Joining Date
                        </label>
                        <input
                          type="date"
                          id="date-field"
                          className="form-control"
                          placeholder="Select date"
                          {...register("date", { required: true })}
                        />
                        <div className="text-red-500 mt-1">
                          {errors.date && "Please select a date."}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="status-field" className="form-label">
                          Status
                        </label>
                        <select
                          className="form-control"
                          data-choices=""
                          data-choices-search-false=""
                          name="status-field"
                          id="status-field"
                          required=""
                        >
                          <option value="">Status</option>
                          <option value="Active">Active</option>
                          <option value="Block">Block</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="button"
                          className="px-3 py-2 mt-2 rounded-md bg-[#F3F6F9]"
                          onClick={() => useBlock(false)}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-2 mt-2 rounded-md btn-success"
                          id="add-btn"
                        >
                          Add Customer
                        </button>
                        {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Modal */}
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
            {/*end modal */}
          </div>
        </div>
      </div>
      {/*end col*/}
    </div>
  );
};

export default Customers;
