import { createSlice } from "@reduxjs/toolkit";
export interface UserState {
  userDetails: any;
}
const initialState: UserState = {
  userDetails: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("setUser", action);
      state.userDetails = action.payload;
    },
    resetUser: (state) => {
      console.log("resetUser");
      state.userDetails = null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
