import React from "react";
import img1 from "../../velzon/assets/images/products/img-8.png";
import img2 from "../../velzon/assets/images/products/img-7.png";
import img3 from "../../velzon/assets/images/products/img-3.png";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import {UseDetailOrder} from "../../../Hook/useOrder";
import { FormatDate, FormatPrice } from "../../../Format";
const Order_Detail = () => {
  const { data, isLoading } = UseDetailOrder();
  console.log(data);
  if (isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <div>
      <div className="row mx-2">
        <div className="col-xl-9">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title flex-grow-1 items-center mb-0">
                  Order #{data.madh}
                </h5>
                <div className="flex-shrink-0">
                  <a
                    href="apps-invoices-details.html"
                    className="px-3 py-2 rounded-md btn-success btn-sm"
                  >
                    <i className="ri-download-2-fill align-middle me-1" />
                    Invoice
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive table-card">
                <table className="table table-nowrap align-middle table-borderless mb-0">
                  <thead className="table-light text-muted">
                    <tr>
                      <th scope="col">Product Details</th>
                      <th scope="col">Item Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Rating</th>
                      <th scope="col" className="text-end">
                        Total Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.products.map((item) => (
                      <tr>
                        <td>
                          <div className="d-flex">
                            <div className="flex-shrink-0 avatar-md bg-light rounded p-1">
                              <img
                                src={img1}
                                alt=""
                                className="img-fluid d-block"
                              />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h5 className="fs-15">
                                <a
                                  href="apps-ecommerce-product-details.html"
                                  className="link-primary"
                                >
                                  Sweatshirt for Men (Pink)
                                </a>
                              </h5>
                              <p className="text-muted mb-0">
                                Color: <span className="fw-medium">Pink</span>
                              </p>
                              <p className="text-muted mb-0">
                                Size: <span className="fw-medium">M</span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>$119.99</td>
                        <td>02</td>
                        <td>
                          <div className="text-warning fs-15">
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                            <i className="ri-star-half-fill" />
                          </div>
                        </td>
                        <td className="fw-medium text-end">$239.98</td>
                      </tr>
                    ))}

                    <tr className="border-top border-top-dashed">
                      <td colSpan={3} />
                      <td colSpan={2} className="fw-medium p-0">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                              <td>Sub Total :</td>
                              <td className="text-end">
                                {<FormatPrice price={data.totalPrice} />}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Discount
                                <span className="text-muted">(VELZON15)</span>:
                                :
                              </td>
                              <td className="text-end">
                                {data.voucher === null ? (
                                  0
                                ) : (
                                  <FormatPrice price={data.voucher?.discount} />
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Shipping Charge :</td>
                              <td className="text-end">$65.00</td>
                            </tr>
                            <tr>
                              <td>Estimated Tax :</td>
                              <td className="text-end">$44.99</td>
                            </tr>
                            <tr className="border-top border-top-dashed">
                              <th scope="row">Total :</th>
                              <th className="text-end">
                                {" "}
                                {<FormatPrice price={data.totalPrice} />}
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/*end card*/}
          <div className="card">
            <div className="card-header">
              <div className="d-sm-flex align-items-center">
                <h5 className="card-title flex-grow-1 mb-0">Order Status</h5>
                <div className="flex mt-2 mt-sm-0 gap-2">
                  <Link
                    className="px-3 py-1 bg-[#dff0fa] hover:text-white hover:bg-blue-500 cursor-pointer rounded-md btn-sm mt-2 mt-sm-0"
                    style={{ color: "white !important" }}
                  >
                    <i className="ri-map-pin-line align-middle me-1" />
                    Change Address
                  </Link>
                  <Link
                    className="px-3 py-1 bg-[#fadbd5] hover:text-white  hover:bg-red-500 cursor-pointer rounded-md btn-sm mt-2 mt-sm-0"
                    style={{ color: "white !important" }}
                  >
                    <i className="mdi mdi-archive-remove-outline align-middle me-1" />
                    Cancel Order
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="profile-timeline">
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item border-0">
                    <div className="accordion-header" id="headingOne">
                      <a
                        className="accordion-button p-2 shadow-none"
                        data-bs-toggle="collapse"
                        href="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 avatar-xs">
                            <div className="avatar-title bg-success rounded-circle">
                              <i className="ri-shopping-bag-line" />
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="fs-15 mb-0 fw-semibold">
                              Order Placed -
                              <span className="fw-normal">
                                Wed, 15 Dec 2021
                              </span>
                            </h6>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body ms-2 ps-5 pt-0">
                        <h6 className="mb-1">An order has been placed.</h6>
                        <p className="text-muted">Wed, 15 Dec 2021 - 05:34PM</p>
                        <h6 className="mb-1">
                          Seller has processed your order.
                        </h6>
                        <p className="text-muted mb-0">
                          Thu, 16 Dec 2021 - 5:48AM
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border-0">
                    <div className="accordion-header" id="headingTwo">
                      <a
                        className="accordion-button p-2 shadow-none"
                        data-bs-toggle="collapse"
                        href="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 avatar-xs">
                            <div className="avatar-title bg-success rounded-circle">
                              <i className="mdi mdi-gift-outline" />
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="fs-15 mb-1 fw-semibold">
                              Packed -
                              <span className="fw-normal">
                                Thu, 16 Dec 2021
                              </span>
                            </h6>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body ms-2 ps-5 pt-0">
                        <h6 className="mb-1">
                          Your Item has been picked up by courier partner
                        </h6>
                        <p className="text-muted mb-0">
                          Fri, 17 Dec 2021 - 9:45AM
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border-0">
                    <div className="accordion-header" id="headingThree">
                      <a
                        className="accordion-button p-2 shadow-none"
                        data-bs-toggle="collapse"
                        href="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 avatar-xs">
                            <div className="avatar-title bg-success rounded-circle">
                              <i className="ri-truck-line" />
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="fs-15 mb-1 fw-semibold">
                              Shipping -
                              <span className="fw-normal">
                                Thu, 16 Dec 2021
                              </span>
                            </h6>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse show"
                    >
                      <div className="accordion-body ms-2 ps-5 pt-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-truck"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                        </svg>
                        <h6 className="fs-14">
                          RQK Logistics - MFDS1400457854
                        </h6>
                        <h6 className="mb-1">Your item has been shipped.</h6>
                        <p className="text-muted mb-0">
                          Sat, 18 Dec 2021 - 4.54PM
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border-0">
                    <div className="accordion-header" id="headingFour">
                      <a
                        className="accordion-button p-2 shadow-none"
                        data-bs-toggle="collapse"
                        href="#collapseFour"
                        aria-expanded="false"
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 avatar-xs">
                            <div className="avatar-title bg-light text-success rounded-circle">
                              <i className="ri-takeaway-fill" />
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="fs-14 mb-0 fw-semibold">
                              Out For Delivery
                            </h6>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="accordion-item border-0">
                    <div className="accordion-header" id="headingFive">
                      <a
                        className="accordion-button p-2 shadow-none"
                        data-bs-toggle="collapse"
                        href="#collapseFile"
                        aria-expanded="false"
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 avatar-xs">
                            <div className="avatar-title bg-light text-success rounded-circle">
                              <i className="mdi mdi-package-variant" />
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="fs-14 mb-0 fw-semibold">
                              Delivered
                            </h6>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                {/*end accordion*/}
              </div>
            </div>
          </div>
          {/*end card*/}
        </div>
        {/*end col*/}
        <div className="col-xl-3">
          <div className="card">
            <div className="card-header">
              <div className="d-flex">
                <h5 className="card-title flex-grow-1 mb-0">
                  <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted" />
                  Logistics Details
                </h5>
                <div className="flex-shrink-0 -mt-1">
                  <a className="badge p-1 bg-primary-subtle text-primary fs-11">
                    Track Order
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="text-center">
                <lord-icon
                  src="https://cdn.lordicon.com/uetqnvvg.json"
                  trigger="loop"
                  colors="primary:#405189,secondary:#0ab39c"
                  style={{ width: 80, height: 80 }}
                />
                <h5 className="fs-16 mt-2">RQK Logistics</h5>
                <p className="text-muted mb-0">ID: MFDS1400457854</p>
                <p className="text-muted mb-0">Payment Mode : Debit Card</p>
              </div>
            </div>
          </div>
          {/*end card*/}
          <div className="card">
            <div className="card-header">
              <div className="d-flex">
                <h5 className="card-title flex-grow-1 mb-0">
                  Customer Details
                </h5>
                <div className="flex-shrink-0">
                  <Link to="" className="link-secondary">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0 vstack gap-3">
                <li>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <img
                        src="assets/images/users/avatar-3.jpg"
                        alt=""
                        className="avatar-sm rounded"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="fs-14 mb-1">Joseph Parkers</h6>
                      <p className="text-muted mb-0">Customer</p>
                    </div>
                  </div>
                </li>
                <li>
                  <i className="ri-mail-line me-2 align-middle text-muted fs-16" />
                  josephparker@gmail.com
                </li>
                <li>
                  <i className="ri-phone-line me-2 align-middle text-muted fs-16" />
                  +(256) 245451 441
                </li>
              </ul>
            </div>
          </div>
          {/*end card*/}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="ri-map-pin-line align-middle me-1 text-muted" />
                Billing Address
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                <li className="fw-medium fs-14">Joseph Parker</li>
                <li>+(256) 245451 451</li>
                <li>2186 Joyce Street Rocky Mount</li>
                <li>New York - 25645</li>
                <li>United States</li>
              </ul>
            </div>
          </div>
          {/*end card*/}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="ri-map-pin-line align-middle me-1 text-muted" />
                Shipping Address
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                <li className="fw-medium fs-14">Joseph Parker</li>
                <li>+(256) 245451 451</li>
                <li>2186 Joyce Street Rocky Mount</li>
                <li>California - 24567</li>
                <li>United States</li>
              </ul>
            </div>
          </div>
          {/*end card*/}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="ri-secure-payment-line align-bottom me-1 text-muted" />
                Payment Details
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0">
                  <p className="text-muted mb-0">Transactions:</p>
                </div>
                <div className="flex-grow-1 ms-2">
                  <h6 className="mb-0">#VLZ124561278124</h6>
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0">
                  <p className="text-muted mb-0">Payment Method:</p>
                </div>
                <div className="flex-grow-1 ms-2">
                  <h6 className="mb-0">Debit Card</h6>
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0">
                  <p className="text-muted mb-0">Card Holder Name:</p>
                </div>
                <div className="flex-grow-1 ms-2">
                  <h6 className="mb-0">Joseph Parker</h6>
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0">
                  <p className="text-muted mb-0">Card Number:</p>
                </div>
                <div className="flex-grow-1 ms-2">
                  <h6 className="mb-0">xxxx xxxx xxxx 2456</h6>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <p className="text-muted mb-0">Total Amount:</p>
                </div>
                <div className="flex-grow-1 ms-2">
                  <h6 className="mb-0">$415.96</h6>
                </div>
              </div>
            </div>
          </div>
          {/*end card*/}
        </div>
        {/*end col*/}
      </div>
    </div>
  );
};

export default Order_Detail;
