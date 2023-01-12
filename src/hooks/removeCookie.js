import Cookie from "js-cookie";

const RemoveCookie = (cookieName, value) => {
  Cookie.remove(cookieName);
};

const RemoveAllCookies = () => {
  RemoveCookie("accessToken");
  RemoveCookie("refreshToken");
  RemoveCookie("user");
  console.log("Cookies Removed");
};
export { RemoveCookie, RemoveAllCookies };
