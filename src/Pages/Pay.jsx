import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, message, Modal, Spin } from "antd";
import { useCartItem } from "../Hook/useCart.jsx";
import { FormatPrice } from "../Format.jsx";
import logomomo from "../images/logomomo.png";
import logovnpay from "../images/logonvnpay.png";
import cod from "../images/logoshipcod.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import {
  addOrder,
  addOrderDetail,
  orderMomo,
} from "../Apis/Api.jsx";
import useAuth from "../Hook/useAuth.jsx";
const Pay = () => {
  const navigate = useNavigate();
  const queryCline = useQueryClient();
  const location = useLocation();
  const [pay, setPay] = useState("COD");
  const { cartItem: data, isCartItem: isLoading } = useCartItem();
  const { data: user, isLoading: isLoading1 } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const variant = data?.map((data) => data.product_variant);
  const quantity = data?.map((data) => data.quantity);
  const { mutate, isLoading: isLoadingOrder } = useMutation({
    mutationFn: (data) => addOrder(data),
    onSuccess: (data) => {
      message.success(data.message);
      // Gọi orderdetail sau khi đơn hàng đã được tạo thành công
      orderdetail({
        order_id: data.order.id,
        products: variant?.map((data, index) => {
          return {
            product_variant_id: data.id,
            quantity: quantity[index],
            price: data.price,
          };
        }),
      });
      setId(data.order.id);
    },
    onError: (error) => {
      message.error(error.response?.data?.error || "Có lỗi xảy ra");
    },
  });
  const { mutate: orderdetail } = useMutation({
    mutationFn: (data) => addOrderDetail(data),
    onSuccess: (data) => {
      if (pay === "COD") {
        navigate("/bill/" + data.orderDetails[0].order_id);
      } else if (pay === "MOMO") {
        momo({
          order_id: data.orderDetails[0].order_id,
        });
      }
    },
    onError: (errors) => {
      message.error(errors.response?.data?.error || "Có lỗi xảy ra");
    },
  });
  const { mutate: momo } = useMutation({
    mutationFn: (data) => orderMomo(data),
    onSuccess: (data) => {
      window.location.href = data.payment_url;
    },
    onError: (errors) => {
      message.error(errors.response?.data?.error || "Có lỗi xảy ra");
    },
  });
  const schema = z.object({
    user_name: z.string().min(1, "Name is required"),
    total_amount: z.number().min(1, "Total price is required"),
    user_phone: z.string().min(1, "Phone is required"),
    user_address: z.string().min(1, "Address is required"),
    user_id: z.string(),
    voucher_id: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
  });
  const total = data?.reduce(
    (total, item) => total + item.product_variant.price_sale * item.quantity,
    0
  );

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const orderid = "ord" + Math.floor(Math.random() * 10000);
  const onsubmit = () => {
    mutate(getValues());
  };

  useEffect(() => {
    if (data) {
      // if (user) {
      reset({
        user_id: user?.id,
        user_name: user?.name,
        total_amount: location.state.totalPrice,
        user_phone: user?.phone,
        user_email: user?.email,
        user_address: user?.address,
        voucher_id:
          location.state?.voucher == 0 ? null : location.state?.voucher,
        payment_method: pay,
        order_code: orderid,
        payment_status: "unpaid",
        discount: location.state.voucherToal,
      });
      // }
    }
  }, [data, user, pay]);
  if (isLoading1 && isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <div>
      <div className="container m-b-30 con m-t-100">
        <div className="bread-crumb flex-w  p-t-30 p-lr-0-lg">
          <Link to={"/"} className="stext-109 cl8 hov-cl1 trans-04">
            Trang chủ
            <i className="fa fa-angle-right m-l-9 m-r-10" />
          </Link>
          <span className="stext-109 cl4" > Thanh toán</span>
        </div>
      </div>
      <form
        className="thongtin container m-b-60 "
        id="myForm"
        onSubmit={handleSubmit(onsubmit)}
      >
        <div id="t">
          <div className="form ">
            <input type="hidden" name="user" />
            <h3
              style={{
                marginBottom: "20px",
                fontSize: "30px",
                fontWeight: "500",
                lineHeight: "1.1",
              }}
            >
              Thông tin thanh toán
            </h3>
            <label htmlFor="name">Họ và tên * </label>
            <input
              type="text"
              id="product-name"
              {...register("user_name")}
              placeholder="Họ và tên"
              className="input "
            />
            {errors.user_name && (
              <p className="text-red-500">{errors.user_name.message}</p>
            )}

            <label htmlFor="dc" className="mt-3">
              Địa chỉ *
            </label>
            <input
              type="text"
              placeholder="Địa chỉ"
              id="product-dc"
              {...register("user_address")}
              className="input "
            />
            {errors.user_address && (
              <p className="text-red-500">{errors.user_address.message}</p>
            )}
            <label htmlFor="name" className="mt-3">
              Số điện thoại *
            </label>
            <input
              type="text"
              id="product-sdt"
              {...register("user_phone")}
              placeholder="Số điện thoại "
              className="input"
            />
            {errors.user_phone && (
              <p className="text-red-500">{errors.user_phone.message}</p>
            )}
            <h3 className="text-[27px] font-medium mt-4 mb-3">
              Thông tin bổ sung
            </h3>
            <label htmlFor="">Ghi chú bổ sung</label>
            <textarea
              id="textt"
              cols={2}
              rows={5}
              placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
              className="input"
              {...register("note")}
            />
          </div>
          <div className="donhang">
            <h3 className="text-[27px] font-medium mb-3">ĐƠN HÀNG CỦA BẠN</h3>
            <table>
              <thead>
                <tr className="">
                  <th className="product-sp product">Sản phẩm</th>
                  <th className="product-total product">Tổng</th>
                </tr>
              </thead>
              <tbody className="cart1">
                {data?.map((item) => (
                  <tr className="cart bor12 m-b-10" key={item.id}>
                    <td id="tt-name">
                      {item.product_variant.product.name.slice(0, 30) + "..."}
                      <strong className="tt-quantity">x {item.quantity}</strong>
                      <br />
                      <span className="text-gray-500">
                        Size : {item.product_variant.size.name}
                      </span>
                      <span className="text-gray-500 pl-2">
                        Color : {item.product_variant.color.name}
                      </span>
                    </td>

                    <td>
                      {
                        <FormatPrice
                          price={
                            item.product_variant.price_sale * item.quantity
                          }
                        />
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="tvc m-b-10">
                  <th className="left">Tiền vận chuyển</th>
                  <td className="right">30.000 đ</td>
                </tr>
                <tr className="tvc m-b-10">
                  <th className="left">Tổng tiền hàng</th>
                  <td className="right">{<FormatPrice price={total} />}</td>
                </tr>
                {location.state?.voucherToal > 0 && (
                  <tr className="tvc m-b-10">
                    <th className="left">Tổng số tiền giảm giá</th>
                    <td className="right">
                      - {<FormatPrice price={location.state.voucherToal} />}
                    </td>
                  </tr>
                )}

                <tr
                  className="tvc m-b-10"
                  style={{ borderBottom: "1px solid #ccc" }}
                >
                  <th>Tổng thanh toán</th>
                  <td id="product-totals">
                    {
                      <FormatPrice
                        price={
                          location.state
                            ? location.state.totalPrice
                            : data?.totalPrice
                        }
                      />
                    }
                  </td>
                </tr>
                <tr
                  className="tvc m-b-10"
                  style={{ borderBottom: "1px solid #ccc" }}
                >
                  <th>Phương thức thanh toán</th>
                  <td id="product-totals " className="flex items-center">
                    <div className="text-[17px]">{pay}</div>
                    <span
                      className="text-blue-700 pl-2 cursor-pointer"
                      onClick={showModal}
                    >
                      Thay đổi
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
            <button
              className="flex-c-m text-[18px] cl0 w-full h-12 bg3 bor2 hov-btn4 p-lr-15 trans-04 m-b-10 m-t-20 cursor"
              type="submit"
              onClick={() => onsubmit()}
              disabled={isLoadingOrder}
            >
            {isLoadingOrder && <Spin size="small" className="mr-2" />}  Thanh toán
            </button>

            <p style={{ fontSize: 15, maxWidth: 660 }}>
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our
              <span className="span">privacy policy.</span>
            </p>
          </div>
        </div>
      </form>
      <Modelpay
        show={isModalOpen}
        setShow={setIsModalOpen}
        pay={pay}
        setPay={setPay}
      />
    </div>
  );
};
const Modelpay = ({ show, setShow, pay, setPay }) => {
  const [pttt, setpttt] = useState("COD");
  const handleCancel = () => {
    setShow(false);
    setpttt(pay);
  };
  const handleok = () => {
    setShow(false);
    setPay(pttt);
  };
  return (
    <Modal
      open={show}
      onCancel={handleCancel}
      title={<h2>Chọn phương thức thanh toán </h2>}
      // loading={isLoading}
      footer={
        <>
          <Button onClick={handleCancel}>Close</Button>
          <Button onClick={handleok}>Ok</Button>
        </>
      }
    >
      <div className="flex justify-center  my-10">
        <div className="radio-inputs">
          <label>
            <input
              className="radio-input"
              type="radio"
              onChange={() => setpttt("MOMO")}
              name="engine"
              checked={pttt === "MOMO"}
            />
            <span className="radio-tile">
              <span className="radio-icon">
                <img src={logomomo} alt=""></img>
              </span>
              <span className="radio-label">Momo</span>
            </span>
          </label>
          <label>
            <input
              checked={pttt === "VNPAY"}
              className="radio-input"
              type="radio"
              name="engine"
              onChange={() => setpttt("VNPAY")}
            />
            <span className="radio-tile">
              <span className="radio-icon">
                <img src={logovnpay} alt=""></img>
              </span>
              <span className="radio-label">VNPay</span>
            </span>
          </label>
          <label>
            <input
              className="radio-input"
              type="radio"
              name="engine"
              onChange={() => setpttt("COD")}
              checked={pttt === "COD"}
            />
            <span className="radio-tile">
              <span className="radio-icon">
                <img src={cod} alt=""></img>
              </span>
              <span className="radio-label">Cod</span>
            </span>
          </label>
        </div>
      </div>
    </Modal>
  );
};
export default Pay;
