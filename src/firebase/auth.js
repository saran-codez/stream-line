import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { db, auth } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err.code.split("/")[1];
  }
};

export const registerWithEmailAndPassword = async (
  firstName,
  lastName,
  email,
  password,
  recruiter
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      firstName,
      lastName,
      authProvider: "local",
      email,
      recruiter,
    });
  } catch (err) {
    throw err.code.split("/")[1];
  }
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.log(err);
  }
};

export const signOutEmail = () => {
  signOut(auth);
};
