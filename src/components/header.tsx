import LogOutButton from "./logOut";
import { RootState } from "../storage/store";
import { useSelector } from "react-redux";
import { Avatar, Button } from "antd";
import GetCookie from "../hooks/getCookie";

function Header() {
  const user = useSelector((state: RootState) => state.user.userDetails);

  return (
    <div className="flex justify-between items-center px-4">
      <div className="text-2xl text-blue-500 py-6">Header </div>
      {user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {user?.picture && <Avatar src={user.picture} alt="N" />}
            {user?.name ? user?.name : "no user"}
          </div>
          <LogOutButton />        
        </div>
      )}
    </div>
  );
}

export default Header;
