import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const storage = new Cookies().get('user')

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storage?.user ? storage.user : null,
    token: storage?.token ? storage.token : null,
  },

  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },

    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
