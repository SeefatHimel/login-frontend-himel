import axios from "axios";
import { toast } from "react-toastify";
import GetCookie from "../hooks/getCookie";
import { RemoveAllCookies } from "../hooks/removeCookie";
import SetCookie from "../hooks/setCookie";

// const apiEndpoint = "https://login-backend-himel.onrender.com/";
const localHost = process.env.NODE_ENV === "development" ? true : false;
const apiEndpoint = localHost
  ? process.env.REACT_APP_API_URL_LOCAL
  : process.env.REACT_APP_API_URL;
console.log("🚀 ~ file: index.ts:12 ~ process.env", process.env);

export async function getAuthLink() {
  try {
    const response = await axios.get(apiEndpoint + "getLink");
    console.log("Auth url ", response);
    return response;
  } catch (error: any) {
    console.log(error);
    error?.response?.data?.message &&
      toast.error(error?.response?.data?.message, {
        containerId: "top-right",
      });
  }
}

export async function LogOut() {
  try {
    const { data } = await axios.post(apiEndpoint + "logout");
    console.log(data);
    RemoveAllCookies();
    toast.success(data.message, {
      containerId: "top-right",
    });
    return true;
  } catch (error: any) {
    return false;
  }
}

export async function GetJwtAccessToken() {
  const refreshToken = GetCookie("refreshToken");
  if (!refreshToken) {
    console.log("logout");
    toast.error("Response Token not found", {
      containerId: "top-right",
    });
    return false;
  } else {
    const response = await axios.post(apiEndpoint + "token", {
      token: refreshToken,
    });
    console.log(response);
    if (response.data.accessToken) {
      SetCookie("accessToken", response.data.accessToken);
      return true;
    } else {
      console.log("logout");
      return false;
    }
  }
}

export async function GetJwtTokens(code: string) {
  console.log("Code :", code);
  try {
    const response = await axios.get(apiEndpoint + "login", {
      params: { code: code },
      // code: code,
      withCredentials: true,
    });
    console.log(response);

    console.log("GetJwtTokens >> api >> ", response.data);
    if (response?.data) {
      toast.success(response?.data?.message, {
        containerId: "top-right",
      });
    }
    return response.data;
  } catch (error: any) {
    console.error("Login Error", error);
    toast.error(error?.response?.data?.message, {
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
    console.log(error);

    if (error?.response?.status === 401) {
      const GotJwtAccessToken = await GetJwtAccessToken();
      GotJwtAccessToken
        ? await GetData()
        : toast.error(error?.response?.data?.message, {
            containerId: "top-right",
          });
      console.log("GotJwtAccessToken", GotJwtAccessToken);
      if(!GotJwtAccessToken) return -1;
    } else {
      toast.error(error?.response?.data?.message, {
        containerId: "top-right",
      });
    }
    console.error(error?.response?.status);
  }
}
