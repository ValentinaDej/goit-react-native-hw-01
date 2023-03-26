import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import authSlice from "./authReducer";
import { app } from "../../../firebase/config";

export const authSignUp =
  ({ email, password, login }) =>
  async (dispatch) => {
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: login });

      const { uid, displayName } = auth.currentUser;
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
      c;
    } catch (error) {
      dispatch(authSlice.actions.authSetError({ errorMessage: error.code }));
      console.log(error.code);
    }
  };

export const authSignIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(authSlice.actions.authSetError({ errorMessage: "" }));
    } catch (error) {
      dispatch(authSlice.actions.authSetError({ errorMessage: error.code }));
      console.log(error.code);
    }
  };

export const authSignOut = () => async (dispatch, getState) => {
  try {
    const auth = getAuth(app);
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
    dispatch(authSlice.actions.authSetError({ errorMessage: "" }));
  } catch (error) {
    dispatch(authSlice.actions.authSetError({ errorMessage: error.code }));
    console.log(error.code);
  }
};

export const authStateChanged = () => async (dispatch, getState) => {
  const auth = getAuth(app);
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
        })
      );
      dispatch(authSlice.actions.authStateChanged({ stateChanged: true }));
    }
  });
  return unsubscribe;
};
