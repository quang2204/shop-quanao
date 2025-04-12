import React from "react";

const ResetPassword = () => {
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
      >
        <div className="d-flex m-t-40">
          <a href="?act=sign-in">
            <div className="pos-absolute " style={{ top: 40, left: 20 }}>
              <i className="fa fa-arrow-left " />
            </div>
          </a>
          <h4 className="m-b-50 text-[1.6rem] font-medium">Đặt lại mật khẩu</h4>
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Nhập email"
            className="bor4 w-[16rem] mb-2 py-2 pl-2"
            // {...register("email")}
          />
          {/* {errors.email?.message && (
            <p id="email-error" className="text-red-400">
              {errors.email.message}
            </p>
          )} */}
        </div>
        <button
          className="hov-btn4 "
          type="submit"
          style={{ width: "240px", height: 40 }}
        >
          Tiếp theo
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
