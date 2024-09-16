"use client";
import handleGoogleSignIn from "../../helpers/handleGoogleSignIn";
import { Button } from "./button";

export default function ContinueWithGoogle() {
  return (
    <Button variant='outline' className='w-full' onClick={handleGoogleSignIn}>
      Continue with Google
    </Button>
  );
}
