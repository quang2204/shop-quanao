import React from "react";
import { useLocation } from "react-router-dom";

const ConfirmResetEmail = () => {
  const location = useLocation();
  return (
    <div className="m-t-200 container d-flex justify-content-center m-b-100">
      <form
        action=""
        className="d-flex flex-column align-items-center pos-relative"
        style={{ boxShadow: "0 3px 10px 0 rgba(0,0,0,.14)", width: 500 }}
        method="post"
      >
        <div className="d-flex m-t-40">
          <a href="?act=sign-in">
            <div className="pos-absolute i" style={{ top: 40, left: 20 }}>
              <i className="fa fa-arrow-left " />
            </div>
          </a>
          <h4 className="m-b-50 text-[1.4rem] font-medium">Reset Password</h4>
        </div>
        <p className="m-b-5">Verification code has been sent to email address</p>
        <p className="text-red-500 m-b-5">{location.state.email}</p>
        <p className="m-b-40">Please verify.</p>
        <button
          className="hov-btn4 m-b-40"
          type="submit"
          style={{ width: "290px ", height: 40 }}
        >
          OK
        </button>
      </form>
    </div>
  );
};

export default ConfirmResetEmail;
