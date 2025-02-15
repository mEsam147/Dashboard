import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLogin: boolean;
}

const initialState: AuthState = {
  isLogin: localStorage.getItem("auth") === "true", 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
      localStorage.setItem("auth", "true");
    },
    logout(state) {
      state.isLogin = false;
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
