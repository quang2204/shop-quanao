import { Form, Input, Select, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { usecateroryBlogs } from "../../../Hook/useCateroryBlog";
import {
  useAddBlog,
  useBlogDetail,
  useBlogDetailAdmin,
  useupdateBlog,
} from "../../../Hook/useBlog";
import useAuth from "../../../Hook/useAuth";
import { useParams } from "react-router-dom";

const UpdateBlog = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const { data, isLoading } = usecateroryBlogs();
  const { data: detailBlog, isLoading: isDetail } = useBlogDetailAdmin();
  const { mutate, isLoading: isUpdate } = useupdateBlog();
  useEffect(() => {
    form.setFieldsValue({
      title: detailBlog?.title,
      content: detailBlog?.content,
      category_blog_id: detailBlog?.category_blog_id,
      is_active: detailBlog?.is_active,
    });
  }, [detailBlog, id]);
  useEffect(() => {
    // Chỉ set ảnh mặc định nếu fileList đang rỗng (chưa có ảnh nào được chọn)
    if (detailBlog &&fileList.length === 0) {
      const image = [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: detailBlog.img_avt,
        },
      ];
      setFileList(image);
      form.setFieldsValue({
        img_avt: image,
      });
    }
  }, [detailBlog, id]);

  const { data: user } = useAuth();
  const onhandluploadimg = (e) => {
    let newFileList = [...e.fileList];

    // Cập nhật URL nếu upload thành công
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    // Cập nhật state và form
    setFileList(newFileList);
    form.setFieldsValue({ img_avt: newFileList });
  };

  const handleRemove = () => {
    setFileList([]);
    form.setFieldsValue({ img_avt: [] });
  };
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ được tải lên định dạng ảnh!");
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
    mutate({ id: detailBlog.id, data });
  };
  if (isLoading || isDetail) {
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
      <Form className="mb-3" onFinish={onSubmit} form={form}>
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
                message: "Title là bắt buộc!",
              },
              {
                min: 3,
                message: "Title phải có ít nhất 3 ký tự!",
              },
              {
                max: 255,
                message: "Title không được vượt quá 255 ký tự!",
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
                message: "Image là bắt buộc!",
              },
            ]}
          >
            <Upload
              action="https://api.cloudinary.com/v1_1/dkrcsuwbc/image/upload"
              listType="picture-card"
              data={{ upload_preset: "image1" }}
              accept="image/*"
              beforeUpload={beforeUpload}
              maxCount={1}
              fileList={fileList}
              onChange={onhandluploadimg}
              onRemove={handleRemove} // xử lý khi xoá ảnh
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
                message: "content là bắt buộc!",
              },
              {
                min: 3,
                message: "content phải có ít nhất 3 ký tự!",
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
                message: "category_blog là bắt buộc!",
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
                message: "Is_active là bắt buộc!",
              },
            ]}
          >
            <Select onChange={onChange}>
              <Select.Option value={true}>True</Select.Option>
              <Select.Option value={false}>false</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex gap-4 justify-content-end p-3 rounded-lg text-[1rem]  ">
          <button className="py-2 px-4 bg-white border-2 border-[#EBEBEB] rounded-lg border-solid text-black">
            Hủy
          </button>
          <button className="py-2 px-4 bg-white border-2 border-red-400 rounded-lg border-solid text-black">
            Lưu và ẩn
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-red-600 border-2 border-red-400 rounded-lg border-solid text-white"
          >
            Lưu và hiển thị
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateBlog;
