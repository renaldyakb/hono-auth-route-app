import { createClient } from "@supabase/supabase-js";

const supabaseUrl = Bun.env.SUPABASE_URL as string;
const supabaseKey = Bun.env.SUPABASE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);
