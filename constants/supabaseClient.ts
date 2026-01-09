// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gvasesekjmplbpvvzzzb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YXNlc2Vram1wbGJwdnZ6enpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NDg2MDYsImV4cCI6MjA4MjAyNDYwNn0.VwsxHMHzIbvYKww5cbkahuDMO1v3z2LUFKCQXnPaBI8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
