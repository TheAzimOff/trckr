"use client";
import React from "react";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { firebaseAuth } from "@/app/firebase/config";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function Forgot() {
  const { toast } = useToast();
  const router = useRouter();

  const [email, setEmail] = React.useState<string>("");

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, user => {
      if (user) {
        router.replace("/");
      }
    });
  }, [router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        toast({
          title: "Email sent",
          description:
            "Check your email inbox, we have sent you a password reset link.",
          variant: "default",
        });
        router.push("/login");
      })
      .catch(error => {
        const errorMessage = error.message;

        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive",
        });
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='w-full h-full flex items-center justify-center'
    >
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Reset Password</CardTitle>
          <CardDescription>
            Enter your email below to reset your password
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
            <Button type='submit' className='w-full'>
              Send Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

export default Forgot;
