import React, { useState } from "react";
import { Button, Modal } from "antd";
const Model = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Thêm sản phẩm thành công"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
};
export default Model;
