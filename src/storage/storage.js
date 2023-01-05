export const setLocalStorage = (key, data) =>
  localStorage.setItem(
    this.active_account_id ? this.active_account_id + "_" + key : key,
    JSON.stringify(data)
  );

export const getLocalStorage = (key) => {
  try {
    return JSON.parse(
      localStorage.getItem(
        this.active_account_id ? this.active_account_id + "_" + key : key
      ) ?? null
    );
  } catch (e) {
    // logout();
  }
};
