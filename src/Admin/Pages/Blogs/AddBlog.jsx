import { Form, Input, Select, Spin, Upload } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { usecateroryBlogs } from "../../../Hook/useCateroryBlog";
import { useAddBlog } from "../../../Hook/useBlog";
import useAuth from "../../../Hook/useAuth";
import { Link } from "react-router-dom";

const AddBlog = () => {
  const [fileList, setFileList] = useState([]);
  const { data, isLoading } = usecateroryBlogs();
  const { mutate, isLoading: isAddBlog } = useAddBlog();
  const { data: user } = useAuth();
  const onhandluploadimg = (e) => {
    let newFileList = [...e.fileList];

    // Nếu upload thành công, cập nhật URL
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url; // URL trả về từ server
      }
      return file;
    });

    setFileList(newFileList);
    // setImg(!img);
  };
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Upload only image formats!");
    }
    return isImage || Upload.LIST_IGNORE;
  };
  const onChange = () => {};
  const onSubmit = (value) => {
    const data = {
      title: value.title,
      img_avt: fileList[0].url,
      content: value.content,
      category_blog_id: Number(value.category_blog_id),
      user_id: user.id,
      is_active: Boolean(value.is_active),
    };
    mutate(data);
  };
  if (isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full"
      />
    );
  }
  return (
    <div
      style={{ boxShadow: " 5px 1px 12px 4px #cfcfcf" }}
      className="rounded-md "
    >
      <Form className="mb-3" onFinish={onSubmit}>
        <div className="grid grid-cols-12 gap-4 pr-5 mb-2 mt-4 pt-10 ">
          <div className="text-[1rem] col-span-2 text-right">
            <span className="text-red-500 h-[17px] ">*</span>
            Title
          </div>
          <Form.Item
            className="col-span-10"
            name="title"
            rules={[
              {
                required: true,
                message: "Title is required!",
              },
              {
                min: 3,
                message: "Title must be at least 3 characters!",
              },
              {
                max: 255,
                message: "Title must not exceed 255 characters!",
              },
            ]}
          >
            <Input size="large" placeholder="Title" className="col-span-10" />
          </Form.Item>
        </div>
        <div className="grid grid-cols-12 mb-4 gap-4 pr-5 ">
          <div className="flex gap-1  mb-2 col-span-2 justify-end">
            <span className="text-red-500 h-[17px] ">*</span>
            <div className="text-[1rem]">Image</div>
          </div>
          <Form.Item
            name="img_avt"
            className="col-span-10"
            rules={[
              {
                required: true,
                message: "Image is required!",
              },
            ]}
          >
            <Upload
              action={"https://api.cloudinary.com/v1_1/dkrcsuwbc/image/upload"}
              listType="picture-card"
              data={{
                upload_preset: "image1",
              }}
              accept="image/*"
              beforeUpload={beforeUpload}
              maxCount={5}
              onChange={(e) => onhandluploadimg(e)}
            >
              {fileList.length < 1 && (
                <button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                </button>
              )}
            </Upload>
          </Form.Item>
        </div>
        <div className="grid grid-cols-12 gap-4 pr-5  mb-2">
          <div className="text-[1rem] col-span-2 text-right">
            <span className="text-red-500 h-[17px] ">*</span>
            Content
          </div>
          <Form.Item
            className="col-span-10"
            name="content"
            rules={[
              {
                required: true,
                message: "content is required!",
              },
              {
                min: 3,
                message: "Content must be at least 3 characters!",
              },
              {
                max: 255,
                message: "Content must not exceed 255 characters!",
              },
            ]}
          >
            <TextArea
              rows={5}
              placeholder="Conten"
              style={{ resize: "none" }}
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-12 gap-4 pr-5  mb-2">
          <div className="text-[1rem] col-span-2 text-right">
            <span className="text-red-500 h-[17px] ">*</span>
            Category_blog
          </div>
          <Form.Item
            className="col-span-10"
            name="category_blog_id"
            rules={[
              {
                required: true,
                message: "category_blog is required!",
              },
            ]}
          >
            <Select onChange={onChange}>
              {data.categories.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="grid grid-cols-12 gap-4 pr-5  mb-2">
          <div className="text-[1rem] col-span-2 text-right">
            <span className="text-red-500 h-[17px] ">*</span>
            Is_active
          </div>
          <Form.Item
            className="col-span-10"
            name="is_active"
            rules={[
              {
                required: true,
                message: "Is_active is required!",
              },
            ]}
          >
            <Select onChange={onChange}>
              <Select.Option value="true">Active</Select.Option>
              <Select.Option value="false">Block</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex gap-4 justify-content-end p-3 rounded-lg text-[1rem]  ">
          <Link
            to="/admin/Blogs"
            className="py-2 px-4 bg-white border-2 border-[#EBEBEB] rounded-lg border-solid text-black"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="py-2 px-4 bg-red-600 border-2 border-red-400 rounded-lg border-solid text-white"
          >
            {isAddBlog ? <Spin /> : "Save"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddBlog;
