import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://seyinirajlcnrosyuznk.supabase.co";
const supabaseAnonKey = "sb_publishable_b-nulDbrF5mVSOKe4_5CXg_QBGXg2DF";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
