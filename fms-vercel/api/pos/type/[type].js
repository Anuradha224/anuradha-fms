import { getSupabase, cors, ok, err } from '../../_lib.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'DELETE') return err(res, 'Method not allowed', 405);
  const sb = getSupabase();
  const { type } = req.query;
  const { error } = await sb.from('pos').delete().eq('type', type);
  if (error) return err(res, error.message);
  return ok(res, { ok: true });
}
