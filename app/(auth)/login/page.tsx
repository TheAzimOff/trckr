"use client";
import React from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { firebaseAuth } from "@/app/firebase/config";
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
import handleEmailLogin from "@/helpers/handleEmailLogin";

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, user => {
      if (user) {
        router.replace("/");
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await handleEmailLogin(email, password);

    if (response.success) {
      toast({
        title: "Login Successful",
        description: "You have been successfully logged in!",
        variant: "default",
      });
      router.push("/");
    } else {
      toast({
        title: "Login Failed",
        description: response.error,
        variant: "destructive",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='w-full h-full flex items-center content-center'
    >
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                onChange={e => setEmail(e.target.value)}
                id='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  href='/forgot'
                  className='ml-auto inline-block text-sm underline'
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                onChange={e => setPassword(e.target.value)}
                id='password'
                type='password'
                required
                minLength={8}
              />
            </div>
            <Button type='submit' className='w-full'>
              Login
            </Button>
            <ContinueWithGoogle />
          </div>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?&nbsp;
            <Link href='/register' className='underline'>
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
