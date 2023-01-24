import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "antd";
import GetCookie from "../hooks/getCookie";
import { GetData, GetJwtTokens, LogOut } from "../APIs";
import { useDispatch } from "react-redux";
import { SaveUserInfo } from "../services/saveUserInfo";
import { resetUser } from "../hooks/reducers/userReducer";

const HomePage = () => {
  const navigate = useNavigate();
  const [useData, setUseData] = useState<any>();
  let path = "";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const getJwtAccessToken = async () => {
    const refreshToken = await GetCookie("refreshToken");
    console.log(window.location.pathname);
    if (path === window.location.pathname) return;
    else path = window.location.pathname;
    console.log(path, window.location.pathname);

    const code = searchParams.get("code");
    console.log("code", code, "refreshToken", refreshToken);

    if (refreshToken && !code) return;

    const data = await GetJwtTokens(code!);
    const savedUserInfo = data && (await SaveUserInfo(data, dispatch));
    savedUserInfo
      ? console.log("Saved user info")
      : console.log("Failed to save user info");
    console.log(data);
    if (data) navigate("/");
    else navigate("/login");
  };

  async function getData() {
    const res: any = await GetData();
    if (res && res[0]) setUseData(res[0]);
    if (res === -1) {
      if (await LogOut()) {
        dispatch(resetUser());
        navigate("/login");
      }
    }
  }
  async function logTokens() {
    const accessToken = GetCookie("accessToken");
    const refreshToken = GetCookie("refreshToken");
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
  }
  const checkLogin = async () => {
    const path: any = window.location.pathname;
    console.log("path", path);

    if (!GetCookie("refreshToken") && path !== "/login") {
      console.log("pages index");

      const res = await getJwtAccessToken();
      console.log("🚀 ~ file: index.tsx:52 ~ checkLogin ~ res", res);
    }
  };
  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex justify-between w-2/3 mx-auto pb-6">
        <Button
          type="primary"
          onClick={() => logTokens()}
          className="text-blue-800 bg-orange-300"
        >
          Log Cookies
        </Button>
        <Button
          type="primary"
          onClick={() => getData()}
          className="text-blue-800 bg-orange-300"
        >
          Get Data
        </Button>
      </div>
      {useData && (
        <div>
          <div>{useData?.name}</div>
          <div>{useData?.email}</div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
