import { useDeleteProduct, useProducts } from "../../../Hook/useProduct.jsx";
import { Button, Image, Spin, Table } from "antd";
import FormatPrice from "../../../FormatPrice.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
const Products = () => {
  const { isProducts, products } = useProducts();
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useDeleteProduct(() => {
    setOpen(false);
    setId("");
  });
  const openModal = (id) => {
    setOpen(true);
    setId(id);
  };
  const deleteProduct = () => {
    mutate(id);
  };
  const closeModal = () => {
    setOpen(false);
    setId("");
  };
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
            onClick={() => openModal(text._id)}
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
      <div
        className={`modal fade ${open ? "block" : ""} opacity-100`}
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, 30%)",
            }}
          >
            <div className="modal-header bg-light p-3">
              <button
                type="button"
                className="btn-close "
                onClick={closeModal}
                disabled={isLoading}
              />
            </div>
            <div className="modal-body">
              <div className="mt-2 text-center">
                <div className="max-w-[12rem] canva m-auto">
                  <img
                    src="https://media-public.canva.com/de2y0/MAFqwzde2y0/1/tl.png"
                    alt=""
                  />
                </div>
                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                  <h4>Are you sure ?</h4>
                  <p className="text-muted mx-4 mb-0">
                    Are you sure you want to remove this Notification ?
                  </p>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                <button
                  type="button"
                  className="px-3 py-2 bg-[#f3f6f9] rounded-md text-[0.99rem]"
                  onClick={closeModal}
                  disabled={isLoading}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="px-3 py-2 rounded-md btn-danger text-sm"
                  onClick={deleteProduct}
                  disabled={isLoading}
                >
                  {isLoading ? "Đang xóa ..." : "Xác nhận xóa"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
