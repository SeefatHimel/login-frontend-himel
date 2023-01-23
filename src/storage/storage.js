import GetCookie from "../hooks/getCookie";
export const setLocalStorage = (key, data) => {
  if (!data) {
    console.log("Data empty");
    return;
  }
  const user = GetCookie("activeUserID");
  console.log("🚀 ~ file: storage.js:4 ~ setLocalStorage ~ user", user);
  try {
    localStorage.setItem(user ? user + "_" + key : key, JSON.stringify(data));
  } catch (error) {
    console.log("Failed to save in local storage");
  }
};

export const getLocalStorage = (key) => {
  const user = GetCookie("activeUserID");
  try {
    return JSON.parse(
      localStorage.getItem(user ? user + "_" + key : key) ?? null
    );
  } catch (e) {
    // logout();
  }
};
