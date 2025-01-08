import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { signup } from "../Apis/Api.jsx";
import { message, Spin } from "antd";
import * as z from "zod";
import { useState } from "react";
const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const schema = z
    .object({
      email: z
        .string()
        .min(1, "Email is required")
        .email("Must be a valid email address"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
      username: z.string().min(1, "Name is required"),
      confirmPassword: z
        .string()
        .min(1, "ConfimPassword is required")
        .min(8, "ConfimPassword must be more than 8 characters")
        .max(32, "ConfimPassword must be less than 32 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const queryCline = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => signup(data),
    onSuccess: (user) => {
      queryCline.invalidateQueries(["user"], user.user);
      message.success("Thành công");
      navigate("/signin");
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="container mt-[140px] mb-[50px]  w-full ">
      <h1
        style={{ textAlign: "center", marginBottom: 30 }}
        className="text-[29px]"
      >
        Đăng Ký
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-user m-auto"
        style={{ boxShadow: "3px 4px 10px 0px #d3c5c5" }}
      >
        <div className="flex-column">
          <label>Name </label>
        </div>
        <div className="inputForm">
          <i className="fa fa-user"></i>
          <input
            type="text"
            className={`input-user ${errors.username ? "input-error" : ""}`} // Optional: add error class
            placeholder="Enter your Name"
            {...register("username")}
            disabled={isLoading}
            aria-invalid={errors.username ? "true" : "false"} // Accessibility enhancement
            aria-describedby="email-error" // Links to error message if present
          />
        </div>
        {errors.username?.message && (
          <p id="username-error" className="text-red-400">
            {errors.username.message }
          </p>
        )}
        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <i className="fa fa-envelope" />
          <input
            type="email"
            disabled={isLoading}
            className={`input-user ${errors.email ? "input-error" : ""}`} // Optional: add error class
            placeholder="Enter your Email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"} // Accessibility enhancement
            aria-describedby="email-error" // Links to error message if present
          />
        </div>
        {errors.email?.message && (
          <p id="email-error" className="text-red-400">
            {errors.email.message }
          </p>
        )}
        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm">
          <i className="fa fa-lock" />
          <input
            type={`${showPassword ? "text" : "password"}`}
            className="input-user"
            disabled={isLoading}
            id="passwords"
            {...register("password")}
            placeholder="Enter your Password"
          />
          <div className="ii" onClick={() => setShowPassword(!showPassword)}>
            <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"} `} />
          </div>
        </div>
        {errors.password?.message && (
          <p id="password-error" className="text-red-400">
            {errors.password.message }
          </p>
        )}
        <div className="flex-column">
          <label>Confirm Password </label>
        </div>
        <div className="inputForm">
          <i className="fa fa-lock" />
          <input
            type={`${showConfirmPassword ? "text" : "password"}`}
            disabled={isLoading}
            className={`input-user }`} // Optional: add error class
            placeholder="Enter your Confirm Password"
            {...register("confirmPassword")}
            aria-invalid={errors.confirmPassword ? "true" : "false"} // Accessibility enhancement
            aria-describedby="-error" // Links to error message if present
          />
          <div
            className="ii"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <i
              className={`fa ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}
            />
          </div>
        </div>
        {errors.confirmPassword?.message && (
          <p id="-error" className="text-red-400">
            {errors.confirmPassword.message }
          </p>
        )}
        <button className="button-submit" type="submit" disabled={isLoading}>
          {isLoading && <Spin />} Sign Up
        </button>
        <p className="p text-center">
          Bạn đã có tài khoản?
          <Link to={"/signin"} className="span">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
