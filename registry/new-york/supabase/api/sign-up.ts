import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/components/supabase/sign-up-form";
import { createClient } from "@/utils/supabase/server";

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
  const supabase = await createClient();
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
}
