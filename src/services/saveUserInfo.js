import { setUser } from "../hooks/reducers/userReducer";
import { setLocalStorage } from "../storage/storage";

export async function SaveUserInfo(data, dispatch) {
  console.log("SaveUserInfo", typeof data, data);
  try {
    await dispatch(setUser(data?.userData));
    setLocalStorage("userDetails", data?.userData);
    return true;
  } catch (error) {
    return false;
  }
}
