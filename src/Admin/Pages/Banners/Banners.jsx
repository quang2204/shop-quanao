import React, { useEffect, useState } from "react";
import {
  useBanner,
  useDeleteBanner,
  useCreateBanner,
  useUpdateBanner,
} from "../../../Hook/useBanner";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  Modal,
  Spin,
  Pagination,
  message,
  Image,
  Upload,
  Select,
  Form,
  Button,
} from "antd";
import { useForm } from "react-hook-form";
const Banners = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { banner, isBanner } = useBanner(currentPage);
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [currentBannerDetail, setCurrentBannerDetail] = useState(null);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [status, setStatus] = useState();
  const { mutate: createBanner, isLoading } =
    useCreateBanner(setIsModalOpenAdd);
  const { mutate: updateBanner, isLoading: isUpdate } =
    useUpdateBanner(setIsModalOpenEdit);
  const { mutate: deleteBanner, isLoading: isDelete } =
    useDeleteBanner(setIsModalOpen);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = (value) => {
    setStatus(value);
  };
  const handleUpload = (info) => {
    let newFileList = [...info.fileList];

    // Nếu upload thành công, cập nhật URL
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Upload only image formats!");
    }
    return isImage || Upload.LIST_IGNORE;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const showModal = (id) => {
    setIdDelete(id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
    reset();
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
    setCurrentBanner(null);
    setFileList([]);
    reset();
  };

  const handleOk = () => {
    deleteBanner(idDelete);
    // setIsModalOpen(false);
  };

  const onSubmit = () => {
    if (fileList.length > 0) {
      const data = {
        image: fileList[0].url,
        is_active: status,
      };
      createBanner(data);
      setFileList([]);
    } else {
      message.error("Add photo");
    }
  };

  const showEditModal = (banner) => {
    setCurrentBanner(banner);
    setIsModalOpenEdit(true);
    setFileList([
      {
        uid: Math.random().toString(),
        url: banner.image ? banner.image : fileList[0]?.url,
        status: "done",
        name: banner.image ? banner.image : "",
      },
    ]);
  };

  const onEditSubmit = () => {
    if (fileList.length > 0) {
      const data = {
        image: fileList[0].url,
        is_active: status === undefined ? currentBanner.is_active : status,
      };
      updateBanner({
        id: currentBanner.id,
        updatedBanner: data,
      });
      setFileList([]);
    } else {
      message.error("Add photo");
    }
  };
  const showDetailModal = (banner) => {
    setCurrentBannerDetail(banner);
    setIsModalOpenDetail(true);
  };

  if (isBanner) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full"
      />
    );
  }

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card" id="orderList">
          <div className="card-header border-0 bg-none">
            <div className="row align-items-center gy-3">
              <div className="col-sm"></div>
              <div className="col-sm-auto">
                <button
                  type="button"
                  className="text-white text-[0.9rem] bg-[#03A9F4] px-4 py-2 rounded-md mb-3"
                  onClick={() => setIsModalOpenAdd(true)}
                >
                  <i className="ri-add-line align-bottom me-1" />
                  Add Banner
                </button>
              </div>
            </div>
          </div>
          <div className="card-body pt-0">
            <div className="table-responsive table-card mb-1">
              <table
                className="table table-nowrap align-middle"
                id="orderTable"
              >
                <thead className="text-muted table-light">
                  <tr className="text-uppercase">
                    <th>#</th>
                    <th>Image</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="list form-check-all">
                  {banner?.data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{(currentPage - 1) * banner.per_page + index + 1}</td>
                      <td>
                        <Image
                          src={item.image}
                          alt="Banner"
                          className="img-fluid"
                          style={{ maxHeight: "100px" }}
                        />
                      </td>
                      <td style={{ color: item.is_active ? "green" : "red" }}>
                        {item.is_active ? "Active" : "Block"}
                      </td>
                      <td>
                        <ul className="list-inline hstack gap-2 mb-0">
                          <li className="list-inline-item">
                            <div
                              className="text-primary d-inline-block edit-item-btn"
                              onClick={() => showDetailModal(item)}
                            >
                              <i className="ri-eye-fill fs-16" />
                            </div>
                          </li>
                          <li className="list-inline-item edit">
                            <div
                              className="text-primary d-inline-block edit-item-btn"
                              onClick={() => showEditModal(item)}
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
            </div>
            <div className="d-flex justify-center ">
              <Pagination
                showSizeChanger
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
                total={banner?.total}
                pageSize={banner?.per_page}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Add */}
      <Modal
        open={isModalOpenAdd}
        title="Add Banner"
        footer={[
          <Button key="back" onClick={handleCancelAdd}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading && <Spin size="small" className="mr-2" />}
            OK
          </Button>,
        ]}
      >
        <form>
          <div className="mb-3">
            <label className="form-label">Upload Banner Image</label>

            <Upload
              action="https://api.cloudinary.com/v1_1/dkrcsuwbc/image/upload"
              listType="picture-card"
              data={{ upload_preset: "image1" }}
              onPreview={handlePreview}
              onChange={handleUpload}
              beforeUpload={beforeUpload}
              fileList={fileList}
            >
              {fileList.length >= 1 ? null : (
                <button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload Image</div>
                </button>
              )}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Active</label>
            <Select
              defaultValue="true"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: true, label: "Active" },
                { value: false, label: "Block" },
              ]}
            />
          </div>
        </form>
      </Modal>

      {/* Modal Edit */}
      <Modal
        open={isModalOpenEdit}
        title="Edit Banner"
        footer={[
          <Button key="back" onClick={handleCancelEdit}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit(onEditSubmit)}
            disabled={isUpdate}
          >
            {isUpdate && <Spin size="small" className="mr-2" />}
            OK
          </Button>,
        ]}
      >
        <form>
          <div className="mb-3">
            <label className="form-label">Upload Banner Image</label>

            <Upload
              action="https://api.cloudinary.com/v1_1/dkrcsuwbc/image/upload"
              listType="picture-card"
              data={{ upload_preset: "image1" }}
              onPreview={handlePreview}
              onChange={handleUpload}
              beforeUpload={beforeUpload}
              fileList={fileList}
            >
              {fileList.length >= 1 ? null : (
                <button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload Image</div>
                </button>
              )}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Active</label>
            {currentBanner?.is_active}
            <Select
              defaultValue={currentBanner?.is_active === true ? true : false}
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: true, label: "Active" },
                { value: false, label: "Block" },
              ]}
            />
          </div>
        </form>
      </Modal>
      <Modal
        open={isModalOpenDetail}
        onCancel={() => setIsModalOpenDetail(false)}
        footer={null}
        title="Banner Details"
      >
        {currentBannerDetail && (
          <div>
            <div className="mb-3">
              <label className="form-label">Banner Image</label>
              <img
                src={currentBannerDetail.image}
                alt="Banner"
                className="img-fluid mb-3"
                style={{ maxHeight: "200px" }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Active Status</label>
              <p
                style={{
                  color: currentBannerDetail.is_active ? "green" : "red",
                }}
              >
                {currentBannerDetail.is_active ? "Active" : "Block"}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Delete */}
      <Modal
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        title="Delete Banner"
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
    </div>
  );
};

export default Banners;
