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
  try {
    const supabase = await createClient();
    if (!supabase) {
      throw new Error("Supabase client not found");
    }
    const { error, data } = await supabase.auth.signInWithPassword({
      email: parsedBody.data.email,
      password: parsedBody.data.password,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
