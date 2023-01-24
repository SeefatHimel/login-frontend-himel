import Cookie from "js-cookie";

const CookieNames = ["user", "accessToken", "refreshToken", "activeUserID"];

const RemoveCookie = (cookieName, value) => {
  try {
    Cookie.remove(cookieName);
  } catch (error) {
    console.log("Failed to remove cookie ", cookieName);
  }
};

const RemoveAllCookies = () => {
  CookieNames.map((cookieName) => RemoveCookie(cookieName));
  // RemoveCookie("accessToken");
  // RemoveCookie("refreshToken");
  // RemoveCookie("user");

  console.log("Cookies Removed");
};
export { RemoveCookie, RemoveAllCookies };
