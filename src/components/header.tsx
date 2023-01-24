import { RootState } from "../storage/store";
import { useSelector } from "react-redux";
import { Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom";
import LogOutButton from "./logOutButton";

function Header() {
  const user = useSelector((state: RootState) => state.user.userDetails);
  const navigate = useNavigate();
  const path = window.location.pathname;
  const btnText = path === "/login" ? "Register" : "Login";

  return (
    <div className="flex justify-between items-center px-4">
      <div className="text-2xl text-blue-500 py-6">Header </div>
      {path === "/login" || path === "/registration" ? (
        <Button
          type="primary"
          danger
          onClick={() =>
            navigate(`/${path === "/login" ? "registration" : "login"}`)
          }
        >
          {btnText}
        </Button>
      ) : (
        user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {user?.picture && <Avatar src={user.picture} alt="N" />}
              {user?.name ? user?.name : "no user"}
            </div>
            <LogOutButton />
          </div>
        )
      )}
    </div>
  );
}

export default Header;
