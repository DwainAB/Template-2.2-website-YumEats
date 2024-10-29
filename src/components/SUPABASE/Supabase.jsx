import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ehjbdvbicusntqbhlqun.supabase.co'; // Remplace par ton URL Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoamJkdmJpY3VzbnRxYmhscXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNzk3MDcsImV4cCI6MjA0Mzk1NTcwN30.x-HTW5R1lZmw68NxQCmeyfA4LJY-FOJprKXj1HZnqKo'; // Remplace par ta clé publique

export const supabase = createClient(supabaseUrl, supabaseAnonKey);