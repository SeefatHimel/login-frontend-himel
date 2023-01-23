import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveUserInfo } from "../../services/saveUserInfo";
import { getLocalStorage } from "../../storage/storage";

const InitialLoading = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const initialLoad = async () => {
    if (!userDetails) {
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
  };

  useEffect(() => {
    initialLoad();
  }, []);
  return <></>;
};

export default InitialLoading;
