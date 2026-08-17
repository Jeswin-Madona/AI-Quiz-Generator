import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sxppwdygftgcpwvmyenv.supabase.co";
const supabaseKey = "sb_publishable_YztGNbjXPZUeqvM2YFjIIA_HHiOxNtw";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);