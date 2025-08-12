import { SignUpForm } from "@/registry/new-york/supabase/components/sign-up-form";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="mb-4 text-xl font-semibold text-foreground">Sign In</h1>
        <SignUpForm />
      </div>
    </main>
  );
}
