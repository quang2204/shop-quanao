import { Spin, message } from "antd";
import { UseDetailUser } from "../Hook/useDetailUser";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { updatePassword } from "../Apis/Api";
const UpdatePassWord = () => {
  const { data, isLoading } = UseDetailUser();
  const schema = z
    .object({
      current_password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
      new_password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
      new_password_confirmation: z
        .string()
        .min(1, "ConfimPassword is required")
        .min(8, "ConfimPassword must be more than 8 characters")
        .max(32, "ConfimPassword must be less than 32 characters"),
    })
    .refine((data) => data.new_password === data.new_password_confirmation, {
      message: "Passwords do not match",
      path: ["new_password_confirmation"],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutate, isLoading: isLoading1 } = useMutation({
    mutationFn: (data) => updatePassword(data),
    onSuccess: () => {
      message.success("Successful change password");
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  const onSubmit = (data) => {
    mutate(data);
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
    <div className="container m-t-150 p-b-60 d-flex justify-content-between rounded-md">
      <div>
        <div className="d-flex m-b-30 p-b-10" style={{ gap: 15 }}>
          <img
            src={data.avatar}
            alt=""
            style={{ maxWidth: 60, height: 60, borderRadius: "50%" }}
          />
          <div className="name">
            <span>
              <strong>{data.name} </strong>
              <Link to="/profile">
                <p style={{ color: "black" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: 15 }}
                    viewBox="0 0 512 512"
                    className="op-06 m-r-3"
                  >
                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                  </svg>
                  Sửa hồ sơ
                </p>
              </Link>
            </span>
          </div>
        </div>
        <div className="user">
          <h5>
            <i className="fa fa-user" style={{ color: "blue" }} /> My Account
          </h5>
        </div>
        <div className="dropdown p-l-16 m-t-15">
          <div className="m-b-15">
            <Link to="/portfolio">
              <span>Profile</span>
            </Link>
          </div>
          <div className="m-b-20  ">
            <Link to="">
              <span>Change password</span>
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
      </div>{" "}
      <form
        className="m-b-50 d-flex align-items-center bor4 p-b-30 p-t-30 m-lr-auto p-r-30 p-l-30 p-t-30 p-b-30"
        style={{ boxShadow: "1px 0px 10px 1px #bab5b5", gap: 30, width: 800 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bor6">
          <div className="p-b-30 bor12">
            <h2 className="m-b-10 text-3xl font-medium">Change password</h2>
            <p>
            To keep your account secure, please do not share your password with others.
            </p>
          </div>
          <div className="hs m-t-40">
            <div
              className="d-flex align-items-center m-b-30"
              style={{ gap: 38 }}
            >
              <h6 style={{ fontSize: 16, color: "rgba(0, 0, 0, .65)" }}>
              Current Password{" "}
              </h6>
              <input
                type="password"
                className="bor4 xl:w-[320px] p-t-7  p-l-10 pb-2"
                disabled={isLoading1}
                {...register("current_password")}
              />
            </div>
            {errors.current_password && (
              <p className="text-red-600">{errors.current_password.message}</p>
            )}
            <div className="m-b-30"></div>
            <div
              className="d-flex align-items-center m-b-30"
              style={{ gap: 60 }}
            >
              <h6 style={{ fontSize: 16, color: "rgba(0, 0, 0, .65)" }}>
              New Password
              </h6>
              <input
                type="password"
                disabled={isLoading1}
                {...register("new_password")}
                className="bor4 p-t-7 p-l-10 xl:w-[320px] pb-2"
              />
            </div>
            {errors.new_password && (
              <p className="text-red-600">{errors.new_password.message}</p>
            )}
            <div className="m-b-30"></div>

            <div
              className="d-flex align-items-center m-b-30"
              style={{ gap: 20 }}
            >
              <h6 style={{ fontSize: 16, color: "rgba(0, 0, 0, .65)" }}>
              Confirm Password
              </h6>
              <input
                type="password"
                disabled={isLoading1}
                {...register("new_password_confirmation")}
                className="bor4 p-t-7 xl:w-[320px] p-b-7 p-l-10 "
              />
            </div>
            {errors.new_password_confirmation && (
              <p className="text-red-600">
                {errors.new_password_confirmation.message}
              </p>
            )}
            <div className="m-b-30"></div>

            <button
              type="submit"
              className="hov-btn5 m-t-10 bg-red-600 "
              style={{ width: "30%", height: 40, marginLeft: 165 }}
              disabled={isLoading1}
            >
              {isLoading1 ? (
                <Spin
                  size="small"
                  className="flex items-center justify-center"
                />
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassWord;
