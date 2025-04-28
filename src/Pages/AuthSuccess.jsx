import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("auth_token",JSON.stringify(token) ); // Lưu token vào localStorage
      navigate("/"); // Chuyển hướng đến trang chính
    } else {
      navigate("/login?error=missing_token"); // Nếu không có token, quay về trang login
    }
  }, [navigate]);

  return <p>Verifying, please wait...</p>;
};

export default AuthSuccess;
