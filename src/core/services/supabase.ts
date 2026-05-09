import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zcrfzfnpcclyyifgnwry.supabase.co";
const supabaseAnonKey = "sb_publishable_UoXme5o1bTwWb-8IUY45fA_mr0Hb0TQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
