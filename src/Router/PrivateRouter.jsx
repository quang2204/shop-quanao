import { Navigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import { Spin } from "antd";

const PrivateRouter = (props) => {
  const { data, isLoading } = useAuth();
  if (isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  if (data.role !== "admin") {
    return <Navigate to="/signin" />;
  }
  return <div>{props.children}</div>;
};

export default PrivateRouter;
