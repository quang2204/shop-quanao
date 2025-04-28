import React, { useState } from "react";
import { Modal, Spin } from "antd";
import {
  useCategoryTrashed,
  useForcedeleteCategory,
  useRestoreCategory,
} from "../../../Hook/useCategory";
const HarddeleteCategories = () => {
  const { category, isCategory } = useCategoryTrashed();
  const { mutate: restoreCategory } = useRestoreCategory();
  const { mutate: forcedelete } = useForcedeleteCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [isModalOpendelete, setIsModalOpendelete] = useState(false);
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
    restoreCategory(idDelete);
    setIsModalOpendelete(false);
  };
  const handleCancel = () => {
    setIdDelete("");
    setIsModalOpen(false);
  };
  const handleOk = () => {
    forcedelete(idDelete);
    setIsModalOpen(false);
  };
  if (isCategory) {
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
        <div className="card " id="orderList">
          <div className="card-header border-0 bg-none">
            <div className="row align-items-center gy-3 mb-8"></div>
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
                      <th>#</th>
                      <th data-sort="id">Name</th>
                      <th data-sort="customer_name">Active</th>
                      <th data-sort="city">Action</th>
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
              </div>
            </div>
          </div>
        </div>
      </div>
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
  );
};

export default HarddeleteCategories;
