import Index from "./components";
import { useEffect } from "react";
import GetCookie from "./hooks/getCookie";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const refreshToken = GetCookie("refreshToken");
    const path: any = window.location;
    if (!refreshToken && path !== "/login") navigate("/login");
    if (refreshToken && path === "/login") navigate("/");
  });
  return (
    <div className="bg-red-200">
      <Index />
    </div>
  );
}

export default App;
