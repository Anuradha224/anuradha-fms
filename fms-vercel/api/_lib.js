import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rqokafvrlkpwmwwctcta.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxb2thZnZybGtwd213d2N0Y3RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTkzNzczOCwiZXhwIjoyMDk1NTEzNzM4fQ.vnxNaQhp6-PSC1-82dv_hHIMFSpeFT45SjJ1-HpH7sE';

export function getSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_KEY);
}

export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export function ok(res, data)  { res.status(200).json(data); }
export function err(res, msg, status = 500) { res.status(status).json({ error: msg }); }
