import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://toaivkliyztdttsbtpze.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvYWl2a2xpeXp0ZHR0c2J0cHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkwMjUyNTMsImV4cCI6MTk5NDYwMTI1M30.cYgKrziykcEBD6e_1sIAPah8f0uUZhWne767UE_aQXA";


const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;