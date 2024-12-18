import { Link } from "react-router-dom";
import UseDetailOrder from "../Hook/useDetailOrder.tsx";
import { Spin } from "antd";
import FormatPrice from "../FormatPrice.tsx";

const Bill = () => {
  const { data, isLoading } = UseDetailOrder();
  if (isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }

  return (
    <div
      className="m-t-140 container d-flex justify-content-around rows px-3"
      style={{ gap: 30 }}
    >
      <div>
        <h3 className="text-[1.75rem]">Chi tiết sản phẩm </h3>
        <table className="table m-t-30 ">
          <thead>
            <tr>
              <th scope="col" style={{ width: 500 }} className="th ">
                Sản phẩm
              </th>
              <th scope="col" className="text-right">
                Tổng
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.products.map((item: any) => (
              <tr key={item._id}>
                <th scope="row">
                  {item.productId.name.slice(0, 30) + "..."} X {item.quantity}
                  <br />
                </th>
                <td className="text-right">
                  {<FormatPrice price={item.productId.price * item.quantity} />}
                </td>
              </tr>
            ))}
            {data?.voucher?.discount && (
              <tr>
                <th scope="row">Voucher :</th>
                <td className="text-right">
                  - {<FormatPrice price={data?.voucher?.discount} />}
                </td>
              </tr>
            )}

            <tr>
              <th scope="row">Ship :</th>
              <td className="text-right">30.000 đ</td>
            </tr>
            <tr>
              <th scope="row">Phương thức thanh toán : </th>
              <td className="text-right">{data?.payment}</td>
            </tr>
            <tr>
              <th scope="row">Tổng cộng : </th>
              <td className="text-right">
                <FormatPrice price={data.totalPrice} />
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/">
          <button className="m-b-100 bor11 hov-btn3 bor10 p-l-20 p-r-20 p-t-6 p-b-6 ">
            Quay lại trang chủ
          </button>
        </Link>
      </div>
      <div className="bor4 p-l-40 p-r-110 h-25 ct">
        <h4 className="m-t-20 m-b-20 text-[1.5rem]">Cảm ơn bạn đã mua hàng</h4>
        <ul className="dh ">
          <li>
            Mã đơn hàng :<strong> DH {data.madh} </strong>
          </li>
          <li>
            Ngày :
            <strong>
              {" "}
              {new Date(data.orderDate).toLocaleDateString("vi-VN")}{" "}
            </strong>
          </li>
          <li>
            Tổng cộng :
            <strong>
              <FormatPrice price={data.totalPrice} />
            </strong>
          </li>
          <li>
            Phương thức thanh toán : <strong>{data?.payment} </strong>
          </li>
          <li>
            Trạng thái đơn hàng : <strong>{data?.status}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Bill;
