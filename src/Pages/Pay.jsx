import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, message, Modal, Spin } from "antd";
import useCart from "../Hook/useCart.jsx";
import FormatPrice from "../FormatPrice.jsx";
import logomomo from "../images/logomomo.png";
import logovnpay from "../images/logonvnpay.png";
import cod from "../images/logoshipcod.png";
import UseDetailUser from "../Hook/useDetailUser.jsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { addOrder, deleteAllCart } from "../Apis/Api.jsx";
const Pay = () => {
  const navigate = useNavigate();
  const queryCline = useQueryClient();
  const location = useLocation();
  const [pay, setPay] = useState("COD");
  const { data, isLoading } = useCart();
  const { data: user, isLoading: isLoading1 } = UseDetailUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const users = JSON.parse(localStorage.getItem("user") || "null");

  const { mutate: mutateDelete, isLoading: isLoading3 } = useMutation({
    mutationFn: () => deleteAllCart(users._id),
    onSuccess: () => {
      queryCline.invalidateQueries({ queryKey: ["cart"] });
      // message.success("Xoa tat ca san pham");
    },
  });
  const { mutate } = useMutation({
    mutationFn: (data) => addOrder(data),
    onSuccess: (data) => {
      mutateDelete();
      if (isLoading3) return;
      navigate("/bill/" + data._id);
      message.success("Thành công");
      // queryCline.invalidateQueries(["order"]);
    },
  });
  const schema = z.object({
    customerName: z.string().min(1, "Name is required"),
    totalPrice: z.number().min(1, "Total price is required"),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
    products: z.array(z.object({})),
    userId: z.string(),
    voucher: z.string().optional().nullable(),
  });
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const orderid = Math.floor(Math.random() * 10000);

  const onsubmit = () => {
    mutate(getValues());
    // console.log(getValues());
  };
  useEffect(() => {
    if (data) {
      const product = data?.data.map((item) => {
        return {
          productId: item.product._id,
          quantity: item.quantity,
        };
      });
      // if (user) {
      reset({
        userId: user?._id,
        customerName: user?.username,
        totalPrice: data?.totalPrice - location.state?.voucherToal,
        phone: user?.phone,
        address: user?.address,
        products: product,
        voucher: location.state?.voucher == 0 ? null : location.state?.voucher,
        payment: pay,
        madh: orderid,
      });
      // }
    }
  }, [data, user, pay]);
  if (isLoading1 || isLoading) {
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
          <span className="stext-109 cl4">Thanh toán</span>
        </div>
      </div>
      <form
        className="thongtin m-b-60"
        id="myForm"
        onSubmit={handleSubmit(onsubmit)}
      >
        <input type="hidden" />
        <div id="t">
          <div className="form ">
            <input type="hidden" name="user" defaultValue={76} />
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
              {...register("customerName")}
              placeholder="Họ và tên"
              className="input "
            />
            {errors.customerName && (
              <p className="text-red-500">{errors.customerName.message}</p>
            )}
            <label htmlFor="dc" className="mt-3">
              Địa chỉ *
            </label>
            <input
              type="text"
              placeholder="Địa chỉ"
              id="product-dc"
              {...register("address")}
              className="input "
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
            <label htmlFor="name" className="mt-3">
              Số điện thoại *
            </label>
            <input
              type="text"
              id="product-sdt"
              {...register("phone")}
              placeholder="Số điện thoại "
              className="input"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
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
                {data?.data.map((item) => (
                  <tr className="cart bor12 m-b-10" key={item._id}>
                    <td id="tt-name">
                      {item.product.name.slice(0, 30) + "..."}
                      <strong className="tt-quantity">x {item.quantity}</strong>
                    </td>
                    <td>
                      {
                        <FormatPrice
                          price={item.product.price * item.quantity}
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
                  <td className="right">
                    {<FormatPrice price={data?.totalPrice} />}
                  </td>
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
              className="flex-c-m text-[21px] cl0 w-full h-12 bg3 bor2 hov-btn4 p-lr-15 trans-04 m-b-10 m-t-20 cursor"
              type="submit"
            >
              Thanh toán
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
const Modelpay = ({
  show,
  setShow,
  pay,
  setPay,
}) => {
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
