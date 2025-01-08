import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, message, Modal, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import FormatPrice from "../FormatPrice.jsx";
import useCart from "../Hook/useCart.jsx";
import { deleteCart, getVouchers, updateCart } from "../Apis/Api.jsx";
import { useEffect, useState } from "react";
const ShopingCart = () => {
  const [voucherid, setVoucherId] = useState < number > 0;
  const [voucher, setVoucher] = useState < number > 0;
  const queryCline = useQueryClient();
  const { mutate, isLoading: isLoadingCart } = useMutation({
    mutationFn: ({ data, id }) => updateCart(data, id),
    onSuccess: () => {
      queryCline.invalidateQueries(["cart"]);
    },
  });

  const { data, isLoading } = useCart();
  const queryClient = useQueryClient();
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (id) => deleteCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      message.success("Xóa thành công");
    },
  });
  const [counts, setCounts] = useState();
  const [inputValues, setInputValues] = useState();
  useEffect(() => {
    if (data) {
      setCounts(
        data?.data.map((item) => {
          return {
            id: item._id,
            quantity: item.quantity,
          };
        })
      );
      setInputValues(
        data?.data.map((item) => {
          return {
            id: item._id,
            quantity: item.quantity,
          };
        })
      );
    }
  }, [data]);
  const increaseNumber = (id) => {
    const check = counts?.find((item) => item.id === id);
    if (check) {
      const newCount = check.quantity + 1;
      const cart = {
        quantity: newCount,
      };
      mutate({ data: cart, id: check.id });
    }
  };

  const decreaseNumber = (id) => {
    const check = counts?.find((item) => item.id === id);
    if (check && check.quantity > 1) {
      const newCount = check.quantity - 1;
      const cart = {
        quantity: newCount,
      };
      mutate({ data: cart, id: check.id });
    }
  };
  const numberDirectly = (input, id) => {
    const check = counts.find((item) => item.id === id);
    if (check) {
      setInputValues({ ...check, quantity: input });

      // setInputValues({ ...inputValues } )
      // mutate({ data: cart, id: check.id });
    }
  };
  const handleBlur = (id) => {
    const check = counts.find((item) => item.id === id);

    if (check) {
      const cart = {
        quantity: inputValues.quantity,
      };
      // setInputValues({ ...inputValues } )

      mutate({ data: cart, id: check.id });
    }
  };
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
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
        {data?.data.length > 0 ? (
          <div className="row">
            <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
              <div className="m-l-25 m-r--38 m-lr-0-xl">
                <div className="wrap-table-shopping-cart">
                  <table className="table-shopping-cart">
                    <tbody>
                      <tr className="table_head">
                        <th className="column-1 " style={{ paddingLeft: 30 }}>
                          Sản phẩm
                        </th>
                        <th className="column-2" />
                        <th className="column-3">Giá</th>
                        <th className="column-4">Số lượng</th>
                        <th className="column-5">Tổng cộng</th>
                      </tr>
                      {data &&
                        data?.data.map((item, index) => (
                          <tr className="table_row" key={item._id}>
                            <td className="column-1">
                              <div
                                className=" d-flex align-items-center "
                                style={{ gap: 15 }}
                              >
                                <div
                                  className="cursor m-l--30 "
                                  onClick={() => mutateDelete(item._id)}
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
                                  src={item.product.imageUrl}
                                  alt="IMG"
                                  style={{ width: 100, marginRight: 50 }}
                                />
                              </div>
                            </td>
                            <td className="pl-8 ">
                              <Link
                                to={`/product/${item.product._id}`}
                                style={{ color: "black" }}
                              >
                                <p className="m-b-4 text-[15px] font-normal">
                                  {item.product.name}
                                </p>
                              </Link>
                            </td>
                            <td className="column-3 text-center subtotal-for-product-116 font-bold">
                              {<FormatPrice price={item.product.price} />}
                            </td>
                            <td className="column-4">
                              <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                <div
                                  className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                  onClick={() => decreaseNumber(item._id)}
                                >
                                  <i className="fs-16 zmdi zmdi-minus" />
                                </div>
                                <input
                                  className="mtext-104 cl3 txt-center num-product"
                                  type="number"
                                  disabled={isLoadingCart}
                                  onChange={(e) =>
                                    numberDirectly(e.target.value, item._id)
                                  }
                                  value={inputValues?.[index]?.quantity}
                                  onBlur={() =>
                                    handleBlur(
                                      item._id,
                                      inputValues?.[index]?.quantity
                                    )
                                  }
                                />
                                <div
                                  className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                  onClick={() => increaseNumber(item._id)}
                                >
                                  <i className="fs-16 zmdi zmdi-plus" />
                                </div>
                              </div>
                            </td>
                            <td className="column-5 font-bold">
                              <FormatPrice
                                price={item.product.price * item.quantity}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                  <div className="flex-w flex-m m-r-20 m-tb-5">
                    <Link to="/">
                      <div className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
                        <i className="fa fa-arrow-left p-r-10" />
                        Quay lại trang chủ
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
              <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                <h4 className="mtext-109 cl2 p-b-30">Tổng số</h4>
                <div className="flex-w flex-t bor12 p-b-13 items-center">
                  <div className="size-208">
                    <span className="mtext-101 cl2">Vận chuyển</span>
                  </div>
                  <div className="size-209 text-right">
                    <span className="mtext-110 cl2 ">30.000đ</span>
                  </div>
                </div>
                {voucher > 0 && (
                  <div className="flex-w flex-t bor12 p-b-13 p-t-13 items-center">
                    <div className="size-208">
                      <span className="mtext-101 cl2">Mã giảm giá</span>
                    </div>
                    <div className="size-209 text-right">
                      <span className="mtext-110 cl2 ">
                        <FormatPrice price={voucher} />
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex-w flex-t p-t-27 pb-3 bor12">
                  <div className="size-208">
                    <span className="mtext-101 cl2">Tổng cộng</span>
                  </div>
                  <div className="size-209 p-t-1 text-right">
                    <span className="mtext-110 cl2 xoa">
                      <FormatPrice
                        price={
                          voucher ? data.totalPrice - voucher : data.totalPrice
                        }
                      />
                    </span>
                  </div>
                </div>
                <div
                  onClick={() =>
                    navigate("/pay", {
                      state: {
                        totalPrice: voucher
                          ? data.totalPrice - voucher
                          : data.totalPrice,
                        voucher: voucherid,
                        voucherToal: voucher,
                      },
                    })
                  }
                  className="flex-c-m stext-101 cl0 size-107 bg3 bor1 hov-btn3 p-lr-15 trans-04 m-b-10 m-t-20 cursor"
                >
                  Tiến hành thanh toán
                </div>
                <div className="flex-w flex-t p-b-20 sale mt-3">
                  <button
                    className="flex-c-m stext-101 mb-3 size-111  bor14 hov-btn3 p-lr-15 trans-04 pointer"
                    onClick={showModal}
                  >
                    Mã Giảm Giá
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center m-t-140 m-b-100 ">
            <h3>Chưa có sản phẩm nào trong giỏ hàng </h3>
            <br />
            <Link to={"/product"} id="productLink">
              <button className="btn w-25 d-flex ml-auto mr-auto hov-btn2">
                Quay lại cửa hàng
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
}) => {
  const [check, setCheck] = useState(false);
  const [beforeVoucher, setBeforeVoucher] = useState(0);
  const [afterId, setAfterId] = useState(0);
  const { data, isLoading } = useQuery({
    queryKey: ["vouchers"],
    queryFn: getVouchers,
  });
  const date = new Date();
  const handleMessage = () => {
    message.error("Voucher đã hết hạn");
  };
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
      footer={
        <>
          <Button onClick={handleCancel}>Close</Button>
          <Button onClick={handleok}>Ok</Button>
        </>
      }
    >
      <div className="my-10">
        {data?.map((item) => (
          <div
            onClick={new Date(item.expire) < date ? handleMessage : ""}
            key={item._id}
          >
            <div
              className={`xl:w-[480px] md:w-full 
                    ${new Date(item.expire) < date && "opacity-50"}`}
            >
              <div className="d-flex justify-content-between align-items-center bor10  m-b-20">
                <div className="d-flex align-items-center">
                  <div
                    className="icon "
                    style={{ padding: "40px 20px", backgroundColor: "red" }}
                  >
                    <img
                      src="http://quang2204.000.pe/view/images/icons/logo-02.png"
                      alt=""
                      style={{ width: 100 }}
                    />
                  </div>
                  <div className="conten p-l-20 fs-20">
                    <p className={"mb-1"}>
                      Giảm tối đa <FormatPrice price={item.discount} />
                    </p>
                    <p className="text-muted text-lg">
                      Hạn sử dụng :{new Date(item.expire).toLocaleDa("vi-VN")}
                    </p>
                  </div>
                </div>
                <>
                  <div className="radio-inputs">
                    <input
                      className="input-voucher"
                      style={
                        new Date(item.expire) < date
                          ? { cursor: "no-drop" }
                          : {}
                      }
                      type="radio"
                      checked={voucherid === item._id}
                      onChange={() => handleVoucherId(item.discount, item._id)}
                      name="radio"
                      disabled={new Date(item.expire) < date}
                    />
                  </div>
                </>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
export default ShopingCart;
