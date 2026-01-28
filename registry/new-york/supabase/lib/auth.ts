import { useEffect, useState } from "react";
import { createClient } from "@/registry/new-york/supabase/lib/client";

export type Session = NonNullable<
  Awaited<
    ReturnType<
      NonNullable<ReturnType<typeof createClient>>["auth"]["getSession"]
    >
  >["data"]["session"]
>;

export type User = Session["user"];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  if (!supabase) {
    throw new Error("Supabase client not found");
  }

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  try {
    if (!supabase) {
      throw new Error("Supabase client not found");
    }
    if (!user) {
      throw new Error("User not found");
    }
    return { user, loading, error: null };
  } catch (error) {
    return {
      user: null,
      loading: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
