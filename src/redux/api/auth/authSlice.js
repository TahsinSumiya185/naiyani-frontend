// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { removeUserInfo } from "../../../services/auth.service";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    firstName: null,
    email: null,
    accessToken: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
        state.isLoggedIn = true; 
        state.firstName = action.payload.firstName;
        state.email = action.payload.email;
        state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.firstName = null;
      state.email = null;
      state.accessToken = null;
      removeUserInfo("accessToken");
      removeUserInfo("firstName");
      removeUserInfo("email");
    },
  },
});

export const { setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
