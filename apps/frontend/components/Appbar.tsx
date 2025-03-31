"use client";

import { Button } from "@/components/ui/button"; // Import ShadCN button
import { ModeToggle } from "./ui/ModeToggle";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function Appbar() {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="text-lg font-bold">Depin Uptime</div>
      <div className="flex gap-4">
        <SignedOut>
          <SignInButton >
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton >
            <Button>Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle/>
      </div>
    </div>
  );
}
