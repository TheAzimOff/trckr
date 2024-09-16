"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "./firebase/config";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, user => {
      if (!user) {
        router.push("/login");
      }
    });
  }, [router]);

  return (
    <>
      <Button
        onClick={() => {
          signOut(firebaseAuth).then(() =>
            toast({
              title: "Signed out",
              description: "You have been successfully signed out!",
              variant: "default",
            })
          );
        }}
      >
        Sign Out
      </Button>
    </>
  );
}
