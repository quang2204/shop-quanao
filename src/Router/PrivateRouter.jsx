import { Navigate } from "react-router-dom";

const PrivateRouter = (props) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/signin" />;
  }
  return <div>{props.children}</div>;
};

export default PrivateRouter;
