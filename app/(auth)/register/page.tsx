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

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, user => {
      if (user) {
        router.replace("/");
      }
    });
  }, [router]);

  const validateHandler = () => {
    const validation = validatePassword(password, confirmPassword);
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
        const result = await handleEmailRegister(email, password, name);
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
              <Input
                onChange={e => setName(e.target.value)}
                value={name}
                id='first-name'
                placeholder='Max'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                onChange={e => setEmail(e.target.value)}
                value={email}
                id='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <Input
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
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
