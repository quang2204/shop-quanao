import { Link, useLocation, useParams } from "react-router-dom";
import { UseDetailOrder, useOrderUpdate } from "../Hook/useOrder.jsx";
import { Spin } from "antd";
import { FormatDate, FormatDateTime, FormatPrice } from "../Format.jsx";
import { useEffect } from "react";

const Bill = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { mutate } = useOrderUpdate();
  const resultCode = queryParams.get("resultCode");
  useEffect(() => {
    // Check if resultCode exists before running the effect
    if (resultCode !== null) {
      if (resultCode == 0) {
        mutate({
          id: id,
          data: {
            payment_status: "paid",
          },
        });
      } else {
        mutate({
          id: id,
          data: {
            payment_status: "paid",
          },
        });
      }
    }
  }, [id, resultCode]); // Add resultCode to the dependency array

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
      1: "Pending processing",
      2: "Processing",
      3: "In transit",
      4: "Delivered",
      5: "Complete",
      6: "Canceled",
      7: "Returns",
      8: "Refund",
    };

    return statusMapping[status] || "Status Unknown";
  };
  return (
    <div
      className="m-t-140 container d-flex justify-content-around rows px-3"
      style={{ gap: 30 }}
    >
      <div>
        <h3 className="text-[1.75rem]">Product details </h3>
        <table className="table m-t-30 ">
          <thead>
            <tr>
              <th scope="col" style={{ width: 500 }} className="th ">
                Product
              </th>
              <th scope="col" className="text-right">
                Total
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
                  <div className="flex gap-2">
                    <div>
                      Color:{" "}
                      <span className="text-gray-500">
                        {item.product_variant.color.name}
                      </span>{" "}
                    </div>
                    <div>
                      Size:{" "}
                      <span className="text-gray-500">
                        {item.product_variant.size.name}
                      </span>{" "}
                    </div>
                  </div>
                </th>
                <td className="text-right">
                  {
                    <FormatPrice
                      price={item.product_variant.price_sale * item.quantity}
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
              <th scope="row">Payment method : </th>
              {data[0]?.order.payment_method && (
                <td className="text-right">{data[0].order.payment_method}</td>
              )}
            </tr>
            <tr>
              <th scope="row">Total : </th>
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
          Back to home page
          </button>
        </Link>
      </div>
      <div className="bor4 p-l-40 p-r-110 h-25 ct mb-4">
        <h4 className="m-t-20 m-b-20 text-[1.5rem]">Thank you for your purchase.</h4>
        <ul className="dh ">
          <li>
          Order code :
            <strong style={{ textTransform: "uppercase" }} className="ml-1">
              {data[0]?.order.order_code && data[0]?.order.order_code}
            </strong>
          </li>
          <li>
          Day :
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
            Total :
            <strong className="ml-1">
              {data[0]?.order.total_amount && (
                <FormatPrice price={data[0].order.total_amount} />
              )}
            </strong>
          </li>
          <li>
          Payment method :{" "}
            <strong style={{ textTransform: "uppercase" }}>
              {data[0]?.order.payment_method && data[0]?.order.payment_method}
            </strong>
          </li>
          <li>
          Order Status :{" "}
            <strong style={{ textTransform: "uppercase" }}>
              {data[0]?.order.status && getOrderStatus(data[0]?.order.status)}
            </strong>
          </li>
          <li>
          Payment Status :
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
