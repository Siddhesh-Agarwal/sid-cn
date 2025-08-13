"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "@/registry/new-york/supabase/components/sign-in-form";
import { SignUpForm } from "@/registry/new-york/supabase/components/sign-up-form";
import { useAuth } from "@/registry/new-york/supabase/lib/auth";

import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";

export function SignedIn({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null; // or a loading spinner if you prefer
  if (!user) return null;

  return <>{children}</>;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null; // or a loading spinner if you prefer
  if (user) return null;

  return <>{children}</>;
}

export function AuthButton({
  redirectOnLogin = "/",
  children,
}: {
  redirectOnLogin?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            Create account or log into an existing account.
          </DialogDescription>
        </DialogHeader>
        <Tabs className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignInForm redirect={redirectOnLogin} />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

type AuthVariant = "modal" | "page";

export function SignInButton({
  variant = "modal",
  redirect = "/",
  children,
}: {
  variant?: AuthVariant;
  redirect?: string;
  children: React.ReactNode;
}) {
  if (variant === "page") {
    const params = new URLSearchParams({ redirect });
    return <Link href={`/auth/sign-in?${params}`}>{children}</Link>;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>Log in to your account.</DialogDescription>
        </DialogHeader>
        <SignInForm redirect={redirect} />
        <div className="w-full flex justify-center">
          Don't have an account?
          <Link href="/auth/sign-up" className="ml-1 hover:underline">
            Sign up
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SignUpButton({
  variant = "modal",
  children,
}: {
  variant?: AuthVariant;
  children: React.ReactNode;
}) {
  if (variant === "page") {
    return <Link href="/auth/sign-up">{children}</Link>;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>Create a new account.</DialogDescription>
        </DialogHeader>
        <SignUpForm />
        <div className="w-full flex justify-center">
          Already have an account?
          <Link href="/auth/sign-in" className="ml-1 hover:underline">
            Sign in
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function UserButton({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => user}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
