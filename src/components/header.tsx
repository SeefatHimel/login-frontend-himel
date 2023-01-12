import GetCookie from "../hooks/getCookie";
import LogOutButton from "./logOut";
import { useEffect, useState } from "react";

function Header() {
  const [user, setUser] = useState(GetCookie("user"));
  console.log(user, GetCookie("user"));

  useEffect(() => {
    if (user !== GetCookie("user")) {
      console.log(user, GetCookie("user"));

      setUser(GetCookie("user"));
    }
  }, [user, GetCookie("user")]);
  return (
    <div className="flex justify-between items-center px-4">
      <div className="text-2xl text-blue-500 py-6">Header </div>
      <div>
        {user ? user : "no user"}
        <LogOutButton />
      </div>
    </div>
  );
}

export default Header;
