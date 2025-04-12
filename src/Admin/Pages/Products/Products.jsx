import { useDeleteProduct, useProduct } from "../../../Hook/useProduct.jsx";
import { Image, Modal, Pagination, Spin } from "antd";
import { FormatDate, FormatDateTime, FormatPrice } from "../../../Format.jsx";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";
import Emptys from "../../Ui/Emty.jsx";
const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page")) || 1;
  const [id, setId] = useState("");
  const [sorttype, setSorttype] = useState(1);
  const [pageProduct, setPageProduct] = useState(1);
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const search = searchParam.get("search");
  const sort = searchParam.get("sort");
  const { isProducts, products } = useProduct(page, {
    sort,
    search,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const { mutate, isLoading } = useDeleteProduct(() => {
    // setOpen(false);
    setId("");
  });
  const showModal = (id) => {
    setIdDelete(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
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
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value.trim();
      const updateValue = new URLSearchParams(searchParam.toString());
      updateValue.set("search", value);
      navigate(`?${updateValue.toString()}`);
    }
  };
  const handleSort = () => {
    const updatedParams = new URLSearchParams(searchParam.toString());
    updatedParams.delete("sort");
    if (sorttype === 1) {
      setSorttype(2);
      updatedParams.set("sort", "1");
    } else {
      setSorttype(1);
      updatedParams.set("sort_price", "");
    }

    navigate(`?${updatedParams.toString()}`);
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
    <div className="row mx-2">
      <div className="col-lg-12">
        {products?.data.data.length > 0 ? (
          <div className="card" id="orderList">
            <div className="card-header border-0 bg-none">
              <div className="row align-items-center gy-3">
                <div className="col-sm pl-2">
                  <form>
                    <div className="row g-3">
                      <div className="col-xxl-5 col-sm-5">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control search"
                            placeholder="Search for product ..."
                            onKeyDown={(e) => handleSearch(e)}
                          />
                          <i className="ri-search-line search-icon" />
                        </div>
                      </div>
                    </div>
                    {/*end row*/}
                  </form>
                </div>
                <div className="col-sm-auto">
                  <div className="d-flex gap-1 flex-wrap">
                    <Link
                      to="/admin/addproduct"
                      type="button"
                      className="text-white text-[0.9rem] bg-[#03A9F4] px-4 py-2 rounded-md "
                    >
                      Add product
                    </Link>
                    <button
                      className="btn btn-soft-danger"
                      id="remove-actions"
                      onclick="deleteMultiple()"
                    >
                      <i className="ri-delete-bin-2-line" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body pt-0">
              <div>
                <div className="table-responsive table-card mb-1 mt-3">
                  <table
                    className="table table-nowrap align-middle"
                    id="orderTable"
                  >
                    <thead className="text-muted table-light bg-white">
                      <tr className="text-uppercase ">
                        <th>#</th>
                        <th>Name</th>
                        <th>Product Date</th>
                        <th className="sort" onClick={() => handleSort()}>
                          Price
                        </th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {products?.data.data.map((item, index) => (
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
                              <li
                                className="list-inline-item"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="View"
                              >
                                <Link
                                  to={`/admin/product_detail/${item.id}`}
                                  className="text-primary d-inline-block"
                                >
                                  <i className="ri-eye-fill fs-16" />
                                </Link>
                              </li>
                              <li className="list-inline-item edit">
                                <Link
                                  to={`/admin/uppdateproduct/${item.id}`}
                                  data-bs-toggle="modal"
                                  className="text-primary d-inline-block edit-item-btn"
                                >
                                  <i className="ri-pencil-fill fs-16" />
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <div
                                  className="text-danger d-inline-block remove-item-btn"
                                  onClick={() => showModal(item.id)}
                                >
                                  <i className="ri-delete-bin-5-fill fs-16"></i>
                                </div>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="noresult" style={{ display: "none" }}>
                    <div className="text-center">
                      <lord-icon
                        src="https://cdn.lordicon.com/msoeawqm.json"
                        trigger="loop"
                        colors="primary:#405189,secondary:#0ab39c"
                        style={{ width: 75, height: 75 }}
                      />
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted">
                        We've searched more than 150+ Orders We did not find any
                        orders for you search.
                      </p>
                    </div>
                  </div>
                </div>
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
        ) : (
          <Emptys />
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
      </div>
      {/*end col*/}
    </div>
  );
};

export default Products;
