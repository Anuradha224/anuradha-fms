import { getSupabase, cors, ok, err } from './_lib.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  const sb = getSupabase();

  if (req.method === 'GET') {
    const type = req.query.type;
    let q = sb.from('vendors').select('name').order('name');
    if (type) q = q.eq('type', type);
    const { data, error } = await q;
    if (error) return err(res, error.message);
    return ok(res, data.map(r => r.name));
  }

  if (req.method === 'POST') {
    const { type, name } = req.body;
    const { error } = await sb.from('vendors').insert({ type, name });
    if (error && !error.message.includes('duplicate')) return err(res, error.message);
    const { data } = await sb.from('vendors').select('name').eq('type', type).order('name');
    return ok(res, data.map(r => r.name));
  }

  if (req.method === 'DELETE') {
    const { type, name } = req.body;
    const { error } = await sb.from('vendors').delete().eq('type', type).eq('name', name);
    if (error) return err(res, error.message);
    const { data } = await sb.from('vendors').select('name').eq('type', type).order('name');
    return ok(res, data.map(r => r.name));
  }

  return err(res, 'Method not allowed', 405);
}
