import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = "https://ogmzpevsjrpgstqhosxo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nbXpwZXZsanJwZ3N0cWhvc3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3NDQ1ODgsImV4cCI6MjEwNTMyMDU4OH0.UajpXI4odTiSu9bxrjWGz5lhphRg8K4phDWL3hyQcR0";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("OAuth callback error:", error);
      return NextResponse.redirect(new URL("/?error=auth_failed", requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL("/workspace", requestUrl.origin));
}
