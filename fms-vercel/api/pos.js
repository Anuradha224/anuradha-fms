import { getSupabase, cors, ok, err } from './_lib.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  const sb = getSupabase();

  if (req.method === 'GET') {
    const type = req.query.type;
    let q = sb.from('pos').select('*').order('created_at', { ascending: false });
    if (type) q = q.eq('type', type);
    const { data, error } = await q;
    if (error) return err(res, error.message);
    return ok(res, data);
  }

  if (req.method === 'POST') {
    const body = req.body;
    const { data, error } = await sb.from('pos').insert({
      type:          body.type,
      po_no:         body.poNo,
      vendor:        body.vendor,
      total_qty:     body.totalQty,
      lead_days:     body.leadDays,
      entry_date:    body.entryDate,
      entry_by:      body.entryBy,
      status:        'active',
      planned:       body.planned  || {},
      steps:         body.steps    || {},
      receivings:    body.receivings || [],
      cancelled_qty: 0,
      cancel_remark: ''
    }).select().single();
    if (error) return err(res, error.message);
    return ok(res, data);
  }

  return err(res, 'Method not allowed', 405);
}
