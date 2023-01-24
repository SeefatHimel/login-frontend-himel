import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../APIs";
import { useDispatch } from "react-redux";
import { resetUser } from "../hooks/reducers/userReducer";

const LogOutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    console.log("logging out");

    if (await LogOut()) {
      dispatch(resetUser());
      navigate("/login");
    }
  };
  return (
    <Button type="primary" danger onClick={() => handleLogOut()}>
      <LogoutOutlined /> Log out
    </Button>
  );
};

export default LogOutButton;
