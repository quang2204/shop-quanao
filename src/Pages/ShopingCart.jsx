import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, message, Modal, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FormatPrice } from "../Format.jsx";
import { useCartItem } from "../Hook/useCart.jsx";
import logo from "../images/icons/logo1.png";
import {
  deleteAllCartitem,
  deleteCart,
  getVouchers,
  updateCartItem,
} from "../Apis/Api.jsx";
import { useEffect, useState } from "react";
import { useVouchers_User } from "../Hook/useVoucher.jsx";
const ShopingCart = () => {
  const [voucherid, setVoucherId] = useState(0);
  const [voucher, setVoucher] = useState(0);
  const { vouchers, isLoading } = useVouchers_User();
  const queryCline = useQueryClient();
  const { mutate, isLoading: isLoadingCart } = useMutation({
    mutationFn: ({ data, id }) => updateCartItem(data, id),
    onSuccess: () => {
      queryCline.invalidateQueries(["cartItem"]);
    },
    onError: (error) => {
      error.message === "Request failed with status code 400";
    },
  });

  const { cartItem, isCartItem } = useCartItem();
  const queryClient = useQueryClient();
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (id) => deleteCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItem"] });
      message.success("Xóa thành công");
    },
  });
  const { mutate: mutateDeleteAllitem, isLoading: isDeleteAllitem } =
    useMutation({
      mutationFn: (id) => deleteAllCartitem(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cartItem"] });
        message.success("Xóa thành công");
      },
    });
  const [counts, setCounts] = useState();
  const [inputValues, setInputValues] = useState();

  useEffect(() => {
    if (cartItem) {
      setCounts(
        cartItem?.map((item) => {
          return {
            id: item.id,
            quantity: item.quantity,
          };
        })
      );
      setInputValues(
        cartItem?.map((item) => {
          return {
            id: item.id,
            quantity: item.quantity,
          };
        })
      );
    }
  }, [cartItem]);
  //tăng
  const increaseNumber = (id) => {
    const check = counts.find((item) => item.id === id);
    const item = cartItem.find((item) => item.id === id);
    if (check) {
      const maxQuantity = item.product_variant.quantity;
      if (check.quantity + 1 > maxQuantity) {
        message.error("Maximum quantity left only " + maxQuantity);
      } else {
        const newCount = check.quantity + 1;
        mutate({ data: { quantity: newCount }, id: check.id });
      }
    }
  };
  //giảm
  const decreaseNumber = (id) => {
    const check = counts?.find((item) => item.id === id);
    if (check && check.quantity > 1) {
      const newCount = check.quantity - 1;
      mutate({ data: { quantity: newCount }, id: check.id });
    }
  };
  const [pre, setPre] = useState();
  const numberDirectly = (input, id, index) => {
    // Cho phép người dùng nhập giá trị rỗng tạm thời
    if (input === "") {
      const updatedValues = [...inputValues];
      if (updatedValues[index]) {
        updatedValues[index] = {
          ...updatedValues[index],
          quantity: "",
        };
        setInputValues(updatedValues);
      }
      return;
    }
    const value = parseInt(input);
    if (isNaN(value) || value < 1) return;

    const item = cartItem.find((item) => item.id === id);
    const maxQuantity = item.product_variant.quantity;

    // Kiểm tra xem người dùng nhập quá số lượng tối đa
    if (value > maxQuantity) {
      // Hiển thị thông báo lỗi nếu giá trị vượt quá
      message.error(`The maximum quantity is ${maxQuantity}`);
      return; // Không lưu giá trị vào state
    }

    // Cập nhật giá trị vào state nếu không vượt quá số lượng tối đa
    const updatedValues = [...inputValues];
    if (updatedValues[index]) {
      updatedValues[index] = {
        ...updatedValues[index],
        quantity: value, // Lưu giá trị hợp lệ vào state
      };
      setPre(updatedValues);
      setInputValues(updatedValues);
    }
  };

  const handleBlur = (id, index) => {
    const item = cartItem.find((item) => item.id === id);
    const check = counts.find((item) => item.id === id);
    if (!item || !check) return;
    // Lấy giá trị cũ từ inputValues
    const prevQuantity = inputValues?.[index]?.quantity;

    // Lấy giá trị mới từ input
    const newQuantity = inputValues?.[index]?.quantity;

    // Nếu người dùng xóa toàn bộ (input === ""), trả lại giá trị cũ
    if (newQuantity === "") {
      setInputValues(pre);
      return; // Dừng lại không thực hiện gì thêm
    }

    // Nếu quantity là không hợp lệ, không thực hiện gì
    if (isNaN(newQuantity) || newQuantity < 1) return;

    const maxQuantity = item.product_variant.quantity;
    const finalQuantity = Math.min(newQuantity, maxQuantity);
    mutate({ data: { quantity: newQuantity }, id: check.id });

    // Cập nhật lại giá trị trong state
    setInputValues((prevState) => {
      const updatedValues = [...prevState];
      updatedValues[index] = {
        ...updatedValues[index],
        quantity: finalQuantity,
      };
      return updatedValues;
    });
  };

  const total = cartItem?.reduce(
    (total, item) => total + item.product_variant.price_sale * item.quantity,
    0
  );

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  if (isCartItem || isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <div>
      <div className="container mt-24">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <a className="stext-109 cl8 hov-cl1 trans-04" href="index.html">
            Home
            <i aria-hidden="true" className="fa fa-angle-right m-l-9 m-r-10" />
          </a>
          <span className="stext-109 cl4"> Shoping Cart </span>
        </div>
      </div>

      <div className="container" style={{ marginTop: 20 }}>
        {cartItem && cartItem?.length > 0 ? (
          <div className="row">
            <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
              <div className="m-l-25 m-r--38 m-lr-0-xl">
                <div className="wrap-table-shopping-cart">
                  <table className="table-shopping-cart">
                    <tbody>
                      <tr className="table_head">
                        <th className="column-1 " style={{ paddingLeft: 30 }}>
                          Product
                        </th>
                        <th className="column-2" />
                        <th className="column-3">Price</th>
                        <th className="column-4">Number</th>
                        <th className="column-5">Total</th>
                      </tr>
                      {cartItem &&
                        cartItem?.map((item, index) => (
                          <tr className="table_row" key={index + 1}>
                            <td className="column-1">
                              <div
                                className=" d-flex align-items-center "
                                style={{ gap: 15 }}
                              >
                                <div
                                  className="cursor m-l--30 "
                                  onClick={() => mutateDelete(item.id)}
                                >
                                  <p
                                    className=" bor0 bor10 d-flex justify-content-center align-items-center p-b-3 hov-btn3
                                 "
                                    style={{ width: 25, height: 25 }}
                                  >
                                    x
                                  </p>
                                </div>

                                <img
                                  src={
                                    item?.product_variant?.product?.img_thumb
                                  }
                                  alt="IMG"
                                  style={{ width: 100, marginRight: 50 }}
                                />
                              </div>
                            </td>
                            <td className="pl-8 ">
                              <Link
                                to={`/product/${item?.product_variant?.product?.id}`}
                                style={{ color: "black" }}
                              >
                                <p className="m-b-4 text-[15px] font-normal">
                                  {item?.product_variant?.product?.name.length >
                                  20
                                    ? item?.product_variant?.product?.name.slice(
                                        0,
                                        20
                                      ) + "..."
                                    : item?.product_variant?.product?.name}
                                </p>
                              </Link>
                              <p className="text-gray-500 text-[14px]">
                                Size :{item.product_variant.color.name}
                              </p>
                              <p className="text-gray-500 text-[14px]">
                                Color :{item.product_variant.size.name}
                              </p>
                            </td>

                            <td className="column-3 text-center subtotal-for-product-116 font-bold">
                              {
                                <FormatPrice
                                  price={item.product_variant.price_sale}
                                />
                              }
                            </td>
                            <td className="column-4">
                              <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                <div
                                  className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                  onClick={() => decreaseNumber(item.id)}
                                >
                                  <i className="fs-16 zmdi zmdi-minus" />
                                </div>
                                <input
                                  className="mtext-104 cl3 txt-center num-product"
                                  type="number"
                                  disabled={isLoadingCart}
                                  onChange={(e) =>
                                    numberDirectly(
                                      e.target.value,
                                      item.id,
                                      index
                                    )
                                  }
                                  value={inputValues?.[index]?.quantity}
                                  onBlur={() => handleBlur(item.id, index)}
                                />

                                <div
                                  className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                  onClick={() => increaseNumber(item.id)}
                                >
                                  <i className="fs-16 zmdi zmdi-plus" />
                                </div>
                              </div>
                            </td>
                            <td className="column-5 font-bold">
                              <FormatPrice
                                price={
                                  item.product_variant.price_sale *
                                  item.quantity
                                }
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-20 p-lr-15-sm">
                  <div className="flex-w flex-m m-r-20 m-tb-5">
                    <Link to="/">
                      <div className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
                        <i className="fa fa-arrow-left p-r-10" />
                        Back to home page
                      </div>
                    </Link>
                  </div>
                  <div className="flex-w flex-m m-tb-5">
                    <div
                      className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn4 p-lr-15 trans-04 pointer m-tb-5"
                      onClick={() => mutateDeleteAllitem(cartItem[0].cart_id)}
                    >
                      {isDeleteAllitem && <Spin size="small" />} X Delete Cart
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
              <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                <h4 className="mtext-109 cl2 p-b-30">Total</h4>
                <div className="flex-w flex-t bor12 p-b-13 items-center">
                  <div className="size-208">
                    <span className="mtext-101 cl2">Transport</span>
                  </div>
                  <div className="size-209 text-right">
                    <span className="mtext-110 cl2 ">30.000đ</span>
                  </div>
                </div>
                {voucher > 0 && (
                  <div className="flex-w flex-t bor12 p-b-13 p-t-13 items-center">
                    <div className="size-208">
                      <span className="mtext-101 cl2">Voucher</span>
                    </div>
                    <div className="size-209 text-right">
                      <span className="mtext-110 cl2 ">
                        - <FormatPrice price={voucher} />
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex-w flex-t p-t-27 pb-3 bor12">
                  <div className="size-208">
                    <span className="mtext-101 cl2">Total</span>
                  </div>
                  <div className="size-209 p-t-1 text-right">
                    <span className="mtext-110 cl2 xoa">
                      <FormatPrice
                        price={
                          total + 30000 > voucher
                            ? voucher
                              ? total - voucher + 30000
                              : total + 30000
                            : 0
                        }
                      />
                    </span>
                  </div>
                </div>
                <div
                  onClick={() =>
                    navigate("/pay", {
                      state: {
                        totalPrice:
                          total + 30000 > voucher
                            ? voucher
                              ? total - voucher + 30000
                              : total + 30000
                            : 0,
                        voucher: voucherid,
                        voucherToal: voucher,
                      },
                    })
                  }
                  className="flex-c-m stext-101 cl0 size-107 bg3 bor1 hov-btn3 p-lr-15 trans-04 m-b-10 m-t-20 cursor"
                >
                  Make payment
                </div>
                <div className="flex-w flex-t p-b-20 sale mt-3">
                  <button
                    className="flex-c-m stext-101 mb-3 size-111  bor14 hov-btn3 p-lr-15 trans-04 pointer"
                    onClick={showModal}
                  >
                    Discount Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center m-t-140 m-b-100 ">
            <h3>There are no products in the cart. </h3>
            <br />
            <Link to={"/product"} id="productLink">
              <button className="btn w-25 d-flex ml-auto mr-auto hov-btn2">
                Back to store
              </button>
            </Link>
          </div>
        )}
      </div>

      <Voucher
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setVoucher={setVoucher}
        setVoucherId={setVoucherId}
        voucherid={voucherid}
        total={total}
        vouchers={vouchers}
      />
    </div>
  );
};
const Voucher = ({
  isModalOpen,
  setIsModalOpen,
  setVoucher,
  setVoucherId,
  voucherid,
  total,
  vouchers,
}) => {
  const [check, setCheck] = useState(false);
  const [beforeVoucher, setBeforeVoucher] = useState(0);
  const [afterId, setAfterId] = useState(0);
  const { data, isLoading } = useQuery({
    queryKey: ["vouchers"],
    queryFn: getVouchers,
  });
  const date = new Date();
  const handleVoucherId = (discount, id) => {
    setBeforeVoucher(discount);
    setVoucherId(id);
  };
  const handleok = () => {
    setIsModalOpen(false);
    setVoucher(beforeVoucher);
    setCheck(true);
    setAfterId(voucherid);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    if (!check) setVoucherId(0);
    else setVoucherId(afterId);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      title={<h2>Chọn Voucher</h2>}
      loading={isLoading}
      width={570}
      // style={{padding:"0 10px"}}
      className="custom-modal"
      footer={
        <>
          <Button onClick={handleCancel}>Close</Button>
          <Button onClick={handleok}>Ok</Button>
        </>
      }
    >
      <div className="my-10 max-h-[500px] overflow-y-scroll">
        {data?.data
          .filter(
            (item) =>
              item.is_active == 1 &&
              vouchers.vouchers.some((obj2) => item.id !== obj2.id)
          )
          ?.map((item) => {
            const isExpired = new Date(item.end_date) < date;
            const isInvalidAmount = !(
              total >= item.min_money && total <= item.max_money
            );
            const isDisabled =
              isExpired || isInvalidAmount || item.quantity < 1;
            const handleClick = () => {
              if (isExpired) {
                message.error("This voucher has expired!");
              } else if (isInvalidAmount) {
                message.error("Not eligible to use this voucher!");
              } else if (item.quantity < 1) {
                message.error("Quantity out of stock !");
              } else {
                handleVoucherId(item.discount, item.id);
              }
            };
            return (
              <div
                key={item.id}
                onClick={
                  isDisabled
                    ? () => {
                        handleClick();
                      }
                    : ""
                }
                className={`xl:w-[480px] md:w-full ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="d-flex justify-content-between align-items-center bor10 m-b-20">
                  <div className="d-flex align-items-center">
                    <div
                      className="icon"
                      style={{ padding: "40px 20px", backgroundColor: "red" }}
                    >
                      <img src={logo} alt="logo" style={{ width: 100 }} />
                    </div>
                    <div className="conten p-l-20 fs-20">
                      <p className="mb-1">
                        Giảm tối đa <FormatPrice price={item.discount} />
                      </p>
                      <p className="text-muted text-lg">
                        Giảm cho đơn từ <FormatPrice price={item.min_money} /> -
                        <FormatPrice price={item.max_money} />
                      </p>
                      <p className="text-muted text-lg">
                        Hạn sử dụng:
                        {new Date(item.end_date).toLocaleDateString("vi-VN")}
                      </p>
                      <p className="text-muted text-lg">
                        Số lượng:
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="radio-inputs">
                    <input
                      className="input-voucher"
                      style={isDisabled ? { cursor: "no-drop" } : {}}
                      type="radio"
                      checked={voucherid === item.id}
                      onChange={() => handleVoucherId(item.discount, item.id)}
                      name="radio"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Modal>
  );
};
export default ShopingCart;
