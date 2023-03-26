import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
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

        updateProfile(auth.currentUser, {
          displayName: login,
        })
          .then(() => {
            // console.log("then auth.currentUser");
            const { uid, displayName } = auth.currentUser;
            //console.log(" uid, displayName", uid, displayName);
            dispatch(
              authSlice.actions.updateUserProfile({
                userId: uid,
                login: displayName,
              })
            );
          })
          .catch((error) => {});
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

        const { displayName, email, uid } = auth.currentUser;
        if (user !== null) {
          // console.log(" displayName, email, uid", displayName, email, uid);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

// export const authSignOut = () => async (dispatch, getState) => {};

export const authStateChanged = () => async (dispatch, getState) => {
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // const uid = user.uid;
      // console.log(uid);
      //setUser(user);
    } else {
      // User is signed out
    }
  });
};
