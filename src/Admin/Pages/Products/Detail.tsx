import useDetailProduct from "../../../Hook/useDetailProduct.tsx";
import { Spin, Table } from "antd";

const Detail = () => {
  const { detailProduct, isDetailProduct } = useDetailProduct();
  if (isDetailProduct) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <div>
      <h1 className="text-3xl">Detail</h1>
    </div>
  );
};

export default Detail;
