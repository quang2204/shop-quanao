import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Spin, Upload } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import UseDetailUser from "../Hook/useDetailUser";
import useUpdateUser from "../Hook/useUpdateUser";
import { list } from "postcss";
const Portfolio = () => {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

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

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancel = () => setPreviewOpen(false);
  const { data, isLoading } = UseDetailUser();
  const { mutate, isLoadingUser } = useUpdateUser();
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email("Must be a valid email address")
      .min(5, "Email is required"),
    avatar: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
      });
      setFileList([
        {
          uid: Math.random().toString(),
          url: data.avatar ? data.avatar : fileList[0]?.url,
          status: "done",
          name: data.avatar ? data.avatar : "",
        },
      ]);

      // setImg(data.avatar ? data.avatar : img)
    }
  }, [data, reset]);
  console.log(fileList);
  const onsubmit = (data) => {
    mutate({
      name: data.name,
      email: data.email,
      avatar: fileList[0]?.url,
      address: data.address,
      phone: data.phone,
    });
  };
  if (isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <div className="container m-t-150 p-b-60 d-flex ">
      <div>
        <div className="d-flex  m-b-30  p-b-10" style={{ gap: 15 }}>
          <img
            src={data?.avatar}
            alt=""
            style={{ maxWidth: 60, height: 60, borderRadius: "50%" }}
          />
          <div className="name">
            <span>
              <strong>{data?.name} </strong>
              <Link to="">
                <p style={{ color: "black" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: 15 }}
                    viewBox="0 0 512 512"
                    className="op-06 m-r-3"
                  >
                    <path
                      d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3
                    19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1
                    481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8
                    37.4-22.2L421.7 220.3
                    291.7 90.3z"
                    />
                  </svg>
                  Sửa hồ sơ
                </p>
              </Link>
            </span>
          </div>
        </div>
        <div className="user">
          <h5>
            <i className="fa fa-user" style={{ color: "blue" }} /> Tài khoản của
            tôi
          </h5>
        </div>
        <div className="dropdown p-l-16 m-t-15">
          <div className="m-b-15">
            <Link to="">
              <span>Hồ sơ</span>
            </Link>
          </div>
          <div className="m-b-20  ">
            <Link to="/verify/password">
              <span>Đổi mật khẩu</span>
            </Link>
          </div>
        </div>
        <div className="thongbao">
          <Link to="/order">
            <h5>
              <i className="fa fa-cart-arrow-down" /> Order
            </h5>
          </Link>
        </div>
      </div>
      <form
        className="d-flex justify-content-around align-items-center m-lr-auto p-[30px] w-[70%] rounded-lg"
        onSubmit={handleSubmit(onsubmit)}
        style={{ boxShadow: "1px 0px 10px 1px #bab5b5", gap: 30 }}
      >
        <div className="bor6">
          <div className="p-b-30 bor12">
            <h2 className="m-b-10 text-[1.85rem]">Hồ sơ của tôi</h2>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          </div>
          <div>
            <table>
              <tbody>
                <tr className="d-flex  m-t-37 items-center ">
                  <td className="name ">
                    <label htmlFor="name">Name</label>
                  </td>
                  <td className="name p-l-25">
                    <input
                      disabled={isLoadingUser}
                      type="text"
                      className="bor4 p-t-7 p-b-7 p-l-10 w-[300px]"
                      {...register("name")}
                    />
                  </td>
                </tr>
                {errors.name && (
                  <div className="text-red-700">{errors.name.message}</div>
                )}
                <tr className="d-flex mt-3 items-center ">
                  <td className="name ">
                    <label htmlFor="name">Email</label>
                  </td>
                  <td className="name p-l-27">
                    <input
                      disabled={isLoadingUser}
                      type="text"
                      {...register("email")}
                      className="bor4 p-t-7 p-b-7 p-l-10 w-[300px]"
                    />
                  </td>
                </tr>
                {errors.email && (
                  <div className="text-red-700">{errors.email.message}</div>
                )}
                <tr className="d-flex mt-3 items-center ">
                  <td className="name ">
                    <label htmlFor="name">Phone</label>
                  </td>
                  <td className="name p-l-21">
                    <input
                      disabled={isLoadingUser}
                      type="text"
                      className="bor4 p-t-7 p-b-7 p-l-10 w-[300px]"
                      {...register("phone")}
                    />
                  </td>
                </tr>
                <tr className="d-flex mt-3 items-center ">
                  <td className="name ">
                    <label htmlFor="name">Address</label>
                  </td>
                  <td className="name p-l-10">
                    <input
                      disabled={isLoadingUser}
                      type="text"
                      className="bor4 p-t-7 p-b-7 p-l-10 w-[300px]"
                      {...register("address")}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" disabled={isLoadingUser} className="btn">
              {isLoadingUser ? <Spin size="small" /> : "Submit"}
            </button>
          </div>
        </div>
        <div className="d-flex flex-column">
          <Upload
            action="https://api.cloudinary.com/v1_1/dkrcsuwbc/image/upload"
            listType="picture-card"
            data={{ upload_preset: "image1" }}
            onPreview={handlePreview}
            onChange={handleUpload}
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
          {/* <Image src={fileList[0].url} /> */}
        </div>
      </form>
    </div>
  );
};

export default Portfolio;
