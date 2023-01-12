import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../APIs";

const LogOutButton = () => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    if (await LogOut()) navigate("/login");
  };
  return (
    <Button
      type="primary"
      danger
      className="fixed right-2 top-2"
      onClick={() => handleLogOut()}
    >
      <LogoutOutlined /> Log out
    </Button>
  );
};

export default LogOutButton;
