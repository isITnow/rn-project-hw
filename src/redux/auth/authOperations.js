import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { authSlice } from "./authReducer";

const { authStateChange, updateUserProfile, userSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password.trim()
      );
      await updateProfile(auth.currentUser, {
        displayName: login.trim(),
      });

      const updatedUser = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: updatedUser.uid,
          login: updatedUser.displayName,
          email: updatedUser.email,
        })
      );
    } catch (error) {
      console.error("REGISTER ERROR: ", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password.trim()
      );
    } catch (error) {
      console.error("LOGIN ERROR: ", error.message);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(authStateChange({ stateChange: true }));
      dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
        })
      );
    }
  });
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(userSignOut());
};
