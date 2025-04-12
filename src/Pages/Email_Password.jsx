import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { emailPassword } from "../Apis/Api";
import { Spin, message } from "antd";
const Email_Password = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const schema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Must be a valid email "),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: emailPassword,
    onSuccess: (response, variables) => {
      message.success("Email khôi phục đã được gửi!");
      navigate("/confirmemail", {
        state: { email: variables.email }, // truyền email làm state
      });
    },
    onError: (error) => {
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
    },
  });

  const onSubmit = (value) => {
    setEmail(value.email); // giả sử value có field là email
    mutate(value);
  };

  return (
    <div className="m-t-200 container d-flex justify-content-center m-b-100">
      <form
        action=""
        className="d-flex flex-column align-items-center pos-relative"
        style={{
          boxShadow: "0 3px 10px 0 rgba(0,0,0,.14)",
          width: 500,
          height: 276,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="d-flex m-t-40">
          <Link to="?act=sign-in">
            <div className="pos-absolute " style={{ top: 40, left: 20 }}>
              <i className="fa fa-arrow-left " />
            </div>
          </Link>
          <h4 className="m-b-50 text-[1.6rem] font-medium">Đặt lại mật khẩu</h4>
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Nhập email"
            className="bor4 w-[16rem] mb-2 py-2 pl-2"
            {...register("email")}
          />
          {errors.email?.message && (
            <p id="email-error" className="text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
        <button
          className="hov-btn4 border-0"
          type="submit"
          style={{ width: "240px", height: 40 }}
        >
          {isLoading && <Spin />} Tiếp theo
        </button>
      </form>
    </div>
  );
};

export default Email_Password;
