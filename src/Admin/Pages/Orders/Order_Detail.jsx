import React from "react";
import { Link, useParams } from "react-router-dom";
import { Spin } from "antd";
import { UseDetailOrder } from "../../../Hook/useOrder";
import { FormatDate, FormatPrice } from "../../../Format";
import { useDetailUserId } from "../../../Hook/useDetailUser";
const Order_Detail = () => {
  const { id } = useParams();

  const { data, isLoading } = UseDetailOrder(id);
  const { data: user, isLoading: isLoadingUser } = useDetailUserId(
    data?.[0]?.order?.user_id
  );
  console.log(data);
  if (isLoading || isLoadingUser) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  const total =
    Number(data?.[0]?.order?.total_amount || 0) +
    Number(data?.[0]?.order?.voucher?.discount || 0);

  return (
    <div>
      <div className="row mx-2">
        <div className="col-xl-9">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title flex-grow-1 items-center mb-0 text-uppercase">
                  Order #{data?.[0]?.order?.order_code || "N/A"}
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
                      <th scope="col" style={{ textAlign: "center" }}>
                        Item Price
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Quantity
                      </th>

                      <th scope="col" className="text-end">
                        Total Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr>
                        <td>
                          <div className="d-flex">
                            <div className="flex-shrink-0 avatar-md bg-light rounded p-1">
                              <img
                                src={item.product_variant.product.img_thumb}
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
                                  {item.product_variant.product.name.length > 20
                                    ? item.product_variant.product.name.slice(
                                        0,
                                        40
                                      ) + "..."
                                    : item.product_variant.product.name}
                                </a>
                              </h5>
                              <p className="text-muted mb-0">
                                Color:{" "}
                                <span className="fw-medium">
                                  {item.product_variant.color.name}
                                </span>
                              </p>
                              <p className="text-muted mb-0">
                                Size:{" "}
                                <span className="fw-medium">
                                  {item.product_variant.size.name}
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          {<FormatPrice price={item.product_variant.price} />}
                        </td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="fw-medium text-end">
                          {
                            <FormatPrice
                              price={item.product_variant.price * item.quantity}
                            />
                          }
                        </td>
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
                                {<FormatPrice price={total} />}
                              </td>
                            </tr>
                            {data[0]?.order?.voucher !== null ? (
                              <tr>
                                <td>
                                  Discount
                                  <span className="text-muted mx-1">
                                    ({data[0]?.order?.voucher?.code})
                                  </span>
                                  :
                                </td>
                                <td className="text-end">
                                  {data.voucher === null ? (
                                    0
                                  ) : (
                                    <FormatPrice
                                      price={data[0]?.order?.voucher?.discount}
                                    />
                                  )}
                                </td>
                              </tr>
                            ) : undefined}

                            <tr>
                              <td>Shipping Charge :</td>
                              <td className="text-end">$65.00</td>
                            </tr>
                            <tr className="border-top border-top-dashed">
                              <th scope="row">Total :</th>
                              <th className="text-end">
                                {" "}
                                {
                                  <FormatPrice
                                    price={data[0].order.total_amount}
                                  />
                                }
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
                      <div className="accordion-button p-2 shadow-none">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 avatar-xs">
                            <div className="avatar-title bg-success rounded-circle">
                              <i className="ri-shopping-bag-line" />
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3 ">
                            <h6 className="fs-15 mb-0 fw-semibold">
                              Order Placed -
                              <span className="fw-normal ml-2">
                                {
                                  <FormatDate
                                    date={data[0]?.order?.created_at}
                                  />
                                }
                              </span>
                            </h6>
                          </div>
                        </div>
                      </div>
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
                <p className="text-muted mb-0">
                  Payment Mode : {data[0].order.payment_method}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="ri-map-pin-line align-middle me-1 text-muted" />
                Shipping Address
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled vstack gap-2 fs-15 mb-0">
                <li className="fw-medium fs-14">Name : {user.name}</li>
                <li>Phone : {data[0].order.user_phone}</li>
                <li>Address : {data[0].order.user_address}</li>
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
