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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    return false;
  }
  // navigate("/login");
}

export async function GetAccessToken() {
  RemoveCookie("accessToken");
  const refreshToken = GetCookie("refreshToken");
  const response = await axios.post(apiEndpoint + "token", {
    token: refreshToken,
  });
  if (response.data.accessToken)
    SetCookie("accessToken", response.data.accessToken);
  else {
    console.log("logout");
    return true;
  }
  console.log(response);
}

export async function GetTokens(code: string) {
  try {
    const response = await axios.get(apiEndpoint + "login", {
      params: { code: code },
      withCredentials: true,
    });
    console.log("GetTokens >> api >> ", response.data);
    if (response?.data) {
      SetCookie("accessToken", response?.data.accessToken);
      SetCookie("refreshToken", response?.data.refreshToken);
      toast.success(response?.data?.message, {
        containerId: "top-right",
      });
    }
    return response.data;
  } catch (error) {
    console.error(error);
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
      await GetAccessToken();
      GetData();
    }
    console.error(error?.response?.status);
  }
}
