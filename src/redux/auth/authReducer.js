import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    login: null,
    stateChanged: null,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      login: payload.login,
      userId: payload.userId,
    }),
    authStateChanged: (state, { payload }) => ({
      ...state,
      stateChanged: payload.stateChanged,
    }),
  },
});

export default authSlice;
