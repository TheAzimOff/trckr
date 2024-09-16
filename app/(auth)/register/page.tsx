"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ContinueWithGoogle from "@/components/ui/continueWithGoogle";
import handleEmailRegister from "@/helpers/handleEmailRegister";
import validatePassword from "@/helpers/passwordValidation";
import { useToast } from "@/hooks/use-toast";
import { firebaseAuth } from "@/app/firebase/config";

export default function SignUp() {
  const { toast } = useToast();
  const router = useRouter();

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confirmPassword = React.useRef<HTMLInputElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, user => {
      if (user) {
        router.replace("/");
      }
    });
  }, [router]);

  const validateHandler = () => {
    const validation = validatePassword(
      passwordRef.current?.value!,
      confirmPassword.current?.value!
    );
    if (!validation.isValid) {
      toast({
        variant: "destructive",
        title: "Something went wrong: Your password must:",
        description: (
          <ul className='mt-2 list-disc list-inside'>
            {validation.failedRules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        ),
      });
    }

    return validation.isValid;
  };

  return (
    <form
      className='w-full h-full flex items-center content-center'
      onSubmit={async e => {
        e.preventDefault();
        const validation = validateHandler();
        if (!validation) {
          return;
        }
        const result = await handleEmailRegister(
          emailRef.current?.value!,
          passwordRef.current?.value!,
          nameRef.current?.value!
        );
        if (result.success) {
          toast({
            title: "Login Successful",
            description: "You have been successfully logged in!",
            variant: "default",
          });
          router.push("/");
        }
      }}
    >
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-xl'>Register</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='first-name'>Name</Label>
              <Input ref={nameRef} id='first-name' placeholder='Max' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                ref={emailRef}
                id='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' ref={passwordRef} />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <Input
                ref={confirmPassword}
                id='confirmPassword'
                type='password'
              />
            </div>
            <Button type='submit' className='w-full'>
              Create an account
            </Button>
            <ContinueWithGoogle />
          </div>
          <div className='mt-4 text-center text-sm'>
            Already have an account?&nbsp;
            <Link href='/login' className='underline'>
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
