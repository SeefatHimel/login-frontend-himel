import { setUser } from "../hooks/reducers/userReducer";
import SetCookie from "../hooks/setCookie";
import { setLocalStorage } from "../storage/storage";

export async function SaveUserInfo(data, dispatch) {
  console.log("SaveUserInfo", typeof data, data);
  try {
    data?.accessToken && SetCookie("accessToken", data?.accessToken);
    data?.refreshToken && SetCookie("refreshToken", data?.refreshToken);
    data?.userData && (await dispatch(setUser(data?.userData)));
    data?.userData?.name && SetCookie("user", data?.userData?.name);
    data?.userData?.id && SetCookie("activeUserID", data?.userData?.id);
    data?.refreshToken && setLocalStorage("refreshToken", data?.refreshToken);
    data?.userData && setLocalStorage("userDetails", data?.userData);
    return true;
  } catch (error) {
    return false;
  }
}
