"use client";
import { firebaseAuth } from "@/app/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

async function handleEmailRegister(
  email: string,
  password: string,
  name: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: name,
    });
    return { success: true, error: "" };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error during registration:", errorCode, errorMessage);
    return { success: false, error: errorMessage };
  }
}
export default handleEmailRegister;
