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

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
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

  if (!supabase) {
    return {
      user: null,
      loading: false,
      error: "Supabase client not found (check env vars)",
    };
  }

  // Mimic original behavior: if no user, return error "User not found" so consumers know?
  // Or just return user: null.
  // The original code threw "User not found" which was caught and returned as error.
  // I will just return user and loading status.
  // If the consumer needs to handle "not logged in", they check !user.
  // However, specifically for the previous behavior compatibility:
  if (!loading && !user) {
    return { user: null, loading: false, error: "User not found" };
  }

  return { user, loading, error: null };
}
