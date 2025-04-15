import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "../css/util.css";
import "../css/main.css";
import { FloatButton } from "antd";
import ChatApp from "./Chatbot";
import { CommentOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const AppLayout = () => {
  const [show, setShow] = useState(false);
  const location = useLocation(); // theo dõi location (URL)
  const handleClick = () => {
    setShow(false);
  };
  // useEffect(() => {
  //   // Mỗi khi location (URL) thay đổi, set show về false
  //   setShow(false);
  // }, [location]);
  return (
    <>
      <Header />

      <Outlet />
      <Footer />
      {show && <ChatApp close={handleClick} />}
      {show === false && (
        <FloatButton.Group>
          <FloatButton
            onClick={() => setShow(true)}
            icon={<CommentOutlined />}
          />
          <FloatButton.BackTop />
        </FloatButton.Group>
      )}
    </>
  );
};

export default AppLayout;
