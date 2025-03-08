import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Spin } from "antd";
import { useCategory, useDeleteCategory } from "../../../Hook/useCategory";

const Categories = () => {
  const { category, isCategory } = useCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const showModal = (id) => {
    setIdDelete(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { mutate } = useDeleteCategory();
  const handleOk = () => {
    mutate(idDelete);
    setIsModalOpen(false);
    setIdDelete("");
  };
  if (isCategory) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
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
                    className="text-white text-[0.9rem] bg-[#03A9F4] px-4 py-2 rounded-md "
                  >
                    <i className="ri-file-download-line align-bottom me-1" />{" "}
                    Import
                  </button>
                  <button
                    className="btn btn-soft-danger"
                    id="remove-actions"
                    onclick="deleteMultiple()"
                  >
                    <i className="ri-delete-bin-2-line" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body border border-dashed border-end-0 border-start-0">
            <form>
              <div className="row g-3">
                <div className="col-xxl-5 col-sm-5">
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control search"
                      placeholder="Search for order ID, customer, order status or something..."
                    />
                    <i className="ri-search-line search-icon" />
                  </div>
                </div>
              </div>
              {/*end row*/}
            </form>
          </div>
          <div className="card-body pt-0">
            <div>
              <div className="table-responsive table-card mb-1">
                <table
                  className="table table-nowrap align-middle"
                  id="orderTable"
                >
                  <thead className="text-muted table-light">
                    <tr className="text-uppercase">
                      <th className="sort" dangerouslySetInnerHTMLata-sort="id">
                        #
                      </th>
                      <th className="sort" data-sort="id">
                        Name
                      </th>
                      <th className="sort" data-sort="customer_name">
                        Active
                      </th>
                      <th className="sort" data-sort="city">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all">
                    {category.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className="id">
                          <p className="fw-medium ">{item.name}</p>
                        </td>
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
                            <li
                              className="list-inline-item"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title="View"
                            >
                              <Link
                                to={`/admin/order_detail/6730c5042009824f08db8eab`}
                                className="text-primary d-inline-block"
                              >
                                <i className="ri-eye-fill fs-16" />
                              </Link>
                            </li>
                            <li className="list-inline-item edit">
                              <div className="text-primary d-inline-block edit-item-btn">
                                <i className="ri-pencil-fill fs-16" />
                              </div>
                            </li>
                            <li className="list-inline-item">
                              <div
                                class="text-danger d-inline-block remove-item-btn"
                                onClick={() => showModal(item.id)}
                              >
                                <i class="ri-delete-bin-5-fill fs-16"></i>
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
              className="modal fade"
              id="showModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header bg-light p-3">
                    <h5 className="modal-title" id="exampleModalLabel">
                      &nbsp;
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      id="close-modal"
                    />
                  </div>
                  <form className="tablelist-form" autoComplete="off">
                    <div className="modal-body">
                      <input type="hidden" id="id-field" />
                      <div className="mb-3" id="modal-id">
                        <label htmlFor="orderId" className="form-label">
                          ID
                        </label>
                        <input
                          type="text"
                          id="orderId"
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
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="productname-field"
                          className="form-label"
                        >
                          Product
                        </label>
                        <select
                          className="form-control"
                          data-trigger=""
                          name="productname-field"
                          id="productname-field"
                          required=""
                        >
                          <option value="">Product</option>
                          <option value="Puma Tshirt">Puma Tshirt</option>
                          <option value="Adidas Sneakers">
                            Adidas Sneakers
                          </option>
                          <option value="350 ml Glass Grocery Container">
                            350 ml Glass Grocery Container
                          </option>
                          <option value="American egale outfitters Shirt">
                            American egale outfitters Shirt
                          </option>
                          <option value="Galaxy Watch4">Galaxy Watch4</option>
                          <option value="Apple iPhone 12">
                            Apple iPhone 12
                          </option>
                          <option value="Funky Prints T-shirt">
                            Funky Prints T-shirt
                          </option>
                          <option value="USB Flash Drive Personalized with 3D Print">
                            USB Flash Drive Personalized with 3D Print
                          </option>
                          <option value="Oxford Button-Down Shirt">
                            Oxford Button-Down Shirt
                          </option>
                          <option value="Classic Short Sleeve Shirt">
                            Classic Short Sleeve Shirt
                          </option>
                          <option value="Half Sleeve T-Shirts (Blue)">
                            Half Sleeve T-Shirts (Blue)
                          </option>
                          <option value="Noise Evolve Smartwatch">
                            Noise Evolve Smartwatch
                          </option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="date-field" className="form-label">
                          Order Date
                        </label>
                        <input
                          type="date"
                          id="date-field"
                          className="form-control"
                          data-provider="flatpickr"
                          required=""
                          data-date-format="d M, Y"
                          data-enable-time=""
                          placeholder="Select date"
                        />
                      </div>
                      <div className="row gy-4 mb-3">
                        <div className="col-md-6">
                          <div>
                            <label
                              htmlFor="amount-field"
                              className="form-label"
                            >
                              Amount
                            </label>
                            <input
                              type="text"
                              id="amount-field"
                              className="form-control"
                              placeholder="Total amount"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div>
                            <label
                              htmlFor="payment-field"
                              className="form-label"
                            >
                              Payment Method
                            </label>
                            <select
                              className="form-control"
                              data-trigger=""
                              name="payment-method"
                              required=""
                              id="payment-field"
                            >
                              <option value="">Payment Method</option>
                              <option value="Mastercard">Mastercard</option>
                              <option value="Visa">Visa</option>
                              <option value="COD">COD</option>
                              <option value="Paypal">Paypal</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="delivered-status"
                          className="form-label"
                        >
                          Delivery Status
                        </label>
                        <select
                          className="form-control"
                          data-trigger=""
                          name="delivered-status"
                          required=""
                          id="delivered-status"
                        >
                          <option value="">Delivery Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Inprogress">Inprogress</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Pickups">Pickups</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Returns">Returns</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="button"
                          className="btn btn-light"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-success"
                          id="add-btn"
                        >
                          Add Order
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
              className="modal fade flip"
              id="deleteOrder"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body p-5 text-center">
                    <lord-icon
                      src="https://cdn.lordicon.com/gsqxdxog.json"
                      trigger="loop"
                      colors="primary:#405189,secondary:#f06548"
                      style={{ width: 90, height: 90 }}
                    />
                    <div className="mt-4 text-center">
                      <h4>You are about to delete a order ?</h4>
                      <p className="text-muted fs-15 mb-4">
                        Deleting your order will remove all of your information
                        from our database.
                      </p>
                      <div className="hstack gap-2 justify-content-center remove">
                        <button
                          className="btn btn-link link-success fw-medium text-decoration-none"
                          id="deleteRecord-close"
                          data-bs-dismiss="modal"
                        >
                          <i className="ri-close-line me-1 align-middle" />{" "}
                          Close
                        </button>
                        <button className="btn btn-danger" id="delete-record">
                          Yes, Delete It
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end modal */}
          </div>
        </div>
      </div>
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
      {/*end col*/}
    </div>
  );
};

export default Categories;
