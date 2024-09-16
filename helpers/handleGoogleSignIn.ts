import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/app/firebase/config";

export default async function handleGoogleSignIn() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    // You can add your own logic here, like updating UI or redirecting
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error("Error during sign in:", errorCode, errorMessage);
  }
}
