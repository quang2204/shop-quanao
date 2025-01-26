import React, { useState } from "react";
const Customers = () => {
  const [block, useBlock] = useState(false);
  return (
    <div className="row px-4">
      <div className="col-lg-12">
        <div className="card" id="customerList">
          <div className="card-header border-bottom-dashed">
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
                  <button
                    type="button"
                    className="px-3 py-2 rounded-md btn-info"
                  >
                    <i className="ri-file-download-line align-bottom me-1" />
                    Import
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
                    <div className="col-sm-4">
                      <div className="">
                        <input
                          type="text"
                          className="form-control"
                          id="datepicker-range"
                          data-provider="flatpickr"
                          data-date-format="d M, Y"
                          data-range-date="true"
                          placeholder="Select date"
                        />
                      </div>
                    </div>
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
                          className="py-2 bg-[#405189] rounded-md btn-primary w-100"
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
                            defaultValue="option"
                          />
                        </div>
                      </th>
                      <th className="sort" data-sort="customer_name">
                        Customer
                      </th>
                      <th className="sort" data-sort="email">
                        Email
                      </th>
                      <th className="sort" data-sort="phone">
                        Phone
                      </th>
                      <th className="sort" data-sort="date">
                        Joining Date
                      </th>
                      <th className="sort" data-sort="status">
                        Status
                      </th>
                      <th className="sort" data-sort="action">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all">
                    <tr>
                      <th scope="row">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="chk_child"
                            defaultValue="option1"
                          />
                        </div>
                      </th>
                      <td className="id" style={{ display: "none" }}>
                        <a
                          href="javascript:void(0);"
                          className="fw-medium link-primary"
                        >
                          #VZ2101
                        </a>
                      </td>
                      <td className="customer_name">Mary Cousar</td>
                      <td className="email">marycousar@velzon.com</td>
                      <td className="phone">580-464-4694</td>
                      <td className="date">06 Apr, 2021</td>
                      <td className="status">
                        <span className="badge bg-success-subtle text-success text-uppercase">
                          Active
                        </span>
                      </td>
                      <td>
                        <ul className="list-inline hstack gap-2 mb-0">
                          <li
                            className="list-inline-item edit"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                            title="Edit"
                          >
                            <a
                              href="#showModal"
                              data-bs-toggle="modal"
                              className="text-primary d-inline-block edit-item-btn"
                            >
                              <i className="ri-pencil-fill fs-16" />
                            </a>
                          </li>
                          <li
                            className="list-inline-item"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                            title="Remove"
                          >
                            <a
                              className="text-danger d-inline-block remove-item-btn"
                              data-bs-toggle="modal"
                              href="#deleteRecordModal"
                            >
                              <i className="ri-delete-bin-5-fill fs-16" />
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
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
              <div className="d-flex justify-content-end">
                <div className="pagination-wrap hstack gap-2">
                  <a className="page-item pagination-prev disabled" href="#">
                    Previous
                  </a>
                  <ul className="pagination listjs-pagination mb-0" />
                  <a className="page-item pagination-next" href="#">
                    Next
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`modal fade show-admin ${block ? "block opacity-100" : ""} `}
              style={{ background: "rgba(0, 0, 0, 0.5)" }}
            >
              <div
                className="modal-dialog modal-dialog-centered "
                style={{ transform: "none" }}
              >
                <div className="modal-content">
                  <div className="modal-header bg-light p-3">
                    <h5 className="modal-title" id="exampleModalLabel" />
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => useBlock(false)}
                    />
                  </div>
                  <form className="tablelist-form" autoComplete="off">
                    <div className="modal-body">
                      <input type="hidden" id="id-field" />
                      <div
                        className="mb-3"
                        id="modal-id"
                        style={{ display: "none" }}
                      >
                        <label htmlFor="id-field1" className="form-label">
                          ID
                        </label>
                        <input
                          type="text"
                          id="id-field1"
                          className="form-control"
                          placeholder="ID"
                          readOnly=""
                        />
                      </div>
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
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please enter a customer name.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email-field" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email-field"
                          className="form-control"
                          placeholder="Enter email"
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please enter an email.
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
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please enter a phone.
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
                          data-provider="flatpickr"
                          data-date-format="d M, Y"
                          required=""
                          placeholder="Select date"
                        />
                        <div className="invalid-feedback">
                          Please select a date.
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
                        {/* <button type="button" class="btn btn-success" id="edit-btn">Update</button> */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Modal */}
            <div
              className="modal fade zoomIn"
              id="deleteRecordModal"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      id="deleteRecord-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <div className="mt-2 text-center">
                      <lord-icon
                        src="https://cdn.lordicon.com/gsqxdxog.json"
                        trigger="loop"
                        colors="primary:#f7b84b,secondary:#f06548"
                        style={{ width: 100, height: 100 }}
                      />
                      <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                        <h4>Are you sure ?</h4>
                        <p className="text-muted mx-4 mb-0">
                          Are you sure you want to remove this record ?
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                      <button
                        type="button"
                        className="btn w-sm btn-light"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn w-sm btn-danger"
                        id="delete-record"
                      >
                        Yes, Delete It!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end modal */}
          </div>
        </div>
      </div>
      {/*end col*/}
    </div>
  );
};

export default Customers;
