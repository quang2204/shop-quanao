import { useDeleteProduct, useProduct } from "../../../Hook/useProduct.jsx";
import { Button, Image, Modal, Pagination, Spin, Table } from "antd";
import { FormatDate, FormatDateTime, FormatPrice } from "../../../Format.jsx";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Emptys from "../../Ui/Emty.jsx";
const Products = () => {
  const [id, setId] = useState("");
  const { pages } = useParams();
  const [pageProduct, setPageProduct] = useState(1);
  const { isProducts, products } = useProduct(pageProduct);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const { mutate, isLoading } = useDeleteProduct(() => {
    // setOpen(false);
    setId("");
  });

  const deleteProduct = () => {
    mutate(id);
  };
  const showModal = (id) => {
    setIdDelete(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };
  const handleOk = () => {
    mutate(idDelete);
    setIsModalOpen(false);
  };
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    setPageProduct(current);
  };
  if (isProducts) {
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
        {products?.data.data.length > 0 ? (
          <div className="card" id="orderList">
            <div className="card-header border-0 bg-none">
              <div className="row align-items-center gy-3">
                <div className="col-sm">
                  <form>
                    <div className="row g-3">
                      <div className="col-xxl-5 col-sm-5">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control search"
                            placeholder="Search for product ..."
                          />
                          <i className="ri-search-line search-icon" />
                        </div>
                      </div>
                    </div>
                    {/*end row*/}
                  </form>
                </div>
                <div className="col-sm-auto">
                  <div className="d-flex gap-1 flex-wrap">
                    <Link
                      to="/admin/addproduct"
                      type="button"
                      className="text-white text-[0.9rem] bg-[#03A9F4] px-4 py-2 rounded-md "
                    >
                      Add product
                    </Link>
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

            <div className="card-body pt-0">
              <div>
                <div className="table-responsive table-card mb-1 mt-3">
                  <table
                    className="table table-nowrap align-middle"
                    id="orderTable"
                  >
                    <thead className="text-muted table-light">
                      <tr className="text-uppercase">
                        <th data-sort="id">#</th>

                        <th data-sort="customer_name">Name</th>
                        <th data-sort="date">Product Date</th>
                        <th data-sort="amount">Amount</th>
                        <th data-sort="payment">Image</th>
                        <th data-sort="status">Status</th>
                        <th data-sort="city">Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {products?.data.data.map((item, index) => (
                        <tr key={index}>
                          <td className="id">
                            <div className="fw-medium">{index + 1}</div>
                          </td>
                          <td className="customer_name">
                            <Link
                              to={`/admin/detailproduct/${item.id}`}
                              className="fw-medium "
                            >
                              {item.name.length > 30
                                ? item.name.slice(0, 30) + "..."
                                : item.name}
                            </Link>
                          </td>

                          <td className="datetext-center">
                            {<FormatDate date={item.created_at} />}
                          </td>
                          <td className="amount">
                            {<FormatPrice price={item.variants_min_price} />}
                          </td>
                          <td>
                            <Image
                              width={80}
                              src={item.img_thumb}
                              alt="product"
                            />
                          </td>
                          <td className="status">
                            <span
                              className={`badge ${item.is_active === true ? "text-green-500" : "text-red-500"} text-uppercase`}
                            >
                              {item.is_active === true ? "Active" : "Block"}
                            </span>
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
                                  to={`/admin/product_detail/${item.id}`}
                                  className="text-primary d-inline-block"
                                >
                                  <i className="ri-eye-fill fs-16" />
                                </Link>
                              </li>
                              <li
                                className="list-inline-item edit"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="Edit"
                              >
                                <Link
                                  to={`/admin/uppdateproduct/${item.id}`}
                                  data-bs-toggle="modal"
                                  className="text-primary d-inline-block edit-item-btn"
                                >
                                  <i className="ri-pencil-fill fs-16" />
                                </Link>
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
                {/* <div className="d-flex justify-content-end">
                  <div className=" hstack gap-2 flex items-center">
                    <a className="page-item pagination-prev disabled" href="#">
                      Previous
                    </a>
                    <div className="flex-c-m flex-w w-full">
                      {page.length > 2 &&
                        page.map((page) => (
                          <Link
                            to={`/admin/products/page/${page}`}
                            key={page}
                            className={`flex-c-m how-pagination1 trans-04 m-all-7 ${
                              pages == page && "active-pagination1"
                            }`}
                          >
                            {page}
                          </Link>
                        ))}
                    </div>
                    <ul className="pagination listjs-pagination mb-0" />
                    <Link
                      className={`page-item pagination-next ${products.data.last_page === Number(pages) ? "disabled" : ""} `}
                      to=""
                    >
                      Next
                    </Link>
                  </div>
                </div> */}
                <Pagination
                  showSizeChanger
                  onChange={onShowSizeChange} 
                  current={products.data.current_page} 
                  total={products.data.total} 
                  pageSize={products.data.per_page}
                  align="center"
                />
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
                              <select
                                className="form-control"
                                data-trigger=""
                                name="payment-method"
                                required=""
                                id="payment-field"
                              >
                                <option value="">Active</option>
                                <option value="Mastercard">Block</option>
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
                            onClick={() => showModal(item.id)}
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
            </div>
          </div>
        ) : (
          <Emptys />
        )}

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
      </div>
      {/*end col*/}
    </div>
  );
};

export default Products;
