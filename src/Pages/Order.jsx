import { Link, useParams, useSearchParams } from "react-router-dom";
import { Spin, Empty, message, Modal } from "antd";
import { FormatPrice } from "../Format.jsx";
import UseOrderByStatus from "../Hook/useOrderByStatus.jsx";
import {
  useDetailOrderByUserId,
  useStatusOrder,
  useStatusOrderCline,
} from "../Hook/useOrder.jsx";
import { UseDetailUser } from "../Hook/useDetailUser.jsx";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addComent } from "./useComent.jsx";

const Order = () => {
  // const { data: user, isLoading } = useAuth();
  const { data, isLoading } = UseDetailUser();
  // const { status } = useParams();
  const [searchParam] = useSearchParams();
  const status = searchParam.get("status");
  const { data: order, isLoading: isLoadingOrder } = useDetailOrderByUserId({
    status,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfim, setIsModalConfim] = useState(false);
  const [isid, setId] = useState(false);
  const { mutate: comment, isLoading: isComment } = addComent();
  const { isLoading: isLoadingorder, mutate } = useStatusOrderCline(
    order?.[0]?.order?.user_id
  );
  const schema = z.object({
    content: z.string().min(1, "Please enter a content."),
    star: z
      .string()
      .min(1, "Please select a star rating.")
      .refine((val) => ["1", "2", "3", "4", "5"].includes(val), {
        message: "Invalid star rating.",
      }),
  });
  const handleOpen = (id) => {
    setId(id);
    setIsModalOpen(true);
  };
  const handleCancelAdd = () => {
    setIsModalOpen(false);
    reset();
    setId("");
  };
  const handleConfim = (id) => {
    setId(id);
    setIsModalConfim(true);
  };
  const handleCancelConfim = () => {
    setIsModalConfim(false);
    reset();
    setId("");
  };
  //comment
  const onSubmit = (value) => {
    const data = {
      user_id: order?.[0]?.order?.user_id,
      product_id: isid,
      content: value.content,
      // is_active: true,
      star: value.star,
    };

    comment(data);
    setId("");
    setIsModalOpen(false);
  };
  const handleSubmitOrder = (e) => {
    e.preventDefault(); // Ngăn submit reload lại trang
    mutate({ id: isid, data: 5 }); // Gửi dữ liệu
    setId("");
    setIsModalConfim(false);
  };
  
  // trạng thái đơn hàng
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const getOrderStatus = (status) => {
    const statusMapping = {
      1: "Chờ xử lý",
      2: "Đang xử lý",
      3: "Đang vận chuyển",
      4: "Đã giao hàng",
      5: "Hoàn thành",
      6: "Đã hủy",
    };
    return statusMapping[status] || "Trạng thái không xác định";
  };
  const handleorderstatus = (id, status) => {
    mutate({ id: id, data: status });
  };
  if (isLoading || isLoadingOrder) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <div className="container m-t-150 p-b-60 d-flex justify-content-between flex-wrap">
      <div>
        <div className="d-flex  m-b-30  p-b-10" style={{ gap: 15 }}>
          <img
            src={data?.avatar}
            alt=""
            style={{ maxWidth: 60, height: 60, borderRadius: "50%" }}
          />
          <div className="name">
            <span>
              <strong>{data?.name} </strong>
              <Link to="">
                <p style={{ color: "black" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: 15 }}
                    viewBox="0 0 512 512"
                    className="op-06 m-r-3"
                  >
                    <path
                      d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3
                    19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1
                    481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8
                    37.4-22.2L421.7 220.3
                    291.7 90.3z"
                    />
                  </svg>
                  Sửa hồ sơ
                </p>
              </Link>
            </span>
          </div>
        </div>
        <div className="user">
          <h5>
            <i className="fa fa-user" style={{ color: "blue" }} /> Tài khoản của
            tôi
          </h5>
        </div>
        <div className="dropdown p-l-16 m-t-15">
          <div className="m-b-15">
            <Link to="">
              <span>Hồ sơ</span>
            </Link>
          </div>
          <div className="m-b-20  ">
            <Link to="">
              <span>Đổi mật khẩu</span>
            </Link>
          </div>
        </div>
        <div className="thongbao">
          <Link to="">
            <h5>
              <i className="fa fa-cart-arrow-down" /> Order
            </h5>
          </Link>
        </div>
      </div>
      <div>
        <div
          className={` bor2 px-3 d-flex align-items-center justify-content-between m-b-40
          ${order?.length === 0 && "lg:w-[900px]"}`}
          style={{
            boxShadow: "-1px 0px 3px 0px #b0b0b0",
            position: "sticky",
            top: 80,
            background: "white",
            height: 60,
          }}
        >
          <Link to="/order" className={`${status ? "" : "text-red-600"} px-3`}>
            Tất cả{" "}
          </Link>
          <Link
            to="/order?status=1"
            className={`${status == "Wait for confirmation" && "text-red-600"} px-3`}
          >
            Chờ xử lý
          </Link>
          <Link
            to="/order?status=2"
            className={`${status == "Wait for confirmation" && "text-red-600"} px-3`}
          >
            Đang xử lý
          </Link>
          <Link
            to="/order?status=3"
            className={`${status == "Confirm" && "text-red-600"} px-3`}
          >
            Đang vận chuyển
          </Link>
          <Link
            to="/order?status=4"
            className={`${status == "Confirm" && "text-red-600"} px-3`}
          >
            Đã giao hàng
          </Link>
          <Link
            to="/order?status=5"
            className={`${status == "Successful delivery" && "text-red-600"} px-3`}
          >
            Hoàn thành
          </Link>

          <Link
            to="/order?status=6"
            className={`${status == "Canceled" && "text-red-600"} px-3`}
          >
            Đã hủy
          </Link>
        </div>
        {order.length > 0 ? (
          order.map((item) => (
            <div
              className="container how-shadow1 m-b-30 bor2 xl:w-[900px]"
              key={item.id}
            >
              <div>
                {/* Trạng thái đơn hàng */}
                <div className="bor12 p-t-20 text-right p-b-20 text-danger text-xl">
                  {getOrderStatus(item.order.status)}
                </div>
                {/* <Link to={`/bill/${item.order.id}`}> */}
                {item?.products?.map((product) => (
                  <div
                    className="d-flex justify-content-between align-items-center bor12"
                    key={product.id}
                  >
                    <div className="d-flex p-t-20" style={{ gap: 30 }}>
                      <img
                        src={product.product_variant.product.img_thumb}
                        style={{ width: 80, height: 80, marginBottom: 10 }}
                        alt={product.product_variant.product.name}
                      />
                      <div style={{ lineHeight: 2 }}>
                        <Link
                          to={`/bill/${item.order.id}`}
                          style={{ maxWidth: 580 }}
                        >
                          {product.product_variant.product.name}
                        </Link>
                        <p>
                          Phân loại hàng: Size:{" "}
                          {product.product_variant.size.name}, Color:{" "}
                          {product?.product_variant?.color?.name}
                        </p>
                        <strong>x {product.quantity}</strong>
                      </div>
                    </div>
                    <div className="">
                      <p
                        style={{ color: "red" }}
                        className={`fs-20 ${item.order.status !== 5 ? "m-b-20" : "mt-3"} m-l-80`}
                      >
                        <FormatPrice
                          price={product.product_variant.price_sale}
                        />
                      </p>
                      {item.order.status === 5 && (
                        <button
                          className="btn m-b-30 hov-btn4 float-right"
                          style={{
                            backgroundColor: "red",
                            padding: "7px 10px",
                            maxWidth: 130,
                            height: 40,
                            // color: "white",
                            fontSize: "16px",
                          }}
                          onClick={() =>
                            handleOpen(product.product_variant.product.id)
                          }
                          type="button"
                        >
                          Bình luận
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {/* </Link> */}
                {/* Tổng tiền */}
                <div className="d-flex justify-content-end align-items-center mt-4">
                  <h6 className="text-right  ">Ship:</h6>
                  <div
                    className="text-[1.7rem] p-l-10"
                    style={{ color: "red" }}
                  >
                    30.000 đ
                  </div>
                </div>
                <div className="d-flex justify-content-end align-items-center ">
                  <h6 className="text-right m-t-30 m-b-30">Thành Tiền:</h6>
                  <div
                    className="text-[1.7rem] p-l-10"
                    style={{ color: "red" }}
                  >
                    <FormatPrice price={item.order.total_amount} />
                  </div>
                </div>

                {/* Nút hành động */}
                <div className="d-flex justify-content-end align-items-center gap-3 mt-2 ">
                  {(item.order.status === 1 || item.order.status === 2) && (
                    <button
                      className="btn mt-1 m-b-30 hov-btn4 "
                      style={{
                        backgroundColor: "red",
                        padding: "7px 10px",
                        maxWidth: 130,
                        height: 40,
                        // color: "white",
                        fontSize: "16px",
                      }}
                      type="button"
                      onClick={() => handleorderstatus(item.order.id, 6)}
                    >
                      Hủy đơn hàng
                    </button>
                  )}

                  {item.order.status === 4 && (
                    <button
                      className="btn mt-1 m-b-30 hov-btn4"
                      style={{
                        backgroundColor: "red",
                        padding: "7px 10px",
                        maxWidth: 130,
                        height: 40,
                        // color: "white",
                        fontSize: "16px",
                      }}
                      onClick={() => handleConfim(item.order.id)}
                      type="button"
                    >
                      Đã nhận hàng
                    </button>
                  )}
                  {/* <button
                    className="btn mt-1 m-b-30 hov-btn4"
                    style={{
                      padding: "7px 10px",
                      maxWidth: 130,
                      height: 40,
                      fontSize: "16px",
                    }}
                    type="button"
                  >
                    Mua lại
                  </button> */}
                </div>
              </div>
              <div
                className={`modal fade ${isModalOpen ? "block opacity-100" : ""} `}
                // style={{ background: "rgba(0, 0, 0, 0.5)" }}
              >
                <div
                  className="modal-dialog modal-dialog-centered "
                  style={{ transform: "none" }}
                >
                  <div className="modal-content">
                    <div className="modal-header bg-light p-3">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Comment
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={handleCancelAdd}
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
                            Content
                          </label>
                          <input
                            type="text"
                            id="customername-field"
                            className="form-control"
                            placeholder="Enter name"
                            {...register("content", { required: true })}
                          />
                          {errors.content && (
                            <p className="text-red-500">
                              Please enter a Content.
                            </p>
                          )}
                        </div>

                        <div className="rating">
                          <input
                            {...register("star")}
                            value="5"
                            id="star5"
                            type="radio"
                          />
                          <label htmlFor="star5"></label>

                          <input
                            {...register("star")}
                            value="4"
                            id="star4"
                            type="radio"
                          />
                          <label htmlFor="star4"></label>

                          <input
                            {...register("star")}
                            value="3"
                            id="star3"
                            type="radio"
                          />
                          <label htmlFor="star3"></label>

                          <input
                            {...register("star")}
                            value="2"
                            id="star2"
                            type="radio"
                          />

                          <label htmlFor="star2"></label>
                          <input
                            {...register("star")}
                            value="1"
                            id="star1"
                            type="radio"
                          />
                          <label htmlFor="star1"></label>
                        </div>
                        {errors.star && (
                          <p className="text-red-500">Please enter a Star.</p>
                        )}
                      </div>
                      <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="px-3 py-2 mt-2 rounded-md bg-[#F3F6F9]"
                            onClick={handleCancelAdd}
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-2 mt-2 rounded-md bg-red-500 text-white"
                            id="add-btn"
                          >
                            Comment
                          </button>
                          {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div
                className={`modal fade ${isModalConfim ? "block opacity-100" : ""} `}
                // style={{ background: "rgba(0, 0, 0, 0.5)" }}
              >
                <div
                  className="modal-dialog modal-dialog-centered "
                  style={{ transform: "none" }}
                >
                  <div className="modal-content">
                    <div className="modal-header bg-light p-3">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Confim
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={handleCancelConfim}
                      />
                    </div>
                    <form
                      className="tablelist-form"
                      onSubmit={handleSubmitOrder}
                    >
                      <div className="modal-content border-none">
                        <div className="modal-body">
                          <div className="mt-2 text-center">
                            <div className="flex justify-center">
                              <img
                                src="https://media-public.canva.com/4JfLI/MAGPVM4JfLI/1/tl.png"
                                alt="Confirmation Icon"
                                width={100}
                              />
                            </div>
                            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                              <h4>Are you sure?</h4>
                              <p className="text-muted mx-4 mb-0">
                                Are you sure you want to confirm this order?
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="px-3 py-2 mt-2 rounded-md bg-[#F3F6F9]"
                            onClick={handleCancelConfim}
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-2 mt-2 rounded-md bg-red-500 text-white"
                            id="confirm-btn"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default Order;
