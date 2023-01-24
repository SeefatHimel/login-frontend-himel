import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetCookie from "../../hooks/getCookie";
import SetCookie from "../../hooks/setCookie";
import { SaveUserInfo } from "../../services/saveUserInfo";
import { getLocalStorage } from "../../storage/storage";

const InitialLoading = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const activeUserID = GetCookie("activeUserID");
  const refreshToken = GetCookie("refreshToken");
  const initialLoad = async () => {
    if (!userDetails && activeUserID) {
      const tmpDetails = getLocalStorage("userDetails");
      console.log(
        "🚀 ~ file: index.js:11 ~ initialLoad ~ tmpDetails",
        tmpDetails
      );
      const savedUserInfo = await SaveUserInfo(
        { userData: tmpDetails },
        dispatch
      );
      if (savedUserInfo) {
        console.log("saved user info");
      } else console.log(" failed to save user info");
    } else
      console.log(
        "🚀 ~ file: index.js:12 ~ initialLoad ~ userDetails",
        userDetails
      );
    if (!refreshToken && activeUserID) {
      const tmpToken = getLocalStorage("refreshToken");
      SetCookie("refreshToken", refreshToken);
      console.log("Saved refreshToken : ", GetCookie("refreshToken"));
    }
  };

  useEffect(() => {
    initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default InitialLoading;
