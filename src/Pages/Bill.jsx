import { Link, useParams } from "react-router-dom";
import { UseDetailOrder } from "../Hook/useOrder.jsx";
import { Spin } from "antd";
import { FormatDate, FormatDateTime, FormatPrice } from "../Format.jsx";

const Bill = () => {
  const { id } = useParams();

  const { data, isLoading } = UseDetailOrder(id);
  if (isLoading || !data || (Array.isArray(data) && data.length === 0)) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full"
      />
    );
  }
  const getOrderStatus = (status) => {
    const statusMapping = {
      1: "Chờ xử lý",
      2: "Đang xử lý",
      3: "Đang vận chuyển",
      4: "Đã giao hàng",
      5: "Hoàn thành",
      6: "Đã hủy",
      7: "Trả hàng",
      8: "Hoàn tiền",
    };

    return statusMapping[status] || "Trạng thái không xác định";
  };
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
            {data?.map((item) => (
              <tr key={item.id}>
                <th scope="row">
                  {item.product_variant.product.name.slice(0, 30) + "..."} X{" "}
                  {item.quantity}
                  <br />
                </th>
                <td className="text-right">
                  {
                    <FormatPrice
                      price={item.product_variant.price * item.quantity}
                    />
                  }
                </td>
              </tr>
            ))}
            {data[0]?.order?.voucher?.discount && (
              <tr>
                <th scope="row">Voucher :</th>
                <td className="text-right">
                  - {<FormatPrice price={data[0].order.voucher.discount} />}
                </td>
              </tr>
            )}

            <tr>
              <th scope="row">Ship :</th>
              <td className="text-right">30.000 đ</td>
            </tr>
            <tr>
              <th scope="row">Phương thức thanh toán : </th>
              {data[0]?.order.payment_method && (
                <td className="text-right">{data[0].order.payment_method}</td>
              )}
            </tr>
            <tr>
              <th scope="row">Tổng cộng : </th>
              {data[0]?.order?.total_amount && (
                <td className="text-right">
                  <FormatPrice price={data[0].order.total_amount} />
                </td>
              )}
            </tr>
          </tbody>
        </table>
        <Link to="/">
          <button className="m-b-100 bor11 hov-btn3 bor10 p-l-20 p-r-20 p-t-6 p-b-6 ">
            Quay lại trang chủ
          </button>
        </Link>
      </div>
      <div className="bor4 p-l-40 p-r-110 h-25 ct mb-4">
        <h4 className="m-t-20 m-b-20 text-[1.5rem]">Cảm ơn bạn đã mua hàng</h4>
        <ul className="dh ">
          <li>
            Mã đơn hàng :
            <strong style={{ textTransform: "uppercase" }} className="ml-1">
              {data[0]?.order.order_code && data[0]?.order.order_code}
            </strong>
          </li>
          <li>
            Ngày :
            <strong className="ml-1">
              {data[0]?.order.created_at && (
                <span>
                  <span className="mr-1">
                    <FormatDate date={data[0]?.order.created_at} />
                  </span>
                  <FormatDateTime dateString={data[0]?.order.created_at} />
                </span>
              )}
            </strong>
          </li>
          <li>
            Tổng cộng :
            <strong className="ml-1">
              {data[0]?.order.total_amount && (
                <FormatPrice price={data[0].order.total_amount} />
              )}
            </strong>
          </li>
          <li>
            Phương thức thanh toán :{" "}
            <strong style={{ textTransform: "uppercase" }}>
              {data[0]?.order.payment_method && data[0]?.order.payment_method}
            </strong>
          </li>
          <li>
            Trạng thái đơn hàng :{" "}
            <strong style={{ textTransform: "uppercase" }}>
              {data[0]?.order.status && getOrderStatus(data[0]?.order.status)}
            </strong>
          </li>
          <li>
            Trạng thái thanh toán :
            <strong style={{ textTransform: "uppercase" }} className="ml-1">
              {data[0]?.order.payment_status && data[0]?.order.payment_status}
            </strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Bill;
