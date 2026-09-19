import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ogmzpevsjrpgstqhosxo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nbXpwZXZzanJwZ3N0cWhvc3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3NDQ1ODgsImV4cCI6MjEwNTMyMDU4OH0.UajpXI4odTiSu9bxrjWGz5lhphRg8K4phDWL3hyQcR0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
