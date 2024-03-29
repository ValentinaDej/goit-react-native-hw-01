import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import authSlice from "./authReducer";
import { app, db } from "../../../firebase/config";

export const authSignUp =
  ({ email, password, login, photo }) =>
  async (dispatch) => {
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      //   console.log(photo);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: photo,
      });

      await onAuthStateChanged(auth, async (user) => {
        if (user) {
          await setDoc(doc(db, "users", user.uid), {
            userId: user.uid,
            login: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: Date.now().toString(),
          });
        }
      });

      const { uid, displayName, photoURL } = auth.currentUser;
      await dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
          photo: photoURL,
        })
      );
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

      const { uid, displayName, photoURL } = auth.currentUser;
      // console.log(displayName);
      // console.log("photoURL", photoURL);
      await dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
          photo: photoURL,
        })
      );
      dispatch(authSlice.actions.authSetError({ errorMessage: "" }));
    } catch (error) {
      dispatch(authSlice.actions.authSetError({ errorMessage: error.code }));
      console.log(error.code);
    }
  };

export const authEditProfile =
  ({ photo }) =>
  async (dispatch) => {
    //console.log("authEditProfile", photo);
    try {
      const auth = getAuth(app);
      await updateProfile(auth.currentUser, {
        photoURL: photo,
      });

      await onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = await doc(db, "users", user.uid);
          await setDoc(userRef, { photoURL: photo }, { merge: true });
        }
      });

      const { uid, displayName, photoURL } = auth.currentUser;
      await dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
          photo: photoURL,
        })
      );
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
      await dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          photo: user.photoURL,
        })
      );
      dispatch(authSlice.actions.authStateChanged({ stateChanged: true }));
    }
  });
  return unsubscribe;
};
