import axios from "axios";
import { toast } from "react-toastify";
import GetCookie from "../hooks/getCookie";
import { RemoveCookie, RemoveAllCookies } from "../hooks/removeCookie";
import SetCookie from "../hooks/setCookie";

const apiEndpoint = "https://login-backend-himel.onrender.com/";
// const apiEndpoint = "http://localhost:3000/";

export async function getAuthLink() {
  try {
    const response = await axios.get(apiEndpoint + "getLink");
    console.log("Auth url ", response);
    return response;
  } catch (error: any) {
    console.error(error);
    error?.response?.message &&
      toast.error(error?.response?.message, {
        containerId: "top-right",
      });
  }
}

export async function LogOut() {
  try {
    const { data } = await axios.post(apiEndpoint + "logout");
    console.log(data);

    toast.success(data.message, {
      containerId: "top-right",
    });
    RemoveAllCookies();
    return true;
  } catch (error: any) {
    return false;
  }
  // navigate("/login");
}

export async function GetJwtAccessToken() {
  RemoveCookie("accessToken");
  const refreshToken = GetCookie("refreshToken");
  const response = await axios.post(apiEndpoint + "token", {
    token: refreshToken,
  });
  console.log(response);
  if (response.data.accessToken) {
    SetCookie("accessToken", response.data.accessToken);
    return true;
  } else {
    console.log("logout");
    LogOut();
    return false;
  }
}

export async function GetJwtTokens(code: string) {
  try {
    const response = await axios.get(apiEndpoint + "login", {
      params: { code: code },
      withCredentials: true,
    });
    console.log("GetJwtTokens >> api >> ", response.data);
    if (response?.data) {
      SetCookie("accessToken", response?.data.accessToken);
      SetCookie("refreshToken", response?.data.refreshToken);
      toast.success(response?.data?.message, {
        containerId: "top-right",
      });
    }
    return response.data;
  } catch (error: any) {
    console.error(error);
    toast.error(error?.response?.message, {
      containerId: "top-right",
    });
    RemoveAllCookies();
    return false;
  }
}

export async function GetData() {
  try {
    const accessToken = GetCookie("accessToken");
    console.log(accessToken);

    const response = await axios.get(apiEndpoint + "getData", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("data ", response.data);
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 403) {
      const GotJwtAccessToken = await GetJwtAccessToken();
      GotJwtAccessToken
        ? GetData()
        : toast.error(error?.response?.message, {
            containerId: "top-right",
          });
    }
    console.error(error?.response?.status);
  }
}
