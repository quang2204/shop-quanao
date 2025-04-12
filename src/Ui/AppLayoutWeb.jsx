import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

import "../css/util.css";
import "../css/main.css";
import { FloatButton } from "antd";
const AppLayout = () => {
  return (
    <>
      <Header />
      
      <Outlet />
      <Footer />
      <FloatButton.BackTop />
    </>
  );
};

export default AppLayout;
