import {
  harddeleteProducts,
  useforceDeleteProduct,
  userestoreProduct,
} from "../../../Hook/useProduct.jsx";
import { Empty, Image, Modal, Pagination, Spin } from "antd";
import { FormatDate, FormatPrice } from "../../../Format.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const Harddelete = () => {
  const navigate = useNavigate();
  const { isProducts, products } = harddeleteProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
  const { mutate, isLoading } = useforceDeleteProduct(() => {
    // setOpen(false);
    setIdDelete("");
  });
  const { mutate: mutaRestore, isLoading: isRestore } = userestoreProduct(
    () => {
      // setOpen(false);
      setIdDelete("");
    }
  );
  const showModal = (id) => {
    setIdDelete(id);
    setIsModalOpen(true);
  };
  const showRestore = (id) => {
    setIdDelete(id);
    setIsModalOpendelete(true);
  };
  const handleCancelRestore = () => {
    setIdDelete("");
    setIsModalOpendelete(false);
  };
  const handleOkRestore = () => {
    mutaRestore(idDelete);
    setIsModalOpendelete(false);
  };
  const handleCancel = () => {
    setIdDelete("");
    setIsModalOpen(false);
  };
  const handleOk = () => {
    mutate(idDelete);
    setIsModalOpen(false);
  };
  const onShowSizeChange = (current, pageSize) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", current);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  if (isProducts) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <div className="row">
      <div className="col-lg-12">
        {products?.data.length > 0 ? (
          <div className="card" id="orderList">
            <div className="card-body pt-0">
              <div>
                <div className="table-responsive table-card mb-1 mt-3 overflow-hidden">
                  <table
                    className="table table-nowrap align-middle"
                    id="orderTable"
                  >
                    <thead className="text-muted table-light bg-white">
                      <tr className="text-uppercase ">
                        <th>#</th>
                        <th>Name</th>
                        <th>Product Date</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {products?.data.map((item, index) => (
                        <tr key={index}>
                          <td className="id">
                            <div className="fw-medium">{index + 1}</div>
                          </td>
                          <td className="customer_name">
                            <Link
                              to={`/admin/product_detail/${item.id}`}
                              className="fw-medium "
                            >
                              {item.name.length > 30
                                ? item.name.slice(0, 30) + "..."
                                : item.name}
                            </Link>
                          </td>

                          <td className="datetext-center">
                            {<FormatDate date={item.created_at} />}
                          </td>
                          <td className="amount">
                            {
                              <FormatPrice
                                price={item.variants_min_price_sale}
                              />
                            }
                          </td>
                          <td>
                            <Image
                              width={80}
                              src={item.img_thumb}
                              alt="product"
                            />
                          </td>
                          <td className="status">
                            <span
                              className={`badge ${item.is_active === true ? "text-green-500" : "text-red-500"} text-uppercase`}
                            >
                              {item.is_active === true ? "Active" : "Block"}
                            </span>
                          </td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li className="list-inline-item">
                                <div
                                  className="text-danger d-inline-block remove-item-btn"
                                  onClick={() => showModal(item.id)}
                                >
                                  <i className="ri-delete-bin-5-fill fs-16"></i>
                                </div>
                              </li>
                              <li className="list-inline-item cursor-pointer">
                                <div
                                  className="text-danger d-inline-block remove-item-btn"
                                  onClick={() => showRestore(item.id)}
                                >
                                  <img
                                    src="https://media-public.canva.com/RAeJ8/MAEy_-RAeJ8/1/tl.png"
                                    alt="restore"
                                    width={30}
                                  />
                                </div>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Pagination
                    showSizeChanger
                    onChange={onShowSizeChange}
                    current={products.data.current_page}
                    total={products.data.total}
                    pageSize={products.data.per_page}
                    align="center"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Empty />
        )}

        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}

          // className="modal fade zoomIn"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-none">
              <div className="modal-body">
                <div className="mt-2 text-center ">
                  <div className="flex justify-center">
                    <img
                      src="https://media-public.canva.com/de2y0/MAFqwzde2y0/1/tl.png"
                      alt=""
                      width={100}
                    />
                  </div>
                  <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                    <h4>Are you sure ?</h4>
                    <p className="text-muted mx-4 mb-0">
                      Are you sure you want to remove this record ?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={isModalOpendelete}
          onOk={handleOkRestore}
          onCancel={handleCancelRestore}

          // className="modal fade zoomIn"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-none">
              <div className="modal-body">
                <div className="mt-2 text-center ">
                  <div className="flex justify-center">
                    <img
                      src="https://media-public.canva.com/IgIvI/MAE5CbIgIvI/1/tl.png"
                      alt=""
                      width={100}
                    />
                  </div>
                  <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                    <h4>Are you sure ?</h4>
                    <p className="text-muted mx-4 mb-0">
                      Are you sure you want to restore this record?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      {/*end col*/}
    </div>
  );
};

export default Harddelete;
