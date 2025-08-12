import { NextRequest, NextResponse } from "next/server";
import { signInSchema } from "@/registry/new-york/supabase/components/sign-in-form";
import { createClient } from "@/registry/new-york/supabase/lib/server";

export async function POST(request: NextRequest) {
  const body = request.json();
  const parsedBody = signInSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(
      { error: parsedBody.error.message },
      { status: 400 }
    );
  }
  const supabase = await createClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email: parsedBody.data.email,
    password: parsedBody.data.password,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data }, { status: 200 });
}
