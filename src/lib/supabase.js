import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || 'https://rvhtmresjmhjhtaflkfh.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2aHRtcmVzam1oamh0YWZsa2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NDkyMDYsImV4cCI6MjEwNTIyNTIwNn0.WUWADZAotBc917hpfc-9XXS6M6bnApKAkJC11Z87KNM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
