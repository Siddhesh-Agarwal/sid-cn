import React from "react";
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
  try {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);
    const supabase = createClient();
    if (!supabase) {
      throw new Error("Supabase client not found");
    }

    React.useEffect(() => {
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
      } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }, [supabase]);

    return { user, loading, error: null };
  } catch (error) {
    return {
      user: null,
      loading: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
