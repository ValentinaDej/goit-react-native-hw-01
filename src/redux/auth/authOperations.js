import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import authSlice from "./authReducer";
import app from "../../../firebase/config";

export const authSignUp =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

// export const authSignOut = () => async (dispatch, getState) => {};
