import { Link, useParams } from "react-router-dom";
import { Spin, Empty } from "antd";
import { FormatPrice } from "../Format.jsx";
import UseOrderByStatus from "../Hook/useOrderByStatus.jsx";
import { useDetailOrderByUserId } from "../Hook/useOrder.jsx";
import {UseDetailUser} from "../Hook/useDetailUser.jsx";

const Order = () => {
  // const { data: user, isLoading } = useAuth();
  const { data, isLoading } = UseDetailUser();
  const { status } = useParams();
  const { data: order, isLoading: isLoadingOrder } = useDetailOrderByUserId();
  // console.log(order);
  const { orderbyStatus, isLoadingOrderbyStatus } = UseOrderByStatus();
  // const data = status ? orderbyStatus : order;
  // const isLoading = status ? isLoadingOrderbyStatus : isLoadingOrder;
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
          ${order.length === 0 && "lg:w-[900px]"}`}
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
            to="/order/Wait for confirmation"
            className={`${status == "Wait for confirmation" && "text-red-600"} px-3`}
          >
            Chờ xác nhận
          </Link>
          <Link
            to="/order/Confirm"
            className={`${status == "Confirm" && "text-red-600"} px-3`}
          >
            Xác nhận
          </Link>
          <Link
            to="/order/Shipping"
            className={`${status == "Confirm" && "text-red-600"} px-3`}
          >
            Đang vận chuyển
          </Link>
          <Link
            to="/order/Successful delivery"
            className={`${status == "Successful delivery" && "text-red-600"} px-3`}
          >
            Giao hàng thành công
          </Link>
          <Link
            to="/order/Successful"
            className={`${status == "Successful" && "text-red-600"} px-3`}
          >
            Thành công{" "}
          </Link>
          <Link
            to="/order/Canceled"
            className={`${status == "Canceled" && "text-red-600"} px-3`}
          >
            Đã hủy{" "}
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
                  {item.status === "1" ? "Đã thanh toán" : "Chờ xác nhận"}
                </div>
                <Link to={`/bill/${item.order.id}`}>
                  {item?.products?.map((item) => (
                    <div
                      className="d-flex justify-content-between align-items-center bor12"
                      key={item.id}
                    >
                      <div className="d-flex p-t-20" style={{ gap: 20 }}>
                        <img
                          src={item.product_variant.product.img_thumb}
                          style={{ width: 80, height: 80, marginBottom: 10 }}
                          alt={item.product_variant.product.name}
                        />
                        <div style={{ lineHeight: 2 }}>
                          <h5 style={{ maxWidth: 580 }}>
                            {item.product_variant.product.name}
                          </h5>
                          <p>
                            Phân loại hàng: Size:{" "}
                            {item.product_variant.size.name}, Color:
                            {item.product_variant.color.name}
                          </p>
                          <strong>x {item.quantity}</strong>
                        </div>
                      </div>
                      <div>
                        <p
                          style={{ color: "red" }}
                          className="fs-20 m-b-20 m-l-80"
                        >
                          <FormatPrice price={item.product_variant.price} />
                        </p>
                      </div>
                    </div>
                  ))}
                </Link>
                {/* Tổng tiền */}
                <div className="d-flex justify-content-end align-items-center">
                  <h6 className="text-right m-t-30 m-b-30">Thành Tiền:</h6>
                  <div className="fs-28 p-l-10" style={{ color: "red" }}>
                    <FormatPrice price={item.order.total_amount} />
                  </div>
                </div>

                {/* Nút hành động */}
                <div className="d-flex justify-content-end items-center gap-3">
                  <button
                    className="btn mt-1 m-b-30 hov-btn4"
                    style={{
                      backgroundColor: "red",
                      padding: "7px 10px",
                      maxWidth: 130,
                      height: 40,
                      color: "white",
                    }}
                    type="button"
                  >
                    Hủy đơn hàng
                  </button>
                  <button
                    className="btn mt-1 m-b-30 hov-btn4"
                    style={{
                      padding: "7px 10px",
                      maxWidth: 130,
                      height: 40,
                    }}
                    type="button"
                  >
                    Mua lại
                  </button>
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
