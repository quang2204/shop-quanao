import { useProducts } from "../../../Hook/useProduct.jsx";
import { Button, Image, Spin, Table } from "antd";
import FormatPrice from "../../../FormatPrice.jsx";
import { Link } from "react-router-dom";

const Products = () => {
  const { isProducts, products } = useProducts();
  const columns = [
    {
      title: "Stt",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (text) => <a>{text.slice(0, 30) + "..."}</a>,
    },
    {
      title: "Price",
      key: "name",
      dataIndex: "price",
      render: (text) => <FormatPrice price={text} />,
    },
    {
      title: "Category",
      key: "caterori",
      dataIndex: "caterori",
      render: (caterori) => caterori.name,
    },
    {
      title: "Image",
      key: "Image",
      dataIndex: "imageUrl",
      render: (text) => (
        <Image src={text} width={100} className="rounded-2xl" alt="" />
      ),
    },
    {
      title: "description",
      key: "description",
      dataIndex: "description",
      render: (text) => <a>{text.slice(0, 30) + "..."}</a>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text) => (
        <div className="flex gap-2">
          <Button type="primary" style={{ marginRight: "10px" }}>
            Update
          </Button>
          <Button
            color="danger"
            variant="dashed"
            style={{ marginRight: "10px" }}
          >
            Delete
          </Button>
          <Link to={`detailproduct/${text._id}`}>
            <Button type="dashed">Detail</Button>
          </Link>
        </div>
      ),
    },
  ];
  if (isProducts) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <div>
      <div className={"flex justify-content-end px-3 py-3"}>
        <Link to="addproduct">
          <Button type="primary">Add Product</Button>
        </Link>
      </div>

      <Table dataSource={products} columns={columns}></Table>
    </div>
  );
};

export default Products;
