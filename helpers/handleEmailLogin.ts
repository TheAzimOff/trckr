import { firebaseAuth } from "@/app/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const handleEmailLogin = async (email: string, password: string) => {
  try {
    // Sign in user with email and password
    await signInWithEmailAndPassword(firebaseAuth, email, password);

    return { success: true, error: "" };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
};
export default handleEmailLogin;
