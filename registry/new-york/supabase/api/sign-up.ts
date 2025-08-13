import { NextRequest, NextResponse } from "next/server";

import { signUpSchema } from "@/registry/new-york/supabase/components/sign-up-form";
import { createClient } from "@/registry/new-york/supabase/lib/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = signUpSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(
      { error: parsedBody.error.message },
      { status: 400 }
    );
  }
  if (parsedBody.data.password !== parsedBody.data.confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 }
    );
  }
  try {
    const supabase = await createClient();
    if (!supabase) {
      throw new Error("Supabase client not found");
    }
    const { error, data } = await supabase.auth.signUp({
      email: parsedBody.data.email,
      password: parsedBody.data.password,
      options: {
        data: {
          firstName: parsedBody.data.firstName,
          lastName: parsedBody.data.lastName,
        },
      },
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
