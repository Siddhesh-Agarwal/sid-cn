"use client";

import { CodeBlock } from "@/components/code-block";
import InstallButton from "@/components/install-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SignInButton,
  SignUpButton,
  UserButton,
} from "@/registry/new-york/supabase/components/auth";
import { LogIn, User } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 min-h-full">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold">Supabase Auth</h3>
        <h4 className="text-sm text-muted-foreground">
          A complete working supabase auth setup
        </h4>
      </div>

      <section id="example">
        <div className="flex items-center justify-center min-h-100 border rounded-md gap-4 p-4">
          <SignInButton>
            <Button size={"icon"} variant={"outline"} title="Sign in">
              <LogIn />
              <p className="sr-only">Sign in</p>
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button size={"icon"} variant={"outline"} title="Sign up">
              <LogIn />
              <p className="sr-only">Sign up</p>
            </Button>
          </SignUpButton>
          <UserButton>
            <Button size={"icon"} variant={"outline"} title="User">
              <User />
              <p className="sr-only">User</p>
            </Button>
          </UserButton>
        </div>
      </section>

      <Separator />

      <section id="installation" className="py-4">
        <h2 className="text-xl font-semibold">Install</h2>
        <InstallButton componentCode="supabase-auth" />
      </section>

      <Separator />

      <section id="usage">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock
          text={`import { SignInButton, SignUpButton } from "@/ui/components/supabase/auth"`}
        />
        <CodeBlock
          text={`<SignInButton
  variant="modal | page"
  redirect="/"
>
  <Button size="icon" variant="outline" title="Sign in">
    <LogIn />
  </Button>
</SignInButton>`}
        />
        <CodeBlock
          text={`<SignUpButton
  variant="modal | page"
>
  <Button size="icon" variant="outline" title="Sign up">
    <LogIn />
  </Button>
</SignUpButton>`}
        />
        <CodeBlock
          text={`<UserButton
  variant="modal | page"
>
  <Button size="icon" variant="outline" title="User">
    <User />
  </Button>
</UserButton>`}
        />
      </section>
    </div>
  );
}
