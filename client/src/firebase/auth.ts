import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  ActionCodeSettings,
} from "firebase/auth";
import { auth } from "./firebase";
// Assuming 'auth' is properly typed in its definition module

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  const userCredential: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const firebaseUserId = userCredential.user.uid; // Get the Firebase user ID
  // Now, send a request to your backend to store additional user information
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebaseUserId,
      }),
    };
    const response = await fetch(
      `https://ccc-transfers.azurewebsites.net/users/signup`,
      options
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend registration failed", errorData);
      throw new Error("Backend registration failed: " + errorData.message);
    }
    const responseData = await response.json();
    console.log("Backend Registration worked!: ", responseData);
  } catch (error) {
    console.error("Backend registration failed", error);
  }
  return userCredential;
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const doSignOut = async (): Promise<void> => {
  return auth.signOut();
};

export const doPasswordReset = async (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = async (password: string): Promise<void> => {
  if (auth.currentUser) {
    return updatePassword(auth.currentUser, password);
  } else {
    throw new Error("No user is currently signed in.");
  }
};

export const doSendEmailVerification = async (): Promise<void> => {
  if (auth.currentUser) {
    const actionCodeSettings: ActionCodeSettings = {
      url: `${window.location.origin}/home`,
    };
    return sendEmailVerification(auth.currentUser, actionCodeSettings);
  } else {
    throw new Error("No user is currently signed in.");
  }
};
