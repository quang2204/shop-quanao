import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { signin } from "../Apis/Api.jsx";
import { message, Spin } from "antd";
import * as z from "zod";
import { useState } from "react";
const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const schema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Must be a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
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
    mutationFn: (data) => signin(data),
    onSuccess: (user) => {
      const expiresIn = 30 * 1000 + new Date().getTime();
      const newUser = { ...user.user, expiresIn };
      queryCline.invalidateQueries(["user"], user.user);
      message.success("Thành công");
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/");
    },
    onError: (error) => {
      message.error(error.response.data.error);
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
        Đăng Nhập
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-user m-auto"
        style={{ boxShadow: "3px 4px 10px 0px #d3c5c5" }}
      >
        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <i className="fa fa-envelope" />
          <input
            type="email"
            disabled={isLoading}
            className={`input-user`} // Optional: add error class
            placeholder="Enter your Email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"} // Accessibility enhancement
            aria-describedby="email-error" // Links to error message if present
          />
        </div>
        {errors.email?.message && (
          <p id="email-error" className="text-red-400">
            {errors.email.message}
          </p>
        )}

        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm">
          <i className="fa fa-lock" />
          <input
            disabled={isLoading}
            type={`${showPassword ? "text" : "password"}`}
            className="input-user"
            id="passwords"
            {...register("password")}
            placeholder="Enter your Password"
          />
          <div className="ii" onClick={() => setShowPassword(!showPassword)}>
            <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`} />
          </div>
        </div>
        {errors.password?.message && (
          <p id="password-error" className="text-red-400">
            {errors.password.message}
          </p>
        )}
        <div className="flex-row ">
          <div className="d-flex gap ">
            <input type="checkbox" />
            <label className="m-t-5">Nhớ mật khẩu </label>
          </div>
          <Link to={""}>
            <span className="span">Quên mật khẩu</span>
          </Link>
        </div>
        <button className="button-submit" type="submit">
          {isLoading && <Spin />} Sign In
        </button>
        <p className="p text-center">
          Bạn chưa có tài khoản?
          <Link to={"/signup"} className="span">
            Đăng ký
          </Link>
        </p>
        <p className="p line text-center">Or With</p>
        <div className="flex-row">
          <button className="btn google">
            <svg
              version="1.1"
              width={20}
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              //   style={{ enableBackground: "new 0 0 512 512" }}
              xmlSpace="preserve"
            >
              <path
                style={{ fill: "#FBBB00" }}
                d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
          c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
          C103.821,274.792,107.225,292.797,113.47,309.408z"
              />
              <path
                style={{ fill: "#518EF8" }}
                d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
          c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
          c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
              />
              <path
                style={{ fill: "#28B446" }}
                d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
          c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
          c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
              />
              <path
                style={{ fill: "#F14336" }}
                d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
          c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
          C318.115,0,375.068,22.126,419.404,58.936z"
              />
            </svg>
            Google
          </button>
          <button className="btn apple">
            <svg
              version="1.1"
              height={20}
              width={20}
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 22.773 22.773"
              //   style={{ enableBackground: "new 0 0 22.773 22.773" }}
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path
                    d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.
                  7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"
                  ></path>
                  <path
                    d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-
                  1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-
                  0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-
                  0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.
                  ,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116
                  -0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C
                  17.818,14.688,19.086,15.964,20.67,16.716z"
                  ></path>
                </g>
              </g>
            </svg>
            Apple
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
