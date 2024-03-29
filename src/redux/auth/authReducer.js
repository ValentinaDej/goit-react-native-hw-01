import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  login: null,
  photo: null,
  stateChanged: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      login: payload.login,
      userId: payload.userId,
      photo: payload.photo,
    }),
    authStateChanged: (state, { payload }) => ({
      ...state,
      stateChanged: payload.stateChanged,
    }),
    authSignOut: () => state,
    authSetError: (state, { payload }) => ({
      ...state,
      errorMessage: payload.errorMessage,
    }),
  },
});

export default authSlice;
