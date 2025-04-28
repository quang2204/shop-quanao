import React, { useEffect, useState } from "react";
import { Button, Modal, Pagination, Spin } from "antd";
import {
  useAddCategory,
  useCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../../../Hook/useCategory";
import { useForm } from "react-hook-form";

const Categories = () => {
  const [pageProduct, setPageProduct] = useState(1);
  const { category, isCategory } = useCategory(pageProduct);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [idDetail, setIdDetail] = useState("");
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const { mutate: updateCategory, isLoading: isUpdate } =
    useUpdateCategory(setIsModalOpenUpdate);
  const { mutate: addCategory, isLoading: isAdd } =
    useAddCategory(setIsModalOpenAdd);
  const { mutate, isLoading: isDelete } = useDeleteCategory(setIsModalOpen);
  const showModal = (id) => {
    setIdDelete(id);
    setIsModalOpen(true);
  };
  const showModalUpdate = (id) => {
    setIdUpdate(id);
    setIsModalOpenUpdate(true);
  };
  const showModalDetail = (id) => {
    setIdDetail(id);
    setIsModalOpenDetail(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };
  const handleCancelUpdate = () => {
    setIdUpdate("");
    setIsModalOpenUpdate(false);
  };

  const handleOk = () => {
    mutate(idDelete);
    setIdDelete("");
  };

  const handleCancelDetail = () => {
    setIdDetail("");
    setIsModalOpenDetail(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    reset({
      name: idUpdate.name,
      is_active: idUpdate.is_active,
    });
  }, [idUpdate]);
  const onSubmit = (data) => {
    const datares = {
      name: data.name,
      is_active: data.is_active.toLowerCase() === "true",
    };
    reset();
    addCategory(datares);
  };
  const onSubmitUpdate = (data) => {
    const datares = {
      name: data.name?.trim(), // loại bỏ khoảng trắng
      is_active:
        typeof data?.is_active === "boolean"
          ? data.is_active
          : data?.is_active?.toString().toLowerCase() === "true",
    };
    updateCategory({ id: idUpdate.id, data: datares });
    reset();
  };

  if (isCategory) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  const onShowSizeChange = (current, pageSize) => {
    setPageProduct(current);
  };
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card " id="orderList">
          <div className="card-header border-0 bg-none">
            <div className="row align-items-center gy-3 mb-3">
              <div className="col-sm "></div>
              <div className="col-sm-auto">
                <div className="d-flex gap-1 flex-wrap">
                  <button
                    type="button"
                    className=" text-white text-[0.9rem] bg-[#03A9F4] px-4 py-2 rounded-md "
                    onClick={() => setIsModalOpenAdd(true)}
                  >
                    <i className="ri-add-line align-bottom me-1" />
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body pt-0">
            <div>
              <div className="table-responsive table-card mb-1">
                <table
                  className="table table-nowrap align-middle"
                  id="orderTable"
                >
                  <thead className="text-muted table-light">
                    <tr className="text-uppercase">
                      <th className="sort" dangerouslySetInnerHTMLata-sort="id">
                        #
                      </th>
                      <th className="sort" data-sort="id">
                        Name
                      </th>
                      <th className="sort" data-sort="customer_name">
                        Active
                      </th>
                      <th className="sort" data-sort="city">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all">
                    {category?.data.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className="id">
                          <p className="fw-medium ">{item.name}</p>
                        </td>
                        <td
                          className="customer_name"
                          style={{
                            color: item.is_active ? "green" : "red",
                          }}
                        >
                          {item.is_active ? "Active" : "Block"}
                        </td>

                        <td>
                          <ul className="list-inline hstack gap-2 mb-0">
                            <li className="list-inline-item">
                              <div
                                className="text-primary d-inline-block"
                                onClick={() => showModalDetail(item)}
                              >
                                <i className="ri-eye-fill fs-16" />
                              </div>
                            </li>
                            <li className="list-inline-item edit">
                              <div
                                className="text-primary d-inline-block edit-item-btn"
                                onClick={() => showModalUpdate(item)}
                              >
                                <i className="ri-pencil-fill fs-16" />
                              </div>
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
              {/* <div className="d-flex justify-content-end">
                <div className="pagination-wrap hstack gap-2">
                  <a className="page-item pagination-prev disabled" href="#">
                    Previous
                  </a>
                  <ul className="pagination listjs-pagination mb-0" />
                  <a className="page-item pagination-next" href="#">
                    Next
                  </a>
                </div>
              </div> */}
              <Pagination
                showSizeChanger
                onChange={onShowSizeChange}
                current={category.current_page}
                total={category.total}
                pageSize={category.per_page}
                align="center"
              />
            </div>
          </div>
        </div>
      </div>
      {/* //Modal delete */}
      <Modal
        open={isModalOpen}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={isDelete}
          >
            {isDelete && <Spin size="small" className="mr-2" />}
            OK
          </Button>,
        ]}
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
      {/* // Modal add */}
      <Modal
        open={isModalOpenAdd}
        title="Add Category"
        footer={[
          <Button key="back" onClick={handleCancelAdd}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={isAdd}
          >
            {isAdd && <Spin size="small" className="mr-2" />}
            OK
          </Button>,
        ]}
        // className="modal fade zoomIn"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-none">
            <form className="tablelist-form">
              <div className="">
                <div className="mb-1">
                  <label htmlFor="customername-field" className="form-label">
                    Categorie Name
                  </label>
                  <input
                    type="text"
                    id="customername-field"
                    className="form-control"
                    placeholder="Enter categorie name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="text-red-500 mb-1">
                  {errors.name && "Please enter a customer name."}
                </div>
                <div className="mb-3">
                  <label htmlFor="email-field" className="form-label">
                    Is_Active
                  </label>
                  <select
                    id="email-field"
                    className="form-select"
                    aria-label="Default select example"
                    {...register("is_active", { required: true })}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Block</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {/* //update */}
      <Modal
        open={isModalOpenUpdate}
        title="Add Category"
        footer={[
          <Button key="back" onClick={handleCancelUpdate}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit(onSubmitUpdate)}
            disabled={isUpdate}
          >
            {isUpdate && <Spin size="small" className="mr-2" />}
            OK
          </Button>,
        ]}
        // className="modal fade zoomIn"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-none">
            <form className="tablelist-form">
              <div className="">
                <div className="mb-1">
                  <label htmlFor="customername-field" className="form-label">
                    Categorie Name
                  </label>
                  <input
                    type="text"
                    id="customername-field"
                    className="form-control"
                    placeholder="Enter categorie name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="text-red-500 mb-1">
                  {errors.name && "Please enter a customer name."}
                </div>
                <div className="mb-3">
                  <label htmlFor="email-field" className="form-label">
                    Is_Active
                  </label>
                  <select
                    id="email-field"
                    className="form-select"
                    aria-label="Default select example"
                    {...register("is_active", { required: true })}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Block</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {/*detail*/}
      <Modal
        open={isModalOpenDetail}
        onOk={handleCancelDetail}
        onCancel={handleCancelDetail}
        title="Detail Category"
        // className="modal fade zoomIn"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-none">
            <form className="tablelist-form">
              <div className="">
                <div className="mb-1">
                  <label htmlFor="customername-field" className="form-label">
                    Categorie Name : {idDetail.name}
                  </label>
                </div>
                <div className="text-red-500 mb-1">
                  {errors.name && "Please enter a customer name."}
                </div>
                <div className="mb-3">
                  <label htmlFor="email-field" className="form-label">
                    Is_Active :{" "}
                    {idDetail.is_active === true ? "Đang hiện thị" : "Đang ẩn"}
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;
